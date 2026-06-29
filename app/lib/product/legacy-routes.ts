/**
 * Legacy Shynvo platform routes — archived from primary navigation.
 * Kept for backward compatibility; not part of Zentro Assistant core product.
 */
export const LEGACY_ROUTE_PREFIXES = [
  "/os",
  "/university",
  "/academy",
  "/arcade",
  "/experiments",
  "/frontier",
  "/enterprise",
  "/robot",
  "/worlds",
  "/structured-progression",
  "/modular-architecture",
  "/ai-guided-intelligence",
] as const;

type LegacyRedirect = {
  prefix: string;
  destination: string;
  query?: Record<string, string>;
};

/** Routes that should redirect instead of serving stale content */
export const LEGACY_REDIRECTS: LegacyRedirect[] = [
  {
    prefix: "/worlds",
    destination: "/docs",
    query: { legacy: "archived" },
  },
  {
    prefix: "/structured-progression",
    destination: "/docs",
    query: { legacy: "archived" },
  },
  {
    prefix: "/modular-architecture",
    destination: "/docs",
    query: { legacy: "archived" },
  },
  {
    prefix: "/ai-guided-intelligence",
    destination: "/docs",
    query: { legacy: "archived" },
  },
  {
    prefix: "/robot",
    destination: "/assistant",
  },
];

export function isLegacyRoute(pathname: string): boolean {
  return LEGACY_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function getLegacyRedirect(pathname: string): LegacyRedirect | null {
  return (
    LEGACY_REDIRECTS.find(
      (entry) => pathname === entry.prefix || pathname.startsWith(`${entry.prefix}/`)
    ) ?? null
  );
}

/** @deprecated Use getLegacyRedirect instead */
export function isLegacyRedirectRoute(pathname: string): boolean {
  return getLegacyRedirect(pathname) !== null;
}
