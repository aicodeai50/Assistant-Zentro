import type { RobotMemoryItem } from "@/lib/robot/memory";
import type { RobotTaskItem } from "@/lib/robot/tasks";

function newestMemory(items: RobotMemoryItem[]) {
  return [...items].slice(0, 4);
}

function openTasks(items: RobotTaskItem[]) {
  return items.filter((item) => item.status === "open").slice(0, 5);
}

function completedToday(items: RobotTaskItem[]) {
  const today = new Date().toISOString().slice(0, 10);
  return items.filter(
    (item) => item.status === "done" && item.completedAt?.startsWith(today)
  );
}

export function buildAssistantBriefing(memory: RobotMemoryItem[], tasks: RobotTaskItem[]) {
  const context = newestMemory(memory);
  const activeTasks = openTasks(tasks);
  const doneToday = completedToday(tasks);
  const primaryTask = activeTasks[0]?.title;

  return [
    "Assistant Zentro Briefing",
    "",
    `Status: ${activeTasks.length} open task${activeTasks.length === 1 ? "" : "s"}, ${doneToday.length} completed today, ${memory.length} saved memor${memory.length === 1 ? "y" : "ies"}.`,
    "",
    "Current focus:",
    primaryTask ? `- ${primaryTask}` : "- No open task is set. Add one with “add task ...”.",
    "",
    "Useful context:",
    context.length
      ? context.map((item) => `- ${item.text}`).join("\n")
      : "- No saved memory yet. Add project context with “remember ...”.",
    "",
    "Next actions:",
    activeTasks.length
      ? activeTasks.map((item, index) => `${index + 1}. ${item.title}`).join("\n")
      : "1. Capture the next concrete action for this project.",
    "",
    "Recommended move:",
    primaryTask
      ? `Start with task 1, define the smallest visible outcome, then mark it complete when done.`
      : "Add one high-impact task, then ask Assistant Zentro to help break it into steps.",
  ].join("\n");
}
