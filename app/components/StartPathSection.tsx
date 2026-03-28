"use client";

import Link from "next/link";

export default function StartPathSection() {
  return (
    <section className="mt-10 sm:mt-12">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Start here
      </div>

      <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
        Choose your direction
      </h2>

      <p className="mt-3 max-w-2xl text-sm text-white/70">
        Start with a clear path instead of guessing where to go.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        
        <Link href="/university" className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.07]">
          <div className="text-lg font-semibold text-white">Learn</div>
          <p className="mt-2 text-sm text-white/70">
            Study with structured academic systems and guided learning paths.
          </p>
        </Link>

        <Link href="/frontier" className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.07]">
          <div className="text-lg font-semibold text-white">Build</div>
          <p className="mt-2 text-sm text-white/70">
            Work inside coding, systems, and engineering environments.
          </p>
        </Link>

        <Link href="/robot" className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.07]">
          <div className="text-lg font-semibold text-white">Explore AI</div>
          <p className="mt-2 text-sm text-white/70">
            Use Shynvo Robot to understand, navigate, and get guidance.
          </p>
        </Link>

      </div>
    </section>
  );
}
