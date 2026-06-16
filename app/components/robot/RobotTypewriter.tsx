"use client";

import { useEffect, useState } from "react";

/** Reveals robot text character-by-character for a live assistant feel. */
export default function RobotTypewriter({
  text,
  active,
  onDone,
}: {
  text: string;
  active: boolean;
  onDone?: () => void;
}) {
  const [visible, setVisible] = useState(active ? 0 : text.length);

  useEffect(() => {
    if (!active) {
      setVisible(text.length);
      return;
    }

    setVisible(0);
    let i = 0;
    const step = Math.max(1, Math.floor(text.length / 80));

    const timer = window.setInterval(() => {
      i += step;
      if (i >= text.length) {
        setVisible(text.length);
        window.clearInterval(timer);
        onDone?.();
        return;
      }
      setVisible(i);
    }, 16);

    return () => window.clearInterval(timer);
  }, [text, active, onDone]);

  return <>{text.slice(0, visible)}</>;
}
