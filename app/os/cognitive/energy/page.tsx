import OSShell from "@/components/os/OSShell";
import OSTerminal from "@/components/os/OSTerminal";
import { BackRow, OSCard } from "@/components/os/OSCard";

export default function EnergyPage() {
  return (
    <OSShell title="Energy" subtitle="Battery, fatigue, and sustainable pacing.">
      <BackRow href="/os/cognitive" />

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <OSCard title="Battery" value="72%" hint="Estimated capacity" />
        <OSCard title="Fatigue" value="Moderate" hint="Cognitive load level" />
        <OSCard title="Best window" value="Now + 45m" hint="Use it well" />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Suggested move</h2>
        <p className="mt-2 text-white/70">
          Do one focused sprint, then a short reset to avoid burnout.
        </p>

        <div className="mt-6">
          <OSTerminal
            title="Energy protocol"
            lines={[
              { t: "sys", v: "ENERGY_CHECK v0.1" },
              { t: "out", v: "Battery: 72% • Fatigue: Moderate • Noise: Low" },
              { t: "out", v: "Plan: 25 min deep work → 5 min reset → repeat x2" },
              { t: "out", v: "Tip: pick 1 task, hide notifications, set a timer." },
            ]}
          />
        </div>
      </section>
    </OSShell>
  );
}