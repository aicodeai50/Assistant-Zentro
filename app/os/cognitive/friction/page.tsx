import OSShell from "@/components/os/OSShell";
import OSTerminal from "@/components/os/OSTerminal";
import { BackRow, OSCard } from "@/components/os/OSCard";

export default function FrictionPage() {
  return (
    <OSShell title="Friction" subtitle="Identify drag and remove it fast.">
      <BackRow href="/os/cognitive" />

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <OSCard title="Context switches" value="High" hint="Tab hopping" />
        <OSCard title="Clarity" value="Medium" hint="Goal definition" />
        <OSCard title="Next action" value="Missing" hint="Define step 1" />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Suggested move</h2>
        <p className="mt-2 text-white/70">
          Reduce friction by defining the next action and closing extra loops.
        </p>

        <div className="mt-6">
          <OSTerminal
            title="Friction sweep"
            lines={[
              { t: "sys", v: "FRICTION_SWEEP v0.1" },
              { t: "out", v: "1) Write 1-sentence goal for this session." },
              { t: "out", v: "2) Write the smallest next action (≤ 2 minutes)." },
              { t: "out", v: "3) Close 3 tabs / mute notifications." },
              { t: "out", v: "4) Start timer: 15 minutes. Ship something." },
            ]}
          />
        </div>
      </section>
    </OSShell>
  );
}