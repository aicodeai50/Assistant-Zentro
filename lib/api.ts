import { backendFetch, getBackendUrl, getToken, setToken } from "./sh-backend";

export async function api(path: string, options: RequestInit = {}) {
  const base = getBackendUrl();
  const KEY =
    process.env.NEXT_PUBLIC_SH_API_KEY || process.env.NEXT_PUBLIC_API_KEY;

  if (typeof window !== "undefined" && base) {
    const token = getToken();
    const res = await fetch(`${base}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(KEY ? { "x-sh-api-key": KEY } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
      credentials: "include",
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data?.error || "Request failed");
    }
    return data;
  }

  return backendFetch(path, options);
}

export { setToken, getToken, backendFetch };
