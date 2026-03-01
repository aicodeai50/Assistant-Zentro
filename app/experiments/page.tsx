"use client";

import Link from "next/link";

export default function ExperimentsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* background */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1100px circle at 18% 18%, rgba(163,230,53,0.18), transparent 55%),
              radial-gradient(1000px circle at 82% 22%, rgba(34,211,238,0.10), transparent 58%),
              linear-gradient(180deg, rgba(2,6,23,0.65), rgba(0,0,0,0.92))
            `,
          }}
        />
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-10">
        {/* top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-xs tracking-widest text-white/80">
              SHYNVO
            </div>
            <div className="text-xs text-white/60">Experiments</div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/os"
              className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/80 hover:bg-white/15"
            >
              Enter OS (2050)
            </Link>
          </div>
        </div>

        {/* hero */}
        <div className="mt-8 rounded-3xl border border-white/15 bg-black/35 p-6 backdrop-blur-xl">
          <div className="text-3xl font-semibold text-white/95">Experiment Hub</div>
          <div className="mt-2 text-sm text-white/70">
            Standalone AI universes. Fullscreen. Shareable. Separate from Shynvo OS.
          </div>
          <div className="mt-4 h-[1px] w-full bg-[linear-gradient(90deg,transparent,rgba(163,230,53,0.35),rgba(34,211,238,0.20),transparent)]" />
        </div>

        {/* list */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link
            href="/experiments/thought-forge"
            className="block rounded-3xl border border-white/15 bg-white/10 p-6 hover:bg-white/15"
          >
            <div className="text-lg font-semibold text-white">Thought Forge</div>
            <div className="mt-1 text-sm text-white/70">
              Immersive mind-map graph. Click nodes to expand.
            </div>
            <div className="mt-4 text-xs text-white/55">Phase 1 complete • Phase 2 AI next</div>
          </Link>

          {/* placeholders for future experiments */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg font-semibold text-white/70">Debate Matrix</div>
            <div className="mt-1 text-sm text-white/50">Coming soon</div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg font-semibold text-white/70">Chrono Vault</div>
            <div className="mt-1 text-sm text-white/50">Coming soon</div>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-white/45">
          Experiments are separate from OS • No shared UI primitives
        </div>
      </div>
    </div>
  );
}