import OsNav from "@/components/os/OsNav";

export default function LogbookPage() {
  return (
    <section className="py-10 sm:py-14">
      <OsNav />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo OS
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Logbook
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Logbook stores mission history, session outcomes, reflections, and operational memory so
        users can track growth over time.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xl font-semibold text-white">Recent Entries</div>
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-white/80">
              Focus session completed • 45 min
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-white/80">
              Mission review saved • exam preparation
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-white/80">
              Weekly reflection stored
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xl font-semibold text-white">Purpose</div>
          <div className="mt-4 text-sm leading-6 text-white/70">
            The Logbook is the memory layer of Shynvo OS. It helps users understand what they did,
            what worked, and what should improve next.
          </div>
        </div>
      </div>
    </section>
  );
}
