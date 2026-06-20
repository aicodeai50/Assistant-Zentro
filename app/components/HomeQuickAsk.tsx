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
        className="rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-300 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_0_32px_rgba(34,211,238,0.2)] transition hover:brightness-105"
      >
        Open Operations Assistant
      </button>
      <a
        href="/pricing"
        className="rounded-lg border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/[0.05]"
      >
        View enterprise plans
      </a>
    </div>
  );
}

export function HomeQuickAsk() {
  const { openChat } = useZentroRobot();
  const [question, setQuestion] = useState("");

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="zentro-console relative overflow-hidden rounded-2xl border border-cyan-400/15 p-6 sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(34,211,238,0.12),transparent)]"
        />

        <div className="relative">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="zentro-section-label">Operations console</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Ask your AI operations assistant
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
                No login required. Get immediate guidance on incidents, automations, runbooks,
                pricing, and platform capabilities.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5">
              <span className="zentro-status-dot" />
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-emerald-200/90">
                Assistant online
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && question.trim()) openChat(question.trim());
              }}
              placeholder="How does Zentro handle approval-gated automations during an incident?"
              className="w-full flex-1 rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-cyan-400/35 focus:ring-1 focus:ring-cyan-400/20"
            />
            <button
              type="button"
              onClick={() => question.trim() && openChat(question.trim())}
              disabled={!question.trim()}
              className="rounded-xl bg-cyan-300 px-8 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:opacity-45"
            >
              Submit inquiry
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {ZENTRO_QUICK_SUGGESTIONS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => openChat(item.prompt)}
                className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-[11px] font-medium text-white/65 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.06] hover:text-cyan-100"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
