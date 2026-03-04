import Link from "next/link";

const item =
  "rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/7 transition";

export default function DocsPage() {
  return (
    <div className="py-14">
      <h1 className="text-4xl font-semibold">Docs</h1>
      <p className="mt-3 text-white/70">
        Documentation is being prepared. For now, explore the platform environments below.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link className={item} href="/university">
          <div className="text-lg font-semibold">University Hub</div>
          <div className="mt-1 text-sm text-white/70">Faculties, courses, exams, study systems.</div>
        </Link>

        <Link className={item} href="/os">
          <div className="text-lg font-semibold">Shynvo OS</div>
          <div className="mt-1 text-sm text-white/70">Missions, focus loops, orchestration.</div>
        </Link>

        <Link className={item} href="/experiments">
          <div className="text-lg font-semibold">Experiments</div>
          <div className="mt-1 text-sm text-white/70">AI worlds for debate, simulation, concepts.</div>
        </Link>

        <div className={item}>
          <div className="text-lg font-semibold">Enterprise Suite</div>
          <div className="mt-1 text-sm text-white/70">Teams, analytics, admin tools. (Planned)</div>
        </div>

        <div className={item}>
          <div className="text-lg font-semibold">Frontier Lab</div>
          <div className="mt-1 text-sm text-white/70">Decision drills, crisis simulation. (Planned)</div>
        </div>

        <div className={item}>
          <div className="text-lg font-semibold">Arcade Sim</div>
          <div className="mt-1 text-sm text-white/70">Gamified drills, interview sims. (Planned)</div>
        </div>

        <Link className={item} href="/assistant">
          <div className="text-lg font-semibold">Robot assistant</div>
          <div className="mt-1 text-sm text-white/70">Keep this in Docs (your request).</div>
        </Link>

        <Link className={item} href="/pricing">
          <div className="text-lg font-semibold">Pricing</div>
          <div className="mt-1 text-sm text-white/70">7-day free trial → upgrade after.</div>
        </Link>
      </div>
    </div>
  );
}