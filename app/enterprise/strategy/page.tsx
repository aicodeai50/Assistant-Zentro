"use client";

import { useState } from "react";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

export default function EnterpriseStrategyPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("Structured options, trade-offs, and recommended direction.");

  function analyzeDecision() {
    const text = input.trim();
    if (!text) return;

    setOutput(
      `Decision analyzed: ${text}\n\nOption A: move faster with higher coordination risk.\nOption B: move slower with stronger control.\nTrade-off: speed vs reliability.\nRecommended direction: choose the path that the team can sustain and measure clearly.`
    );
  }

  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav hubHref="/enterprise" hubTitle="Shynvo Enterprise" />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo Enterprise
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        AI Strategy
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        AI Strategy helps leadership compare options, reduce risk, and make better organizational decisions with structured reasoning.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-2xl font-semibold text-white">Decision Input</div>
          <div className="mt-2 text-sm text-white/70">
            Example: Should we hire first, ship first, or partner first?
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type the decision you want to analyze..."
            className="mt-4 min-h-[220px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
          />

          <button
            type="button"
            onClick={analyzeDecision}
            className="mt-4 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
          >
            Analyze decision
          </button>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-2xl font-semibold text-white">AI Output</div>
          <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/75">
            {output}
          </pre>
        </div>
      </div>
    </section>
  );
}
