import { NextRequest, NextResponse } from "next/server";
import { getBillingPlan } from "@/lib/billing/plans";
import {
  createPayPalSubscription,
  getPayPalApprovalUrl,
} from "@/lib/billing/paypal";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@supabase/supabase-js";

function getPlanId(planKey: string): string | null {
  if (planKey === "pro") return process.env.PAYPAL_PRO_PLAN_ID || null;
  if (planKey === "team") return process.env.PAYPAL_TEAM_PLAN_ID || null;
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { plan?: string };
    const planKey = String(body.plan || "").toLowerCase();
    const plan = getBillingPlan(planKey);

    if (!plan || !plan.paypalPlanIdEnv) {
      return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
    }

    const planId = getPlanId(planKey);
    if (!planId) {
      return NextResponse.json(
        { error: "PayPal plan is not configured for this tier." },
        { status: 503 }
      );
    }

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnon) {
      return NextResponse.json({ error: "Auth is not configured." }, { status: 503 });
    }

    const supabase = createClient(supabaseUrl, supabaseAnon, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Invalid session." }, { status: 401 });
    }

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const subscription = await createPayPalSubscription({
      planId,
      userId: user.id,
      email: user.email || "",
      returnUrl: `${origin}/settings?billing=success&plan=${planKey}`,
      cancelUrl: `${origin}/checkout/${planKey}?cancelled=1`,
    });

    const approvalUrl = getPayPalApprovalUrl(subscription);

    if (!approvalUrl) {
      return NextResponse.json(
        { error: "PayPal did not return an approval URL." },
        { status: 502 }
      );
    }

    const admin = getSupabaseAdmin();
    if (admin) {
      await admin.from("billing_subscriptions").upsert(
        {
          user_id: user.id,
          provider: "paypal",
          provider_subscription_id: subscription.id,
          plan: planKey,
          status: subscription.status?.toLowerCase() || "created",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "provider_subscription_id" }
      );
    }

    return NextResponse.json({
      subscriptionId: subscription.id,
      approvalUrl,
    });
  } catch (error) {
    console.error("PayPal create-subscription error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout failed." },
      { status: 500 }
    );
  }
}
