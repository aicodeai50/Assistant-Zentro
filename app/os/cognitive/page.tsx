// app/os/cognitive/page.tsx
import Link from "next/link";
import OSShell from "@/components/os/OSShell";
import OSCard from "@/components/os/OSCard";

export default function CognitiveHubPage() {
  return (
    <OSShell
      title="Cognitive"
      subtitle="Signal-based guidance for focus, friction, recovery, and getting unstuck."
      chips={["online", "module: cognitive", "signal: ready", "sync: idle"]}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link href="/os/cognitive/energy" className="block">
          <OSCard
            title="Energy"
            subtitle="Tune session length + break type based on your current signal."
            icon="⚡"
          />
        </Link>

        <Link href="/os/cognitive/friction" className="block">
          <OSCard
            title="Friction"
            subtitle="Identify blockers (confusion, distraction, unclear goal) and apply quick fixes."
            icon="🧩"
          />
        </Link>

        <Link href="/os/cognitive/recovery" className="block">
          <OSCard
            title="Recovery"
            subtitle="Downshift plan: rest window, reset prompts, and a clean restart."
            icon="🛟"
          />
        </Link>

        <Link href="/os/cognitive/stuck" className="block">
          <OSCard
            title="Stuck"
            subtitle="Unstuck protocol: reduce scope, reframe, generate the next step."
            icon="🧠"
          />
        </Link>
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-white/60">
              System Note
            </div>
            <div className="mt-1 text-sm text-white/85">
              Cognitive is a demo flow: every page should feel like it’s actively guiding the user.
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              status: online
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              protocol: armed
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              shield: stable
            </span>
          </div>
        </div>
      </div>
    </OSShell>
  );
}