"use client";

import Link from "next/link";
import { useState } from "react";

type InterviewMode = "frontend" | "backend" | "product" | "general";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function ArcadeInterviewsPage() {
  const [mode, setMode] = useState<InterviewMode>("frontend");
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
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Interview Quest</h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          Turn interview practice into a game-like quest with challenge modes and progression.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {(["frontend", "backend", "product", "general"] as InterviewMode[]).map((item) => (
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
                <div className="text-sm font-semibold capitalize">{item} Quest</div>
              </button>
            ))}
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: Act as an interviewer and ask me one question at a time."
            rows={8}
            className="mt-5 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
          />

          <button
            type="button"
            className="mt-4 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
          >
            Start quest
          </button>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Quest status</div>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">Level 1</div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">Confidence meter</div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">Response streak</div>
          </div>
        </div>
      </div>
    </section>
  );
}
