import Link from "next/link";
import {
  ArrowLeft,
  Blocks,
  BookOpen,
  Briefcase,
  Cpu,
  FlaskConical,
  Gamepad2,
  Layers3,
  Network,
  Orbit,
} from "lucide-react";

const PRINCIPLES = [
  {
    title: "Purpose-built modules",
    desc: "Each environment is designed around a real use case instead of trying to force every need into one generic interface.",
    Icon: Blocks,
  },
  {
    title: "Connected workflows",
    desc: "Different environments serve different goals, but they still belong to one larger system with shared logic and guidance.",
    Icon: Network,
  },
  {
    title: "Unified platform structure",
    desc: "Shynvo stays modular without feeling fragmented, so users can move between areas without losing direction.",
    Icon: Layers3,
  },
];

const MODULES = [
  {
    title: "University Hub",
    desc: "Structured academic learning with faculties, study paths, and guided progression for higher education.",
    href: "/university",
    Icon: BookOpen,
  },
  {
    title: "Shynvo Academy",
    desc: "School-level learning for junior and senior learners with focused subject-based guidance.",
    href: "/academy",
    Icon: BookOpen,
  },
  {
    title: "Frontier Lab",
    desc: "Technical and engineering environment for code, systems, experimentation, and advanced build workflows.",
    href: "/frontier",
    Icon: Cpu,
  },
  {
    title: "Enterprise Suite",
    desc: "Organized execution space for teams, missions, planning, workflows, and structured operational work.",
    href: "/enterprise",
    Icon: Briefcase,
  },
  {
    title: "Experiments",
    desc: "Exploration environments for concepts, simulations, thinking models, and AI-assisted investigation.",
    href: "/experiments",
    Icon: FlaskConical,
  },
  {
    title: "Arcade Sim",
    desc: "Interactive skill practice through challenges, simulation loops, and game-like structured progression.",
    href: "/arcade",
    Icon: Gamepad2,
  },
  {
    title: "Shynvo OS",
    desc: "The operating core that connects intelligence systems, AI chambers, robots, and internal platform orchestration.",
    href: "/os",
    Icon: Orbit,
  },
];

const BENEFITS = [
  {
    title: "No single crowded interface",
    desc: "Users do not get trapped in one overloaded screen trying to do everything in the same place.",
  },
  {
    title: "Better mental clarity",
    desc: "Each environment has a purpose, which makes it easier to understand where to go and why it exists.",
  },
  {
    title: "Scales without chaos",
    desc: "New environments can grow inside the system without breaking the experience or confusing navigation.",
  },
];

export default function ModularArchitecturePage() {
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
              Modular Architecture
            </div>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Why Shynvo is built as connected environments
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
              Shynvo is not meant to be one oversized interface that tries to do
              everything at once. It is built as a modular platform where each
              environment has a clear purpose, while still remaining part of one
              connected system.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
            Core architecture principles
          </div>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            The logic behind the platform structure
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
            Platform modules
          </div>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Each area serves a different purpose
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
            The goal is not to make every environment look the same. The goal is to
            let each area specialize while still belonging to one larger platform.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {MODULES.map((item) => {
              const Icon = item.Icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[1.25rem] border border-white/10 bg-[rgba(12,17,29,0.84)] p-5 shadow-[0_18px_34px_rgba(0,0,0,0.24)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon className="h-5 w-5 text-white/85" strokeWidth={1.8} />
                    </div>
                    <div className="text-lg font-semibold text-white">{item.title}</div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-white/72">{item.desc}</p>

                  <div className="mt-5">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
                    >
                      Open module
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-12 rounded-[1.5rem] border border-white/10 bg-[rgba(12,17,29,0.72)] p-6 shadow-[0_18px_34px_rgba(0,0,0,0.24)] sm:p-8">
          <div className="text-2xl font-semibold text-white">
            What users gain from this structure
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {BENEFITS.map((item) => (
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
          <div className="text-2xl font-semibold text-white">
            The bigger idea
          </div>

          <div className="mt-5 max-w-4xl text-sm leading-7 text-white/72 sm:text-base">
            Shynvo uses modular architecture so that learning, building, strategy,
            experimentation, and execution do not collapse into one chaotic interface.
            Each environment can stay focused, while the platform as a whole remains
            intelligent, connected, and scalable.
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              Open platform guide
            </Link>

            <Link
              href="/university"
              className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              Open University Hub
            </Link>

            <Link
              href="/frontier"
              className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              Open Frontier Lab
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}