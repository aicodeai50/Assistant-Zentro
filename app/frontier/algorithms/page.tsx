"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ChallengeKey = "paths" | "sorting" | "scheduling" | "graphs";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const CHALLENGES: Record<
  ChallengeKey,
  {
    title: string;
    desc: string;
    hint: string;
    route: string;
  }
> = {
  paths: {
    title: "Shortest Path Thinking",
    desc: "Find the fastest route through weighted choices and connected systems.",
    hint: "Track the cheapest known path at every step.",
    route: "Model nodes, compare candidate paths, update best cost, then finalize the optimal route.",
  },
  sorting: {
    title: "Sorting Strategy",
    desc: "Choose the smartest way to order data based on scale and efficiency.",
    hint: "Think about time complexity, memory, and stability.",
    route: "Understand small-case sorting first, then compare scaling behaviour under heavier data.",
  },
  scheduling: {
    title: "Task Scheduling",
    desc: "Arrange dependent tasks in the best execution order.",
    hint: "Look for prerequisites and blockers before sequencing work.",
    route: "Map dependencies, remove blocked tasks, then build the valid execution order.",
  },
  graphs: {
    title: "Graph Structure",
    desc: "Explore connections, traversal logic, and system relationships.",
    hint: "Use BFS for breadth and DFS for depth exploration.",
    route: "Represent the system as a graph, then traverse based on the question type.",
  },
};

export default function AlgorithmChallengesPage() {
  const [active, setActive] = useState<ChallengeKey>("paths");
  const data = useMemo(() => CHALLENGES[active], [active]);

  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_15%_10%,rgba(132,204,22,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_560px_at_82%_18%,rgba(34,197,94,0.10),transparent_55%)]" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/frontier"
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
        <Link
          href="/frontier"
          className="inline-flex items-center rounded-xl border border-lime-400/20 bg-lime-400/10 px-3 py-2 text-sm text-lime-100 hover:bg-lime-400/15"
        >
          Frontier Lab
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-200/70">
            Frontier Lab
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Algorithm Challenges
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
            Solve structured engineering problems. Choose a challenge type and study the reasoning
            path behind it.
          </p>
        </div>

        <div className="rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-sm text-lime-100">
          Challenge Board: Active
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-sm font-semibold text-white">Choose challenge type</div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(Object.keys(CHALLENGES) as ChallengeKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setActive(key)}
                className={cx(
                  "rounded-2xl border p-4 text-left transition",
                  active === key
                    ? "border-lime-300/30 bg-lime-400/10 text-white"
                    : "border-white/10 bg-black/20 text-white/80 hover:bg-white/7"
                )}
              >
                <div className="text-base font-semibold">{CHALLENGES[key].title}</div>
                <div className="mt-2 text-sm text-white/60">{CHALLENGES[key].desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-sm font-semibold text-white">Selected challenge</div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xl font-semibold text-white">{data.title}</div>
            <div className="mt-2 text-sm leading-6 text-white/70">{data.desc}</div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm font-semibold text-white">Hint</div>
            <div className="mt-2 text-sm text-white/70">{data.hint}</div>
          </div>

          <div className="mt-4 rounded-2xl border border-lime-400/20 bg-lime-400/5 p-4">
            <div className="text-sm font-semibold text-white">Reasoning route</div>
            <div className="mt-2 text-sm leading-6 text-white/80">{data.route}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
