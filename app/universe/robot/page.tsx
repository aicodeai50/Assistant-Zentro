"use client";

import Link from "next/link";
import { useState } from "react";
import RobotPanel from "@/components/RobotPanel";
import type { RobotMode } from "@/components/RobotModePicker";

const MODES: RobotMode[] = ["Tutor", "Analyst", "Builder", "Support", "Interviewer"];

export default function RobotUniversePage() {
  const [enabled, setEnabled] = useState(true);
  const [mode, setMode] = useState<RobotMode>("Tutor");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Robot Universe background */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1100px circle at 75% 18%, rgba(167,139,250,0.38), transparent 55%),
              radial-gradient(900px circle at 25% 70%, rgba(236,72,153,0.22), transparent 60%),
              radial-gradient(900px circle at 55% 90%, rgba(56,189,248,0.12), transparent 65%),
              linear-gradient(180deg, rgba(2,6,23,0.70), rgba(0,0,0,0.92))
            `,
            filter: "saturate(1.25) contrast(1.1)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_30%,rgba(255,255,255,0.04))]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-10">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-xs tracking-widest text-white/80">
              SHYNVO
            </div>
            <div className="text-xs text-violet-200/90">Robot Universe</div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/portal"
              className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/80 hover:bg-white/15"
            >
              Back to Portal
            </Link>
            <Link
              href="/os"
              className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/80 hover:bg-white/15"
            >
              Enter OS (2050)
            </Link>
          </div>
        </div>

        {/* Hero */}
        <div className="mt-8 rounded-3xl border border-white/15 bg-black/35 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-2xl font-semibold text-white/95">Sci-Fi Robot Bay</div>
              <div className="mt-2 text-sm text-white/70">
                This universe is built for interaction. Pick a mode, run commands, and get output.
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEnabled((v) => !v)}
                className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/85 hover:bg-white/15"
              >
                Robot: {enabled ? "ON" : "OFF"}
              </button>

              <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/70">
                backend: /api/public/chat
              </div>
            </div>
          </div>

          <div className="mt-4 h-[1px] w-full bg-[linear-gradient(90deg,transparent,rgba(167,139,250,0.45),rgba(236,72,153,0.35),transparent)]" />
        </div>

        {/* Mode bar */}
        <div className="mt-5 rounded-3xl border border-white/15 bg-black/35 p-4 backdrop-blur-xl">
          <div className="text-xs uppercase tracking-widest text-white/60">Mode selection</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {MODES.map((m) => {
              const on = mode === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={[
                    "rounded-xl border px-4 py-2 text-sm transition",
                    on
                      ? "border-white/30 bg-white/15 text-white"
                      : "border-white/15 bg-white/10 text-white/80 hover:bg-white/15",
                  ].join(" ")}
                >
                  {m}
                </button>
              );
            })}
          </div>
          <div className="mt-2 text-xs text-white/55">
            Tip: Try Interviewer mode and answer one question at a time.
          </div>
        </div>

        {/* Robot panel */}
        <div className="mt-5">
          <RobotPanel enabled={enabled} mode={mode} />
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-xs text-white/45">
          Each universe will get its own interaction module next (Demo, Academy, Arena, Lab).
        </div>
      </div>
    </div>
  );
}