"use client";

import { useEffect, useState } from "react";

export default function PreviewCardVisual({
  type = "robot",
}: {
  type?: "robot" | "university" | "frontier";
}) {
  const lines = {
    robot: [
      "Initializing Shynvo Robot...",
      "Analyzing user direction...",
      "Preparing intelligent guidance...",
      "Ready to assist."
    ],
    university: [
      "Loading academic paths...",
      "Mapping faculties...",
      "Structuring knowledge flow...",
      "University ready."
    ],
    frontier: [
      "Booting Frontier Lab...",
      "Loading dev environment...",
      "Syncing AI workflows...",
      "System ready."
    ],
  };

  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    const current = lines[type][index % lines[type].length];
    let i = 0;

    const typing = setInterval(() => {
      setText(current.slice(0, i));
      i++;
      if (i > current.length) {
        clearInterval(typing);
        setTimeout(() => setIndex((prev) => prev + 1), 1200);
      }
    }, 25);

    return () => clearInterval(typing);
  }, [index, type]);

  return (
    <div className="relative h-[190px] rounded-[1.5rem] border border-white/10 bg-black/40 overflow-hidden">
      
      {/* glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,150,0.15),transparent_60%)]" />

      {/* grid effect */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* text */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
        <div className="text-sm text-lime-300 font-mono tracking-wide">
          {text}
          <span className="animate-pulse">|</span>
        </div>
      </div>
    </div>
  );
}
