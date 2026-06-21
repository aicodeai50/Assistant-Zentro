"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  askZentroRobot,
  clearRobotChatHistory,
  loadRobotChatHistory,
  saveRobotChatHistory,
  type RobotChatMessage,
} from "@/lib/robot/chat";
import { buildAssistantBriefing } from "@/lib/robot/briefing";
import {
  loadAssistantCloudState,
  mergeAssistantCloudState,
  saveAssistantCloudState,
} from "@/lib/robot/cloud";
import { useZentroRobot } from "@/lib/robot/context";
import {
  addRobotMemory,
  clearRobotMemory,
  loadRobotMemory,
  saveRobotMemory,
  type RobotMemoryItem,
} from "@/lib/robot/memory";
import {
  addRobotTask,
  clearRobotTasks,
  completeRobotTask,
  formatOpenRobotTasks,
  loadRobotTasks,
  saveRobotTasks,
  type RobotTaskItem,
} from "@/lib/robot/tasks";
import { ZENTRO_QUICK_SUGGESTIONS } from "@/lib/robot/suggestions";
import { SITE_NAME } from "@/lib/site";
import ZentroRobotAvatar from "./ZentroRobotAvatar";
import RobotMessageBody from "./RobotMessageBody";
import RobotTypewriter from "./RobotTypewriter";
import type { ZentroRobotPose } from "./ZentroRobotModel";

const DEFAULT_GREETING: RobotChatMessage = {
  role: "robot",
  text: `Welcome to ${SITE_NAME}. I’m your personal AI assistant — ask me anything, save memories, track tasks, or say “brief me” when you want your next move.`,
};

function extractMemoryCommand(text: string) {
  const trimmed = text.trim();
  const rememberMatch = trimmed.match(/^(?:remember|save this|note this)\s*:?\s*(.+)$/i);
  if (rememberMatch?.[1]) {
    return { type: "remember" as const, value: rememberMatch[1].trim() };
  }

  if (/^(?:forget|clear) (?:memory|memories|what you remember)$/i.test(trimmed)) {
    return { type: "clear" as const, value: "" };
  }

  if (/^(?:what do you remember|show memory|show memories|memory)$/i.test(trimmed)) {
    return { type: "list" as const, value: "" };
  }

  return null;
}

function extractTaskCommand(text: string) {
  const trimmed = text.trim();
  const addMatch = trimmed.match(
    /^(?:add task|create task|new task|todo|to-do|remind me to)\s*:?\s*(.+)$/i
  );
  if (addMatch?.[1]) {
    return { type: "add" as const, value: addMatch[1].trim() };
  }

  const completeMatch = trimmed.match(
    /^(?:complete task|finish task|done task|mark task done|mark task complete)\s+#?(\d+)$/i
  );
  if (completeMatch?.[1]) {
    return { type: "complete" as const, value: completeMatch[1] };
  }

  if (/^(?:tasks|show tasks|list tasks|what are my tasks|open tasks)$/i.test(trimmed)) {
    return { type: "list" as const, value: "" };
  }

  if (/^(?:clear tasks|delete tasks|reset tasks)$/i.test(trimmed)) {
    return { type: "clear" as const, value: "" };
  }

  return null;
}

function isBriefingCommand(text: string) {
  return /^(?:brief me|daily brief|show briefing|assistant brief|plan my day|what should i do next)$/i.test(
    text.trim()
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block h-1.5 w-1.5 rounded-full bg-fuchsia-500/80"
          style={{ animation: `zentro-typing 1s ease-in-out ${i * 0.15}s infinite` }}
        />
      ))}
    </span>
  );
}

