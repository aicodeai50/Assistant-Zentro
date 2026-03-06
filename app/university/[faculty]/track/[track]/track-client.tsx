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

function buildSystemPrompt(faculty: string, track: string, role: UniRole) {
  const roleLabel = ROLE_INFO[role].title;
  const roleBehavior =
    role === "teacher"
      ? "Teach like a professional university teacher. Explain step by step, clearly and academically."
      : role === "tutor"
      ? "Act like a university tutor. Focus on assignments, exam practice, feedback, and guided reasoning."
      : "Act like a university assistant. Be concise, practical, organized, and helpful with study planning and summaries.";

  return `
You are a ${roleLabel} inside Shynvo University.

Current faculty: ${faculty}
Current course: ${track}

Rules:
1. Only answer questions related to this faculty and this course.
2. If the user asks about another faculty or unrelated topic, do NOT answer it in detail.
3. Instead, politely say you are not permitted to answer outside this course and faculty, and ask the user to go to the correct faculty.
4. Always answer in the same language the user writes in.
5. Be professional, educational, and clear.
6. If the user asks nonsense, spam, or irrelevant things, say:
"I’m not permitted to answer that. Please ask a relevant academic question."

Role behavior:
${roleBehavior}
  `.trim();
}

function extractReply(raw: string) {
  try {
    const data = JSON.parse(raw);
    return (
      data?.answer ||
      data?.reply ||
      data?.message ||
      data?.output ||
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.text ||
      ""
    );
  } catch {
    return raw;
  }
}

export default function TrackPageClient({
  faculty,
  track,
  trackTitle,
}: {
  faculty: string;
  track: string;
  trackTitle: string;
}) {
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
      // ignore
    }
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user" as const, text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const systemPrompt = buildSystemPrompt(faculty, trackTitle, selectedRole);

      const res = await fetch("/api/public/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            ...nextMessages.map((m) => ({
              role: m.role === "user" ? "user" : "assistant",
              content: m.text,
            })),
          ],
        }),
      });

      const raw = await res.text();
      const answer = extractReply(raw);

      if (!res.ok) {
        throw new Error(answer || `Request failed: ${res.status}`);
      }

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: answer || "No reply returned." },
      ]);

      if (mode === "voice" && answer) {
        await playVoice(answer);
      }

      setTimeout(() => {
        listRef.current?.scrollTo({
          top: listRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 50);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: e?.message || "Network error. Please try again.",
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
            {trackTitle}
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
