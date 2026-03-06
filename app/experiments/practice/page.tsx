"use client";

import Link from "next/link";
import { useState } from "react";

type PracticeType = "Interview" | "Oral Exam" | "Presentation" | "Difficult Conversation";

export default function ExperimentsPracticePage() {
  const [selected, setSelected] = useState<PracticeType>("Interview");
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  function startPractice() {
    const p = prompt.trim();
    if (!p) return;

    const opening =
      selected === "Interview"
        ? "Practice session started. First interview question: Tell me about yourself and why you are a strong fit."
        : selected === "Oral Exam"
        ? "Practice session started. First oral exam prompt: Explain the topic clearly from foundation level."
        : selected === "Presentation"
        ? "Practice session started. Present your idea in a clear opening statement with confidence."
        : "Practice session started. Speak calmly, clearly, and focus on your main point without attacking the other person.";

    setMessages((prev) => [...prev, `You: ${p}`, `Arena: ${opening}`]);
    setPrompt("");
  }

  const cards: PracticeType[] = ["Interview", "Oral Exam", "Presentation", "Difficult Conversation"];

  return (
    <section className="py-10 sm:py-14">
      <Link href="/experiments" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Experiments
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Experiments
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        Practice Arena
      </h1>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        Practice Arena helps users rehearse real situations with AI feedback. It can be
        used for interviews, oral exams, presentations, pitches, and difficult conversations.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <button
            key={card}
            onClick={() => setSelected(card)}
            className={
              selected === card
                ? "rounded-3xl border border-white bg-white p-6 text-left text-[#0B0F14]"
                : "rounded-3xl border border-white/10 bg-white/5 p-6 text-left hover:bg-white/7"
            }
          >
            <div className="text-lg font-semibold">{card}</div>
            <div className={selected === card ? "mt-2 text-sm text-[#0B0F14]/80" : "mt-2 text-sm text-white/70"}>
              {card === "Interview" && "Practice job and internship interviews"}
              {card === "Oral Exam" && "Rehearse academic response under pressure"}
              {card === "Presentation" && "Practice clear speaking and delivery"}
              {card === "Difficult Conversation" && "Rehearse important personal or team discussions"}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Practice Prompt</div>

        <textarea
          rows={6}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: Act as an interviewer for a junior frontend developer role and ask me one question at a time."
          className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
        />

        <div className="mt-4 flex justify-end">
          <button
            onClick={startPractice}
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
          >
            Start Practice
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Session Feed</div>

        <div className="mt-4 space-y-3">
          {messages.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/60">
              No practice session started yet.
            </div>
          ) : (
            messages.map((m, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/80">
                {m}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
