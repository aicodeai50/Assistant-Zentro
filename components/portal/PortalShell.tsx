"use client";

import { ReactNode } from "react";
import Link from "next/link";

export type PortalTheme = "neon" | "aurora" | "void" | "ember";

function bgFor(theme: PortalTheme) {
  // Much stronger sci-fi color fields
  if (theme === "aurora") {
    return `
      radial-gradient(1200px circle at 20% 15%, rgba(34,211,238,0.45), transparent 45%),
      radial-gradient(1000px circle at 80% 25%, rgba(167,139,250,0.38), transparent 50%),
      radial-gradient(900px circle at 35% 85%, rgba(16,185,129,0.30), transparent 55%),
      linear-gradient(180deg, rgba(2,6,23,0.75), rgba(0,0,0,0.92))
    `;
  }
  if (theme === "void") {
    return `
      radial-gradient(1200px circle at 25% 20%, rgba(99,102,241,0.42), transparent 50%),
      radial-gradient(1000px circle at 75% 30%, rgba(244,63,94,0.26), transparent 55%),
      radial-gradient(900px circle at 45% 85%, rgba(255,255,255,0.10), transparent 60%),
      linear-gradient(180deg, rgba(2,6,23,0.78), rgba(0,0,0,0.92))
    `;
  }
  if (theme === "ember") {
    return `
      radial-gradient(1200px circle at 20% 25%, rgba(245,158,11,0.34), transparent 55%),
      radial-gradient(1000px circle at 70% 30%, rgba(244,63,94,0.26), transparent 60%),
      radial-gradient(900px circle at 45% 85%, rgba(34,211,238,0.18), transparent 60%),
      linear-gradient(180deg, rgba(2,6,23,0.78), rgba(0,0,0,0.92))
    `;
  }
  // neon default
  return `
    radial-gradient(1200px circle at 18% 18%, rgba(99,102,241,0.55), transparent 45%),
    radial-gradient(1000px circle at 82% 22%, rgba(34,211,238,0.45), transparent 50%),
    radial-gradient(900px circle at 30% 88%, rgba(236,72,153,0.30), transparent 55%),
    linear-gradient(180deg, rgba(2,6,23,0.72), rgba(0,0,0,0.92))
  `;
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
      {/* Animated aurora background */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: bgFor(theme),
            filter: "saturate(1.25) contrast(1.1)",
          }}
        />
        {/* drifting aurora layer */}
        <div className="aurora-drift absolute inset-0 opacity-70" />
        {/* hologrid */}
        <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:46px_46px]" />
        {/* star/noise dots */}
        <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:18px_18px]" />
        {/* cinematic film */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_30%,rgba(255,255,255,0.04))]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-10">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-xs tracking-widest text-white/80">
              SHYNVO
            </div>
            <div className={`text-xs ${accentFor(theme)}`}>Company Portal</div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/portal"
              className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/80 hover:bg-white/15"
              title="Portal home"
            >
              Portal
            </Link>
            <Link
              href="/assistant"
              className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/80 hover:bg-white/15"
              title="Open Assistant"
            >
              Assistant
            </Link>
            <Link
              href="/os"
              className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/80 hover:bg-white/15"
              title="Enter OS"
            >
              Enter OS
            </Link>
            {rightSlot ?? null}
          </div>
        </div>

        {/* Hero */}
        <div className="mt-8 rounded-3xl border border-white/15 bg-black/35 p-6 backdrop-blur-xl shadow-[0_0_90px_rgba(34,211,238,0.10)]">
          <div className="text-3xl font-semibold text-white/95">{title}</div>
          {subtitle ? <div className="mt-2 text-sm text-white/70">{subtitle}</div> : null}
          <div className="mt-4 h-[1px] w-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.20),transparent)]" />
        </div>

        {/* Content */}
        <div className="mt-6">{children}</div>

        <div className="mt-10 text-center text-xs text-white/50">
          Shynvo Portal — public layer (sci-fi universe hub)
        </div>
      </div>

      {/* global keyframes */}
      <style jsx global>{`
        .aurora-drift {
          background: radial-gradient(900px circle at 20% 30%, rgba(34, 211, 238, 0.20), transparent 55%),
            radial-gradient(900px circle at 80% 40%, rgba(167, 139, 250, 0.16), transparent 60%),
            radial-gradient(900px circle at 50% 90%, rgba(236, 72, 153, 0.12), transparent 60%);
          animation: auroraMove 18s ease-in-out infinite;
          filter: blur(2px) saturate(1.3);
        }
        @keyframes auroraMove {
          0% {
            transform: translate3d(-2%, -1%, 0) scale(1.02);
          }
          50% {
            transform: translate3d(2%, 1%, 0) scale(1.06);
          }
          100% {
            transform: translate3d(-2%, -1%, 0) scale(1.02);
          }
        }
      `}</style>
    </div>
  );
}