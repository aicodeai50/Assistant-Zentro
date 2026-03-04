"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";

type Building = {
  name: string;
  label: string;
  desc: string;
  tags: string[];
  href: string;
  planned?: boolean;
  accent?: "neutral" | "os" | "university" | "experiments" | "enterprise" | "frontier" | "arcade";
};

type PricingPlan = {
  name: string;
  subtitle: string;
  bullets: string[];
  cta: string;
  href: string;
  highlight?: boolean;
};

type GuideQA = {
  match: (q: string) => boolean;
  answer: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function HomePage() {
  const buildings: Building[] = [
    {
      name: "University Hub",
      label: "Structured Academic Campus",
      desc: "Guided study systems, exam preparation, and faculty-based learning environments.",
      tags: ["Study", "Exams", "Career"],
      href: "/university",
      accent: "university",
    },
    {
      name: "Shynvo OS",
      label: "Dimensional Execution Cockpit",
      desc: "Missions, focus systems, AI agents, and strategic orchestration in one cockpit.",
      tags: ["Missions", "Focus", "Terminal"],
      href: "/os",
      accent: "os",
    },
    {
      name: "Experiments",
      label: "AI Exploration Worlds",
      desc: "Standalone worlds for thinking, debate, simulation, and concept development.",
      tags: ["Debate", "Simulation", "Concepts"],
      href: "/experiments",
      accent: "experiments",
    },
    {
      name: "Enterprise Suite",
      label: "Organizational Intelligence System",
      desc: "Admin tools, skill matrices, team missions, and analytics for organizations.",
      tags: ["Teams", "OKRs", "Analytics"],
      href: "/enterprise-suite",
      planned: true,
      accent: "enterprise",
    },
    {
      name: "Frontier Lab",
      label: "High-Reliability Decision Environment",
      desc: "Decision drills, crisis simulation, protocols, and resilience systems.",
      tags: ["Tactical", "Crisis", "Protocols"],
      href: "/frontier-lab",
      planned: true,
      accent: "frontier",
    },
    {
      name: "Arcade Sim",
      label: "Competitive Skill Arena",
      desc: "Gamified drills, interview simulations, and performance scoring modes.",
      tags: ["Drills", "Interviews", "Scoring"],
      href: "/arcade-sim",
      planned: true,
      accent: "arcade",
    },
  ];

  const plans: PricingPlan[] = [
    {
      name: "Starter — 7 Day Free Trial",
      subtitle: "Full access for 7 days. Upgrade required after trial.",
      bullets: [
        "All environments unlocked during trial",
        "Shynvo OS + University Hub + Experiments",
        "Upgrade required after day 7",
        "Email support via hi@shynvo.app",
      ],
      cta: "Create account",
      href: "/signup",
    },
    {
      name: "Pro",
      subtitle: "Individual intelligence infrastructure.",
      bullets: [
        "Unlimited missions and loops",
        "Advanced orchestration and analytics",
        "Full environment access",
        "Priority support",
      ],
      cta: "Upgrade to Pro",
      href: "mailto:hi@shynvo.app?subject=Shynvo%20Pro%20Upgrade",
      highlight: true,
    },
    {
      name: "Team",
      subtitle: "Organizational intelligence system.",
      bullets: [
        "Seats + admin controls",
        "Skill matrix + org analytics",
        "Team missions + dashboards",
        "Enterprise workflows",
      ],
      cta: "Upgrade to Team",
      href: "mailto:hi@shynvo.app?subject=Shynvo%20Team%20Upgrade",
    },
  ];

  return (
    <div className="min-h-screen">
      <BackgroundFX />

      <section className="relative pt-10 sm:pt-14 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
              Structured Intelligence Platform
            </div>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Shynvo
            </h1>

            <p className="mt-2 text-xl text-white/90 sm:text-2xl">
              Architecture of Applied Intelligence
            </p>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
              A multi-environment intelligence platform for learning, execution, strategy, resilience, and organizational growth.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#buildings"
                className="rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
              >
                Enter Platform
              </a>
            </div>

            <div className="mt-4 text-xs text-white/60">
              Trial: full access for 7 days. Upgrade required after trial.
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <div className="h-full w-full p-6">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-white/80">
                    Cinematic Robot Visual
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
                    Silent on homepage
                  </div>
                </div>
                <div className="mt-6 h-[70%] rounded-2xl border border-white/10 bg-[radial-gradient(900px_240px_at_50%_20%,rgba(255,255,255,0.08),transparent_60%)]" />
                <div className="mt-4 text-xs text-white/60">
                  Robot activates inside <span className="text-white/80">Shynvo OS</span>.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10" />
      </section>

      <Section
        id="buildings"
        eyebrow="Environments"
        title="Explore the buildings"
        subtitle="Each building is a purpose-built system with its own departments, identity, and workflows—non-repetitive by design."
      >
        <BuildingsGrid buildings={buildings} />
      </Section>

      <Section
        id="pricing"
        eyebrow="Plans"
        title="Pricing"
        subtitle="Start with a 7-day free trial. After that, upgrading is required to continue."
      >
        <Pricing plans={plans} />
      </Section>

      <ShynvoGuide />

      <div className="h-10" />
    </div>
  );
}

function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-48 right-[-120px] h-[520px] w-[520px] rounded-full bg-white/4 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(255,255,255,0.06),transparent_60%)]" />
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-12 sm:py-16">
      <div className="flex flex-col gap-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-white/60">{eyebrow}</div>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        <p className="max-w-3xl text-sm leading-6 text-white/70 sm:text-base">{subtitle}</p>
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function BuildingsGrid({ buildings }: { buildings: Building[] }) {
  return (
    <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
      {buildings.map((b) => (
        <BuildingCard key={b.name} b={b} />
      ))}
    </div>
  );
}

