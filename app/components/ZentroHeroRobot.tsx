"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import { useZentroRobot } from "@/lib/robot/context";

const ZentroRobotScene = dynamic(
  () => import("./robot/ZentroRobotModel").then((m) => m.ZentroRobotScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[360px] w-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-pulse rounded-full border-2 border-cyan-400/30 border-t-cyan-400" />
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/40">Initializing core</p>
        </div>
      </div>
    ),
  }
);

class RobotSceneErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function RobotFallback() {
  return (
    <div className="flex h-full min-h-[360px] items-center justify-center text-xs text-white/45">
      Assistant preview unavailable
    </div>
  );
}

const STATUS: Record<string, string> = {
  talk: "Processing inquiry",
  celebrate: "Response delivered",
  wave: "Standby · ready",
  idle: "Standby · ready",
};

export default function ZentroHeroRobot() {
  const { pose, open } = useZentroRobot();
  const heroPose = open ? pose : "wave";

  return (
    <div className="zentro-hero-frame relative h-[min(440px,52vw)] min-h-[360px] w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-white/[0.06] bg-black/20 px-4 py-2.5 backdrop-blur-sm">
        <span className="font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.14em] text-white/45">
          Zentro Core · v1
        </span>
        <span className="flex items-center gap-2 font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.12em] text-cyan-300/90">
          <span className="zentro-status-dot scale-75" />
          {STATUS[heroPose] ?? "Online"}
        </span>
      </div>

      <RobotSceneErrorBoundary fallback={<RobotFallback />}>
        <ZentroRobotScene pose={heroPose} className="h-full" />
      </RobotSceneErrorBoundary>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 border-t border-white/[0.06] bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
        <p className="text-center text-[10px] uppercase tracking-[0.14em] text-white/35">
          3D operations assistant · Interactive
        </p>
      </div>
    </div>
  );
}
