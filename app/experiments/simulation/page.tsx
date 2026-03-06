"use client";

import Link from "next/link";
import { useState } from "react";

type SimMode = "Academic" | "Career" | "Product" | "Life";

export default function ExperimentsSimulationPage() {
  const [mode, setMode] = useState<SimMode>("Academic");
  const [scenario, setScenario] = useState("");
  const [result, setResult] = useState<null | {
    pathA: string;
    pathB: string;
    risk: string;
    move: string;
  }>(null);

  function runSimulation() {
    const s = scenario.trim();
    if (!s) return;

    setResult({
      pathA: `Path A: If you follow "${s}" with discipline and consistency, the most likely result is gradual progress with moderate pressure.`,
      pathB: `Path B: If execution becomes inconsistent, the result may be fragmented progress and higher stress later.`,
      risk: `Risk level for ${mode.toLowerCase()} mode: medium. Main risks include overload, weak prioritization, and underestimating effort.`,
      move: `Suggested next move: reduce the scenario into smaller checkpoints, define a realistic timeline, and protect one high-value priority first.`
    });
  }

  return (
    <section className="py-10 sm:py-14">
      <Link href="/experiments" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Experiments
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Experiments
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        Simulation Lab
      </h1>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        Run what-if scenarios before taking action. This lab helps users explore possible
        outcomes, risks, and better next moves.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Scenario Input</div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {(["Academic", "Career", "Product", "Life"] as SimMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={
                  m === mode
                    ? "rounded-2xl border border-white bg-white px-4 py-2 text-sm font-semibold text-[#0B0F14]"
                    : "rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/80 hover:bg-white/5"
                }
              >
                {m}
              </button>
            ))}
          </div>

          <textarea
            rows={8}
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            placeholder="Example: If I study 2 hours daily for 6 weeks, can I pass my exams and still keep building my app?"
            className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
          />

          <div className="mt-4 flex justify-end">
            <button
              onClick={runSimulation}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
            >
              Run Simulation
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Simulation Output</div>

          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Likely Path A</div>
              <div className="mt-2 text-sm text-white/70">{result?.pathA ?? "Waiting for simulation..."}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Likely Path B</div>
              <div className="mt-2 text-sm text-white/70">{result?.pathB ?? "Waiting for simulation..."}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Risk Level</div>
              <div className="mt-2 text-sm text-white/70">{result?.risk ?? "Waiting for simulation..."}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Best Next Move</div>
              <div className="mt-2 text-sm text-white/70">{result?.move ?? "Waiting for simulation..."}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
