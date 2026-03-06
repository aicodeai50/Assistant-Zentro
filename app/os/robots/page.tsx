import Link from "next/link";

export default function OSRobotsPage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/os" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Orbital Nexus
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Shynvo OS</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">Robots</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        Robots are specialized AI agents inside the OS. They support execution with research, planning, coding, writing, and decision support.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Link href="/os/robots/studybot" className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/7 transition">
          <div className="text-lg font-semibold text-white">StudyBot</div>
          <div className="mt-2 text-sm text-white/70">Available in the OS execution layer</div>
        </Link>

        <Link href="/os/robots/codebot" className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/7 transition">
          <div className="text-lg font-semibold text-white">CodeBot</div>
          <div className="mt-2 text-sm text-white/70">Available in the OS execution layer</div>
        </Link>

        <Link href="/os/robots/strategybot" className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/7 transition">
          <div className="text-lg font-semibold text-white">StrategyBot</div>
          <div className="mt-2 text-sm text-white/70">Available in the OS execution layer</div>
        </Link>

        <Link href="/os/robots/researchbot" className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/7 transition">
          <div className="text-lg font-semibold text-white">ResearchBot</div>
          <div className="mt-2 text-sm text-white/70">Available in the OS execution layer</div>
        </Link>
      </div>
    </section>
  );
}
