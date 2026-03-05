"use client";

import Link from "next/link";

export default function Page() {
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
            <h1 className="mt-2 text-3xl font-semibold">Terminal</h1>
            <p className="mt-2 max-w-2xl text-white/70">
              Terminal is an overlay on the OS page. Go back and click “Open Terminal”.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/os" className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15">
              Back to OS →
            </Link>
            <Link href="/" className="rounded-2xl border border-white/15 bg-black/40 px-4 py-2 text-sm text-white/85 hover:bg-white/10">
              Home →
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/15 bg-black/35 p-6 backdrop-blur-xl">
          <div className="text-sm text-white/80">Try these commands (on /os):</div>
          <pre className="mt-3 rounded-2xl border border-white/10 bg-black/50 p-4 text-xs text-white/75">
routes
open /os/missions
time
ai Build me a 7-day study plan for TCP/IP networking
          </pre>
        </div>
      </div>
    </div>
  );
}
