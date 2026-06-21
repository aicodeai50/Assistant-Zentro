"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/i18n/LanguageContext";

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
        if (mounted) {
          setMessage(t("account.notSignedIn"));
          setLoading(false);
        }
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

    load();
    return () => {
      mounted = false;
    };
  }, [t]);

  const trialActive =
    profile?.trial_ends_at ? new Date(profile.trial_ends_at).getTime() > Date.now() : false;

  const remaining = Math.max(0, 5 - Number(usage?.usage_count || 0));

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(217,70,239,0.26),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(34,211,238,0.18),transparent_32%),linear-gradient(135deg,#2e1065_0%,#86198f_45%,#fb7185_100%)]" />

      <div className="mx-auto max-w-6xl space-y-8">
        <header className="overflow-hidden rounded-[2rem] border border-white/25 bg-white/10 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/65">
                {t("account.eyebrow")}
              </div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">
                {t("account.title")}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/75">
                {t("account.subtitle")}
              </p>
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15 text-4xl">
              🤖
            </div>
          </div>
        </header>

        {loading ? (
          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 text-white/80">
            {t("account.loading")}
          </div>
        ) : message ? (
          <div className="rounded-3xl border border-red-200/25 bg-red-500/15 p-6 text-sm text-red-100">
            {message}
          </div>
        ) : profile ? (
          <>
            <section className="grid gap-4 md:grid-cols-3">
              {[
                {
                  label: t("account.plan"),
                  value: trialActive ? t("account.trial") : profile.plan || t("account.free"),
                  detail: profile.trial_ends_at ? `${t("account.trialEnds")}: ${profile.trial_ends_at}` : "Plan status",
                },
                {
                  label: t("account.aiUsedToday"),
                  value: trialActive ? t("account.unlimitedTrial") : String(usage?.usage_count || 0),
                  detail: "Daily assistant usage",
                },
                {
                  label: t("account.aiRemainingToday"),
                  value: trialActive ? t("account.unlimitedTrial") : String(remaining),
                  detail: "Free daily messages left",
                },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/18 bg-white/10 p-6 backdrop-blur-xl">
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">
                    {item.label}
                  </div>
                  <div className="mt-3 text-3xl font-bold">{item.value}</div>
                  <div className="mt-2 text-sm text-white/55">{item.detail}</div>
                </div>
              ))}
            </section>

            <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
              <div className="rounded-[2rem] border border-white/18 bg-white/10 p-6 backdrop-blur-xl">
                <h2 className="text-2xl font-bold">Profile</h2>
                <div className="mt-6 grid gap-3 text-sm">
                  {[
                    { label: t("account.email"), value: profile.email || "-" },
                    { label: t("account.name"), value: profile.full_name || "-" },
                    { label: t("account.language"), value: profile.language || "en" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/8 p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">
                        {item.label}
                      </div>
                      <div className="mt-1 text-white/90">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/18 bg-white/10 p-6 backdrop-blur-xl">
                <h2 className="text-2xl font-bold">Next</h2>
                <div className="mt-5 grid gap-3">
                  {[
                    { href: "/dashboard", label: "Open dashboard", detail: "Return to your assistant home" },
                    { href: "/assistant", label: "Command center", detail: "Manage memory, tasks, and briefings" },
                    { href: "/pricing", label: "Manage plan", detail: "Upgrade or review plans" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-2xl border border-white/10 bg-white/8 p-4 text-white transition hover:bg-white/15"
                    >
                      <div className="font-bold">{item.label} →</div>
                      <div className="mt-1 text-sm text-white/55">{item.detail}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 text-white/80">
            {t("account.noProfile")}
          </div>
        )}
      </div>
    </section>
  );
}
