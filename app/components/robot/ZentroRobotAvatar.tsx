"use client";

import dynamic from "next/dynamic";
import type { ZentroRobotPose } from "./ZentroRobotModel";

const ZentroRobotScene = dynamic(
  () => import("./ZentroRobotModel").then((m) => m.ZentroRobotScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center text-lg">🤖</div>
    ),
  }
);

export default function ZentroRobotAvatar({
  pose = "wave",
  className = "h-16 w-16 overflow-hidden rounded-2xl border border-cyan-400/25 bg-[#070a12]",
}: {
  pose?: ZentroRobotPose;
  className?: string;
}) {
  return (
    <div className={className}>
      <ZentroRobotScene pose={pose} compact />
    </div>
  );
}
