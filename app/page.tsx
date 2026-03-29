import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import PreviewTypingLoop from "./components/PreviewTypingLoop";
import ExploreWorldsCard from "./components/ExploreWorldsCard";
import {
  Bot,
  Workflow,
  Sparkles,
  BookOpen,
  Cpu,
  ArrowUpRight,
} from "lucide-react";

const VALUE_POINTS = [
  {
    title: "Guided AI Support",
    desc: "Shynvo Robot helps users know where to start, what to open, and how to move with more clarity.",
    Icon: Bot,
  },
  {
    title: "Focused Environments",
    desc: "Each area has a real purpose for learning, building, exploration, and structured platform use.",
    Icon: Workflow,
  },
  {
    title: "Structured Progression",
    desc: "Clear paths replace scattered tools, random prompts, and unclear next steps.",
    Icon: Sparkles,
  },
];

const PLATFORM_PREVIEWS = [
  {
    title: "Shynvo Robot",
    desc: "Guided AI assistant to help users choose where to begin.",
    href: "/robot",
    label: "Guide",
    Icon: Bot,
    lines: [
      "Scanning intent...",
      "Next step: choose where to begin",
      "Recommended route: Shynvo Robot",
    ],
    variant: "robot" as const,
  },
  {
    title: "University Hub",
    desc: "Structured academic learning for guided study and higher education paths.",
    href: "/university",
    label: "Learning",
    Icon: BookOpen,
    lines: [
      "Loading academic pathways...",
      "Faculty ready: Computer Science",
      "Next lesson: Algorithms fundamentals",
    ],
    variant: "university" as const,
  },
  {
    title: "Frontier Lab",
    desc: "Technical environment for code, systems, and build-focused practice.",
    href: "/frontier",
    label: "Build",
    Icon: Cpu,
    lines: [
      "Booting Frontier systems...",
      "Mode active: AI Builder",
      "Preparing engineering workflow...",
    ],
    variant: "frontier" as const,
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top,rgba(40,90,255,0.14),transparent_26%),radial-gradient(circle_at_80%_18%,rgba(50,220,170,0.12),transparent_20%),linear-gradient(180deg,#060918_0%,#050816_48%,#060918_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.18] [background-image:linear-gradient(rgba(120,170,255,0.20)_1px,transparent_1px),linear-gradient(90deg,rgba(120,170,255,0.20)_1px,transparent_1px)] [background-size:48px_48px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_62%,rgba(0,0,0,0.48)_100%)]"
      />

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="rounded-[2rem] border border-cyan-200/15 bg-[linear-gradient(180deg,rgba(8,14,28,0.92),rgba(7,12,24,0.86))] p-4 shadow-[0_0_0_1px_rgba(120,180,255,0.06),0_0_60px_rgba(20,100,255,0.08)] backdrop-blur-xl sm:p-6 lg:p-8">
          <div className="rounded-[1.6rem] border border-cyan-200/10 bg-[linear-gradient(180deg,rgba(8,14,28,0.64),rgba(8,14,28,0.36))] p-4 sm:p-5">
            <div className="flex flex-col gap-4 border-b border-white/8 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-200/15 bg-white/[0.03]">
                  <div className="h-5 w-5 rounded-md border border-cyan-200/40 bg-[radial-gradient(circle_at_30%_30%,rgba(100,255,220,0.6),rgba(70,120,255,0.18))]" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/60">
                    Structured AI Platform
                  </div>
                  <div className="text-2xl font-semibold tracking-tight text-white">
                    Shynvo
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
                <Link href="/pricing" className="transition hover:text-white">Pricing</Link>
                <Link href="/docs" className="transition hover:text-white">Docs</Link>
                <Link href="/contact" className="transition hover:text-white">Contact</Link>
                <Link href="/sign-in" className="transition hover:text-white">Sandra</Link>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center rounded-xl bg-[linear-gradient(135deg,#44d7ff,#4f7dff)] px-4 py-2 font-medium text-white shadow-[0_0_24px_rgba(79,125,255,0.28)] transition hover:opacity-95"
                >
                  Get Started
                </Link>
              </div>
            </div>

            <div className="grid gap-10 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div>
                <h1 className="max-w-3xl text-4xl font-semibold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  One platform for learning, building, and AI-guided work
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-white/76 sm:text-lg">
                  Learn, build, train, and explore inside guided AI environments.
                </p>

                <p className="mt-3 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
                  Shynvo is a structured AI platform for learners, builders, and teams who want guided environments instead of scattered tools, random prompts, and unclear workflows.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/sign-up"
                    className="inline-flex items-center rounded-2xl bg-[linear-gradient(135deg,#2dd4bf,#65a30d)] px-6 py-3 text-sm font-semibold text-[#041019] shadow-[0_0_28px_rgba(45,212,191,0.22)] transition hover:opacity-95"
                  >
                    Start Your Journey
                  </Link>
                  <Link
                    href="/worlds"
                    className="inline-flex items-center rounded-2xl bg-[linear-gradient(135deg,#345dff,#6d4cff)] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(80,90,255,0.24)] transition hover:opacity-95"
                  >
                    Explore Shynvo Worlds
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle,rgba(100,255,200,0.16),transparent_56%)] blur-2xl" />
                <div className="relative rounded-[2rem] border border-cyan-200/12 bg-[linear-gradient(180deg,rgba(10,18,32,0.86),rgba(8,14,28,0.58))] p-6 shadow-[0_0_40px_rgba(0,180,255,0.12)]">
                  <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:24px_24px]" />
                  <div className="relative mx-auto aspect-square max-w-[420px]">
                    <div className="absolute inset-[12%] rounded-[2rem] border border-emerald-300/20 bg-[radial-gradient(circle_at_50%_50%,rgba(70,255,180,0.10),rgba(70,130,255,0.04),transparent_72%)]" />
                    <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-cyan-200/15 bg-[linear-gradient(180deg,rgba(10,18,32,0.50),rgba(10,18,32,0.18))]" />
                    <div className="absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-[1.6rem] border border-emerald-300/30 bg-[radial-gradient(circle_at_30%_30%,rgba(160,255,140,0.48),rgba(20,200,160,0.18),rgba(70,100,255,0.08))] shadow-[0_0_50px_rgba(80,255,180,0.18)]" />
                    <div className="absolute left-1/2 top-1/2 grid h-[28%] w-[28%] -translate-x-1/2 -translate-y-1/2 grid-cols-2 gap-2">
                      <div className="rounded-xl bg-emerald-300/70" />
                      <div className="rounded-xl bg-lime-300/60" />
                      <div className="rounded-xl bg-cyan-300/55" />
                      <div className="rounded-xl bg-emerald-200/60" />
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/60 backdrop-blur-md">
                      Guided environments • structured movement • AI direction
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <section className="pt-2">
              <div className="text-2xl font-semibold tracking-tight text-white">
                What Shynvo Is
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {VALUE_POINTS.map((item) => {
                  const Icon = item.Icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-[1.5rem] border border-cyan-200/10 bg-[linear-gradient(180deg,rgba(11,17,31,0.76),rgba(10,16,28,0.52))] p-5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-200/12 bg-white/[0.03]">
                          <Icon className="h-5 w-5 text-cyan-100/80" strokeWidth={1.8} />
                        </div>
                        <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                      </div>

                      <p className="mt-4 text-sm leading-7 text-white/70">
                        {item.desc}
                      </p>

                      <div className="mt-5">
                        <span className="inline-flex items-center rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-white/70">
                          Open preview path
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="mt-12 border-t border-white/8 pt-10">
              <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/58">
                    See inside Shynvo
                  </div>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    What the platform looks like
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                    Explore how Shynvo looks and feels before you enter. These previews show real directions inside the platform and where each experience begins.
                  </p>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {PLATFORM_PREVIEWS.map((item) => {
                      const Icon = item.Icon;
                      return (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="group rounded-[1.5rem] border border-cyan-200/10 bg-[linear-gradient(180deg,rgba(11,17,31,0.76),rgba(10,16,28,0.52))] p-4 transition hover:border-cyan-200/20 hover:bg-white/[0.04]"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-200/12 bg-white/[0.03]">
                              <Icon className="h-4 w-4 text-cyan-100/85" strokeWidth={1.8} />
                            </div>
                            <div>
                              <div className="text-base font-semibold text-white">{item.title}</div>
                              <div className="mt-1 inline-flex items-center rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200/90">
                                System live
                              </div>
                            </div>
                          </div>

                          <p className="mt-4 text-sm leading-6 text-white/68">
                            {item.desc}
                          </p>

                          <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-3 backdrop-blur-sm">
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/48">
                                {item.label}
                              </span>
                              <span className="text-[10px] uppercase tracking-[0.18em] text-white/38">
                                Local loop
                              </span>
                            </div>
                            <PreviewTypingLoop variant={item.variant} lines={item.lines} />
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-sm font-semibold text-white/88 group-hover:text-white">
                              Open preview path
                            </span>
                            <ArrowUpRight className="h-4 w-4 text-white/48 transition group-hover:text-white/88" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-6">
                  <div className="rounded-[1.8rem] border border-cyan-200/12 bg-[linear-gradient(180deg,rgba(11,17,31,0.82),rgba(10,16,28,0.56))] p-5">
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/58">
                      Scan to explore Shynvo
                    </div>

                    <div className="mt-5 flex justify-center rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                      <QRCodeSVG
                        value="https://shynvo.app"
                        size={180}
                        bgColor="#ffffff"
                        fgColor="#09111d"
                        includeMargin={true}
                      />
                    </div>

                    <div className="mt-4 text-center text-sm text-white/62">
                      Secure link: shynvo.app
                    </div>
                  </div>

                  <div className="rounded-[1.8rem] border border-cyan-200/10 bg-[linear-gradient(180deg,rgba(11,17,31,0.70),rgba(10,16,28,0.48))] p-5">
                    <div className="text-xl font-semibold text-white">
                      Explore Shynvo Worlds
                    </div>
                    <p className="mt-3 text-sm leading-7 text-white/70">
                      Enter the environments and choose the path that fits your goal for learning, building, practice, and guided AI support.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/68">Learn</span>
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/68">Build</span>
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/68">Explore</span>
                    </div>

                    <div className="mt-5">
                      <Link
                        href="/worlds"
                        className="inline-flex items-center rounded-2xl bg-[linear-gradient(135deg,#345dff,#6d4cff)] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_22px_rgba(80,90,255,0.22)] transition hover:opacity-95"
                      >
                        Open all environments
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <footer className="mt-12 border-t border-white/8 pt-6">
              <div className="flex flex-col gap-4 text-sm text-white/58 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-4">
                  <Link href="/terms" className="transition hover:text-white">Terms</Link>
                  <Link href="/privacy" className="transition hover:text-white">Privacy</Link>
                  <Link href="/refund" className="transition hover:text-white">Refund</Link>
                  <Link href="/contact" className="transition hover:text-white">Contact</Link>
                  <Link href="/docs" className="transition hover:text-white">Docs</Link>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <a href="mailto:hi@shynvo.app" className="transition hover:text-white">hi@shynvo.app</a>
                  <a href="mailto:support@shynvo.app" className="transition hover:text-white">support@shynvo.app</a>
                </div>
              </div>
            </footer>
          </div>
        </div>

        <div className="mt-10">
          <ExploreWorldsCard />
        </div>
      </section>
    </main>
  );
}
