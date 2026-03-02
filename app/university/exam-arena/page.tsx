"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const FACULTIES: Record<string, { name: string; accent: string }> = {
  "stem-it": { name: "STEM & IT", accent: "#22D3EE" },
  business: { name: "Business & Economics", accent: "#A3E635" },
  medicine: { name: "Medicine & Health", accent: "#FB7185" },
  "law-social": { name: "Law & Social Sciences", accent: "#B48CFF" },
  "arts-humanities": { name: "Arts & Humanities", accent: "#38BDF8" },
  education: { name: "Education", accent: "#34D399" },
  custom: { name: "Custom / Interdisciplinary", accent: "#F59E0B" },
};

function getFacultyFromSearch(): string {
  if (typeof window === "undefined") return "stem-it";
  return new URLSearchParams(window.location.search).get("faculty") || "stem-it";
}

export default function ExamArenaPage() {
  const [facultyId] = useState<string>(() => getFacultyFromSearch());
  const faculty = FACULTIES[facultyId] || FACULTIES["stem-it"];

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const templates = useMemo(
    () => [
      "Create 5 timed questions on: ",
      "Give me 1 exam-style scenario question on: ",
      "Make a 10-minute mock test for: ",
    ],
    []
  );

  function generate() {
    const t = prompt.trim();
    if (!t) return;
    setResult(
      [
        `Exam Arena (Faculty: ${faculty.name})`,
        "",
        "How to use:",
        "1) Pick a topic.",
        "2) Generate a timed set.",
        "3) Answer without notes.",
        "4) Repeat until speed + accuracy improve.",
        "",
        `Your request: ${t}`,
        "",
        "Benefit: Builds exam speed, reduces panic, improves structured reasoning.",
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
              linear-gradient(180deg, rgba(2,6,23,0.70), rgba(0,0,0,0.95))
            `,
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs tracking-widest text-white/60">UNIVERSITY HUB</div>
            <div className="mt-2 text-3xl font-semibold">Exam Arena</div>
            <div className="mt-2 text-sm text-white/70">Timed reasoning + applied problem-solving.</div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/university" className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15">
              Back to Hub →
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/15 bg-white/5 p-6">
          <div className="text-sm text-white/80">
            Faculty: <span style={{ color: faculty.accent }} className="font-semibold">{faculty.name}</span>
          </div>

          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Topic for timed practice"
            className="mt-4 w-full rounded-2xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
            onKeyDown={(e) => (e.key === "Enter" ? generate() : null)}
          />

          <div className="mt-3 flex flex-wrap gap-2">
            {templates.map((t) => (
              <button
                key={t}
                type="button"
                className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80 hover:bg-white/15"
                onClick={() => setPrompt(t)}
              >
                {t.trim()}…
              </button>
            ))}
          </div>

          <button
            onClick={generate}
            className="mt-4 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/85 hover:bg-white/15"
            type="button"
          >
            Generate Timed Set →
          </button>

          {result && <pre className="mt-5 whitespace-pre-wrap text-sm text-white/80">{result}</pre>}
        </div>
      </div>
    </div>
  );
}
