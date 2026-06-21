"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Robot = {
  id: string;
  name: string;
  type: string;
  status: "online" | "idle" | "offline" | "executing";
  battery: number;
  lastAction: string;
  location: string;
  uptime: string;
};

const DEMO_ROBOTS: Robot[] = [
  { id: "ARM-01", name: "Atlas Prime", type: "Humanoid Arm", status: "online", battery: 94, lastAction: "Pick and place — red cube", location: "Zone A", uptime: "12h 34m" },
  { id: "ARM-02", name: "Nexus Core", type: "Industrial Arm", status: "executing", battery: 78, lastAction: "Move to target x:12 y:8", location: "Zone B", uptime: "8h 12m" },
  { id: "MOB-01", name: "Rover X1", type: "Mobile Robot", status: "idle", battery: 100, lastAction: "Inspection complete", location: "Zone C", uptime: "24h 00m" },
  { id: "MOB-02", name: "Scout Alpha", type: "Mobile Scout", status: "offline", battery: 12, lastAction: "Battery low — docked", location: "Charging Bay", uptime: "0h 00m" },
];

const STATUS_COLORS = {
  online: "#34d399",
  executing: "#60a5fa",
  idle: "#a78bfa",
  offline: "#ef4444",
};

const STATUS_LABELS = {
  online: "Online",
  executing: "Executing",
  idle: "Idle",
  offline: "Offline",
};

export default function RobotFleet() {
  const [robots, setRobots] = useState<Robot[]>(DEMO_ROBOTS);
  const [selected, setSelected] = useState<Robot | null>(null);
  const [command, setCommand] = useState("");
  const [log, setLog] = useState<string[]>(["System initialized.", "Fleet scan complete — 4 units found."]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate battery drain
      setRobots(prev => prev.map(r => ({
        ...r,
        battery: r.status === "executing" ? Math.max(r.battery - 0.1, 0) : r.battery,
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  function sendCommand() {
    if (!command.trim() || !selected) return;
    setLog(prev => [`[${new Date().toLocaleTimeString()}] ${selected.name}: ${command}`, ...prev]);
    setRobots(prev => prev.map(r =>
      r.id === selected.id
        ? { ...r, status: "executing", lastAction: command }
        : r
    ));
    setCommand("");
    setTimeout(() => {
      setRobots(prev => prev.map(r =>
        r.id === selected?.id ? { ...r, status: "online" } : r
      ));
      setLog(prev => [`[${new Date().toLocaleTimeString()}] ${selected?.name}: Command completed ✓`, ...prev]);
    }, 3000);
  }

  return (
    <div className="space-y-6">

      {/* Fleet Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {robots.map((robot) => (
          <button
            key={robot.id}
            onClick={() => setSelected(robot)}
            className={`rounded-3xl border p-5 text-left transition ${
              selected?.id === robot.id
                ? "border-emerald-400/40 bg-emerald-400/[0.07]"
                : "border-white/10 bg-black/20 hover:border-white/20"
            }`}
          >
            {/* Robot visual */}
            <div className="mb-4 flex items-center justify-between">
              <div className="relative h-12 w-12 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-2xl">
                {robot.type.includes("Mobile") ? "🤖" : "🦾"}
                <span
                  className="absolute -top-1 -right-1 h-3 w-3 rounded-full"
                  style={{ background: STATUS_COLORS[robot.status] }}
                />
              </div>
              <span className="rounded-full px-2 py-1 text-xs font-medium"
                style={{ color: STATUS_COLORS[robot.status], background: STATUS_COLORS[robot.status] + "15", border: `1px solid ${STATUS_COLORS[robot.status]}30` }}>
                {STATUS_LABELS[robot.status]}
              </span>
            </div>

            <div className="text-sm font-semibold text-white">{robot.name}</div>
            <div className="text-xs text-white/40 mt-0.5">{robot.id} — {robot.type}</div>

            {/* Battery */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-white/40 mb-1">
                <span>Battery</span>
                <span>{Math.round(robot.battery)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10">
                <div
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: `${robot.battery}%`,
                    background: robot.battery > 50 ? "#34d399" : robot.battery > 20 ? "#fb923c" : "#ef4444"
                  }}
                />
              </div>
            </div>

            <div className="mt-2 text-xs text-white/30 truncate">{robot.lastAction}</div>
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">

        {/* Command Panel */}
        <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">
            {selected ? `Command: ${selected.name}` : "Select a Robot"}
          </h3>

          {selected ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-white/40">Unit ID</span><span className="text-white">{selected.id}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Location</span><span className="text-white">{selected.location}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Uptime</span><span className="text-white">{selected.uptime}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Last Action</span><span className="text-white text-right max-w-[60%]">{selected.lastAction}</span></div>
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendCommand()}
                  placeholder="Send command to robot..."
                  className="flex-1 rounded-2xl border border-white/10 bg-[#08110d] px-4 py-3 text-sm text-emerald-100 outline-none focus:border-emerald-400/40"
                />
                <button
                  onClick={sendCommand}
                  className="rounded-2xl border border-emerald-400/30 bg-emerald-400/15 px-4 py-3 text-sm text-emerald-200 hover:bg-emerald-400/25 transition"
                >
                  Send
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {["Pick red cube", "Inspect state", "Move to target", "Reset position"].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => setCommand(cmd)}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/60 hover:text-white transition text-left"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-white/30">
              Click a robot unit above to select and control it
            </div>
          )}
        </div>

        {/* Command Log */}
        <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Command Log</h3>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="space-y-2 overflow-y-auto" style={{ maxHeight: "320px" }}>
            {log.map((entry, i) => (
              <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2 font-mono text-xs text-emerald-300/70 animate-fade-in">
                {entry}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link
              href="/builder"
              className="block rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-center text-emerald-200 hover:bg-emerald-400/15 transition"
            >
              Generate Robot API →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
