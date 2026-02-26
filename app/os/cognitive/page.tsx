import OSShell from "@/components/os/OSShell";
import { BackRow, BoxLink, OSCard } from "@/components/os/OSCard";

export default function CognitivePage() {
  return (
    <OSShell
      title="Cognitive Load"
      subtitle="Cognitive Load prevents burnout by guiding you toward the right difficulty at the right time."
    >
      <BackRow />

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <OSCard title="Load status" value="Balanced" hint="Difficulty fit" />
        <OSCard title="Friction" value="Low" hint="How hard it feels" />
        <OSCard title="Energy" value="Stable" hint="Recovery capacity" />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Auto-adjust rules (2050 model)</h2>
        <p className="mt-2 text-white/70">
          The OS shifts your plan automatically based on what your brain can handle.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <BoxLink
            href="/os/cognitive/friction"
            title="If friction spikes →"
            desc="Switch to flashcards + simpler recall (maintain streak)."
            tag="Rule"
          />
          <BoxLink
            href="/os/cognitive/recovery"
            title="If load is high for 2 days →"
            desc="Auto-schedule recovery day: short drills only."
            tag="Rule"
          />
          <BoxLink
            href="/os/cognitive/energy"
            title="If energy is stable →"
            desc="Insert one hard prompt (growth happens here)."
            tag="Rule"
          />
          <BoxLink
            href="/os/cognitive/stuck"
            title="If you’re stuck →"
            desc="Suggest a ‘bridge topic’ (small step, same goal)."
            tag="Rule"
          />
        </div>
      </section>
    </OSShell>
  );
}