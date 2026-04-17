"use client";

import { useEffect, useRef, useState } from "react";

type WorldObject = {
  id: string;
  type: "cube" | "target" | "robot" | "obstacle";
  x: number;
  y: number;
  color: string;
  label: string;
};

const GRID = 12;
const CELL = 48;

export default function TwinSimulation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [objects, setObjects] = useState<WorldObject[]>([
    { id: "robot", type: "robot", x: 1, y: 1, color: "#34d399", label: "Robot" },
    { id: "cube1", type: "cube", x: 5, y: 3, color: "#60a5fa", label: "Cube A" },
    { id: "cube2", type: "cube", x: 8, y: 6, color: "#f472b6", label: "Cube B" },
    { id: "target1", type: "target", x: 10, y: 2, color: "#fb923c", label: "Target 1" },
    { id: "target2", type: "target", x: 3, y: 9, color: "#a78bfa", label: "Target 2" },
    { id: "obs1", type: "obstacle", x: 4, y: 5, color: "#6b7280", label: "Wall" },
    { id: "obs2", type: "obstacle", x: 4, y: 6, color: "#6b7280", label: "Wall" },
    { id: "obs3", type: "obstacle", x: 4, y: 7, color: "#6b7280", label: "Wall" },
  ]);
  const [selected, setSelected] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>(["Twin simulation initialized.", "World loaded — 7 objects detected."]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = GRID * CELL;
    canvas.height = GRID * CELL;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = "rgba(52,211,153,0.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, GRID * CELL); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * CELL); ctx.lineTo(GRID * CELL, i * CELL); ctx.stroke();
    }

    // Objects
    objects.forEach((obj) => {
      const px = obj.x * CELL;
      const py = obj.y * CELL;
      const isSelected = obj.id === selected;

      ctx.save();
      if (isSelected) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = obj.color;
      }

      if (obj.type === "robot") {
        ctx.fillStyle = obj.color + "20";
        ctx.beginPath(); ctx.arc(px + CELL/2, py + CELL/2, CELL/2 - 2, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = obj.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = obj.color;
        ctx.font = "20px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("🤖", px + CELL/2, py + CELL/2);
      } else if (obj.type === "cube") {
        ctx.fillStyle = obj.color + "30";
        ctx.fillRect(px + 6, py + 6, CELL - 12, CELL - 12);
        ctx.strokeStyle = obj.color;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(px + 6, py + 6, CELL - 12, CELL - 12);
      } else if (obj.type === "target") {
        ctx.strokeStyle = obj.color;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(px + 4, py + 4, CELL - 8, CELL - 8);
        ctx.setLineDash([]);
        ctx.fillStyle = obj.color;
        ctx.font = "16px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("◎", px + CELL/2, py + CELL/2);
      } else {
        ctx.fillStyle = obj.color + "60";
        ctx.fillRect(px + 2, py + 2, CELL - 4, CELL - 4);
        ctx.strokeStyle = obj.color;
        ctx.lineWidth = 1;
        ctx.strokeRect(px + 2, py + 2, CELL - 4, CELL - 4);
      }

      // Label
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "8px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(obj.label, px + CELL/2, py + CELL - 2);

      ctx.restore();
    });
  }, [objects, selected]);

  function handleCanvasClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor(((e.clientX - rect.left) * scaleX) / CELL);
    const y = Math.floor(((e.clientY - rect.top) * scaleY) / CELL);

    const clicked = objects.find(o => o.x === x && o.y === y);
    if (clicked) {
      setSelected(clicked.id);
      setLog(prev => [`Selected: ${clicked.label} at (${x}, ${y})`, ...prev]);
    } else if (selected) {
      const robot = objects.find(o => o.id === "robot");
      if (selected === "robot") {
        setObjects(prev => prev.map(o => o.id === "robot" ? { ...o, x, y } : o));
        setLog(prev => [`Robot moved to (${x}, ${y})`, ...prev]);
      }
    }
  }

  async function runSimulation() {
    setRunning(true);
    setLog(prev => ["▶ Simulation started...", ...prev]);
    const robot = objects.find(o => o.id === "robot");
    const cube = objects.find(o => o.id === "cube1");
    const target = objects.find(o => o.id === "target1");
    if (!robot || !cube || !target) { setRunning(false); return; }

    await new Promise(r => setTimeout(r, 800));
    setObjects(prev => prev.map(o => o.id === "robot" ? { ...o, x: cube.x, y: cube.y } : o));
    setLog(prev => ["Robot → moving to Cube A...", ...prev]);

    await new Promise(r => setTimeout(r, 1000));
    setLog(prev => ["Robot → picking up Cube A...", ...prev]);

    await new Promise(r => setTimeout(r, 800));
    setObjects(prev => prev.map(o =>
      o.id === "robot" ? { ...o, x: target.x, y: target.y } :
      o.id === "cube1" ? { ...o, x: target.x, y: target.y } : o
    ));
    setLog(prev => ["Robot → placing Cube A at Target 1 ✓", ...prev]);

    await new Promise(r => setTimeout(r, 500));
    setLog(prev => ["✓ Simulation complete!", ...prev]);
    setRunning(false);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[auto_1fr]">

        {/* Canvas */}
        <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">World Simulation</h3>
            <span className="text-xs text-white/30">Click to select · Click robot then grid to move</span>
          </div>
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            style={{ width: "100%", maxWidth: GRID * CELL, cursor: "crosshair", border: "1px solid rgba(52,211,153,0.1)", borderRadius: 16 }}
          />
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
            <h3 className="mb-4 text-sm font-semibold text-white">Simulation Controls</h3>
            <div className="space-y-3">
              <button
                onClick={runSimulation}
                disabled={running}
                className="w-full rounded-2xl border border-emerald-400/30 bg-emerald-400/15 px-4 py-3 text-sm font-medium text-emerald-200 hover:bg-emerald-400/25 disabled:opacity-40 transition"
              >
                {running ? "▶ Running..." : "▶ Run Pick & Place"}
              </button>
              <button
                onClick={() => {
                  setObjects(DEMO_ROBOTS => [
                    { id: "robot", type: "robot", x: 1, y: 1, color: "#34d399", label: "Robot" },
                    { id: "cube1", type: "cube", x: 5, y: 3, color: "#60a5fa", label: "Cube A" },
                    { id: "cube2", type: "cube", x: 8, y: 6, color: "#f472b6", label: "Cube B" },
                    { id: "target1", type: "target", x: 10, y: 2, color: "#fb923c", label: "Target 1" },
                    { id: "target2", type: "target", x: 3, y: 9, color: "#a78bfa", label: "Target 2" },
                    { id: "obs1", type: "obstacle", x: 4, y: 5, color: "#6b7280", label: "Wall" },
                    { id: "obs2", type: "obstacle", x: 4, y: 6, color: "#6b7280", label: "Wall" },
                    { id: "obs3", type: "obstacle", x: 4, y: 7, color: "#6b7280", label: "Wall" },
                  ]);
                  setLog(prev => ["World reset to default.", ...prev]);
                }}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/60 hover:text-white transition"
              >
                ↺ Reset World
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
            <h3 className="mb-3 text-sm font-semibold text-white">Legend</h3>
            <div className="space-y-2 text-xs">
              {[
                { color: "#34d399", label: "Robot unit" },
                { color: "#60a5fa", label: "Cube / Object" },
                { color: "#fb923c", label: "Target zone" },
                { color: "#6b7280", label: "Obstacle / Wall" },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded" style={{ background: l.color }} />
                  <span className="text-white/50">{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Log */}
          <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
            <h3 className="mb-3 text-sm font-semibold text-white">Simulation Log</h3>
            <div className="space-y-1.5 overflow-y-auto" style={{ maxHeight: 200 }}>
              {log.map((l, i) => (
                <div key={i} className="text-xs font-mono text-emerald-300/60">{l}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
