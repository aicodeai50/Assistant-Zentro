"use client";

import { useState } from "react";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

export default function EnterpriseSchedulePage() {
  const [meeting, setMeeting] = useState("");
  const [schedule, setSchedule] = useState<string[]>([
    "09:00 — Leadership Room",
    "11:00 — Product Review",
    "14:00 — Engineering Sync",
    "16:00 — Marketing Planning",
  ]);

  function addMeeting() {
    if (!meeting.trim()) return;
    setSchedule((prev) => [meeting.trim(), ...prev]);
    setMeeting("");
  }

  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav hubHref="/enterprise" hubTitle="Enterprise Suite" label="Meeting Schedule" />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Enterprise Suite
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Meeting Schedule
      </h1>

      <p className="mt-4 max-w-5xl text-sm leading-6 text-white/70 sm:text-base">
        Schedule gives the company a simple meeting flow for rooms, leadership sessions, and team coordination.
      </p>

      <div className="mt-6 flex gap-3">
        <input
          value={meeting}
          onChange={(e) => setMeeting(e.target.value)}
          placeholder="Example: 15:00 — Workshop Room"
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
        />
        <button
          type="button"
          onClick={addMeeting}
          className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
        >
          Add
        </button>
      </div>

      <div className="mt-6 grid gap-4">
        {schedule.map((item, i) => (
          <div key={i} className="rounded-2xl border border-emerald-300/15 bg-white/5 px-4 py-4 text-sm text-white/80">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
