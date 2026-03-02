"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const FACULTIES: Record<string, { name: string; accent: string; examples: string[] }> = {
  "stem-it": {
    name: "STEM & IT",
    accent: "#22D3EE",
    examples: ["Backend internship", "Data analyst role", "Cybersecurity trainee", "Frontend junior role"],
  },
  business: {
    name: "Business & Economics",
    accent: "#A3E635",
    examples: ["Consulting internship", "Finance analyst", "Marketing coordinator", "Startup operations"],
  },
  medicine: {
    name: "Medicine & Health",
    accent: "#FB7185",
    examples: ["Clinical placement", "Nursing interview", "Pharmacy internship", "Public health role"],
  },
  "law-social": {
    name: "Law & Social Sciences",
    accent: "#B48CFF",
    examples: ["Legal clerkship", "Policy research role", "NGO analyst", "Case competition prep"],
  },
  "arts-humanities": {
    name: "Arts & Humanities",
    accent: "#38BDF8",
    examples: ["UX portfolio path", "Content strategist", "Museum/curation role", "Teaching assistant"],
  },
  education: {
    name: "Education",
    accent: "#34D399",
    examples: ["Teacher placement", "Lesson demo interview", "Curriculum assistant", "EdTech role"],
  },
  custom: {
    name: "Custom / Interdisciplinary",
    accent: "#F59E0B",
    examples: ["Product role path", "Research assistant", "Innovation fellowship", "Creator + tech hybrid"],
  },
};

function getFacultyFromSearch(): string {
  if (typeof window === "undefined") return "stem-it";
  const p = new URLSearchParams(window.location.search);
  return p.get("faculty") || "stem-it";
}

export default function CareerLaunchpadPage() {
  const [facultyId, setFacultyId] = useState<string>(() => getFacultyFromSearch());
  const faculty = FACULTIES[facultyId] || FACULTIES["stem-it"];

  const [goal, setGoal] = useState("");
  const [checklist, setChecklist] = useState<string | null>(null);

  const suggested = useMemo(() => faculty.examples, [faculty.examples]);

  function generateChecklist() {
    const g = goal.trim();
    if (!g) return;

    setChecklist(
      [
        `Career Launchpad`,
        `Faculty: ${faculty.name}`,
        `Goal: ${g}`,
        "",
        "Checklist:",
        "1) Identify role skills (top 6).",
        "2) Pick 2 projects to prove capability.",
        "3) Build a 1-page story: problem → action → result.",
        "4) Prep 8 interview questions + answers.",
        "5) Do 2 mock interviews (record yourself).",
        "6) Apply weekly with a tight feedback loop.",
        "",
        "If you want: paste a job description later and we’ll tailor this exactly.",
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
              radial-gradient(1000px circle at 18% 18%, rgba(255,180,120,0.12), transparent 55%),
              radial-gradient(900px circle at 82% 24%, ${faculty.accent}2A, transparent 55%),
              radial-gradient(900px circle at 50% 92%, rgba(34,211,238,0.10), transparent 60%),
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
            <div className="mt-2 text-3xl font-semibold">Career Launchpad</div>
            <div className="mt-2 text-sm text-white/70">
              Turn your faculty into a job-ready plan: projects → story → interview prep.
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
              <div className="text-xs tracking-widest text-white/60">START</div>
              <div className="mt-2 text-sm text-white/70">
                Enter your target role or goal. We generate a readiness checklist.
              </div>

              <input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., Backend internship / Consulting internship / Nursing placement"
                className="mt-4 w-full rounded-2xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
                onKeyDown={(e) => (e.key === "Enter" ? generateChecklist() : null)}
              />

              <button
                onClick={generateChecklist}
                className="mt-3 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/85 hover:bg-white/15"
                type="button"
              >
                Generate Readiness Plan →
              </button>

              <div className="mt-4 text-xs text-white/55">
                Suggestions:{" "}
                {suggested.map((x) => (
                  <button
                    key={x}
                    type="button"
                    className="mr-2 underline decoration-white/20 hover:decoration-white/60"
                    onClick={() => setGoal(x)}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <div className="text-xs tracking-widest text-white/60">PLAN</div>
              {!checklist ? (
                <div className="mt-3 text-sm text-white/70">Generate a plan to see it here.</div>
              ) : (
                <pre className="mt-3 whitespace-pre-wrap text-sm text-white/80">{checklist}</pre>
              )}
            </div>
          </div>

          <div className="mt-5 text-xs text-white/50">
            Purpose: move from “studying” to “proof of skill” with projects and interview readiness.
          </div>
        </div>
      </div>
    </div>
  );
}