import OsNav from "@/components/os/OsNav";

export default function CognitivePage() {
  return (
    <section className="py-10 sm:py-14">
      <OsNav />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo OS
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Cognitive
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Cognitive tracks execution state, mental load, recovery, and friction. It helps Shynvo OS
        adapt work intensity to the user.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-sm text-white/60">Focus State</div>
          <div className="mt-3 text-4xl font-semibold text-white">Stable</div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-sm text-white/60">Recovery Level</div>
          <div className="mt-3 text-4xl font-semibold text-white">Moderate</div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-sm text-white/60">Friction Signals</div>
          <div className="mt-3 text-4xl font-semibold text-white">Low</div>
        </div>
      </div>
    </section>
  );
}
