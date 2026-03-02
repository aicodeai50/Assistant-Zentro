"use client";

import { useState } from "react";

type Props = {
  facultyHint?: string;
  backendUrl?: string;
};

export default function SHAssistantPanel({ facultyHint, backendUrl }: Props) {
  const [q, setQ] = useState("");
  const [log, setLog] = useState<{ role: "user" | "assistant"; text: string }[]>([
    {
      role: "assistant",
      text:
        "Welcome to Shynvo OS. I’m SH Assistant — your navigator + tutor. Ask for routes, study help, planning, or tools.",
    },
  ]);
  const [busy, setBusy] = useState(false);

  async function send() {
    const prompt = q.trim();
    if (!prompt) return;

    setLog((x) => [...x, { role: "user", text: prompt }]);
    setQ("");
    setBusy(true);

    if (!backendUrl) {
      setLog((x) => [
        ...x,
        { role: "assistant", text: "Backend is not configured (NEXT_PUBLIC_BACKEND_URL missing)." },
      ]);
      setBusy(false);
      return;
    }

    try {
      const res = await fetch(`${backendUrl.replace(/\/$/, "")}/api/public/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: facultyHint ? `[Context: ${facultyHint}] ${prompt}` : prompt,
        }),
      });

      const text = await res.text();

      // Remove the {"build":"..."} from the UI — show ONLY reply
      try {
        const j = JSON.parse(text);
        const reply = typeof j?.reply === "string" ? j.reply : text;
        setLog((x) => [...x, { role: "assistant", text: reply }]);
      } catch {
        setLog((x) => [...x, { role: "assistant", text }]);
      }
    } catch (e: any) {
      setLog((x) => [...x, { role: "assistant", text: `ERR: ${e?.message || "request failed"}` }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/15 bg-black/35 p-5 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs tracking-widest text-white/60">SH ASSISTANT</div>
          <div className="mt-1 text-lg font-semibold text-white">Navigator + Tutor</div>
          <div className="mt-1 text-sm text-white/70">
            Ask anything. I can guide you to sectors or help you work inside them.
          </div>
        </div>
        {facultyHint ? (
          <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
            Context: {facultyHint}
          </div>
        ) : null}
      </div>

      <div className="mt-4 max-h-[260px] overflow-auto rounded-2xl border border-white/10 bg-black/40 p-4">
        {log.map((m, i) => (
          <div key={i} className="mb-3">
            <div className="text-[10px] tracking-widest text-white/40">
              {m.role === "user" ? "YOU" : "ASSISTANT"}
            </div>
            <div className="mt-1 whitespace-pre-wrap text-sm text-white/80">{m.text}</div>
          </div>
        ))}
        {busy ? <div className="text-sm text-white/50">Thinking…</div> : null}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? send() : null)}
          placeholder="Try: 'routes' or 'open /os/timeline' or 'help me plan my exam'"
          className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
        />
        <button
          onClick={send}
          className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/85 hover:bg-white/15"
          type="button"
        >
          Send
        </button>
      </div>

      <div className="mt-3 text-xs text-white/45">
        Tip: Use Terminal for instant navigation; use SH Assistant for help + guidance.
      </div>
    </div>
  );
}
