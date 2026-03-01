"use client";

import { ReactNode } from "react";
import Link from "next/link";

export type PortalTheme = "neon" | "aurora" | "void" | "ember";

function bgFor(theme: PortalTheme) {
  if (theme === "aurora") {
    return "bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.28),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(167,139,250,0.22),transparent_45%),radial-gradient(circle_at_30%_85%,rgba(16,185,129,0.18),transparent_55%)]";
  }
  if (theme === "void") {
    return "bg-[radial-gradient(circle_at_25%_25%,rgba(99,102,241,0.22),transparent_45%),radial-gradient(circle_at_75%_35%,rgba(244,63,94,0.14),transparent_55%),radial-gradient(circle_at_45%_85%,rgba(255,255,255,0.06),transparent_55%)]";
  }
  if (theme === "ember") {
    return "bg-[radial-gradient(circle_at_20%_25%,rgba(245,158,11,0.18),transparent_50%),radial-gradient(circle_at_70%_35%,rgba(244,63,94,0.14),transparent_55%),radial-gradient(circle_at_40%_85%,rgba(34,211,238,0.10),transparent_55%)]";
  }
  // neon default
  return "bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.30),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.22),transparent_45%),radial-gradient(circle_at_30%_85%,rgba(236,72,153,0.14),transparent_55%)]";
}

function accentFor(theme: PortalTheme) {
  if (theme === "aurora") return "text-cyan-200/90";
  if (theme === "void") return "text-indigo-200/90";
  if (theme === "ember") return "text-amber-200/90";
  return "text-fuchsia-200/90";
}

export default function PortalShell({
  title,
  subtitle,
  rightSlot,
  children,
  theme = "neon",
}: {
  title: string;
  subtitle?: ReactNode;
  rightSlot?: ReactNode;
  children: ReactNode;
  theme?: PortalTheme;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* cinematic sci-fi wash */}
      <div className="pointer-events-none fixed inset-0 opacity-80">
        <div className={`absolute inset-0 ${bgFor(theme)}`} />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_30%,rgba(255,255,255,0.03))]" />
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:18px_18px] opacity-10" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(transparent,rgba(255,255,255,0.06),transparent)]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-10">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs tracking-widest text-white/70">
              SHYNVO
            </div>
            <div className={`text-xs ${accentFor(theme)}`}>Company Portal</div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/portal"
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75 hover:bg-white/10"
              title="Portal home"
            >
              Portal
            </Link>
            <Link
              href="/assistant"
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75 hover:bg-white/10"
              title="Open Assistant"
            >
              Assistant
            </Link>
            <Link
              href="/os"
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75 hover:bg-white/10"
              title="Enter OS"
            >
              Enter OS
            </Link>
            {rightSlot ?? null}
          </div>
        </div>

        {/* Hero */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
          <div className="text-2xl font-semibold text-white/95">{title}</div>
          {subtitle ? <div className="mt-2 text-sm text-white/65">{subtitle}</div> : null}
        </div>

        {/* Content */}
        <div className="mt-6">{children}</div>

        <div className="mt-10 text-center text-xs text-white/40">
          Shynvo Portal — public layer (frontend-only for now)
        </div>
      </div>
    </div>
  );
}