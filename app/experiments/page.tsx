import Link from "next/link";

export default function ExperimentsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto max-w-7xl px-6 py-16">
        {/* HEADER */}
        <section className="mb-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/60">
                Explore Experiments (Beta)
              </p>
              <h1 className="mt-2 text-3xl font-bold md:text-4xl">
                Standalone AI universes
              </h1>
              <p className="mt-3 max-w-2xl text-white/70">
                Experiments are immersive, fullscreen AI prototypes — separate
                from Shynvo OS. Each evolves independently with its own versions
                and visuals.
              </p>
            </div>

            <Link
              href="/experiments"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/15"
            >
              Open Experiment Hub →
            </Link>
          </div>
        </section>

        {/* GRID */}
        <section className="grid gap-6 md:grid-cols-2">
          {/* Thought Forge */}
          <Link
            href="/experiments/thought-forge"
            className="group rounded-3xl border border-white/15 bg-gradient-to-br from-lime-500/20 via-emerald-500/10 to-cyan-500/10 p-6 transition hover:scale-[1.01] hover:border-white/30"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Thought Forge</h2>
              <span className="rounded-full bg-black/40 px-3 py-1 text-xs text-white/70">
                v0.2 · Beta
              </span>
            </div>

            <p className="mt-3 text-white/80">
              A living concept graph. Seed a thought, click nodes, and expand
              meaning visually.
            </p>

            <p className="mt-4 text-xs text-white/60">
              Phase 1 stable · AI expansion next
            </p>

            <div className="mt-6 text-sm font-semibold text-white/80">
              Enter →
            </div>
          </Link>

          {/* Debate Matrix */}
          <Link
            href="/experiments/debate-matrix"
            className="group rounded-3xl border border-white/15 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-indigo-500/10 p-6 transition hover:scale-[1.01] hover:border-white/30"
          >
            <h2 className="text-xl font-semibold">Debate Matrix</h2>

            <p className="mt-3 text-white/80">
              Multi-agent debate to break echo chambers. Arguments mapped for &
              against.
            </p>

            <p className="mt-4 text-xs text-white/60">
              Experimental logic engine
            </p>

            <div className="mt-6 text-sm font-semibold text-white/80">
              Enter →
            </div>
          </Link>

          {/* Chrono Vault */}
          <Link
            href="/experiments/chrono-vault"
            className="group rounded-3xl border border-white/15 bg-gradient-to-br from-teal-500/20 via-sky-500/10 to-violet-500/10 p-6 transition hover:scale-[1.01] hover:border-white/30"
          >
            <h2 className="text-xl font-semibold">Chrono Vault</h2>

            <p className="mt-3 text-white/80">
              Future-self simulation with branching timelines and reflective
              guidance.
            </p>

            <p className="mt-4 text-xs text-white/60">
              Narrative timelines · Decision futures
            </p>

            <div className="mt-6 text-sm font-semibold text-white/80">
              Enter →
            </div>
          </Link>

          {/* Beta Notes */}
          <Link
            href="/experiments/beta-notes"
            className="group rounded-3xl border border-white/15 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-rose-500/10 p-6 transition hover:scale-[1.01] hover:border-white/30"
          >
            <h2 className="text-xl font-semibold">Beta Notes</h2>

            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li>• v0.2 Canvas stability + build fixes</li>
              <li>• v0.3 AI-generated nodes</li>
              <li>• v0.4 Animated emergence + thinking effects</li>
            </ul>

            <div className="mt-6 text-sm font-semibold text-white/80">
              Open notes →
            </div>
          </Link>
        </section>

        {/* FOOT NOTE */}
        <div className="mt-12 text-center text-xs text-white/50">
          Experiments are separate from Shynvo OS · No shared UI primitives
        </div>
      </main>
    </div>
  );
}