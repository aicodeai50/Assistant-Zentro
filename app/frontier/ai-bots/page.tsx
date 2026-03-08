"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type BotMode = "assistant" | "builder" | "teacher" | "analyst";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const BOT_MODES: Record<
  BotMode,
  {
    title: string;
    desc: string;
    outputLabel: string;
    outputText: string;
  }
> = {
  assistant: {
    title: "AI Assistant",
    desc: "General support, planning help, quick answers, and structured next steps.",
    outputLabel: "Assistant mode",
    outputText: "Ask something and this lab will generate a structured support response.",
  },
  builder: {
    title: "AI Builder",
    desc: "Turns product ideas into features, workflows, and build direction.",
    outputLabel: "Builder mode",
    outputText: "Describe what you want to create and this lab will turn it into a build direction.",
  },
  teacher: {
    title: "AI Teacher",
    desc: "Explains ideas step by step for beginners and growing learners.",
    outputLabel: "Teacher mode",
    outputText: "Write what you want to learn and this lab will respond in a teaching style.",
  },
  analyst: {
    title: "AI Analyst",
    desc: "Compares options, trade-offs, risks, and strong recommendations.",
    outputLabel: "Analyst mode",
    outputText: "Write a decision or scenario and this lab will return analysis and trade-offs.",
  },
};

export default function FrontierAIBotsPage() {
  const [mode, setMode] = useState<BotMode>("assistant");
  const [prompt, setPrompt] = useState("Help me design an AI assistant for students learning coding.");
  const [generated, setGenerated] = useState(false);

  const active = useMemo(() => BOT_MODES[mode], [mode]);

  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_480px_at_18%_10%,rgba(132,204,22,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_82%_16%,rgba(34,197,94,0.12),transparent_58%)]" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link href="/frontier" className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white">
          ← Back
        </Link>
        <Link href="/" className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white">
          Home
        </Link>
        <Link href="/frontier" className="inline-flex items-center rounded-xl border border-lime-400/20 bg-lime-400/10 px-3 py-2 text-sm text-lime-100 hover:bg-lime-400/15">
          Frontier Lab
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-200/70">
            Frontier Lab
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            AI Bot Lab
          </h1>
          <p className="mt-3 max-w-5xl text-sm leading-6 text-white/70 sm:text-base">
            Experiment with AI behaviour models. Choose a mode, type a prompt, and see how the
            response changes by purpose.
          </p>
        </div>

        <div className="rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-sm text-lime-100">
          Bot Modes: Active
        </div>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-sm font-semibold text-white">Choose bot behaviour</div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {(Object.keys(BOT_MODES) as BotMode[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setMode(item);
                  setGenerated(false);
                }}
                className={cx(
                  "rounded-2xl border p-4 text-left transition",
                  mode === item
                    ? "border-lime-300/30 bg-lime-400/10 text-white"
                    : "border-white/10 bg-black/20 text-white/80 hover:bg-white/7"
                )}
              >
                <div className="text-base font-semibold">{BOT_MODES[item].title}</div>
                <div className="mt-2 text-sm leading-6 text-white/70">{BOT_MODES[item].desc}</div>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <label className="text-sm font-semibold text-white">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={7}
              placeholder="Write a prompt to test how the selected AI mode should respond..."
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setGenerated(true)}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
            >
              Generate response style
            </button>
            <button
              type="button"
              onClick={() => {
                setPrompt("");
                setGenerated(false);
              }}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
            >
              Clear prompt
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Live Output
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xl font-semibold text-white">{active.title}</div>
            <div className="mt-2 text-sm leading-6 text-white/70">{active.desc}</div>
          </div>

          <div className="mt-4 rounded-2xl border border-lime-400/20 bg-lime-400/10 p-4">
            <div className="text-sm font-semibold text-lime-100">{active.outputLabel}</div>
            <div className="mt-2 text-sm leading-6 text-lime-50/90">
              {generated ? `${active.outputText} Prompt: ${prompt || "No prompt written yet."}` : active.outputText}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm font-semibold text-white">Why this is different</div>
            <div className="mt-2 text-sm leading-6 text-white/70">
              This lab is for behaviour testing. Same prompt, different intelligence mode.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
