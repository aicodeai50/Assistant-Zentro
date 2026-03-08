import Link from "next/link";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const GAME_AREAS = [
  {
    title: "Drill Arena",
    desc: "Fast challenge rounds for focus, reflex, logic, and performance training.",
    href: "/arcade/drills",
    tags: ["Drills", "Speed", "Practice"],
  },
  {
    title: "Interview Quest",
    desc: "Gamified interview and oral-response practice with progress-style challenge flow.",
    href: "/arcade/interviews",
    tags: ["Interview", "Questions", "Progress"],
  },
  {
    title: "Score Chamber",
    desc: "Track performance, streaks, levels, and challenge scores across Arcade Sim.",
    href: "/arcade/scoring",
    tags: ["Scores", "Levels", "Ranking"],
  },
];

export default function ArcadeSimPage() {
  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_15%_10%,rgba(244,114,182,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_560px_at_85%_18%,rgba(168,85,247,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_100%,rgba(59,130,246,0.08),transparent_55%)]" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
        >
          ← Back
        </Link>
        <Link
          href="/"
          className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
        >
          Home
        </Link>
        <span className="inline-flex items-center rounded-xl border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-2 text-sm text-fuchsia-100">
          Arcade Sim
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-200/70">
            Competitive Skill Arena
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Arcade Sim
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
            Arcade Sim turns practice into challenge mode. Users can train skills through drills,
            interview quests, score systems, and competitive progress loops.
          </p>
        </div>

        <div className="rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-4 py-2 text-sm text-fuchsia-100">
          Game Layer: Active
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {GAME_AREAS.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={cx(
              "group rounded-3xl border p-5 transition",
              "border-white/10 bg-white/5 hover:bg-white/7 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
            )}
          >
            <div className="text-lg font-semibold text-white">{item.title}</div>
            <div className="mt-3 text-sm leading-6 text-white/70">{item.desc}</div>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 text-sm font-semibold text-fuchsia-200 group-hover:text-fuchsia-100">
              Enter →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
