function trim(url?: string): string {
  return url?.replace(/\/+$/, "") ?? "";
}

function firstDefined(...values: Array<string | undefined>): string {
  for (const value of values) {
    if (value?.trim()) return trim(value);
  }
  return "";
}

/** Primary backend for SHYNVO PRI proxy routes */
export function getPriBackendBaseUrl(): string {
  return firstDefined(
    process.env.REACT_APP_SH_BACKEND_API,
    process.env.BACKEND_API_BASE_URL,
    process.env.SH_BACKEND_URL
  );
}

export function requirePriBackendBaseUrl(): string {
  const url = getPriBackendBaseUrl();
  if (!url) {
    throw new Error(
      "Missing backend URL. Set REACT_APP_SH_BACKEND_API or BACKEND_API_BASE_URL."
    );
  }
  return url;
}
