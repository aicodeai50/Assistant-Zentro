import Link from "next/link";
import {
  GraduationCap,
  Layers3,
  Users,
  ShieldCheck,
  BookOpen,
  Bot,
  Workflow,
  Sparkles,
  Cpu,
} from "lucide-react";
import PreviewTypingLoop from "../components/PreviewTypingLoop";
import ExploreWorldsCard from "../components/ExploreWorldsCard";
import ProofWithoutScreenshots from "../components/ProofWithoutScreenshots";

const VALUE_POINTS = [
  {
    title: "For learners",
    desc: "Study with structure instead of scattered AI chats and random resources.",
    Icon: GraduationCap,
  },
  {
    title: "For builders",
    desc: "Use guided environments for coding, workflows, experiments, and execution.",
    Icon: Layers3,
  },
  {
    title: "For teams",
    desc: "Coordinate missions, analytics, and organized work inside focused systems.",
    Icon: Users,
  },
];

const PLATFORM_PREVIEWS = [
  {
    title: "Shynvo Robot",
    desc: "AI guide that helps users navigate the platform, choose a direction, and get started faster.",
    href: "/robot",
    mode: "Guide",
    previewType: "robot" as const,
    lines: [
      "Scanning intent",
      "local loop",
      "Next step: choose where to begin",
    ],
  },
  {
    title: "University Hub",
    desc: "Structured academic learning space for guided study, faculties, and higher education paths.",
    href: "/university",
    mode: "Learning",
    previewType: "university" as const,
    lines: [
      "Path syncing",
      "local loop",
      "Loading academic pathways...",
    ],
  },
  {
    title: "Frontier Lab",
    desc: "Technical environment for coding, systems, engineering workflows, and build-focused practice.",
    href: "/frontier",
    mode: "Build",
    previewType: "frontier" as const,
    lines: [
      "Build mode",
      "local loop",
      "Mode active: AI Builder",
    ],
  },
];

const INSIDE_SHYNVO = [
  {
    title: "Guided AI support",
    desc: "Use Shynvo Robot to understand where to start, what to do next, and how to move through the platform.",
    Icon: Bot,
  },
  {
    title: "Focused environments",
    desc: "Each environment is built around a real purpose: learning, building, simulation, strategy, or training.",
    Icon: Workflow,
  },
  {
    title: "Structured progression",
    desc: "Move through clear paths instead of trying to build everything from scratch with no direction.",
    Icon: Sparkles,
  },
];

function ShellCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[1.75rem] border border-white/10 bg-white/5 backdrop-blur-[2px] ${className}`}>
      {children}
    </div>
  );
}

export default function HomeStructurePreviewPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070B11] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_500px_at_10%_10%,rgba(59,130,246,0.10),transparent_60%),radial-gradient(800px_420px_at_85%_20%,rgba(16,185,129,0.10),transparent_58%)]"
      />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <ShellCard className="p-5 sm:p-6 lg:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
              Structured AI Platform
            </div>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Shynvo
            </h1>

            <p className="mt-3 max-w-4xl text-xl font-medium leading-tight text-white/92 sm:text-2xl lg:text-[2.5rem]">
              Learn, build, train, and explore inside guided AI environments
            </p>

            <p className="mt-5 max-w-3xl text-base leading-7 text-white/78 sm:text-lg">
              Shynvo is a structured AI platform for learners, builders, and teams who want guided environments instead of scattered tools, random prompts, and unclear workflows.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/sign-up"
                className="inline-flex items-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
              >
                Start for free
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
              >
                Read Docs
              </Link>
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-white/85">
              <div className="text-sm font-semibold text-white">Start clearly</div>
              <ul className="mt-2 space-y-1 text-white/78">
                <li>Create an account to use Shynvo.</li>
                <li>Every new user starts with a 7-day free trial.</li>
                <li>You get full access during the trial.</li>
                <li>Upgrade after the trial to continue using the platform.</li>
              </ul>
            </div>
          </ShellCard>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            {INSIDE_SHYNVO.map((item) => {
              const Icon = item.Icon;
              return (
                <ShellCard key={item.title} className="p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <Icon className="h-5 w-5 text-white/80" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/72">{item.desc}</p>
                </ShellCard>
              );
            })}
          </div>
        </div>

        <section className="mt-16">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
            What Shynvo is
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            One platform for learning, building, and AI-guided work
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/72 sm:text-base lg:text-lg">
            Shynvo helps people move from confusion to structured progress by giving them clear environments, guided AI help, and focused digital workflows.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {VALUE_POINTS.map((item) => {
              const Icon = item.Icon;
              return (
                <ShellCard key={item.title} className="p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <Icon className="h-5 w-5 text-white/80" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/72">{item.desc}</p>
                </ShellCard>
              );
            })}
          </div>
        </section>

        <div className="mt-16">
          <ProofWithoutScreenshots />
        </div>

        <section className="mt-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
                See inside Shynvo
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                What the platform looks like
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/72 sm:text-base lg:text-lg">
                Explore how Shynvo looks and feels before you enter. These previews show real directions inside the platform and where each experience begins.
              </p>
            </div>

            <Link
              href="/"
              className="hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10 lg:inline-flex"
            >
              Back to current home
            </Link>
          </div>

          <div className="mt-8 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
              {PLATFORM_PREVIEWS.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group"
                >
                  <ShellCard className="h-full p-5 transition hover:bg-white/[0.07]">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-white">{item.title}</div>
                        <p className="mt-2 text-sm leading-6 text-white/70">{item.desc}</p>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/55">
                        {item.mode}
                      </span>
                    </div>

                    <div className="mt-4 relative aspect-[16/10] overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/40 p-3">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(132,204,22,0.16),transparent_38%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.12),transparent_42%)]" />
                      <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(255,255,255,0.20)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.20)_1px,transparent_1px)] [background-size:20px_20px]" />

                      <div className="relative z-10 flex h-full flex-col justify-between">
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.95)]" />
                          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                            Live preview
                          </span>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-black/25 p-3 backdrop-blur-sm">
                          <PreviewTypingLoop
                            variant={item.previewType}
                            lines={item.lines}
                          />
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/60">
                            AI active
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/60">
                            Cinematic
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/60">
                            Live
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-sm font-semibold text-white/90 group-hover:text-white">
                        Open preview path
                      </span>
                      <span className="text-white/45">→</span>
                    </div>
                  </ShellCard>
                </Link>
              ))}
            </div>

            <div className="space-y-4">
              <ShellCard className="p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                  Layout direction
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  Better structure without touching the live homepage
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/72">
                  This preview route reorganizes the homepage into a cleaner hierarchy: hero first, value second, proof third, previews fourth, then exploration.
                </p>

                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-sm font-semibold text-white">1. Strong first screen</div>
                    <p className="mt-1 text-sm text-white/70">
                      Hero and supporting cards are balanced side-by-side.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-sm font-semibold text-white">2. Clear section rhythm</div>
                    <p className="mt-1 text-sm text-white/70">
                      Each block now has more breathing room and cleaner spacing.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-sm font-semibold text-white">3. Preview-led storytelling</div>
                    <p className="mt-1 text-sm text-white/70">
                      Platform previews are treated like the main visual showcase.
                    </p>
                  </div>
                </div>
              </ShellCard>

              <ShellCard className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <Cpu className="h-5 w-5 text-white/80" strokeWidth={1.8} />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">Safe preview route</h3>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  You can review this structure at a separate URL first. The live homepage remains unchanged until you decide to copy this layout back.
                </p>
                <div className="mt-5">
                  <Link
                    href="/"
                    className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                  >
                    Open current homepage
                  </Link>
                </div>
              </ShellCard>
            </div>
          </div>
        </section>

        <div className="mt-16">
          <ExploreWorldsCard />
        </div>

        <section className="mt-16">
          <div className="grid gap-4 md:grid-cols-3">
            <ShellCard className="p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <ShieldCheck className="h-5 w-5 text-white/80" strokeWidth={1.8} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">Security and trust</h3>
              <p className="mt-2 text-sm leading-6 text-white/72">
                Terms, Privacy, Refund, and Contact links are visible for transparency and support.
              </p>
            </ShellCard>

            <ShellCard className="p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Users className="h-5 w-5 text-white/80" strokeWidth={1.8} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">Built for real users</h3>
              <p className="mt-2 text-sm leading-6 text-white/72">
                Shynvo is designed for students, independent learners, builders, and organized teams.
              </p>
            </ShellCard>

            <ShellCard className="p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <BookOpen className="h-5 w-5 text-white/80" strokeWidth={1.8} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">Documentation and support</h3>
              <p className="mt-2 text-sm leading-6 text-white/72">
                Use docs for platform understanding and contact support when you need help.
              </p>
            </ShellCard>
          </div>
        </section>
      </section>
    </main>
  );
}
