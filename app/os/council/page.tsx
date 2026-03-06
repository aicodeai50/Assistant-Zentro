import Link from "next/link";

export default function OSCouncilPage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/os" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Orbital Nexus
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Shynvo OS</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">AI Council</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        AI Council is the decision chamber of Shynvo OS. It is used for multi-perspective reasoning on important academic, project, and strategic choices.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Link href="/os/council/input" className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/7 transition">
          <div className="text-lg font-semibold text-white">Decision Input</div>
          <div className="mt-3 text-sm text-white/70">Example: Should I focus on exams first or product work first?</div>
        </Link>

        <Link href="/os/council/output" className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/7 transition">
          <div className="text-lg font-semibold text-white">Council Output</div>
          <div className="mt-3 text-sm text-white/70">Multi-angle analysis from specialized reasoning perspectives.</div>
        </Link>
      </div>
    </section>
  );
}
