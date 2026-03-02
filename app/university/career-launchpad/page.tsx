"use client";

import Link from "next/link";
import { useState } from "react";

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

export default function CareerLaunchpadPage() {
  const [facultyId] = useState<string>(() => getFacultyFromSearch());
  const faculty = FACULTIES[facultyId] || FACULTIES["stem-it"];

  const [goal, setGoal] = useState("");
  const [plan, setPlan] = useState<string | null>(null);

  function generate() {
    const g = goal.trim();
    if (!g) return;
    setPlan(
      [
        `Career Launchpad (Faculty: ${faculty.name})`,
        "",
        "How to use:",
        "1) Write the role you want.",
        "2) Get a short prep checklist.",
        "3) Use it weekly: practice + refine + apply.",
        "",
        `Role goal: ${g}`,
        "",
        "Checklist:",
        "• 5 key skills to prove",
        "• 3 portfolio / proof items",
        "• 10 interview questions to practice",
        "• 1 weekly routine (repeatable)",
        "",
        "Benefit: Clear direction + faster readiness for internships/jobs.",
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
              radial-gradient(900px circle at 78% 20%, rgba(34,211,238,0.10), transparent 55%),
              linear-gradient(180deg, rgba(2,6,23,0.70), rgba(0,0,0,0.95))
            `,
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs tracking-widest text-white/60">UNIVERSITY HUB</div>
            <div className="mt-2 text-3xl font-semibold">Career Launchpad</div>
            <div className="mt-2 text-sm text-white/70">Interview prep + role readiness.</div>
          </div>
          <Link href="/university" className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15">
            Back to Hub →
          </Link>
        </div>

        <div className="mt-8 rounded-3xl border border-white/15 bg-white/5 p-6">
          <div className="text-sm text-white/80">
            Faculty: <span style={{ color: faculty.accent }} className="font-semibold">{faculty.name}</span>
          </div>

          <input
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., Backend intern / Nurse placement / Consultant / Policy researcher"
            className="mt-4 w-full rounded-2xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
            onKeyDown={(e) => (e.key === "Enter" ? generate() : null)}
          />

          <button
            onClick={generate}
            className="mt-4 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/85 hover:bg-white/15"
            type="button"
          >
            Generate Career Plan →
          </button>

          {plan && <pre className="mt-5 whitespace-pre-wrap text-sm text-white/80">{plan}</pre>}
        </div>
      </div>
    </div>
  );
}
