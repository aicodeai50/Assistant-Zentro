"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
  routes: { label: string; path: string }[];
  backendUrl?: string;
};

function nowTime() {
  const d = new Date();
  return d.toLocaleString();
}

export default function TerminalOverlay({ open, onClose, routes, backendUrl }: Props) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<string[]>(() => [
    "Shynvo OS Terminal — command layer",
    "Type 'help' for commands. Try: routes, time, open /os/timeline, ai <prompt>",
    `Boot: ${nowTime()}`,
    "",
  ]);

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }, [open, lines]);

  const routeMap = useMemo(() => {
    const m = new Map<string, string>();
    routes.forEach((r) => m.set(r.label.toLowerCase(), r.path));
    return m;
  }, [routes]);

  async function runAi(prompt: string) {
    if (!backendUrl) {
      setLines((x) => [...x, "ERR: Backend is not configured (NEXT_PUBLIC_BACKEND_URL missing).", ""]);
      return;
    }

    try {
      const res = await fetch(`${backendUrl.replace(/\/$/, "")}/api/public/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const text = await res.text();

      // Try JSON first (your backend returns { reply, build })
      try {
        const j = JSON.parse(text);
        const reply = typeof j?.reply === "string" ? j.reply : text;
        setLines((x) => [...x, reply, ""]);
        return;
      } catch {
        // plain text fallback
        setLines((x) => [...x, text, ""]);
      }
    } catch (e: any) {
      setLines((x) => [...x, `ERR: ${e?.message || "request failed"}`, ""]);
    }
  }

  async function onSubmit() {
    const cmd = input.trim();
    if (!cmd) return;

    setLines((x) => [...x, `shynvo@os:~$ ${cmd}`]);
    setInput("");

    const [head, ...rest] = cmd.split(" ");
    const tail = rest.join(" ").trim();

    if (head === "help") {
      setLines((x) => [
        ...x,
        "Commands:",
        "  help                 show commands",
        "  routes               list destinations",
        "  open <path|name>      navigate (e.g., open /os/timeline OR open missions)",
        "  time                 show local time",
        "  clear                clear terminal",
        "  ai <prompt>           ask SH Assistant from terminal",
        "  exit                 close terminal",
        "",
      ]);
      return;
    }

    if (head === "routes") {
      setLines((x) => [
        ...x,
        "Destinations:",
        ...routes.map((r) => `  ${r.label}  ->  ${r.path}`),
        "",
      ]);
      return;
    }

    if (head === "time") {
      setLines((x) => [...x, nowTime(), ""]);
      return;
    }

    if (head === "clear") {
      setLines([
        "Shynvo OS Terminal — command layer",
        "Type 'help' for commands. Try: routes, time, open /os/timeline, ai <prompt>",
        `Boot: ${nowTime()}`,
        "",
      ]);
      return;
    }

    if (head === "exit") {
      onClose();
      return;
    }

    if (head === "open") {
      if (!tail) {
        setLines((x) => [...x, "Usage: open /path  OR  open <route-name>", ""]);
        return;
      }

      // allow open /os/xxx
      if (tail.startsWith("/")) {
        router.push(tail);
        setLines((x) => [...x, `→ navigating to ${tail}`, ""]);
        return;
      }

      // allow open "missions"
      const guess = routeMap.get(tail.toLowerCase());
      if (guess) {
        router.push(guess);
        setLines((x) => [...x, `→ navigating to ${guess}`, ""]);
      } else {
        setLines((x) => [...x, `ERR: unknown destination '${tail}'. Try 'routes'.`, ""]);
      }
      return;
    }

    if (head === "ai") {
      if (!tail) {
        setLines((x) => [...x, "Usage: ai <prompt>", ""]);
        return;
      }
      setLines((x) => [...x, "SH Assistant: thinking…"]);
      await runAi(tail);
      return;
    }

    setLines((x) => [...x, `ERR: command not found: ${head} (try 'help')`, ""]);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/55 p-4 backdrop-blur-sm">
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-black/80 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="text-sm text-white/80">
            Terminal <span className="text-white/40">• persistent • local • proxy-safe</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 hover:bg-white/10"
            type="button"
          >
            Close
          </button>
        </div>

        <div className="max-h-[55vh] overflow-auto px-4 py-3 font-mono text-xs text-white/80">
          {lines.map((l, i) => (
            <div key={i} className="whitespace-pre-wrap leading-5">
              {l}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? onSubmit() : null)}
            placeholder="help • routes • open /os/timeline • ai <prompt>"
            className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-2 text-xs text-white outline-none placeholder:text-white/30"
          />
          <button
            onClick={onSubmit}
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/85 hover:bg-white/15"
            type="button"
          >
            Run
          </button>
        </div>
      </div>
    </div>
  );
}
