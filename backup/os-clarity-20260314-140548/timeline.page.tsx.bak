"use client";

import { useState } from "react";
import OsNav from "@/components/os/OsNav";

export default function TimelinePage() {
  const [today, setToday] = useState("Mission review, 2 focus blocks, 1 log update");
  const [week, setWeek] = useState("Study sessions, project execution, review windows");
  const [plan, setPlan] = useState("Time allocation based on priority and effort");
  const [note, setNote] = useState("");

  function applyPlan() {
    if (!note.trim()) return;
    setToday(note.trim());
    setNote("");
  }

  return (
    <section className="py-10 sm:py-14">
      <OsNav />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo OS
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Timeline
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Timeline organizes missions into realistic execution windows. It shows what should happen
        next and how work is distributed across time.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-sm text-white/60">Today</div>
          <div className="mt-3 text-3xl font-semibold text-white">Today</div>
          <div className="mt-3 text-sm text-white/70">{today}</div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-sm text-white/60">This Week</div>
          <div className="mt-3 text-3xl font-semibold text-white">This Week</div>
          <div className="mt-3 text-sm text-white/70">{week}</div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-sm text-white/60">Planning Logic</div>
          <div className="mt-3 text-3xl font-semibold text-white">Planning</div>
          <div className="mt-3 text-sm text-white/70">{plan}</div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Write next action</div>
        <div className="mt-3 flex gap-3">
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Example: 7pm physics revision block"
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
          />
          <button
            type="button"
            onClick={applyPlan}
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
          >
            Add
          </button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <button
            type="button"
            onClick={() => setWeek("Execution week: 3 focus blocks, 2 reviews, 1 planning reset")}
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left text-sm text-white/80 transition hover:bg-white/10"
          >
            Set execution week
          </button>
          <button
            type="button"
            onClick={() => setPlan("Plan based on urgency, energy, and mission depth")}
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left text-sm text-white/80 transition hover:bg-white/10"
          >
            Update planning logic
          </button>
          <button
            type="button"
            onClick={() => {
              setToday("Reset");
              setWeek("Reset");
              setPlan("Reset");
            }}
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left text-sm text-white/80 transition hover:bg-white/10"
          >
            Reset timeline
          </button>
        </div>
      </div>
    </section>
  );
}
