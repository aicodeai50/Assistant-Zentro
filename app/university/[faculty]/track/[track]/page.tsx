"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";

type UniRole = "teacher" | "tutor" | "assistant";
type Msg = { role: "user" | "ai"; text: string };

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const ROLE_INFO: Record<
  UniRole,
  {
    title: string;
    subtitle: string;
    responsibilities: string[];
  }
> = {
  teacher: {
    title: "Teacher",
    subtitle: "Teaches the full course material in a structured professional way.",
    responsibilities: [
      "Explains concepts from foundation to advanced level",
      "Teaches the complete learning flow step by step",
      "Uses examples, lessons, and concept breakdowns",
      "Keeps the teaching academic and professional",
    ],
  },
  tutor: {
    title: "Tutor",
    subtitle: "Helps with assignments, exam practice, and problem-solving.",
    responsibilities: [
      "Guides assignment work and reasoning",
      "Prepares the student for quizzes and exams",
      "Reviews mistakes and improves understanding",
      "Supports targeted practice in the course",
    ],
  },
  assistant: {
    title: "Assistant",
    subtitle: "Fast helper for summaries, notes, revision, and study planning.",
    responsibilities: [
      "Summarizes notes and key concepts",
      "Creates revision plans and checklists",
      "Helps with quick course-related clarifications",
      "Supports daily study workflow and organization",
    ],
  },
};

export default function TrackPage({
  params,
}: {
  params: { faculty: string; track: string };
}) {
  const { faculty, track } = params;

  const [selectedRole, setSelectedRole] = useState<UniRole>("teacher");
  const [mode, setMode] = useState<"text" | "voice">("text");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "Welcome. Choose Teacher, Tutor, or Assistant. Ask in any language. This room only answers questions related to this course and faculty.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const listRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const roleInfo = useMemo(() => ROLE_INFO[selectedRole], [selectedRole]);

  async function playVoice(text: string) {
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ input: text }),
      });

      if (!res.ok) return;

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      if (!audioRef.current) return;
      audioRef.current.src = url;
      await audioRef.current.play();
    } catch {
      // ignore voice failures for now
    }
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/university-chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          facultyKey: faculty,
          trackKey: track,
          role: selectedRole,
          message: text,
          history: messages.slice(-8),
        }),
      });

      const data = await res.json().catch(() => null);
      const answer =
        (data?.answer as string) ||
        "I could not respond right now. Please try again.";

      setMessages((prev) => [...prev, { role: "ai", text: answer }]);

      if (mode === "voice") {
        await playVoice(answer);
      }

      setTimeout(() => {
        listRef.current?.scrollTo({
          top: listRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 50);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Network error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-10 sm:py-14">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href={`/university/${faculty}`}
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            ← Back to Faculty
          </Link>

          <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/60">
            Course Room
          </div>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {track.replace(/-/g, " ")}
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
            This course contains its own Teacher, Tutor, and Assistant. They only
            answer this faculty field and will redirect unrelated questions.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-1">
            {(["teacher", "tutor", "assistant"] as UniRole[]).map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={cx(
                  "rounded-xl px-3 py-2 text-sm font-semibold transition",
                  selectedRole === role
                    ? "bg-white text-[#0B0F14]"
                    : "text-white/80 hover:bg-white/5"
                )}
              >
                {ROLE_INFO[role].title}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-1">
            {(["text", "voice"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cx(
                  "rounded-xl px-3 py-2 text-sm font-semibold transition",
                  mode === m
                    ? "bg-white text-[#0B0F14]"
                    : "text-white/80 hover:bg-white/5"
                )}
              >
                {m === "text" ? "Text" : "Voice"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
            Selected role
          </div>

          <div className="mt-2 text-xl font-semibold text-white">
            {roleInfo.title}
          </div>

          <div className="mt-1 text-sm text-white/70">{roleInfo.subtitle}</div>

          <div className="mt-5 space-y-3">
            {roleInfo.responsibilities.map((item) => (
              <div key={item} className="flex gap-2 text-sm text-white/75">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/55" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/65">
            <div className="font-semibold text-white/85">Faculty rule</div>
            <div className="mt-1">
              This role only works inside this course and faculty. If a user asks
              about another field, it should redirect them to the correct faculty.
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/65">
            <div className="font-semibold text-white/85">Language</div>
            <div className="mt-1">
              The response should follow the language used by the student.
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-white">
                Live course channel
              </div>
              <div className="text-xs text-white/60">
                Multilingual • Faculty-locked • {mode === "voice" ? "Voice mode" : "Text mode"}
              </div>
            </div>

            <div className={cx("text-xs", loading ? "text-white/70" : "text-white/50")}>
              {loading ? "Thinking..." : "Ready"}
            </div>
          </div>

          <div
            ref={listRef}
            className="mt-4 h-[430px] overflow-auto rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <div className="space-y-3">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={cx(
                    "max-w-[92%] rounded-2xl border px-4 py-3 text-sm leading-6",
                    m.role === "user"
                      ? "ml-auto border-white/10 bg-white/10 text-white"
                      : "border-white/10 bg-white/5 text-white/85"
                  )}
                >
                  {m.text}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
              placeholder={`Ask the ${roleInfo.title.toLowerCase()} in any language...`}
            />
            <button
              onClick={sendMessage}
              className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
            >
              Send
            </button>
          </div>

          <div className="mt-2 text-[11px] text-white/50">
            Tip: choose Voice mode if you want spoken answers.
          </div>

          <audio ref={audioRef} className="hidden" />
        </div>
      </div>
    </section>
  );
}
