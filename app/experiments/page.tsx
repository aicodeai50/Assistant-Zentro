import Link from "next/link";

const CARD =
  "group relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl transition hover:bg-white/10";

function Glow({
  a,
  b,
  c,
}: {
  a: string;
  b: string;
  c: string;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-80"
      style={{
        background: `
          radial-gradient(800px circle at 20% 25%, ${a}, transparent 60%),
          radial-gradient(700px circle at 80% 30%, ${b}, transparent 55%),
          radial-gradient(900px circle at 50% 95%, ${c}, transparent 60%)
        `,
      }}
    />
  );
}

export default function ExperimentsHubPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-xs tracking-widest text-white/70">
            EXPLORE EXPERIMENTS (BETA)
          </div>
          <h1 className="mt-2 text-4xl font-semibold text-white">
            Standalone AI universes
          </h1>
          <p className="mt-3 max-w-2xl text-white/70">
            Experiments are immersive, fullscreen AI prototypes — separate from
            Shynvo OS. Each evolves independently with its own versions and
            visuals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/experiments"
            className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15"
          >
            Open Experiment Hub →
          </Link>
          <Link
            href="/os"
            className="rounded-2xl border border-white/15 bg-black/40 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
          >
            Enter OS (2050) →
          </Link>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {/* Thought Forge */}
        <Link href="/experiments/thought-forge" className={CARD}>
          <Glow a="rgba(163,230,53,0.35)" b="rgba(34,211,238,0.20)" c="rgba(16,185,129,0.15)" />
          <div className="relative">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xl font-semibold text-white">Thought Forge</div>
                <div className="mt-1 text-sm text-white/70">
                  A living concept graph. Seed a thought, click nodes, and expand meaning visually.
                </div>
              </div>
              <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
                v0.2 · Beta
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-white/60">
                Phase 1 stable · AI expansion next
              </div>
              <div className="text-sm text-white/85 group-hover:text-white">
                Enter →
              </div>
            </div>
          </div>
        </Link>

        {/* Debate Matrix */}
        <Link href="/experiments/debate-matrix" className={CARD}>
          <Glow a="rgba(180,120,255,0.28)" b="rgba(255,120,180,0.20)" c="rgba(120,200,255,0.14)" />
          <div className="relative">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xl font-semibold text-white">Debate Matrix</div>
                <div className="mt-1 text-sm text-white/70">
                  Multi-agent debate to break echo chambers. Arguments mapped for & against.
                </div>
              </div>
              <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
                v0.1 · Alpha
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-white/60">
                Experimental logic engine
              </div>
              <div className="text-sm text-white/85 group-hover:text-white">
                Enter →
              </div>
            </div>
          </div>
        </Link>

        {/* Chrono Vault */}
        <Link href="/experiments/chrono-vault" className={CARD}>
          <Glow a="rgba(120,255,220,0.20)" b="rgba(120,180,255,0.20)" c="rgba(255,180,120,0.12)" />
          <div className="relative">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xl font-semibold text-white">Chrono Vault</div>
                <div className="mt-1 text-sm text-white/70">
                  Future-self simulation with branching timelines and reflective guidance.
                </div>
              </div>
              <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
                v0.1 · Alpha
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-white/60">
                Narrative timelines · Decision futures
              </div>
              <div className="text-sm text-white/85 group-hover:text-white">
                Enter →
              </div>
            </div>
          </div>
        </Link>

        {/* Beta Notes */}
        <Link href="/experiments/beta-notes" className={CARD}>
          <Glow a="rgba(255,180,120,0.18)" b="rgba(180,120,255,0.18)" c="rgba(120,200,255,0.12)" />
          <div className="relative">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs tracking-widest text-white/70">BETA NOTES</div>
                <div className="mt-2 text-sm text-white/75">
                  • v0.2 Canvas stability + build fixes
                  <br />
                  • v0.3 AI-generated nodes
                  <br />
                  • v0.4 Animated emergence + thinking effects
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-white/60">Changelog + roadmap</div>
              <div className="text-sm text-white/85 group-hover:text-white">
                Open notes →
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-10 text-center text-xs text-white/45">
        Experiments are separate from OS • No shared UI primitives
      </div>
    </div>
  );
}