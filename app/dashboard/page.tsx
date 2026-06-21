"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase/client";
import { loadRobotMemory, type RobotMemoryItem } from "@/lib/robot/memory";
import { loadRobotTasks, type RobotTaskItem } from "@/lib/robot/tasks";

type DashboardProfile = {
  email?: string | null;
  full_name?: string | null;
  plan?: string | null;
  trial_ends_at?: string | null;
};

function daysLeft(trialEndsAt?: string | null) {
  if (!trialEndsAt) return null;
  const end = new Date(trialEndsAt).getTime();
  const now = Date.now();
  const diff = end - now;
  const d = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return d;
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
  const displayName = profile?.full_name || profile?.email || "Builder";
  const plan = profile?.plan || "trial";

  if (loading) {
    return (
      <main className="min-h-screen bg-[linear-gradient(135deg,#2e1065,#86198f,#fb7185)] p-10 text-white">
        Loading your Zentro dashboard...
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(217,70,239,0.26),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(34,211,238,0.18),transparent_32%),linear-gradient(135deg,#2e1065_0%,#86198f_45%,#fb7185_100%)]" />

      <div className="mx-auto max-w-7xl space-y-8">
        <section className="overflow-hidden rounded-[2rem] border border-white/25 bg-white/10 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/65">
                Zentro Dashboard
              </div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">
                Welcome back, {displayName}.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/75">
                Your assistant workspace is ready. Continue with memory, tasks, briefings,
                and your next focused action.
              </p>
            </div>

            <div className="rounded-3xl border border-white/20 bg-white/12 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl">
                  🤖
                </div>
                <div>
                  <div className="font-semibold">Zentro Assistant</div>
                  <div className="text-sm text-white/60">{profile?.email}</div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-white/10 p-3">
                  <div className="text-white/50">Plan</div>
                  <div className="mt-1 font-semibold capitalize">{plan}</div>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <div className="text-white/50">Trial</div>
                  <div className="mt-1 font-semibold">
                    {left === null ? "Active" : left > 0 ? `${left} day(s)` : "Ended"}
                  </div>
                </div>
              </div>

              <Link
                href="/pricing"
                className="mt-4 inline-flex w-full justify-center rounded-2xl bg-white px-4 py-3 text-sm font-bold text-fuchsia-800 transition hover:bg-white/90"
              >
                Manage plan
              </Link>
            </div>
          </div>
        </section>

        {message ? (
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-white/85">
            {message}
          </div>
        ) : null}

        <section className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Memories", value: memory.length, detail: "Saved context for your assistant" },
            { label: "Open tasks", value: openTasks.length, detail: "Actions waiting for progress" },
            { label: "Completed", value: doneTasks.length, detail: "Tasks marked done locally" },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/18 bg-white/10 p-6 backdrop-blur-xl">
              <div className="text-4xl font-bold">{item.value}</div>
              <div className="mt-2 text-sm font-semibold">{item.label}</div>
              <div className="mt-1 text-sm text-white/55">{item.detail}</div>
            </div>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-4">
          {[
            {
              href: "/assistant",
              title: "Assistant Command Center",
              body: "Manage memory, tasks, cloud sync, and daily briefings.",
              cta: "Open center",
            },
            {
              href: "/account",
              title: "Account",
              body: "Review your profile, plan, trial status, and daily AI usage.",
              cta: "View account",
            },
            {
              href: "/os",
              title: "Zentro OS",
              body: "Enter the operating layer for missions, focus, and timeline.",
              cta: "Enter OS",
            },
            {
              href: "/docs",
              title: "Docs",
              body: "Learn the platform, workflows, and setup paths.",
              cta: "Read docs",
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-3xl border border-white/18 bg-white/10 p-6 text-white transition hover:-translate-y-1 hover:bg-white/15"
            >
              <div className="text-lg font-bold">{card.title}</div>
              <p className="mt-3 text-sm leading-6 text-white/62">{card.body}</p>
              <div className="mt-5 text-sm font-bold text-cyan-100">{card.cta} →</div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
