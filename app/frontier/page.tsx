import Link from "next/link";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const LABS = [
  {
    href: "/frontier/coding",
    title: "Coding Arena",
    desc: "Learn how to build real things with code and programming languages.",
    tags: ["Programming", "Projects", "Build"],
  },
  {
    href: "/frontier/algorithms",
    title: "Algorithm Challenges",
    desc: "Study structured engineering problems and understand the reasoning path.",
    tags: ["Graphs", "Logic", "Systems"],
  },
  {
    href: "/frontier/ai-bots",
    title: "AI Bot Lab",
    desc: "Test how AI behaviour changes by purpose, mode, and prompt structure.",
    tags: ["AI", "Modes", "Prompting"],
  },
  {
    href: "/frontier/puzzles",
    title: "Logic Puzzles",
    desc: "Train deep reasoning through interactive puzzle challenges and hints.",
    tags: ["Puzzles", "Hints", "Practice"],
  },
];

export default function FrontierLabPage() {
  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_480px_at_18%_10%,rgba(132,204,22,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_82%_16%,rgba(34,197,94,0.12),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_560px_at_50%_100%,rgba(59,130,246,0.07),transparent_60%)]" />
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
        <span className="inline-flex items-center rounded-xl border border-lime-400/20 bg-lime-400/10 px-3 py-2 text-sm text-lime-100">
          Frontier Lab
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-200/70">
            Frontier Lab
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Engineering District
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
            Frontier Lab is the coding and technical reasoning environment of Shynvo. It helps users
            learn how to build things, understand programming logic, practice algorithm thinking,
            test AI modes, and sharpen engineering problem solving.
          </p>
        </div>

        <div className="rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-sm text-lime-100">
          Builder Mode: Ready
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {LABS.map((lab) => (
          <Link
            key={lab.href}
            href={lab.href}
            className={cx(
              "group rounded-3xl border p-5 transition",
              "border-white/10 bg-white/5 hover:bg-white/7 hover:shadow-[0_0_0_1px_rgba(163,230,53,0.22)]"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-lg font-semibold text-white">{lab.title}</div>
              <span className="rounded-full border border-lime-400/20 bg-lime-400/10 px-2.5 py-1 text-[11px] text-lime-100">
                Active
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-white/70">{lab.desc}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {lab.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 text-sm font-semibold text-lime-200 group-hover:text-lime-100">
              Enter →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
