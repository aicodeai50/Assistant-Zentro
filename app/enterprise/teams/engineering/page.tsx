import Link from "next/link";

const CARDS = [
  {
    title: "Core Role",
    body: "Build, maintain, and improve the product stack.",
    href: "/enterprise/missions",
  },
  {
    title: "Priority",
    body: "Reliability, speed, and release quality.",
    href: "/enterprise/analytics/progress",
  },
  {
    title: "Coordination",
    body: "Works closely with Product and AI Strategy.",
    href: "/enterprise/strategy",
  },
];

export default function EngineeringTeamPage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/enterprise/teams" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Teams
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Team
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        Engineering
      </h1>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">
        Engineering owns system architecture, shipping velocity, reliability, and technical execution.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {CARDS.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/7"
          >
            <div className="text-2xl font-semibold text-white">{card.title}</div>
            <div className="mt-3 text-sm text-white/75">{card.body}</div>
            <div className="mt-5 text-sm font-semibold text-white/90">Open →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
