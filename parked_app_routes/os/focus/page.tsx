import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs tracking-widest text-white/60">SHYNVO OS</div>
            <h1 className="mt-2 text-3xl font-semibold">Focus</h1>
            <p className="mt-2 text-white/70">Warm-up → lock-in → output loops.</p>
          </div>
          <Link href="/os" className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15">
            Back to OS →
          </Link>
        </div>

        <div className="mt-8 rounded-3xl border border-white/15 bg-white/5 p-6 text-sm text-white/70">
          For students and teams:
          <ul className="mt-3 list-disc pl-6">
            <li>Pomodoro variants</li>
            <li>Task breakdown + next action</li>
            <li>Distraction blockers (later)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
