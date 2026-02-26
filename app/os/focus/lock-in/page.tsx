// app/os/focus/lock-in/page.tsx
import Link from "next/link";
import OSShell from "@/components/os/OSShell";

export default function LockInPage() {
  return (
    <OSShell
      title="Focus / Lock-in"
      subtitle="A clean lock-in ritual: remove distractions, define the win, start."
      chips={["online", "module: focus", "mode: lock-in", "sync: idle"]}
    >
      <div className="rounded-xl border border-white/10 bg-black/30 p-4">
        <div className="text-xs uppercase tracking-widest text-white/60">
          Lock-in protocol
        </div>

        <div className="mt-3 space-y-2 text-sm text-white/80">
          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-3">
            1) Close nonessential tabs • silence notifications • phone away
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-3">
            2) Write the win: “In 25 minutes, I will have ___”
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-3">
            3) Start timer • single-thread • ship a slice
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">
            Start 25-min session
          </button>
          <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">
            Open checklist
          </button>
          <Link
            href="/os/focus"
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Back to Focus
          </Link>
        </div>
      </div>
    </OSShell>
  );
}