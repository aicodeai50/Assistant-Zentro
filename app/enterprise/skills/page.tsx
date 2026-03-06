import Link from "next/link";

export default function EnterpriseSkillsPage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/enterprise" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Enterprise Suite
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Enterprise Suite
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        Skill Matrix
      </h1>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        Skill Matrix helps organizations understand team strengths, growth paths,
        capability gaps, and hiring priorities.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">Frontend Capability</div>
          <div className="mt-2 text-sm text-white/70">Strong</div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">AI Capability</div>
          <div className="mt-2 text-sm text-white/70">Growing</div>
        </div>
      </div>
    </section>
  );
}
