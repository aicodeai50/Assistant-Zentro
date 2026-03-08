"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type BuildTrack =
  | "website"
  | "chatbot"
  | "dashboard"
  | "automation"
  | "game"
  | "python";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const TRACKS: Record<
  BuildTrack,
  {
    title: string;
    subtitle: string;
    stack: string[];
    steps: string[];
    prompt: string;
  }
> = {
  website: {
    title: "Build a Website",
    subtitle: "Create pages, sections, layouts, and interaction using core web technologies.",
    stack: ["HTML", "CSS", "JavaScript"],
    steps: ["Page structure", "Styling", "Responsive design", "Interaction", "Deploy"],
    prompt: "Example: I want to build a personal portfolio website with a projects section and contact form.",
  },
  chatbot: {
    title: "Build a Chatbot",
    subtitle: "Learn chatbot flow, prompts, APIs, Python basics, and assistant behavior.",
    stack: ["Python", "Prompting", "APIs"],
    steps: ["Bot goal", "Prompt design", "Input/output flow", "API connection", "Deployment"],
    prompt: "Example: I want to build a chatbot that answers student questions and gives revision help.",
  },
  dashboard: {
    title: "Build a Business Tool",
    subtitle: "Design dashboards, admin panels, and internal tools for real company workflows.",
    stack: ["Frontend", "Backend", "Data"],
    steps: ["UI layout", "Data model", "Backend route", "Dashboard cards", "Auth and roles"],
    prompt: "Example: I want to build a company dashboard that tracks missions, tasks, and analytics.",
  },
  automation: {
    title: "Build an Automation Tool",
    subtitle: "Create helper scripts, task flows, and repeatable automation systems.",
    stack: ["Python", "Logic", "Automation"],
    steps: ["Input", "Rules", "Processing", "Output", "Scheduling"],
    prompt: "Example: I want to build a tool that organizes files automatically and sends a report.",
  },
  game: {
    title: "Build a Game",
    subtitle: "Learn game loops, interaction, state, scoring, and player logic.",
    stack: ["JavaScript", "Canvas", "State"],
    steps: ["Game idea", "Player controls", "Game loop", "Scoring", "Win or lose logic"],
    prompt: "Example: I want to build a small browser game with jumping, scoring, and levels.",
  },
  python: {
    title: "Learn Python by Building",
    subtitle: "Use Python to build scripts, tools, bots, and smart beginner-friendly projects.",
    stack: ["Python", "Functions", "Projects"],
    steps: ["Syntax basics", "Functions", "Input/output", "Small project", "Practice tasks"],
    prompt: "Example: I want to learn Python by building small useful projects from beginner level.",
  },
};

export default function CodingArenaPage() {
  const [track, setTrack] = useState<BuildTrack>("website");
  const [idea, setIdea] = useState("");

  const active = useMemo(() => TRACKS[track], [track]);

  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_14%_12%,rgba(132,204,22,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_560px_at_86%_18%,rgba(16,185,129,0.10),transparent_55%)]" />
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
          className="inline-flex items-center rounded-xl border border-lime-400/20 bg-lime-400/10 px-3 py-2 text-sm text-lime-100"
        >
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
        <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          Learn how to build things with code and programming languages. Choose what you want to
          create, then follow the structure needed to build it.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-sm font-semibold text-white">What do you want to build?</div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {(
              ["website", "chatbot", "dashboard", "automation", "game", "python"] as BuildTrack[]
            ).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTrack(item)}
                className={cx(
                  "rounded-2xl border px-4 py-4 text-left transition",
                  track === item
                    ? "border-lime-300/30 bg-lime-400/10 text-white"
                    : "border-white/10 bg-black/20 text-white/80 hover:bg-white/7"
                )}
              >
                <div className="text-sm font-semibold">{TRACKS[item].title}</div>
                <div className="mt-1 text-sm text-white/60">{TRACKS[item].subtitle}</div>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
            <div className="text-sm font-semibold text-white">Project idea</div>
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder={active.prompt}
              rows={8}
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
            />
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
              >
                Start build path
              </button>
              <button
                type="button"
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
              >
                Open practice
              </button>
              <button
                type="button"
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
              >
                Open quiz
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-sm font-semibold text-white">{active.title}</div>
          <div className="mt-2 text-sm leading-6 text-white/70">{active.subtitle}</div>

          <div className="mt-5">
            <div className="text-sm font-semibold text-white">Main stack</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {active.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/75"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-sm font-semibold text-white">Suggested path</div>
            <div className="mt-3 space-y-3">
              {active.steps.map((step, index) => (
                <div
                  key={step}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80"
                >
                  Step {index + 1}: {step}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-lime-400/20 bg-lime-400/10 p-4">
            <div className="text-sm font-semibold text-lime-100">Frontier principle</div>
            <div className="mt-2 text-sm leading-6 text-lime-50/90">
              Users do not only learn syntax here. They learn how to use code to build real things.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
