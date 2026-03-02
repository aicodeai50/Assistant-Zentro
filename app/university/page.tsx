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
  href: string; // IMPORTANT: real route
  cta: string;
  badge: string;
};

type Faculty = {
  id: FacultyId;
  name: string;
  tagline: string;
  accent: string;
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
            desc: "Turn lectures + notes into mastery loops: explanations → drills → recall.",
            href: "/university/study-lab",
            cta: "Open Study Lab →",
            badge: "Faculty-tuned",
          },
          exam: {
            id: "exam",
            title: "Exam Arena",
            desc: "Timed reasoning + applied problem-solving. Train speed and accuracy.",
            href: "/university/exam-arena",
            cta: "Enter Exam Arena →",
            badge: "Timed",
          },
          concept: {
            id: "concept",
            title: "Concept Forge",
            desc: "Visualize systems and dependencies: architectures, formulas, modules.",
            href: "/university/concept-forge",
            cta: "Launch Concept Forge →",
            badge: "Visual",
          },
          career: {
            id: "career",
            title: "Career Launchpad",
            desc: "Interview prep: coding prompts, system design, internship readiness.",
            href: "/university/career-launchpad",
            cta: "Open Launchpad →",
            badge: "Career",
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
            desc: "Understand models and frameworks with examples and micro-drills.",
            href: "/university/study-lab",
            cta: "Open Study Lab →",
            badge: "Faculty-tuned",
          },
          exam: {
            id: "exam",
            title: "Exam Arena",
            desc: "Case questions + calculations + structured reasoning under time.",
            href: "/university/exam-arena",
            cta: "Enter Exam Arena →",
            badge: "Timed",
          },
          concept: {
            id: "concept",
            title: "Concept Forge",
            desc: "Map incentives, flows, and strategic relationships.",
            href: "/university/concept-forge",
            cta: "Launch Concept Forge →",
            badge: "Visual",
          },
          career: {
            id: "career",
            title: "Career Launchpad",
            desc: "Prep for consulting/finance/startups: interviews + skill gap guidance.",
            href: "/university/career-launchpad",
            cta: "Open Launchpad →",
            badge: "Career",
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
            desc: "Spaced recall + explanations for pathways, symptoms, mechanisms.",
            href: "/university/study-lab",
            cta: "Open Study Lab →",
            badge: "Faculty-tuned",
          },
          exam: {
            id: "exam",
            title: "Exam Arena",
            desc: "Clinical prompts: recall + application with feedback on reasoning.",
            href: "/university/exam-arena",
            cta: "Enter Exam Arena →",
            badge: "Timed",
          },
          concept: {
            id: "concept",
            title: "Concept Forge",
            desc: "Visualize body systems and causal chains (why symptoms appear).",
            href: "/university/concept-forge",
            cta: "Launch Concept Forge →",
            badge: "Visual",
          },
          career: {
            id: "career",
            title: "Career Launchpad",
            desc: "Placement readiness + reflective decision prompts for specialization.",
            href: "/university/career-launchpad",
            cta: "Open Launchpad →",
            badge: "Career",
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
            desc: "Structured summaries and drills for cases, theories, legal logic.",
            href: "/university/study-lab",
            cta: "Open Study Lab →",
            badge: "Faculty-tuned",
          },
          exam: {
            id: "exam",
            title: "Exam Arena",
            desc: "Issue spotting + argument building + writing structure practice.",
            href: "/university/exam-arena",
            cta: "Enter Exam Arena →",
            badge: "Timed",
          },
          concept: {
            id: "concept",
            title: "Concept Forge",
            desc: "Map arguments and contradictions to sharpen reasoning.",
            href: "/university/concept-forge",
            cta: "Launch Concept Forge →",
            badge: "Visual",
          },
          career: {
            id: "career",
            title: "Career Launchpad",
            desc: "Clerkships/firms/research/policy roles — interview prep + direction.",
            href: "/university/career-launchpad",
            cta: "Open Launchpad →",
            badge: "Career",
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
            desc: "Interpret texts and ideas with guided prompts + synthesis practice.",
            href: "/university/study-lab",
            cta: "Open Study Lab →",
            badge: "Faculty-tuned",
          },
          exam: {
            id: "exam",
            title: "Exam Arena",
            desc: "Essay structure, analysis depth, and clarity drills with feedback.",
            href: "/university/exam-arena",
            cta: "Enter Exam Arena →",
            badge: "Timed",
          },
          concept: {
            id: "concept",
            title: "Concept Forge",
            desc: "Map themes, movements, and conceptual evolution across time.",
            href: "/university/concept-forge",
            cta: "Launch Concept Forge →",
            badge: "Visual",
          },
          career: {
            id: "career",
            title: "Career Launchpad",
            desc: "Portfolio story, interviews, and direction for creative/academic paths.",
            href: "/university/career-launchpad",
            cta: "Open Launchpad →",
            badge: "Career",
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
            desc: "Scenario-based learning: methods, theory, classroom strategies.",
            href: "/university/study-lab",
            cta: "Open Study Lab →",
            badge: "Faculty-tuned",
          },
          exam: {
            id: "exam",
            title: "Exam Arena",
            desc: "Lesson planning + classroom tradeoffs under constraints.",
            href: "/university/exam-arena",
            cta: "Enter Exam Arena →",
            badge: "Timed",
          },
          concept: {
            id: "concept",
            title: "Concept Forge",
            desc: "Map learning theories into real teaching decisions.",
            href: "/university/concept-forge",
            cta: "Launch Concept Forge →",
            badge: "Visual",
          },
          career: {
            id: "career",
            title: "Career Launchpad",
            desc: "Certification readiness + interview practice for placements.",
            href: "/university/career-launchpad",
            cta: "Open Launchpad →",
            badge: "Career",
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
            desc: "Combine subjects into one learning flow. Your goals drive the structure.",
            href: "/university/study-lab",
            cta: "Open Study Lab →",
            badge: "Faculty-tuned",
          },
          exam: {
            id: "exam",
            title: "Exam Arena",
            desc: "Cross-domain reasoning drills with clarity feedback.",
            href: "/university/exam-arena",
            cta: "Enter Exam Arena →",
            badge: "Timed",
          },
          concept: {
            id: "concept",
            title: "Concept Forge",
            desc: "Merge ideas across disciplines to find patterns and insight.",
            href: "/university/concept-forge",
            cta: "Launch Concept Forge →",
            badge: "Visual",
          },
          career: {
            id: "career",
            title: "Career Launchpad",
            desc: "Nonlinear paths + emerging roles — sharpen narrative and readiness.",
            href: "/university/career-launchpad",
            cta: "Open Launchpad →",
            badge: "Career",
          },
        },
      },
    ],
    []
  );

  const [active, setActive] = useState<FacultyId>("stem-it");
  const faculty = faculties.find((f) => f.id === active) ?? faculties[0];

  const withFaculty = (href: string) => `${href}?faculty=${active}`;

  return (
    <div className="min-h-screen bg-black text-white">
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
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-xs tracking-widest text-white/70">UNIVERSITY HUB</div>
            <h1 className="mt-2 text-4xl font-semibold text-white">Study environments for every faculty</h1>
            <p className="mt-3 max-w-2xl text-white/70">
              Pick a faculty. Shynvo adapts examples, prompts, and drills — using the same 4 arenas:
              Study, Exam, Concept, Career.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15"
            >
              Home →
            </Link>
            <Link
              href="/os"
              className="rounded-2xl border border-white/15 bg-black/40 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
            >
              Enter OS (2050) →
            </Link>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-white/15 bg-black/35 p-5 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-white/80">
              Select faculty <span className="ml-2 text-xs text-white/50">(changes the environment)</span>
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
                    style={isActive ? { boxShadow: `0 0 24px ${f.accent}2A` } : undefined}
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
              <div className="mt-1 text-lg font-semibold text-white">{faculty.name}</div>
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

        {/* CLICKABLE ARENAS */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {(["study", "exam", "concept", "career"] as ArenaId[]).map((id) => {
            const a = faculty.arenas[id];
            return (
              <Link key={id} href={withFaculty(a.href)} className={CARD}>
                <Glow a={`${faculty.accent}33`} b="rgba(255,255,255,0.08)" c="rgba(0,0,0,0.00)" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xl font-semibold text-white">{a.title}</div>
                      <div className="mt-1 text-sm text-white/70">{a.desc}</div>
                    </div>
                    <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
                      {a.badge}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xs text-white/60">Open the environment</div>
                    <div className="text-sm text-white/85 group-hover:text-white">{a.cta}</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center text-xs text-white/45">
          University Hub is structured • Each environment is its own page (no more 404)
        </div>
      </div>
    </div>
  );
}