export default function ZentroRobotChat() {
  const { open, openChat, closeChat, pendingMessage, clearPendingMessage, setPose: setGlobalPose } =
    useZentroRobot();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<RobotChatMessage[]>([DEFAULT_GREETING]);
  const [thinking, setThinking] = useState(false);
  const [pose, setPose] = useState<ZentroRobotPose>("wave");
  const [typingIndex, setTypingIndex] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [memory, setMemory] = useState<RobotMemoryItem[]>([]);
  const [tasks, setTasks] = useState<RobotTaskItem[]>([]);
  const [cloudEnabled, setCloudEnabled] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = loadRobotChatHistory();
    if (saved) setMessages(saved);
    const localMemory = loadRobotMemory();
    const localTasks = loadRobotTasks();
    setMemory(localMemory);
    setTasks(localTasks);
    setHydrated(true);

    loadAssistantCloudState().then((result) => {
      if (!result.ok || !result.signedIn || !result.state) return;
      const merged = mergeAssistantCloudState(
        { memory: localMemory, tasks: localTasks },
        result.state
      );
      setCloudEnabled(true);
      setMemory(merged.memory);
      setTasks(merged.tasks);
      saveRobotMemory(merged.memory);
      saveRobotTasks(merged.tasks);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveRobotChatHistory(messages);
  }, [messages, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveRobotMemory(memory);
  }, [memory, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveRobotTasks(tasks);
  }, [tasks, hydrated]);

  useEffect(() => {
    if (!hydrated || !cloudEnabled) return;
    void saveAssistantCloudState({ memory, tasks });
  }, [cloudEnabled, hydrated, memory, tasks]);

  useEffect(() => {
    if (!open) {
      setPose("wave");
      setGlobalPose("wave");
      return;
    }
    setPose("wave");
    setGlobalPose("wave");
    const timer = window.setTimeout(() => {
      setPose("idle");
      setGlobalPose("idle");
    }, 2600);
    inputRef.current?.focus();
    return () => window.clearTimeout(timer);
  }, [open, setGlobalPose]);

  const syncPose = useCallback((next: ZentroRobotPose) => {
    setPose(next);
    setGlobalPose(next);
  }, [setGlobalPose]);

  const submitMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || thinking) return;

      const history = messages;
      setInput("");
      const userMessage: RobotChatMessage = { role: "user", text: trimmed };
      setMessages((prev) => [...prev, userMessage]);

      const memoryCommand = extractMemoryCommand(trimmed);
      if (memoryCommand) {
        if (memoryCommand.type === "remember") {
          const nextMemory = addRobotMemory(memory, memoryCommand.value);
          setMemory(nextMemory);
          setMessages((prev) => [
            ...prev,
            {
              role: "robot",
              text: `Saved to memory: ${memoryCommand.value}`,
            },
          ]);
        } else if (memoryCommand.type === "clear") {
          clearRobotMemory();
          setMemory([]);
          setMessages((prev) => [
            ...prev,
            {
              role: "robot",
              text: "Memory cleared for this browser. Your chat history is still here unless you clear the conversation.",
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "robot",
              text: memory.length
                ? `Here is what I remember:\n${memory.map((item) => `- ${item.text}`).join("\n")}`
                : "I do not have any saved memory yet. Say “remember …” and I will keep it for future replies in this browser.",
            },
          ]);
        }
        setTypingIndex(messages.length + 1);
        syncPose("celebrate");
        window.setTimeout(() => syncPose("idle"), 1600);
        return;
      }

      const taskCommand = extractTaskCommand(trimmed);
      if (taskCommand) {
        if (taskCommand.type === "add") {
          const nextTasks = addRobotTask(tasks, taskCommand.value);
          setTasks(nextTasks);
          setMessages((prev) => [
            ...prev,
            {
              role: "robot",
              text: `Added task: ${taskCommand.value}\n\nOpen tasks:\n${formatOpenRobotTasks(nextTasks)}`,
            },
          ]);
        } else if (taskCommand.type === "complete") {
          const taskNumber = Number(taskCommand.value);
          const result = completeRobotTask(tasks, taskNumber);
          setTasks(result.items);
          setMessages((prev) => [
            ...prev,
            {
              role: "robot",
              text: result.completed
                ? `Completed task ${taskNumber}: ${result.completed.title}\n\nOpen tasks:\n${formatOpenRobotTasks(result.items)}`
                : `I could not find open task ${taskNumber}. Say “list tasks” to see the current task numbers.`,
            },
          ]);
        } else if (taskCommand.type === "clear") {
          clearRobotTasks();
          setTasks([]);
          setMessages((prev) => [
            ...prev,
            {
              role: "robot",
              text: "Tasks cleared for this browser.",
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "robot",
              text: `Open tasks:\n${formatOpenRobotTasks(tasks)}`,
            },
          ]);
        }
        setTypingIndex(messages.length + 1);
        syncPose("celebrate");
        window.setTimeout(() => syncPose("idle"), 1600);
        return;
      }

      if (isBriefingCommand(trimmed)) {
        setMessages((prev) => [
          ...prev,
          {
            role: "robot",
            text: buildAssistantBriefing(memory, tasks),
            href: "/assistant",
            label: "Open command center",
          },
        ]);
        setTypingIndex(messages.length + 1);
        syncPose("celebrate");
        window.setTimeout(() => syncPose("idle"), 1600);
        return;
      }

      setThinking(true);
      syncPose("talk");

      try {
        const reply = await askZentroRobot(trimmed, history, memory, tasks);
        setMessages((prev) => {
          const next = [...prev, reply];
          setTypingIndex(next.length - 1);
          return next;
        });
        syncPose("celebrate");
        window.setTimeout(() => syncPose("idle"), 2200);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "robot",
            text: "I hit a snag, but I'm still here. Try again or visit /contact for help.",
          },
        ]);
        syncPose("idle");
      } finally {
        setThinking(false);
      }
    },
    [messages, thinking, memory, tasks, syncPose]
  );

  useEffect(() => {
    if (!open || !pendingMessage || thinking) return;
    const msg = pendingMessage;
    clearPendingMessage();
    void submitMessage(msg);
  }, [open, pendingMessage, thinking, clearPendingMessage, submitMessage]);

  function handleNewChat() {
    clearRobotChatHistory();
    setMessages([DEFAULT_GREETING]);
    setTypingIndex(null);
    syncPose("wave");
  }

  function handleClearMemory() {
    clearRobotMemory();
    setMemory([]);
    setMessages((prev) => [
      ...prev,
      {
        role: "robot",
        text: "Memory cleared. I will stop using saved browser context in future replies.",
      },
    ]);
    syncPose("wave");
  }

  function handleClearTasks() {
    clearRobotTasks();
    setTasks([]);
    setMessages((prev) => [
      ...prev,
      {
        role: "robot",
        text: "Tasks cleared. I will stop using saved task context in future replies.",
      },
    ]);
    syncPose("wave");
  }

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking, typingIndex]);

  const showSuggestions = messages.length <= 2 && !thinking;
  const openTaskCount = tasks.filter((item) => item.status === "open").length;

  return (
    <div className="fixed bottom-3 right-3 z-[90] sm:bottom-5 sm:right-5">
      {open ? (
        <>
          <div
            className="fixed inset-0 bg-fuchsia-950/45 backdrop-blur-[2px] sm:hidden"
            onClick={closeChat}
            aria-hidden
          />

          <div
            className="fixed inset-x-3 bottom-3 z-[100] flex max-h-[90dvh] flex-col overflow-hidden rounded-[28px] border border-white/55 bg-[#fff7fb] text-slate-900 shadow-[0_24px_90px_rgba(126,34,206,0.35)] backdrop-blur-2xl sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(640px,86dvh)] sm:w-[min(380px,calc(100vw-2rem))]"
            role="dialog"
            aria-label={`${SITE_NAME} operations console`}
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-violet-700 via-fuchsia-600 to-rose-400 px-4 pb-5 pt-5 text-white">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.28),transparent_28%),radial-gradient(circle_at_90%_0%,rgba(34,211,238,0.18),transparent_28%)]" />
              <div className="relative flex items-start justify-between gap-3">
                <div className="w-8" />
                <div className="flex min-w-0 flex-1 flex-col items-center text-center">
                  <div className="flex items-center gap-2">
                    <ZentroRobotAvatar
                      pose={thinking ? "talk" : pose}
                      className="h-9 w-9 rounded-xl border-white/20 bg-white/15"
                    />
                    <span className="text-2xl font-bold tracking-tight">Zentro Assistant</span>
                  </div>
                  <div className="mt-2 text-sm font-medium text-white/85">Your personal AI ✨</div>
                  <div className="mt-3 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/80">
                    {thinking
                      ? "Thinking..."
                      : memory.length || openTaskCount
                        ? `${memory.length} memor${memory.length === 1 ? "y" : "ies"} · ${openTaskCount} task${openTaskCount === 1 ? "" : "s"}${cloudEnabled ? " · synced" : ""}`
                        : "Ready"}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeChat}
                  className="relative rounded-full bg-white/15 px-2 py-1 text-sm text-white/85 transition hover:bg-white/25"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="relative mt-4 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={handleNewChat}
                    className="rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold text-white/85 transition hover:bg-white/25"
                    title="New conversation"
                  >
                    Clear
                  </button>
                  {memory.length ? (
                    <button
                      type="button"
                      onClick={handleClearMemory}
                      className="rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold text-white/85 transition hover:bg-white/25"
                      title="Clear assistant memory"
                    >
                      Memory
                    </button>
                  ) : null}
                  {openTaskCount ? (
                    <button
                      type="button"
                      onClick={handleClearTasks}
                      className="rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold text-white/85 transition hover:bg-white/25"
                      title="Clear assistant tasks"
                    >
                      Tasks
                    </button>
                  ) : null}
              </div>
            </div>

            <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto bg-[#fff7fb] px-3 py-4">
              <div className="space-y-3">
                {messages.map((msg, i) => {
                  const isLatestRobot = msg.role === "robot" && i === messages.length - 1;
                  const animate = isLatestRobot && typingIndex === i && !thinking;

                  return (
                    <div key={`${i}-${msg.text.slice(0, 12)}`} className="flex flex-col gap-1">
                      <span
                        className={[
                          "px-1 text-[11px] font-bold",
                          msg.role === "user" ? "ml-auto text-fuchsia-700/70" : "text-slate-700",
                        ].join(" ")}
                      >
                        {msg.role === "user" ? "You:" : "🤖 Zentro Assistant:"}
                      </span>
                      <div
                        className={[
                          "max-w-[92%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-[1.55] shadow-sm",
                          msg.role === "user"
                            ? "ml-auto bg-[#ffd4e7] text-slate-900"
                            : "border border-slate-200/70 bg-white text-slate-800",
                        ].join(" ")}
                      >
                        {msg.role === "robot" ? (
                          animate ? (
                            <RobotTypewriter
                              text={msg.text}
                              active
                              onDone={() => setTypingIndex(null)}
                            />
                          ) : (
                            <RobotMessageBody text={msg.text} />
                          )
                        ) : (
                          msg.text
                        )}
                      </div>

                      {msg.role === "robot" && msg.href && (!animate || typingIndex !== i) ? (
                        <Link
                          href={msg.href}
                          className="mt-1.5 inline-flex items-center gap-1 rounded-lg border border-fuchsia-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-fuchsia-700 hover:bg-fuchsia-50"
                        >
                          {msg.label || "Learn more"} →
                        </Link>
                      ) : null}
                    </div>
                  );
                })}

                {thinking ? (
                  <div className="max-w-[92%] rounded-2xl border border-slate-200/70 bg-white px-3 py-2.5 text-sm text-slate-600 shadow-sm">
                    <TypingDots />
                  </div>
                ) : null}
              </div>

              {showSuggestions ? (
                <div className="mt-4 border-t border-pink-100 pt-3">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    Quick ideas
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ZENTRO_QUICK_SUGGESTIONS.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => void submitMessage(item.prompt)}
                        className="rounded-full border border-pink-100 bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-500 transition hover:border-fuchsia-200 hover:text-fuchsia-700"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-pink-100 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") void submitMessage(input);
                  }}
                  placeholder="Ask me anything"
                  disabled={thinking}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-100 disabled:opacity-55"
                />
                <button
                  type="button"
                  onClick={() => void submitMessage(input)}
                  disabled={thinking || !input.trim()}
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(217,70,239,0.25)] transition hover:brightness-105 disabled:opacity-45"
                >
                  Send 🚀
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] font-medium text-slate-400">
                Memory · Tasks · Briefings
              </p>
            </div>
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={() => openChat()}
          className="group flex items-center gap-2.5 rounded-2xl border border-white/30 bg-gradient-to-r from-violet-700 via-fuchsia-600 to-rose-400 py-2 pl-2 pr-4 text-[13px] font-semibold text-white shadow-[0_12px_45px_rgba(217,70,239,0.35)] backdrop-blur-xl transition hover:scale-[1.02] hover:brightness-105"
        >
          <ZentroRobotAvatar
            pose="wave"
            className="h-10 w-10 rounded-xl border-white/20 bg-white/15"
          />
          <span className="hidden sm:inline">Zentro Assistant</span>
          <span className="sm:hidden">Assistant</span>
          <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" />
        </button>
      )}
    </div>
  );
}
