"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Line = { t: "sys" | "user" | "out"; v: string };

export default function OSTerminal({
  promptHint = "Type a command… (try: help)",
}: {
  promptHint?: string;
}) {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>([
    { t: "sys", v: "Shynvo OS Terminal • 2050 build" },
    { t: "sys", v: "Type `help` for commands." },
  ]);

  const scroller = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [lines]);

  const helpText = useMemo(
    () => [
      "help                Show this help",
      "status              Show OS status",
      "mission             Print today’s mission",
      "open momentum        Navigate to /os/momentum",
      "open focus           Navigate to /os/focus",
      "open cognitive       Navigate to /os/cognitive",
      "open trajectory      Navigate to /os/trajectory",
      "clear               Clear terminal",
    ],
    []
  );

  function push(t: Line["t"], v: string) {
    setLines((prev) => [...prev, { t, v }]);
  }

  function run(cmdRaw: string) {
    const cmd = cmdRaw.trim();
    if (!cmd) return;

    push("user", cmd);

    const lc = cmd.toLowerCase();

    if (lc === "clear") {
      setLines([{ t: "sys", v: "Terminal cleared." }]);
      return;
    }

    if (lc === "help") {
      helpText.forEach((l) => push("out", l));
      return;
    }

    if (lc === "status") {
      push("out", "OS: online");
      push("out", "Signals: active (preview)");
      push("out", "Mode: cinematic UI layer");
      return;
    }

    if (lc === "mission") {
      push("out", "Today’s mission:");
      push("out", "1) 10-min drill");
      push("out", "2) 1 hard prompt");
      push("out", "3) 2-min reflection");
      return;
    }

    if (lc.startsWith("open ")) {
      const target = lc.replace(/^open\s+/, "").trim();
      const map: Record<string, string> = {
        momentum: "/os/momentum",
        focus: "/os/focus",
        cognitive: "/os/cognitive",
        trajectory: "/os/trajectory",
      };
      const url = map[target];
      if (!url) {
        push("out", `Unknown target: ${target}`);
        return;
      }
      push("out", `Navigating to ${url} …`);
      window.location.href = url;
      return;
    }

    push("out", "Unknown command. Type `help`.");
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-black/60 p-5">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-white/80">Terminal</div>
        <div className="text-xs text-white/40">Preview</div>
      </div>

      <div
        ref={scroller}
        className="mt-4 h-[260px] overflow-auto rounded-2xl border border-white/10 bg-black p-4"
      >
        {lines.map((l, i) => (
          <div key={i} className="mb-2 text-sm">
            <span className="mr-2 text-xs uppercase tracking-wide text-white/40">
              {l.t === "sys" ? "sys" : l.t === "user" ? "you" : "out"}
            </span>
            <span className="whitespace-pre-wrap text-white/80">{l.v}</span>
          </div>
        ))}
      </div>

      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          run(input);
          setInput("");
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={promptHint}
          className="flex-1 rounded-xl border border-white/10 bg-black px-3 py-3 text-sm text-white placeholder:text-white/30"
        />
        <button className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black">
          Run
        </button>
      </form>
    </div>
  );
}