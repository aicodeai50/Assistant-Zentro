export type RobotMemoryItem = {
  id: string;
  text: string;
  createdAt: string;
};

const MEMORY_KEY = "zentro_robot_memory_v1";
const MAX_MEMORY_ITEMS = 12;
const MAX_MEMORY_TEXT_LENGTH = 180;

function createMemoryId() {
  return `mem_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeMemoryText(text: string) {
  return text.replace(/\s+/g, " ").trim().slice(0, MAX_MEMORY_TEXT_LENGTH);
}

export function loadRobotMemory(): RobotMemoryItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(MEMORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as RobotMemoryItem[];
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item) => typeof item?.text === "string" && item.text.trim())
      .slice(0, MAX_MEMORY_ITEMS);
  } catch {
    return [];
  }
}

export function saveRobotMemory(items: RobotMemoryItem[]) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      MEMORY_KEY,
      JSON.stringify(items.filter((item) => item.text.trim()).slice(0, MAX_MEMORY_ITEMS))
    );
  } catch {
    // Ignore localStorage quota and privacy-mode errors.
  }
}

export function addRobotMemory(items: RobotMemoryItem[], text: string) {
  const normalized = normalizeMemoryText(text);
  if (!normalized) return items;

  const duplicate = items.some(
    (item) => item.text.toLowerCase() === normalized.toLowerCase()
  );
  if (duplicate) return items;

  return [
    {
      id: createMemoryId(),
      text: normalized,
      createdAt: new Date().toISOString(),
    },
    ...items,
  ].slice(0, MAX_MEMORY_ITEMS);
}

export function clearRobotMemory() {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(MEMORY_KEY);
  } catch {
    // ignore
  }
}

export function buildRobotMemoryContext(items: RobotMemoryItem[]) {
  if (!items.length) return "";

  return [
    "Known user/project memory for this browser session:",
    ...items.map((item, index) => `${index + 1}. ${item.text}`),
    "Use this memory only when it is relevant. Do not reveal it unless the user asks what you remember.",
  ].join("\n");
}
