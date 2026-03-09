"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
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

const STATUS_LINES = [
  "Guiding across Shynvo environments",
  "Ready to help you begin",
  "Online for learning, building, training, and exploration",
  "Preparing your next path",
];

const INITIAL_MESSAGES: Msg[] = [
  {
    role: "robot",
    text:
      "Welcome to Shynvo Robot World. I can guide you through learning, building, training, or exploration across the Shynvo environments.",
  },
  {
    role: "robot",
    text: "What would you like to do first?",
  },
];

function TypingDots() {
  return (
    <div className="inline-flex items-center gap-1">
      <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.2s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.1s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300" />
    </div>
  );
}

function getRobotReply(input: string): string {
  const text = input.toLowerCase();

  if (text.includes("learn") || text.includes("study") || text.includes("school") || text.includes("university")) {
    return "For learning, I recommend University Hub for higher study or Shynvo Academy for junior and senior school learning.";
  }

  if (text.includes("build") || text.includes("code") || text.includes("program") || text.includes("app")) {
    return "For building, Frontier Lab is the strongest place to start. It focuses on code, logic, and technical systems.";
  }

  if (text.includes("train") || text.includes("practice") || text.includes("challenge") || text.includes("game")) {
    return "For training, Arcade Sim is the best place to begin. It turns skill-building into challenge mode.";
  }

  if (text.includes("explore") || text.includes("experiment") || text.includes("idea")) {
    return "For exploration, Experiments is a strong starting point. It is designed for trying concepts, systems, and new worlds.";
  }

  if (text.includes("enterprise") || text.includes("company") || text.includes("team")) {
    return "Enterprise Suite is best for companies, teams, coordination, analytics, and structured business workflows.";
  }

  if (text.includes("os") || text.includes("focus") || text.includes("workflow") || text.includes("mission")) {
    return "Shynvo OS is best for focus, workflow structure, missions, and personal execution systems.";
  }

  return "I can help you choose where to begin. You can ask about learning, building, training, exploration, coding, school, university, teams, or experiments.";
}

export default function RobotWorldPage() {
  const router = useRouter();
  const listRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<Msg[]>(INITIAL_MESSAGES);
  const [selectedMain, setSelectedMain] = useState<MainChoice | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<RouteTarget | null>(null);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [input, setInput] = useState("");

  const options = useMemo(
    () => (selectedMain ? GROUP_OPTIONS[selectedMain] : []),
    [selectedMain]
  );

  useEffect(() => {
    const id = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUS_LINES.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isThinking]);

  function pushRobotMessages(next: Msg[]) {
    setIsThinking(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, ...next]);
      setIsThinking(false);
    }, 380);
  }

  function chooseMain(choice: MainChoice) {
    const item = MAIN_CHOICES.find((x) => x.key === choice);
    if (!item) return;

    setSelectedMain(choice);
    setSelectedTarget(null);

    pushRobotMessages([
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

    pushRobotMessages([
      { role: "user", text: item.title },
      { role: "robot", text: item.explanation },
      {
        role: "robot",
        text: "If this feels right, you can enter now or compare with another option.",
      },
    ]);
  }

  function enterTarget() {
    if (!selectedTarget) return;
    const item = options.find((x) => x.key === selectedTarget);
    if (!item) return;

    pushRobotMessages([{ role: "robot", text: `Opening ${item.title}.` }]);

    setTimeout(() => {
      router.push(item.href);
    }, 650);
  }

  function compareAgain() {
    setSelectedTarget(null);
    pushRobotMessages([
      {
        role: "robot",
        text: "No problem. Choose another environment and I will explain it before you enter.",
      },
    ]);
  }

  function restartGuide() {
    setSelectedMain(null);
    setSelectedTarget(null);
    setIsThinking(false);
    setInput("");
    setMessages(INITIAL_MESSAGES);
  }

  function sendMessage() {
    const text = input.trim();
    if (!text || isThinking) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");

    const reply = getRobotReply(text);

    setIsThinking(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "robot", text: reply }]);
      setIsThinking(false);
    }, 420);
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
            Meet the Shynvo Robot
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Shynvo Robot World
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
            Meet the Shynvo Robot — your guide through the Shynvo platform.
          </p>
        </div>

        <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
          I can speak multiple languages
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              Robot Presence
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-100">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
              Online
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-black/20">
            <div className="relative aspect-[4/3] w-full bg-black">
              <div className="pointer-events-none absolute inset-0 z-10 animate-pulse bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.18),transparent_42%)]" />
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
            <div className="text-sm font-semibold text-cyan-100">How I help</div>
            <div className="mt-2 text-sm leading-6 text-cyan-50/90">
              I can guide you through the environments and help you decide where to begin.
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm font-semibold text-white">What you can do</div>
            <div className="mt-2 text-sm leading-6 text-white/65">
              Ask questions, explore the environments, or start your first activity.
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Live status
            </div>
            <div className="mt-2 text-sm text-white/80">{STATUS_LINES[statusIndex]}</div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-white">Robot channel</div>
              <div className="text-xs text-white/60">
                Guided onboarding • environment navigation • smart assistance
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

          <div
            ref={listRef}
            className="mt-5 h-[420px] overflow-auto rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <div className="space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cx(
                    "max-w-[92%] rounded-2xl border px-4 py-3 text-sm leading-6 transition duration-300",
                    msg.role === "user"
                      ? "ml-auto border-white/10 bg-white/10 text-white"
                      : "border-white/10 bg-white/5 text-white/85"
                  )}
                >
                  {msg.text}
                </div>
              ))}

              {isThinking ? (
                <div className="max-w-[92%] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white/85">
                  <TypingDots />
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Ask Shynvo Robot anything..."
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
            />

            <button
              type="button"
              onClick={sendMessage}
              disabled={isThinking || !input.trim()}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
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
                      className="rounded-2xl border border-white/10 bg-black/20 p-4 text-left transition hover:bg-white/7 hover:shadow-[0_0_0_1px_rgba(56,189,248,0.15)]"
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
                      className="rounded-2xl border border-white/10 bg-black/20 p-4 text-left transition hover:bg-white/7 hover:shadow-[0_0_0_1px_rgba(56,189,248,0.15)]"
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
