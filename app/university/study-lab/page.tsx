"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import DestinationSearch, { type Destination } from "@/components/university/DestinationSearch";
import { askTutor } from "@/lib/university/tutor";

const FACULTIES: Record<string, { name: string; accent: string }> = {
  "stem-it": { name: "STEM & IT", accent: "#22D3EE" },
  business: { name: "Business & Economics", accent: "#A3E635" },
  medicine: { name: "Medicine & Health", accent: "#FB7185" },
  "law-social": { name: "Law & Social Sciences", accent: "#B48CFF" },
  "arts-humanities": { name: "Arts & Humanities", accent: "#38BDF8" },
  education: { name: "Education", accent: "#34D399" },
  custom: { name: "Custom / Interdisciplinary", accent: "#F59E0B" },
};

function getFaculty(): string {
  if (typeof window === "undefined") return "stem-it";
  const p = new URLSearchParams(window.location.search);
  return p.get("faculty") || "stem-it";
}

export default function StudyLabPage() {
  const [facultyId, setFacultyId] = useState(() => getFaculty());
  const faculty = FACULTIES[facultyId] || FACULTIES["stem-it"];

  const destinations: Destination[] = useMemo(
    () => [
      {
        label: "Study Lab",
        keywords: ["study", "notes", "tutor", "lecture", "explain"],
        href: ({ faculty }) => `/university/study-lab?faculty=${encodeURIComponent(faculty || "stem-it")}`,
      },
      {
        label: "Exam Arena",
        keywords: ["exam", "timed", "practice", "questions", "mock"],
        href: ({ faculty, q }) =>
          `/university/exam-arena?faculty=${encodeURIComponent(faculty || "stem-it")}${q ? `&q=${encodeURIComponent(q)}` : ""}`,
      },
      {
        label: "Concept Forge",
        keywords: ["concept", "map", "graph", "understand", "visual"],
        href: ({ faculty, q }) =>
          `/university/concept-forge?faculty=${encodeURIComponent(faculty || "stem-it")}${q ? `&q=${encodeURIComponent(q)}` : ""}`,
      },
      {
        label: "Career Launchpad",
        keywords: ["career", "interview", "resume", "internship", "job"],
        href: ({ faculty, q }) =>
          `/university/career-launchpad?faculty=${encodeURIComponent(faculty || "stem-it")}${q ? `&q=${encodeURIComponent(q)}` : ""}`,
      },
    ],
    []
  );

  const [topic, setTopic] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    const t = topic.trim();
    if (!t) return;
    setLoading(true);
    setAnswer(null);

    const prompt = [
      `Faculty: ${faculty.name}`,
      "Room: Study Lab",
      "",
      `User topic/question: ${t}`,
      "",
      "Deliver:",
      "- Simple explanation",
      "- 2 examples",
      "- 6 quick drills (with answers)",
      "- 3 recall prompts",
      "- 1 exam-style question",
    ].join("\n");

    try {
      const reply = await askTutor(prompt);
      setAnswer(reply);
    } catch (e: any) {
      setAnswer(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1100px circle at 18% 18%, ${faculty.accent}28, transparent 55%),
              radial-gradient(900px circle at 82% 24%, rgba(255,255,255,0.08), transparent 55%),
              linear-gradient(180deg, rgba(2,6,23,0.70), rgba(0,0,0,0.95))
            `,
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs tracking-widest text-white/60">UNIVERSITY HUB</div>
            <div className="mt-2 text-3xl font-semibold">Study Lab</div>
            <div className="mt-2 text-sm text-white/70">
              Turn lectures + notes into mastery loops: explain → drill → recall.
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

        <div className="mt-7">
          <DestinationSearch faculty={facultyId} destinations={destinations} placeholder="Search rooms… (study, exam, concept, career)" />
        </div>

        <div className="mt-6 rounded-3xl border border-white/15 bg-black/35 p-6 backdrop-blur-xl">
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
                    type="button"
                    onClick={() => setFacultyId(id)}
                    className={[
                      "rounded-full border px-3 py-1 text-xs transition",
                      active
                        ? "border-white/25 bg-white/15 text-white"
                        : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10",
                    ].join(" ")}
                    style={active ? { boxShadow: `0 0 24px ${f.accent}2A` } : undefined}
                  >
                    {f.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <div className="text-xs tracking-widest text-white/60">ASK YOUR TUTOR</div>
              <div className="mt-2 text-sm text-white/70">
                Type your topic. You’ll get an explanation + drills + recall prompts.
              </div>

              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., SQL joins / cardiac cycle / supply & demand"
                className="mt-4 w-full rounded-2xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
                onKeyDown={(e) => (e.key === "Enter" ? run() : null)}
              />

              <button
                onClick={run}
                disabled={loading || !topic.trim()}
                className="mt-3 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/85 hover:bg-white/15 disabled:opacity-50"
                type="button"
              >
                {loading ? "Generating…" : "Generate Study Loop →"}
              </button>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <div className="text-xs tracking-widest text-white/60">OUTPUT</div>
              {!answer ? (
                <div className="mt-3 text-sm text-white/70">
                  Your tutor response will appear here.
                </div>
              ) : (
                <pre className="mt-3 whitespace-pre-wrap text-sm text-white/80">{answer}</pre>
              )}
            </div>
          </div>

          <div className="mt-5 text-xs text-white/50">
            Purpose: reduce overload, increase retention, and turn notes into repeatable mastery.
          </div>
        </div>
      </div>
    </div>
  );
}
