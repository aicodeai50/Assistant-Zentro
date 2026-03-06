"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type DebateMode = "Balanced" | "Critical" | "Aggressive";

export default function ExperimentsDebatePage() {
  const [mode, setMode] = useState<DebateMode>("Balanced");
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<null | {
    pro: string;
    con: string;
    blindSpots: string;
    recommendation: string;
  }>(null);

  const placeholder = useMemo(() => {
    if (mode === "Critical") {
      return "Example: Critically analyze whether I should focus on exams first or startup work first.";
    }
    if (mode === "Aggressive") {
      return "Example: Challenge my idea that I can build a startup and still get top grades this semester.";
    }
    return "Example: Should I focus on exam preparation first or on building my startup project?";
  }, [mode]);

  function generateDebate() {
    const t = topic.trim();
    if (!t) return;

    setResult({
      pro:
        `One strong argument in favor of this path is that "${t}" may create a clearer short-term direction and reduce confusion.`,
      con:
        `One strong argument against this path is that "${t}" may create trade-offs the user is underestimating, especially around time, energy, or priorities.`,
      blindSpots:
        `Possible blind spots: unrealistic workload, emotional bias, missing opportunity cost, and not defining success clearly enough.`,
      recommendation:
        mode === "Aggressive"
          ? `Recommendation: do not commit yet. Stress-test the decision harder, define measurable success, and remove weak assumptions first.`
          : mode === "Critical"
          ? `Recommendation: compare the cost of delay, the academic risk, and the expected upside before choosing.`
          : `Recommendation: choose the path with the clearest immediate value, lowest regret, and strongest alignment with your current season.`
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
        Debate Lab
      </h1>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        Test both sides of a decision, argument, or belief. This lab helps users see
        stronger counterpoints, hidden assumptions, and a clearer conclusion.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Debate Input</div>

          <div className="mt-4 flex flex-wrap gap-2">
            {(["Balanced", "Critical", "Aggressive"] as DebateMode[]).map((m) => (
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
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={placeholder}
            className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
          />

          <div className="mt-4 flex justify-end">
            <button
              onClick={generateDebate}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
            >
              Generate Debate
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Expected Output</div>

          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Strongest Pro Side</div>
              <div className="mt-2 text-sm text-white/70">{result?.pro ?? "Waiting for analysis..."}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Strongest Con Side</div>
              <div className="mt-2 text-sm text-white/70">{result?.con ?? "Waiting for analysis..."}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Blind Spots</div>
              <div className="mt-2 text-sm text-white/70">{result?.blindSpots ?? "Waiting for analysis..."}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Recommendation</div>
              <div className="mt-2 text-sm text-white/70">{result?.recommendation ?? "Waiting for analysis..."}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
