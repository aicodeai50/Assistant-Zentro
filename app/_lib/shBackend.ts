import { getShBackendApiUrl } from "@/lib/backend-env";

type ChatPayload = {
  message: string;
  mode?: "advisor" | "tutor" | "teacher";
  facultySlug?: string;
  program?: string;
  language?: string;
};

export async function shChat(payload: ChatPayload) {
  const res = await fetch("/api/backend/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Backend error ${res.status}: ${txt || res.statusText}`);
  }

  return res.json();
}

/** @deprecated Use getShBackendApiUrl() from @/lib/backend-env on the server. */
export const SH_BACKEND_URL = getShBackendApiUrl();
