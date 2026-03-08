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
    desc: "Learn coding, programming languages, AI logic, and how to build real things with code.",
    href: "/frontier",
    tags: ["Coding", "Programming", "Build"],
  },
  {
    title: "Arcade Sim",
    subtitle: "Competitive Skill Arena",
    desc: "Gamified drills, interview simulations, challenge modes, and performance scoring.",
    href: "/arcade",
    tags: ["Drills", "Interviews", "Scoring"],
  },
];

export default function HomePage() {
  return (
    <section className="relative py-10 sm:py-14">
      <div className="flex flex-col gap-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
          Environments
        </div>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Explore the buildings
        </h1>

        <p className="max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
          Each building is a purpose-built system with its own departments, identity, and workflows.
        </p>
      </div>

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
    </section>
  );
}
