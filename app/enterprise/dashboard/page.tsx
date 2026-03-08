"use client";

import Link from "next/link";
import { useState } from "react";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

export default function EnterpriseDashboardPage() {
  const [missionHealth, setMissionHealth] = useState(82);
  const [teamLoad, setTeamLoad] = useState(67);
  const [meetingFlow, setMeetingFlow] = useState(74);
  const [note, setNote] = useState("");

  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav hubHref="/enterprise" hubTitle="Enterprise Suite" label="Enterprise Dashboard" />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Enterprise Suite
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Company Dashboard
      </h1>

      <p className="mt-4 max-w-5xl text-sm leading-6 text-white/70 sm:text-base">
        The company dashboard is the visibility layer of Enterprise Suite. It gives leadership and teams
        a clean view of mission health, workload, meeting flow, and operational focus.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-sm text-white/60">Mission Health</div>
          <div className="mt-3 text-4xl font-semibold text-white">{missionHealth}/100</div>
          <input
            type="range"
            min="0"
            max="100"
            value={missionHealth}
            onChange={(e) => setMissionHealth(Number(e.target.value))}
            className="mt-5 w-full"
          />
          <div className="mt-3 text-sm text-white/70">
            {missionHealth >= 75 ? "Strong execution flow" : "Needs review"}
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-sm text-white/60">Team Load</div>
          <div className="mt-3 text-4xl font-semibold text-white">{teamLoad}/100</div>
          <input
            type="range"
            min="0"
            max="100"
            value={teamLoad}
            onChange={(e) => setTeamLoad(Number(e.target.value))}
            className="mt-5 w-full"
          />
          <div className="mt-3 text-sm text-white/70">
            {teamLoad >= 75 ? "Heavy team pressure" : "Balanced workload"}
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-sm text-white/60">Meeting Flow</div>
          <div className="mt-3 text-4xl font-semibold text-white">{meetingFlow}/100</div>
          <input
            type="range"
            min="0"
            max="100"
            value={meetingFlow}
            onChange={(e) => setMeetingFlow(Number(e.target.value))}
            className="mt-5 w-full"
          />
          <div className="mt-3 text-sm text-white/70">
            {meetingFlow >= 75 ? "Healthy communication rhythm" : "Needs stronger coordination"}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xl font-semibold text-white">Executive Notes</div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write company notes, priorities, risks, and leadership observations..."
            className="mt-4 min-h-[180px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
          />
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xl font-semibold text-white">Quick Access</div>
          <div className="mt-4 grid gap-3">
            <Link href="/enterprise/rooms" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80 hover:bg-white/10">
              Open Rooms
            </Link>
            <Link href="/enterprise/schedule" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80 hover:bg-white/10">
              Open Schedule
            </Link>
            <Link href="/enterprise/directory" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80 hover:bg-white/10">
              Open Directory
            </Link>
            <Link href="/enterprise/chat" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80 hover:bg-white/10">
              Open Company Chat
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
