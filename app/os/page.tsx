"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import TerminalOverlay from "@/components/os/TerminalOverlay";
import SHAssistantPanel from "@/components/os/SHAssistantPanel";

const CARD =
  "group relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur-xl transition hover:bg-white/10";

function Glow({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-80"
      style={{
        background: `
          radial-gradient(900px circle at 18% 25%, ${a}, transparent 60%),
          radial-gradient(800px circle at 82% 30%, ${b}, transparent 55%),
          radial-gradient(1000px circle at 50% 95%, ${c}, transparent 60%)
        `,
      }}
    />
  );
}

export default function OSHomePage() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const routes = useMemo(
    () => [
      { label: "OS Home", path: "/os" },
      { label: "Orbital Nexus", path: "/os/orbital-nexus" },
      { label: "Missions", path: "/os/missions" },
      { label: "Timeline", path: "/os/timeline" },
      { label: "Logbook", path: "/os/logbook" },
      { label: "Cognitive", path: "/os/cognitive" },
      { label: "Focus", path: "/os/focus" },
      { label: "Momentum", path: "/os/momentum" },
      { label: "Trajectory", path: "/os/trajectory" },
      { label: "Robots", path: "/os/robots" },
      { label: "AI Council", path: "/os/ai-council" },
      { label: "Settings", path: "/os/settings" },
    ],
    []
  );

  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Dimensional background */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1200px circle at 18% 18%, rgba(34,211,238,0.18), transparent 55%),
              radial-gradient(1100px circle at 82% 22%, rgba(163,230,53,0.12), transparent 55%),
              radial-gradient(1000px circle at 50% 95%, rgba(244,114,182,0.10), transparent 60%),
              linear-gradient(180deg, rgba(2,6,23,0.70), rgba(0,0,0,0.95))
            `,
            filter: "saturate(1.15) contrast(1.05)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs tracking-widest text-white/60">SHYNVO OS</div>
            <h1 className="mt-2 text-4xl font-semibold">Dimensional Cockpit</h1>
            <p className="mt-3 max-w-2xl text-white/70">
              A cinematic workspace for students, educators, and teams — missions, cognition, and tools,
              all connected by a command layer.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
              {["online", "deck: os-home", "signal: ready", "sync: idle", "zone: home"].map((x) => (
                <span key={x} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  {x}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15"
            >
              Home →
            </Link>
            <button
              onClick={() => setTerminalOpen(true)}
              className="rounded-2xl border border-white/15 bg-black/40 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
              type="button"
            >
              Open Terminal
            </button>
          </div>
        </div>

        {/* SH Assistant inside OS (NOT robot page) */}
        <div className="mt-8">
          <SHAssistantPanel backendUrl={backendUrl} />
        </div>

        {/* Sector map */}
        <div className="mt-8 rounded-3xl border border-white/15 bg-black/30 p-6 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-white">Sector Map</div>
              <div className="mt-1 text-sm text-white/60">
                Every sector is a working destination. Use Terminal to navigate instantly.
              </div>
            </div>
            <button
              onClick={() => setTerminalOpen(true)}
              className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15"
              type="button"
            >
              Terminal →
            </button>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              { title: "Orbital Nexus", desc: "System dashboard: maps, modules, control.", tag: "new", href: "/os/orbital-nexus", glow: ["rgba(34,211,238,0.18)", "rgba(255,255,255,0.08)", "rgba(0,0,0,0)"] },
              { title: "Missions", desc: "Quest board: goals → steps → outcomes.", tag: "quest", href: "/os/missions", glow: ["rgba(163,230,53,0.14)", "rgba(255,255,255,0.08)", "rgba(0,0,0,0)"] },
              { title: "Timeline", desc: "Chronochart: milestones and decisions.", tag: "chronochart", href: "/os/timeline", glow: ["rgba(180,140,255,0.14)", "rgba(255,255,255,0.08)", "rgba(0,0,0,0)"] },
              { title: "Logbook", desc: "Event memory: notes + retros + wins.", tag: "memory", href: "/os/logbook", glow: ["rgba(244,114,182,0.12)", "rgba(255,255,255,0.08)", "rgba(0,0,0,0)"] },
              { title: "Cognitive", desc: "Energy + friction + recovery protocols.", tag: "C", href: "/os/cognitive", glow: ["rgba(56,189,248,0.14)", "rgba(255,255,255,0.08)", "rgba(0,0,0,0)"] },
              { title: "Focus", desc: "Execution loops: warm-up → lock-in → output.", tag: "B", href: "/os/focus", glow: ["rgba(34,197,94,0.12)", "rgba(255,255,255,0.08)", "rgba(0,0,0,0)"] },
              { title: "Momentum", desc: "Consistency engine: drills + reflection.", tag: "A/B", href: "/os/momentum", glow: ["rgba(250,204,21,0.10)", "rgba(255,255,255,0.08)", "rgba(0,0,0,0)"] },
              { title: "Trajectory", desc: "90-day mission control and planning.", tag: "D", href: "/os/trajectory", glow: ["rgba(251,113,133,0.10)", "rgba(255,255,255,0.08)", "rgba(0,0,0,0)"] },
              { title: "Robots", desc: "Hangar: assistants + workflows.", tag: "hangar", href: "/os/robots", glow: ["rgba(125,211,252,0.12)", "rgba(255,255,255,0.08)", "rgba(0,0,0,0)"] },
              { title: "AI Council", desc: "Multi-agent room: strategy and debate.", tag: "multi-agent", href: "/os/ai-council", glow: ["rgba(167,139,250,0.12)", "rgba(255,255,255,0.08)", "rgba(0,0,0,0)"] },
              { title: "Settings", desc: "Profile, themes, language, access.", tag: "profile", href: "/os/settings", glow: ["rgba(148,163,184,0.12)", "rgba(255,255,255,0.08)", "rgba(0,0,0,0)"] },
            ].map((c) => (
              <Link key={c.href} href={c.href} className={CARD}>
                <Glow a={c.glow[0]} b={c.glow[1]} c={c.glow[2]} />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-semibold">{c.title}</div>
                      <div className="mt-1 text-sm text-white/70">{c.desc}</div>
                    </div>
                    <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
                      {c.tag}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xs text-white/60">Open sector</div>
                    <div className="text-sm text-white/85 group-hover:text-white">Enter →</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-white/45">
          Shynvo OS • Command layer + mission control + cognition systems
        </div>
      </div>

      <TerminalOverlay
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        routes={routes}
        backendUrl={backendUrl}
      />
    </div>
  );
}
