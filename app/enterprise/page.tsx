import Link from "next/link";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Sector = {
  title: string;
  subtitle: string;
  href: string;
  status: string;
  tags: string[];
};

const SECTORS: Sector[] = [
  {
    title: "Teams",
    subtitle: "Build organization structure, departments, members, and responsibilities.",
    href: "/enterprise/teams",
    status: "Active",
    tags: ["Departments", "Members", "Roles"],
  },
  {
    title: "Rooms",
    subtitle: "Create company rooms for communication, collaboration, meetings, and AI summaries.",
    href: "/enterprise/rooms",
    status: "Active",
    tags: ["Chat", "Meetings", "Collaboration"],
  },
  {
    title: "Missions",
    subtitle: "Turn company goals into structured team missions, phases, and execution paths.",
    href: "/enterprise/missions",
    status: "Active",
    tags: ["Projects", "Execution", "Tracking"],
  },
  {
    title: "Skill Matrix",
    subtitle: "Track employee strengths, skill levels, growth, and organizational capability gaps.",
    href: "/enterprise/skills",
    status: "Active",
    tags: ["Skills", "Growth", "Capability"],
  },
  {
    title: "AI Strategy",
    subtitle: "Use AI to compare options, reduce risk, and support leadership decisions.",
    href: "/enterprise/strategy",
    status: "Active",
    tags: ["Decisions", "Planning", "Leadership"],
  },
  {
    title: "Analytics",
    subtitle: "See mission progress, workload balance, team performance, and operational intelligence.",
    href: "/enterprise/analytics",
    status: "Active",
    tags: ["Dashboards", "Performance", "Insights"],
  },
];

export default function EnterpriseSuitePage() {
  return (
    <section className="py-10 sm:py-14">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            ← Back to Home
          </Link>

          <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Enterprise Suite
          </div>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
            Organizational Intelligence System
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
            Enterprise Suite is the Shynvo environment for organizations. It helps
            companies coordinate teams, run missions, manage collaboration rooms,
            track skills, analyze performance, and use AI for structured strategy.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
          Enterprise Layer: Online
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Core Purpose
          </div>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Run the organization from one environment
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
            Enterprise Suite connects people, communication, missions, skills, and
            decisions in one workspace. Instead of switching between scattered tools,
            organizations can work from one structured AI environment.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href="/enterprise/teams"
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-left hover:bg-white/5"
            >
              <div className="text-sm font-semibold text-white">Build teams</div>
              <div className="mt-1 text-sm text-white/60">
                Organize departments, roles, and members
              </div>
            </Link>

            <Link
              href="/enterprise/rooms"
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-left hover:bg-white/5"
            >
              <div className="text-sm font-semibold text-white">Open rooms</div>
              <div className="mt-1 text-sm text-white/60">
                Collaborate in structured company spaces
              </div>
            </Link>

            <Link
              href="/enterprise/missions"
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-left hover:bg-white/5"
            >
              <div className="text-sm font-semibold text-white">Run missions</div>
              <div className="mt-1 text-sm text-white/60">
                Convert company goals into execution paths
              </div>
            </Link>

            <Link
              href="/enterprise/analytics"
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-left hover:bg-white/5"
            >
              <div className="text-sm font-semibold text-white">Review analytics</div>
              <div className="mt-1 text-sm text-white/60">
                See performance, workload, and progress
              </div>
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Enterprise Status
          </div>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Workspace Layer</div>
              <div className="mt-1 text-sm text-white/60">Ready for organizations</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Mission Coordination</div>
              <div className="mt-1 text-sm text-white/60">Structured for team execution</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">AI Decision Layer</div>
              <div className="mt-1 text-sm text-white/60">Built for planning and insight</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
          Enterprise Areas
        </div>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Enter a sector
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-white/70">
          Each sector is a real working area for organizations. This makes the
          environment practical, professional, and valuable for daily company use.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SECTORS.map((sector) => (
          <Link
            key={sector.title}
            href={sector.href}
            className={cx(
              "group relative overflow-hidden rounded-3xl border p-5 transition",
              "border-white/10 bg-white/5 hover:bg-white/7 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-semibold text-white">{sector.title}</div>
                <div className="mt-1 text-sm leading-6 text-white/70">
                  {sector.subtitle}
                </div>
              </div>

              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/75">
                {sector.status}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {sector.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-semibold text-white/90 group-hover:text-white">
                Open sector
              </span>

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

            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="absolute inset-0 bg-[radial-gradient(900px_240px_at_50%_0%,rgba(255,255,255,0.10),transparent_60%)]" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
