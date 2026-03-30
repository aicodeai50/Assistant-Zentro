import Link from "next/link";
import {
  ArrowLeft,
  Compass,
  Flag,
  GitBranch,
  Map,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";

const PROGRESSION_STEPS = [
  {
    step: "01",
    title: "Start with a clear direction",
    desc: "Users begin by understanding what they want to do, not by guessing which tool to open first.",
    Icon: Compass,
  },
  {
    step: "02",
    title: "Enter the right path",
    desc: "Shynvo routes the user into the environment, system, or workflow that best fits the goal.",
    Icon: Map,
  },
  {
    step: "03",
    title: "Take guided next actions",
    desc: "AI guidance helps users know what to do next instead of leaving them with vague outputs or dead ends.",
    Icon: Workflow,
  },
  {
    step: "04",
    title: "Build momentum through structure",
    desc: "Progress becomes easier because every step connects to a larger path rather than isolated activity.",
    Icon: Flag,
  },
];

const PROGRESSION_BENEFITS = [
  {
    title: "Less confusion",
    desc: "Users do not waste energy deciding where to start or what to do next.",
  },
  {
    title: "Clearer movement",
    desc: "Every action belongs to a path, which makes progress feel deliberate instead of random.",
  },
  {
    title: "Better outcomes",
    desc: "Structured systems help users finish more, learn faster, and stay aligned with their goals.",
  },
];

const REAL_EXAMPLES = [
  {
    title: "Learner progression",
    desc: "A learner starts with a subject goal, enters the right study environment, receives guided AI support, and keeps moving through clear academic steps.",
  },
  {
    title: "Builder progression",
    desc: "A builder enters the technical environment, uses structured workflows, and continues from planning to execution without losing context.",
  },
  {
    title: "Decision progression",
    desc: "A user facing uncertainty can move from reflection and clarity into action, instead of remaining stuck in indecision.",
  },
];

export default function StructuredProgressionPage() {
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
              Structured Progression
            </div>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              How Shynvo helps users move forward with clarity
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
              Shynvo is designed so users do not have to piece together random tools,
              disconnected prompts, and unclear next steps. Progress is structured,
              guided, and connected to a larger path.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
            Progression model
          </div>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            The step-by-step logic behind progress
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {PROGRESSION_STEPS.map((item) => {
              const Icon = item.Icon;

              return (
                <div
                  key={item.step}
                  className="rounded-[1.25rem] border border-white/10 bg-[rgba(12,17,29,0.82)] p-5 shadow-[0_18px_34px_rgba(0,0,0,0.24)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon className="h-5 w-5 text-white/85" strokeWidth={1.8} />
                    </div>
                    <div className="text-sm font-semibold text-white/45">{item.step}</div>
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">{item.desc}</p>
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
            <div className="text-2xl font-semibold text-white">Why structured progression matters</div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {PROGRESSION_BENEFITS.map((item) => (
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

        <section className="mt-12">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
            Real platform patterns
          </div>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            What progression looks like in practice
          </h2>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {REAL_EXAMPLES.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.25rem] border border-white/10 bg-[rgba(12,17,29,0.82)] p-5 shadow-[0_18px_34px_rgba(0,0,0,0.24)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Target className="h-5 w-5 text-white/85" strokeWidth={1.8} />
                </div>

                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[1.5rem] border border-white/10 bg-[rgba(12,17,29,0.72)] p-6 shadow-[0_18px_34px_rgba(0,0,0,0.24)] sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
              <Sparkles className="h-5 w-5 text-white/85" strokeWidth={1.8} />
            </div>
            <div className="text-2xl font-semibold text-white">The bigger idea</div>
          </div>

          <div className="mt-5 max-w-4xl text-sm leading-7 text-white/72 sm:text-base">
            Structured progression means users are not left alone to assemble a
            path from disconnected tools. Shynvo helps them move from intent, to
            direction, to action, and then to continued progress through connected
            environments and AI-guided support.
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              Open platform guide
            </Link>

            <Link
              href="/ai-guided-intelligence"
              className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              View intelligence layer
            </Link>

            <Link
              href="/modular-architecture"
              className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              View architecture
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}