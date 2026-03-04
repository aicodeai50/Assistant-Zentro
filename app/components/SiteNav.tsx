"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINK =
  "text-sm text-white/80 hover:text-white transition";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active =
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <Link
      href={href}
      className={`${LINK} ${active ? "text-white" : ""}`}
    >
      {label}
    </Link>
  );
}

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B0F14]/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-white/10 ring-1 ring-white/15" />
          <span className="text-sm font-semibold tracking-wide">Shynvo</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink href="/university" label="University Hub" />
          <NavLink href="/os" label="Shynvo OS" />
          <NavLink href="/experiments" label="Experiments" />
          <NavLink href="/pricing" label="Pricing" />
          <NavLink href="/docs" label="Docs" />
          <NavLink href="/contact" label="Contact" />
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/signup"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
          >
            Create account
          </Link>
        </div>
      </div>
    </header>
  );
}