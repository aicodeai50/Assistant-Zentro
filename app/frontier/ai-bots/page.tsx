"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type BotMode = "assistant" | "builder" | "teacher" | "analyst";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const MODES: Record<
  BotMode,
  {
    title: string;
    desc: string;
    output: (input: string) => string;
  }
> = {
  assistant: {
    title: "AI Assistant",
    desc: "General support, planning help, quick answers, and structured next steps.",
    output: (input) =>
      input
        ? `Assistant mode: I would turn "${input}" into a clear action plan, explain the fastest next step, and suggest how to begin without confusion.`
        : "Assistant mode: Ask something and this lab will generate a structured support response.",
  },
  builder: {
    title: "AI Builder",
    desc: "Turns product ideas into features, workflows, and build direction.",
    output: (input) =>
      input
        ? `Builder mode: "${input}" can become a real system by defining the users, the workflow, the main feature set, and the first build milestone.`
        : "Builder mode: Describe what you want to build and this lab will generate a build path.",
  },
  teacher: {
    title: "AI Teacher",
    desc: "Explains ideas step by step for beginners and growing learners.",
    output: (input) =>
      input
        ? `Teacher mode: To learn "${input}", start with the basic concept, then study a small example, then practice it inside one tiny project.`
        : "Teacher mode: Enter a topic and this lab will explain it in a clearer learning style.",
  },
  analyst: {
    title: "AI Analyst",
    desc: "Compares options, trade-offs, risks, and strong recommendations.",
    output: (input) =>
      input
        ? `Analyst mode: For "${input}", compare the main options, identify the strongest benefit, the biggest risk, and the most balanced recommendation.`
        : "Analyst mode: Enter a decision or problem and this lab will analyze it from multiple sides.",
  },
};

export default function AIBotLabPage() {
  const [mode, setMode] = useState<BotMode>("assistant");
  const [prompt, setPrompt] = useState("");

  const result = useMemo(() => MODES[mode].output(prompt.trim()), [mode, prompt]);

  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_18%_10%,rgba(132,204,22,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_580px_at_85%_16%,rgba(34,197,94,0.10),transparent_55%)]" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/frontier"
          className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
        >
          ← Back
        </Link>
        <Link
          href="/"
          className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
        >
          Home
        </Link>
        <Link
          href="/frontier"
          className="inline-flex items-center rounded-xl border border-lime-400/20 bg-lime-400/10 px-3 py-2 text-sm text-lime-100 hover:bg-lime-400/15"
        >
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
          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
            Experiment with AI behaviour models. Choose a mode, type a prompt, and see how the
            response changes by purpose.
          </p>
        </div>

        <div className="rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-sm text-lime-100">
          Bot Modes: Active
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-sm font-semibold text-white">Choose bot behaviour</div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(Object.keys(MODES) as BotMode[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={cx(
                  "rounded-2xl border p-4 text-left transition",
                  mode === item
                    ? "border-lime-300/30 bg-lime-400/10 text-white"
                    : "border-white/10 bg-black/20 text-white/80 hover:bg-white/7"
                )}
              >
                <div className="text-sm font-semibold">{MODES[item].title}</div>
                <div className="mt-1 text-sm text-white/60">{MODES[item].desc}</div>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <label className="text-sm font-semibold text-white">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: Help me design an AI assistant for students learning coding."
              rows={8}
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Live Output
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-lg font-semibold text-white">{MODES[mode].title}</div>
            <div className="mt-2 text-sm text-white/60">{MODES[mode].desc}</div>
          </div>

          <div className="mt-4 rounded-2xl border border-lime-400/20 bg-lime-400/5 p-4 text-sm leading-7 text-white/85">
            {result}
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm font-semibold text-white">Why this is different</div>
            <div className="mt-2 text-sm leading-6 text-white/65">
              This lab is for behaviour testing. Same prompt, different intelligence mode.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
