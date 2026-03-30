"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import {
  BookOpen,
  Bot,
  Cpu,
  Layers3,
  Sparkles,
} from "lucide-react";

import PreviewTypingLoop from "./components/PreviewTypingLoop";

const VALUE_POINTS = [
  {
    title: "AI-Guided Intelligence Layer",
    desc: "Shynvo analyzes your intent, recommends the right direction, and adapts guidance as you progress.",
    href: "/ai-guided-intelligence",
    Icon: Bot,
  },
  {
    title: "Modular Environment Architecture",
    desc: "Purpose-built environments for learning, building, and exploration — all connected through unified workflows.",
    href: "/modular-architecture",
    Icon: Layers3,
  },
  {
    title: "Structured Progression System",
    desc: "Clear steps, guided paths, and AI-supported progression so users always know what to do next.",
    href: "/structured-progression",
    Icon: Sparkles,
  },
];

const PLATFORM_PREVIEWS = [
  {
    title: "Shynvo Robot",
    desc: "AI guidance to navigate the platform.",
    href: "/robot",
    Icon: Bot,
    variant: "robot" as const,
  },
  {
    title: "University Hub",
    desc: "Advanced learning and study areas.",
    href: "/university",
    Icon: BookOpen,
    variant: "university" as const,
  },
  {
    title: "Frontier Lab",
    desc: "Innovative tech and engineering workflows.",
    href: "/frontier",
    Icon: Cpu,
    variant: "frontier" as const,
  },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden text-white">
      <section className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 sm:pb-28 sm:pt-14 lg:px-8 lg:pb-32 lg:pt-16">
        <section className="max-w-4xl sh-fade-up">
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-[4.2rem] lg:leading-[1.02]">
            One platform for learning, building, and AI-guided work
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8 sh-fade-up-delay-1">
            Clear environments. Guided AI. Structured progress.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 sh-fade-up-delay-2">
            <Link
              href="/docs"
              className="sh-premium-button group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(72,92,231,0.28)]"
            >
              <span className="absolute inset-0 bg-[linear-gradient(180deg,#5f74ff_0%,#485ce7_100%)]" />
              <span className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22),transparent_60%)]" />
              <span className="relative z-10">Start Your Journey</span>
            </Link>

            <Link
              href="#platform-preview"
              className="sh-premium-button inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white hover:bg-white/[0.08]"
            >
              Explore Shynvo Worlds
            </Link>
          </div>
        </section>

        <section className="mt-14">
          <div className="text-sm font-semibold text-white/78">
            What Shynvo Is
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {VALUE_POINTS.map((item) => {
              const Icon = item.Icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="sh-premium-card rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon className="h-5 w-5 text-white/80" />
                    </div>
                    <div className="text-base font-semibold">{item.title}</div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-white/72">
                    {item.desc}
                  </p>

                  <div className="mt-6 flex items-center justify-between text-sm text-white/60">
                    <span>Learn more</span>
                    <span>›</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section id="platform-preview" className="mt-16">
          <h2 className="text-center text-3xl font-semibold sm:text-4xl">
            What the platform looks like
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {PLATFORM_PREVIEWS.map((item) => {
              const Icon = item.Icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="sh-premium-card rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon className="h-5 w-5 text-white/80" />
                    </div>
                    <div className="text-base font-semibold">{item.title}</div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300/90">
                      System Live
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-white/72">
                    {item.desc}
                  </p>

                  <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3">
                    {item.variant === "robot" && (
                      <PreviewTypingLoop
                        variant="robot"
                        lines={[
                          "Analyzing your path...",
                          "Shynvo Robot ready...",
                          "Choose where to begin...",
                        ]}
                      />
                    )}

                    {item.variant === "university" && (
                      <PreviewTypingLoop
                        variant="university"
                        lines={[
                          "Opening University Hub...",
                          "Study systems online...",
                          "Learning environments ready...",
                        ]}
                      />
                    )}

                    {item.variant === "frontier" && (
                      <PreviewTypingLoop
                        variant="frontier"
                        lines={[
                          "Booting Frontier Lab...",
                          "Engineering mode active...",
                          "Research workflow ready...",
                        ]}
                      />
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-between text-sm text-white/60">
                    <span>Open preview</span>
                    <span>›</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-16">
          <div className="sh-premium-card flex flex-col items-center justify-between gap-6 rounded-2xl p-6 md:flex-row">
            <div className="text-center md:text-left">
              <div className="text-2xl font-semibold">
                Scan to explore Shynvo
              </div>
              <p className="mt-2 text-sm text-white/70">
                Continue your journey on mobile
              </p>
            </div>

            <div className="rounded-lg bg-white p-3 shadow-[0_16px_34px_rgba(0,0,0,0.35)]">
              <QRCodeSVG
                value="https://shynvo.app"
                size={112}
                bgColor="#ffffff"
                fgColor="#0B0F14"
              />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}