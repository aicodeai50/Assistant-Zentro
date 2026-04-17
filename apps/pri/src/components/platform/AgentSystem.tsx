"use client";

import { useState } from "react";
import Link from "next/link";

type Agent = {
  id: string;
  name: string;
  role: string;
  status: "running" | "idle" | "error" | "paused";
  task: string;
  runs: number;
  color: string;
  icon: string;
};

const DEFAULT_AGENTS: Agent[] = [
  { id: "a1", name: "Watchdog Alpha", role: "Robot Monitor", status: "running", task: "Monitoring ARM-01 for grip failures", runs: 142, color: "#00ffe7", icon: "◈" },
  { id: "a2", name: "Scheduler Prime", role: "Task Agent", status: "idle", task: "Waiting for next workflow trigger", runs: 89, color: "#0ea5e9", icon: "▷" },
  { id: "a3", name: "Inspector X", role: "Robot Agent", status: "running", task: "Running inspection loop on Zone B", runs: 234, color: "#a855f7", icon: "◎" },
  { id: "a4", name: "Data Courier", role: "Tool Agent", status: "paused", task: "API sync paused — awaiting token refill", runs: 56, color: "#f59e0b", icon: "◆" },
];

const STATUS_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  running: { color: "#00ffe7", bg: "rgba(0,255,231,0.06)", border: "rgba(0,255,231,0.2)" },
  idle: { color: "#a855f7", bg: "rgba(168,85,247,0.06)", border: "rgba(168,85,247,0.2)" },
  error: { color: "#ef4444", bg: "rgba(239,68,68,0.06)", border: "rgba(239,68,68,0.2)" },
  paused: { color: "#f59e0b", bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.2)" },
};

