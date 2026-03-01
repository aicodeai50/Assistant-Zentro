{/* EXPLORE EXPERIMENTS (BETA) — FULL WIDTH */}
<section className="mt-16 rounded-3xl border border-white/10 bg-neutral-950 p-8">
  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div>
      <div className="text-xs uppercase tracking-widest text-white/60">
        Explore Experiments (Beta)
      </div>
      <h2 className="mt-2 text-2xl font-bold text-white">
        Standalone AI universes
      </h2>
      <p className="mt-2 max-w-2xl text-white/70">
        Experiments are immersive, fullscreen AI prototypes — separate from
        Shynvo OS. Each evolves independently with its own versions and visuals.
      </p>
    </div>

    <Link
      href="/experiments"
      className="inline-flex rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
    >
      Open Experiment Hub →
    </Link>
  </div>

  <div className="mt-8 grid gap-4 md:grid-cols-2">
    {/* Thought Forge */}
    <Link
      href="/experiments/thought-forge"
      className="group rounded-3xl border border-white/10 bg-black p-6 hover:bg-white/5"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="text-lg font-semibold text-white">
          Thought Forge
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          v0.2 • Beta
        </div>
      </div>

      <p className="mt-2 text-sm text-white/65">
        A living concept graph. Seed a thought, click nodes, and expand meaning
        visually.
      </p>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-white/50">
          Phase 1 stable • AI expansion next
        </div>
        <div className="text-xs text-white/70 group-hover:text-white">
          Enter →
        </div>
      </div>
    </Link>

    {/* Upcoming experiments */}
    <div className="rounded-3xl border border-white/10 bg-black p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="text-lg font-semibold text-white/70">
          Debate Matrix
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">
          Soon
        </div>
      </div>
      <p className="mt-2 text-sm text-white/55">
        Multi-agent debate to break echo chambers. Arguments mapped for & against.
      </p>
      <div className="mt-4 text-xs text-white/45">Status: planned</div>
    </div>

    <div className="rounded-3xl border border-white/10 bg-black p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="text-lg font-semibold text-white/70">
          Chrono Vault
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">
          Soon
        </div>
      </div>
      <p className="mt-2 text-sm text-white/55">
        Future-self simulation with branching timelines and reflective guidance.
      </p>
      <div className="mt-4 text-xs text-white/45">Status: planned</div>
    </div>

    {/* Beta notes */}
    <div className="rounded-3xl border border-white/10 bg-black p-6">
      <div className="text-xs uppercase tracking-widest text-white/60">
        Beta Notes
      </div>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-xs text-white/50">
        <li>v0.2: Canvas stability + build fixes</li>
        <li>v0.3 next: AI-generated nodes (/api/public/chat)</li>
        <li>v0.4 next: Animated emergence + thinking effects</li>
      </ul>
    </div>
  </div>
</section>