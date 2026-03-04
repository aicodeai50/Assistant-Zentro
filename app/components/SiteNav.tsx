"use client";

import Link from "next/link";

const LINK = "text-sm text-white/80 hover:text-white transition";

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B0F14]/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-white/10 ring-1 ring-white/15" />
          <span className="text-sm font-semibold tracking-wide">Shynvo</span>
        </Link>

        {/* Main links */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link className={LINK} href="/university">
            University Hub
          </Link>
          <Link className={LINK} href="/os">
            Shynvo OS
          </Link>
          <Link className={LINK} href="/experiments">
            Experiments
          </Link>
          <Link className={LINK} href="/pricing">
            Pricing
          </Link>
          <Link className={LINK} href="/docs">
            Docs
          </Link>
          <Link className={LINK} href="/contact">
            Contact
          </Link>
        </nav>

        {/* Single CTA */}
        <div className="flex items-center">
          <Link
            href="/signup"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
          >
            Create Account
          </Link>
        </div>
      </div>
    </header>
  );
}
