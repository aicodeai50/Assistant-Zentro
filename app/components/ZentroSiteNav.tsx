"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useZentroRobot } from "@/lib/robot/context";
import { SITE_SHORT_NAME } from "@/lib/site";
import ZentroMark from "./ZentroMark";

const links = [
  { href: "/#platform", label: "Platform" },
  { href: "/#modules", label: "Modules" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/contact", label: "Contact" },
] as const;

export default function ZentroSiteNav() {
  const pathname = usePathname();
  const { openChat } = useZentroRobot();
  const [open, setOpen] = useState(false);

  return (
    <header className="zentro-nav sticky top-0 z-50 border-b border-white/[0.06] bg-[#050810]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <ZentroMark size={30} />
          <span className="text-[15px] font-semibold tracking-tight text-white">
            {SITE_SHORT_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-[13px] font-medium text-white/60 transition hover:bg-white/[0.04] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => openChat()}
            className="hidden rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-300 px-4 py-2 text-[13px] font-semibold text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.25)] transition hover:brightness-105 sm:inline-flex"
          >
            Open Assistant
          </button>
          <Link
            href="/pricing"
            className="hidden rounded-lg border border-white/10 px-3 py-2 text-[13px] font-medium text-white/75 transition hover:border-white/20 hover:text-white lg:inline-flex"
          >
            Get started
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex rounded-lg border border-white/10 p-2 text-white/80 md:hidden"
            aria-label="Menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <>
                  <path d="M6 6l12 12M18 6 6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/[0.06] bg-[#050810]/95 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  pathname === item.href ? "bg-white/[0.06] text-white" : "text-white/70"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openChat();
              }}
              className="mt-2 rounded-lg bg-cyan-300 px-3 py-2.5 text-sm font-semibold text-slate-950"
            >
              Open Assistant
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
