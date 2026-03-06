import Link from "next/link";

export default function OSLogbookPage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/os" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Orbital Nexus
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Shynvo OS</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">Logbook</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        Logbook stores mission history, session outcomes, reflections, and operational memory so users can track growth over time.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">Recent Entries</div>
          <div className="mt-3 space-y-3 text-sm text-white/70">
            <Link href="/os/logbook/focus-session" className="block rounded-2xl border border-white/10 bg-black/20 p-4 hover:bg-white/5">
              Focus session completed • 45 min
            </Link>
            <Link href="/os/logbook/mission-review" className="block rounded-2xl border border-white/10 bg-black/20 p-4 hover:bg-white/5">
              Mission review saved • exam preparation
            </Link>
            <Link href="/os/logbook/weekly-reflection" className="block rounded-2xl border border-white/10 bg-black/20 p-4 hover:bg-white/5">
              Weekly reflection stored
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">Purpose</div>
          <div className="mt-3 text-sm leading-6 text-white/70">
            The Logbook is the memory layer of Shynvo OS. It helps users understand what they did, what worked, and what should improve next.
          </div>
        </div>
      </div>
    </section>
  );
}
