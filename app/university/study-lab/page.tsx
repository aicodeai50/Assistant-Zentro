"use client";

import Link from "next/link";
import { useState } from "react";

export default function StudyLabPage() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function askTutor() {
    if (!input.trim()) return;
    setLoading(true);
    setReply(null);

    const res = await fetch("/api/public/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: input }],
      }),
    });

    const data = await res.json();
    setReply(data.reply ?? "No response.");
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold">Study Lab</h1>
        <p className="mt-2 text-white/70">
          Ask your faculty tutor anything. Get explanations, examples, and guidance.
        </p>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question…"
          className="mt-6 w-full rounded-xl bg-black/60 border border-white/15 p-4 text-white"
        />

        <button
          onClick={askTutor}
          disabled={loading}
          className="mt-4 rounded-xl bg-white text-black px-6 py-3 font-semibold"
        >
          {loading ? "Thinking…" : "Ask Tutor →"}
        </button>

        {reply && (
          <div className="mt-6 rounded-xl border border-white/15 bg-white/5 p-4 whitespace-pre-wrap">
            {reply}
          </div>
        )}

        <div className="mt-6 text-sm">
          <Link href="/university" className="underline">
            ← Back to University Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
