import React from "react";
import "@/app/os/os-atmosphere.css";
import OSSideNav from "@/components/os/OSSideNav";
import OSBottomDock from "@/components/os/OSBottomDock";
import OSLocaleControl from "@/components/os/OSLocaleControl";
import OSThemeSync from "@/components/os/OSThemeSync";

type OSShellProps = {
  title: string; // English title stays English
  subtitle?: React.ReactNode; // can be string OR <OSSub ... />
  children: React.ReactNode;
  chips?: string[];
  rightSlot?: React.ReactNode;
  showNav?: boolean;
};

export default function OSShell({
  title,
  subtitle,
  children,
  chips = ["online", "signal: stable", "sync: idle", "shield: on"],
  rightSlot,
  showNav = true,
}: OSShellProps) {
  return (
    <div className="os-atmosphere min-h-screen w-full">
      <OSThemeSync />

      <div className="sticky top-0 z-20 border-b border-white/10 bg-black/50 backdrop-blur">
        <div className="mx-auto w-full max-w-6xl px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="relative inline-flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white/80" />
              </span>

              <div className="text-xs uppercase tracking-widest text-white/60">
                Shynvo OS
              </div>

              <div className="hidden h-4 w-px bg-white/10 sm:block" />

              <div className="flex flex-wrap items-center gap-2">
                {chips.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <OSLocaleControl />
              {rightSlot ? (
                <div className="flex items-center gap-2">{rightSlot}</div>
              ) : (
                <div className="hidden sm:block text-xs text-white/50">
                  system: stable
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile dock */}
      <OSBottomDock />

      {/* bottom padding on mobile so content clears dock */}
      <div className="mx-auto w-full max-w-6xl px-4 py-6 pb-28 lg:pb-6">
        <div className="mb-5">
          <div className="text-2xl font-semibold text-white/90">{title}</div>
          {subtitle ? <div className="mt-1">{subtitle}</div> : null}
        </div>

        <div className={showNav ? "grid grid-cols-1 gap-4 lg:grid-cols-12" : ""}>
          {showNav ? (
            <div className="lg:col-span-4">
              <OSSideNav />
            </div>
          ) : null}

          <div className={showNav ? "lg:col-span-8" : ""}>{children}</div>
        </div>
      </div>
    </div>
  );
}
