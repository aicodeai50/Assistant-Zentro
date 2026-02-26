// app/os/cognitive/recovery/page.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import OSShell from "@/components/os/OSShell";
import OSCard from "@/components/os/OSCard";

type RecoveryMode = "Downshift" | "Rest Window" | "Reset";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function planFor(mode: RecoveryMode, minutes: number) {
  if (mode === "Downshift") {
    return {
      headline: "Downshift (fast nervous system reset)",
      steps: [
        "Stand up + slow breath (60–90s)",
        "Hydrate + change posture (1–2m)",
        "Open a window / light exposure (2m)",
        "Return with one tiny objective",
      ],
      note: "Goal: reduce activation and restore controllability without losing the day.",
    };
  }

  if (mode === "Rest Window") {
    const length = clamp(minutes, 10, 60);
    return {
      headline: `Rest window (${length} min)`,
      steps: [
        "Eyes off screen (first 5 min)",
        "Walk or lie down (no input)",
        "If mind races: jot 3 bullets, then stop",
        "Restart with a smaller scope",
      ],
      note: "Goal: real recovery, not pseudo-rest (doomscrolling).",
    };
  }

  return {
    headline: "Reset (clean reboot protocol)",
    steps: [
      "Clear desk surface (60s)",
      "Write: “What matters in the next 30 minutes?”",
      "Pick one deliverable (done/not done)",
      "Start timer + begin",
    ],
    note: "Goal: remove ambiguity and re-enter with a defined win condition.",
  };
}

export default function CognitiveRecoveryPage() {
  const [mode, setMode] = useState<RecoveryMode>("Downshift");
  const [restMinutes, setRestMinutes] = useState<number>(20);

  const plan = useMemo(() => planFor(mode, restMinutes), [mode, restMinutes]);

  return (
    <OSShell
      title="Cognitive / Recovery"
      subtitle="Downshift, rest window, and reset prompts to restore control."
      chips={[
        "online",
        "module: recovery",
        `mode: ${mode.toLowerCase().replace(" ", "-")}`,
        "sync: paused",
      ]}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">
              Recovery mode
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2">
              {(["Downshift", "Rest Window", "Reset"] as RecoveryMode[]).map((m) => {
                const on = mode === m;
                return (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={[
                      "rounded-lg border px-3 py-3 text-left transition",
                      on ? "border-white/25 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-white/90">{m}</div>
                      <span className="text-xs text-white/60">{on ? "active" : "select"}</span>
                    </div>
                    <div className="mt-1 text-xs text-white/60">
                      {m === "Downshift" && "Fast reset without losing momentum."}
                      {m === "Rest Window" && "Short real rest to restore capacity."}
                      {m === "Reset" && "Clean reboot into a defined objective."}
                    </div>
                  </button>
                );
              })}
            </div>

            {mode === "Rest Window" && (
              <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-widest text-white/60">
                    Rest length
                  </div>
                  <div className="text-xs text-white/60">{restMinutes} min</div>
                </div>
                <input
                  className="mt-2 w-full accent-white"
                  type="range"
                  min={10}
                  max={60}
                  value={restMinutes}
                  onChange={(e) => setRestMinutes(parseInt(e.target.value, 10))}
                />
                <div className="mt-2 flex items-center justify-between text-xs text-white/55">
                  <span>10</span>
                  <span>35</span>
                  <span>60</span>
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                signal: recovery
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                shield: stabilizing
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                input: minimal
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">
              Protocol
            </div>
            <div className="mt-1 text-lg text-white/90">{plan.headline}</div>
            <div className="mt-2 text-sm text-white/70">{plan.note}</div>

            <div className="mt-4 space-y-2">
              {plan.steps.map((s, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-3"
                >
                  <div className="mt-0.5 rounded-md border border-white/10 bg-black/40 px-2 py-1 text-xs text-white/70">
                    {i + 1}
                  </div>
                  <div className="text-sm text-white/85">{s}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">
                Start protocol
              </button>
              <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">
                Set timer
              </button>
              <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">
                Log recovery
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <OSCard
              title="Priority"
              subtitle={mode === "Downshift" ? "Stabilize fast" : mode === "Rest Window" ? "Restore capacity" : "Re-enter clean"}
              icon="🧭"
            />
            <OSCard title="Input rule" subtitle={mode === "Rest Window" ? "No feeds" : "Minimal"} icon="📵" />
            <OSCard title="Restart" subtitle="One tiny deliverable" icon="✅" />
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">
              Reset prompts
            </div>
            <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
              {[
                "What matters in the next 30 minutes?",
                "What is the smallest version of this?",
                "What would make progress obvious?",
                "What can I ship even if imperfect?",
              ].map((p) => (
                <button
                  key={p}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-left text-sm text-white/80 hover:bg-white/10"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Cross-links */}
          <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">
              Suggested routing
            </div>

            <div className="mt-2 text-sm text-white/70">
              After recovery: re-check Energy, then route to Focus. If you’re still blocked, route to Friction.
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/os/cognitive/energy"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Re-check Energy
              </Link>

              <Link
                href="/os/cognitive/friction"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Go to Friction
              </Link>

              <Link
                href="/os/focus"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Return to Focus
              </Link>

              <Link
                href="/os/cognitive"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Back to Cognitive hub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </OSShell>
  );
}