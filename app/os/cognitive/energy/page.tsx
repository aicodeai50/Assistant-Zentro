// app/os/cognitive/energy/page.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import OSShell from "@/components/os/OSShell";
import OSCard from "@/components/os/OSCard";

type EnergyBand = "Low" | "Medium" | "High";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function bandFromSignal(signal: number): EnergyBand {
  if (signal <= 33) return "Low";
  if (signal <= 66) return "Medium";
  return "High";
}

function protocolFor(band: EnergyBand) {
  switch (band) {
    case "Low":
      return {
        mode: "Stabilize",
        focus: "12–18 min",
        breakType: "2–4 min walk / water / light reset",
        prompt:
          "Shrink scope. One tiny deliverable. Win momentum before intensity.",
      };
    case "Medium":
      return {
        mode: "Build",
        focus: "25–35 min",
        breakType: "5 min standing break + quick review",
        prompt:
          "Choose one objective. Keep it crisp. Aim for progress, not perfection.",
      };
    case "High":
      return {
        mode: "Sprint",
        focus: "45–60 min",
        breakType: "8–12 min full disconnect (eyes off screen)",
        prompt:
          "Use the peak. Deep work only. No context switching. Protect the run.",
      };
  }
}

function SignalBars({ value }: { value: number }) {
  const bars = Array.from({ length: 10 }).map((_, i) => {
    const threshold = (i + 1) * 10;
    const on = value >= threshold;
    return (
      <div
        key={i}
        className={[
          "h-6 w-2 rounded-sm border",
          on ? "border-white/20 bg-white/70" : "border-white/10 bg-white/5",
        ].join(" ")}
      />
    );
  });

  return <div className="flex items-end gap-1">{bars}</div>;
}

export default function CognitiveEnergyPage() {
  const [signal, setSignal] = useState<number>(62);

  const band = useMemo(() => bandFromSignal(signal), [signal]);
  const protocol = useMemo(() => protocolFor(band), [band]);

  const headline = useMemo(() => {
    if (band === "Low") return "Energy is low — protect momentum.";
    if (band === "Medium") return "Energy is workable — build steadily.";
    return "Energy is high — sprint with protection.";
  }, [band]);

  return (
    <OSShell
      title="Cognitive / Energy"
      subtitle="Energy protocol (signal-based session guidance)."
      chips={[
        "online",
        `signal: ${band.toLowerCase()}`,
        `mode: ${protocol.mode.toLowerCase()}`,
        "sync: idle",
      ]}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60">
                  Energy Signal
                </div>
                <div className="mt-1 text-lg text-white/90">{headline}</div>
                <div className="mt-1 text-sm text-white/70">
                  Band: <span className="text-white/90">{band}</span> • Mode:{" "}
                  <span className="text-white/90">{protocol.mode}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <SignalBars value={signal} />
                <div className="min-w-[4rem] text-right text-sm text-white/80">
                  {signal}%
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-widest text-white/60">
                  Adjust signal
                </div>
                <div className="text-xs text-white/60">demo control</div>
              </div>
              <input
                className="mt-2 w-full accent-white"
                type="range"
                min={0}
                max={100}
                value={signal}
                onChange={(e) =>
                  setSignal(clamp(parseInt(e.target.value, 10), 0, 100))
                }
              />
              <div className="mt-2 flex items-center justify-between text-xs text-white/55">
                <span>low</span>
                <span>medium</span>
                <span>high</span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <OSCard title="Focus length" subtitle={protocol.focus} icon="⏱️" />
            <OSCard title="Break type" subtitle={protocol.breakType} icon="🫧" />
            <OSCard title="Mode" subtitle={protocol.mode} icon="🛰️" />
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">
              Operator prompt
            </div>
            <div className="mt-2 text-sm text-white/80">{protocol.prompt}</div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">
                Start session
              </button>
              <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">
                Choose task
              </button>
              <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">
                Set timer
              </button>
              <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">
                Log energy check
              </button>
            </div>
          </div>

          {/* Cross-links */}
          <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">
              Suggested routing
            </div>

            <div className="mt-2 text-sm text-white/70">
              {band === "Low"
                ? "Energy is low — route to Recovery or switch to a micro-session."
                : band === "Medium"
                ? "Energy is workable — if you feel resistance, route to Friction."
                : "Energy is high — protect the run. If you stall, route to Stuck."}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {band === "Low" && (
                <Link
                  href="/os/cognitive/recovery"
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
                >
                  Go to Recovery
                </Link>
              )}

              {(band === "Medium" || band === "High") && (
                <Link
                  href="/os/cognitive/friction"
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
                >
                  Go to Friction
                </Link>
              )}

              {band === "High" && (
                <Link
                  href="/os/cognitive/stuck"
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
                >
                  Go to Stuck
                </Link>
              )}

              <Link
                href="/os/cognitive"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Back to Cognitive hub
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">
              System chips
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                protocol: armed
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                drift: minimal
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                context: locked
              </span>
            </div>

            <div className="mt-4 text-sm text-white/70">
              Drag the signal and the OS instantly adapts — demo-ready behavior.
            </div>

            <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-3">
              <div className="text-xs uppercase tracking-widest text-white/60">
                Next build step
              </div>
              <div className="mt-2 text-sm text-white/80">
                Later we’ll wire “Start session” and logs to Railway endpoints.
              </div>
            </div>
          </div>
        </div>
      </div>
    </OSShell>
  );
}