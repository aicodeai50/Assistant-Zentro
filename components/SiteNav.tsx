"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINK =
  "rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10";

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm font-semibold tracking-wide text-white">
            SHYNVO
          </Link>
          <span className="text-xs text-white/40">AI Learning + Upskilling</span>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          <Link className={NAV_LINK} href="/demo">
            Demo
          </Link>
          <Link className={NAV_LINK} href="/pricing">
            Pricing
          </Link>
          <Link className={NAV_LINK} href="/robot">
            Sci-fi Robot
          </Link>
          <Link className={NAV_LINK} href="/os">
            OS (2050)
          </Link>
          <Link className={NAV_LINK} href="/university">
            University Hub
          </Link>
          <Link className={NAV_LINK} href="/experiments">
            Experiments (Beta)
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={pathname?.startsWith("/pricing") ? "/demo" : "/pricing"}
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-neutral-200"
          >
            {pathname?.startsWith("/pricing") ? "Open demo" : "Upgrade"}
          </Link>
        </div>
      </div>
    </header>
  );
}
