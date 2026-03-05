"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

async function callPublicChat(message: string, history: Msg[]) {
  const res = await fetch("/api/public/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // send both message + messages for compatibility
    body: JSON.stringify({
      message,
      messages: [
        { role: "system", content: "You are Shynvo Demo AI. Be brief, helpful, and cinematic." },
        ...history.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: message },
      ],
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || data?.details || data?.message || "Request failed");
  }

  return (
    data?.reply ??
    data?.message ??
    data?.choices?.[0]?.message?.content ??
    data?.choices?.[0]?.text ??
    ""
  );
}

export default function DemoUniversePage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Welcome to the Demo Universe. Give me a goal (learn, build, interview, plan) and I’ll generate your first mission.",
    },
  ]);

  const boxRef = useRef<HTMLDivElement | null>(null);

  const progressLabel = useMemo(() => {
    if (step === 1) return "Step 1/3 • Boot";
    if (step === 2) return "Step 2/3 • Try AI";
    return "Step 3/3 • Enter OS";
  }, [step]);

  async function send() {
    const prompt = input.trim();
    if (!prompt || busy) return;

    setError(null);
    setBusy(true);

    const next = [...msgs, { role: "user", content: prompt }] as Msg[];
    setMsgs(next);
    setInput("");

    try {
      const reply = await callPublicChat(prompt, next);
      setMsgs((m) => [...m, { role: "assistant", content: String(reply || "(no reply)") }]);
      requestAnimationFrame(() => boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight }));
      setStep(3); // after first AI response, push user to step 3
    } catch (e: any) {
      setError(e?.message || "Failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Demo Universe background (Neural Blue) */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1200px circle at 18% 18%, rgba(56,189,248,0.42), transparent 50%),
              radial-gradient(1000px circle at 82% 24%, rgba(99,102,241,0.30), transparent 55%),
              radial-gradient(900px circle at 30% 90%, rgba(34,211,238,0.20), transparent 60%),
              linear-gradient(180deg, rgba(2,6,23,0.70), rgba(0,0,0,0.92))
            `,
            filter: "saturate(1.2) contrast(1.1)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_30%,rgba(255,255,255,0.04))]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-10">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-xs tracking-widest text-white/80">
              SHYNVO
            </div>
            <div className="text-xs text-cyan-200/90">Demo Universe</div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/portal"
              className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/80 hover:bg-white/15"
            >
              Back to Portal
            </Link>
            <Link
              href="/assistant"
              className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/80 hover:bg-white/15"
            >
              Assistant
            </Link>
            <Link
              href="/os"
              className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/80 hover:bg-white/15"
            >
              Enter OS (2050)
            </Link>
          </div>
        </div>

        {/* Hero */}
        <div className="mt-8 rounded-3xl border border-white/15 bg-black/35 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-2xl font-semibold text-white/95">Demo Run</div>
              <div className="mt-2 text-sm text-white/70">
                A guided micro-experience: ask AI → get a mission → jump into OS.
              </div>
            </div>

            <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-white/80">
              {progressLabel}
            </div>
          </div>

          <div className="mt-4 h-[1px] w-full bg-[linear-gradient(90deg,transparent,rgba(56,189,248,0.45),rgba(99,102,241,0.30),transparent)]" />
        </div>

        {/* Steps */}
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-4 rounded-3xl border border-white/15 bg-black/35 p-5 backdrop-blur-xl">
            <div className="text-xs uppercase tracking-widest text-white/60">Steps</div>

            <StepRow n={1} label="Boot" on={step === 1} onClick={() => setStep(1)} />
            <StepRow n={2} label="Try AI" on={step === 2} onClick={() => setStep(2)} />
            <StepRow n={3} label="Enter OS" on={step === 3} onClick={() => setStep(3)} />

            <div className="mt-4 text-xs text-white/55">
              Tip: write a real goal: “Plan my week”, “Teach me React”, “Prepare an interview”.
            </div>
          </div>

          <div className="lg:col-span-8 rounded-3xl border border-white/15 bg-black/35 p-5 backdrop-blur-xl">
            {step === 1 ? (
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60">Boot</div>
                <div className="mt-2 text-lg font-semibold text-white/90">
                  Welcome. This universe is built for instant momentum.
                </div>
                <div className="mt-2 text-sm text-white/70">
                  Click “Try AI” to generate your first mission. Then jump into the OS control deck.
                </div>

                <button
                  className="mt-5 rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm text-white/85 hover:bg-white/15"
                  onClick={() => setStep(2)}
                >
                  Continue → Try AI
                </button>
              </div>
            ) : null}

            {step === 2 ? (
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs uppercase tracking-widest text-white/60">Try AI</div>
                  <div className="text-xs text-white/55">endpoint: /api/public/chat</div>
                </div>

                <div
                  ref={boxRef}
                  className="mt-3 h-[260px] overflow-auto rounded-2xl border border-white/15 bg-black/50 p-4"
                >
                  {msgs.map((m, i) => (
                    <div key={i} className="mb-3">
                      <div className="text-xs uppercase tracking-widest text-white/50">
                        {m.role === "user" ? "You" : "Shynvo AI"}
                      </div>
                      <div className="mt-1 whitespace-pre-wrap text-sm text-white/85">{m.content}</div>
                    </div>
                  ))}
                  {busy ? <div className="text-sm text-white/60">Thinking…</div> : null}
                </div>

                {error ? (
                  <div className="mt-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                    {error}
                  </div>
                ) : null}

                <div className="mt-3 flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe your goal…"
                    className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        send();
                      }
                    }}
                    disabled={busy}
                  />
                  <button
                    onClick={send}
                    disabled={busy || !input.trim()}
                    className="rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm text-white/85 hover:bg-white/15 disabled:opacity-60"
                  >
                    Send
                  </button>
                </div>

                <div className="mt-3 text-xs text-white/55">
                  After you get a reply, we’ll unlock “Enter OS”.
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60">Enter OS</div>
                <div className="mt-2 text-lg font-semibold text-white/90">
                  You’re ready. The OS is the control deck.
                </div>
                <div className="mt-2 text-sm text-white/70">
                  Use Timeline, Missions, Council, and Terminal to execute your mission.
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href="/os"
                    className="rounded-xl border border-white/15 bg-white/15 px-6 py-3 text-sm text-white/95 hover:bg-white/20"
                  >
                    Enter Shynvo OS (2050) →
                  </Link>
                  <Link
                    href="/os/timeline"
                    className="rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm text-white/85 hover:bg-white/15"
                  >
                    Open Timeline
                  </Link>
                  <Link
                    href="/universe/robot"
                    className="rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm text-white/85 hover:bg-white/15"
                  >
                    Try Robot Universe
                  </Link>
                </div>

                <div className="mt-4 text-xs text-white/55">
                  Next: we’ll store your generated mission in local missions store.
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-white/45">
          Demo Universe • Neural Blue • fast onboarding
        </div>
      </div>
    </div>
  );
}

function StepRow({
  n,
  label,
  on,
  onClick,
}: {
  n: number;
  label: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "mt-3 w-full rounded-2xl border px-4 py-3 text-left transition",
        on ? "border-white/30 bg-white/15" : "border-white/15 bg-white/10 hover:bg-white/15",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-white/90">
          <span className="mr-2 text-white/60">0{n}</span>
          {label}
        </div>
        <span className="text-xs text-white/60">{on ? "active" : "open"}</span>
      </div>
    </button>
  );
}