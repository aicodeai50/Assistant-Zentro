"use client";

import React, { useState, useRef, useEffect } from "react";
import TrialGate from "@/components/TrialGate";

type Msg = { role: "user" | "robot"; text: string };

export default function RobotPage() {
  return (
    <TrialGate>
      <RobotEnvironment />
    </TrialGate>
  );
}

function RobotEnvironment() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "robot", text: "Robot online. Ask anything." },
  ]);

  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;

    setBusy(true);
    setInput("");

    setMessages((m) => [...m, { role: "user", text }]);

    try {
      const res = await fetch("/api/robot-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: messages,
        }),
      });

      const data = await res.json();

      const reply =
        data.reply || data.error || "Robot could not respond.";

      setMessages((m) => [...m, { role: "robot", text: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "robot", text: "Network error. Try again." },
      ]);
    }

    setBusy(false);
  }

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">

        {/* Robot Video */}
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <video
            src="/robot.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
        </div>

        {/* Chat Panel */}
        <div className="rounded-3xl border border-white/10 bg-white/5">

          <div className="border-b border-white/10 p-4">
            <div className="text-sm font-semibold">
              Cinematic Robot
            </div>
            <div className="text-xs text-white/60">
              Multilingual AI assistant
            </div>
          </div>

          <div
            ref={listRef}
            className="h-[500px] overflow-auto p-4 space-y-3"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[85%] rounded-xl bg-white/10 px-4 py-3 text-sm"
                    : "max-w-[85%] rounded-xl bg-black/20 px-4 py-3 text-sm"
                }
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 p-4 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder="Ask the robot..."
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
            />

            <button
              onClick={send}
              disabled={busy}
              className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black"
            >
              {busy ? "..." : "Send"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}