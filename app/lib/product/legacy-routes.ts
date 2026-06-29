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

/** Marketing-only legacy pages — redirect to docs instead of serving stale content */
export const LEGACY_REDIRECT_PREFIXES = [
  "/worlds",
  "/structured-progression",
  "/modular-architecture",
  "/ai-guided-intelligence",
] as const;

export function isLegacyRoute(pathname: string): boolean {
  return LEGACY_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function isLegacyRedirectRoute(pathname: string): boolean {
  return LEGACY_REDIRECT_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}
