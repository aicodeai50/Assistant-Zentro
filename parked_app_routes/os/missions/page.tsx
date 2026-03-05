import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs tracking-widest text-white/60">SHYNVO OS</div>
            <h1 className="mt-2 text-3xl font-semibold">Missions</h1>
            <p className="mt-2 text-white/70">Goals → steps → outcomes. For study, teaching, and teams.</p>
          </div>
          <Link href="/os" className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15">
            Back to OS →
          </Link>
        </div>

        <div className="mt-8 rounded-3xl border border-white/15 bg-white/5 p-6">
          <div className="text-sm text-white/80">Purpose:</div>
          <ul className="mt-3 list-disc pl-6 text-sm text-white/70">
            <li>Students: exam mission plans, daily drills, weak-spot repair.</li>
            <li>Teachers: lesson missions, assignments, grading workflows.</li>
            <li>Teams: upskilling tracks, skill-gap sprints, onboarding.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
