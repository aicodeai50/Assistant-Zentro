import OsNav from "@/components/os/OsNav";

export default function MissionsPage() {
  return (
    <section className="py-10 sm:py-14">
      <OsNav />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo OS
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Missions
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Missions are the execution engine of Shynvo OS. A user goal becomes a mission,
        then a mission becomes structured phases, sessions, and measurable progress over time.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
            Mission Logic
          </div>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            From goal to execution
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-lg font-semibold text-white">Goal</div>
              <div className="mt-2 text-sm text-white/70">The user states what they want to achieve.</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-lg font-semibold text-white">Mission</div>
              <div className="mt-2 text-sm text-white/70">The OS structures the goal into a guided path.</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-lg font-semibold text-white">Sessions</div>
              <div className="mt-2 text-sm text-white/70">Execution happens through scheduled focus blocks.</div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm font-semibold text-white">Example mission</div>
            <div className="mt-2 text-sm leading-6 text-white/70">
              Goal: Pass Machine Learning Exam
              <br />
              Mission phases:
              <br />• Learn core concepts
              <br />• Practice applied questions
              <br />• Run mock exam sessions
              <br />• Review weak areas and finalize revision
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
            Mission Status
          </div>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Current State</div>
              <div className="mt-1 text-sm text-white/60">Structured mission layer ready</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Execution Use</div>
              <div className="mt-1 text-sm text-white/60">Supports study, project, and professional mission flows</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">System Role</div>
              <div className="mt-1 text-sm text-white/60">Distinct from University Hub: this is execution, not teaching</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
