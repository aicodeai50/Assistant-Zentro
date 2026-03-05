"use client";

import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function run() {
    const q = query.trim();
    if (!q || loading) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/test-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });

      const data = await res.json();
      setAnswer(data?.reply ?? "No response.");
    } catch {
      setAnswer("Error: search request failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl py-14">
      <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
        Search
      </div>

      <h1 className="mt-2 text-3xl font-semibold text-white">Search Shynvo</h1>
      <p className="mt-2 text-sm text-white/70">
        Ask anything. Press Enter to send.
      </p>

      <div className="mt-6 flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") run();
          }}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
          placeholder="Type your question…"
        />
        <button
          onClick={run}
          className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
        >
          {loading ? "…" : "Search"}
        </button>
      </div>

      {answer ? (
        <div className="mt-6 whitespace-pre-wrap rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/85">
          {answer}
        </div>
      ) : null}
    </div>
  );
}