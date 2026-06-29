"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLegacyRoute } from "@/lib/product/legacy-routes";

export default function LegacyRouteNotice() {
  const pathname = usePathname();

  if (!pathname || !isLegacyRoute(pathname)) {
    return null;
  }

  return (
    <div className="relative z-40 border-b border-amber-400/20 bg-amber-950/40 px-4 py-2.5 text-center text-xs text-amber-100">
      <span className="text-amber-200/80">Legacy environment</span>
      {" — "}
      This page is from the archived Shynvo platform and is not part of the core Zentro
      Assistant product.{" "}
      <Link href="/" className="font-semibold text-amber-50 underline underline-offset-2">
        Return to Zentro Assistant
      </Link>
    </div>
  );
}
