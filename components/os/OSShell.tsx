"use client";

import "@/app/os/os-atmosphere.css";
import "@/app/os/os-cinematic.css";

import { ReactNode, useMemo } from "react";
import Link from "next/link";

import OSTerminalHost from "@/components/os/OSTerminalHost";
import OSSideNav from "@/components/os/OSSideNav";
import OSStoryBar from "@/components/os/OSStoryBar";
import OSBootOverlay from "@/components/os/OSBootOverlay";
import { useOSState } from "@/components/os/useOSState";

/* ================= TYPES ================= */

type Zone =
  | "home"
  | "planet"
  | "missions"
  | "cognitive"
  | "focus"
  | "momentum"
  | "trajectory"
  | "terminal"
  | "settings";

type OSShellProps = {
  title: string;
  subtitle?: ReactNode;
  chips?: string[];
  rightSlot?: ReactNode;
  zone?: Zone;
  children: ReactNode;
};

type Accent = {
  a: string;
  b: string;
  c: string;
};

/* ================= ACCENTS ================= */

const ZONE_ACCENTS: Record<Zone, Accent> = {
  home: { a: "#38BDF8", b: "#A855F7", c: "#22C55E" },
  planet: { a: "#60A5FA", b: "#22D3EE", c: "#A78BFA" },
  missions: { a: "#F59E0B", b: "#FB7185", c: "#F97316" },
  cognitive: { a: "#A855F7", b: "#22D3EE", c: "#6366F1" },
  focus: { a: "#22C55E", b: "#A3E635", c: "#10B981" },
  momentum: { a: "#F97316", b: "#FB7185", c: "#F59E0B" },
  trajectory: { a: "#6366F1", b: "#38BDF8", c: "#A78BFA" },
  terminal: { a: "#22D3EE", b: "#38BDF8", c: "#0EA5E9" },
  settings: { a: "#94A3B8", b: "#64748B", c: "#CBD5E1" },
};

/* ================= WALLPAPERS ================= */

const ZONE_WALLPAPERS: Record<Zone, string> = {
  home: "/os/home.jpg",
  planet: "/os/planet.jpg",
  missions: "/os/missions.jpg",
  cognitive: "/os/cognitive.jpg",
  focus: "/os/focus.jpg",
  momentum: "/os/momentum.jpg",
  trajectory: "/os/trajectory.jpg",
  terminal: "/os/terminal.jpg",
  settings: "/os/settings.jpg",
};

/* ================= HELPERS ================= */

function rgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function Chip({ text }: { text: string }) {
  return (
    <span className="os-chip rounded-full px-3 py-1 text-xs">
      {text}
    </span>
  );
}

/* ================= COMPONENT ================= */

export default function OSShell({
  title,
  subtitle,
  chips = [],
  rightSlot,
  zone = "home",
  children,
}: OSShellProps) {
  const [storyOpen, setStoryOpen] = useOSState<boolean>(
    "os.ui.storyBarOpen",
    true
  );
  const [, setBootForce] = useOSState<number>("os.ui.bootForce", 0);

  const accent = useMemo(() => ZONE_ACCENTS[zone], [zone]);
  const wallpaper = ZONE_WALLPAPERS[zone];

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-black text-white"
      style={{
        ["--os-accent-a" as any]: accent.a,
        ["--os-accent-b" as any]: accent.b,
        ["--os-accent-c" as any]: accent.c,
      }}
    >
      {/* ================= BACKGROUND ================= */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${wallpaper})` }}
        />
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1200px circle at 20% 20%, ${rgba(accent.a, 0.22)}, transparent 60%),
              radial-gradient(1000px circle at 80% 30%, ${rgba(accent.b, 0.22)}, transparent 55%),
              radial-gradient(900px circle at 50% 85%, ${rgba(accent.c, 0.18)}, transparent 60%)
            `,
          }}
        />
        <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      {/* ================= CINEMATIC ================= */}
      <OSBootOverlay zone={zone} />
      <div className="os-glow-orbs" aria-hidden="true"><i /><i /><i /></div>
      <div className="os-film" aria-hidden="true" />

      {/* ================= FRAME ================= */}
      <div className="relative mx-auto min-h-screen max-w-[1600px] px-4 py-4">
        <div
          className="relative min-h-[calc(100vh-2rem)] rounded-[40px] border border-white/15 bg-black/40 backdrop-blur-xl"
          style={{
            boxShadow: `0 0 140px ${rgba(accent.b, 0.12)}, 0 0 220px rgba(0,0,0,0.9)`,
          }}
        >
          <div className="px-4 py-6">
            {/* ================= HEADER ================= */}
            <div className="os-panel rounded-2xl px-4 py-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs uppercase tracking-widest text-white/70">
                    Shynvo OS
                  </span>
                  {chips.map((c) => <Chip key={c} text={c} />)}
                  <span className="ml-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/75">
                    zone: {zone}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link href="/assistant" className="os-btn px-3 py-1 text-xs">SH Assistant</Link>
                  <Link href="/split" className="os-btn px-3 py-1 text-xs">Split</Link>
                  <button onClick={() => setStoryOpen(!storyOpen)} className="os-btn px-3 py-1 text-xs">
                    {storyOpen ? "Story: on" : "Story: off"}
                  </button>
                  <button onClick={() => setBootForce(Date.now())} className="os-btn px-3 py-1 text-xs">
                    Re-run boot
                  </button>
                  {rightSlot}
                </div>
              </div>

              <div className="mt-3">
                <div className="text-2xl font-semibold">{title}</div>
                {subtitle && <div className="mt-1 text-sm text-white/65">{subtitle}</div>}
              </div>
            </div>

            {/* ================= BODY ================= */}
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
              <div className="lg:col-span-3"><OSSideNav /></div>
              <div className="lg:col-span-6">
                <div className="os-panel rounded-2xl p-4">{children}</div>
              </div>
              <div className="lg:col-span-3">
                {storyOpen && <OSStoryBar />}
              </div>
            </div>

            {/* ================= TERMINAL ================= */}
            <OSTerminalHost />

            <div className="mt-6 text-center text-xs text-white/40">
              Shynvo OS — cinematic command layer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}