"use client";

import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      <main className="mx-auto max-w-6xl px-6 py-14">
        {/* HERO */}
        <section className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              Shynvo — AI Learning + Upskilling
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              The AI platform for learning, exams, and career readiness.
            </h1>

            <p className="mt-4 text-white/70">
              Study smarter, prepare faster, and upskill with structured AI environments — from
              university to industry. Start simple, or switch into cinematic OS mode.
            </p>

            {/* MAIN BUTTON BOXES (ALL WORKING ROUTES) */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <QuickBtn
                href="/demo"
                title="View demo"
                desc="See how Shynvo generates practice instantly."
                variant="primary"
              />
              <QuickBtn
                href="/pricing"
                title="See pricing"
                desc="Choose Free, Pro, or Team."
              />
              <QuickBtn
                href="/robot"
                title="Try the sci-fi robot"
                desc="Cinematic assistant UI (optional)."
              />
              <QuickBtn
                href="/os"
                title="Enter Shynvo OS (2050)"
                desc="Full immersive OS interface."
              />
              <QuickBtn
                href="/university"
                title="University Hub"
                desc="Faculty environments for students."
                glow="cyan"
              />
              <QuickBtn
                href="/experiments"
                title="Explore Experiments (Beta)"
                desc="Standalone AI universes."
                glow="purple"
              />
            </div>

            <div className="mt-6 text-sm text-white/60">
              Built for: <span className="text-white/80">Students</span>,{" "}
              <span className="text-white/80">Professionals</span>,{" "}
              <span className="text-white/80">Teams</span>
            </div>

            {/* WHY BOX */}
            <div className="mt-6 grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold text-white/80">Why people switch to Shynvo</div>
              <ul className="list-disc space-y-2 pl-5 text-sm text-white/60">
                <li>Instant practice from any topic (no course hunting).</li>
                <li>Exam prep + interview simulation to improve faster.</li>
                <li>Clear environments (University, OS, Experiments) — not a confusing tool soup.</li>
              </ul>
            </div>
          </div>

          {/* RIGHT CARD (CLEAR “HOW USERS USE IT”) */}
          <div className="rounded-3xl border border-white/10 bg-neutral-950 p-6 shadow-xl">
            <div className="text-sm text-white/60">How it works</div>

            <div className="mt-4 grid gap-3">
              <HowRow n="1" title="Pick a path">
                Demo (quick), University Hub (students), OS (immersive), or Experiments (beta).
              </HowRow>
              <HowRow n="2" title="Generate practice">
                Quizzes, flashcards, exam drills, interview prompts — instantly.
              </HowRow>
              <HowRow n="3" title="Repeat + improve">
                Use daily loops. Upgrade for deeper scoring, higher limits, and team features.
              </HowRow>
            </div>

            <div className="mt-6 grid gap-3">
              <Link
                className="inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 font-semibold text-black hover:bg-neutral-200"
                href="/demo"
              >
                Open demo →
              </Link>
              <Link
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-white hover:bg-white/10"
                href="/university"
              >
                Go to University Hub →
              </Link>
              <Link
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-black px-4 py-3 font-semibold text-white hover:bg-white/5"
                href="/os"
              >
                Enter OS →
              </Link>
            </div>

            <div className="mt-3 text-xs text-white/50">
              Tip: Most users start with the demo, then choose University or OS.
            </div>
          </div>
        </section>

        {/* TRUST / STATS */}
        <section className="mt-14 grid gap-4 md:grid-cols-3">
          <Stat value="Free" label="Start with the free tier" />
          <Stat value="Pro" label="Interview prep + higher limits" />
          <Stat value="Team" label="Seats + analytics + skill matrix" />
        </section>

        {/* WHO IT’S FOR */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold">Who Shynvo is for</h2>
          <p className="mt-2 text-white/70">
            Choose your path — Shynvo adapts the experience to your role.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card title="Students">
              Faculty environments, exam drills, recall loops, and confidence-building practice.
            </Card>
            <Card title="Professionals">
              Skill-gap analysis, certification prep, interview readiness and guided improvement.
            </Card>
            <Card title="Companies">
              Team upskilling plans, skill matrix, admin analytics + seats.
            </Card>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-bold">Ready to try it?</h2>
          <p className="mt-2 text-white/70">Start with the demo, then choose a path.</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-neutral-200"
              href="/demo"
            >
              Open demo
            </Link>
            <Link
              className="rounded-xl border border-white/10 bg-black px-5 py-3 font-semibold text-white hover:bg-white/5"
              href="/university"
            >
              University Hub
            </Link>
            <Link
              className="rounded-xl border border-white/10 bg-black px-5 py-3 font-semibold text-white hover:bg-white/5"
              href="/experiments"
            >
              Experiments (Beta)
            </Link>
            <Link
              className="rounded-xl border border-white/10 bg-black px-5 py-3 font-semibold text-white hover:bg-white/5"
              href="/os"
            >
              Enter OS (2050)
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

/* --------------------------- UI helpers --------------------------- */

function QuickBtn({
  href,
  title,
  desc,
  variant,
  glow,
}: {
  href: string;
  title: string;
  desc: string;
  variant?: "primary";
  glow?: "cyan" | "purple";
}) {
  const base =
    "group relative overflow-hidden rounded-2xl border px-5 py-4 transition";
  const primary =
    "border-white/10 bg-white text-black hover:bg-neutral-200";
  const normal =
    "border-white/10 bg-white/5 text-white hover:bg-white/10";

  const glowStyle =
    glow === "cyan"
      ? {
          background: `
            radial-gradient(700px circle at 20% 20%, rgba(34,211,238,0.18), transparent 55%),
            radial-gradient(700px circle at 80% 30%, rgba(56,189,248,0.12), transparent 55%),
            linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.20))
          `,
        }
      : glow === "purple"
      ? {
          background: `
            radial-gradient(700px circle at 18% 25%, rgba(168,85,247,0.18), transparent 55%),
            radial-gradient(700px circle at 82% 22%, rgba(244,114,182,0.12), transparent 55%),
            linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.20))
          `,
        }
      : undefined;

  return (
    <Link
      href={href}
      className={[
        base,
        variant === "primary" ? primary : normal,
      ].join(" ")}
      style={glowStyle}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="font-semibold">{title}</div>
        <span className="text-xs opacity-70 group-hover:opacity-100">→</span>
      </div>
      <div
        className={[
          "mt-1 text-sm",
          variant === "primary" ? "text-black/70" : "text-white/60",
        ].join(" ")}
      >
        {desc}
      </div>
    </Link>
  );
}

function HowRow({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold">
          {n}
        </div>
        <div className="font-semibold text-white">{title}</div>
      </div>
      <div className="mt-2 text-sm text-white/60">{children}</div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black p-6">
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-2 text-sm text-white/60">{children}</div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black p-6">
      <div className="text-2xl font-bold">{value}</div>
      <div className="mt-1 text-sm text-white/60">{label}</div>
    </div>
  );
}