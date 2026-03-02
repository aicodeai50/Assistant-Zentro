"use client";

import Link from "next/link";
import { useState } from "react";

export default function SectorTemplate({
  title,
  subtitle,
  hint,
}: {
  title: string;
  subtitle: string;
  hint: string;
}) {
  const [note, setNote] = useState("");

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1100px circle at 20% 18%, rgba(34,211,238,0.12), transparent 55%),
              radial-gradient(1000px circle at 80% 20%, rgba(163,230,53,0.10), transparent 55%),
              radial-gradient(1100px circle at 50% 95%, rgba(244,114,182,0.10), transparent 60%),
              linear-gradient(180deg, rgba(2,6,23,0.72), rgba(0,0,0,0.95))
            `,
          }}
        />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-6 py-10">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-xs tracking-widest text-white/60">SHYNVO OS</div>
            <h1 className="mt-2 text-3xl font-semibold">{title}</h1>
            <p className="mt-2 max-w-2xl text-white/70">{subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/os"
              className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15"
            >
              Back to OS →
            </Link>
            <Link
              href="/"
              className="rounded-2xl border border-white/15 bg-black/40 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
            >
              Home →
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/15 bg-black/35 p-6 backdrop-blur-xl">
          <div className="text-sm text-white/80">{hint}</div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <div className="text-xs tracking-widest text-white/60">WORKSPACE</div>
              <div className="mt-2 text-sm text-white/70">
                This sector is now a real page (no more 404). Next we’ll add its unique tools.
              </div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Leave a note… (what should this sector do?)"
                className="mt-4 h-32 w-full resize-none rounded-2xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <div className="text-xs tracking-widest text-white/60">NEXT</div>
              <div className="mt-2 text-sm text-white/70">
                We will implement real functionality here step-by-step:
                <ul className="mt-2 list-disc pl-5 text-white/65">
                  <li>Terminal routing + command actions</li>
                  <li>Sector-specific UI and tools</li>
                  <li>SH Assistant workflows per sector</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-white/45">
          Tip: Open Terminal on /os and run: <span className="text-white/70">routes</span> or{" "}
          <span className="text-white/70">open /os/{title.toLowerCase().replaceAll(" ", "-")}</span>
        </div>
      </div>
    </div>
  );
}
