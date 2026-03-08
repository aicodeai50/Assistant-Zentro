import OsNav from "@/components/os/OsNav";

export default function TimelinePage() {
  return (
    <section className="py-10 sm:py-14">
      <OsNav />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo OS
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Timeline
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Timeline organizes missions into realistic execution windows. It shows what should happen
        next and how work is distributed across time.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-3xl font-semibold text-white">Today</div>
          <div className="mt-3 text-sm text-white/70">
            Mission review, 2 focus blocks, 1 log update
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-3xl font-semibold text-white">This Week</div>
          <div className="mt-3 text-sm text-white/70">
            Study sessions, project execution, review windows
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-3xl font-semibold text-white">Planning Logic</div>
          <div className="mt-3 text-sm text-white/70">
            Time allocation based on priority and effort
          </div>
        </div>
      </div>
    </section>
  );
}
