import Link from "next/link";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type ActionCard = {
  title: string;
  subtitle: string;
  href: string;
  status?: string;
};

const QUICK_ACTIONS: ActionCard[] = [
  {
    title: "Build teams",
    subtitle: "Organize departments, roles, and members.",
    href: "/enterprise/teams",
  },
  {
    title: "Open rooms",
    subtitle: "Collaborate in structured company spaces.",
    href: "/enterprise/rooms",
  },
  {
    title: "Run missions",
    subtitle: "Convert company goals into execution paths.",
    href: "/enterprise/missions",
  },
  {
    title: "Review analytics",
    subtitle: "See performance, workload, and progress.",
    href: "/enterprise/analytics",
  },
];

const SECTORS: ActionCard[] = [
  {
    title: "Teams",
    subtitle: "Departments, members, and role structure.",
    href: "/enterprise/teams",
    status: "Active",
  },
  {
    title: "Rooms",
    subtitle: "Team spaces for communication and collaboration.",
    href: "/enterprise/rooms",
    status: "Active",
  },
  {
    title: "Missions",
    subtitle: "Execution flows tied to company goals.",
    href: "/enterprise/missions",
    status: "Active",
  },
  {
    title: "Skill Matrix",
    subtitle: "Capability mapping and growth visibility.",
    href: "/enterprise/skills",
    status: "Active",
  },
  {
    title: "AI Strategy",
    subtitle: "Structured reasoning for leadership decisions.",
    href: "/enterprise/strategy",
    status: "Active",
  },
  {
    title: "Analytics",
    subtitle: "Operational insight into progress and output.",
    href: "/enterprise/analytics",
    status: "Active",
  },
];

const STATUS_CARDS: ActionCard[] = [
  {
    title: "Workspace Layer",
    subtitle: "Ready for organizations",
    href: "/enterprise/teams",
  },
  {
    title: "Mission Coordination",
    subtitle: "Structured for team execution",
    href: "/enterprise/missions",
  },
  {
    title: "AI Decision Layer",
    subtitle: "Built for planning and insight",
    href: "/enterprise/strategy",
  },
];

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10 7 15 12 10 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function EnterprisePage() {
  return (
    <section className="py-10 sm:py-14">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
            ← Back to Home
          </Link>

          <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Enterprise Suite
          </div>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
            Organizational Intelligence System
          </h1>

          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
            Enterprise Suite is the Shynvo environment for organizations. It helps companies coordinate teams,
            run missions, manage collaboration rooms, track skills, analyze performance, and use AI for
            structured strategy.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
          Enterprise Layer: Online
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Core Purpose
          </div>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Run the organization from one environment
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
            Enterprise Suite connects people, communication, missions, skills, and decisions in one workspace.
            Instead of switching between scattered tools, organizations can work from one structured AI environment.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {QUICK_ACTIONS.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-left transition hover:bg-white/5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-base font-semibold text-white">{item.title}</div>
                    <div className="mt-1 text-sm text-white/60">{item.subtitle}</div>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80">
                    <ArrowIcon />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Enterprise Status
          </div>

          <div className="mt-4 space-y-4">
            {STATUS_CARDS.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="block rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:bg-white/5"
              >
                <div className="text-sm font-semibold text-white">{item.title}</div>
                <div className="mt-1 text-sm text-white/60">{item.subtitle}</div>
              </Link>
            ))}
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
          Each sector is a working part of the enterprise environment. The pages below are connected so the inner
          cards also lead somewhere real.
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
                <div className="mt-1 text-sm leading-6 text-white/70">{sector.subtitle}</div>
              </div>

              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/75">
                {sector.status}
              </span>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-semibold text-white/90 group-hover:text-white">Open sector</span>

              <span className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80">
                <ArrowIcon />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
