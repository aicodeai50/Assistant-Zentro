"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Line = { id: string; type: "in" | "out" | "sys"; text: string };

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export default function TerminalOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("/os");
  const [lines, setLines] = useState<Line[]>(() => [
    { id: uid(), type: "sys", text: "Shynvo OS Terminal — ready. Type 'help'." },
    { id: uid(), type: "sys", text: "Tip: try: routes, time, clear, open /os/timeline" },
  ]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const routes = useMemo(
    () => [
      "/os",
      "/os/timeline",
      "/os/missions",
      "/os/cognitive",
      "/os/focus",
      "/os/momentum",
      "/os/trajectory",
      "/os/settings",
    ],
    []
  );

  useEffect(() => {
    if (!open) return;
    // focus input on open
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    // autoscroll
    if (!open) return;
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lines, open]);

  function push(type: Line["type"], text: string) {
    setLines((p) => [...p, { id: uid(), type, text }]);
  }

  function run(cmdRaw: string) {
    const cmd = cmdRaw.trim();
    if (!cmd) return;

    push("in", `${cwd} $ ${cmd}`);

    const [head, ...rest] = cmd.split(" ");
    const arg = rest.join(" ").trim();

    if (head === "help") {
      push(
        "out",
        [
          "Commands:",
          "  help                 show this help",
          "  routes               list OS routes",
          "  open <path>           open a route (e.g. open /os/timeline)",
          "  cd <path>             change directory (cosmetic)",
          "  time                  show local time",
          "  clear                 clear terminal",
          "  exit                  close terminal",
        ].join("\n")
      );
      return;
    }

    if (head === "routes") {
      push("out", routes.join("\n"));
      return;
    }

    if (head === "open") {
      if (!arg) {
        push("out", "Usage: open /os/timeline");
        return;
      }
      // soft validate
      if (!arg.startsWith("/")) {
        push("out", "Path must start with /");
        return;
      }
      window.location.href = arg;
      return;
    }

    if (head === "cd") {
      if (!arg) {
        setCwd("/os");
        push("out", "cwd set to /os");
        return;
      }
      setCwd(arg);
      push("out", `cwd set to ${arg}`);
      return;
    }

    if (head === "time") {
      push("out", new Date().toString());
      return;
    }

    if (head === "clear") {
      setLines([{ id: uid(), type: "sys", text: "Terminal cleared." }]);
      return;
    }

    if (head === "exit") {
      onClose();
      return;
    }

    // default
    push("out", `Command not found: ${head}. Type 'help'.`);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        aria-label="Close terminal backdrop"
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />
      <div className="absolute bottom-6 left-1/2 w-[min(980px,92vw)] -translate-x-1/2 rounded-3xl border border-white/15 bg-black/70 p-4 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-white">Terminal</div>
            <div className="text-xs text-white/55">persistent • local • route launcher</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-xl border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/85 hover:bg-white/15"
              onClick={() => setLines([{ id: uid(), type: "sys", text: "Terminal cleared." }])}
            >
              Clear
            </button>
            <button
              type="button"
              className="rounded-xl border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/85 hover:bg-white/15"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="mt-3 max-h-[42vh] overflow-auto rounded-2xl border border-white/10 bg-black/60 p-3 font-mono text-xs"
        >
          {lines.map((l) => (
            <div
              key={l.id}
              className={
                l.type === "in"
                  ? "text-white/85"
                  : l.type === "sys"
                    ? "text-white/55"
                    : "text-white/70"
              }
              style={{ whiteSpace: "pre-wrap" }}
            >
              {l.text}
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-2 text-xs text-white/60 font-mono">
            $
          </div>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const v = input;
                setInput("");
                run(v);
              } else if (e.key === "Escape") {
                onClose();
              }
            }}
            placeholder="Type 'help'…"
            className="w-full rounded-2xl border border-white/15 bg-black/50 px-4 py-3 text-xs text-white outline-none placeholder:text-white/35"
          />
          <button
            type="button"
            className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-xs text-white/85 hover:bg-white/15"
            onClick={() => {
              const v = input;
              setInput("");
              run(v);
            }}
          >
            Run
          </button>
        </div>
      </div>
    </div>
  );
}
