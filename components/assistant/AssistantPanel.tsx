"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChatMessage,
  loadChat,
  loadTheme,
  saveChat,
  saveTheme,
  ThemeMode,
} from "@/lib/sh-assistant/storage";
import { renderAssistantHtml } from "@/lib/sh-assistant/render";
import { useLogbook } from "@/stores/logbook/logbook.store";

const API_URL = "/api/public/chat";

type Mode = "Tutor" | "Interviewer" | "Analyst" | "Builder" | "Support";
const MODES: Mode[] = ["Tutor", "Interviewer", "Analyst", "Builder", "Support"];

function normalizeMode(v: string | null): Mode {
  if (!v) return "Tutor";
  const x = v.toLowerCase().trim();
  if (x === "tutor") return "Tutor";
  if (x === "interviewer") return "Interviewer";
  if (x === "analyst") return "Analyst";
  if (x === "builder") return "Builder";
  if (x === "support") return "Support";
  return "Tutor";
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function uid() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function AssistantPanel() {
  const { addEntry } = useLogbook();

  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [mode, setMode] = useState<Mode>("Tutor");

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  const listRef = useRef<HTMLDivElement | null>(null);

  // Load persisted state + URL mode
  useEffect(() => {
    setTheme(loadTheme());
    setMessages(loadChat());

    // Mode comes from /assistant?mode=Builder (Robot/Split will use this)
    if (typeof window !== "undefined") {
      const m = new URLSearchParams(window.location.search).get("mode");
      setMode(normalizeMode(m));
    }
  }, []);

  // Apply theme
  useEffect(() => {
    if (theme === "light")
      document.documentElement.setAttribute("data-sh-theme", "light");
    else document.documentElement.removeAttribute("data-sh-theme");
    saveTheme(theme);
  }, [theme]);

  // Persist chat
  useEffect(() => {
    saveChat(messages);
    // Auto-scroll
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    });
  }, [messages]);

  const canSend = useMemo(() => text.trim().length > 0 && !busy, [text, busy]);

  async function copy(code: string, btn?: HTMLButtonElement | null) {
    try {
      await navigator.clipboard.writeText(code);
      if (btn) {
        const prev = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(() => (btn.textContent = prev || "Copy"), 1200);
      }
    } catch {
      if (btn) {
        const prev = btn.textContent;
        btn.textContent = "Failed";
        setTimeout(() => (btn.textContent = prev || "Copy"), 1200);
      }
    }
  }

  function log(type: "user" | "assistant", content: string) {
    addEntry({
      id: uid(),
      type: type === "user" ? "user" : "assistant",
      title: `Shynvo SH Assistant AI • ${mode}`,
      content,
      timestamp: Date.now(),
    });
  }

  async function send() {
    const msg = text.trim();
    if (!msg || busy) return;

    setBusy(true);
    setText("");

    const userMessage: ChatMessage = {
      id: uid(),
      role: "user",
      content: msg,
      ts: Date.now(),
    };

    const thinkingMessage: ChatMessage = {
      id: uid(),
      role: "assistant",
      content: "_Thinking…_",
      ts: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage, thinkingMessage]);
    log("user", msg);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Mode prefix = frontend-only sync, no backend changes required
        body: JSON.stringify({ message: `[Mode: ${mode}] ${msg}` }),
      });

      const data = await res.json().catch(() => ({}));
      const reply = data.reply || data.message || data.error || "No response returned.";

      setMessages((prev) => {
        const next = [...prev];
        for (let i = next.length - 1; i >= 0; i--) {
          if (next[i].role === "assistant" && next[i].content === "_Thinking…_") {
            next[i] = { ...next[i], content: String(reply) };
            break;
          }
        }
        return next;
      });

      log("assistant", String(reply));
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        for (let i = next.length - 1; i >= 0; i--) {
          if (next[i].role === "assistant" && next[i].content === "_Thinking…_") {
            next[i] = { ...next[i], content: "❌ Network error contacting backend." };
            break;
          }
        }
        return next;
      });
    } finally {
      setBusy(false);
    }
  }

  function clearChat() {
    setMessages([]);
  }

  // Copy buttons (event delegation)
  function onChatClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    const btn = target.closest(".sh-copy") as HTMLButtonElement | null;
    if (!btn) return;

    const wrap = btn.closest(".sh-codewrap");
    const codeEl = wrap?.querySelector("pre code") as HTMLElement | null;
    const code = codeEl?.innerText || "";
    copy(code, btn);
  }

  return (
    <div
      className={cx(
        "w-full max-w-[560px] h-[min(860px,92dvh)]",
        "rounded-2xl border border-white/10 bg-white/5 shadow-2xl overflow-hidden",
        "flex flex-col"
      )}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-gradient-to-r from-white/10 to-transparent">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl grid place-items-center font-black text-white bg-gradient-to-br from-violet-600 to-pink-600">
            SH
          </div>
          <div>
            <div className="font-extrabold leading-tight">
              Shynvo SH Assistant AI
            </div>
            <div className="text-xs text-white/60 -mt-0.5">
              secure • calm • clean
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode pills (desktop) */}
          <div className="hidden md:flex items-center gap-1 mr-1">
            {MODES.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={[
                  "px-3 py-2 rounded-xl border text-xs font-extrabold transition",
                  m === mode
                    ? "border-white/20 bg-white/10"
                    : "border-white/10 bg-black/30 hover:bg-white/5",
                ].join(" ")}
                title={`Mode: ${m}`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Mode label (mobile) */}
          <div className="md:hidden text-[11px] font-extrabold text-white/60 px-2 py-1 rounded-xl border border-white/10 bg-black/30">
            Mode: {mode}
          </div>

          <button
            className="px-3 py-2 rounded-xl border border-white/10 bg-black/30 text-sm font-semibold hover:bg-white/5"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            type="button"
          >
            Theme
          </button>
          <button
            className="px-3 py-2 rounded-xl border border-white/10 bg-black/30 text-sm font-semibold hover:bg-white/5"
            onClick={clearChat}
            type="button"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Chat */}
      <div
        ref={listRef}
        onClick={onChatClick}
        className={cx("flex-1 overflow-y-auto px-4 py-4", "bg-black/30")}
      >
        {messages.length === 0 && (
          <div className="text-sm text-white/60">
            Say hello to{" "}
            <span className="font-semibold text-white/80">
              Shynvo SH Assistant AI
            </span>
            .
          </div>
        )}

        <div className="flex flex-col gap-3">
          {messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <div
                key={m.id}
                className={cx(
                  "flex gap-3",
                  isUser ? "justify-end" : "justify-start"
                )}
              >
                {!isUser && (
                  <div className="h-9 w-9 rounded-2xl grid place-items-center font-black border border-white/10 bg-white/5">
                    SH
                  </div>
                )}

                <div
                  className={cx(
                    "max-w-[92%] rounded-2xl border border-white/10 px-4 py-3 text-[0.95rem] leading-relaxed",
                    isUser ? "bg-violet-500/10" : "bg-white/5"
                  )}
                >
                  <div className="text-xs font-extrabold text-white/60 mb-1">
                    {isUser ? "You" : `Shynvo SH Assistant AI • ${mode}`}
                  </div>

                  {isUser ? (
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  ) : (
                    <div
                      className="assistant-html"
                      dangerouslySetInnerHTML={{
                        __html: renderAssistantHtml(m.content),
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Composer */}
      <div className="flex gap-2 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={1}
          placeholder="Message Shynvo SH Assistant AI… (Enter to send • Shift+Enter new line)"
          className="flex-1 resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-violet-400/40 focus:ring-4 focus:ring-violet-500/10"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (canSend) send();
            }
          }}
        />
        <button
          type="button"
          onClick={send}
          disabled={!canSend}
          className={cx(
            "rounded-2xl px-4 py-3 text-sm font-extrabold",
            "bg-gradient-to-br from-violet-600 to-pink-600 text-white",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          Send
        </button>
      </div>

      {/* Inline styles for code blocks (no extra deps) */}
      <style jsx global>{`
        :root[data-sh-theme="light"] {
          color-scheme: light;
        }
        :root[data-sh-theme="light"] body {
          background: #eef2ff;
        }
        .assistant-html code {
          padding: 2px 7px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", monospace;
          font-size: 0.92em;
        }
        .sh-codewrap {
          margin-top: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.18);
        }
        .sh-codebar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          font-size: 0.78rem;
          color: rgba(231, 234, 243, 0.75);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03);
        }
        .sh-lang {
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 900;
          opacity: 0.8;
        }
        .sh-copy {
          padding: 7px 10px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          color: rgba(231, 234, 243, 0.92);
          cursor: pointer;
          font-weight: 900;
        }
        .sh-pre {
          margin: 0;
          padding: 12px;
          background: transparent !important;
          font-size: 0.86rem;
          line-height: 1.65;
          white-space: pre-wrap;
          word-break: break-word;
        }
      `}</style>
    </div>
  );
}