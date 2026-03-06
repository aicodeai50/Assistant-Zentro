"use client";

import Link from "next/link";
import { useState } from "react";

export default function EnterpriseCreateRoomPage() {
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("Project Room");
  const [created, setCreated] = useState<string | null>(null);

  function handleCreate() {
    if (!roomName.trim()) return;
    setCreated(`${roomType}: ${roomName.trim()}`);
  }

  return (
    <section className="py-10 sm:py-14">
      <Link href="/enterprise/rooms" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Rooms
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Room Action</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">Create Room</h1>

      <div className="mt-8 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6">
        <label className="block text-sm text-white/70">Room name</label>
        <input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Example: Product Launch Room"
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35"
        />

        <label className="mt-5 block text-sm text-white/70">Room type</label>
        <select
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
        >
          <option>Project Room</option>
          <option>Leadership Room</option>
          <option>Planning Room</option>
          <option>Team Room</option>
        </select>

        <button
          type="button"
          onClick={handleCreate}
          className="mt-5 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
        >
          Create Room
        </button>

        {created ? (
          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/80">
            Room prepared: <span className="font-semibold text-white">{created}</span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
