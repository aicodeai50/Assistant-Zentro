import OSShell from "@/components/os/OSShell";
import { BoxLink } from "@/components/os/OSCard";
import OSHUD from "@/components/os/OSHUD";
import OSLogbook from "@/components/os/OSLogbook";
import "@/app/os/os-planet.css";

export default function PlanetControlPage() {
  return (
    <OSShell
      title="Orbital Nexus / Planet Control"
      subtitle="Planet dashboard with animated zones (frontend-only)."
      chips={["online", "deck: orbital-nexus", "sector: prime", "sync: stable"]}
      rightSlot={
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          colony: active
        </span>
      }
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <OSHUD seed="planet-control" />

          <div className="os-planet-grid rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60">Zones</div>
                <div className="mt-1 text-sm text-white/70">
                  Hover tiles for glow. Click to enter subsystem.
                </div>
              </div>

              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                status: nominal
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="os-zone rounded-xl border border-white/10 bg-black/30 p-4">
                <span className="os-zone-pulse" />
                <BoxLink
                  href="/os/cognitive"
                  title="Academy Sector"
                  desc="Cadet training protocols."
                  tag="Subsystem"
                />
                <div className="mt-2 text-xs text-white/55">
                  Energy, friction, recovery, stuck.
                </div>
              </div>

              <div className="os-zone rounded-xl border border-white/10 bg-black/30 p-4">
                <span className="os-zone-pulse" />
                <BoxLink
                  href="/os/focus"
                  title="Research Dome"
                  desc="Deep work rituals & execution."
                  tag="Subsystem"
                />
                <div className="mt-2 text-xs text-white/55">
                  Warm-up, lock-in, work loops.
                </div>
              </div>

              <div className="os-zone rounded-xl border border-white/10 bg-black/30 p-4">
                <span className="os-zone-pulse" />
                <BoxLink
                  href="/os/trajectory"
                  title="Industrial Ring"
                  desc="Mission control & outcomes."
                  tag="Subsystem"
                />
                <div className="mt-2 text-xs text-white/55">
                  Foundation to outcome phases.
                </div>
              </div>

              <div className="os-zone rounded-xl border border-white/10 bg-black/30 p-4">
                <span className="os-zone-pulse" />
                <BoxLink
                  href="/os/momentum"
                  title="Comms & Momentum"
                  desc="Feedback loops & drills."
                  tag="Subsystem"
                />
                <div className="mt-2 text-xs text-white/55">
                  Drill, reflection, hard prompts.
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-3 text-xs text-white/60">
              Next: we can add animated “active mission” markers and sector badges.
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <OSLogbook bootEntry="Orbital Nexus booted. Colony zones online." />
        </div>
      </div>
    </OSShell>
  );
}
