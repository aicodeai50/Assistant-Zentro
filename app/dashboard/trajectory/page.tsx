import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function TrajectoryPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      <main className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              Shynvo OS • Trajectory Console
            </p>
            <h1 className="mt-4 text-3xl font-bold md:text-4xl">Trajectory</h1>
            <p className="mt-2 text-white/70">
              A future-facing dashboard that tracks your momentum, focus, and skill direction.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/os"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Back to OS
            </Link>
            <Link
              href="/robot"
              className="rounded-xl border border-white/10 bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-white/5"
            >
              Open Robot
            </Link>
          </div>
        </div>

        {/* STATUS CARDS */}
        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <Card title="Momentum">Rising</Card>
          <Card title="Confidence Index">67%</Card>
          <Card title="Focus Window">42 minutes</Card>
        </section>

        {/* TIMELINE */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-neutral-950 p-6">
          <div className="text-sm text-white/60">TIMELINE (v1 mock)</div>
          <div className="mt-4 grid gap-3">
            <Event
              time="Today"
              title="Skill signal detected"
              desc="React fundamentals improving; recommend hooks + state patterns."
            />
            <Event
              time="Next 7 days"
              title="Execution path"
              desc="Build one small project + 2 interview simulations to lock in confidence."
            />
            <Event
              time="Next 30 days"
              title="Trajectory shift"
              desc="Software → Product Builder: increase system design + delivery practice."
            />
          </div>
        </section>

        {/* ACTIONS */}
        <section className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-black p-6">
            <div className="text-lg font-semibold">Next Action</div>
            <p className="mt-2 text-sm text-white/60">
              Choose a simulation to run. (We’ll connect this to your backend next.)
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Chip>Interview Simulation</Chip>
              <Chip>Skill Gap Scan</Chip>
              <Chip>7-Day Build Plan</Chip>
              <Chip>Quiz Generator</Chip>
            </div>

            <Link
              href="/robot"
              className="mt-6 inline-flex rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-neutral-200"
            >
              Run via Robot →
            </Link>
          </div>

          <div className="rounded-3xl border border-white/10 bg-neutral-950 p-6">
            <div className="text-lg font-semibold">System Notes</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/60">
              <li>Trajectory is the product — not chat.</li>
              <li>We measure momentum, not streaks.</li>
              <li>Simulations become the premium feature.</li>
              <li>Everything stays optional and calm.</li>
            </ul>
          </div>
        </section>

        <div className="mt-10">
          <Link className="text-sm text-white/70 underline hover:text-white" href="/">
            ← Back home
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black p-6">
      <div className="text-sm text-white/60">{title}</div>
      <div className="mt-2 text-2xl font-bold">{children}</div>
    </div>
  );
}

function Event({ time, title, desc }: { time: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black p-5">
      <div className="text-xs uppercase tracking-wide text-white/50">{time}</div>
      <div className="mt-1 text-base font-semibold">{title}</div>
      <div className="mt-1 text-sm text-white/60">{desc}</div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}