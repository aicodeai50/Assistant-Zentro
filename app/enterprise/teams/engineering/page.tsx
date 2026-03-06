import Link from "next/link";

export default function EngineeringTeamPage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/enterprise/teams" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Teams
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Team</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">Engineering</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">
        Engineering owns system architecture, shipping velocity, reliability, and technical execution.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold">Core Role</div>
          <div className="mt-2 text-sm text-white/70">Build, maintain, and improve the product stack.</div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold">Priority</div>
          <div className="mt-2 text-sm text-white/70">Reliability, speed, and release quality.</div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold">Coordination</div>
          <div className="mt-2 text-sm text-white/70">Works closely with Product and AI Strategy.</div>
        </div>
      </div>
    </section>
  );
}
