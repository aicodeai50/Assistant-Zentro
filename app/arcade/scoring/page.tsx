import Link from "next/link";

const STATS = [
  ["Logic Score", "84/100"],
  ["Focus Streak", "12 rounds"],
  ["Interview Level", "7"],
  ["Challenge Rank", "Silver"],
];

export default function ArcadeScoringPage() {
  return (
    <section className="relative py-10 sm:py-14">
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/arcade" className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white">← Back</Link>
        <Link href="/" className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white">Home</Link>
        <Link href="/arcade" className="inline-flex items-center rounded-xl border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-2 text-sm text-fuchsia-100">Arcade Sim</Link>
      </div>

      <div className="mt-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-200/70">Arcade Sim</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Score Chamber</h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          Track levels, challenge performance, streaks, and progress across Arcade Sim.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {STATS.map(([title, value]) => (
          <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm text-white/60">{title}</div>
            <div className="mt-3 text-2xl font-semibold text-white">{value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
