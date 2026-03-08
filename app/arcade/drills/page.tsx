"use client";

import Link from "next/link";
import { useState } from "react";

type DrillMode = "logic" | "speed" | "focus" | "memory";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function ArcadeDrillsPage() {
  const [mode, setMode] = useState<DrillMode>("logic");
  const [prompt, setPrompt] = useState("");

  return (
    <section className="relative py-10 sm:py-14">
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/arcade" className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white">← Back</Link>
        <Link href="/" className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white">Home</Link>
        <Link href="/arcade" className="inline-flex items-center rounded-xl border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-2 text-sm text-fuchsia-100">Arcade Sim</Link>
      </div>

      <div className="mt-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-200/70">Arcade Sim</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Drill Arena</h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          Practice through short challenge loops. Choose a mode, write a prompt, and simulate a skill run.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {(["logic", "speed", "focus", "memory"] as DrillMode[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={cx(
                  "rounded-2xl border px-4 py-4 text-left transition",
                  mode === item
                    ? "border-fuchsia-300/30 bg-fuchsia-400/10 text-white"
                    : "border-white/10 bg-black/20 text-white/80 hover:bg-white/7"
                )}
              >
                <div className="text-sm font-semibold capitalize">{item} Drill</div>
              </button>
            ))}
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Write the challenge you want to practice..."
            rows={8}
            className="mt-5 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
          />

          <button
            type="button"
            className="mt-4 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
          >
            Start drill
          </button>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Current mode</div>
          <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-white">
            {mode.charAt(0).toUpperCase() + mode.slice(1)} Drill
          </div>

          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
              Round timer
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
              Score multiplier
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
              Accuracy bonus
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
