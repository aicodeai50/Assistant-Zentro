import Link from "next/link";
import { SITE_NAME, SITE_SHORT_NAME } from "@/lib/site";
import HomeHeroRobot from "./components/HomeHeroRobot";
import HomeHeroActions, { HomeQuickAsk } from "./components/HomeQuickAsk";

const trustItems = [
  "Approval-gated automations",
  "Immutable audit logs",
  "Read-first incident triage",
  "Rollback-ready workflows",
];

const modules = [
  {
    title: "Incident Copilot",
    tag: "Triage",
    description:
      "Contextual AI summaries, likely root causes, and recommended next steps — so on-call engineers act with clarity, not guesswork.",
    href: "/docs",
  },
  {
    title: "Automation Engine",
    tag: "Execute",
    description:
      "Convert repeated IT tasks into guarded workflows with human approvals, execution logs, and rollback plans before anything touches production.",
    href: "/robot",
  },
  {
    title: "Runbook Intelligence",
    tag: "Knowledge",
    description:
      "Make internal SOPs searchable and actionable. Your team finds the right procedure and executes with confidence during high-pressure incidents.",
    href: "/search",
  },
];

const workflow = [
  {
    step: "01",
    title: "Connect context",
    body: "Integrate monitoring, tickets, and runbooks so the assistant reasons over real operational data.",
  },
  {
    step: "02",
    title: "Triage with AI",
    body: "Incident Copilot summarizes signals, surfaces likely causes, and proposes safe next steps for review.",
  },
  {
    step: "03",
    title: "Execute with guardrails",
    body: "Automations run only after approval — every action logged, reversible, and audit-ready.",
  },
];

const metrics = [
  { value: "60%", label: "Faster incident triage", detail: "Less time gathering context" },
  { value: "40%", label: "Reduction in manual toil", detail: "Automate repeat work safely" },
  { value: "100%", label: "Audit-ready actions", detail: "Logs + approvals by default" },
];

export default function HomePage() {
  return (
    <div className="relative z-10">
      {/* Hero */}
      <section className="zentro-hero mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
          <div>
            <div className="zentro-badge mb-6 inline-flex items-center gap-2">
              <span className="zentro-status-dot" />
              Production-ready AI operations platform
            </div>

            <h1 className="mb-6 max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              The IT operations assistant
              <span className="zentro-gradient-text"> your team trusts</span>
            </h1>

            <p className="mb-8 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
              {SITE_SHORT_NAME} unifies AI reasoning and safe automation in one command center.
              Meet your 3D operations assistant — built for teams that need speed, safety, and
              accountability.
            </p>

            <HomeHeroActions />

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/[0.06] pt-8">
              {trustItems.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-white/45"
                >
                  <span className="h-1 w-1 rounded-full bg-cyan-400/80" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <HomeHeroRobot />
        </div>
      </section>

      {/* Metrics */}
      <section className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl divide-y divide-white/[0.06] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {metrics.map((m) => (
            <div key={m.label} className="px-6 py-10 sm:px-8">
              <p className="text-4xl font-bold tracking-tight text-cyan-200">{m.value}</p>
              <p className="mt-2 text-sm font-semibold text-white/90">{m.label}</p>
              <p className="mt-1 text-xs text-white/45">{m.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <HomeQuickAsk />

      {/* Platform workflow */}
      <section id="platform" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="zentro-section-label">How it works</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            From alert to audited action
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/55">
            {SITE_NAME} guides your team through a disciplined operations loop — never skipping
            context, approval, or accountability.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {workflow.map((item) => (
            <div key={item.step} className="zentro-card p-6 sm:p-7">
              <span className="font-[family-name:var(--font-space-mono)] text-xs font-bold text-cyan-400/80">
                {item.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="zentro-section-label">Platform modules</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Built for modern IT teams
            </h2>
          </div>
          <Link href="/docs" className="zentro-link text-sm font-medium">
            View full documentation →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {modules.map((mod) => (
            <Link key={mod.title} href={mod.href} className="zentro-card group p-6 sm:p-7">
              <span className="zentro-tag">{mod.tag}</span>
              <h3 className="mt-4 text-xl font-semibold text-white group-hover:text-cyan-100">
                {mod.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{mod.description}</p>
              <span className="zentro-link mt-6 inline-block text-xs font-semibold uppercase tracking-[0.12em]">
                Explore module
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
