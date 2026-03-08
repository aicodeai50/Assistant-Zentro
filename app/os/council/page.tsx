import OsNav from "@/components/os/OsNav";

export default function CouncilPage() {
  return (
    <section className="py-10 sm:py-14">
      <OsNav />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo OS
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        AI Council
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        AI Council is the decision chamber of Shynvo OS. It is used for multi-perspective reasoning
        on important academic, project, and strategic choices.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xl font-semibold text-white">Decision Input</div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/80">
            Example: Should I focus on exams first or product work first?
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xl font-semibold text-white">Council Output</div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/80">
            Multi-angle analysis from specialized reasoning perspectives.
          </div>
        </div>
      </div>
    </section>
  );
}
