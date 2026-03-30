import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  BrainCircuit,
  Compass,
  GitBranch,
  Sparkles,
  Target,
} from "lucide-react";

const PRINCIPLES = [
  {
    title: "Intent recognition",
    desc: "Shynvo reads what the user is trying to do before pushing them into a tool or environment.",
    Icon: Compass,
  },
  {
    title: "Context-aware guidance",
    desc: "Guidance changes depending on whether the user needs learning help, execution support, or strategic reflection.",
    Icon: BrainCircuit,
  },
  {
    title: "Progress-aware support",
    desc: "The system helps users move forward with clearer next steps instead of leaving them with disconnected outputs.",
    Icon: Sparkles,
  },
];

const SYSTEMS = [
  {
    title: "Robots",
    desc: "Execution-oriented AI agents for learning, planning, coding, writing, and task support.",
    points: [
      "Best when the user wants to do something",
      "Supports active work, task completion, and direction",
      "Examples: StudyBot, CodeBot, StrategyBot, ResearchBot",
    ],
    href: "/os/robots",
    cta: "Open robots",
    Icon: Bot,
  },
  {
    title: "AI Council",
    desc: "Reflection and decision support for uncertainty, emotional pressure, priorities, and strategic thinking.",
    points: [
      "Best when the user needs clarity before acting",
      "Helps with difficult choices and inner conflict",
      "Focuses on reasoning, perspective, and calm decision support",
    ],
    href: "/os/council",
    cta: "Open AI Council",
    Icon: BrainCircuit,
  },
];

const DECISION_RULES = [
  {
    title: "Use Robots when you need execution",
    desc: "Go here when you want help building, studying, researching, planning, or producing a concrete next step.",
  },
  {
    title: "Use AI Council when you need clarity",
    desc: "Go here when you feel stuck, uncertain, emotionally overloaded, or unsure which direction is right.",
  },
  {
    title: "Use platform paths when you need orientation",
    desc: "Go to the platform guide when you first need to understand which environment matches your goal.",
  },
];

export default function AIGuidedIntelligencePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050913] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-30 bg-[#050913]" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(900px_520px_at_18%_12%,rgba(99,102,241,0.16),transparent_58%),radial-gradient(760px_420px_at_82%_18%,rgba(255,255,255,0.06),transparent_48%),linear-gradient(to_bottom,rgba(5,9,19,0.08),rgba(5,9,19,0.24),rgba(5,9,19,0.82))]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[58%] opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:42px_42px]"
      />

      <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <section className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-[4px] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="max-w-4xl">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
              AI-Guided Intelligence
            </div>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              The intelligence layer behind Shynvo
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
              Shynvo is not just a collection of environments. It uses an intelligence
              layer to understand user intent, guide people toward the right system,
              and reduce confusion through structured support.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
            Core principles
          </div>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            How intelligence works across the platform
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {PRINCIPLES.map((item) => {
              const Icon = item.Icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[1.25rem] border border-white/10 bg-[rgba(12,17,29,0.82)] p-5 shadow-[0_18px_34px_rgba(0,0,0,0.24)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Icon className="h-5 w-5 text-white/85" strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-12">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
            Intelligence systems
          </div>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Robots and AI Council serve different roles
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
            These systems should not be treated as the same thing. One supports
            execution. The other supports reflection and decision-making.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {SYSTEMS.map((item) => {
              const Icon = item.Icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[1.4rem] border border-white/10 bg-[rgba(12,17,29,0.84)] p-6 shadow-[0_18px_34px_rgba(0,0,0,0.24)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon className="h-5 w-5 text-white/85" strokeWidth={1.8} />
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-white">{item.title}</div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-white/72">{item.desc}</p>

                  <div className="mt-5 space-y-3">
                    {item.points.map((point) => (
                      <div
                        key={point}
                        className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white/72"
                      >
                        {point}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
                    >
                      {item.cta}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-12 rounded-[1.5rem] border border-white/10 bg-[rgba(12,17,29,0.72)] p-6 shadow-[0_18px_34px_rgba(0,0,0,0.24)] sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
              <GitBranch className="h-5 w-5 text-white/85" strokeWidth={1.8} />
            </div>
            <div className="text-2xl font-semibold text-white">When to use each system</div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {DECISION_RULES.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.1rem] border border-white/8 bg-white/[0.03] p-5"
              >
                <div className="text-lg font-semibold text-white">{item.title}</div>
                <p className="mt-3 text-sm leading-6 text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[1.5rem] border border-white/10 bg-[rgba(12,17,29,0.72)] p-6 shadow-[0_18px_34px_rgba(0,0,0,0.24)] sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
              <Target className="h-5 w-5 text-white/85" strokeWidth={1.8} />
            </div>
            <div className="text-2xl font-semibold text-white">What this means for users</div>
          </div>

          <div className="mt-5 max-w-4xl text-sm leading-7 text-white/72 sm:text-base">
            Instead of sending people into random tools and hoping they figure things out,
            Shynvo uses intelligent guidance to reduce overwhelm, clarify next steps, and
            route users into the environment or support system that matches their real
            need. This is why the platform feels structured rather than chaotic.
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              Open platform guide
            </Link>

            <Link
              href="/robot"
              className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              Open Shynvo Robot
            </Link>

            <Link
              href="/os/council"
              className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              Open AI Council
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}