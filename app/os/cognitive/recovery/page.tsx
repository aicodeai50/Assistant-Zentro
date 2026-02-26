import OSShell from "@/components/os/OSShell";
import OSTerminal from "@/components/os/OSTerminal";
import { BackRow, OSCard } from "@/components/os/OSCard";

export default function RecoveryPage() {
  return (
    <OSShell title="Recovery" subtitle="Reset loops to keep consistency.">
      <BackRow href="/os/cognitive" />

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <OSCard title="Stress" value="Low" hint="Body signal estimate" />
        <OSCard title="Reset quality" value="OK" hint="Break efficiency" />
        <OSCard title="Next reset" value="In 20m" hint="Planned pause" />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Suggested move</h2>
        <p className="mt-2 text-white/70">
          A short, intentional reset beats scrolling.
        </p>

        <div className="mt-6">
          <OSTerminal
            title="Recovery loop"
            lines={[
              { t: "sys", v: "RECOVERY_LOOP v0.1" },
              { t: "out", v: "2 min: stand + water" },
              { t: "out", v: "2 min: breathe (4-4-6) x6 rounds" },
              { t: "out", v: "1 min: write next action on a sticky note" },
              { t: "out", v: "Return to task. Timer: 25 minutes." },
            ]}
          />
        </div>
      </section>
    </OSShell>
  );
}