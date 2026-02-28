"use client";

import { Component, ReactNode, useEffect, useMemo, useRef } from "react";
import { useTerminalStore } from "@/stores/terminal/terminal.store";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

class TerminalErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err: unknown) {
    console.error("TerminalHost error:", err);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed bottom-4 right-4 z-50 w-[min(520px,calc(100vw-2rem))]">
          <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur p-4 text-white">
            <div className="text-xs uppercase tracking-widest text-red-300">
              Diagnostics offline
            </div>
            <div className="mt-2 text-sm text-white/80">
              Terminal UI crashed — fallback engaged. Refresh to restore.
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function OSTerminalHost() {
  const isOpen = useTerminalStore((s) => s.isOpen);
  const lines = useTerminalStore((s) => s.lines);
  const input = useTerminalStore((s) => s.input);
  const setInput = useTerminalStore((s) => s.setInput);
  const runCommand = useTerminalStore((s) => s.runCommand);
  const clear = useTerminalStore((s) => s.clear);

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("shynvo_terminal_open");
      if (saved === "0") useTerminalStore.getState().setOpen(false);
      if (saved === "1") useTerminalStore.getState().setOpen(true);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("shynvo_terminal_open", isOpen ? "1" : "0");
    } catch {}
  }, [isOpen]);

  useEffect(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    });
  }, [lines.length]);

  if (!isOpen) return null;

  return (
    <TerminalErrorBoundary>
      <div className="fixed bottom-4 right-4 z-50 w-[min(520px,calc(100vw-2rem))]">
        <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div>
              <div className="text-sm font-extrabold text-white">Terminal</div>
              <div className="text-[11px] text-white/60">
                persistent • frontend-only • never vanishes
              </div>
            </div>

            <button
              type="button"
              onClick={clear}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-extrabold text-white/80 hover:bg-white/10"
            >
              Clear
            </button>
          </div>

          <div
            ref={listRef}
            className="max-h-[320px] overflow-y-auto px-4 py-3 text-xs text-white/80"
          >
            {lines.map((l) => (
              <div key={l.id}>
                {l.type === "in" ? `> ${l.text}` : l.text}
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 px-3 py-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  runCommand(input);
                  setInput("");
                }
              }}
              placeholder="Type a command…"
              className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white outline-none"
            />
          </div>
        </div>
      </div>
    </TerminalErrorBoundary>
  );
}