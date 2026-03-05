"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Shynvo Logo (original SVG mark)
 * - Built to look crisp on dark UI
 * - Not based on any known brand mark
 * - “S” flow + “V” core idea, abstracted into a clean symbol
 */
function ShynvoLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
    >
      {/* Outer soft-hex ring */}
      <path
        d="M14 2.6c.8 0 1.6.21 2.3.62l7 4.04c1.4.8 2.3 2.3 2.3 3.92v8.08c0 1.62-.9 3.12-2.3 3.92l-7 4.04c-.7.41-1.5.62-2.3.62s-1.6-.21-2.3-.62l-7-4.04A4.53 4.53 0 0 1 2.4 19.26v-8.08c0-1.62.9-3.12 2.3-3.92l7-4.04c.7-.41 1.5-.62 2.3-.62Z"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.1"
      />

      {/* Inner “flow” stroke */}
      <path
        d="M8.2 10.2c2.2-2.4 6.7-3.4 9.6-.9 2.5 2.2 1.1 4.8-1.4 5.7-1.5.55-3.4.53-4.9 1.08-1.8.66-2.6 2.3-1.4 3.7 2 2.3 6.8 1.9 9.4-.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Core “V” accent */}
      <path
        d="M11.2 11.7 14 15.9l2.8-4.2"
        stroke="currentColor"
        strokeOpacity="0.9"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    // Note: layout has a sticky top utility bar already.
    // This nav sticks BELOW it so they don’t overlap.
    <header className="sticky top-[52px] z-40 border-b border-white/10 bg-[#0B0F14]/75 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Brand (Logo + Name) */}
        <Link href="/" className="flex items-center gap-2" aria-label="Go to Shynvo home">
          <div className="grid h-9 w-9 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            <ShynvoLogo className="text-white" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide text-white">Shynvo</div>
            <div className="hidden sm:block text-[11px] text-white/55">
              Architecture of Applied Intelligence
            </div>
          </div>
        </Link>

        {/* Center: minimal nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          <Link href="/docs" className="text-sm text-white/80 hover:text-white">
            Docs
          </Link>
          {/* Pricing is typically on homepage as a section */}
          <a href="/#pricing" className="text-sm text-white/80 hover:text-white">
            Pricing
          </a>
          <Link href="/contact" className="text-sm text-white/80 hover:text-white">
            Contact
          </Link>
        </nav>

        {/* Right: minimal actions (no duplicate search/lang; those live in top bar) */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="text-sm text-white/75 hover:text-white">
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
          >
            Create account
          </Link>
        </div>

        {/* Mobile: menu only (search/lang are in the top bar) */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setOpen(true)}
            className="rounded-xl p-2 ring-1 ring-white/15 hover:bg-white/5"
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={cx("md:hidden", open ? "block" : "hidden")}>
        <div
          className="fixed inset-0 z-50 bg-black/60"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div className="fixed right-0 top-0 z-50 h-full w-[86%] max-w-sm border-l border-white/10 bg-[#0B0F14] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                <ShynvoLogo className="text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Shynvo</div>
                <div className="text-[11px] text-white/55">Menu</div>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="rounded-xl p-2 ring-1 ring-white/15 hover:bg-white/5"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="mt-4 space-y-2">
            <Link
              href="/docs"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm text-white/85 ring-1 ring-white/10 hover:bg-white/5"
            >
              Docs
            </Link>
            <a
              href="/#pricing"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm text-white/85 ring-1 ring-white/10 hover:bg-white/5"
            >
              Pricing
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm text-white/85 ring-1 ring-white/10 hover:bg-white/5"
            >
              Contact
            </Link>
          </div>

          <div className="my-4 border-t border-white/10" />

          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-4 py-3 text-center text-sm text-white/85 ring-1 ring-white/10 hover:bg-white/5"
          >
            Sign in
          </Link>

          <Link
            href="/signup"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-[#0B0F14]"
          >
            Create account
          </Link>
        </div>
      </div>
    </header>
  );
}

/* Icons */

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 7l10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 7 7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}