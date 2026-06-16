import Link from "next/link";
import { SITE_NAME, SITE_SHORT_NAME, SITE_URL } from "@/lib/site";

const modules = [
  {
    title: "Incident Copilot",
    description:
      "Triage incidents faster with contextual AI summaries, likely causes, and next safe steps.",
    href: "/docs",
  },
  {
    title: "Automation Engine",
    description:
      "Turn repeated IT tasks into guarded workflows with approvals, logs, and rollback plans.",
    href: "/platform",
  },
  {
    title: "Runbook Intelligence",
    description:
      "Make internal SOPs searchable and actionable so your team can execute with confidence.",
    href: "/search",
  },
];

const outcomes = [
  { label: "Faster triage", value: "60%" },
  { label: "Lower toil", value: "40%" },
  { label: "Audit-ready actions", value: "100%" },
];

export default function HomePage() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-14 sm:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs uppercase tracking-[0.16em] text-cyan-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_#34d399]" />
            Zentro Platform Live
          </div>
          <h1 className="mb-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            {SITE_NAME} for reliable
            <span className="text-cyan-300"> AI operations</span>
          </h1>
          <p className="mb-8 max-w-2xl text-base text-white/70 sm:text-lg">
            {SITE_SHORT_NAME} unifies your AI backend and automation backend into one clean command center
            built for IT teams that need speed, safety, and accountability.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="rounded-md bg-cyan-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-950 transition hover:bg-cyan-200"
            >
              Launch Platform
            </Link>
            <Link
              href="/pricing"
              className="rounded-md border border-white/20 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white/85 transition hover:border-cyan-300/60 hover:text-cyan-200"
            >
              View Plans
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
          <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.14em] text-white/45">
            <span>Live Command Feed</span>
            <span className="text-emerald-300">Operational</span>
          </div>
          <div className="space-y-3 font-mono text-xs text-white/80">
            <div className="rounded-md border border-cyan-400/20 bg-cyan-400/10 px-3 py-2">
              Incident #9381 detected on API gateway latency.
            </div>
            <div className="rounded-md border border-white/10 bg-black/30 px-3 py-2">
              Copilot suggested 3 safe remediation actions.
            </div>
            <div className="rounded-md border border-white/10 bg-black/30 px-3 py-2">
              Awaiting approval for restart sequence (non-destructive).
            </div>
            <div className="rounded-md border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-emerald-200">
              Audit log saved. Team notified in Slack.
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-4 sm:grid-cols-3">
        {outcomes.map((item) => (
          <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-3xl font-bold text-cyan-200">{item.value}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/55">{item.label}</p>
          </div>
        ))}
      </section>

      <section className="mt-16">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Core Platform Modules</h2>
          <span className="text-xs uppercase tracking-[0.14em] text-cyan-200/70">Built for IT</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {modules.map((module) => (
            <Link
              key={module.title}
              href={module.href}
              className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/45 hover:bg-cyan-400/[0.05]"
            >
              <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-cyan-200">
                {module.title}
              </h3>
              <p className="text-sm leading-6 text-white/65">{module.description}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.12em] text-cyan-200/80">
                Open Module →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
