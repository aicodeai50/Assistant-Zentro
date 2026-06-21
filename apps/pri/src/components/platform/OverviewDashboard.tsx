"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const MODULES = [
  { label: "API Builder", icon: "⟨/⟩", href: "/builder", desc: "Generate real backend endpoints from plain language", status: "online", color: "#00ffe7" },
  { label: "Robot Fleet", icon: "⬢", href: "/platform/robots", desc: "Monitor and command your robot units", status: "online", color: "#0ea5e9" },
  { label: "ARIA Brain", icon: "◎", href: "/platform/brain", desc: "Talk to your AI in natural language", status: "online", color: "#a855f7" },
  { label: "Digital Twin", icon: "⬡", href: "/platform/twin", desc: "Simulate before deploying to real world", status: "online", color: "#f59e0b" },
  { label: "Agents", icon: "◆", href: "/platform/agents", desc: "Autonomous AI workers and mission executors", status: "standby", color: "#0ea5e9" },
  { label: "Studio", icon: "▣", href: "/platform/studio", desc: "Creator tools, video, and AI visuals", status: "standby", color: "#a855f7" },
  { label: "Avatars", icon: "◉", href: "/platform/avatars", desc: "Digital identity and face scan system", status: "building", color: "#f59e0b" },
  { label: "Wallet", icon: "◐", href: "/platform/wallet", desc: "Token economy and billing management", status: "online", color: "#00ffe7" },
];

const SYSTEMS = [
  { name: "Robot Runtime", latency: "12ms", ok: true },
  { name: "API Generator", latency: "48ms", ok: true },
  { name: "ARIA Brain", latency: "120ms", ok: true },
  { name: "Token Engine", latency: "8ms", ok: true },
  { name: "Simulation Core", latency: "--", ok: false },
  { name: "Avatar System", latency: "--", ok: false },
];

const FEED = [
  { msg: "pick_and_place_api — endpoint executed", t: "just now", c: "#00ffe7" },
  { msg: "Robot ARM-01 — Pick and place complete", t: "2m ago", c: "#0ea5e9" },
  { msg: "inspection_workflow — saved to registry", t: "5m ago", c: "#a855f7" },
  { msg: "500 tokens purchased via Lemon Squeezy", t: "12m ago", c: "#f59e0b" },
  { msg: "Agent watchdog — mission started", t: "18m ago", c: "#0ea5e9" },
  { msg: "Digital twin simulation — completed", t: "25m ago", c: "#00ffe7" },
];

function Dot({ color = "#00ffe7", pulse = false }: { color?: string; pulse?: boolean }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8, flexShrink: 0 }}>
      {pulse && <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color, opacity: 0.4, animation: "ping 1.5s infinite" }} />}
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "block", boxShadow: `0 0 6px ${color}` }} />
    </span>
  );
}

