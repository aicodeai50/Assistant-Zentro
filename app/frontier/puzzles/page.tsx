"use client";

import Link from "next/link";
import { useState } from "react";

const PUZZLES = [
  {
    title: "System Lock Puzzle",
    question:
      "A system has 3 switches. B must come after A, and C cannot be last. Which order can unlock the system?",
    hint: "Start with the rule that B cannot appear before A, then remove endings where C is last.",
    answer: "A → C → B",
  },
  {
    title: "Deployment Chain Puzzle",
    question:
      "A release needs testing and approval. Approval must happen after review. What is the valid minimum decision chain?",
    hint: "Map the dependency order first before thinking about release.",
    answer: "Review → Approval → Testing complete → Release",
  },
  {
    title: "Bot Rule Puzzle",
    question:
      "A bot must be helpful, brief, and safe. One answer is helpful but unsafe. Another is safe but too long. Which one passes?",
    hint: "This is an all-conditions rule, not a one-condition rule.",
    answer: "Neither passes. All 3 conditions must be satisfied together.",
  },
];

export default function LogicPuzzlesPage() {
  const [index, setIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const puzzle = PUZZLES[index];

  function nextPuzzle() {
    setIndex((prev) => (prev + 1) % PUZZLES.length);
    setShowHint(false);
    setShowAnswer(false);
  }

  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_18%_10%,rgba(163,230,53,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_560px_at_80%_18%,rgba(34,197,94,0.10),transparent_55%)]" />
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
            Logic Puzzles
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
            Train deep reasoning through interactive logic challenges. Reveal hints, test yourself,
            then move to the next puzzle.
          </p>
        </div>

        <div className="rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-sm text-lime-100">
          Puzzle Chamber: Active
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-sm font-semibold text-white">{puzzle.title}</div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/85">
            {puzzle.question}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShowHint((prev) => !prev)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
            >
              {showHint ? "Hide hint" : "Show hint"}
            </button>

            <button
              type="button"
              onClick={() => setShowAnswer((prev) => !prev)}
              className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
            >
              {showAnswer ? "Hide answer" : "Reveal answer"}
            </button>

            <button
              type="button"
              onClick={nextPuzzle}
              className="rounded-2xl border border-lime-400/20 bg-lime-400/10 px-4 py-3 text-sm font-semibold text-lime-100 hover:bg-lime-400/15"
            >
              Next puzzle
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-sm font-semibold text-white">Puzzle panel</div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm font-semibold text-white">Hint</div>
            <div className="mt-2 text-sm text-white/70">
              {showHint ? puzzle.hint : "Hint hidden until you reveal it."}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-lime-400/20 bg-lime-400/5 p-4">
            <div className="text-sm font-semibold text-white">Answer</div>
            <div className="mt-2 text-sm text-white/85">
              {showAnswer ? puzzle.answer : "Answer hidden until reveal."}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm font-semibold text-white">Why this page is different</div>
            <div className="mt-2 text-sm leading-6 text-white/65">
              This is the reasoning chamber of Frontier Lab. It is not for building like Coding Arena,
              and not for AI behaviour testing like AI Bot Lab.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
