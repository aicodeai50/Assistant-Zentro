import OSShell from "@/components/os/OSShell";
import { BackRow, BoxLink, OSCard } from "@/components/os/OSCard";

export default function FocusPage() {
  return (
    <OSShell
      title="Focus Window"
      subtitle="Focus is your attention budget. It helps you plan short, high-impact sessions."
    >
      <BackRow />

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <OSCard title="Time remaining" value="42 min" hint="Optimal window" />
        <OSCard title="Mode" value="Deep Work" hint="Highest ROI state" />
        <OSCard title="Distraction shield" value="Enabled" hint="Optional OS layer" />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Session blueprint</h2>
        <p className="mt-2 text-white/70">
          A simple 3-step loop designed for real-life energy levels.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <BoxLink
            href="/os/focus/warmup"
            title="Warm-up (3 min)"
            desc="10 flashcards → wake recall."
            tag="Step 1"
          />
          <BoxLink
            href="/os/focus/work"
            title="Work (30 min)"
            desc="One topic drill or interview simulation."
            tag="Step 2"
          />
          <BoxLink
            href="/os/focus/lockin"
            title="Lock-in (9 min)"
            desc="Summarize + one follow-up question."
            tag="Step 3"
          />
        </div>
      </section>
    </OSShell>
  );
}