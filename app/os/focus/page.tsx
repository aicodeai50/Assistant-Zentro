import Link from "next/link";

export default function OSFocusPage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/os" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Orbital Nexus
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Shynvo OS</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">Focus</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        Focus runs execution sessions. This is where users enter deep work, guided practice, and active mission blocks.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Session</div>
          <div className="mt-2 text-2xl font-semibold text-white">Ready to start</div>
          <div className="mt-3 text-sm text-white/70">Next block: 45-minute focused execution window</div>

          <button className="mt-6 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90">
            Start Focus Session
          </button>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Guidance</div>
          <div className="mt-3 space-y-3 text-sm text-white/70">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">Use one mission at a time</div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">Keep sessions measurable</div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">Log outcome after completion</div>
          </div>
        </div>
      </div>
    </section>
  );
}
