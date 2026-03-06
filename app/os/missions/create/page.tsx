import Link from "next/link";

export default function OSCreateMissionPage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/os/missions" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Missions
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Shynvo OS</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">Create Mission</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        Mission creation turns a user goal into a structured execution plan. This page is the command intake point for Shynvo OS.
      </p>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
        <label className="text-sm font-semibold text-white">What do you want to achieve?</label>
        <input
          className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
          placeholder="Example: Pass my machine learning exam in 3 weeks"
        />
        <button className="mt-4 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90">
          Generate Mission
        </button>
      </div>
    </section>
  );
}
