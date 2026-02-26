"use client";

import { useState } from "react";

type Line = {
  role: "system" | "user" | "assistant";
  content: string;
};

export default function OSTerminal() {
  const [lines, setLines] = useState<Line[]>([
    { role: "system", content: "Shynvo OS Terminal ready." },
  ]);
  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;

    setLines((prev) => [
      ...prev,
      { role: "user", content: input },
      {
        role: "assistant",
        content: "Command received (demo mode).",
      },
    ]);

    setInput("");
  }

  return (
    <div className="mt-6 rounded-3xl border border-white/10 bg-black/70 p-4 text-sm">
      <div className="space-y-2 text-white/80">
        {lines.map((l, i) => (
          <div key={i}>
            <span className="mr-2 text-white/40">
              {l.role === "user" ? ">" : l.role === "assistant" ? "AI" : "SYS"}
            </span>
            {l.content}
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          className="flex-1 rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-white outline-none"
          placeholder="Type a command…"
        />
        <button
          onClick={send}
          className="rounded-xl bg-white px-4 py-2 font-semibold text-black"
        >
          Send
        </button>
      </div>
    </div>
  );
}