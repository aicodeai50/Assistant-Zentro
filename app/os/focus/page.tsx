import OSShell from "@/components/os/OSShell";
import { BoxLink, OSCard } from "@/components/os/OSCard";

export default function FocusPage() {
  return (
    <OSShell title="Focus" subtitle="Rituals that turn intent into output." chips={["online", "module: focus", "mode: ready", "sync: idle"]}>
      <section className="grid gap-4 md:grid-cols-3">
        <OSCard title="Time remaining" value="42 min" hint="Optimal window" icon="â³" />
        <OSCard title="Mode" value="Deep Work" hint="Highest ROI state" icon="í· " />
        <OSCard title="Distraction shield" value="Enabled" hint="Optional OS layer" icon="í»¡ï¸" />
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <BoxLink href="/os/focus/warm-up" title="Warm-up (3 min)" desc="10 flashcards -> wake recall." tag="Step 1" icon="í´¥" />
        <BoxLink href="/os/focus/lock-in" title="Lock-in (2 min)" desc="Close loops, define win, start." tag="Step 2" icon="í´’" />
        <BoxLink href="/os/focus/work" title="Work Loop" desc="Single objective execution." tag="Step 3" icon="âœ…" />
        <BoxLink href="/os/focus/deep-work" title="Deep Work" desc="Protect the sprint." tag="Mode" icon="í»°ï¸" />
      </section>
    </OSShell>
  );
}
