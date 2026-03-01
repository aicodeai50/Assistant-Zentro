"use client";

import Link from "next/link";

export default function DebateMatrixStubPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1100px circle at 20% 20%, rgba(245,158,11,0.22), transparent 55%), radial-gradient(1100px circle at 80% 22%, rgba(244,63,94,0.16), transparent 60%), linear-gradient(180deg, rgba(2,6,23,0.70), rgba(0,0,0,0.92))",
          }}
        />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:46px_46px]" />
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-4 py-12">
        <div className="rounded-3xl border border-white/15 bg-black/40 p-6 backdrop-blur-xl">
          <div className="text-2xl font-semibold">Debate Matrix</div>
          <div className="mt-2 text-sm text-white/70">
            Coming next: 5 avatars debating your belief with vote-to-win UI.
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/experiments"
              className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/85 hover:bg-white/15"
            >
              Back to Experiments
            </Link>
            <Link
              href="/experiments/thought-forge"
              className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/85 hover:bg-white/15"
            >
              Open Thought Forge
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}