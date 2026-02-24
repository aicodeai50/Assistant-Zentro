export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14 font-sans">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Shynvo</h1>
        <p className="text-lg text-neutral-700">
          AI-powered learning + upskilling platform. Create quizzes, flashcards, interview practice, and run
          AI “workers” that stream output in real time.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <a className="rounded-xl bg-black px-4 py-2 font-semibold text-white" href="/pricing">
            View pricing
          </a>
          <a className="rounded-xl border border-black px-4 py-2 font-semibold" href="/demo">
            Watch demo
          </a>
        </div>
      </header>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        <Card title="Students">Adaptive quizzes, flashcards, study plans.</Card>
        <Card title="Professionals">Skill-gap analysis, certification prep, interview simulator.</Card>
        <Card title="Companies">Team seats, skill matrix, upskill plans, admin analytics.</Card>
      </section>

      <footer className="mt-10 text-sm text-neutral-600">
        <a className="underline" href="/privacy">Privacy</a> ·{" "}
        <a className="underline" href="/terms">Terms</a> ·{" "}
        <span>Contact: sandraherbert50.sh@gmail.com</span>
      </footer>
    </main>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border p-5 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-neutral-700">{children}</p>
    </div>
  );
}