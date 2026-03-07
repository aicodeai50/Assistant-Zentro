export default function AcademyPage() {
  const subjects = [
    "Math",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Literature",
    "Languages",
    "Islamic Studies",
  ];

  return (
    <div className="min-h-screen py-10 text-white">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          Shynvo Academy
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          School Learning World
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
          Shynvo Academy is the high-school learning environment for junior and senior students.
          It is designed for structured studying, AI support, quizzes, and exam preparation.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#subjects"
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
          >
            Explore Subjects
          </a>
          <a
            href="/signup"
            className="rounded-xl px-5 py-3 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/5"
          >
            Create Account
          </a>
        </div>
      </section>

      <section id="subjects" className="mt-8">
        <div className="mb-4 text-sm font-semibold text-white/80">Subjects</div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {subjects.map((subject) => (
            <div
              key={subject}
              className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:bg-white/[0.07]"
            >
              <div className="text-base font-semibold">{subject}</div>
              <p className="mt-2 text-sm leading-6 text-white/65">
                AI-assisted lessons, revision paths, quizzes, and exam support for {subject}.
              </p>

              <div className="mt-4">
                <button
                  type="button"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10"
                >
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <div className="text-sm font-semibold text-white">Planned Academy Features</div>
        <ul className="mt-4 space-y-2 text-sm text-white/70">
          <li>• Subject-based AI tutoring</li>
          <li>• Quiz engine</li>
          <li>• Exam preparation systems</li>
          <li>• Study badges and progress tracking</li>
        </ul>
      </section>
    </div>
  );
}
