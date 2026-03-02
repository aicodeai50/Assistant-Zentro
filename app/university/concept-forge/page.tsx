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

export default function ConceptForgePage() {
  const [facultyId] = useState<string>(() => getFacultyFromSearch());
  const faculty = FACULTIES[facultyId] || FACULTIES["stem-it"];

  const [topic, setTopic] = useState("");
  const [map, setMap] = useState<string | null>(null);

  function generate() {
    const t = topic.trim();
    if (!t) return;
    setMap(
      [
        `Concept Forge (Faculty: ${faculty.name})`,
        "",
        "How to use:",
        "1) Enter a topic or system.",
        "2) Generate a dependency map structure.",
        "3) Use it as a study guide: learn nodes → links → examples.",
        "",
        `Topic: ${t}`,
        "",
        "Suggested structure:",
        "• Core concept",
        "• 5 key sub-concepts",
        "• 3 dependencies per sub-concept",
        "• 2 real examples",
        "",
        "Benefit: Makes complex topics clearer by showing relationships.",
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
              radial-gradient(900px circle at 78% 20%, rgba(180,140,255,0.12), transparent 55%),
              linear-gradient(180deg, rgba(2,6,23,0.70), rgba(0,0,0,0.95))
            `,
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs tracking-widest text-white/60">UNIVERSITY HUB</div>
            <div className="mt-2 text-3xl font-semibold">Concept Forge</div>
            <div className="mt-2 text-sm text-white/70">Visualize systems and dependencies.</div>
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
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., React rendering pipeline / cardiac conduction / supply chains"
            className="mt-4 w-full rounded-2xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
            onKeyDown={(e) => (e.key === "Enter" ? generate() : null)}
          />

          <button
            onClick={generate}
            className="mt-4 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/85 hover:bg-white/15"
            type="button"
          >
            Generate Map Structure →
          </button>

          {map && <pre className="mt-5 whitespace-pre-wrap text-sm text-white/80">{map}</pre>}
        </div>
      </div>
    </div>
  );
}
