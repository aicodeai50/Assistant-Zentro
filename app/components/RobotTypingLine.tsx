"use client";

import { useEffect, useState } from "react";

const LINES = [
  "Welcome to Shynvo Robot. Click to enter the multilingual robot experience.",
  "AI chamber ready. Open the robot to begin guided conversation.",
  "Your assistant is online. Tap the chamber to start the robot trial experience.",
];

export default function RobotTypingLine() {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = LINES[lineIndex];

    const speed = isDeleting ? 22 : 38;
    const pauseAtEnd = 1400;
    const pauseBeforeNext = 250;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayed.length < fullText.length) {
          setDisplayed(fullText.slice(0, displayed.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseAtEnd);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(fullText.slice(0, displayed.length - 1));
        } else {
          setIsDeleting(false);
          setTimeout(() => {
            setLineIndex((prev) => (prev + 1) % LINES.length);
          }, pauseBeforeNext);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayed, isDeleting, lineIndex]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white/85 min-h-[84px]">
      {displayed}
      <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-emerald-300 align-middle" />
    </div>
  );
}
