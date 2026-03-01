"use client";

import UniverseCard from "@/components/universe/UniverseCard";
import { UNIVERSES } from "@/components/universe/universe.theme";

export default function UniverseGrid() {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/60">
            Shynvo Universes
          </div>
          <div className="mt-1 text-lg font-semibold text-white/90">
            Choose a portal. Enter a new world.
          </div>
          <div className="mt-1 text-sm text-white/60">
            Each box has its own universe palette + atmosphere.
          </div>
        </div>

        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          portals: {UNIVERSES.length}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {UNIVERSES.map((u) => (
          <UniverseCard key={u.slug} u={u} />
        ))}
      </div>
    </div>
  );
}