"use client";

import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      <main className="mx-auto max-w-6xl px-6 py-14">
        <section className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              Shynvo — AI Learning + Upskilling
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Learn faster. Prepare smarter. Upskill teams with AI.
            </h1>

            <p className="mt-4 text-white/70">
              Generate quizzes, flashcards, interview practice, and upskilling plans —
              with optional sci-fi assistant UI.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/demo" className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-neutral-200">
                View demo
              </Link>

              <Link href="/pricing" className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10">
                See pricing
              </Link>

              <Link href="/robot" className="rounded-xl border border-white/10 bg-black px-5 py-3 font-semibold text-white hover:bg-white/5">
                Try the sci-fi robot
              </Link>

              <Link href="/os" className="rounded-xl border border-white/10 bg-black px-5 py-3 font-semibold text-white hover:bg-white/5">
                Enter Shynvo OS (2050)
              </Link>

              {/* SMALL HUB BUTTONS ONLY */}
              <Link href="/university" className="rounded-xl border border-white/10 bg-black px-5 py-3 font-semibold text-white hover:bg-white/5">
                University Hub →
              </Link>

              <Link href="/experiments" className="rounded-xl border border-white/10 bg-black px-5 py-3 font-semibold text-white hover:bg-white/5">
                Experiments (Beta) →
              </Link>
            </div>

            <div className="mt-6 text-sm text-white/60">
              Built for students, professionals, and teams.
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-neutral-950 p-6 shadow-xl">
            <div className="text-sm text-white/60">Why Shynvo</div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/70">
              <li>Instant AI-generated practice</li>
              <li>Interview & exam simulation</li>
              <li>University + career environments</li>
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
