"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type FacultyId =
  | "stem-it"
  | "business"
  | "medicine"
  | "law-social"
  | "arts-humanities"
  | "education"
  | "custom";

type ArenaId = "study" | "exam" | "concept" | "career";

type Arena = {
  id: ArenaId;
  title: string;
  desc: string;
  cta: string;
};

type Faculty = {
  id: FacultyId;
  name: string;
  tagline: string;
  accent: string; // used for glow + chips
  includes: string[];
  arenas: Record<ArenaId, Arena>;
};

const CARD =
  "group relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl transition hover:bg-white/10";

function Glow({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-80"
      style={{
        background: `
          radial-gradient(900px circle at 20% 25%, ${a}, transparent 60%),
          radial-gradient(800px circle at 80% 30%, ${b}, transparent 55%),
          radial-gradient(1000px circle at 50% 95%, ${c}, transparent 60%)
        `,
      }}
    />
  );
}

function Chip({ text, accent }: { text: string; accent: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80"
      style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 0 18px ${accent}22` }}
    >
      {text}
    </span>
  );
}

export default function UniversityHubPage() {
  const faculties: Faculty[] = useMemo(
    () => [
      {
        id: "stem-it",
        name: "STEM & IT",
        tagline: "Algorithms, systems, math, data, engineering.",
        accent: "#22D3EE",
        includes: ["CS", "IT", "Engineering", "Data", "AI", "Cybersecurity", "Math"],
        arenas: {
          study: {
            id: "study",
            title: "Study Lab",
            desc: "Break down formulas, algorithms, systems, and problem sets into mastery loops.",
            cta: "Open Study Lab →",
          },
          exam: {
            id: "exam",
            title: "Exam Arena",
            desc: "Timed reasoning, coding logic, calculations, and applied problem solving under pressure.",
            cta: "Enter Exam Arena →",
          },
          concept: {
            id: "concept",
            title: "Concept Forge",
            desc: "Visualize dependencies: architectures, modules, equations, and cause-effect systems.",
            cta: "Launch Concept Forge →",
          },
          career: {
            id: "career",
            title: "Career Launchpad",
            desc: "Tech interviews, system design prompts, and role readiness for internships & jobs.",
            cta: "Open Launchpad →",
          },
        },
      },
      {
        id: "business",
        name: "Business & Economics",
        tagline: "Models, markets, decisions, strategy.",
        accent: "#A3E635",
        includes: ["Finance", "Accounting", "Management", "Marketing", "Economics", "Strategy"],
        arenas: {
          study: {
            id: "study",
            title: "Study Lab",
            desc: "Understand frameworks, models, and market logic with clear explanations and drills.",
            cta: "Open Study Lab →",
          },
          exam: {
            id: "exam",
            title: "Exam Arena",
            desc: "Case-style questions, calculations, and structured decision tradeoffs with feedback.",
            cta: "Enter Exam Arena →",
          },
          concept: {
            id: "concept",
            title: "Concept Forge",
            desc: "Map incentives, flows, and strategic relationships to see the business system clearly.",
            cta: "Launch Concept Forge →",
          },
          career: {
            id: "career",
            title: "Career Launchpad",
            desc: "Interview prep for consulting/finance/startups + role-aligned skill gap guidance.",
            cta: "Open Launchpad →",
          },
        },
      },
      {
        id: "medicine",
        name: "Medicine & Health",
        tagline: "Clinical logic, mechanisms, recall + application.",
        accent: "#FB7185",
        includes: ["Medicine", "Nursing", "Pharmacy", "Public Health", "Biology", "Physiology"],
        arenas: {
          study: {
            id: "study",
            title: "Study Lab",
            desc: "Memorize pathways, symptoms, and mechanisms with spaced recall and explanations.",
            cta: "Open Study Lab →",
          },
          exam: {
            id: "exam",
            title: "Exam Arena",
            desc: "Clinical-style prompts: recall + application under pressure with clarity feedback.",
            cta: "Enter Exam Arena →",
          },
          concept: {
            id: "concept",
            title: "Concept Forge",
            desc: "Visualize body systems and causal chains: why symptoms appear and what shifts them.",
            cta: "Launch Concept Forge →",
          },
          career: {
            id: "career",
            title: "Career Launchpad",
            desc: "Residency/placement readiness + reflective reasoning prompts to strengthen decisions.",
            cta: "Open Launchpad →",
          },
        },
      },
      {
        id: "law-social",
        name: "Law & Social Sciences",
        tagline: "Arguments, cases, theory, structure.",
        accent: "#B48CFF",
        includes: ["Law", "Politics", "Sociology", "Psychology", "IR", "Public Policy"],
        arenas: {
          study: {
            id: "study",
            title: "Study Lab",
            desc: "Understand cases, theories, and legal logic with structured summaries and drills.",
            cta: "Open Study Lab →",
          },
          exam: {
            id: "exam",
            title: "Exam Arena",
            desc: "Issue spotting, argument building, and written answer structure with scoring.",
            cta: "Enter Exam Arena →",
          },
          concept: {
            id: "concept",
            title: "Concept Forge",
            desc: "Map arguments, positions, and contradictions to sharpen reasoning and reduce bias.",
            cta: "Launch Concept Forge →",
          },
          career: {
            id: "career",
            title: "Career Launchpad",
            desc: "Clerkships, firms, research and policy roles — prep interviews and clarity of direction.",
            cta: "Open Launchpad →",
          },
        },
      },
      {
        id: "arts-humanities",
        name: "Arts & Humanities",
        tagline: "Meaning, critique, interpretation, creation.",
        accent: "#38BDF8",
        includes: ["Philosophy", "Literature", "History", "Design", "Media", "Languages"],
        arenas: {
          study: {
            id: "study",
            title: "Study Lab",
            desc: "Analyze texts, theories, and creative frameworks with guided prompts and synthesis.",
            cta: "Open Study Lab →",
          },
          exam: {
            id: "exam",
            title: "Exam Arena",
            desc: "Essay structure, interpretation practice, critique depth — with feedback for clarity.",
            cta: "Enter Exam Arena →",
          },
          concept: {
            id: "concept",
            title: "Concept Forge",
            desc: "Map themes, movements, and conceptual evolution across authors, eras, and theories.",
            cta: "Launch Concept Forge →",
          },
          career: {
            id: "career",
            title: "Career Launchpad",
            desc: "Creative, academic, and cultural paths — portfolios, interviews, and story clarity.",
            cta: "Open Launchpad →",
          },
        },
      },
      {
        id: "education",
        name: "Education",
        tagline: "Teaching skill, pedagogy, classroom decisions.",
        accent: "#34D399",
        includes: ["Teaching", "Pedagogy", "Curriculum", "Learning Science", "Assessment"],
        arenas: {
          study: {
            id: "study",
            title: "Study Lab",
            desc: "Learn methods, theory, and classroom strategies with scenario-based practice.",
            cta: "Open Study Lab →",
          },
          exam: {
            id: "exam",
            title: "Exam Arena",
            desc: "Plan lessons and handle classroom tradeoffs under constraints with feedback.",
            cta: "Enter Exam Arena →",
          },
          concept: {
            id: "concept",
            title: "Concept Forge",
            desc: "Map learning theories and student-centered models into real teaching decisions.",
            cta: "Launch Concept Forge →",
          },
          career: {
            id: "career",
            title: "Career Launchpad",
            desc: "Certification readiness + interview practice for teaching roles and school placements.",
            cta: "Open Launchpad →",
          },
        },
      },
      {
        id: "custom",
        name: "Custom / Interdisciplinary",
        tagline: "For mixed programs and unique paths.",
        accent: "#F59E0B",
        includes: ["Mix your fields", "Create your own track", "Cross-domain synthesis"],
        arenas: {
          study: {
            id: "study",
            title: "Study Lab",
            desc: "Combine subjects into one learning flow. Your goals decide the structure.",
            cta: "Open Study Lab →",
          },
          exam: {
            id: "exam",
            title: "Exam Arena",
            desc: "Cross-domain reasoning and synthesis drills — get feedback on clarity and logic.",
            cta: "Enter Exam Arena →",
          },
          concept: {
            id: "concept",
            title: "Concept Forge",
            desc: "Merge ideas across disciplines to find patterns, links, and deeper insight.",
            cta: "Launch Concept Forge →",
          },
          career: {
            id: "career",
            title: "Career Launchpad",
            desc: "Nonlinear paths, emerging roles, and narrative clarity for your unique profile.",
            cta: "Open Launchpad →",
          },
        },
      },
    ],
    []
  );

  const [active, setActive] = useState<FacultyId>("stem-it");
  const faculty = faculties.find((f) => f.id === active) ?? faculties[0];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* soft universe background */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1100px circle at 20% 18%, rgba(56,189,248,0.16), transparent 55%),
              radial-gradient(1000px circle at 80% 20%, rgba(163,230,53,0.12), transparent 55%),
              radial-gradient(1000px circle at 50% 95%, rgba(180,140,255,0.12), transparent 60%),
              linear-gradient(180deg, rgba(2,6,23,0.72), rgba(0,0,0,0.95))
            `,
            filter: "saturate(1.15) contrast(1.05)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:46px_46px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-xs tracking-widest text-white/70">
              UNIVERSITY HUB
            </div>
            <h1 className="mt-2 text-4xl font-semibold text-white">
              Study environments for every faculty
            </h1>
            <p className="mt-3 max-w-2xl text-white/70">
              Choose your faculty. Shynvo adapts the prompts, examples, and
              practice loops — while keeping the same 4 core arenas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15"
            >
              Back to Home →
            </Link>
            <Link
              href="/os"
              className="rounded-2xl border border-white/15 bg-black/40 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
            >
              Enter OS (2050) →
            </Link>
          </div>
        </div>

        {/* Faculty selector */}
        <div className="mt-10 rounded-3xl border border-white/15 bg-black/35 p-5 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-white/80">
              Select faculty
              <span className="ml-2 text-xs text-white/50">
                (changes subtitles + examples)
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {faculties.map((f) => {
                const isActive = f.id === active;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setActive(f.id)}
                    className={[
                      "rounded-full border px-3 py-1 text-xs transition",
                      isActive
                        ? "border-white/25 bg-white/15 text-white"
                        : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10",
                    ].join(" ")}
                    style={
                      isActive
                        ? { boxShadow: `0 0 24px ${f.accent}2A` }
                        : undefined
                    }
                  >
                    {f.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <div className="text-xs tracking-widest text-white/60">FACULTY</div>
              <div className="mt-1 text-lg font-semibold text-white">
                {faculty.name}
              </div>
              <div className="mt-1 text-sm text-white/70">{faculty.tagline}</div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 md:col-span-2">
              <div className="text-xs tracking-widest text-white/60">INCLUDES</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {faculty.includes.map((x) => (
                  <Chip key={x} text={x} accent={faculty.accent} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Arenas */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {/* Study Lab */}
          <div className={CARD}>
            <Glow
              a={`${faculty.accent}33`}
              b="rgba(255,255,255,0.08)"
              c="rgba(0,0,0,0.00)"
            />
            <div className="relative">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xl font-semibold text-white">
                    {faculty.arenas.study.title}
                  </div>
                  <div className="mt-1 text-sm text-white/70">
                    {faculty.arenas.study.desc}
                  </div>
                </div>
                <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
                  Faculty-tuned
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-white/60">
                  Notes → drills → recall → mastery
                </div>
                <div className="text-sm text-white/85 group-hover:text-white">
                  {faculty.arenas.study.cta}
                </div>
              </div>
            </div>
          </div>

          {/* Exam Arena */}
          <div className={CARD}>
            <Glow
              a="rgba(255,255,255,0.10)"
              b={`${faculty.accent}2A`}
              c="rgba(0,0,0,0.00)"
            />
            <div className="relative">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xl font-semibold text-white">
                    {faculty.arenas.exam.title}
                  </div>
                  <div className="mt-1 text-sm text-white/70">
                    {faculty.arenas.exam.desc}
                  </div>
                </div>
                <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
                  Timed
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-white/60">
                  Practice under pressure
                </div>
                <div className="text-sm text-white/85 group-hover:text-white">
                  {faculty.arenas.exam.cta}
                </div>
              </div>
            </div>
          </div>

          {/* Concept Forge */}
          <div className={CARD}>
            <Glow
              a="rgba(120,180,255,0.16)"
              b={`${faculty.accent}24`}
              c="rgba(180,140,255,0.14)"
            />
            <div className="relative">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xl font-semibold text-white">
                    {faculty.arenas.concept.title}
                  </div>
                  <div className="mt-1 text-sm text-white/70">
                    {faculty.arenas.concept.desc}
                  </div>
                </div>
                <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
                  Visual
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-white/60">
                  Relationships → clarity
                </div>
                <div className="text-sm text-white/85 group-hover:text-white">
                  {faculty.arenas.concept.cta}
                </div>
              </div>
            </div>
          </div>

          {/* Career Launchpad */}
          <div className={CARD}>
            <Glow
              a="rgba(255,180,120,0.12)"
              b={`${faculty.accent}22`}
              c="rgba(34,211,238,0.10)"
            />
            <div className="relative">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xl font-semibold text-white">
                    {faculty.arenas.career.title}
                  </div>
                  <div className="mt-1 text-sm text-white/70">
                    {faculty.arenas.career.desc}
                  </div>
                </div>
                <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
                  Career
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-white/60">
                  Role readiness → next steps
                </div>
                <div className="text-sm text-white/85 group-hover:text-white">
                  {faculty.arenas.career.cta}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-10 text-center text-xs text-white/45">
          University Hub is a structured environment • Experiments remain separate
        </div>
      </div>
    </div>
  );
}