import OSShell from "@/components/os/OSShell";
import { BackRow, BoxLink, OSCard } from "@/components/os/OSCard";

export default function CognitivePage() {
  return (
    <OSShell
      title="Cognitive Load"
      subtitle="Signal dashboard for mental bandwidth, friction, and recovery."
    >
      <BackRow />

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <OSCard title="Energy" value="Balanced" hint="Baseline capacity" />
        <OSCard title="Friction" value="Low" hint="Context-switch cost" />
        <OSCard title="Recovery" value="OK" hint="Reset speed" />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Modules</h2>
        <p className="mt-2 text-white/70">
          Enter a module to see a mini readout + a quick action plan.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <BoxLink
            href="/os/cognitive/energy"
            title="Energy"
            desc="Battery + fatigue signals. Tune your load."
            tag="Core"
          />
          <BoxLink
            href="/os/cognitive/friction"
            title="Friction"
            desc="What’s slowing you down? Remove drag."
            tag="Core"
          />
          <BoxLink
            href="/os/cognitive/recovery"
            title="Recovery"
            desc="Reset loop to keep momentum."
            tag="Habit"
          />
          <BoxLink
            href="/os/cognitive/stuck"
            title="Stuck"
            desc="Break the loop with a fast unblock protocol."
            tag="Pro"
          />
        </div>
      </section>
    </OSShell>
  );
}