import { backendFetch, getToken, setToken } from "./sh-backend";

const API = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
const KEY =
  process.env.NEXT_PUBLIC_SH_API_KEY || process.env.NEXT_PUBLIC_API_KEY;

export async function api(path: string, options: RequestInit = {}) {
  if (typeof window !== "undefined" && API) {
    const token = getToken();
    const res = await fetch(`${API}${path}`, {
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
