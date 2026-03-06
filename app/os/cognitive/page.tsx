import Link from "next/link";

export default function OSCognitivePage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/os" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Orbital Nexus
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Shynvo OS</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">Cognitive</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        Cognitive tracks execution state, mental load, recovery, and friction. It helps Shynvo OS adapt work intensity to the user.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["Focus State", "Stable"],
          ["Recovery Level", "Moderate"],
          ["Friction Signals", "Low"],
        ].map(([title, value]) => (
          <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm text-white/60">{title}</div>
            <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
