import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs tracking-widest text-white/60">SHYNVO OS</div>
            <h1 className="mt-2 text-3xl font-semibold">Robots</h1>
            <p className="mt-2 text-white/70">Hangar: assistants + workflows.</p>
          </div>
          <Link href="/os" className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15">
            Back to OS →
          </Link>
        </div>

        <div className="mt-8 rounded-3xl border border-white/15 bg-white/5 p-6 text-sm text-white/70">
          This is where you manage assistants:
          <ul className="mt-3 list-disc pl-6">
            <li>Study Tutor</li>
            <li>Exam Coach</li>
            <li>Company Upskill Assistant</li>
          </ul>
          <div className="mt-4 text-white/60">
            (Your cinematic robot stays on its own page: <span className="underline">/robot</span>)
          </div>
        </div>
      </div>
    </div>
  );
}
