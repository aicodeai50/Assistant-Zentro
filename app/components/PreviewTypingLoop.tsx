"use client";

import { useEffect, useState } from "react";

export default function PreviewTypingLoop({ lines }: { lines: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [char, setChar] = useState(0);

  useEffect(() => {
    if (!lines.length) return;

    const current = lines[index];

    if (char < current.length) {
      const t = setTimeout(() => {
        setText((prev) => prev + current[char]);
        setChar(char + 1);
      }, 25);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setText("");
        setChar(0);
        setIndex((i) => (i + 1) % lines.length);
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [char, index, lines]);

  return (
    <div className="font-mono text-xs text-lime-300/90 leading-relaxed whitespace-pre-wrap">
      {text}
      <span className="animate-pulse">|</span>
    </div>
  );
}
