function trim(url?: string): string {
  return url?.replace(/\/+$/, "") ?? "";
}

function firstDefined(...values: Array<string | undefined>): string {
  for (const value of values) {
    if (value?.trim()) return trim(value);
  }
  return "";
}

/** sh-backend-api — chat, translate, TTS, skill-matrix, company, general API */
export function getShBackendApiUrl(): string {
  return firstDefined(
    process.env.REACT_APP_SH_BACKEND_API,
    process.env.SH_BACKEND_URL,
    process.env.BACKEND_URL,
    process.env.RAILWAY_API_BASE_URL,
    process.env.NEXT_PUBLIC_API_URL,
    process.env.NEXT_PUBLIC_SH_BACKEND_URL,
    process.env.NEXT_PUBLIC_BACKEND_URL
  );
}

/** robot_backend — robot-chat and robotics AI endpoints */
export function getRobotBackendUrl(): string {
  return firstDefined(
    process.env.REACT_APP_ROBOT_BACKEND,
    process.env.ROBOT_BACKEND_URL,
    process.env.ROBOT_BACKEND,
    getShBackendApiUrl()
  );
}

/** zentro-hub-api — hub orchestration service */
export function getZentroHubUrl(): string {
  return firstDefined(
    process.env.REACT_APP_ZENTRO_HUB,
    process.env.ZENTRO_HUB_URL,
    process.env.NEXT_PUBLIC_ZENTRO_HUB_URL
  );
}

/** zentro-own-api — first-party Zentro API service */
export function getZentroOwnApiUrl(): string {
  return firstDefined(
    process.env.REACT_APP_ZENTRO_OWN_API,
    process.env.ZENTRO_OWN_API_URL,
    process.env.NEXT_PUBLIC_ZENTRO_OWN_API_URL
  );
}

/** Browser-safe proxy prefix (Railway private URLs are server-only). */
export const CLIENT_BACKEND_PROXY = "/api/backend";

export function requireShBackendApiUrl(): string {
  const url = getShBackendApiUrl();
  if (!url) {
    throw new Error(
      "Missing backend URL. Set REACT_APP_SH_BACKEND_API or SH_BACKEND_URL."
    );
  }
  return url;
}

export function requireRobotBackendUrl(): string {
  const url = getRobotBackendUrl();
  if (!url) {
    throw new Error(
      "Missing robot backend URL. Set REACT_APP_ROBOT_BACKEND or ROBOT_BACKEND_URL."
    );
  }
  return url;
}

/**
 * Base URL for client-side fetches. Uses Next.js API proxy so the browser
 * never needs direct access to Railway internal hostnames.
 */
export function getClientBackendBase(): string {
  return CLIENT_BACKEND_PROXY;
}

/**
 * Base URL for server-side fetches to upstream backends.
 */
export function getServerBackendBase(): string {
  return getShBackendApiUrl();
}
