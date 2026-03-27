"use client";

import { useEffect, useMemo, useState } from "react";

type Variant = "robot" | "university" | "frontier";

export default function PreviewTypingLoop({
  lines,
  variant = "robot",
}: {
  lines: string[];
  variant?: Variant;
}) {
  const safeLines = useMemo(
    () => (lines && lines.length ? lines : ["System ready..."]),
    [lines]
  );

  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    const current = safeLines[lineIndex % safeLines.length];

    if (charIndex < current.length) {
      const speed =
        variant === "robot" ? 22 :
        variant === "university" ? 26 :
        18;

      const t = setTimeout(() => {
        setDisplay(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, speed);

      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setDisplay("");
      setCharIndex(0);
      setLineIndex((i) => (i + 1) % safeLines.length);
    }, 1500);

    return () => clearTimeout(t);
  }, [charIndex, lineIndex, safeLines, variant]);

  const styles =
    variant === "robot"
      ? {
          text: "text-cyan-300/90",
          cursor: "text-cyan-200",
          glow: "bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_45%)]",
          scan: "bg-[linear-gradient(to_bottom,transparent,rgba(34,211,238,0.18),transparent)]",
        }
      : variant === "university"
      ? {
          text: "text-blue-300/90",
          cursor: "text-blue-200",
          glow: "bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.18),transparent_45%)]",
          scan: "bg-[linear-gradient(to_bottom,transparent,rgba(96,165,250,0.18),transparent)]",
        }
      : {
          text: "text-lime-300/90",
          cursor: "text-lime-200",
          glow: "bg-[radial-gradient(circle_at_top_left,rgba(132,204,22,0.18),transparent_45%)]",
          scan: "bg-[linear-gradient(to_bottom,transparent,rgba(132,204,22,0.18),transparent)]",
        };

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/20 px-3 py-2">
      <div className={`pointer-events-none absolute inset-0 ${styles.glow}`} />
      <div className={`pointer-events-none absolute inset-0 opacity-[0.10] ${styles.scan} animate-[pulse_2.4s_ease-in-out_infinite]`} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.20)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.20)_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className={`relative min-h-[72px] whitespace-pre-wrap font-mono text-xs leading-6 tracking-[0.03em] ${styles.text}`}>
        {display}
        <span className={`animate-pulse ${styles.cursor}`}>▌</span>
      </div>
    </div>
  );
}
