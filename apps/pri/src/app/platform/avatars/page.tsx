"use client";
import PlatformLayout from "@/components/platform/PlatformLayout";
import { useState } from "react";

const AVATAR_PRESETS = [
  { id: "a1", name: "NEXUS-7", type: "Combat Unit", color: "#00ffe7", icon: "🤖", desc: "High-precision tactical robot avatar with enhanced targeting systems" },
  { id: "a2", name: "ARIA-X", type: "AI Entity", color: "#a855f7", icon: "◎", desc: "Neural intelligence avatar — linked to Brain module and agent workflows" },
  { id: "a3", name: "PHANTOM", type: "Stealth Unit", color: "#0ea5e9", icon: "◈", desc: "Recon-class avatar optimized for silent operations and data gathering" },
  { id: "a4", name: "TITAN-3", type: "Heavy Unit", color: "#f59e0b", icon: "⬢", desc: "Industrial-grade avatar for warehouse and heavy-load robot operations" },
];

export default function AvatarsPage() {
  const [selected, setSelected] = useState(AVATAR_PRESETS[0]);
  const [name, setName] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  function startScan() {
    setScanning(true);
    setTimeout(() => { setScanning(false); setScanned(true); }, 2500);
  }

  return (
    <PlatformLayout title="Avatars" subtitle="Digital identity, face scan, and robot persona generation.">
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

        {/* Hero */}
        <div style={{ borderRadius: 20, border: "1px solid rgba(168,85,247,0.15)", background: "linear-gradient(135deg, rgba(168,85,247,0.04), rgba(0,255,231,0.03))", padding: "40px 48px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 12, left: 12, width: 20, height: 20, borderTop: "1px solid rgba(168,85,247,0.4)", borderLeft: "1px solid rgba(168,85,247,0.4)" }} />
          <div style={{ position: "absolute", bottom: 12, right: 12, width: 20, height: 20, borderBottom: "1px solid rgba(168,85,247,0.4)", borderRight: "1px solid rgba(168,85,247,0.4)" }} />
          <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(168,85,247,0.5)", textTransform: "uppercase", marginBottom: 12 }}>Identity System</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>
            Avatar <span style={{ color: "#a855f7", textShadow: "0 0 30px rgba(168,85,247,0.4)" }}>Studio</span>
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, maxWidth: 560 }}>
            Create your digital identity. Choose a robot persona, scan your face, generate an AI avatar, and attach it to your agents, workflows, and platform presence.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

          {/* Avatar Selector */}
          <div style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,8,14,0.8)", padding: "32px" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "rgba(168,85,247,0.4)", textTransform: "uppercase", marginBottom: 8 }}>Choose Persona</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "white", marginBottom: 24 }}>Robot Identity</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {AVATAR_PRESETS.map(a => (
                <div
                  key={a.id}
                  onClick={() => setSelected(a)}
                  style={{
                    display: "flex", alignItems: "center", gap: 16,
                    padding: "16px 20px", borderRadius: 14, cursor: "pointer",
                    border: selected.id === a.id ? `1px solid ${a.color}40` : "1px solid rgba(255,255,255,0.04)",
                    background: selected.id === a.id ? `${a.color}08` : "rgba(255,255,255,0.02)",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, border: `1px solid ${a.color}30`, background: `${a.color}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                    {a.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "white" }}>{a.name}</div>
                    <div style={{ fontSize: 11, color: a.color, opacity: 0.7, marginTop: 2 }}>{a.type}</div>
                  </div>
                  {selected.id === a.id && <span style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, boxShadow: `0 0 8px ${a.color}` }} />}
                </div>
              ))}
            </div>
          </div>

          {/* Avatar Preview + Face Scan */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Preview */}
            <div style={{ borderRadius: 20, border: `1px solid ${selected.color}20`, background: "rgba(0,8,14,0.8)", padding: "32px", flex: 1 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.25em", color: `${selected.color}60`, textTransform: "uppercase", marginBottom: 8 }}>Active Avatar</div>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
                <div style={{
                  width: 80, height: 80, borderRadius: 20,
                  border: `2px solid ${selected.color}40`,
                  background: `${selected.color}10`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 36,
                  boxShadow: `0 0 30px ${selected.color}20`,
                  animation: "float 3s ease-in-out infinite",
                }}>
                  {selected.icon}
                </div>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: "white" }}>{selected.name}</div>
                  <div style={{ fontSize: 12, color: selected.color, marginTop: 4 }}>{selected.type}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 6, lineHeight: 1.5 }}>{selected.desc}</div>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 11, color: "rgba(0,255,231,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Custom Name</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={`e.g. My ${selected.name}`}
                  style={{ width: "100%", background: "rgba(0,10,15,0.8)", border: "1px solid rgba(0,255,231,0.12)", borderRadius: 10, padding: "11px 14px", color: "#00ffe7", fontSize: 13, outline: "none", boxSizing: "border-box" }}
                />
              </div>
            </div>

            {/* Face Scan */}
            <div style={{ borderRadius: 20, border: "1px solid rgba(0,255,231,0.08)", background: "rgba(0,8,14,0.8)", padding: "28px" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 8 }}>Face Scan</div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, marginBottom: 16 }}>
                Capture your appearance and generate a personalized robot identity.
              </p>
              {scanned ? (
                <div style={{ padding: "14px", borderRadius: 10, border: "1px solid rgba(0,255,231,0.2)", background: "rgba(0,255,231,0.06)", color: "#00ffe7", fontSize: 12, textAlign: "center" }}>
                  ✓ Identity scan complete — {name || selected.name} is active
                </div>
              ) : (
                <button
                  onClick={startScan}
                  disabled={scanning}
                  style={{ width: "100%", padding: "12px", borderRadius: 10, border: "1px solid rgba(168,85,247,0.3)", background: scanning ? "rgba(168,85,247,0.03)" : "rgba(168,85,247,0.08)", color: scanning ? "rgba(168,85,247,0.4)" : "#a855f7", fontSize: 13, fontWeight: 600, cursor: scanning ? "not-allowed" : "pointer" }}
                >
                  {scanning ? "⟳ Scanning identity..." : "◉ Start Face Scan"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Identity Cards */}
        <div style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,8,14,0.8)", padding: "32px" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "rgba(168,85,247,0.4)", textTransform: "uppercase", marginBottom: 8 }}>Capabilities</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "white", marginBottom: 24 }}>What Avatars Unlock</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { icon: "◉", title: "Face Identity", desc: "Link your real appearance to a digital robot persona", color: "#a855f7" },
              { icon: "◎", title: "Agent Presence", desc: "Your avatar represents you inside ARIA and agent workflows", color: "#00ffe7" },
              { icon: "⬢", title: "Robot Persona", desc: "Attach identity to robot fleet and simulation units", color: "#0ea5e9" },
              { icon: "▣", title: "Studio Profile", desc: "Use avatar in content creation, video, and publishing", color: "#f59e0b" },
            ].map(c => (
              <div key={c.title} style={{ borderRadius: 14, border: `1px solid ${c.color}15`, background: `${c.color}05`, padding: "22px" }}>
                <div style={{ fontSize: 24, color: c.color, marginBottom: 12 }}>{c.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 8 }}>{c.title}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }`}</style>
    </PlatformLayout>
  );
}
