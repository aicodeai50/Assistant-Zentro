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
import { useZentroRobot } from "@/lib/robot/context";
import { ZENTRO_QUICK_SUGGESTIONS } from "@/lib/robot/suggestions";
import { SITE_NAME } from "@/lib/site";
import ZentroRobotAvatar from "./ZentroRobotAvatar";
import RobotMessageBody from "./RobotMessageBody";
import RobotTypewriter from "./RobotTypewriter";
import type { ZentroRobotPose } from "./ZentroRobotModel";

const DEFAULT_GREETING: RobotChatMessage = {
  role: "robot",
  text: `Welcome to ${SITE_NAME}. I'm your operations assistant — ask about incident triage, safe automations, runbooks, pricing, or how to get started.`,
};

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-300/80"
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
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = loadRobotChatHistory();
    if (saved) setMessages(saved);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveRobotChatHistory(messages);
  }, [messages, hydrated]);

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

  function syncPose(next: ZentroRobotPose) {
    setPose(next);
    setGlobalPose(next);
  }

  const submitMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || thinking) return;

      const history = messages;
      setInput("");
      setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
      setThinking(true);
      syncPose("talk");

      try {
        const reply = await askZentroRobot(trimmed, history);
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
    [messages, thinking, setGlobalPose]
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

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking, typingIndex]);

  const showSuggestions = messages.length <= 2 && !thinking;

  return (
    <div className="fixed bottom-3 right-3 z-[90] sm:bottom-5 sm:right-5">
      {open ? (
        <>
          <div
            className="fixed inset-0 bg-black/55 backdrop-blur-[2px] sm:hidden"
            onClick={closeChat}
            aria-hidden
          />

          <div
            className="fixed inset-x-0 bottom-0 z-[100] flex max-h-[88dvh] flex-col overflow-hidden rounded-t-2xl border border-white/10 bg-[#050810]/98 shadow-[0_-12px_80px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[min(680px,85dvh)] sm:w-[min(440px,calc(100vw-2rem))] sm:max-h-none sm:rounded-2xl"
            role="dialog"
            aria-label={`${SITE_NAME} operations console`}
          >
            <div className="border-b border-white/[0.06] px-4 py-3.5">
              <div className="flex items-center gap-3">
                <ZentroRobotAvatar pose={thinking ? "talk" : pose} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">Operations Assistant</span>
                    <span className="rounded border border-emerald-400/25 bg-emerald-400/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                      Live
                    </span>
                  </div>
                  <div className="mt-0.5 font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.1em] text-white/40">
                    {thinking ? "Processing inquiry…" : "Zentro AI · No login required"}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleNewChat}
                    className="rounded-md px-2 py-1 text-[11px] font-medium text-white/50 hover:bg-white/[0.05] hover:text-white"
                    title="New conversation"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={closeChat}
                    className="rounded-md px-2 py-1 text-sm text-white/60 hover:bg-white/[0.05] hover:text-white"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>

            <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              <div className="space-y-4">
                {messages.map((msg, i) => {
                  const isLatestRobot = msg.role === "robot" && i === messages.length - 1;
                  const animate = isLatestRobot && typingIndex === i && !thinking;

                  return (
                    <div key={`${i}-${msg.text.slice(0, 12)}`} className="flex flex-col gap-1">
                      <span className="font-[family-name:var(--font-space-mono)] text-[9px] uppercase tracking-[0.12em] text-white/30">
                        {msg.role === "user" ? "You" : "Assistant"}
                      </span>
                      <div
                        className={[
                          "max-w-[94%] rounded-xl px-3.5 py-2.5 text-[13px] leading-[1.65]",
                          msg.role === "user"
                            ? "ml-auto border border-cyan-400/20 bg-cyan-400/10 text-cyan-50"
                            : "border border-white/[0.06] bg-white/[0.03] text-white/88",
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
                          className="mt-1.5 inline-flex items-center gap-1 rounded-lg border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-1.5 text-[11px] font-semibold text-cyan-100 hover:bg-cyan-400/10"
                        >
                          {msg.label || "Learn more"} →
                        </Link>
                      ) : null}
                    </div>
                  );
                })}

                {thinking ? (
                  <div className="max-w-[92%] rounded-2xl border border-white/8 bg-white/[0.04] px-3 py-2.5 text-sm text-white/70">
                    <TypingDots />
                  </div>
                ) : null}
              </div>

              {showSuggestions ? (
                <div className="mt-5 border-t border-white/[0.05] pt-4">
                  <p className="mb-2 font-[family-name:var(--font-space-mono)] text-[9px] uppercase tracking-[0.14em] text-white/35">
                    Suggested inquiries
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ZENTRO_QUICK_SUGGESTIONS.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => void submitMessage(item.prompt)}
                        className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-1.5 text-[10px] font-medium text-white/60 transition hover:border-cyan-400/25 hover:text-cyan-100"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-white/[0.06] bg-black/20 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") void submitMessage(input);
                  }}
                  placeholder="Describe your operations question…"
                  disabled={thinking}
                  className="w-full rounded-xl border border-white/[0.08] bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-cyan-400/30 focus:ring-1 focus:ring-cyan-400/15 disabled:opacity-55"
                />
                <button
                  type="button"
                  onClick={() => void submitMessage(input)}
                  disabled={thinking || !input.trim()}
                  className="rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105 disabled:opacity-45"
                >
                  Send
                </button>
              </div>
              <p className="mt-2 text-center font-[family-name:var(--font-space-mono)] text-[9px] uppercase tracking-[0.12em] text-white/30">
                Encrypted in transit · Audit-friendly responses
              </p>
            </div>
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={() => openChat()}
          className="group flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#050810]/95 py-2 pl-2 pr-4 text-[13px] font-semibold text-white shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl transition hover:border-cyan-400/30 hover:shadow-[0_8px_40px_rgba(34,211,238,0.12)]"
        >
          <ZentroRobotAvatar
            pose="wave"
            className="h-10 w-10 rounded-lg border-white/10"
          />
          <span className="hidden sm:inline">Operations Assistant</span>
          <span className="sm:hidden">Assistant</span>
          <span className="zentro-status-dot scale-75" />
        </button>
      )}
    </div>
  );
}
