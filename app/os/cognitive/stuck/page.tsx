// app/os/cognitive/stuck/page.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import OSShell from "@/components/os/OSShell";
import OSCard from "@/components/os/OSCard";

type StuckType = "Too big" | "Too vague" | "Too risky" | "No energy" | "No clarity";

const STUCK_TYPES: Array<{ key: StuckType; icon: string; hint: string }> = [
  { key: "Too big", icon: "📦", hint: "The task is massive and shapeless." },
  { key: "Too vague", icon: "🌫️", hint: "No clear next move or win condition." },
  { key: "Too risky", icon: "⚠️", hint: "Fear of wasting time or failing." },
  { key: "No energy", icon: "🔋", hint: "Capacity is low; willpower won’t brute-force it." },
  { key: "No clarity", icon: "🧩", hint: "Missing info / requirements / direction." },
];

function nextSteps(stuck: StuckType, text: string): string[] {
  const base = text.trim() || "this";
  switch (stuck) {
    case "Too big":
      return [
        `Define the smallest shippable slice of ${base}.`,
        `Write a 3-bullet outline (no more).`,
        `Do a 10-minute “ugly first pass.”`,
      ];
    case "Too vague":
      return [
        `Write the win: “In 25 minutes, I will have ___.”`,
        `Pick the first constraint you can decide now.`,
        `Start with a placeholder and refine.`,
      ];
    case "Too risky":
      return [
        `Run a “cheap experiment” for 15 minutes.`,
        `Define the failure cost. Make it tiny.`,
        `Ship a draft to yourself only.`,
      ];
    case "No energy":
      return [
        `Switch to a 12-minute micro-session on ${base}.`,
        `Reduce scope by 80% and do one tiny action.`,
        `Do a quick recovery protocol, then restart.`,
      ];
    case "No clarity":
      return [
        `Write one clarifying question about ${base}.`,
        `List what you know vs what you need.`,
        `Make an assumption and proceed (mark it).`,
      ];
  }
}

function reframes(stuck: StuckType): string[] {
  switch (stuck) {
    case "Too big":
      return [
        "I’m not finishing it — I’m starting it.",
        "Ship a slice, not the whole system.",
        "Progress beats completeness.",
      ];
    case "Too vague":
      return ["Clarity is built by action.", "A draft creates direction.", "Make the next 25 minutes testable."];
    case "Too risky":
      return ["Make it safe to fail by making it cheap.", "The goal is information, not success.", "Run one controlled experiment."];
    case "No energy":
      return ["Protect momentum with smaller moves.", "Low energy still ships small wins.", "Capacity first, intensity later."];
    case "No clarity":
      return ["One question can unlock the path.", "Assumptions are allowed — label them.", "Start with what’s true now."];
  }
}

export default function CognitiveStuckPage() {
  const [type, setType] = useState<StuckType>("Too vague");
  const [task, setTask] = useState<string>("draft the cognitive hub copy");
  const [picked, setPicked] = useState<string>("");

  const steps = useMemo(() => nextSteps(type, task), [type, task]);
  const reframe = useMemo(() => reframes(type), [type]);

  return (
    <OSShell
      title="Cognitive / Stuck"
      subtitle="Unstuck protocol: reduce scope, reframe, generate the next step."
      chips={[
        "online",
        `stuck: ${type.toLowerCase().replace(" ", "-")}`,
        picked ? "target: locked" : "target: none",
        "sync: idle",
      ]}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">
              Stuck scan
            </div>

            <div className="mt-3 rounded-lg border border-white/10 bg-black/40 p-3">
              <div className="text-xs uppercase tracking-widest text-white/60">
                Current task
              </div>
              <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/85 placeholder:text-white/35 outline-none"
                placeholder="What are you trying to do?"
              />
            </div>

            <div className="mt-4 space-y-2">
              {STUCK_TYPES.map((s) => {
                const on = type === s.key;
                return (
                  <button
                    key={s.key}
                    onClick={() => setType(s.key)}
                    className={[
                      "w-full rounded-lg border px-3 py-3 text-left transition",
                      on ? "border-white/25 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10",
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-lg">{s.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-white/90">{s.key}</div>
                          <span className="text-xs text-white/60">{on ? "active" : "select"}</span>
                        </div>
                        <div className="mt-1 text-xs text-white/60">{s.hint}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                protocol: unstuck
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                shield: on
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                status: ready
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">
              Reframe
            </div>
            <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-3">
              {reframe.map((r) => (
                <div
                  key={r}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-white/80"
                >
                  {r}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">
              Next-step generator
            </div>
            <div className="mt-2 text-sm text-white/70">
              Pick one action. The OS will treat it as the “next move.”
            </div>

            <div className="mt-4 space-y-2">
              {steps.map((s) => {
                const on = picked === s;
                return (
                  <button
                    key={s}
                    onClick={() => setPicked(s)}
                    className={[
                      "w-full rounded-lg border px-3 py-3 text-left transition",
                      on ? "border-white/25 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm text-white/85">{s}</div>
                      <span className="text-xs text-white/60">{on ? "selected" : "choose"}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">
                Commit next step
              </button>
              <button
                onClick={() => setPicked("")}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Clear selection
              </button>
              <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">
                Start 12-min micro-session
              </button>
            </div>

            {picked && (
              <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-3">
                <div className="text-xs uppercase tracking-widest text-white/60">
                  Locked target
                </div>
                <div className="mt-2 text-sm text-white/85">{picked}</div>
                <div className="mt-2 text-xs text-white/60">
                  Demo behavior: once locked, we’ll route this to Focus / timer / backend later.
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <OSCard title="Scope" subtitle={type === "Too big" ? "Reduce 80%" : "Small slice"} icon="✂️" />
            <OSCard title="Clarity" subtitle={type === "No clarity" ? "Ask 1 question" : "Good enough"} icon="🔎" />
            <OSCard title="Momentum" subtitle={type === "No energy" ? "Micro-session" : "Commit 1 step"} icon="🚀" />
          </div>

          {/* Cross-links */}
          <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">
              Suggested routing
            </div>

            <div className="mt-2 text-sm text-white/70">
              Once you pick a next step, route to Focus to execute. If the issue is exhaustion, route to Recovery.
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/os/focus"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Execute in Focus
              </Link>

              <Link
                href="/os/cognitive/recovery"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Go to Recovery
              </Link>

              <Link
                href="/os/cognitive/friction"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Go to Friction
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