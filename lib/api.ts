const API = process.env.NEXT_PUBLIC_API_URL;
const KEY = process.env.NEXT_PUBLIC_SH_API_KEY;

export async function api(path: string, options: RequestInit = {}) {
  if (!API) throw new Error("NEXT_PUBLIC_API_URL missing");
  if (!KEY) throw new Error("NEXT_PUBLIC_SH_API_KEY missing");

  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-sh-api-key": KEY, // ✅ MUST MATCH BACKEND
      ...(options.headers || {}),
    },
    credentials: "include", // ✅ cookies for /auth/me
  });

  // Try to return useful error messages
  if (!res.ok) {
    let msg = "Request failed";
    try {
      const j = await res.json();
      msg = j?.error || j?.details || msg;
    } catch {
      msg = await res.text();
    }
    throw new Error(msg || "Request failed");
  }

  return res.json();
}