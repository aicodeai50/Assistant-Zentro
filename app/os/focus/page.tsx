"use client";

import OSShell from "@/components/os/OSShell";
import { BoxLink, OSCard } from "@/components/os/OSCard";
import { useOSState } from "@/components/os/useOSState";

export default function FocusPage() {
  const [mode, setMode] = useOSState<string>("focus.mode", "Deep Work");
  const [shield, setShield] = useOSState<string>("focus.shield", "Enabled");

  return (
    <OSShell
      title="Focus"
      subtitle="Rituals that turn intent into output. (Persisted locally)"
      chips={["online", "module: focus", `mode: ${mode.toLowerCase().replace(" ", "-")}`, `shield: ${shield.toLowerCase()}`]}
    >
      <section className="grid gap-4 md:grid-cols-3">
        <OSCard title="Time remaining" value="42 min" hint="Optimal window" />
        <OSCard title="Mode" value={mode} hint="Saved locally" />
        <OSCard title="Distraction shield" value={shield} hint="Saved locally" />
      </section>

      <section className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4">
        <div className="text-xs uppercase tracking-widest text-white/60">Quick toggles</div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setMode("Deep Work")}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Deep Work
          </button>
          <button
            onClick={() => setMode("Build")}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Build
          </button>
          <button
            onClick={() => setMode("Stabilize")}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Stabilize
          </button>

          <span className="mx-2 hidden h-8 w-px bg-white/10 md:block" />

          <button
            onClick={() => setShield("Enabled")}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Shield ON
          </button>
          <button
            onClick={() => setShield("Disabled")}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Shield OFF
          </button>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <BoxLink href="/os/focus/warm-up" title="Warm-up (3 min)" desc="10 flashcards -> wake recall." tag="Step 1" />
        <BoxLink href="/os/focus/lock-in" title="Lock-in (2 min)" desc="Close loops, define win, start." tag="Step 2" />
        <BoxLink href="/os/focus/work" title="Work Loop" desc="Single objective execution." tag="Step 3" />
        <BoxLink href="/os/focus/deep-work" title="Deep Work" desc="Protect the sprint." tag="Mode" />
      </section>
    </OSShell>
  );
}
