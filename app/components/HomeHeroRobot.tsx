"use client";

import dynamic from "next/dynamic";

const ZentroHeroRobot = dynamic(() => import("./ZentroHeroRobot"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[min(420px,52vw)] min-h-[320px] w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-xs uppercase tracking-[0.14em] text-white/40">
      Initializing robot…
    </div>
  ),
});

export default function HomeHeroRobot() {
  return <ZentroHeroRobot />;
}
