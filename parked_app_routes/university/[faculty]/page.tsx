import Link from "next/link";
import UniversityFrame from "@/components/university/UniversityFrame";
import { FACULTY_THEMES, isFacultyKey } from "@/components/university/facultyThemes";
import { notFound } from "next/navigation";

const CARD =
  "group relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl transition hover:bg-white/10";

const ARENAS = [
  { key: "study-lab", label: "Study Lab", desc: "Summaries → flashcards → quizzes → repetition." },
  { key: "exam-arena", label: "Exam Arena", desc: "Timed exams + marking guides + weak-spot detection." },
  { key: "concept-forge", label: "Concept Forge", desc: "Deep explanations, analogies, and concept maps." },
  { key: "career-launchpad", label: "Career Launchpad", desc: "Interview prep, CV/LinkedIn, portfolio projects." },
] as const;

export default async function FacultyPage({
  params,
}: {
  params: Promise<{ faculty: string }>;
}) {
  const { faculty } = await params;

  if (!isFacultyKey(faculty)) notFound();
  const theme = FACULTY_THEMES[faculty];

  return (
    <UniversityFrame
      title={theme.label}
      subtitle={theme.subtitle}
      accent={theme.accent}
      background={theme.background}
    >
      <div className="flex flex-wrap gap-2">
        <Link
          href="/university"
          className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15"
        >
          ← Back to faculties
        </Link>
        <Link
          href="/"
          className="rounded-2xl border border-white/15 bg-black/40 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
        >
          Home
        </Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {ARENAS.map((a) => (
          <Link key={a.key} href={`/university/${faculty}/${a.key}`} className={CARD}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xl font-semibold text-white">{a.label}</div>
                <div className="mt-1 text-sm text-white/70">{a.desc}</div>
              </div>
              <div
                className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80"
                style={{ boxShadow: `0 0 0 1px ${theme.accent}20 inset` }}
              >
                Open →
              </div>
            </div>

            <div className="mt-4 text-xs text-white/55">
              AI-ready • uses /api/public/chat
            </div>
          </Link>
        ))}
      </div>
    </UniversityFrame>
  );
}
