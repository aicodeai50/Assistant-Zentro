import Link from "next/link";
import { SITE_NAME, SITE_SHORT_NAME } from "@/lib/site";
import HomeHeroRobot from "./components/HomeHeroRobot";
import HomeHeroActions, { HomeQuickAsk } from "./components/HomeQuickAsk";

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
    href: "/robot",
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
    <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-14 sm:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
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
            {SITE_SHORT_NAME} unifies your AI backend and automation backend into one command center
            with a real 3D assistant core, built for IT teams that need speed, safety, and accountability.
          </p>
          <HomeHeroActions />
        </div>

        <HomeHeroRobot />
      </section>

      <section className="mt-14 grid gap-4 sm:grid-cols-3">
        {outcomes.map((item) => (
          <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-3xl font-bold text-cyan-200">{item.value}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/55">{item.label}</p>
          </div>
        ))}
      </section>

      <HomeQuickAsk />

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
                Explore module
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
