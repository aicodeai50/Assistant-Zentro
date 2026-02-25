import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function OSPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      <main className="mx-auto max-w-6xl px-6 py-14">
        <section className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              Shynvo OS · Vision Layer (2050)
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              A Personal Intelligence Environment
            </h1>

            <p className="mt-4 text-neutral-300">
              Shynvo is evolving beyond a learning app into an adaptive system that
              understands momentum, focus, and long-term skill trajectory.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/demo"
                className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-neutral-200"
              >
                View Demo
              </a>

              <a
                href="/robot"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
              >
                Open Robot
              </a>

              <a
                href="/dashboard/trajectory"
                className="rounded-xl border border-white/10 bg-black px-5 py-3 font-semibold text-white hover:bg-white/5"
              >
                Trajectory Dashboard
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6 shadow-xl">
            <div className="text-sm text-neutral-400">SYSTEM STATUS</div>

            <div className="mt-4 grid gap-3">
              <Status label="Cognitive Load" value="Balanced" />
              <Status label="Skill Momentum" value="Increasing" />
              <Status label="Focus Window" value="42 minutes" />
              <Status label="Current Path" value="Builder → Founder" />
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          <Card title="Trajectory">
            Shynvo tracks direction over time — not just daily activity.
          </Card>
          <Card title="Simulations">
            Practice interviews, decisions, and builds in future scenarios.
          </Card>
          <Card title="Presence">
            A calm, optional AI interface that feels cinematic — never intrusive.
          </Card>
        </section>

        <section className="mt-16 rounded-3xl border border-neutral-800 bg-neutral-950 p-8">
          <h2 className="text-2xl font-bold">This page is intentional.</h2>
          <p className="mt-2 text-neutral-300">
            It communicates vision without blocking real functionality.
            Shynvo works today — this shows where it’s going.
          </p>

          <div className="mt-6 flex gap-3">
            <a
              href="/"
              className="rounded-xl border border-white/10 bg-black px-5 py-3 font-semibold text-white hover:bg-white/5"
            >
              ← Back Home
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function Status({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-neutral-800 bg-black p-4">
      <div className="text-sm text-neutral-400">{label}</div>
      <div className="text-sm font-semibold text-neutral-100">{value}</div>
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