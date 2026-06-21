export async function apiFetch<T>(
  path: string,
  apiKey: string = "",
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  const text = await res.text();

  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Non-JSON response from ${path}: ${text.slice(0, 160)}`);
  }

  if (!res.ok) {
    const err = data as { error?: string; detail?: string };
    throw new Error(err?.error || err?.detail || "Request failed");
  }

  return data as T;
}

export type GenerateApiResponse = {
  success: boolean;
  name?: string;
  purpose?: string;
  template?: string;
  config?: Record<string, unknown>;
  input?: Record<string, unknown>;
  slug?: string;
  draft?: {
    name?: string;
    purpose?: string;
    template?: string;
    config?: Record<string, unknown>;
    input?: Record<string, unknown>;
    slug?: string;
  };
  [key: string]: unknown;
};

export async function generateApiFromPrompt(
  apiKey: string,
  prompt: string
): Promise<GenerateApiResponse> {
  return apiFetch<GenerateApiResponse>("/api/proxy/generate-api", apiKey, {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
}