export default function AgentSystem() {
  const [agents, setAgents] = useState<Agent[]>(DEFAULT_AGENTS);
  const [selected, setSelected] = useState<Agent | null>(null);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("Task Agent");
  const [newTask, setNewTask] = useState("");
  const [log, setLog] = useState<string[]>(["Agent system online.", "4 agents loaded and registered."]);

  function addLog(msg: string) {
    setLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 20)]);
  }

  function toggleAgent(id: string) {
    setAgents(prev => prev.map(a => {
      if (a.id !== id) return a;
      const next = a.status === "running" ? "paused" : "running";
      addLog(`${a.name} — ${next}`);
      return { ...a, status: next };
    }));
  }

  function deleteAgent(id: string) {
    const a = agents.find(x => x.id === id);
    setAgents(prev => prev.filter(x => x.id !== id));
    if (selected?.id === id) setSelected(null);
    addLog(`${a?.name} removed from registry`);
  }

  function createAgent() {
    if (!newName.trim() || !newTask.trim()) return;
    const colors = ["#00ffe7", "#0ea5e9", "#a855f7", "#f59e0b"];
    const icons = ["◈", "▷", "◎", "◆"];
    const idx = agents.length % 4;
    const agent: Agent = {
      id: `a${Date.now()}`,
      name: newName,
      role: newRole,
      status: "idle",
      task: newTask,
      runs: 0,
      color: colors[idx],
      icon: icons[idx],
    };
    setAgents(prev => [...prev, agent]);
    addLog(`${newName} deployed — awaiting first mission`);
    setNewName(""); setNewTask(""); setCreating(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

      {/* Header */}
      <div style={{
        borderRadius: 20,
        border: "1px solid rgba(0,255,231,0.1)",
        background: "rgba(0,8,14,0.8)",
        padding: "36px 40px",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(0,255,231,0.3)", textTransform: "uppercase", marginBottom: 10 }}>Automation</div>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: "white", marginBottom: 12 }}>Agent System</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, maxWidth: 520 }}>
              Deploy autonomous AI agents that reason, use tools, call APIs, build workflows, and operate as independent units inside the platform. Each agent runs its own mission loop.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/platform/brain" style={{
              padding: "11px 22px", borderRadius: 10,
              border: "1px solid rgba(168,85,247,0.25)",
              background: "rgba(168,85,247,0.08)",
              color: "#a855f7", textDecoration: "none",
              fontSize: 12, fontWeight: 600, letterSpacing: "0.05em",
            }}>Open ARIA Brain</Link>
            <button onClick={() => setCreating(true)} style={{
              padding: "11px 22px", borderRadius: 10,
              border: "1px solid rgba(0,255,231,0.25)",
              background: "rgba(0,255,231,0.08)",
              color: "#00ffe7", fontSize: 12, fontWeight: 600,
              cursor: "pointer", letterSpacing: "0.05em",
            }}>+ Deploy Agent</button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 32 }}>
          {[
            { label: "Total Agents", value: agents.length },
            { label: "Running", value: agents.filter(a => a.status === "running").length },
            { label: "Total Runs", value: agents.reduce((s, a) => s + a.runs, 0) },
            { label: "Idle", value: agents.filter(a => a.status === "idle").length },
          ].map(s => (
            <div key={s.label} style={{
              borderRadius: 12,
              border: "1px solid rgba(0,255,231,0.06)",
              background: "rgba(0,255,231,0.02)",
              padding: "18px 20px",
            }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#00ffe7" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4, letterSpacing: "0.05em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Agent Modal */}
      {creating && (
        <div style={{
          borderRadius: 20,
          border: "1px solid rgba(0,255,231,0.2)",
          background: "rgba(0,12,20,0.95)",
          padding: "36px 40px",
        }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "white", marginBottom: 24 }}>Deploy New Agent</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 11, color: "rgba(0,255,231,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Agent Name</label>
              <input
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="e.g. Recon Delta"
                style={{ width: "100%", background: "rgba(0,10,15,0.8)", border: "1px solid rgba(0,255,231,0.15)", borderRadius: 10, padding: "12px 16px", color: "#00ffe7", fontSize: 13, outline: "none", fontFamily: "var(--font-geist-mono)", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, color: "rgba(0,255,231,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Role</label>
              <select
                value={newRole}
                onChange={e => setNewRole(e.target.value)}
                style={{ width: "100%", background: "rgba(0,10,15,0.8)", border: "1px solid rgba(0,255,231,0.15)", borderRadius: 10, padding: "12px 16px", color: "#00ffe7", fontSize: 13, outline: "none", boxSizing: "border-box" }}
              >
                {["Task Agent", "Robot Agent", "Tool Agent", "Monitor Agent", "Mission Agent"].map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 11, color: "rgba(0,255,231,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Mission / Task</label>
            <input
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              placeholder="Describe what this agent should do..."
              style={{ width: "100%", background: "rgba(0,10,15,0.8)", border: "1px solid rgba(0,255,231,0.15)", borderRadius: 10, padding: "12px 16px", color: "#00ffe7", fontSize: 13, outline: "none", fontFamily: "var(--font-geist-mono)", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={createAgent} style={{ padding: "11px 28px", borderRadius: 10, border: "1px solid rgba(0,255,231,0.3)", background: "rgba(0,255,231,0.1)", color: "#00ffe7", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              Deploy Agent
            </button>
            <button onClick={() => setCreating(false)} style={{ padding: "11px 20px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "rgba(255,255,255,0.4)", fontSize: 13, cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Agent Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
        {agents.map(agent => {
          const ss = STATUS_STYLE[agent.status];
          const isSelected = selected?.id === agent.id;
          return (
            <div
              key={agent.id}
              onClick={() => setSelected(isSelected ? null : agent)}
              style={{
                borderRadius: 18,
                border: isSelected ? `1px solid ${agent.color}50` : "1px solid rgba(255,255,255,0.06)",
                background: isSelected ? `${agent.color}06` : "rgba(0,8,14,0.8)",
                padding: "28px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  border: `1px solid ${agent.color}30`,
                  background: `${agent.color}10`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, color: agent.color,
                }}>
                  {agent.icon}
                </div>
                <span style={{
                  fontSize: 9, fontWeight: 600, letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: ss.color, padding: "3px 9px", borderRadius: 999,
                  border: `1px solid ${ss.border}`,
                  background: ss.bg,
                }}>
                  {agent.status}
                </span>
              </div>

              <div style={{ fontSize: 16, fontWeight: 700, color: "white", marginBottom: 4 }}>{agent.name}</div>
              <div style={{ fontSize: 11, color: agent.color, marginBottom: 14, letterSpacing: "0.05em", opacity: 0.7 }}>{agent.role}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, marginBottom: 20 }}>{agent.task}</div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>{agent.runs} runs</span>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={e => { e.stopPropagation(); toggleAgent(agent.id); }}
                    style={{
                      padding: "6px 14px", borderRadius: 8, fontSize: 11, cursor: "pointer", fontWeight: 600,
                      border: agent.status === "running" ? "1px solid rgba(245,158,11,0.3)" : "1px solid rgba(0,255,231,0.3)",
                      background: agent.status === "running" ? "rgba(245,158,11,0.08)" : "rgba(0,255,231,0.08)",
                      color: agent.status === "running" ? "#f59e0b" : "#00ffe7",
                    }}
                  >
                    {agent.status === "running" ? "Pause" : "Run"}
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); deleteAgent(agent.id); }}
                    style={{ padding: "6px 10px", borderRadius: 8, fontSize: 11, cursor: "pointer", border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.06)", color: "#ef4444" }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Log */}
      <div style={{ borderRadius: 20, border: "1px solid rgba(0,255,231,0.08)", background: "rgba(0,8,14,0.8)", padding: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ffe7", boxShadow: "0 0 6px #00ffe7", animation: "ping 1.5s infinite" }} />
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "white" }}>Mission Log</h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 200, overflowY: "auto" }}>
          {log.map((l, i) => (
            <div key={i} style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, color: "rgba(0,255,231,0.5)", padding: "8px 12px", borderRadius: 8, background: "rgba(0,255,231,0.02)", border: "1px solid rgba(0,255,231,0.05)" }}>
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
