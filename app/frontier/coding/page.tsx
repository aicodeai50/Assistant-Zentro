"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type BuildType =
  | "website"
  | "chatbot"
  | "business"
  | "automation"
  | "game"
  | "python";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const BUILD_OPTIONS: Record<
  BuildType,
  {
    title: string;
    desc: string;
    stack: string[];
    steps: string[];
    starterPrompt: string;
  }
> = {
  website: {
    title: "Build a Website",
    desc: "Create pages, sections, layouts, and interaction using core web technologies.",
    stack: ["HTML", "CSS", "JavaScript"],
    steps: [
      "Step 1: Plan pages and structure",
      "Step 2: Build layout with HTML",
      "Step 3: Style with CSS",
      "Step 4: Add interaction",
      "Step 5: Test and deploy",
    ],
    starterPrompt: "I want to build a personal portfolio website with a projects section and contact form.",
  },
  chatbot: {
    title: "Build a Chatbot",
    desc: "Learn chatbot flow, prompts, APIs, Python basics, and assistant behaviour.",
    stack: ["Python", "Prompts", "APIs"],
    steps: [
      "Step 1: Define chatbot purpose",
      "Step 2: Design prompt flow",
      "Step 3: Connect an API or model",
      "Step 4: Handle user messages",
      "Step 5: Improve responses",
    ],
    starterPrompt: "I want to build a chatbot that helps students revise for science exams.",
  },
  business: {
    title: "Build a Business Tool",
    desc: "Design dashboards, admin panels, and internal tools for real company workflows.",
    stack: ["React", "Database", "Auth"],
    steps: [
      "Step 1: Define business workflow",
      "Step 2: Choose data model",
      "Step 3: Build dashboard UI",
      "Step 4: Add actions and permissions",
      "Step 5: Test company usage",
    ],
    starterPrompt: "I want to build an internal dashboard for tracking missions and team progress.",
  },
  automation: {
    title: "Build an Automation Tool",
    desc: "Create helper scripts, task flows, and repeatable automation systems.",
    stack: ["Python", "Scripts", "Workflow"],
    steps: [
      "Step 1: Identify repeat task",
      "Step 2: Define input and output",
      "Step 3: Write automation script",
      "Step 4: Add error handling",
      "Step 5: Schedule or trigger it",
    ],
    starterPrompt: "I want to automate renaming files and sorting them into folders.",
  },
  game: {
    title: "Build a Game",
    desc: "Learn game loops, interaction, state, scoring, and player logic.",
    stack: ["JavaScript", "Canvas", "Game Logic"],
    steps: [
      "Step 1: Define the game idea",
      "Step 2: Build player controls",
      "Step 3: Add game state and scoring",
      "Step 4: Add enemies or obstacles",
      "Step 5: Polish and test gameplay",
    ],
    starterPrompt: "I want to build a simple browser game where the player avoids obstacles and scores points.",
  },
  python: {
    title: "Learn Python by Building",
    desc: "Use Python to build scripts, tools, bots, and smart beginner-friendly projects.",
    stack: ["Python", "Functions", "Projects"],
    steps: [
      "Step 1: Learn variables and input",
      "Step 2: Use conditions and loops",
      "Step 3: Write functions",
      "Step 4: Build a small project",
      "Step 5: Improve and refactor",
    ],
    starterPrompt: "I want to learn Python by building a simple expense tracker.",
  },
};

export default function FrontierCodingPage() {
  const [buildType, setBuildType] = useState<BuildType>("website");
  const [idea, setIdea] = useState(BUILD_OPTIONS.website.starterPrompt);
  const [generated, setGenerated] = useState(false);

  const active = useMemo(() => BUILD_OPTIONS[buildType], [buildType]);

  function handleSelect(type: BuildType) {
    setBuildType(type);
    setIdea(BUILD_OPTIONS[type].starterPrompt);
    setGenerated(false);
  }

  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_480px_at_18%_10%,rgba(132,204,22,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_82%_16%,rgba(34,197,94,0.12),transparent_58%)]" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link href="/frontier" className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white">
          ← Back
        </Link>
        <Link href="/" className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white">
          Home
        </Link>
        <Link href="/frontier" className="inline-flex items-center rounded-xl border border-lime-400/20 bg-lime-400/10 px-3 py-2 text-sm text-lime-100 hover:bg-lime-400/15">
          Frontier Lab
        </Link>
      </div>

      <div className="mt-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-200/70">
          Frontier Lab
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Coding Arena
        </h1>
        <p className="mt-3 max-w-5xl text-sm leading-6 text-white/70 sm:text-base">
          Learn how to build things with code and programming languages. Choose what you want to
          create, then follow the structure needed to build it.
        </p>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-sm font-semibold text-white">What do you want to build?</div>

          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {(Object.keys(BUILD_OPTIONS) as BuildType[]).map((type) => {
              const item = BUILD_OPTIONS[type];
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleSelect(type)}
                  className={cx(
                    "rounded-2xl border p-4 text-left transition",
                    buildType === type
                      ? "border-lime-300/30 bg-lime-400/10 text-white"
                      : "border-white/10 bg-black/20 text-white/80 hover:bg-white/7"
                  )}
                >
                  <div className="text-base font-semibold">{item.title}</div>
                  <div className="mt-2 text-sm leading-6 text-white/70">{item.desc}</div>
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            <label className="text-sm font-semibold text-white">Project idea</label>
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Describe what you want to build..."
              rows={6}
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setGenerated(true)}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
            >
              Generate build plan
            </button>
            <button
              type="button"
              onClick={() => {
                setIdea(active.starterPrompt);
                setGenerated(false);
              }}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
            >
              Reset example
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-lg font-semibold text-white">{active.title}</div>
          <div className="mt-2 text-sm leading-6 text-white/70">{active.desc}</div>

          <div className="mt-5 text-sm font-semibold text-white">Main stack</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {active.stack.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/75"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 text-sm font-semibold text-white">Suggested path</div>
          <div className="mt-3 space-y-3">
            {active.steps.map((step) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                {step}
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-lime-400/20 bg-lime-400/10 p-4 text-sm text-lime-100">
            {generated
              ? `Build plan ready: start with "${idea || active.starterPrompt}" and follow the path shown in this panel.`
              : "Choose a build type, write your idea, then click Generate build plan."}
          </div>
        </div>
      </div>
    </section>
  );
}
