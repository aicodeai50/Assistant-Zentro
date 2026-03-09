"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type MainChoice = "learn" | "build" | "train" | "explore";
type RouteTarget =
  | "university"
  | "academy"
  | "frontier"
  | "arcade"
  | "experiments"
  | "enterprise"
  | "os";

type Msg = {
  role: "robot" | "user";
  text: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const MAIN_CHOICES: Array<{
  key: MainChoice;
  title: string;
  desc: string;
}> = [
  {
    key: "learn",
    title: "Learn",
    desc: "Study inside University Hub or Shynvo Academy.",
  },
  {
    key: "build",
    title: "Build",
    desc: "Create with code, systems, and structured workflows.",
  },
  {
    key: "train",
    title: "Train",
    desc: "Practice through challenges, drills, and progression.",
  },
  {
    key: "explore",
    title: "Explore",
    desc: "Discover simulations, ideas, operations, and experiments.",
  },
];

const GROUP_OPTIONS: Record<
  MainChoice,
  Array<{
    key: RouteTarget;
    title: string;
    desc: string;
    explanation: string;
    href: string;
  }>
> = {
  learn: [
    {
      key: "university",
      title: "University Hub",
      desc: "Structured higher learning by faculty and course.",
      explanation:
        "University Hub is your academic environment for structured higher learning. It is best for serious study, faculty-based knowledge, and guided understanding.",
      href: "/university",
    },
    {
      key: "academy",
      title: "Shynvo Academy",
      desc: "Junior and senior school learning paths.",
      explanation:
        "Shynvo Academy is designed for junior and senior school learners. It focuses on subjects, guided explanations, and patient learning support.",
      href: "/academy",
    },
  ],
  build: [
    {
      key: "frontier",
      title: "Frontier Lab",
      desc: "Build with code, logic, AI modes, and technical systems.",
      explanation:
        "Frontier Lab is your engineering environment. It is the best place to build with code, solve technical problems, and explore structured system thinking.",
      href: "/frontier",
    },
    {
      key: "enterprise",
      title: "Enterprise Suite",
      desc: "Build structured company workflows and coordination systems.",
      explanation:
        "Enterprise Suite is for organizational building. It helps teams structure collaboration, missions, analytics, and coordinated work.",
      href: "/enterprise",
    },
    {
      key: "os",
      title: "Shynvo OS",
      desc: "Operate personal systems, missions, and execution flows.",
      explanation:
        "Shynvo OS is your execution cockpit. It is best for focus, operations, workflows, and personal mission structure.",
      href: "/os",
    },
  ],
  train: [
    {
      key: "arcade",
      title: "Arcade Sim",
      desc: "Train through drills, game loops, and challenge progression.",
      explanation:
        "Arcade Sim turns skill training into challenge mode. It is best for drills, repeated practice, progression, and competitive learning energy.",
      href: "/arcade",
    },
    {
      key: "frontier",
      title: "Frontier Lab",
      desc: "Train technical intelligence through coding and reasoning.",
      explanation:
        "Frontier Lab also works as a technical training ground. It is stronger when your training goal is coding, algorithms, AI behavior, or logic puzzles.",
      href: "/frontier",
    },
  ],
  explore: [
    {
      key: "experiments",
      title: "Experiments",
      desc: "Explore simulations, concepts, and new AI worlds.",
      explanation:
        "Experiments is where new ideas and simulations live. It is best for concept exploration, trying worlds, and interacting with new system experiences.",
      href: "/experiments",
    },
    {
      key: "enterprise",
      title: "Enterprise Suite",
      desc: "Explore business coordination and team systems.",
      explanation:
        "Enterprise Suite is also useful for exploring how structured work, meetings, and business environments operate inside Shynvo.",
      href: "/enterprise",
    },
    {
      key: "os",
      title: "Shynvo OS",
      desc: "Explore operational systems and execution architecture.",
      explanation:
        "Shynvo OS lets you explore how personal execution systems and organized workflows can be structured across missions and operations.",
      href: "/os",
    },
  ],
};

export default function RobotWorldPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "robot",
      text:
        "Welcome to Shynvo Robot World. I can guide you through learning, building, training, or exploration across the Shynvo environments.",
    },
    {
      role: "robot",
      text: "What would you like to do first?",
    },
  ]);

  const [selectedMain, setSelectedMain] = useState<MainChoice | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<RouteTarget | null>(null);

  const options = useMemo(
    () => (selectedMain ? GROUP_OPTIONS[selectedMain] : []),
    [selectedMain]
  );

  function chooseMain(choice: MainChoice) {
    const item = MAIN_CHOICES.find((x) => x.key === choice);
    if (!item) return;

    setSelectedMain(choice);
    setSelectedTarget(null);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: item.title },
      {
        role: "robot",
        text:
          choice === "learn"
            ? "Good choice. I can guide you into a learning environment."
            : choice === "build"
            ? "Good choice. I can guide you into a build-focused environment."
            : choice === "train"
            ? "Good choice. I can guide you into a training environment."
            : "Good choice. I can guide you into an exploration environment.",
      },
      {
        role: "robot",
        text: "Choose one environment below and I will explain it before you enter.",
      },
    ]);
  }

  function explainTarget(target: RouteTarget) {
    const item = options.find((x) => x.key === target);
    if (!item) return;

    setSelectedTarget(target);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: item.title },
      { role: "robot", text: item.explanation },
      { role: "robot", text: "If this feels right, you can enter now or compare with another option." },
    ]);
  }

  function enterTarget() {
    if (!selectedTarget) return;
    const item = options.find((x) => x.key === selectedTarget);
    if (!item) return;

    setMessages((prev) => [
      ...prev,
      { role: "robot", text: `Opening ${item.title}.` },
    ]);

    setTimeout(() => {
      router.push(item.href);
    }, 250);
  }

  function compareAgain() {
    setSelectedTarget(null);
    setMessages((prev) => [
      ...prev,
      {
        role: "robot",
        text: "No problem. Choose another environment and I will explain it before you enter.",
      },
    ]);
  }

  function restartGuide() {
    setSelectedMain(null);
    setSelectedTarget(null);
    setMessages([
      {
        role: "robot",
        text:
          "Welcome to Shynvo Robot World. I can guide you through learning, building, training, or exploration across the Shynvo environments.",
      },
      {
        role: "robot",
        text: "What would you like to do first?",
      },
    ]);
  }

  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_15%_10%,rgba(56,189,248,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_560px_at_82%_18%,rgba(16,185,129,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_100%,rgba(168,85,247,0.08),transparent_55%)]" />
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
        <span className="inline-flex items-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-100">
          Shynvo Robot World
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/70">
            Guided AI Entry
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Shynvo Robot World
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
            This is your guided entry point into Shynvo. The robot can explain environments before
            directing you to the one that best matches your goal.
          </p>
        </div>

        <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
          Multilingual guide: Ready
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Robot Presence
          </div>

          <div className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-black/20">
            <div className="relative aspect-[4/3] w-full bg-black">
              <video
                className="h-full w-full object-cover"
                src="/robot.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
            <div className="text-sm font-semibold text-cyan-100">Guide role</div>
            <div className="mt-2 text-sm leading-6 text-cyan-50/90">
              I explain environments first, then direct users into the right Shynvo world.
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm font-semibold text-white">Current capability</div>
            <div className="mt-2 text-sm leading-6 text-white/65">
              Right now this robot guides users across environments. Next, we connect it to the live
              AI backend so it can answer dynamically in all languages.
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-white">Robot channel</div>
              <div className="text-xs text-white/60">
                Guided onboarding • environment routing • explanation first
              </div>
            </div>

            <button
              type="button"
              onClick={restartGuide}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10"
            >
              Restart
            </button>
          </div>

          <div className="mt-5 h-[420px] overflow-auto rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cx(
                    "max-w-[92%] rounded-2xl border px-4 py-3 text-sm leading-6",
                    msg.role === "user"
                      ? "ml-auto border-white/10 bg-white/10 text-white"
                      : "border-white/10 bg-white/5 text-white/85"
                  )}
                >
                  {msg.text}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {!selectedMain ? (
              <div>
                <div className="text-sm font-semibold text-white">Choose a direction</div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {MAIN_CHOICES.map((choice) => (
                    <button
                      key={choice.key}
                      type="button"
                      onClick={() => chooseMain(choice.key)}
                      className="rounded-2xl border border-white/10 bg-black/20 p-4 text-left transition hover:bg-white/7"
                    >
                      <div className="text-base font-semibold text-white">{choice.title}</div>
                      <div className="mt-1 text-sm leading-6 text-white/65">{choice.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {selectedMain && !selectedTarget ? (
              <div>
                <div className="text-sm font-semibold text-white">Choose an environment</div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {options.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => explainTarget(item.key)}
                      className="rounded-2xl border border-white/10 bg-black/20 p-4 text-left transition hover:bg-white/7"
                    >
                      <div className="text-base font-semibold text-white">{item.title}</div>
                      <div className="mt-1 text-sm leading-6 text-white/65">{item.desc}</div>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={restartGuide}
                  className="mt-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
                >
                  Choose a different direction
                </button>
              </div>
            ) : null}

            {selectedMain && selectedTarget ? (
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={enterTarget}
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
                >
                  Enter environment
                </button>

                <button
                  type="button"
                  onClick={compareAgain}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
                >
                  Compare another option
                </button>

                <button
                  type="button"
                  onClick={restartGuide}
                  className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-100 hover:bg-cyan-400/15"
                >
                  Start over
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
