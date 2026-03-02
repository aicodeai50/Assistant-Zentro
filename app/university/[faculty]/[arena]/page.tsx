import Link from "next/link";
import UniversityFrame from "@/components/university/UniversityFrame";
import ArenaAIClient from "@/components/university/ArenaAIClient";
import { FACULTY_THEMES, isFacultyKey } from "@/components/university/facultyThemes";
import { notFound } from "next/navigation";

const ARENA_LABELS: Record<string, { title: string; subtitle: string }> = {
  "study-lab": {
    title: "Study Lab",
    subtitle: "Summaries → flashcards → quizzes → repetition.",
  },
  "exam-arena": {
    title: "Exam Arena",
    subtitle: "Timed exams + marking guides + weak-spot detection.",
  },
  "concept-forge": {
    title: "Concept Forge",
    subtitle: "Deep explanation, analogies, and concept-map outlines.",
  },
  "career-launchpad": {
    title: "Career Launchpad",
    subtitle: "Interview prep, CV/LinkedIn, and portfolio projects.",
  },
};

export default async function ArenaPage({
  params,
}: {
  params: Promise<{ faculty: string; arena: string }>;
}) {
  const { faculty, arena } = await params;

  if (!isFacultyKey(faculty)) notFound();
  const theme = FACULTY_THEMES[faculty];

  const arenaMeta = ARENA_LABELS[arena];
  if (!arenaMeta) notFound();

  return (
    <UniversityFrame
      title={`${arenaMeta.title} — ${theme.label}`}
      subtitle={arenaMeta.subtitle}
      accent={theme.accent}
      background={theme.background}
    >
      <div className="flex flex-wrap gap-2">
        <Link
          href={`/university/${faculty}`}
          className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15"
        >
          ← Back to arenas
        </Link>
        <Link
          href="/university"
          className="rounded-2xl border border-white/15 bg-black/40 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
        >
          Faculties
        </Link>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-white/15 bg-black/35 p-6 backdrop-blur-xl">
            <div className="text-xs tracking-widest text-white/60">WORKSPACE</div>
            <div className="mt-2 text-sm text-white/80">
              This arena is now connected to AI. Type a topic and click Generate.
            </div>

            <div className="mt-4 rounded-2xl border border-white/15 bg-black/50 p-4 text-sm text-white/70">
              Next: we can turn this into structured JSON output and render cards, quizzes,
              flashcards, grading rubrics, or timelines depending on arena.
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <ArenaAIClient
            facultyLabel={theme.label}
            arenaLabel={arenaMeta.title}
            accent={theme.accent}
          />
        </div>
      </div>
    </UniversityFrame>
  );
}
