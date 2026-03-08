"use client";

import { useState } from "react";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

type RoomType = "Project Room" | "Leadership Room" | "Planning Room" | "Team Room";

export default function EnterpriseRoomsPage() {
  const [roomType, setRoomType] = useState<RoomType>("Project Room");
  const [createName, setCreateName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [status, setStatus] = useState("No room action yet.");

  function createRoom() {
    if (!createName.trim()) return;
    setStatus(`Created ${roomType}: "${createName.trim()}"`);
  }

  function joinRoom() {
    if (!joinCode.trim()) return;
    setStatus(`Joined company room with code: ${joinCode.trim()}`);
  }

  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav hubHref="/enterprise" hubTitle="Enterprise Suite" />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Enterprise Suite
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Rooms
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Rooms are structured communication spaces for team discussion, meetings, collaboration, and AI-assisted summaries.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-2xl font-semibold text-white">Create Room</div>
          <div className="mt-2 text-sm text-white/70">
            Start a project room, leadership room, planning room, or team room.
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {(["Project Room", "Leadership Room", "Planning Room", "Team Room"] as RoomType[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRoomType(item)}
                className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
                  roomType === item
                    ? "border-white bg-white text-[#0B0F14]"
                    : "border-white/10 bg-black/20 text-white/80 hover:bg-white/10"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <input
            value={createName}
            onChange={(e) => setCreateName(e.target.value)}
            placeholder="Room name..."
            className="mt-5 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
          />

          <button
            type="button"
            onClick={createRoom}
            className="mt-4 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
          >
            Open create flow
          </button>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-2xl font-semibold text-white">Join Room</div>
          <div className="mt-2 text-sm text-white/70">
            Enter a company room for communication, collaboration, and decisions.
          </div>

          <input
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            placeholder="Join code..."
            className="mt-5 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
          />

          <button
            type="button"
            onClick={joinRoom}
            className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
          >
            Open join flow
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Room Status</div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
          {status}
        </div>
      </div>
    </section>
  );
}
