import { NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const FREE_DAILY_LIMIT = 5;
const GUEST_TOTAL_LIMIT = 2;

type AuthAccessResult =
  | {
      ok: true;
      mode: "auth";
      userId: string;
      plan: string;
      trialActive: boolean;
      remaining: number | null;
    }
  | {
      ok: true;
      mode: "guest";
      clientKey: string;
      remaining: number;
    }
  | {
      ok: false;
      status: number;
      message: string;
    };

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

function buildGuestKey(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for") || "";
  const ip = forwarded.split(",")[0]?.trim() || "unknown-ip";
  const ua = req.headers.get("user-agent") || "unknown-ua";
  const acceptLang = req.headers.get("accept-language") || "unknown-lang";
  return `${ip}::${ua}::${acceptLang}`.slice(0, 500);
}

export async function checkAiAccess(req: NextRequest): Promise<AuthAccessResult> {
  const admin = getSupabaseAdmin();

  if (!admin) {
    return {
      ok: false,
      status: 500,
      message: "Server auth is not configured yet.",
    };
  }

  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();

  if (!token) {
    const clientKey = buildGuestKey(req);

    const { data: guestRow } = await admin
      .from("guest_ai_usage")
      .select("usage_count")
      .eq("client_key", clientKey)
      .single();

    const guestCount = Number(guestRow?.usage_count || 0);
    const remaining = Math.max(0, GUEST_TOTAL_LIMIT - guestCount);

    if (guestCount >= GUEST_TOTAL_LIMIT) {
      return {
        ok: false,
        status: 429,
        message: "Create a free account to continue your Shynvo trial.",
      };
    }

    return {
      ok: true,
      mode: "guest",
      clientKey,
      remaining,
    };
  }

  const {
    data: { user },
    error: userError,
  } = await admin.auth.getUser(token);

  if (userError || !user) {
    return {
      ok: false,
      status: 401,
      message: "Your session is invalid. Please sign in again.",
    };
  }

  let { data: profile } = await admin
    .from("profiles")
    .select("plan, trial_ends_at")
    .eq("id", user.id)
    .single();

  if (!profile) {
    await admin.from("profiles").upsert(
      {
        id: user.id,
        email: user.email ?? null,
        plan: "trial",
        trial_started_at: new Date().toISOString(),
        trial_ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      { onConflict: "id" }
    );

    const { data: newProfile } = await admin
      .from("profiles")
      .select("plan, trial_ends_at")
      .eq("id", user.id)
      .single();

    profile = newProfile ?? null;
  }

  const plan = String(profile?.plan || "trial").toLowerCase();
  const trialEndsAt = profile?.trial_ends_at ? new Date(profile.trial_ends_at).getTime() : 0;
  const trialActive = plan === "trial" && trialEndsAt > Date.now();
  const paid = plan === "plus" || plan === "pro" || plan === "enterprise";

  if (paid || trialActive) {
    return {
      ok: true,
      mode: "auth",
      userId: user.id,
      plan,
      trialActive,
      remaining: null,
    };
  }

  if (plan === "trial" && !trialActive) {
    await admin
      .from("profiles")
      .update({
        plan: "free",
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);
  }

  const usageDate = todayUtc();

  const { data: usageRow } = await admin
    .from("daily_ai_usage")
    .select("usage_count")
    .eq("user_id", user.id)
    .eq("usage_date", usageDate)
    .single();

  const usageCount = Number(usageRow?.usage_count || 0);
  const remaining = Math.max(0, FREE_DAILY_LIMIT - usageCount);

  if (usageCount >= FREE_DAILY_LIMIT) {
    return {
      ok: false,
      status: 429,
      message: "Daily AI limit reached. Try again tomorrow or upgrade for more access.",
    };
  }

  return {
    ok: true,
    mode: "auth",
    userId: user.id,
    plan: "free",
    trialActive: false,
    remaining,
  };
}

export async function recordAiUsage(access: Extract<AuthAccessResult, { ok: true }>): Promise<void> {
  const admin = getSupabaseAdmin();
  if (!admin) return;

  if (access.mode === "guest") {
    const { data: guestRow } = await admin
      .from("guest_ai_usage")
      .select("usage_count")
      .eq("client_key", access.clientKey)
      .single();

    const nextCount = Number(guestRow?.usage_count || 0) + 1;

    await admin.from("guest_ai_usage").upsert(
      {
        client_key: access.clientKey,
        usage_count: nextCount,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "client_key" }
    );

    return;
  }

  const usageDate = todayUtc();

  const { data: usageRow } = await admin
    .from("daily_ai_usage")
    .select("usage_count")
    .eq("user_id", access.userId)
    .eq("usage_date", usageDate)
    .single();

  const nextCount = Number(usageRow?.usage_count || 0) + 1;

  await admin.from("daily_ai_usage").upsert(
    {
      user_id: access.userId,
      usage_date: usageDate,
      usage_count: nextCount,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,usage_date" }
  );
}
