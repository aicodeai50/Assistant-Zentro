"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase/client";
import { BILLING_PLANS } from "@/lib/billing/plans";
import { SITE_NAME } from "@/lib/site";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageShell } from "@/components/ui/PageShell";

type Profile = {
  email?: string | null;
  full_name?: string | null;
  plan?: string | null;
  language?: string | null;
};

type BillingRecord = {
  plan?: string | null;
  status?: string | null;
  provider?: string | null;
  updated_at?: string | null;
};

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "billing", label: "Billing" },
  { id: "assistant", label: "Assistant" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function SettingsPageFallback() {
  return (
    <PageShell eyebrow="Settings" title="Loading settings">
      <Card>Loading your workspace preferences…</Card>
    </PageShell>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<SettingsPageFallback />}>
      <SettingsPageClient />
    </Suspense>
  );
}

function SettingsPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [billing, setBilling] = useState<BillingRecord | null>(null);
  const [fullName, setFullName] = useState("");
  const [language, setLanguage] = useState("en");
  const [cloudSync, setCloudSync] = useState(true);
  const [briefingEmail, setBriefingEmail] = useState(false);

  const billingSuccess = searchParams.get("billing") === "success";

  useEffect(() => {
    const billingParam = searchParams.get("billing");
    if (billingParam === "success" || billingParam === "1") {
      setActiveTab("billing");
    }
  }, [searchParams]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const supabase = getSupabaseClient();
      if (!supabase) {
        if (mounted) {
          setMessage("Authentication is not configured.");
          setLoading(false);
        }
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/sign-in?next=/settings");
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("email, full_name, plan, language")
        .eq("id", user.id)
        .maybeSingle();

      const { data: billingData } = await supabase
        .from("billing_subscriptions")
        .select("plan, status, provider, updated_at")
        .eq("user_id", user.id)
        .maybeSingle();

      if (mounted) {
        setProfile({
          email: profileData?.email ?? user.email,
          full_name: profileData?.full_name ?? "",
          plan: profileData?.plan ?? "trial",
          language: profileData?.language ?? "en",
        });
        setBilling(billingData);
        setFullName(profileData?.full_name ?? "");
        setLanguage(profileData?.language ?? "en");
        setLoading(false);
      }
    }

    void load();

    return () => {
      mounted = false;
    };
  }, [router]);

  async function saveProfile() {
    setSaving(true);
    setMessage("");

    const supabase = getSupabaseClient();
    if (!supabase) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim(),
        language,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    setSaving(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setProfile((prev) => ({
      ...prev,
      full_name: fullName.trim(),
      language,
    }));
    setMessage("Profile updated.");
  }

  async function handleSignOut() {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const currentPlan = useMemo(
    () => BILLING_PLANS.find((plan) => plan.key === profile?.plan) ?? BILLING_PLANS[0],
    [profile?.plan]
  );

  if (loading) {
    return (
      <PageShell eyebrow="Settings" title="Loading settings">
        <Card>Loading your workspace preferences…</Card>
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow="Workspace"
      title="Settings"
      description={`Manage your ${SITE_NAME} profile, billing, and assistant preferences.`}
      actions={
        <>
          <ButtonLink href="/dashboard" variant="secondary" size="sm">
            Dashboard
          </ButtonLink>
          <ButtonLink href="/assistant" variant="secondary" size="sm">
            Assistant
          </ButtonLink>
        </>
      }
    >
      {billingSuccess ? (
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
          PayPal checkout completed. Your plan will update once PayPal confirms the subscription.
        </div>
      ) : null}

      {message ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/80">
          {message}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab.id
                ? "bg-cyan-400 text-slate-950"
                : "border border-white/10 bg-white/[0.03] text-white/70 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "profile" ? (
        <Card>
          <CardHeader
            eyebrow="Profile"
            title="Personal information"
            description="Update how your name appears across the workspace."
          />

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-white/70">Full name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#0a1220] px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/40"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white/70">Email</label>
              <input
                value={profile?.email || ""}
                disabled
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/50"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white/70">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#0a1220] px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/40"
              >
                <option value="en">English</option>
                <option value="no">Norwegian</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button type="button" onClick={() => void saveProfile()} disabled={saving}>
              {saving ? "Saving…" : "Save profile"}
            </Button>
            <Button type="button" variant="danger" onClick={() => void handleSignOut()}>
              Sign out
            </Button>
          </div>
        </Card>
      ) : null}

      {activeTab === "billing" ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Card>
            <CardHeader
              eyebrow="Current plan"
              title={currentPlan.name}
              description={currentPlan.description}
              action={<Badge variant="info">{profile?.plan || "trial"}</Badge>}
            />

            <div className="text-3xl font-bold text-white">
              {currentPlan.price}
              <span className="text-base font-normal text-white/50">{currentPlan.period}</span>
            </div>

            {billing ? (
              <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/70">
                <div>Provider: {billing.provider || "paypal"}</div>
                <div className="mt-1 capitalize">Status: {billing.status || "unknown"}</div>
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              {profile?.plan === "pro" || profile?.plan === "team" ? (
                <ButtonLink href="/pricing" variant="secondary">
                  Change plan
                </ButtonLink>
              ) : (
                <>
                  <ButtonLink href="/checkout/pro">Upgrade to Pro</ButtonLink>
                  <ButtonLink href="/checkout/team" variant="secondary">
                    Upgrade to Team
                  </ButtonLink>
                </>
              )}
            </div>
          </Card>

          <Card>
            <CardHeader
              eyebrow="PayPal"
              title="Subscription billing"
              description="Paid plans are processed securely through PayPal. Manage or cancel from your PayPal account."
            />

            <ul className="space-y-3 text-sm text-white/70">
              <li>Monthly billing through PayPal Subscriptions</li>
              <li>Plan updates automatically after payment confirmation</li>
              <li>Invoices and cancellation handled in PayPal</li>
            </ul>

            <Link
              href="https://www.paypal.com/myaccount/autopay/"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex text-sm font-semibold text-cyan-200 hover:text-cyan-100"
            >
              Manage PayPal subscriptions →
            </Link>
          </Card>
        </div>
      ) : null}

      {activeTab === "assistant" ? (
        <Card>
          <CardHeader
            eyebrow="Assistant"
            title="Assistant preferences"
            description="Control how Zentro Assistant behaves in your workspace."
          />

          <div className="space-y-4">
            <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div>
                <div className="font-medium text-white">Cloud sync</div>
                <div className="text-sm text-white/55">
                  Sync memory and tasks when signed in (requires Supabase table).
                </div>
              </div>
              <input
                type="checkbox"
                checked={cloudSync}
                onChange={(e) => setCloudSync(e.target.checked)}
                className="h-4 w-4"
              />
            </label>

            <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div>
                <div className="font-medium text-white">Daily briefing emails</div>
                <div className="text-sm text-white/55">Coming soon — email your morning operating brief.</div>
              </div>
              <input
                type="checkbox"
                checked={briefingEmail}
                onChange={(e) => setBriefingEmail(e.target.checked)}
                disabled
                className="h-4 w-4 opacity-50"
              />
            </label>
          </div>

          <p className="mt-5 text-sm text-white/45">
            Assistant data is stored locally by default. Visit the{" "}
            <Link href="/assistant" className="text-cyan-200 hover:text-cyan-100">
              Command Center
            </Link>{" "}
            to manage memory and tasks.
          </p>
        </Card>
      ) : null}
    </PageShell>
  );
}
