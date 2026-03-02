"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const FACULTIES: Record<string, { name: string; accent: string; examples: string[] }> = {
  "stem-it": { name: "STEM & IT", accent: "#22D3EE", examples: ["Big-O analysis", "SQL joins", "Operating systems", "Discrete math"] },
  business: { name: "Business & Economics", accent: "#A3E635", examples: ["Supply/demand", "DCF valuation", "Game theory", "Marketing funnels"] },
  medicine: { name: "Medicine & Health", accent: "#FB7185", examples: ["Cardiac cycle", "Pharmacology", "Pathways", "Case symptoms → diagnosis"] },
  "law-social": { name: "Law & Social Sciences", accent: "#B48CFF", examples: ["Issue spotting", "Case briefs", "Theories", "Argument structure"] },
  "arts-humanities": { name: "Arts & Humanities", accent: "#38BDF8", examples: ["Text analysis", "Critical theory", "Historical timelines", "Language practice"] },
  education: { name: "Education", accent: "#34D399", examples: ["Lesson planning", "Assessment design", "Learning science", "Classroom scenarios"] },
  custom: { name: "Custom / Interdisciplinary", accent: "#F59E0B", examples: ["Combine disciplines", "Cross-domain synthesis", "Project-based learning", "Research mapping"] },
};

function getFacultyFromSearch(): string {
  if (typeof window === "undefined") return "stem-it";
  const p = new URLSearchParams(window.location.search);
  return p.get("faculty") || "stem-it";
}

export default function StudyLabPage() {
  const [facultyId, setFacultyId] = useState<string>(() => getFacultyFromSearch());
  const faculty = FACULTIES[facultyId] || FACULTIES["stem-it"];

  const [topic, setTopic] = useState("");
  const [plan, setPlan] = useState<string | null>(null);

  const suggested = useMemo(() => faculty.examples, [faculty.examples]);

  function buildPlan() {
    const t = topic.trim();
    if (!t) return;

    setPlan(
      [
        `Topic: ${t}`,
        "",
        "How to use Study Lab:",
        "1) Read the short explanation until it’s clear.",
        "2) Do drills (quick checks).",
        "3) Do recall prompts from memory.",
        "4) Finish with one exam-style question.",
        "",
        "Your loop:",
        "• Explain (simple, direct)",
        "• Examples (2–3)",
        "• Drill (8 questions)",
        "• Recall (3 prompts)",
        "• Exam question (1)",
        "",
        "Benefit: Faster retention + less overwhelm + real mastery from notes.",
      ].join("\n")
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1000px circle at 18% 18%, ${faculty.accent}33, transparent 55%),
              radial-gradient(900px circle at 82% 24%, rgba(255,255,255,0.08), transparent 55%),
              linear-gradient(180deg, rgba(2,6,23,0.70), rgba(0,0,0,0.95))
            `,
          }}
        />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs tracking-widest text-white/60">UNIVERSITY HUB</div>
            <div className="mt-2 text-3xl font-semibold">Study Lab</div>
            <div className="mt-2 text-sm text-white/70">
              Turn lectures + notes into mastery loops: explanations → drills → recall.
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/university" className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15">
              Back to Hub →
            </Link>
            <Link href="/" className="rounded-2xl border border-white/15 bg-black/40 px-4 py-2 text-sm text-white/85 hover:bg-white/10">
              Home →
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/15 bg-black/35 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-white/80">
              Faculty: <span style={{ color: faculty.accent }} className="font-semibold">{faculty.name}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(FACULTIES).map(([id, f]) => {
                const active = id === facultyId;
                return (
                  <button
                    key={id}
                    onClick={() => setFacultyId(id)}
                    className={[
                      "rounded-full border px-3 py-1 text-xs transition",
                      active ? "border-white/25 bg-white/15 text-white" : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10",
                    ].join(" ")}
                    style={active ? { boxShadow: `0 0 24px ${f.accent}2A` } : undefined}
                    type="button"
                  >
                    {f.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <div className="text-xs tracking-widest text-white/60">START</div>
              <div className="mt-2 text-sm text-white/70">
                Enter your topic. This page gives you a structured practice loop.
              </div>

              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., SQL joins / cardiac cycle / supply & demand"
                className="mt-4 w-full rounded-2xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
                onKeyDown={(e) => (e.key === "Enter" ? buildPlan() : null)}
              />

              <button
                onClick={buildPlan}
                className="mt-3 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/85 hover:bg-white/15"
                type="button"
              >
                Generate Study Loop →
              </button>

              <div className="mt-4 text-xs text-white/55">
                Suggestions:{" "}
                {suggested.map((x) => (
                  <button
                    key={x}
                    type="button"
                    className="mr-2 underline decoration-white/20 hover:decoration-white/60"
                    onClick={() => setTopic(x)}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <div className="text-xs tracking-widest text-white/60">OUTPUT</div>
              {!plan ? (
                <div className="mt-3 text-sm text-white/70">Generate a loop to see your plan here.</div>
              ) : (
                <pre className="mt-3 whitespace-pre-wrap text-sm text-white/80">{plan}</pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
