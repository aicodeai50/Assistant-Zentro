"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  sub?: string;
  tag?: string;
};

const ITEMS: NavItem[] = [
  { href: "/os", label: "OS Home", sub: "Cockpit" },
  { href: "/os/planet", label: "Orbital Nexus", sub: "Planet Control", tag: "NEW" },

  { href: "/os/cognitive", label: "Cognitive", sub: "Protocols", tag: "C" },
  { href: "/os/cognitive/energy", label: "Energy", sub: "Signal" },
  { href: "/os/cognitive/friction", label: "Friction", sub: "Blockers" },
  { href: "/os/cognitive/recovery", label: "Recovery", sub: "Reset" },
  { href: "/os/cognitive/stuck", label: "Stuck", sub: "Unstuck" },

  { href: "/os/focus", label: "Focus", sub: "Execution", tag: "B" },
  { href: "/os/momentum", label: "Momentum", sub: "Loops" },
  { href: "/os/trajectory", label: "Trajectory", sub: "90-day", tag: "D" },

  { href: "/os/terminal", label: "Terminal", sub: "Diagnostics" },
];

export default function OSSideNav() {
  const pathname = usePathname() || "/";

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[72px]">
        <div className="rounded-xl border border-white/10 bg-black/30 p-3">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs uppercase tracking-widest text-white/60">
              Sector Map
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60">
              nav
            </span>
          </div>

          <div className="mt-3 space-y-1">
            {ITEMS.map((it) => {
              const active =
                pathname === it.href ||
                (it.href !== "/os" && pathname.startsWith(it.href));

              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={[
                    "flex items-start justify-between gap-2 rounded-lg border px-3 py-2 transition",
                    active
                      ? "border-white/25 bg-white/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10",
                  ].join(" ")}
                >
                  <div>
                    <div className="text-sm text-white/85">{it.label}</div>
                    {it.sub ? (
                      <div className="text-xs text-white/55">{it.sub}</div>
                    ) : null}
                  </div>

                  {it.tag ? (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60">
                      {it.tag}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>

          <div className="mt-3 rounded-lg border border-white/10 bg-black/40 p-3 text-xs text-white/60">
            Frontend-only. Later we will light up active missions and signal via API.
          </div>
        </div>
      </div>
    </aside>
  );
}
