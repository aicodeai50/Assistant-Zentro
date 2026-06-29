"use client";

import { useSearchParams } from "next/navigation";

export default function DocsLegacyBanner() {
  const searchParams = useSearchParams();
  const archived = searchParams.get("legacy") === "archived";

  if (!archived) return null;

  return (
    <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
      The page you tried to open was an archived Shynvo marketing route. Use the guides
      below for the current Zentro Assistant product.
    </div>
  );
}
