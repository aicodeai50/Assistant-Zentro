import Link from "next/link";

const CARD =
  "group relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl transition hover:bg-white/10";

function Glow({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-80"
      style={{
        background: `
          radial-gradient(900px circle at 20% 25%, ${a}, transparent 60%),
          radial-gradient(800px circle at 80% 30%, ${b}, transparent 55%),
          radial-gradient(1000px circle at 50% 95%, ${c}, transparent 60%)
        `,
      }}
    />
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

export default function ExperimentsHubPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1100px circle at 18% 18%, rgba(34,211,238,0.14), transparent 55%),
              radial-gradient(1000px circle at 82% 22%, rgba(163,230,53,0.10), transparent 55%),
              radial-gradient(1000px circle at 50% 95%, rgba(180,140,255,0.12), transparent 60%),
              linear-gradient(180deg, rgba(2,6,23,0.72), rgba(0,0,0,0.95))
            `,
          }}
        />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:46px_46px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-12">
        {/* Header / Terminal */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-xs tracking-widest text-white/70">
              EXPLORE EXPERIMENTS (BETA)
            </div>
            <h1 className="mt-2 text-4xl font-semibold text-white">
              Departures Terminal
            </h1>
            <p className="mt-3 max-w-2xl text-white/70">
              Choose a destination. Each experiment is a standalone AI universe with its own rules,
              visuals, and evolution — separate from Shynvo OS.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Tag>Mode: Explore</Tag>
              <Tag>Layer: Experiments</Tag>
              <Tag>Status: Beta</Tag>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15"
            >
              Home →
            </Link>
            <Link
              href="/os"
              className="rounded-2xl border border-white/15 bg-black/40 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
            >
              Enter OS (2050) →
            </Link>
          </div>
        </div>

        {/* Grid (back to old layout: 2x2 equal cards) */}
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {/* Thought Forge */}
          <Link href="/experiments/thought-forge" className={CARD}>
            <Glow
              a="rgba(163,230,53,0.28)"
              b="rgba(34,211,238,0.20)"
              c="rgba(16,185,129,0.12)"
            />
            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xl font-semibold text-white">Thought Forge</div>
                  <div className="mt-1 text-sm text-white/70">
                    Explore ideas visually. Seed a thought, expand nodes, and reveal meaning as a living graph.
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Tag>v0.2 · Beta</Tag>
                  <Tag>Zone: Laboratory</Tag>
                </div>
              </div>

              <div className="mt-auto pt-5 flex items-center justify-between">
                <div className="text-xs text-white/60">Phase 1 stable · AI expansion next</div>
                <div className="text-sm text-white/85 group-hover:text-white">Enter →</div>
              </div>
            </div>
          </Link>

          {/* Debate Matrix */}
          <Link href="/experiments/debate-matrix" className={CARD}>
            <Glow
              a="rgba(180,120,255,0.22)"
              b="rgba(255,120,180,0.16)"
              c="rgba(120,200,255,0.12)"
            />
            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xl font-semibold text-white">Debate Matrix</div>
                  <div className="mt-1 text-sm text-white/70">
                    Stress-test beliefs through structured multi-agent debate. Map arguments, counterclaims, and blind spots.
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Tag>v0.1 · Alpha</Tag>
                  <Tag>Zone: Arena</Tag>
                </div>
              </div>

              <div className="mt-auto pt-5 flex items-center justify-between">
                <div className="text-xs text-white/60">Debate → clarity → blind spots</div>
                <div className="text-sm text-white/85 group-hover:text-white">Enter →</div>
              </div>
            </div>
          </Link>

          {/* Chrono Vault */}
          <Link href="/experiments/chrono-vault" className={CARD}>
            <Glow
              a="rgba(120,255,220,0.16)"
              b="rgba(120,180,255,0.18)"
              c="rgba(255,180,120,0.10)"
            />
            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xl font-semibold text-white">Chrono Vault</div>
                  <div className="mt-1 text-sm text-white/70">
                    Simulate future selves and branching timelines. Not prediction — clarity through consequence mapping.
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Tag>v0.1 · Alpha</Tag>
                  <Tag>Zone: Observatory</Tag>
                </div>
              </div>

              <div className="mt-auto pt-5 flex items-center justify-between">
                <div className="text-xs text-white/60">Timelines · tradeoffs · decisions</div>
                <div className="text-sm text-white/85 group-hover:text-white">Enter →</div>
              </div>
            </div>
          </Link>

          {/* Beta Notes */}
          <Link href="/experiments/beta-notes" className={CARD}>
            <Glow
              a="rgba(255,180,120,0.14)"
              b="rgba(180,120,255,0.14)"
              c="rgba(120,200,255,0.10)"
            />
            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xl font-semibold text-white">Beta Notes</div>
                  <div className="mt-1 text-sm text-white/70">
                    Changelog + roadmap. See what shipped, what’s next, and what we’re building toward.
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Tag>v0.2</Tag>
                  <Tag>Zone: Notes</Tag>
                </div>
              </div>

              <div className="mt-auto pt-5 flex items-center justify-between">
                <div className="text-xs text-white/60">Changelog · roadmap</div>
                <div className="text-sm text-white/85 group-hover:text-white">Open →</div>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-10 text-center text-xs text-white/45">
          Experiments are separate from OS • Each destination evolves independently
        </div>
      </div>
    </div>
  );
}
