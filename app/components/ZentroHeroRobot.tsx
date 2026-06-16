"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import { useZentroRobot } from "@/lib/robot/context";

const ZentroRobotScene = dynamic(
  () => import("./robot/ZentroRobotModel").then((m) => m.ZentroRobotScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[320px] w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-xs uppercase tracking-[0.14em] text-white/40">
        Initializing robot…
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
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function RobotFallback() {
  return (
    <div className="flex h-full min-h-[320px] w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-xs uppercase tracking-[0.14em] text-white/45">
      3D preview unavailable
    </div>
  );
}

export default function ZentroHeroRobot() {
  const { pose, open } = useZentroRobot();
  const heroPose = open ? pose : "wave";

  return (
    <div className="relative h-[min(420px,52vw)] min-h-[320px] w-full overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-b from-white/[0.06] to-black/40 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3 text-[10px] uppercase tracking-[0.16em] text-white/45">
        <span>Zentro Unit · Online</span>
        <span className="text-cyan-300">
          {heroPose === "talk" ? "Answering…" : heroPose === "celebrate" ? "Happy to help" : "Waving hello"}
        </span>
      </div>

      <RobotSceneErrorBoundary fallback={<RobotFallback />}>
        <ZentroRobotScene pose={heroPose} className="h-full" />
      </RobotSceneErrorBoundary>
    </div>
  );
}
