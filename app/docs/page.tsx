"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bot,
  BrainCircuit,
  Briefcase,
  Cpu,
  FlaskConical,
  Gamepad2,
  GraduationCap,
} from "lucide-react";

type Category = "all" | "learn" | "build" | "explore" | "guide";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "learn", label: "Learn" },
  { key: "build", label: "Build" },
  { key: "explore", label: "Explore" },
  { key: "guide", label: "Get Guidance" },
];

const PATHS = [
  {
    title: "University Hub",
    desc: "Structured academic learning with guided study paths.",
    href: "/university",
    category: "learn",
    Icon: BookOpen,
  },
  {
    title: "Shynvo Academy",
    desc: "School-level learning with subjects and progression.",
    href: "/academy",
    category: "learn",
    Icon: GraduationCap,
  },
  {
    title: "Frontier Lab",
    desc: "Technical and engineering workflows.",
    href: "/frontier",
    category: "build",
    Icon: Cpu,
  },
  {
    title: "Enterprise Suite",
    desc: "Team workflows, missions, and execution systems.",
    href: "/enterprise",
    category: "build",
    Icon: Briefcase,
  },
  {
    title: "Experiments",
    desc: "AI exploration and simulation environments.",
    href: "/experiments",
    category: "explore",
    Icon: FlaskConical,
  },
  {
    title: "Arcade Sim",
    desc: "Interactive challenges and training simulations.",
    href: "/arcade",
    category: "explore",
    Icon: Gamepad2,
  },
  {
    title: "Shynvo Robot",
    desc: "AI guide to help you decide where to start.",
    href: "/robot",
    category: "guide",
    Icon: Bot,
  },
  {
    title: "AI Council",
    desc: "Clarity, decision-making, and reflection support.",
    href: "/os/council",
    category: "guide",
    Icon: BrainCircuit,
  },
];

export default function DocsPage() {
  const [active, setActive] = useState<Category>("all");

  const filtered =
    active === "all"
      ? PATHS
      : PATHS.filter((p) => p.category === active);

  return (
    <main className="relative min-h-screen bg-[#050913] text-white">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* TOP BAR */}
        <div className="flex items-center justify-between">
          <Link href="/" className="text-sm text-white/70 hover:text-white">
            ← Back to Home
          </Link>
        </div>

        {/* HERO */}
        <div className="mt-6">
          <div className="text-xs uppercase tracking-[0.18em] text-white/60">
            Platform Guide
          </div>

          <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">
            Choose your path
          </h1>

          <p className="mt-3 max-w-2xl text-white/70">
            Select what you want to do and enter the right environment inside Shynvo.
          </p>
        </div>

        {/* FILTERS */}
        <div className="mt-6 flex flex-wrap gap-3">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key as Category)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                active === f.key
                  ? "bg-white text-black"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* CARDS */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const Icon = item.Icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-white/80" />
                  <div className="font-semibold">{item.title}</div>
                </div>

                <p className="mt-3 text-sm text-white/70">{item.desc}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-white/80">
                    Enter path
                  </span>
                  <ArrowRight className="h-4 w-4 text-white/60 group-hover:text-white" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* SUPPORT */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Need help?</h2>
          <p className="mt-2 text-sm text-white/70">
            Contact support or open the Robot for guidance.
          </p>

          <div className="mt-4 flex gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-4 py-2 text-sm text-black"
            >
              Contact
            </Link>

            <Link
              href="/robot"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm"
            >
              Open Robot
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}