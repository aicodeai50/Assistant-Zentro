// app/os/cognitive/friction/page.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import OSShell from "@/components/os/OSShell";
import OSCard from "@/components/os/OSCard";

type Blocker = "confusion" | "distraction" | "unclearGoal" | "overwhelm";

const BLOCKERS: Array<{ key: Blocker; label: string; hint: string; icon: string }> =
  [
    { key: "confusion", label: "Confusion", hint: "You don’t know what to do next.", icon: "🧠" },
    { key: "distraction", label: "Distraction", hint: "You keep switching tabs / contexts.", icon: "🛰️" },
    { key: "unclearGoal", label: "Unclear goal", hint: "The objective isn’t precise.", icon: "🎯" },
    { key: "overwhelm", label: "Overwhelm", hint: "Too big, too many moving parts.", icon: "🌊" },
  ];

function fixesFor(active: Set<Blocker>) {
  const fixes: Array<{ title: string; detail: string; action: string }> = [];

  if (active.has("unclearGoal")) {
    fixes.push(
      { title: "Define the win", detail: "Write a one-sentence outcome for the next 25 minutes.", action: "Set outcome" },
      { title: "Make it testable", detail: "Turn the goal into something you can verify (done/not done).", action: "Make testable" }
    );
  }

  if (active.has("confusion")) {
    fixes.push(
      { title: "Next step generator", detail: "List 3 possible next steps. Choose the smallest one.", action: "Generate next step" },
      { title: "Ask one clarifying question", detail: "What would make this obvious? What info is missing?", action: "Clarify" }
    );
  }

  if (active.has("distraction")) {
    fixes.push(
      { title: "Lock context", detail: "Close nonessential tabs and silence notifications for one session.", action: "Lock-in mode" },
      { title: "Single-thread rule", detail: "Only one task. Park every other thought in a scratchpad.", action: "Open scratchpad" }
    );
  }

  if (active.has("overwhelm")) {
    fixes.push(
      { title: "Reduce scope by 80%", detail: "Ship a smaller version. Keep the core. Cut everything else.", action: "Reduce scope" },
      { title: "Slice it into 10-minute chunks", detail: "Define 3 tiny chunks you can complete back-to-back.", action: "Slice plan" }
    );
  }

  if (fixes.length === 0) {
    fixes.push({
      title: "No friction selected",
      detail: "Select one or more blockers to get targeted fixes.",
      action: "Select blockers",
    });
  }

  return fixes;
}

export default function CognitiveFrictionPage() {
  const [selected, setSelected] = useState<Set<Blocker>>(new Set(["distraction"]));
  const [note, setNote] = useState("");

  const fixes = useMemo(() => fixesFor(selected), [selected]);

  const toggle = (key: Blocker) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const frictionLevel = selected.size;

  return (
    <OSShell
      title="Cognitive / Friction"
      subtitle="Identify blockers and apply quick fixes."
      chips={[
        "online",
        `blockers: ${frictionLevel}/4`,
        "protocol: quick-fix",
        "sync: idle",
      ]}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">
              Blocker scan
            </div>
            <div className="mt-2 text-sm text-white/80">
              Select what’s currently slowing you down.
            </div>

            <div className="mt-4 space-y-2">
              {BLOCKERS.map((b) => {
                const on = selected.has(b.key);
                return (
                  <button
                    key={b.key}
                    onClick={() => toggle(b.key)}
                    className={[
                      "w-full rounded-lg border px-3 py-3 text-left transition",
                      on ? "border-white/25 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10",
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-lg">{b.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-white/90">{b.label}</div>
                          <span className="text-xs text-white/60">{on ? "active" : "off"}</span>
                        </div>
                        <div className="mt-1 text-xs text-white/60">{b.hint}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-3">
              <div className="text-xs uppercase tracking-widest text-white/60">
                Operator note
              </div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What’s happening right now?"
                className="mt-2 h-20 w-full resize-none rounded-lg border border-white/10 bg-black/30 p-2 text-sm text-white/85 placeholder:text-white/35 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {fixes.map((f, idx) => (
              <div key={idx} className="rounded-xl border border-white/10 bg-black/30 p-4">
                <div className="text-xs uppercase tracking-widest text-white/60">Quick fix</div>
                <div className="mt-1 text-base text-white/90">{f.title}</div>
                <div className="mt-2 text-sm text-white/70">{f.detail}</div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">
                    {f.action}
                  </button>
                  <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">
                    Save as protocol
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <OSCard title="Friction level" subtitle={`${frictionLevel} / 4`} icon="📉" />
            <OSCard
              title="Recommended next"
              subtitle={selected.has("distraction") ? "Lock context" : "Define win"}
              icon="🧭"
            />
            <OSCard
              title="Session type"
              subtitle={selected.has("overwhelm") ? "Micro-chunks" : "Single objective"}
              icon="🧱"
            />
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">
              Minimal demo flow
            </div>
            <div className="mt-2 text-sm text-white/80">
              1) select blocker → 2) apply quick fix → 3) start a focused session.
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">
                Start 25-min build session
              </button>
              <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">
                Open focus checklist
              </button>
              <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">
                Log friction snapshot
              </button>
            </div>
          </div>

          {/* Cross-links */}
          <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">
              Suggested routing
            </div>

            <div className="mt-2 text-sm text-white/70">
              If friction persists after quick fixes, route to “Stuck”. If it’s mostly fatigue, route to “Recovery”.
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/os/cognitive/stuck"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Go to Stuck
              </Link>

              <Link
                href="/os/cognitive/recovery"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Go to Recovery
              </Link>

              <Link
                href="/os/cognitive/energy"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Check Energy
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