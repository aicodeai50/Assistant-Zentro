import Link from "next/link";
import React from "react";

export default function OSShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-xs text-white/50">Shynvo OS • 2050 mode</div>
            <h1 className="text-lg font-semibold">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-sm text-white/60">{subtitle}</p>
            )}
          </div>

          <nav className="flex items-center gap-4 text-sm">
            <Link href="/os" className="text-white/70 hover:text-white">
              OS Home
            </Link>
            <Link href="/os/momentum" className="text-white/70 hover:text-white">
              Momentum
            </Link>
            <Link href="/os/focus" className="text-white/70 hover:text-white">
              Focus
            </Link>
            <Link href="/os/cognitive" className="text-white/70 hover:text-white">
              Cognitive
            </Link>
            <Link
              href="/os/trajectory"
              className="text-white/70 hover:text-white"
            >
              Trajectory
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-6xl px-6 text-xs text-white/50">
          Shynvo OS is a preview UI. Core product lives in Demo.
        </div>
      </footer>
    </div>
  );
}