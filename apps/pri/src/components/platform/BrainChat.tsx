"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

const SYSTEM_PROMPT = `You are ARIA — Shynvo's Advanced Robot Intelligence Assistant. You help users control robots, generate APIs, execute workflows, and understand their robotics platform. You speak in a futuristic, professional tone. When users ask to perform robot actions (pick, place, move, inspect), you respond with what the robot would do and provide the API call they would need. You are part of the Shynvo PRI (Planetary Robot Interface) platform in 2050.`;

const SUGGESTIONS = [
  "Pick up the red cube and place it at target",
  "Inspect the current robot state",
  "Generate an API for warehouse automation",
  "What APIs have I created?",
  "Move robot arm to position x:12 y:8",
  "Run a failure alert workflow",
];

export default function BrainChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content: "ARIA online. I am your robot intelligence assistant. I can help you control robots, generate APIs, execute workflows, and manage your entire robotics stack. What would you like to do?",
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text?: string) {
    const content = text || input.trim();
    if (!content || loading) return;
    setInput("");

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/proxy/brain/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.role,
            content: m.content,
          })),
          system: SYSTEM_PROMPT,
        }),
      });
      const data = await res.json();
      const reply = data.content || data.message || "ARIA processing...";
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        content: reply,
        timestamp: new Date().toLocaleTimeString(),
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        content: "Connection to ARIA lost. Please check your backend connection.",
        timestamp: new Date().toLocaleTimeString(),
      }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="rounded-3xl border border-emerald-400/20 bg-black/30 p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-14 w-14 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 flex items-center justify-center text-2xl animate-glow">
              ◎
            </div>
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">ARIA — Advanced Robot Intelligence</h2>
            <p className="text-sm text-emerald-400/70">Online · Shynvo Brain v2.0 · GPT-4 Powered</p>
          </div>
          <div className="ml-auto rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-2 text-xs text-emerald-300">
            Neural Link Active
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => sendMessage(s)}
            className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/60 transition hover:border-emerald-400/30 hover:text-emerald-300"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Chat */}
      <div className="rounded-3xl border border-white/10 bg-black/20 flex flex-col" style={{ height: "60vh" }}>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 animate-fade-in ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`h-8 w-8 shrink-0 rounded-xl flex items-center justify-center text-sm font-bold ${
                m.role === "assistant"
                  ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                  : "border border-sky-400/30 bg-sky-400/10 text-sky-300"
              }`}>
                {m.role === "assistant" ? "◎" : "U"}
              </div>
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                m.role === "assistant"
                  ? "bg-white/[0.04] border border-white/10 text-white/80"
                  : "bg-emerald-400/10 border border-emerald-400/20 text-emerald-100"
              }`}>
                <p>{m.content}</p>
                <div className="mt-1 text-xs text-white/25">{m.timestamp}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 animate-fade-in">
              <div className="h-8 w-8 shrink-0 rounded-xl border border-emerald-400/30 bg-emerald-400/10 flex items-center justify-center text-sm text-emerald-300">◎</div>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-3">
                <div className="flex gap-1">
                  {[0,1,2].map(i => (
                    <span key={i} className="h-2 w-2 rounded-full bg-emerald-400/50 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-4 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Tell ARIA what to do..."
            className="flex-1 rounded-2xl border border-white/10 bg-[#08110d] px-5 py-3 text-sm text-emerald-100 outline-none transition placeholder:text-white/25 focus:border-emerald-400/40"
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="rounded-2xl border border-emerald-400/30 bg-emerald-400/15 px-5 py-3 text-sm font-medium text-emerald-200 transition hover:bg-emerald-400/25 disabled:opacity-30"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