function BuildingCard({ b }: { b: Building }) {
  const accent = useMemo(() => {
    switch (b.accent) {
      case "os":
        return "border-white/20 bg-white/6 ring-1 ring-white/10";
      default:
        return "border-white/10 bg-white/5";
    }
  }, [b.accent]);

  return (
    <a
      href={b.href}
      className={cx(
        "group relative block rounded-3xl border p-5 transition",
        "hover:bg-white/7 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]",
        accent
      )}
      aria-label={`Enter ${b.name}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-white/8 ring-1 ring-white/10" />
          <div>
            <div className="text-base font-semibold">{b.name}</div>
            <div className="mt-0.5 text-xs text-white/60">{b.label}</div>
          </div>
        </div>

        {b.planned ? (
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
            Planned
          </span>
        ) : null}
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-6 text-white/70">{b.desc}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {b.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm font-semibold text-white/90 group-hover:text-white">Enter</span>
        <span className="rounded-full border border-white/10 bg-white/5 p-2">
          <ArrowRightIcon />
        </span>
      </div>

      {b.accent === "os" ? (
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(800px_220px_at_50%_0%,rgba(255,255,255,0.10),transparent_55%)] opacity-60" />
      ) : null}
    </a>
  );
}

function Pricing({ plans }: { plans: PricingPlan[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {plans.map((p) => (
        <div
          key={p.name}
          className={cx(
            "rounded-3xl border p-5",
            p.highlight ? "border-white/20 bg-white/7" : "border-white/10 bg-white/5"
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-base font-semibold">{p.name}</div>
              <div className="mt-1 text-sm text-white/70">{p.subtitle}</div>
            </div>
            {p.highlight ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/80">
                Recommended
              </span>
            ) : null}
          </div>

          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {p.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-white/50" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <a
            href={p.href}
            className={cx(
              "mt-5 block rounded-xl px-4 py-3 text-center text-sm font-semibold",
              p.highlight
                ? "bg-white text-[#0B0F14] hover:bg-white/90"
                : "ring-1 ring-white/15 hover:bg-white/5"
            )}
          >
            {p.cta}
          </a>
        </div>
      ))}
    </div>
  );
}

/* --------------------------- Shynvo Guide Chat -------------------------- */

type Msg = { role: "user" | "guide"; text: string };

function ShynvoGuide() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "guide", text: "Shynvo Guide: quick answers about the platform. Ask about environments, pricing, or trial." },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  const qa: GuideQA[] = useMemo(
    () => [
      {
        match: (q) => /what is shynvo\??|shynvo\??\s*$/.test(q),
        answer:
          "Shynvo is a multi-environment intelligence platform built around structured systems for learning and execution.",
      },
      { match: (q) => /pricing|plans|cost|price/.test(q), answer: "Start with a 7-day free trial. Upgrade is required after trial." },
      { match: (q) => /trial|7 day|free/.test(q), answer: "Trial gives full access for 7 days. After that you upgrade to continue." },
      { match: (q) => /contact|email|support/.test(q), answer: "Support: hi@shynvo.app" },
    ],
    []
  );

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }, 50);
    return () => clearTimeout(t);
  }, [open, msgs.length]);

  function reply(qRaw: string) {
    const q = qRaw.trim().toLowerCase();
    const found = qa.find((x) => x.match(q));
    return found?.answer || "Ask about environments, pricing, trial, or support email.";
  }

  function send() {
    const text = input.trim();
    if (!text) return;
    setMsgs((m) => [...m, { role: "user", text }, { role: "guide", text: reply(text) }]);
    setInput("");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#0B0F14] shadow-lg hover:bg-white/90"
        aria-label="Open Shynvo Guide"
      >
        Guide
      </button>

      {open ? (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />

          <div
            className={cx(
              "absolute right-0 top-0 h-full w-full border-l border-white/10 bg-[#0B0F14]",
              "sm:w-[420px]"
            )}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <div>
                <div className="text-sm font-semibold">Shynvo Guide</div>
                <div className="text-xs text-white/60">Quick answers.</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl p-2 ring-1 ring-white/15 hover:bg-white/5"
                aria-label="Close guide"
              >
                <CloseIcon />
              </button>
            </div>

            <div ref={listRef} className="h-[calc(100%-140px)] overflow-auto p-4">
              <div className="space-y-3">
                {msgs.map((m, idx) => (
                  <div
                    key={idx}
                    className={cx(
                      "max-w-[92%] rounded-2xl border px-4 py-3 text-sm leading-6",
                      m.role === "user"
                        ? "ml-auto border-white/10 bg-white/10 text-white"
                        : "border-white/10 bg-white/5 text-white/85"
                    )}
                  >
                    {m.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") send();
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                  placeholder="Ask about Shynvo..."
                />
                <button
                  onClick={send}
                  className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
                >
                  Send
                </button>
              </div>
              <div className="mt-2 text-[11px] text-white/50">Support: hi@shynvo.app</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10 7 15 12 10 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 7l10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 7 7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}