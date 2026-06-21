"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  loadAssistantCloudState,
  mergeAssistantCloudState,
  saveAssistantCloudState,
} from "@/lib/robot/cloud";
import { buildAssistantBriefing } from "@/lib/robot/briefing";
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
  loadRobotTasks,
  saveRobotTasks,
  type RobotTaskItem,
} from "@/lib/robot/tasks";

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return "Saved";
  }
}

export default function AssistantCommandCenterPage() {
  const [memory, setMemory] = useState<RobotMemoryItem[]>([]);
  const [tasks, setTasks] = useState<RobotTaskItem[]>([]);
  const [memoryText, setMemoryText] = useState("");
  const [taskText, setTaskText] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [syncStatus, setSyncStatus] = useState("Local only");
  const [briefingCopied, setBriefingCopied] = useState(false);

  useEffect(() => {
    const localMemory = loadRobotMemory();
    const localTasks = loadRobotTasks();
    setMemory(localMemory);
    setTasks(localTasks);
    setHydrated(true);

    loadAssistantCloudState().then((result) => {
      if (!result.signedIn) {
        setSyncStatus("Local only");
        return;
      }

      if (!result.ok || !result.state) {
        setSyncStatus("Cloud setup needed");
        return;
      }

      const merged = mergeAssistantCloudState(
        { memory: localMemory, tasks: localTasks },
        result.state
      );
      setMemory(merged.memory);
      setTasks(merged.tasks);
      saveRobotMemory(merged.memory);
      saveRobotTasks(merged.tasks);
      setSyncStatus("Synced");
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveRobotMemory(memory);
  }, [hydrated, memory]);

  useEffect(() => {
    if (!hydrated) return;
    saveRobotTasks(tasks);
  }, [hydrated, tasks]);

  const openTasks = useMemo(() => tasks.filter((item) => item.status === "open"), [tasks]);
  const doneTasks = useMemo(() => tasks.filter((item) => item.status === "done"), [tasks]);
  const briefing = useMemo(() => buildAssistantBriefing(memory, tasks), [memory, tasks]);

  function handleAddMemory() {
    const next = addRobotMemory(memory, memoryText);
    setMemory(next);
    setMemoryText("");
  }

  function handleAddTask() {
    const next = addRobotTask(tasks, taskText);
    setTasks(next);
    setTaskText("");
  }

  function updateTaskStatus(id: string, status: RobotTaskItem["status"]) {
    setTasks((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              completedAt: status === "done" ? new Date().toISOString() : undefined,
            }
          : item
      )
    );
  }

  function removeMemory(id: string) {
    setMemory((current) => current.filter((item) => item.id !== id));
  }

  function removeTask(id: string) {
    setTasks((current) => current.filter((item) => item.id !== id));
  }

  function handleClearMemory() {
    clearRobotMemory();
    setMemory([]);
  }

  function handleClearTasks() {
    clearRobotTasks();
    setTasks([]);
  }

  async function handlePullCloud() {
    setSyncStatus("Pulling...");
    const result = await loadAssistantCloudState();

    if (!result.signedIn) {
      setSyncStatus("Sign in to sync");
      return;
    }

    if (!result.ok || !result.state) {
      setSyncStatus("Cloud setup needed");
      return;
    }

    const merged = mergeAssistantCloudState({ memory, tasks }, result.state);
    setMemory(merged.memory);
    setTasks(merged.tasks);
    saveRobotMemory(merged.memory);
    saveRobotTasks(merged.tasks);
    setSyncStatus("Synced");
  }

  async function handlePushCloud() {
    setSyncStatus("Saving...");
    const result = await saveAssistantCloudState({ memory, tasks });

    if (!result.signedIn) {
      setSyncStatus("Sign in to sync");
      return;
    }

    setSyncStatus(result.ok ? "Synced" : "Cloud setup needed");
  }

  function handleCopyBriefing() {
    navigator.clipboard.writeText(briefing).then(() => {
      setBriefingCopied(true);
      window.setTimeout(() => setBriefingCopied(false), 1800);
    });
  }

  return (
    <main className="relative z-10 min-h-screen px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="zentro-card overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <p className="zentro-section-label">Assistant Command Center</p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Manage what Assistant Zentro remembers and tracks.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/58 sm:text-base">
                This panel uses the same local memory and task storage as the chat popup.
                Keep project context, next actions, and completed work visible while you build.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.06] p-4">
                <div className="text-3xl font-semibold text-cyan-100">{memory.length}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.14em] text-white/40">
                  Memories
                </div>
              </div>
              <div className="rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.06] p-4">
                <div className="text-3xl font-semibold text-emerald-100">{openTasks.length}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.14em] text-white/40">
                  Open Tasks
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-3xl font-semibold text-white">{doneTasks.length}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.14em] text-white/40">
                  Completed
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-white/35">Cloud sync</div>
              <div className="mt-1 text-sm text-white/70">{syncStatus}</div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handlePullCloud}
                className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-cyan-300/30 hover:text-cyan-100"
              >
                Pull
              </button>
              <button
                type="button"
                onClick={handlePushCloud}
                className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-white/90"
              >
                Save cloud
              </button>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="zentro-card p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="zentro-section-label">Memory</p>
                <h2 className="mt-2 text-2xl font-semibold">Browser memory</h2>
              </div>
              {memory.length ? (
                <button
                  type="button"
                  onClick={handleClearMemory}
                  className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/55 transition hover:border-red-300/30 hover:text-red-100"
                >
                  Clear
                </button>
              ) : null}
            </div>

            <div className="mt-5 flex gap-2">
              <input
                value={memoryText}
                onChange={(event) => setMemoryText(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleAddMemory();
                }}
                placeholder="Remember my current project is..."
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-cyan-300/35"
              />
              <button
                type="button"
                onClick={handleAddMemory}
                disabled={!memoryText.trim()}
                className="rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 disabled:opacity-40"
              >
                Add
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {memory.length ? (
                memory.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm leading-6 text-white/78">{item.text}</p>
                      <button
                        type="button"
                        onClick={() => removeMemory(item.id)}
                        className="text-xs text-white/35 transition hover:text-red-100"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-white/30">
                      {formatDate(item.createdAt)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/12 p-5 text-sm text-white/45">
                  No saved memory yet. Add context here or say “remember ...” in the chat.
                </div>
              )}
            </div>
          </div>

          <div className="zentro-card p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="zentro-section-label">Tasks</p>
                <h2 className="mt-2 text-2xl font-semibold">Next actions</h2>
              </div>
              {tasks.length ? (
                <button
                  type="button"
                  onClick={handleClearTasks}
                  className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/55 transition hover:border-red-300/30 hover:text-red-100"
                >
                  Clear
                </button>
              ) : null}
            </div>

            <div className="mt-5 flex gap-2">
              <input
                value={taskText}
                onChange={(event) => setTaskText(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleAddTask();
                }}
                placeholder="Add task: connect backend actions..."
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-emerald-300/35"
              />
              <button
                type="button"
                onClick={handleAddTask}
                disabled={!taskText.trim()}
                className="rounded-xl bg-emerald-300 px-4 py-3 text-sm font-semibold text-slate-950 disabled:opacity-40"
              >
                Add
              </button>
            </div>

            <div className="mt-6">
              <h3 className="text-xs uppercase tracking-[0.16em] text-white/40">Open</h3>
              <div className="mt-3 space-y-3">
                {openTasks.length ? (
                  openTasks.map((item, index) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.04] p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-300/20 text-xs text-emerald-100">
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm leading-6 text-white/82">{item.title}</p>
                          <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-white/30">
                            {formatDate(item.createdAt)}
                          </div>
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <button
                            type="button"
                            onClick={() => updateTaskStatus(item.id, "done")}
                            className="rounded-lg border border-emerald-300/20 px-3 py-1.5 text-xs text-emerald-100 transition hover:bg-emerald-300/10"
                          >
                            Done
                          </button>
                          <button
                            type="button"
                            onClick={() => removeTask(item.id)}
                            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/40 transition hover:text-red-100"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/12 p-5 text-sm text-white/45">
                    No open tasks. Add one here or say “add task ...” in the chat.
                  </div>
                )}
              </div>
            </div>

            {doneTasks.length ? (
              <div className="mt-7">
                <h3 className="text-xs uppercase tracking-[0.16em] text-white/40">Completed</h3>
                <div className="mt-3 space-y-2">
                  {doneTasks.slice(0, 8).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3"
                    >
                      <span className="text-sm text-white/45 line-through">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => updateTaskStatus(item.id, "open")}
                        className="text-xs text-cyan-100/70 transition hover:text-cyan-100"
                      >
                        Reopen
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="zentro-card mt-8 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="zentro-section-label">Briefing</p>
              <h2 className="mt-2 text-2xl font-semibold">Today’s operating brief</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
                Generated locally from saved memory and tasks. You can also ask the chat:
                “brief me” or “what should I do next”.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyBriefing}
              className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10"
            >
              {briefingCopied ? "Copied" : "Copy brief"}
            </button>
          </div>

          <pre className="mt-5 overflow-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/30 p-5 text-sm leading-7 text-white/72">
            {briefing}
          </pre>
        </section>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/55">
          <span>Tip: chat commands still work: “remember ...”, “add task ...”, “brief me”.</span>
          <Link href="/docs" className="zentro-link">
            View docs →
          </Link>
        </div>
      </div>
    </main>
  );
}
