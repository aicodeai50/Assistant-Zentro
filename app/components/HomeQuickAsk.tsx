"use client";

import { useState } from "react";
import { useZentroRobot } from "@/lib/robot/context";
import { ZENTRO_QUICK_SUGGESTIONS } from "@/lib/robot/suggestions";

export default function HomeHeroActions() {
  const { openChat } = useZentroRobot();

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => openChat()}
        className="rounded-md bg-cyan-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-950 transition hover:bg-cyan-200"
      >
        Talk to Robot
      </button>
      <a
        href="/pricing"
        className="rounded-md border border-white/20 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white/85 transition hover:border-cyan-300/60 hover:text-cyan-200"
      >
        View Plans
      </a>
    </div>
  );
}

export function HomeQuickAsk() {
  const { openChat } = useZentroRobot();
  const [question, setQuestion] = useState("");

  return (
    <section className="mt-16 rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/[0.07] via-white/[0.02] to-violet-500/[0.06] p-6 sm:p-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/80">Ask the robot</p>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Your IT copilot is online
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/65 sm:text-base">
            No login required. The Zentro robot answers questions about incidents, automations,
            runbooks, pricing, and getting started.
          </p>
        </div>
        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-emerald-200">
          Smiling &amp; waving
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && question.trim()) openChat(question.trim());
          }}
          placeholder="e.g. How does Incident Copilot help during an outage?"
          className="w-full flex-1 rounded-xl border border-white/10 bg-black/25 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/35 focus:border-cyan-400/40"
        />
        <button
          type="button"
          onClick={() => question.trim() && openChat(question.trim())}
          disabled={!question.trim()}
          className="rounded-xl bg-cyan-300 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:opacity-50"
        >
          Ask Robot
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {ZENTRO_QUICK_SUGGESTIONS.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => openChat(item.prompt)}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/75 transition hover:border-cyan-400/35 hover:bg-cyan-400/10 hover:text-cyan-100"
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
}
