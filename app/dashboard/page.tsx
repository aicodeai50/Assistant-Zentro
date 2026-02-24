import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14 text-white">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-neutral-400">
        Choose your workspace. These pages will later connect to your backend
        APIs.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card
          title="Student Dashboard"
          desc="Quizzes, flashcards, study plan."
          href="/dashboard/student"
        />
        <Card
          title="Pro Dashboard"
          desc="Skill-gap analysis, interview prep, resume readiness."
          href="/dashboard/pro"
        />
        <Card
          title="Company Dashboard"
          desc="Team skill matrix, upskilling plans, analytics."
          href="/dashboard/company"
        />
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/demo"
          className="rounded-xl border border-neutral-800 bg-black px-4 py-2 text-neutral-200 hover:border-neutral-600"
        >
          Demo
        </Link>
        <Link
          href="/pricing"
          className="rounded-xl border border-neutral-800 bg-black px-4 py-2 text-neutral-200 hover:border-neutral-600"
        >
          Pricing
        </Link>
        <Link
          href="/robot"
          className="rounded-xl border border-neutral-800 bg-black px-4 py-2 text-neutral-200 hover:border-neutral-600"
        >
          Robot
        </Link>
        <Link
          href="/"
          className="rounded-xl border border-neutral-800 bg-black px-4 py-2 text-neutral-200 hover:border-neutral-600"
        >
          ← Home
        </Link>
      </div>
    </main>
  );
}

function Card({
  title,
  desc,
  href,
}: {
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6 hover:border-neutral-600"
    >
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-2 text-sm text-neutral-400">{desc}</div>
      <div className="mt-4 text-sm text-neutral-300 underline">Open →</div>
    </Link>
  );
}