import { zentroLocalReplyRich, type ZentroLocalReply } from "@/lib/robot/fallback";
import { ZENTRO_ROBOT_SYSTEM_PROMPT } from "@/lib/robot/prompt";

export type RobotChatMessage = {
  role: "user" | "robot";
  text: string;
  href?: string;
  label?: string;
};

const STORAGE_KEY = "zentro_robot_chat_v1";

export function loadRobotChatHistory(): RobotChatMessage[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RobotChatMessage[];
    return Array.isArray(parsed) && parsed.length ? parsed : null;
  } catch {
    return null;
  }
}

export function saveRobotChatHistory(messages: RobotChatMessage[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40)));
  } catch {
    // ignore quota errors
  }
}

export function clearRobotChatHistory() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export async function askZentroRobot(
  message: string,
  history: RobotChatMessage[] = []
): Promise<RobotChatMessage> {
  const trimmed = message.trim();
  if (!trimmed) {
    const local = zentroLocalReplyRich("");
    return { role: "robot", text: local.text, href: local.href, label: local.label };
  }

  try {
    const res = await fetch("/api/public/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        message: trimmed,
        systemPrompt: ZENTRO_ROBOT_SYSTEM_PROMPT,
        messages: history.map((m) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.text,
        })),
      }),
    });

    const raw = await res.text();
    let data: {
      answer?: string;
      reply?: string;
      message?: string;
      source?: string;
      href?: string;
      label?: string;
    } | null = null;

    try {
      data = raw ? JSON.parse(raw) : null;
    } catch {
      data = null;
    }

    const answer =
      data?.answer || data?.reply || data?.message || (res.ok && raw ? raw : "");

    if (answer.trim()) {
      const rich = data?.source === "local" ? zentroLocalReplyRich(trimmed) : null;
      return {
        role: "robot",
        text: answer.trim(),
        href: data?.href || rich?.href,
        label: data?.label || rich?.label,
      };
    }
  } catch {
    // fall through
  }

  const local = zentroLocalReplyRich(trimmed);
  return {
    role: "robot",
    text: local.text,
    href: local.href,
    label: local.label,
  };
}
