import Link from "next/link";

export default function ExperimentsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        {/* header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold">Explore Experiments (Beta)</h1>
          <p className="mt-2 max-w-2xl text-white/70">
            Standalone AI universes. Each experiment evolves independently with
            its own logic, visuals, and versions.
          </p>
        </div>

        {/* experiment grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Thought Forge */}
          <Link
            href="/experiments/thought-forge"
            className="block rounded-3xl border border-white/15 bg-white/10 p-6 hover:bg-white/15 transition"
          >
            <div className="text-lg font-semibold">Thought Forge</div>
            <div className="mt-1 text-sm text-white/70">
              A living concept graph. Seed a thought and expand meaning visually.
            </div>
            <div className="mt-4 text-xs text-white/60">
              v0.2 · Phase 1 stable · AI expansion next
            </div>
          </Link>

          {/* Debate Matrix */}
          <Link
            href="/experiments/debate-matrix"
            className="block rounded-3xl border border-white/15 bg-white/10 p-6 hover:bg-white/15 transition"
          >
            <div className="text-lg font-semibold">Debate Matrix</div>
            <div className="mt-1 text-sm text-white/70">
              Multi-agent debate to break echo chambers. Arguments mapped for &
              against.
            </div>
            <div className="mt-4 text-xs text-white/60">
              Experimental logic engine
            </div>
          </Link>

          {/* Chrono Vault */}
          <Link
            href="/experiments/chrono-vault"
            className="block rounded-3xl border border-white/15 bg-white/10 p-6 hover:bg-white/15 transition"
          >
            <div className="text-lg font-semibold">Chrono Vault</div>
            <div className="mt-1 text-sm text-white/70">
              Future-self simulation with branching timelines and reflection.
            </div>
            <div className="mt-4 text-xs text-white/60">
              Narrative timelines · Decision futures
            </div>
          </Link>

          {/* Beta Notes */}
          <Link
            href="/experiments/beta-notes"
            className="block rounded-3xl border border-white/15 bg-white/10 p-6 hover:bg-white/15 transition"
          >
            <div className="text-lg font-semibold">Beta Notes</div>
            <div className="mt-1 text-sm text-white/70">
              Version history, design decisions, and experiment evolution.
            </div>
            <div className="mt-4 text-xs text-white/60">
              Changelog · Roadmap · Principles
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}