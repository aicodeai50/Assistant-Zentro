import OsShell from "@/components/os/OsShell";
import OsTerminal from "@/components/os/OsTerminal";

export default function EnergyPage() {
  return (
    <OsShell
      title="Energy"
      subtitle="Energy represents recovery capacity. When stable, Shynvo increases difficulty. When low, it protects consistency."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
          <div className="text-sm text-white/60">Status</div>
          <div className="mt-2 text-3xl font-bold">Stable</div>
          <div className="mt-3 text-sm text-white/70">
            Suggestion: attempt a higher-difficulty drill or mock interview block.
          </div>
        </div>

        <OsTerminal
          lines={[
            "$ shynvo energy --read",
            "energy: stable",
            "recommendation: +1 difficulty tier",
            "next: /os/momentum/drill",
          ]}
        />
      </div>
    </OsShell>
  );
}