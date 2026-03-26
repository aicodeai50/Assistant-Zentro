import { useEffect, useState } from "react";

export default function PreviewCardVisual({ type = "robot" }) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  const lines = {
    robot: [
      "Initializing guidance system...",
      "Analyzing user intent...",
      "Routing optimal path...",
    ],
    university: [
      "Loading faculty modules...",
      "Preparing structured learning...",
      "Connecting academic pathways...",
    ],
    frontier: [
      "Booting dev environment...",
      "Compiling system layers...",
      "Activating AI build mode...",
    ],
  };

  const active = lines[type] || lines.robot;
  const fullText = active[index % active.length];

  useEffect(() => {
    let i = 0;
    setText("");

    const interval = setInterval(() => {
      i++;
      setText(fullText.slice(0, i));

      if (i >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => setIndex((p) => p + 1), 1200);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [index, fullText]);

  return (
    <div style={{
      height: 180,
      borderRadius: 16,
      background: "radial-gradient(circle at 20% 20%, rgba(0,255,200,0.08), transparent)",
      border: "1px solid rgba(255,255,255,0.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "monospace",
      color: "#9fffe0",
      fontSize: 13,
      position: "relative",
      overflow: "hidden"
    }}>
      <div>{text}<span style={{ opacity: 0.4 }}>▌</span></div>

      <div style={{
        position: "absolute",
        bottom: 10,
        right: 12,
        fontSize: 10,
        opacity: 0.5
      }}>
        live preview
      </div>
    </div>
  );
}
