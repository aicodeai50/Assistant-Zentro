"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase/client";
import { loadRobotMemory, type RobotMemoryItem } from "@/lib/robot/memory";
import { loadRobotTasks, type RobotTaskItem } from "@/lib/robot/tasks";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageShell } from "@/components/ui/PageShell";

type DashboardProfile = {
  email?: string | null;
  full_name?: string | null;
  plan?: string | null;
  trial_ends_at?: string | null;
};

function daysLeft(trialEndsAt?: string | null) {
  if (!trialEndsAt) return null;
  const end = new Date(trialEndsAt).getTime();
  const diff = end - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<DashboardProfile | null>(null);
  const [memory, setMemory] = useState<RobotMemoryItem[]>([]);
  const [tasks, setTasks] = useState<RobotTaskItem[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      setMemory(loadRobotMemory());
      setTasks(loadRobotTasks());

      const supabase = getSupabaseClient();
      if (!supabase) {
        if (mounted) {
          setMessage("Sign in is not configured yet. Add Supabase environment variables first.");
          setLoading(false);
        }
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/sign-in?next=/dashboard");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("email, full_name, plan, trial_ends_at")
        .eq("id", user.id)
        .maybeSingle();

      if (mounted) {
        setProfile({
          email: data?.email ?? user.email,
          full_name: data?.full_name ?? user.user_metadata?.full_name ?? "",
          plan: data?.plan ?? "trial",
          trial_ends_at: data?.trial_ends_at ?? null,
        });
        setLoading(false);
      }
    }

    void loadDashboard();

    return () => {
      mounted = false;
    };
  }, [router]);

  const left = useMemo(() => daysLeft(profile?.trial_ends_at), [profile?.trial_ends_at]);
  const openTasks = useMemo(() => tasks.filter((item) => item.status === "open"), [tasks]);
  const doneTasks = useMemo(() => tasks.filter((item) => item.status === "done"), [tasks]);
  const displayName = profile?.full_name || profile?.email || "Operator";
  const plan = profile?.plan || "trial";

  if (loading) {
    return (
      <PageShell eyebrow="Dashboard" title="Loading workspace">
        <Card>Loading your Zentro dashboard…</Card>
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow="Operations workspace"
      title={`Welcome back, ${displayName}`}
      description="Your command center for assistant memory, tasks, billing, and next actions."
      actions={
        <>
          <ButtonLink href="/assistant" size="sm">
            Open Assistant
          </ButtonLink>
          <ButtonLink href="/settings" variant="secondary" size="sm">
            Settings
          </ButtonLink>
        </>
      }
    >
      {message ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/80">
          {message}
        </div>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card padding="lg">
          <CardHeader
            eyebrow="Today"
            title="Operating snapshot"
            description="Track what your assistant knows and what still needs action."
          />

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Memories", value: memory.length, detail: "Saved assistant context" },
              { label: "Open tasks", value: openTasks.length, detail: "Waiting for progress" },
              { label: "Completed", value: doneTasks.length, detail: "Marked done locally" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="text-3xl font-bold text-cyan-100">{item.value}</div>
                <div className="mt-1 text-sm font-semibold text-white">{item.label}</div>
                <div className="mt-1 text-xs text-white/45">{item.detail}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="lg">
          <CardHeader
            eyebrow="Account"
            title={profile?.email || "Signed in"}
            description="Plan status and billing"
            action={<Badge variant="info">{plan}</Badge>}
          />

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="text-white/45">Plan</div>
              <div className="mt-1 font-semibold capitalize">{plan}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="text-white/45">Trial</div>
              <div className="mt-1 font-semibold">
                {left === null ? "Active" : left > 0 ? `${left} day(s)` : "Ended"}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <ButtonLink href="/settings?billing=1" className="w-full">
              Manage billing
            </ButtonLink>
            <ButtonLink href="/pricing" variant="secondary" className="w-full">
              View plans
            </ButtonLink>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            href: "/assistant",
            title: "Command Center",
            body: "Memory, tasks, briefings, and optional cloud sync.",
            cta: "Open center",
          },
          {
            href: "/settings",
            title: "Settings",
            body: "Profile, PayPal billing, and assistant preferences.",
            cta: "Open settings",
          },
          {
            href: "/search",
            title: "Runbook search",
            body: "Find procedures and operational knowledge quickly.",
            cta: "Search runbooks",
          },
          {
            href: "/docs",
            title: "Documentation",
            body: "Platform setup, workflows, and operator guides.",
            cta: "Read docs",
          },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition hover:border-cyan-300/20 hover:bg-white/[0.05]"
          >
            <div className="text-lg font-semibold text-white">{card.title}</div>
            <p className="mt-3 text-sm leading-6 text-white/55">{card.body}</p>
            <div className="mt-5 text-sm font-semibold text-cyan-200 group-hover:text-cyan-100">
              {card.cta} →
            </div>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}