export default function OverviewDashboard() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toUTCString().slice(0, 25));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

      {/* ── Hero Banner ── */}
      <div style={{
        borderRadius: 20,
        border: "1px solid rgba(0,255,231,0.15)",
        background: "linear-gradient(135deg, rgba(0,255,231,0.04) 0%, rgba(14,165,233,0.03) 50%, rgba(168,85,247,0.03) 100%)",
        padding: "40px 48px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Corner accents */}
        <div style={{ position: "absolute", top: 12, left: 12, width: 20, height: 20, borderTop: "1px solid rgba(0,255,231,0.4)", borderLeft: "1px solid rgba(0,255,231,0.4)" }} />
        <div style={{ position: "absolute", bottom: 12, right: 12, width: 20, height: 20, borderBottom: "1px solid rgba(0,255,231,0.4)", borderRight: "1px solid rgba(0,255,231,0.4)" }} />

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <Dot color="#00ffe7" pulse />
              <span style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(0,255,231,0.5)", textTransform: "uppercase" }}>
                SHYNVO PRI — ALL SYSTEMS NOMINAL
              </span>
            </div>
            <h1 style={{ fontSize: 42, fontWeight: 800, color: "white", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16 }}>
              Mission<br />
              <span style={{ color: "#00ffe7", textShadow: "0 0 30px rgba(0,255,231,0.4)" }}>Command Center</span>
            </h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, maxWidth: 480 }}>
              AI infrastructure, robotics workflows, digital twins, avatars, agents, and platform operations — unified in one planetary interface.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <Link href="/builder" style={{
                padding: "12px 28px", borderRadius: 10,
                border: "1px solid rgba(0,255,231,0.3)",
                background: "rgba(0,255,231,0.08)",
                color: "#00ffe7", textDecoration: "none",
                fontSize: 13, fontWeight: 600,
                letterSpacing: "0.05em",
              }}>
                + Generate API
              </Link>
              <Link href="/platform/robots" style={{
                padding: "12px 28px", borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                color: "rgba(255,255,255,0.6)", textDecoration: "none",
                fontSize: 13, letterSpacing: "0.05em",
              }}>
                Robot Fleet →
              </Link>
              <Link href="/platform/brain" style={{
                padding: "12px 28px", borderRadius: 10,
                border: "1px solid rgba(168,85,247,0.2)",
                background: "rgba(168,85,247,0.06)",
                color: "#a855f7", textDecoration: "none",
                fontSize: 13, letterSpacing: "0.05em",
              }}>
                Talk to ARIA →
              </Link>
            </div>
          </div>

          {/* Live clock */}
          <div style={{
            borderRadius: 16,
            border: "1px solid rgba(0,255,231,0.1)",
            background: "rgba(0,10,15,0.6)",
            padding: "24px 32px",
            textAlign: "right",
            minWidth: 220,
          }}>
            <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "rgba(0,255,231,0.3)", textTransform: "uppercase", marginBottom: 10 }}>UTC Clock</div>
            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 13, color: "#00ffe7", letterSpacing: "0.05em" }}>{time}</div>
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Environment", value: "Production" },
                { label: "Mode", value: "Strategic" },
                { label: "Build", value: "v2.0.1" },
              ].map(r => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{r.label}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Module Grid ── */}
      <div>
        <div style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "rgba(0,255,231,0.3)", textTransform: "uppercase", marginBottom: 4 }}>Platform Modules</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "white" }}>Active Systems</h2>
          </div>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>{MODULES.length} modules loaded</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {MODULES.map((m) => (
            <Link key={m.label} href={m.href} style={{ textDecoration: "none" }}>
              <div style={{
                borderRadius: 16,
                border: `1px solid ${m.color}18`,
                background: "rgba(0,8,14,0.7)",
                padding: "24px 28px",
                transition: "all 0.2s",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.border = `1px solid ${m.color}40`;
                (e.currentTarget as HTMLDivElement).style.background = `rgba(0,8,14,0.9)`;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px ${m.color}10`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.border = `1px solid ${m.color}18`;
                (e.currentTarget as HTMLDivElement).style.background = "rgba(0,8,14,0.7)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    border: `1px solid ${m.color}30`,
                    background: `${m.color}10`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, color: m.color,
                  }}>
                    {m.icon}
                  </div>
                  <span style={{
                    fontSize: 9, fontWeight: 600, letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: m.status === "online" ? "#00ffe7" : m.status === "standby" ? "#f59e0b" : "#a855f7",
                    padding: "3px 8px", borderRadius: 999,
                    border: `1px solid ${m.status === "online" ? "rgba(0,255,231,0.2)" : m.status === "standby" ? "rgba(245,158,11,0.2)" : "rgba(168,85,247,0.2)"}`,
                    background: `${m.status === "online" ? "rgba(0,255,231,0.06)" : m.status === "standby" ? "rgba(245,158,11,0.06)" : "rgba(168,85,247,0.06)"}`,
                  }}>
                    {m.status}
                  </span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "white", marginBottom: 8 }}>{m.label}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>{m.desc}</div>
                <div style={{ marginTop: 16, fontSize: 11, color: m.color, opacity: 0.6, letterSpacing: "0.05em" }}>
                  Open {m.label} →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── System Status + Live Feed ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

        {/* System Status */}
        <div style={{
          borderRadius: 20,
          border: "1px solid rgba(0,255,231,0.08)",
          background: "rgba(0,8,14,0.8)",
          padding: "32px",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "rgba(0,255,231,0.3)", textTransform: "uppercase", marginBottom: 4 }}>Infrastructure</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "white" }}>System Status</h3>
            </div>
            <span style={{
              fontSize: 9, padding: "4px 10px", borderRadius: 999,
              border: "1px solid rgba(0,255,231,0.2)",
              background: "rgba(0,255,231,0.06)",
              color: "#00ffe7", letterSpacing: "0.1em", textTransform: "uppercase",
            }}>All Nominal</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {SYSTEMS.map((s) => (
              <div key={s.name} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 18px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.04)",
                background: "rgba(255,255,255,0.02)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Dot color={s.ok ? "#00ffe7" : "rgba(255,255,255,0.15)"} pulse={s.ok} />
                  <span style={{ fontSize: 13, color: s.ok ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)" }}>{s.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>{s.latency}</span>
                  <span style={{ fontSize: 11, fontWeight: 500, color: s.ok ? "#00ffe7" : "rgba(255,255,255,0.2)" }}>
                    {s.ok ? "Online" : "Standby"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Feed */}
        <div style={{
          borderRadius: 20,
          border: "1px solid rgba(0,255,231,0.08)",
          background: "rgba(0,8,14,0.8)",
          padding: "32px",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "rgba(0,255,231,0.3)", textTransform: "uppercase", marginBottom: 4 }}>Real-time</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "white" }}>Activity Feed</h3>
            </div>
            <Dot color="#00ffe7" pulse />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FEED.map((f, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "12px 16px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.04)",
                background: "rgba(255,255,255,0.02)",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: f.c, flexShrink: 0, boxShadow: `0 0 6px ${f.c}` }} />
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", flex: 1, lineHeight: 1.5 }}>{f.msg}</span>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", flexShrink: 0 }}>{f.t}</span>
              </div>
            ))}
          </div>
          <Link href="/platform/runs" style={{
            display: "block", marginTop: 20,
            padding: "12px", borderRadius: 10, textAlign: "center",
            border: "1px solid rgba(0,255,231,0.1)",
            background: "rgba(0,255,231,0.03)",
            color: "rgba(0,255,231,0.5)", textDecoration: "none",
            fontSize: 12, letterSpacing: "0.05em",
          }}>
            View all runs →
          </Link>
        </div>
      </div>

      <style>{`@keyframes ping { 75%,100% { transform:scale(2.2); opacity:0; } }`}</style>
    </div>
  );
}
