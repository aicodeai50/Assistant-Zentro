import Link from "next/link";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const ENVIRONMENTS = [
  {
    title: "University Hub",
    subtitle: "Structured Academic Campus",
    desc: "Guided study systems, exam preparation, and faculty-based learning environments.",
    href: "/university",
    tags: ["Study", "Exams", "Career"],
  },
  {
    title: "Shynvo Academy",
    subtitle: "School Learning World",
    desc: "Junior and senior high school learning, subject rooms, tutors, and classroom workshops.",
    href: "/academy",
    tags: ["School", "Subjects", "Badges"],
  },
  {
    title: "Shynvo OS",
    subtitle: "Dimensional Execution Cockpit",
    desc: "Missions, focus systems, AI agents, and strategic orchestration in one cockpit.",
    href: "/os",
    tags: ["Missions", "Focus", "Terminal"],
  },
  {
    title: "Experiments",
    subtitle: "AI Exploration Worlds",
    desc: "Standalone worlds for thinking, debate, simulation, and concept development.",
    href: "/experiments",
    tags: ["Debate", "Simulation", "Concepts"],
  },
  {
    title: "Enterprise Suite",
    subtitle: "Organizational Intelligence System",
    desc: "Admin tools, skill matrices, team missions, and analytics for organizations.",
    href: "/enterprise",
    tags: ["Teams", "OKRs", "Analytics"],
  },
  {
    title: "Frontier Lab",
    subtitle: "Engineering District",
    desc: "Coding, programming languages, engineering logic, and real build practice.",
    href: "/frontier",
    tags: ["Coding", "Programming", "Build"],
  },
  {
    title: "Arcade Sim",
    subtitle: "Competitive Skill Arena",
    desc: "Gamified drills, interview simulations, challenge modes, and scoring systems.",
    href: "/arcade",
    tags: ["Drills", "Games", "Scoring"],
  },
];

export default function HomePage() {
  return (
    <section className="relative py-8 sm:py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_20%_10%,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_560px_at_85%_18%,rgba(59,130,246,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_100%,rgba(168,85,247,0.06),transparent_55%)]" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
            • Structured Intelligence Platform
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Shynvo
          </h1>

          <h2 className="mt-3 text-2xl font-medium tracking-tight text-white/90 sm:text-4xl">
            Architecture of Applied Intelligence
          </h2>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/75 sm:text-lg">
            A multi-environment intelligence platform for learning, execution, strategy,
            resilience, organizational growth, coding, and skill development.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="#environments"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
            >
              Enter Platform
            </Link>

            <Link
              href="/docs"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Read Docs
            </Link>
          </div>

          <div className="mt-5 text-sm text-white/55">
            Trial: full access for 7 days. Robot is included during trial; upgrade required after.
          </div>
        </div>

        <Link
          href="/robot"
          className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition hover:bg-white/7"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-white/10">
            <img
              src="/robot.webp"
              alt="Shynvo Robot"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            />
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-lg font-semibold text-white">Shynvo Robot</div>
                <div className="text-sm text-white/65">Open multilingual robot experience</div>
              </div>

              <span className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M10 7 15 12 10 17"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
              Welcome to Shynvo Robot. Click to enter the multilingual robot experience.
            </div>

            <div className="mt-4 text-sm text-white/60">
              Click the chamber to open the robot trial experience.
            </div>
          </div>
        </Link>
      </div>

      <div id="environments" className="mt-14 border-t border-white/10 pt-10">
        <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
          Environments
        </div>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Explore the buildings
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
          Each building is a purpose-built system with its own departments, identity, and workflows.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {ENVIRONMENTS.map((env) => (
            <Link
              key={env.title}
              href={env.href}
              className={cx(
                "group relative overflow-hidden rounded-3xl border p-5 transition",
                "border-white/10 bg-white/5 hover:bg-white/7 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-base font-semibold text-white">{env.title}</div>
                  <div className="mt-1 text-sm text-white/70">{env.subtitle}</div>
                </div>

                <span className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M10 7 15 12 10 17"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              <div className="mt-4 text-sm leading-6 text-white/75">{env.desc}</div>

              <div className="mt-4 flex flex-wrap gap-2">
                {env.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 text-sm font-semibold text-white/90 group-hover:text-white">
                Open
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
