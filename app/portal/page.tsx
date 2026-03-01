"use client";

import PortalShell from "@/components/portal/PortalShell";
import UniverseGrid from "@/components/universe/UniverseGrid";

export default function PortalHomePage() {
  return (
    <PortalShell
      title="Shynvo Company Portal"
      subtitle="Choose a universe. Each portal drops you into a different world."
      rightSlot={
        <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
          status: live
        </span>
      }
      theme="neon"
    >
      <UniverseGrid />

      <div className="mt-6 rounded-3xl border border-white/10 bg-black/40 p-5 text-sm text-white/65 backdrop-blur-xl">
        <div className="text-xs uppercase tracking-widest text-white/50">Company layer</div>
        <div className="mt-2 leading-relaxed">
          Portal = onboarding and discovery. OS = control deck (2050). Every portal is a different product universe.
        </div>
      </div>
    </PortalShell>
  );
}