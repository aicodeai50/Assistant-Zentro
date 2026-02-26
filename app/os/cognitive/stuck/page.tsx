import OSShell from "@/components/os/OSShell";
import OSTerminal from "@/components/os/OSTerminal";
import { BackRow, OSCard } from "@/components/os/OSCard";

export default function StuckPage() {
  return (
    <OSShell title="Stuck" subtitle="Unblock protocol when progress stalls.">
      <BackRow href="/os/cognitive" />

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <OSCard title="Problem" value="Unclear" hint="Define it" />
        <OSCard title="Confidence" value="Low" hint="Need structure" />
        <OSCard title="Time to unblock" value="8 min" hint="Fast loop" />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Suggested move</h2>
        <p className="mt-2 text-white/70">
          Don’t “think harder.” Switch to a structured unblock loop.
        </p>

        <div className="mt-6">
          <OSTerminal
            title="Unblock protocol"
            lines={[
              { t: "sys", v: "UNBLOCK v0.1" },
              { t: "out", v: "1) State the exact question in 1 sentence." },
              { t: "out", v: "2) List 3 things you tried (even small)." },
              { t: "out", v: "3) Choose one: simplify / search / ask / brute force." },
              { t: "out", v: "4) Do 1 tiny experiment (≤ 5 min). Log result." },
            ]}
          />
        </div>
      </section>
    </OSShell>
  );
}