"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const FACULTIES: Record<string, { name: string; accent: string; examples: string[] }> = {
  "stem-it": {
    name: "STEM & IT",
    accent: "#22D3EE",
    examples: ["Binary search proof", "SQL query optimization", "CPU scheduling", "Derivatives & limits"],
  },
  business: {
    name: "Business & Economics",
    accent: "#A3E635",
    examples: ["Break-even analysis", "Elasticity", "DCF assumptions", "Game theory payoff matrix"],
  },
  medicine: {
    name: "Medicine & Health",
    accent: "#FB7185",
    examples: ["Chest pain differential", "Drug mechanism", "ABG interpretation", "Pathway recall → treatment"],
  },
  "law-social": {
    name: "Law & Social Sciences",
    accent: "#B48CFF",
    examples: ["IRAC issue spotting", "Case comparison", "Policy tradeoff analysis", "Argument rebuttal drill"],
  },
  "arts-humanities": {
    name: "Arts & Humanities",
    accent: "#38BDF8",
    examples: ["Essay thesis defense", "Text passage analysis", "Historical causality", "Language translation drill"],
  },
  education: {
    name: "Education",
    accent: "#34D399",
    examples: ["Lesson plan critique", "Assessment design", "Classroom scenario response", "Learning theory application"],
  },
  custom: {
    name: "Custom / Interdisciplinary",
    accent: "#F59E0B",
    examples: ["Cross-domain synthesis essay", "Research question framing", "Concept mapping", "Project defense prep"],
  },
};

function getFacultyFromSearch(): string {
  if (typeof window === "undefined") return "stem-it";
  const p = new URLSearchParams(window.location.search);
  return p.get("faculty") || "stem-it";
}

export default function ExamArenaPage() {
  const [facultyId, setFacultyId] = useState<string>(() => getFacultyFromSearch());
  const faculty = FACULTIES[facultyId] || FACULTIES["stem-it"];

  const [topic, setTopic] = useState("");
  const [timer, setTimer] = useState<"5" | "10" | "20">("10");
  const [challenge, setChallenge] = useState<string | null>(null);

  const suggested = useMemo(() => faculty.examples, [faculty.examples]);

  function generateChallenge() {
    const t = topic.trim();
    if (!t) return;

    const minutes = Number(timer);
    setChallenge(
      [
        `Exam Arena — ${minutes} min sprint`,
        `Faculty: ${faculty.name}`,
        `Topic: ${t}`,
        "",
        "Instructions:",
        "1) Answer with structure first (outline) then details.",
        "2) Show reasoning steps. Avoid fluff.",
        "3) End with a 2-sentence summary.",
        "",
        "Prompt:",
        `Write an exam-style response on "${t}". Include one tricky edge-case.`,
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
              radial-gradient(1100px circle at 20% 18%, rgba(255,255,255,0.10), transparent 55%),
              radial-gradient(900px circle at 80% 22%, ${faculty.accent}2A, transparent 55%),
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
            <div className="mt-2 text-3xl font-semibold">Exam Arena</div>
            <div className="mt-2 text-sm text-white/70">
              Timed practice. Train clarity, speed, and transfer — not memorization.
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/university"
              className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15"
            >
              Back to Hub →
            </Link>
            <Link
              href="/"
              className="rounded-2xl border border-white/15 bg-black/40 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
            >
              Home →
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/15 bg-black/35 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-white/80">
              Faculty:{" "}
              <span style={{ color: faculty.accent }} className="font-semibold">
                {faculty.name}
              </span>
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
                      active
                        ? "border-white/25 bg-white/15 text-white"
                        : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10",
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
              <div className="text-xs tracking-widest text-white/60">SETUP</div>
              <div className="mt-2 text-sm text-white/70">
                Choose a topic and time. Generate a sprint prompt.
              </div>

              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Type an exam topic…"
                className="mt-4 w-full rounded-2xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
                onKeyDown={(e) => (e.key === "Enter" ? generateChallenge() : null)}
              />

              <div className="mt-3 flex items-center gap-2">
                <div className="text-xs text-white/60">Timer:</div>
                {(["5", "10", "20"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTimer(t)}
                    className={[
                      "rounded-full border px-3 py-1 text-xs transition",
                      timer === t
                        ? "border-white/25 bg-white/15 text-white"
                        : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10",
                    ].join(" ")}
                  >
                    {t}m
                  </button>
                ))}
              </div>

              <button
                onClick={generateChallenge}
                className="mt-4 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/85 hover:bg-white/15"
                type="button"
              >
                Generate Exam Sprint →
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
              <div className="text-xs tracking-widest text-white/60">CHALLENGE</div>
              {!challenge ? (
                <div className="mt-3 text-sm text-white/70">
                  Generate a sprint to see it here.
                </div>
              ) : (
                <pre className="mt-3 whitespace-pre-wrap text-sm text-white/80">{challenge}</pre>
              )}
            </div>
          </div>

          <div className="mt-5 text-xs text-white/50">
            Purpose: practice performance under time + build exam-ready structure and confidence.
          </div>
        </div>
      </div>
    </div>
  );
}