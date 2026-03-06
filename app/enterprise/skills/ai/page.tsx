import Link from "next/link";

export default function EnterpriseAISkillPage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/enterprise/skills" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Skill Matrix
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Capability</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">AI Capability</h1>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/75">
        Growing capability in AI workflows, automation logic, and practical reasoning systems.
      </div>
    </section>
  );
}
