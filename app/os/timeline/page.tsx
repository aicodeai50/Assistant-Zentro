import Link from "next/link";

export default function OSTimelinePage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/os" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Orbital Nexus
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Shynvo OS</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">Timeline</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        Timeline organizes missions into realistic execution windows. It shows what should happen next and how work is distributed across time.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <Link href="/os/timeline/today" className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/7 transition">
          <div className="text-lg font-semibold text-white">Today</div>
          <div className="mt-2 text-sm leading-6 text-white/70">Mission review, 2 focus blocks, 1 log update</div>
        </Link>

        <Link href="/os/timeline/week" className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/7 transition">
          <div className="text-lg font-semibold text-white">This Week</div>
          <div className="mt-2 text-sm leading-6 text-white/70">Study sessions, project execution, review windows</div>
        </Link>

        <Link href="/os/timeline/logic" className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/7 transition">
          <div className="text-lg font-semibold text-white">Planning Logic</div>
          <div className="mt-2 text-sm leading-6 text-white/70">Time allocation based on priority and effort</div>
        </Link>
      </div>
    </section>
  );
}
