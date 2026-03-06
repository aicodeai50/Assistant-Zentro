"use client";

import Link from "next/link";
import { useState } from "react";

type RoomType = "Debate Room" | "Simulation Room" | "Concept Room" | "Practice Room";

export default function ExperimentsRoomsPage() {
  const [selected, setSelected] = useState<RoomType>("Debate Room");

  const description =
    selected === "Debate Room"
      ? "A structured room for comparing positions, arguments, and decisions with AI moderation."
      : selected === "Simulation Room"
      ? "A collaborative room for running what-if scenarios and discussing likely outcomes."
      : selected === "Concept Room"
      ? "A shared room for refining ideas, shaping concepts, and clarifying direction."
      : "A guided room for interview practice, presentation practice, and communication rehearsal.";

  const roomTypes: RoomType[] = ["Debate Room", "Simulation Room", "Concept Room", "Practice Room"];

  return (
    <section className="py-10 sm:py-14">
      <Link href="/experiments" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Experiments
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Experiments
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        Experiment Rooms
      </h1>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        Rooms are structured collaborative spaces for friends, classmates, and teammates.
        Each room has a purpose and can be guided by AI for clearer, more productive sessions.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link
          href="/experiments/rooms/create"
          className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/7 transition"
        >
          <div className="text-lg font-semibold text-white">Create Room</div>
          <div className="mt-2 text-sm text-white/70">
            Start a new debate room, simulation room, concept room, or practice room.
          </div>
        </Link>

        <Link
          href="/experiments/rooms/join"
          className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/7 transition"
        >
          <div className="text-lg font-semibold text-white">Join Room</div>
          <div className="mt-2 text-sm text-white/70">
            Enter an existing room with your classmates, friends, or teammates.
          </div>
        </Link>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Room Types</div>

        <div className="mt-4 flex flex-wrap gap-2">
          {roomTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelected(type)}
              className={
                selected === type
                  ? "rounded-full border border-white bg-white px-3 py-1.5 text-sm font-semibold text-[#0B0F14]"
                  : "rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-white/70 hover:bg-white/5"
              }
            >
              {type}
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
          {description}
        </div>
      </div>
    </section>
  );
}
