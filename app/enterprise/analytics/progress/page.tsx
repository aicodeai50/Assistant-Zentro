import Link from "next/link";

export default function EnterpriseAnalyticsProgressPage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/enterprise/analytics" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Analytics
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Analytics</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">Mission Progress</h1>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/75">
        Active missions are progressing on schedule with acceptable delivery confidence.
      </div>
    </section>
  );
}
