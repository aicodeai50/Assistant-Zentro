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
  text: `Hi! I'm ${SITE_NAME}. Ask me anything about IT operations, incidents, automations, pricing, or where to go next — I'm all ears (and a waving hand).`,
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
            className="fixed inset-x-0 bottom-0 z-[100] flex max-h-[88dvh] flex-col overflow-hidden rounded-t-3xl border border-cyan-400/25 bg-[#070a12]/97 shadow-[0_-8px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[min(640px,82dvh)] sm:w-[min(420px,calc(100vw-2rem))] sm:max-h-none sm:rounded-3xl"
            role="dialog"
            aria-label={`${SITE_NAME} chat`}
          >
            <div className="relative border-b border-white/10 px-4 py-3">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-violet-500/10" />
              <div className="relative flex items-center gap-3">
                <ZentroRobotAvatar pose={thinking ? "talk" : pose} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-white">{SITE_NAME}</div>
                  <div className="text-xs text-cyan-200/75">
                    {thinking ? "Thinking…" : "Online · smiling & waving"}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleNewChat}
                    className="rounded-lg px-2 py-1 text-[11px] text-white/55 hover:bg-white/5 hover:text-white"
                    title="New conversation"
                  >
                    New
                  </button>
                  <button
                    type="button"
                    onClick={closeChat}
                    className="rounded-xl px-2 py-1 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                    aria-label="Close chat"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>

            <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              <div className="space-y-3">
                {messages.map((msg, i) => {
                  const isLatestRobot = msg.role === "robot" && i === messages.length - 1;
                  const animate = isLatestRobot && typingIndex === i && !thinking;

                  return (
                    <div key={`${i}-${msg.text.slice(0, 12)}`}>
                      <div
                        className={[
                          "max-w-[92%] rounded-2xl px-3 py-2.5 text-sm leading-6",
                          msg.role === "user"
                            ? "ml-auto bg-cyan-300 text-slate-950"
                            : "border border-white/8 bg-white/[0.04] text-white/90",
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
                          className="mt-2 inline-flex rounded-xl border border-cyan-400/25 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-100 hover:bg-cyan-400/15"
                        >
                          {msg.label || "Open"}
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
                <div className="mt-4 flex flex-wrap gap-2">
                  {ZENTRO_QUICK_SUGGESTIONS.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => void submitMessage(item.prompt)}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/75 transition hover:border-cyan-400/35 hover:bg-cyan-400/10 hover:text-cyan-100"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="border-t border-white/10 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") void submitMessage(input);
                  }}
                  placeholder="Ask the Zentro robot anything…"
                  disabled={thinking}
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none ring-cyan-400/0 transition placeholder:text-white/35 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20 disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => void submitMessage(input)}
                  disabled={thinking || !input.trim()}
                  className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:opacity-50"
                >
                  Send
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-white/35">
                No login needed · answers powered by Zentro AI
              </p>
            </div>
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={() => openChat()}
          className="group flex items-center gap-3 rounded-full border border-cyan-400/30 bg-[#070a12]/92 py-2 pl-2 pr-4 text-sm font-semibold text-white shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md transition hover:border-cyan-300/55 hover:bg-[#0b1220]"
        >
          <ZentroRobotAvatar
            pose="wave"
            className="h-11 w-11 rounded-full border-cyan-400/35 transition group-hover:border-cyan-300/60"
          />
          <span>Ask Zentro Robot</span>
          <span className="hidden h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399] sm:inline-block" />
        </button>
      )}
    </div>
  );
}
