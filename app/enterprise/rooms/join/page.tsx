"use client";

import Link from "next/link";
import { useState } from "react";

export default function EnterpriseJoinRoomPage() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  function handleJoin() {
    if (!code.trim()) return;
    setMessage(`Join request prepared for room code: ${code.trim()}`);
  }

  return (
    <section className="py-10 sm:py-14">
      <Link href="/enterprise/rooms" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Rooms
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Room Action</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">Join Room</h1>

      <div className="mt-8 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6">
        <label className="block text-sm text-white/70">Room code or invite</label>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Example: SH-TEAM-4821"
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35"
        />

        <button
          type="button"
          onClick={handleJoin}
          className="mt-5 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
        >
          Join Room
        </button>

        {message ? (
          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/80">
            {message}
          </div>
        ) : null}
      </div>
    </section>
  );
}
