"use client";

import { useState } from "react";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

export default function EnterpriseSkillsPage() {
  const [frontend, setFrontend] = useState(82);
  const [ai, setAi] = useState(61);

  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav hubHref="/enterprise" hubTitle="Enterprise Suite" />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Enterprise Suite
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Skill Matrix
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Skill Matrix helps organizations understand team strengths, growth paths, capability gaps, and hiring priorities.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-2xl font-semibold text-white">Frontend Capability</div>
          <div className="mt-3 text-sm text-white/70">{frontend >= 75 ? "Strong" : "Growing"}</div>
          <input
            type="range"
            min="0"
            max="100"
            value={frontend}
            onChange={(e) => setFrontend(Number(e.target.value))}
            className="mt-5 w-full"
          />
          <div className="mt-4 text-sm text-white/80">Capability score: {frontend}/100</div>
          <div className="mt-5 text-sm font-semibold text-white/90">Open capability →</div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-2xl font-semibold text-white">AI Capability</div>
          <div className="mt-3 text-sm text-white/70">{ai >= 75 ? "Strong" : "Growing"}</div>
          <input
            type="range"
            min="0"
            max="100"
            value={ai}
            onChange={(e) => setAi(Number(e.target.value))}
            className="mt-5 w-full"
          />
          <div className="mt-4 text-sm text-white/80">Capability score: {ai}/100</div>
          <div className="mt-5 text-sm font-semibold text-white/90">Open capability →</div>
        </div>
      </div>
    </section>
  );
}
