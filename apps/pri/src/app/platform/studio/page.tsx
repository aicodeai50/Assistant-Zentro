"use client";
import PlatformLayout from "@/components/platform/PlatformLayout";
import { useState } from "react";
import Link from "next/link";

const TEMPLATES = [
  { id: "t1", name: "Robot Demo Clip", type: "Short Video", duration: "30s", color: "#00ffe7", icon: "▷", desc: "Auto-generate a 30-second demo showing your robot API in action" },
  { id: "t2", name: "API Showcase", type: "Promo Content", duration: "60s", color: "#a855f7", icon: "∞", desc: "Visual walkthrough of your generated endpoints and workflows" },
  { id: "t3", name: "Live Robot Feed", type: "Live Stream", duration: "Live", color: "#0ea5e9", icon: "◈", desc: "Stream real-time robot state, execution logs, and sensor data" },
  { id: "t4", name: "Twin Replay", type: "Simulation", duration: "Clip", color: "#f59e0b", icon: "⬡", desc: "Record and replay your digital twin simulation as shareable content" },
  { id: "t5", name: "Agent Report", type: "Document", duration: "Auto", color: "#00ffe7", icon: "◆", desc: "AI-generated report summarizing agent missions and outcomes" },
  { id: "t6", name: "Platform Tour", type: "Walkthrough", duration: "2min", color: "#a855f7", icon: "▣", desc: "Auto-narrated tour of your Shynvo platform for onboarding" },
];

export default function StudioPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  function generate() {
    if (!selected) return;
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 2000);
  }

  return (
    <PlatformLayout title="Studio" subtitle="Content tools, creator flows, AI visuals, and publishing pipelines.">
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

        {/* Hero */}
        <div style={{ borderRadius: 20, border: "1px solid rgba(0,255,231,0.12)", background: "linear-gradient(135deg, rgba(0,255,231,0.03), rgba(168,85,247,0.03))", padding: "40px 48px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 12, left: 12, width: 20, height: 20, borderTop: "1px solid rgba(0,255,231,0.3)", borderLeft: "1px solid rgba(0,255,231,0.3)" }} />
          <div style={{ position: "absolute", bottom: 12, right: 12, width: 20, height: 20, borderBottom: "1px solid rgba(0,255,231,0.3)", borderRight: "1px solid rgba(0,255,231,0.3)" }} />
          <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(0,255,231,0.4)", textTransform: "uppercase", marginBottom: 12 }}>Content</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>
            Creator <span style={{ color: "#00ffe7", textShadow: "0 0 30px rgba(0,255,231,0.4)" }}>Studio</span>
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, maxWidth: 560 }}>
            Transform your robot data, API outputs, and agent missions into compelling content. Generate demos, live streams, AI visuals, and publishable media automatically.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            <Link href="/platform/avatars" style={{ padding: "11px 24px", borderRadius: 10, border: "1px solid rgba(168,85,247,0.25)", background: "rgba(168,85,247,0.08)", color: "#a855f7", textDecoration: "none", fontSize: 12, fontWeight: 600 }}>
              Open Avatars
            </Link>
            <Link href="/platform/brain" style={{ padding: "11px 24px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 12 }}>
              Use ARIA Brain →
            </Link>
          </div>
        </div>

        {/* Template Grid */}
        <div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "rgba(0,255,231,0.3)", textTransform: "uppercase", marginBottom: 6 }}>Templates</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "white" }}>Choose a Content Type</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {TEMPLATES.map(t => (
              <div
                key={t.id}
                onClick={() => { setSelected(t.id); setGenerated(false); }}
                style={{
                  borderRadius: 16, padding: "24px 28px", cursor: "pointer",
                  border: selected === t.id ? `1px solid ${t.color}40` : "1px solid rgba(255,255,255,0.06)",
                  background: selected === t.id ? `${t.color}06` : "rgba(0,8,14,0.8)",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, border: `1px solid ${t.color}25`, background: `${t.color}08`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: t.color }}>
                    {t.icon}
                  </div>
                  <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 999, border: `1px solid ${t.color}20`, background: `${t.color}08`, color: t.color, letterSpacing: "0.08em" }}>
                    {t.duration}
                  </span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontSize: 11, color: t.color, opacity: 0.6, marginBottom: 10 }}>{t.type}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Panel */}
        <div style={{ borderRadius: 20, border: "1px solid rgba(0,255,231,0.1)", background: "rgba(0,8,14,0.9)", padding: "36px 40px" }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "white", marginBottom: 8 }}>Generate Content</h3>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 28, lineHeight: 1.7 }}>
            {selected
              ? `Selected: ${TEMPLATES.find(t => t.id === selected)?.name} — ready to generate`
              : "Select a template above to begin content generation"}
          </p>

          {generated ? (
            <div style={{ padding: "20px 24px", borderRadius: 12, border: "1px solid rgba(0,255,231,0.2)", background: "rgba(0,255,231,0.06)" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#00ffe7", marginBottom: 8 }}>
                ✓ Content Generated Successfully
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                Your {TEMPLATES.find(t => t.id === selected)?.name} is ready. Publishing pipeline coming in Phase 5.
              </div>
            </div>
          ) : (
            <button
              onClick={generate}
              disabled={!selected || generating}
              style={{
                padding: "14px 36px", borderRadius: 10,
                border: "1px solid rgba(0,255,231,0.25)",
                background: !selected ? "rgba(255,255,255,0.02)" : generating ? "rgba(0,255,231,0.03)" : "rgba(0,255,231,0.08)",
                color: !selected ? "rgba(255,255,255,0.2)" : generating ? "rgba(0,255,231,0.4)" : "#00ffe7",
                fontSize: 13, fontWeight: 600, cursor: !selected ? "not-allowed" : "pointer",
                letterSpacing: "0.05em",
              }}
            >
              {generating ? "⟳ Generating..." : "▣ Generate Content"}
            </button>
          )}
        </div>

        {/* Capabilities */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
          {[
            { icon: "▷", title: "Short Video", desc: "Auto-generate robot promo clips", color: "#00ffe7" },
            { icon: "◈", title: "Live Tools", desc: "Stream robot state in real time", color: "#0ea5e9" },
            { icon: "◉", title: "AI Visuals", desc: "Use avatars and AI overlays", color: "#a855f7" },
            { icon: "→", title: "Publishing", desc: "Turn outputs into shareable media", color: "#f59e0b" },
          ].map(c => (
            <div key={c.title} style={{ borderRadius: 14, border: `1px solid ${c.color}12`, background: `${c.color}04`, padding: "22px 24px" }}>
              <div style={{ fontSize: 24, color: c.color, marginBottom: 12 }}>{c.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 8 }}>{c.title}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", lineHeight: 1.6 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </PlatformLayout>
  );
}
