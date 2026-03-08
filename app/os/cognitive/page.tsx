"use client";

import { useState } from "react";
import OsNav from "@/components/os/OsNav";

export default function CognitivePage() {
  const [focusState, setFocusState] = useState("Stable");
  const [recovery, setRecovery] = useState("Moderate");
  const [friction, setFriction] = useState("Low");
  const [note, setNote] = useState("");

  function applyCheck() {
    const text = note.toLowerCase();

    if (!text.trim()) return;

    if (text.includes("tired") || text.includes("burnout") || text.includes("exhaust")) {
      setRecovery("Low");
      setFocusState("Fragile");
      setFriction("High");
    } else if (text.includes("stressed") || text.includes("confused")) {
      setRecovery("Moderate");
      setFocusState("Unstable");
      setFriction("Moderate");
    } else {
      setRecovery("Moderate");
      setFocusState("Stable");
      setFriction("Low");
    }
  }

  return (
    <section className="py-10 sm:py-14">
      <OsNav />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo OS
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Cognitive
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Cognitive tracks execution state, mental load, recovery, and friction. It helps Shynvo OS
        adapt work intensity to the user.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-sm text-white/60">Focus State</div>
          <div className="mt-3 text-4xl font-semibold text-white">{focusState}</div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-sm text-white/60">Recovery Level</div>
          <div className="mt-3 text-4xl font-semibold text-white">{recovery}</div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-sm text-white/60">Friction Signals</div>
          <div className="mt-3 text-4xl font-semibold text-white">{friction}</div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Mental check</div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Describe your current state. Example: I feel tired and overloaded."
          className="mt-4 min-h-[140px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
        />
        <button
          type="button"
          onClick={applyCheck}
          className="mt-4 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
        >
          Analyze State
        </button>
      </div>
    </section>
  );
}
