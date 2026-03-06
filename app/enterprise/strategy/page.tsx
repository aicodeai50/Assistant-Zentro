"use client";

import Link from "next/link";
import { useState } from "react";

export default function EnterpriseStrategyPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(
    "Structured options, trade-offs, and recommended direction."
  );

  function handleAnalyze() {
    if (!input.trim()) return;
    setOutput(
      `Recommendation draft for: "${input.trim()}".\n\n1. Compare options by cost, speed, and risk.\n2. Choose the path with the strongest short-term leverage.\n3. Validate with a small pilot before scaling.`
    );
  }

  return (
    <section className="py-10 sm:py-14">
      <Link href="/enterprise" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Enterprise Suite
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Enterprise Suite
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">AI Strategy</h1>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        AI Strategy helps leadership compare options, reduce risk, and make better organizational decisions with structured reasoning.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xl font-semibold">Decision Input</div>
          <div className="mt-2 text-sm text-white/60">Example: Should we hire first, ship first, or partner first?</div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            placeholder="Type the decision you want to analyze..."
            className="mt-5 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35"
          />

          <button
            type="button"
            onClick={handleAnalyze}
            className="mt-5 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
          >
            Analyze decision
          </button>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xl font-semibold">AI Output</div>
          <pre className="mt-5 whitespace-pre-wrap text-sm leading-6 text-white/75">{output}</pre>
        </div>
      </div>
    </section>
  );
}
