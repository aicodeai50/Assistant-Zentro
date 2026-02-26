"use client";

import { useEffect, useRef, useState } from "react";
import OSShell from "@/components/os/OSShell";
import { BackRow } from "@/components/os/OSCard";

type Line = { t: "sys" | "user" | "out"; v: string };

export default function OSTerminalPage() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>([
    { t: "sys", v: "Shynvo OS Terminal — 2050 preview" },
    { t: "out", v: "Type 'help' to see commands." },
  ]);

  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight });
  }, [lines]);

  function run(cmdRaw: string) {
    const cmd = cmdRaw.trim();
    if (!cmd) return;

    setLines((l) => [...l, { t: "user", v: `> ${cmd}` }]);

    const reply = handle(cmd);
    setLines((l) => [...l, { t: "out", v: reply }]);
  }

  function handle(cmd: string) {
    switch (cmd.toLowerCase()) {
      case "help":
        return [
          "Commands:",
          "- os",
          "- momentum",
          "- focus",
          "- cognitive",
          "- trajectory",
          "- clear",
        ].join("\n");
      case "os":
        window.location.href = "/os";
        return "Opening /os …";
      case "momentum":
        window.location.href = "/os/momentum";
        return "Opening /os/momentum …";
      case "focus":
        window.location.href = "/os/focus";
        return "Opening /os/focus …";
      case "cognitive":
        window.location.href = "/os/cognitive";
        return "Opening /os/cognitive …";
      case "trajectory":
        window.location.href = "/os/trajectory";
        return "Opening /os/trajectory …";
      case "clear":
        setLines([{ t: "sys", v: "Shynvo OS Terminal — 2050 preview" }]);
        return "Cleared.";
      default:
        return `Unknown command: ${cmd}\nType 'help'`;
    }
  }

  return (
    <OSShell title="OS Terminal" subtitle="Command interface (fictional preview)">
      <BackRow href="/os" />

      <div className="mt-6 rounded-3xl border border-white/10 bg-black/70 p-5">
        <div
          ref={boxRef}
          className="h-[360px] overflow-auto rounded-2xl border border-white/10 bg-black p-4 font-mono text-sm"
        >
          {lines.map((x, i) => (
            <div
              key={i}
              className={
                x.t === "sys"
                  ? "text-emerald-300"
                  : x.t === "user"
                  ? "text-white"
                  : "text-white/70"
              }
            >
              {x.v.split("\n").map((row, idx) => (
                <div key={idx}>{row}</div>
              ))}
            </div>
          ))}
        </div>

        <form
          className="mt-3 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            run(input);
            setInput("");
          }}
        >
          <input
            className="flex-1 rounded-xl border border-white/10 bg-black px-3 py-3 text-sm text-white placeholder:text-white/40"
            placeholder="Type a command… (help, os, momentum, focus)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black">
            Run
          </button>
        </form>
      </div>
    </OSShell>
  );
}