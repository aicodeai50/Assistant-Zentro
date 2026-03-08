import Link from "next/link";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const SECTORS = [
  {
    title: "Teams",
    subtitle: "Departments, members, and role structure.",
    href: "/enterprise/teams",
  },
  {
    title: "Rooms",
    subtitle: "Team spaces for communication and collaboration.",
    href: "/enterprise/rooms",
  },
  {
    title: "Missions",
    subtitle: "Execution flows tied to company goals.",
    href: "/enterprise/missions",
  },
  {
    title: "Skill Matrix",
    subtitle: "Capability mapping and growth visibility.",
    href: "/enterprise/skills",
  },
  {
    title: "AI Strategy",
    subtitle: "Structured reasoning for leadership decisions.",
    href: "/enterprise/strategy",
  },
  {
    title: "Analytics",
    subtitle: "Operational insight into progress and output.",
    href: "/enterprise/analytics",
  },
  {
    title: "Dashboard",
    subtitle: "Company-wide operational overview and quick access.",
    href: "/enterprise/dashboard",
  },
  {
    title: "Directory",
    subtitle: "Browse company members across roles and teams.",
    href: "/enterprise/directory",
  },
  {
    title: "Schedule",
    subtitle: "Track meetings, room sessions, and team coordination.",
    href: "/enterprise/schedule",
  },
  {
    title: "Company Chat",
    subtitle: "Internal communication layer for the organization.",
    href: "/enterprise/chat",
  },
];

export default function EnterprisePage() {
  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav label="Enterprise Layer: Online" />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
            Enterprise Suite
          </div>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
            Organizational Intelligence System
          </h1>

          <p className="mt-4 max-w-5xl text-sm leading-6 text-white/70 sm:text-base">
            Enterprise Suite is the Shynvo environment for organizations. It helps companies
            coordinate teams, run missions, manage collaboration rooms, track skills, analyze
            performance, and use AI for structured strategy.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
            Core Purpose
          </div>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Run the organization from one environment
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">
            Enterprise Suite connects people, communication, missions, skills, and decisions in one workspace.
            Instead of switching between scattered tools, organizations can work from one structured AI environment.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Link href="/enterprise/teams" className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:bg-white/10">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-white">Build teams</div>
                  <div className="mt-1 text-sm text-white/70">Organize departments, roles, and members.</div>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80">→</span>
              </div>
            </Link>

            <Link href="/enterprise/rooms" className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:bg-white/10">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-white">Open rooms</div>
                  <div className="mt-1 text-sm text-white/70">Collaborate in structured company spaces.</div>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80">→</span>
              </div>
            </Link>

            <Link href="/enterprise/missions" className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:bg-white/10">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-white">Run missions</div>
                  <div className="mt-1 text-sm text-white/70">Convert company goals into execution paths.</div>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80">→</span>
              </div>
            </Link>

            <Link href="/enterprise/analytics" className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:bg-white/10">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-white">Review analytics</div>
                  <div className="mt-1 text-sm text-white/70">See performance, workload, and progress.</div>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80">→</span>
              </div>
            </Link>

            <Link href="/enterprise/dashboard" className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:bg-white/10">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-white">Open dashboard</div>
                  <div className="mt-1 text-sm text-white/70">View company-wide status and shortcuts.</div>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80">→</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
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
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
          Enterprise Areas
        </div>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Enter a sector
        </h2>

        <p className="mt-2 max-w-4xl text-sm leading-6 text-white/70">
          Each sector is a working part of the enterprise environment. The pages below are connected
          so the inner cards also lead somewhere real.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SECTORS.map((sector) => (
          <Link
            key={sector.title}
            href={sector.href}
            className={cx(
              "group relative overflow-hidden rounded-3xl border p-5 transition",
              "border-emerald-300/15 bg-white/5 hover:bg-white/[0.08] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold text-white">{sector.title}</div>
                <div className="mt-2 text-sm leading-6 text-white/70">{sector.subtitle}</div>
              </div>

              <span className="rounded-full border border-emerald-300/20 bg-emerald-400/5 px-3 py-1 text-[11px] font-semibold text-emerald-100/85">
                Active
              </span>
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
          </Link>
        ))}
      </div>
    </section>
  );
}
