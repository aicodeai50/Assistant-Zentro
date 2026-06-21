export type RobotTaskItem = {
  id: string;
  title: string;
  status: "open" | "done";
  createdAt: string;
  completedAt?: string;
};

const TASKS_KEY = "zentro_robot_tasks_v1";
const MAX_TASK_ITEMS = 30;
const MAX_TASK_TITLE_LENGTH = 160;

function createTaskId() {
  return `task_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeTaskTitle(title: string) {
  return title.replace(/\s+/g, " ").trim().slice(0, MAX_TASK_TITLE_LENGTH);
}

export function loadRobotTasks(): RobotTaskItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(TASKS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as RobotTaskItem[];
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item) => typeof item?.title === "string" && item.title.trim())
      .slice(0, MAX_TASK_ITEMS);
  } catch {
    return [];
  }
}

export function saveRobotTasks(items: RobotTaskItem[]) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      TASKS_KEY,
      JSON.stringify(items.filter((item) => item.title.trim()).slice(0, MAX_TASK_ITEMS))
    );
  } catch {
    // Ignore localStorage quota and privacy-mode errors.
  }
}

export function addRobotTask(items: RobotTaskItem[], title: string): RobotTaskItem[] {
  const normalized = normalizeTaskTitle(title);
  if (!normalized) return items;

  return [
    {
      id: createTaskId(),
      title: normalized,
      status: "open" as const,
      createdAt: new Date().toISOString(),
    },
    ...items,
  ].slice(0, MAX_TASK_ITEMS);
}

export function completeRobotTask(items: RobotTaskItem[], taskNumber: number) {
  const openTasks = items.filter((item) => item.status === "open");
  const target = openTasks[taskNumber - 1];
  if (!target) return { items, completed: null as RobotTaskItem | null };

  const completedAt = new Date().toISOString();
  const nextItems = items.map((item) =>
    item.id === target.id ? { ...item, status: "done" as const, completedAt } : item
  );

  return {
    items: nextItems,
    completed: { ...target, status: "done" as const, completedAt },
  };
}

export function clearRobotTasks() {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(TASKS_KEY);
  } catch {
    // ignore
  }
}

export function formatOpenRobotTasks(items: RobotTaskItem[]) {
  const openTasks = items.filter((item) => item.status === "open");
  if (!openTasks.length) return "No open tasks.";

  return openTasks.map((item, index) => `${index + 1}. ${item.title}`).join("\n");
}

export function buildRobotTaskContext(items: RobotTaskItem[]) {
  const openTasks = items.filter((item) => item.status === "open").slice(0, 10);
  if (!openTasks.length) return "";

  return [
    "Open user tasks in this browser:",
    ...openTasks.map((item, index) => `${index + 1}. ${item.title}`),
    "When relevant, help the user make progress on these tasks. Do not claim tasks are completed unless the user says so.",
  ].join("\n");
}
