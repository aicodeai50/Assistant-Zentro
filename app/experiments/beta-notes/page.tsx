import Link from "next/link";

const NOTES = [
  {
    version: "v0.2",
    title: "Canvas stability + build fixes",
    items: [
      "Force-graph canvas performance baseline",
      "Route stability + production build pass",
      "Experiment cards + placeholder universes",
      "UI consistency: glow + depth + grid texture",
    ],
  },
  {
    version: "v0.3",
    title: "AI-generated nodes (/api/public/chat)",
    items: [
      "Thought Forge: seed → AI concepts (structured JSON)",
      "Concept click → AI details (3–6 nodes)",
      "Graceful failure fallback to local heuristic",
      "Streaming-like emergence (fake it first, then real stream later)",
    ],
  },
  {
    version: "v0.4",
    title: "Animated emergence + “thinking” effects",
    items: [
      "Nodes appear with timing + trail glow",
      "Ambient pulses on expansion",
      "Micro-sfx hooks (optional later)",
      "Shareable snapshots (image export)",
    ],
  },
];

export default function BetaNotesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* universe bg */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1100px circle at 18% 18%, rgba(99,102,241,0.20), transparent 55%),
              radial-gradient(1000px circle at 82% 22%, rgba(244,114,182,0.18), transparent 55%),
              radial-gradient(900px circle at 40% 90%, rgba(34,211,238,0.10), transparent 60%),
              linear-gradient(180deg, rgba(2,6,23,0.70), rgba(0,0,0,0.95))
            `,
          }}
        />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-14">
        {/* header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-white/60">
              Experiment
            </div>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">Beta Notes</h1>
            <p className="mt-3 max-w-2xl text-white/70">
              The living lab notebook for Experiments: what shipped, what changed,
              what we’re testing next.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
              <span className="h-2 w-2 rounded-full bg-indigo-300/80" />
              Updated as experiments evolve
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href="/experiments"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              Back to Hub →
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white/80 hover:bg-white/5"
            >
              Home
            </Link>
          </div>
        </div>

        {/* notes */}
        <div className="mt-10 space-y-4">
          {NOTES.map((n) => (
            <div
              key={n.version}
              className="rounded-3xl border border-white/10 bg-black/50 p-7 backdrop-blur"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-lg font-semibold text-white/90">
                  {n.version} — {n.title}
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  log
                </div>
              </div>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/75">
                {n.items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="rounded-3xl border border-white/10 bg-black/40 p-7">
            <div className="text-sm font-semibold text-white/90">
              Principles (non-negotiables)
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/75">
              <li>Experiments are separate from OS UI.</li>
              <li>No public API keys. All AI goes through /api/public/chat.</li>
              <li>We ship small, visual-first, then deepen the logic.</li>
              <li>Each experiment has its own visual language.</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-white/45">
          Beta Notes • build in public • iterate fast • keep it cinematic
        </div>
      </div>
    </div>
  );
}