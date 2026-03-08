import Link from "next/link";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const BUILD_PATHS = [
  {
    key: "website",
    title: "Website Lab",
    desc: "Learn HTML, CSS, JavaScript, layouts, components, and deployment by building real web pages.",
    href: "/frontier/coding",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    key: "chatbot",
    title: "Chatbot Lab",
    desc: "Learn how chatbots work, connect prompts, APIs, and logic, and build practical assistant systems.",
    href: "/frontier/ai-bots",
    tags: ["Prompts", "APIs", "AI Logic"],
  },
  {
    key: "game",
    title: "Game Lab",
    desc: "Build interactive games, learn gameplay logic, state, scoring, and structure through fun projects.",
    href: "/frontier/puzzles",
    tags: ["Game Logic", "State", "Interaction"],
  },
  {
    key: "automation",
    title: "Automation Lab",
    desc: "Create scripts, workflows, helper tools, and repeatable systems that reduce manual work.",
    href: "/frontier/algorithms",
    tags: ["Scripts", "Workflows", "Systems"],
  },
  {
    key: "ai-builder",
    title: "AI Builder Lab",
    desc: "Understand how to build with modern AI tools, decision logic, automation agents, and intelligent systems.",
    href: "/frontier/ai-bots",
    tags: ["AI", "Agents", "Automation"],
  },
  {
    key: "business-tools",
    title: "Business System Lab",
    desc: "Learn how to build dashboards, internal tools, portals, and structured company systems.",
    href: "/frontier/coding",
    tags: ["Dashboards", "Tools", "Platforms"],
  },
];

const ENGINEERING_TRACKS = [
  {
    title: "Coding Arena",
    desc: "Practice real coding problems and engineering logic from beginner to advanced level.",
    href: "/frontier/coding",
    tags: ["Programming", "Functions", "Projects"],
  },
  {
    title: "Algorithm Challenges",
    desc: "Solve optimization, graph, system, and reasoning problems designed for deeper technical growth.",
    href: "/frontier/algorithms",
    tags: ["Graphs", "Optimization", "Systems"],
  },
  {
    title: "AI Bot Lab",
    desc: "Experiment with prompts, behavior design, AI logic, and simple agent-style workflows.",
    href: "/frontier/ai-bots",
    tags: ["AI", "Logic", "Agents"],
  },
  {
    title: "Logic Puzzles",
    desc: "Train problem-solving, technical reasoning, and engineering-style thinking through structured puzzles.",
    href: "/frontier/puzzles",
    tags: ["Reasoning", "Puzzles", "Thinking"],
  },
];

const LEARNING_LEVELS = [
  ["Beginner", "Start from zero and learn step by step."],
  ["Intermediate", "Build with confidence and understand structure."],
  ["Advanced", "Tackle harder systems, optimization, and architecture."],
  ["Pro", "Solve deep technical challenges and build serious products."],
];

export default function FrontierLabPage() {
  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_14%_12%,rgba(132,204,22,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_540px_at_86%_18%,rgba(16,185,129,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(950px_520px_at_50%_100%,rgba(34,197,94,0.08),transparent_55%)]" />
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
            Engineering District
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            What do you want to build today?
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
            Frontier Lab teaches coding by helping users build real things. Choose a project path,
            enter the right lab, learn the required skills, and practice from beginner to pro level.
          </p>
        </div>

        <div className="rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-sm text-lime-100">
          Coding Layer: Active
        </div>
      </div>

      <div className="mt-10">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
          Build Paths
        </div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Learn code through real outcomes
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-white/70">
          Instead of learning random syntax first, users can begin from what they actually want to create.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {BUILD_PATHS.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={cx(
              "group rounded-3xl border p-5 transition",
              "border-white/10 bg-white/5 hover:bg-white/7 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
            )}
          >
            <div className="text-lg font-semibold text-white">{item.title}</div>
            <p className="mt-3 text-sm leading-6 text-white/70">{item.desc}</p>

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

            <div className="mt-5 text-sm font-semibold text-lime-200 group-hover:text-lime-100">
              Open path →
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Core Tracks
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            Deep engineering practice
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">
            These are the technical tracks inside Frontier Lab for users who want stronger coding,
            logic, AI, and systems practice.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {ENGINEERING_TRACKS.map((track) => (
              <Link
                key={track.title}
                href={track.href}
                className="rounded-3xl border border-white/10 bg-black/20 p-5 transition hover:bg-white/7"
              >
                <div className="text-base font-semibold text-white">{track.title}</div>
                <div className="mt-2 text-sm leading-6 text-white/70">{track.desc}</div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {track.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 text-sm font-semibold text-lime-200">Enter →</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Learning Levels
          </div>

          <div className="mt-4 space-y-4">
            {LEARNING_LEVELS.map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-sm font-semibold text-white">{title}</div>
                <div className="mt-1 text-sm text-white/60">{desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-lime-400/20 bg-lime-400/10 p-4">
            <div className="text-sm font-semibold text-lime-100">Purpose</div>
            <div className="mt-2 text-sm leading-6 text-lime-50/90">
              Frontier Lab is where users learn how to build websites, chatbots, games, AI tools,
              automation systems, and software projects with real code and structured guidance.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
