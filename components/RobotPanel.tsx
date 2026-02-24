"use client";

import { useMemo, useState } from "react";
import type { RobotMode } from "@/components/RobotModePicker";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
const SH_API_KEY = process.env.NEXT_PUBLIC_SH_API_KEY || "";

type Msg = { role: "user" | "assistant"; content: string };

async function callPublicChat(messages: Msg[]) {
  const res = await fetch(`${API_BASE}/api/public/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-sh-api-key": SH_API_KEY,
    },
    body: JSON.stringify({ messages }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || data?.details || "Request failed");
  return data?.reply || "";
}

export default function RobotPanel({
  enabled,
  mode,
}: {
  enabled: boolean;
  mode: RobotMode;
}) {
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "I’m your Shynvo Robot. Pick a mode + give me a goal (quiz, flashcards, interview prep, research) and I’ll generate a result.",
    },
  ]);

  const envOk = Boolean(SH_API_KEY);

  const quicks = useMemo(() => {
    const common = [
      {
        label: "Research Summary",
        prompt: "Summarize best practices for Node.js authentication (JWT).",
      },
    ];

    if (mode === "Tutor") {
      return [
        {
          label: "Explain Concept",
          prompt: "Explain JavaScript closures with a simple example.",
        },
        {
          label: "Mini Quiz",
          prompt: "Create a short JavaScript fundamentals quiz with answers.",
        },
        ...common,
      ];
    }

    if (mode === "Interviewer") {
      return [
        {
          label: "Frontend Interview",
          prompt:
            "Run a frontend interview: ask me 5 questions one by one and score my answers.",
        },
        {
          label: "Backend Interview",
          prompt:
            "Run a backend interview: ask me 5 questions one by one and score my answers.",
        },
        ...common,
      ];
    }

    if (mode === "Analyst") {
      return [
        {
          label: "Skill Gaps",
          prompt:
            "Create a skill-gap checklist for a junior-to-mid React developer and suggested next steps.",
        },
        {
          label: "Study Plan",
          prompt: "Create an 8-week upskilling plan for fullstack JavaScript.",
        },
        ...common,
      ];
    }

    if (mode === "Builder") {
      return [
        {
          label: "Project Plan",
          prompt:
            "Create a 7-day execution plan to ship a SaaS landing page + auth + payments.",
        },
        {
          label: "Tech Stack",
          prompt:
            "Suggest a practical stack for Next.js frontend + Node backend + payments + deploy plan.",
        },
        ...common,
      ];
    }

    // Support
    return [
      {
        label: "Onboarding Help",
        prompt:
          "Explain how a new user should start using Shynvo in 3 steps.",
      },
      {
        label: "Pricing FAQ",
        prompt: "Write an FAQ for Free vs Pro vs Team plans.",
      },
      ...common,
    ];
  }, [mode]);

  async function send(text: string) {
    if (!enabled) return;

    const prompt = text.trim();
    if (!prompt) return;

    setError(null);
    setBusy(true);

    const next = [...messages, { role: "user", content: prompt }] as Msg[];
    setMessages(next);
    setInput("");

    try {
      if (!envOk) {
        throw new Error(
          "Missing NEXT_PUBLIC_SH_API_KEY. Add it in .env.local then restart: npm run dev"
        );
      }

      const reply = await callPublicChat(next);
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e: any) {
      setError(e.message || "Failed");
    } finally {
      setBusy(false);
    }
  }

  const disabled = !enabled || busy;

  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-5 text-neutral-100">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Robot Commands</h2>
          <div className="text-xs text-neutral-500">Mode: {mode}</div>
        </div>

        <span className="text-xs text-neutral-400">
          Backend: {API_BASE.replace(/^https?:\/\//, "")}
        </span>
      </div>

      {!enabled && (
        <div className="mt-4 rounded-2xl border border-neutral-800 bg-black p-4 text-sm text-neutral-400">
          Robot is OFF. Turn it ON to use commands.
        </div>
      )}

      {enabled && !envOk && (
        <div className="mt-4 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-200">
          Missing <code>NEXT_PUBLIC_SH_API_KEY</code>. The panel can’t call your
          backend until you add it.
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {quicks.map((q) => (
          <Quick
            key={q.label}
            label={q.label}
            onClick={() => send(q.prompt)}
            disabled={disabled}
          />
        ))}
      </div>

      <div className="mt-4 h-[260px] overflow-auto rounded-2xl border border-neutral-800 bg-black p-4">
        {messages.map((m, i) => (
          <div key={i} className="mb-3">
            <div className="text-xs uppercase tracking-wide text-neutral-500">
              {m.role === "user" ? "You" : "Robot"}
            </div>
            <div className="whitespace-pre-wrap text-sm text-neutral-200">
              {m.content}
            </div>
          </div>
        ))}
        {busy && <div className="text-sm text-neutral-400">Thinking…</div>}
      </div>

      {error && (
        <div className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          className="flex-1 rounded-xl border border-neutral-800 bg-black p-3 text-sm text-neutral-100 placeholder:text-neutral-600"
          placeholder={
            enabled
              ? "Type a command… (e.g., 'Make me a quiz on SQL joins')"
              : "Robot is OFF"
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled || !enabled}
        />
        <button
          className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black disabled:opacity-60"
          disabled={disabled || !input.trim() || !enabled}
        >
          Send
        </button>
      </form>

      <p className="mt-3 text-xs text-neutral-500">
        Note: This uses backend endpoint <code>/api/public/chat</code>. Next we
        can switch to protected endpoints + user JWT.
      </p>
    </div>
  );
}

function Quick({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-xl border border-neutral-800 bg-black px-3 py-2 text-sm text-neutral-200 hover:border-neutral-600 disabled:opacity-60"
    >
      {label}
    </button>
  );
}