export const AUTH_KEY = "shynvo_api_key";

export function getStoredApiKey(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(AUTH_KEY) || "";
}

export function setStoredApiKey(value: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_KEY, value);
}

export function clearStoredApiKey() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_KEY);
}
