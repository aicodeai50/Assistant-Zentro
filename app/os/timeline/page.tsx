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
        {[
          ["Today", "Mission review, 2 focus blocks, 1 log update"],
          ["This Week", "Study sessions, project execution, review windows"],
          ["Planning Logic", "Time allocation based on priority and effort"],
        ].map(([title, text]) => (
          <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg font-semibold text-white">{title}</div>
            <div className="mt-2 text-sm leading-6 text-white/70">{text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
