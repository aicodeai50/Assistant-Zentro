"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageShell } from "@/components/ui/PageShell";

type Profile = {
  email?: string;
  full_name?: string;
  language?: string;
  plan?: string;
  trial_started_at?: string;
  trial_ends_at?: string;
};

type Usage = {
  usage_count?: number;
};

export default function AccountPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [usage, setUsage] = useState<Usage | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const supabase = getSupabaseClient();

      if (!supabase) {
        if (mounted) {
          setMessage("Supabase is not configured.");
          setLoading(false);
        }
        return;
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.replace("/sign-in?next=/account");
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("email, full_name, language, plan, trial_started_at, trial_ends_at")
        .eq("id", user.id)
        .maybeSingle();

      const today = new Date().toISOString().slice(0, 10);
      const { data: usageData } = await supabase
        .from("daily_ai_usage")
        .select("usage_count")
        .eq("user_id", user.id)
        .eq("usage_date", today)
        .maybeSingle();

      if (mounted) {
        if (profileError) {
          setMessage(profileError.message);
        } else {
          setProfile(profileData);
          setUsage(usageData || { usage_count: 0 });
        }
        setLoading(false);
      }
    }

    void load();

    return () => {
      mounted = false;
    };
  }, [router]);

  const trialActive = profile?.trial_ends_at
    ? new Date(profile.trial_ends_at).getTime() > Date.now()
    : false;

  const remaining = Math.max(0, 5 - Number(usage?.usage_count || 0));

  if (loading) {
    return (
      <PageShell eyebrow={t("account.eyebrow")} title={t("account.loading")}>
        <Card>Loading account…</Card>
      </PageShell>
    );
  }

  if (message && !profile) {
    return (
      <PageShell eyebrow={t("account.eyebrow")} title={t("account.title")}>
        <Card className="border-red-400/20 bg-red-500/10 text-red-100">{message}</Card>
      </PageShell>
    );
  }

  if (!profile) {
    return (
      <PageShell eyebrow={t("account.eyebrow")} title={t("account.title")}>
        <Card>{t("account.noProfile")}</Card>
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow={t("account.eyebrow")}
      title={t("account.title")}
      description={t("account.subtitle")}
      actions={
        <>
          <ButtonLink href="/dashboard" variant="secondary" size="sm">
            Dashboard
          </ButtonLink>
          <ButtonLink href="/settings" size="sm">
            Settings
          </ButtonLink>
        </>
      }
    >
      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            label: t("account.plan"),
            value: trialActive ? t("account.trial") : profile.plan || t("account.free"),
            detail: profile.trial_ends_at
              ? `${t("account.trialEnds")}: ${profile.trial_ends_at.slice(0, 10)}`
              : "Current subscription tier",
          },
          {
            label: t("account.aiUsedToday"),
            value: trialActive ? t("account.unlimitedTrial") : String(usage?.usage_count || 0),
            detail: "Assistant messages today",
          },
          {
            label: t("account.aiRemainingToday"),
            value: trialActive ? t("account.unlimitedTrial") : String(remaining),
            detail: "Free tier messages left",
          },
        ].map((item) => (
          <Card key={item.label}>
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
              {item.label}
            </div>
            <div className="mt-3 text-3xl font-bold text-cyan-100">{item.value}</div>
            <div className="mt-2 text-sm text-white/55">{item.detail}</div>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <Card>
          <CardHeader
            eyebrow="Profile"
            title={profile.full_name || profile.email || "Your account"}
            description="Account details synced from Supabase."
            action={<Badge variant="info">{profile.plan || "trial"}</Badge>}
          />

          <div className="grid gap-3 text-sm">
            {[
              { label: t("account.email"), value: profile.email || "-" },
              { label: t("account.name"), value: profile.full_name || "-" },
              { label: t("account.language"), value: profile.language || "en" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                  {item.label}
                </div>
                <div className="mt-1 text-white/90">{item.value}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader
            eyebrow="Quick links"
            title="Workspace navigation"
            description="Jump to the areas you use most."
          />

          <div className="grid gap-3">
            {[
              { href: "/dashboard", label: "Dashboard", detail: "Operations workspace home" },
              { href: "/assistant", label: "Command center", detail: "Memory, tasks, briefings" },
              { href: "/settings", label: "Settings & billing", detail: "Profile and PayPal plan" },
              { href: "/pricing", label: "Pricing", detail: "Compare plans and upgrade" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-300/20 hover:bg-white/[0.05]"
              >
                <div className="font-semibold text-white">{item.label} →</div>
                <div className="mt-1 text-sm text-white/55">{item.detail}</div>
              </Link>
            ))}
          </div>
        </Card>
      </section>
    </PageShell>
  );
}
