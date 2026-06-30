import {
  getClientBackendBase,
  getServerBackendBase,
} from "./backend-env";

const TOKEN_KEY = "zentro_token";

export function getBackendUrl() {
  if (typeof window !== "undefined") {
    return getClientBackendBase();
  }
  return getServerBackendBase();
}

export function getApiKey() {
  return (
    process.env.NEXT_PUBLIC_SH_API_KEY ||
    process.env.NEXT_PUBLIC_API_KEY ||
    ""
  );
}

export function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(TOKEN_KEY) || "";
}

export function setToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

export async function backendFetch(path: string, options: RequestInit = {}) {
  const base = getBackendUrl();
  if (!base) {
    throw new Error(
      "Missing backend URL. Set REACT_APP_SH_BACKEND_API or SH_BACKEND_URL."
    );
  }

  const key = getApiKey();
  const token = getToken();

  const res = await fetch(`${base}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(key ? { "x-sh-api-key": key } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data;
}
