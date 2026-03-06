import Link from "next/link";

export default function EnterpriseAnalyticsPage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/enterprise" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Enterprise Suite
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Enterprise Suite
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">Analytics</h1>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        Analytics gives leaders visibility into progress, bottlenecks, workload, mission health, and team performance.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Link href="/enterprise/analytics/progress" className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/7">
          <div className="text-2xl font-semibold text-white">Mission Progress</div>
          <div className="mt-3 text-sm text-white/70">Healthy</div>
          <div className="mt-5 text-sm font-semibold text-white/90">Open detail →</div>
        </Link>

        <Link href="/enterprise/analytics/workload" className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/7">
          <div className="text-2xl font-semibold text-white">Workload Balance</div>
          <div className="mt-3 text-sm text-white/70">Moderate</div>
          <div className="mt-5 text-sm font-semibold text-white/90">Open detail →</div>
        </Link>

        <Link href="/enterprise/analytics/output" className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/7">
          <div className="text-2xl font-semibold text-white">Team Output</div>
          <div className="mt-3 text-sm text-white/70">Improving</div>
          <div className="mt-5 text-sm font-semibold text-white/90">Open detail →</div>
        </Link>
      </div>
    </section>
  );
}
