import Link from "next/link";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const LAB_SECTIONS = [
  {
    key: "coding",
    title: "Coding Arena",
    desc: "Practice real coding problems and engineering logic.",
    href: "/frontier/coding",
    tags: ["Programming", "Functions", "Logic"],
  },
  {
    key: "algorithms",
    title: "Algorithm Challenges",
    desc: "Solve engineering-level algorithm and system puzzles.",
    href: "/frontier/algorithms",
    tags: ["Graphs", "Optimization", "Systems"],
  },
  {
    key: "ai-bots",
    title: "AI Bot Lab",
    desc: "Experiment with simple AI logic and automated decision systems.",
    href: "/frontier/ai-bots",
    tags: ["AI", "Automation", "Logic"],
  },
  {
    key: "puzzles",
    title: "Logic Puzzles",
    desc: "Hard technical puzzles designed to train engineering thinking.",
    href: "/frontier/puzzles",
    tags: ["Reasoning", "Systems", "Engineering"],
  },
];

export default function FrontierLabPage() {
  return (
    <section className="relative py-10 sm:py-14">

      {/* background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_15%_10%,rgba(34,197,94,0.15),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_560px_at_85%_20%,rgba(16,185,129,0.12),transparent_55%)]" />
      </div>

      {/* navigation */}
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10"
        >
          ← Back
        </Link>

        <Link
          href="/"
          className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10"
        >
          Home
        </Link>

        <span className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200">
          Frontier Lab
        </span>
      </div>

      {/* title */}
      <div className="mt-6">
        <div className="text-xs uppercase tracking-[0.18em] text-emerald-200/70 font-semibold">
          Engineering District
        </div>

        <h1 className="mt-2 text-4xl font-semibold text-white">
          Frontier Lab
        </h1>

        <p className="mt-3 max-w-3xl text-white/70">
          Frontier Lab is where engineering thinking happens. Practice coding,
          algorithms, AI logic, and system puzzles designed to train deep
          technical intelligence.
        </p>
      </div>

      {/* cards */}
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {LAB_SECTIONS.map((lab) => (
          <Link
            key={lab.key}
            href={lab.href}
            className={cx(
              "rounded-3xl border p-5 transition",
              "border-white/10 bg-white/5 hover:bg-white/10"
            )}
          >
            <div className="text-lg font-semibold text-white">{lab.title}</div>

            <p className="mt-2 text-sm text-white/70">{lab.desc}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {lab.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 text-sm font-semibold text-emerald-200">
              Enter →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
