import OSShell from "@/components/os/OSShell";
import { BoxLink } from "@/components/os/OSCard";

export default function OSHomePage() {
  return (
    <OSShell
      title="Shynvo OS"
      subtitle="Cockpit interface for focus, cognition, momentum, and missions."
      chips={["online", "deck: os-home", "signal: ready", "sync: idle"]}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <BoxLink href="/os/planet" title="Orbital Nexus" desc="Planet Control dashboard (2030 wrapper)." tag="new" icon="íº" />
        <BoxLink href="/os/cognitive" title="Cognitive" desc="Energy, friction, recovery, stuck protocols." tag="C" icon="í· " />
        <BoxLink href="/os/focus" title="Focus" desc="Warm-up, lock-in, work loops." tag="B" icon="í¾¯" />
        <BoxLink href="/os/momentum" title="Momentum" desc="Drills, reflections, hard prompts." tag="A/B" icon="í³ˆ" />
        <BoxLink href="/os/trajectory" title="Trajectory" desc="90-day mission control." tag="D" icon="í»°ï¸" />
        <BoxLink href="/os/terminal" title="Terminal" desc="Diagnostics + route launcher." tag="tool" icon="âŒ¨ï¸" />
      </div>
    </OSShell>
  );
}
