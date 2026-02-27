"use client";

import OSShell from "@/components/os/OSShell";
import { BoxLink, OSCard } from "@/components/os/OSCard";
import { useOSState } from "@/components/os/useOSState";

export default function TrajectoryPage() {
  const [lastPhase, setLastPhase] = useOSState<string>("trajectory.lastPhase", "foundation");
  const [lastAction, setLastAction] = useOSState<string>("trajectory.lastAction", "none");

  return (
    <OSShell
      title="Trajectory"
      subtitle="90-day mission control. (Persisted locally)"
      chips={["online", "module: trajectory", `last: ${lastPhase}`, `action: ${lastAction}`]}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <OSCard title="Active phase" value={lastPhase} hint="saved locally" />
        <OSCard title="Last action" value={lastAction} hint="saved locally" />
        <OSCard title="Next" value="Pick a phase and press Next Action" hint="demo flow" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div onClick={() => setLastPhase("foundation")}>
          <BoxLink href="/os/trajectory/foundation" title="Foundation" desc="Set systems and remove chaos." tag="Phase 1" />
        </div>
        <div onClick={() => setLastPhase("acceleration")}>
          <BoxLink href="/os/trajectory/acceleration" title="Acceleration" desc="Increase output with stable loops." tag="Phase 2" />
        </div>
        <div onClick={() => setLastPhase("specialization")}>
          <BoxLink href="/os/trajectory/specialization" title="Specialization" desc="Narrow focus and deepen skill." tag="Phase 3" />
        </div>
        <div onClick={() => setLastPhase("outcome")}>
          <BoxLink href="/os/trajectory/outcome" title="Outcome" desc="Ship, measure, iterate." tag="Phase 4" />
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4">
        <div className="text-xs uppercase tracking-widest text-white/60">Next Action</div>
        <div className="mt-2 text-sm text-white/70">
          This button simulates a mission system. It only updates local state for now.
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setLastAction("lock-next-step")}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Lock next step
          </button>
          <button
            onClick={() => setLastAction("schedule-block")}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Schedule block
          </button>
          <button
            onClick={() => setLastAction("ship-slice")}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Ship slice
          </button>
          <button
            onClick={() => {
              setLastPhase("foundation");
              setLastAction("none");
            }}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Reset
          </button>
        </div>
      </div>
    </OSShell>
  );
}
