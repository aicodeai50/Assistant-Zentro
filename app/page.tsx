import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      <main className="mx-auto max-w-6xl px-6 py-14">
        {/* HERO */}
        <section className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              Shynvo — AI Learning + Upskilling
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Learn faster. Prepare smarter. Upskill teams with AI.
            </h1>

            <p className="mt-4 text-neutral-300">
              Shynvo helps students and professionals build real skills — and helps
              companies measure skill gaps, generate upskilling plans, and practice interviews.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-neutral-200"
                href="/demo"
              >
                View demo
              </a>
              <a
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
                href="/pricing"
              >
                See pricing
              </a>
              <a
                className="rounded-xl border border-white/10 bg-black px-5 py-3 font-semibold text-white hover:bg-white/5"
                href="/robot"
              >
                Try the sci-fi robot
              </a>
            </div>

            <div className="mt-6 text-sm text-neutral-400">
              Built for: <span className="text-neutral-200">Students</span>,{" "}
              <span className="text-neutral-200">Professionals</span>,{" "}
              <span className="text-neutral-200">Teams</span>
            </div>
          </div>

          {/* HERO CARD */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6 shadow-xl">
            <div className="text-sm text-neutral-400">What you get</div>

            <div className="mt-4 grid gap-3">
              <Feature title="Adaptive quizzes + flashcards">
                Generate practice instantly from any topic.
              </Feature>
              <Feature title="Interview simulation (Pro)">
                Practice questions, feedback, and scoring.
              </Feature>
              <Feature title="Company tools (Team)">
                Skill matrix, team upskilling plans, admin analytics.
              </Feature>
              <Feature title="Cinematic assistant robot (optional)">
                A futuristic experience that users can enable/disable.
              </Feature>
            </div>

            <a
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-white hover:bg-white/10"
              href="/pricing"
            >
              Upgrade anytime →
            </a>
          </div>
        </section>

        {/* SOCIAL PROOF / TRUST */}
        <section className="mt-14 grid gap-4 md:grid-cols-3">
          <Stat value="Free" label="Start with the free tier" />
          <Stat value="Pro" label="Upgrade for interview prep + higher limits" />
          <Stat value="Team" label="Company tools + seats + analytics" />
        </section>

        {/* WHO IT’S FOR */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold">Who Shynvo is for</h2>
          <p className="mt-2 text-neutral-300">
            Choose your path — Shynvo adapts the experience to your role.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card title="Students">
              Quizzes, flashcards, study plans, and confidence-building practice.
            </Card>
            <Card title="Professionals">
              Skill-gap analysis, project execution plans, interview readiness.
            </Card>
            <Card title="Companies">
              Admin dashboards, team upskilling, and interview simulation at scale.
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-3xl border border-neutral-800 bg-neutral-950 p-8">
          <h2 className="text-2xl font-bold">Ready to try it?</h2>
          <p className="mt-2 text-neutral-300">
            Start with the demo, then upgrade when you’re ready.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-neutral-200"
              href="/demo"
            >
              Open demo
            </a>
            <a
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
              href="/pricing"
            >
              View pricing
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function Feature({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-black p-4">
      <div className="font-semibold text-neutral-100">{title}</div>
      <div className="mt-1 text-sm text-neutral-400">{children}</div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-neutral-800 bg-black p-6">
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-2 text-sm text-neutral-400">{children}</div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-neutral-800 bg-black p-6">
      <div className="text-2xl font-bold">{value}</div>
      <div className="mt-1 text-sm text-neutral-400">{label}</div>
    </div>
  );
}