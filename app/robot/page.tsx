"use client";

import { useEffect, useMemo, useState } from "react";
import RobotScene from "@/components/RobotScene";
import RobotPanel from "@/components/RobotPanel";
import RobotBootOverlay from "@/components/RobotBootOverlay";
import RobotModePicker, { RobotMode } from "@/components/RobotModePicker";

export default function RobotPage() {
  const [enabled, setEnabled] = useState(true);
  const [followCursor, setFollowCursor] = useState(true);

  // ✅ Modes
  const [mode, setMode] = useState<RobotMode>("Tutor");

  // ✅ Cinematic boot overlay state
  const [booting, setBooting] = useState(true);

  // Only run boot once when page first loads
  useEffect(() => {
    setBooting(true);
  }, []);

  const modeHint = useMemo(() => {
    switch (mode) {
      case "Tutor":
        return 'Try: "Explain closures like I’m 12."';
      case "Interviewer":
        return 'Try: "Start a backend interview (mid-level)."';
      case "Analyst":
        return 'Try: "Analyze my React skill gaps."';
      case "Builder":
        return 'Try: "Generate a 7-day build plan for my app."';
      case "Support":
        return 'Try: "How do I subscribe and add team seats?"';
      default:
        return "";
    }
  }, [mode]);

  return (
    <>
      {/* ✅ Boot overlay */}
      <RobotBootOverlay
        open={Boolean(enabled && booting)}
        onDone={() => setBooting(false)}
      />

      <main className="mx-auto max-w-5xl px-6 py-14 text-neutral-100">
        {/* Header */}
        <h1 className="text-3xl font-bold">Sci-Fi Assistant Robot</h1>
        <p className="mt-2 text-neutral-400">
          A cinematic, optional AI companion — inspired by realistic sci-fi films.
          Users can turn it on/off and switch modes anytime.
        </p>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => {
              setEnabled((prev) => {
                const next = !prev;
                // re-run boot every time robot gets enabled again
                if (next) setBooting(true);
                return next;
              });
            }}
            className={`rounded-xl border px-4 py-2 transition ${
              enabled
                ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200"
                : "border-neutral-800 bg-neutral-950 text-neutral-300"
            }`}
          >
            {enabled ? "Robot: ON" : "Robot: OFF"}
          </button>

          <button
            onClick={() => setFollowCursor((v) => !v)}
            disabled={!enabled}
            className={`rounded-xl border px-4 py-2 transition ${
              followCursor
                ? "border-sky-400/40 bg-sky-400/10 text-sky-200"
                : "border-neutral-800 bg-neutral-950 text-neutral-400"
            } ${!enabled ? "opacity-50" : ""}`}
          >
            {followCursor ? "Follow cursor: ON" : "Follow cursor: OFF"}
          </button>

          <button
            onClick={() => {
              if (!enabled) return;
              setBooting(true);
            }}
            disabled={!enabled}
            className={`rounded-xl border border-neutral-800 bg-black px-4 py-2 text-neutral-300 hover:text-white ${
              !enabled ? "opacity-50" : ""
            }`}
          >
            Re-run boot
          </button>

          {/* Navigation */}
          <a
            href="/"
            className="rounded-xl border border-neutral-800 px-4 py-2 text-neutral-300 hover:text-white"
          >
            ← Back home
          </a>
          <a
            href="/demo"
            className="rounded-xl border border-neutral-800 px-4 py-2 text-neutral-300 hover:text-white"
          >
            Demo
          </a>
          <a
            href="/pricing"
            className="rounded-xl border border-neutral-800 px-4 py-2 text-neutral-300 hover:text-white"
          >
            Pricing
          </a>
        </div>

        {/* Mode Picker */}
        <div className="mt-6">
          <RobotModePicker mode={mode} setMode={setMode} disabled={!enabled} />
          <div className="mt-2 text-sm text-neutral-500">{modeHint}</div>
        </div>

        {/* Robot + Panel */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
          {enabled ? (
            <RobotScene followCursor={followCursor} mode={mode} />
          ) : (
            <div className="rounded-3xl border border-neutral-800 bg-black p-10 text-neutral-400">
              The robot is currently disabled.
              <br />
              Turn it ON to experience the cinematic assistant.
            </div>
          )}

          {/* Side panel */}
          {enabled ? (
            <RobotPanel enabled={enabled} mode={mode} />
          ) : (
            <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6 text-neutral-400">
              Robot commands are disabled while the robot is OFF.
            </div>
          )}
        </div>

        {/* Explanation */}
        <section className="mt-10 rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
          <h2 className="text-lg font-semibold">What this robot represents</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-400">
            <li>A visual AI interface — optional.</li>
            <li>Modes define the personality + workflow (Tutor / Interviewer / etc.).</li>
            <li>Next step: connect each mode to real backend endpoints.</li>
            <li>Cinematic boot adds delight without blocking the product.</li>
          </ul>
        </section>
      </main>
    </>
  );
}