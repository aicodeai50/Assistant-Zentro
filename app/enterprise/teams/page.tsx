import Link from "next/link";

const TEAMS = [
  {
    title: "Engineering",
    subtitle: "Members, mission ownership, and internal coordination.",
    href: "/enterprise/teams/engineering",
  },
  {
    title: "Marketing",
    subtitle: "Members, mission ownership, and internal coordination.",
    href: "/enterprise/teams/marketing",
  },
  {
    title: "Product",
    subtitle: "Members, mission ownership, and internal coordination.",
    href: "/enterprise/teams/product",
  },
];

export default function EnterpriseTeamsPage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/enterprise" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Enterprise Suite
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Enterprise Suite
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">Teams</h1>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        Teams organizes departments, members, responsibilities, and collaboration structure across the company.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {TEAMS.map((team) => (
          <Link
            key={team.title}
            href={team.href}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/7"
          >
            <div className="text-2xl font-semibold text-white">{team.title}</div>
            <div className="mt-3 text-sm text-white/70">{team.subtitle}</div>
            <div className="mt-5 text-sm font-semibold text-white/90">Open team →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
