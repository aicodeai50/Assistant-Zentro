import Link from "next/link";

export default function ChronoVaultPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* universe bg */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1100px circle at 18% 18%, rgba(34,211,238,0.22), transparent 55%),
              radial-gradient(1000px circle at 82% 22%, rgba(168,85,247,0.20), transparent 55%),
              radial-gradient(900px circle at 40% 90%, rgba(244,114,182,0.10), transparent 60%),
              linear-gradient(180deg, rgba(2,6,23,0.70), rgba(0,0,0,0.95))
            `,
          }}
        />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-14">
        {/* header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-white/60">
              Experiment
            </div>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">
              Chrono Vault
            </h1>
            <p className="mt-3 max-w-2xl text-white/70">
              A reflective future-self simulator. Not prediction — simulation.
              Explore branching timelines to clarify values, priorities, and
              tradeoffs.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
              <span className="h-2 w-2 rounded-full bg-cyan-300/80" />
              Phase: content-ready • UI shell • timeline engine next
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href="/experiments"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              Back to Hub →
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white/80 hover:bg-white/5"
            >
              Home
            </Link>
          </div>
        </div>

        {/* meaning cards */}
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-black/50 p-7 backdrop-blur">
            <div className="text-sm font-semibold text-white/90">
              What it is
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/75">
              <li>Future-self narratives across 1y / 5y / 10y horizons.</li>
              <li>Branching paths based on decisions you choose today.</li>
              <li>Emotional + practical outcomes visualized side-by-side.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/50 p-7 backdrop-blur">
            <div className="text-sm font-semibold text-white/90">
              The core loop
            </div>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-white/75">
              <li>Pick a life area: career, health, relationships, identity.</li>
              <li>Choose a decision fork (e.g., “move / stay”).</li>
              <li>Compare timelines and extract your “signal”.</li>
            </ol>
          </div>
        </div>

        {/* feature list */}
        <div className="mt-4 rounded-3xl border border-white/10 bg-black/50 p-7 backdrop-blur">
          <div className="text-sm font-semibold text-white/90">
            Planned feature set
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Feature title="Future-Self Narratives">
              Generate voice-consistent future “letters” from you at different
              horizons (1y / 5y / 10y).
            </Feature>

            <Feature title="Decision Fork Engine">
              Branch timelines from one decision into several plausible
              directions with consequences.
            </Feature>

            <Feature title="Timeline Comparison View">
              Compare futures side-by-side across career, health, relationships,
              finances, and meaning.
            </Feature>

            <Feature title="Reflective Prompts">
              Questions that surface values: “What do you refuse to sacrifice?”
              “What regret do you fear?”
            </Feature>

            <Feature title="Emotional Trajectory Mapping">
              Track confidence, stress, fulfillment, and regret across each
              branch.
            </Feature>

            <Feature title="Milestone Cards">
              Key moments presented as shareable cards: “Year 3 — turning point”
              “Year 7 — consequence”.
            </Feature>

            <Feature title="Reality Check Mode">
              Ground the simulation with constraints, tradeoffs, and uncertainty
              (no magical thinking).
            </Feature>

            <Feature title="Anchor Commitments">
              Convert insights into small present-day actions (weekly steps).
            </Feature>
          </div>

          <div className="mt-6 text-xs text-white/55">
            Next implementation step: build a “fork picker” → AI generates 3
            branches → render timeline cards.
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-white/45">
          Chrono Vault • reflective, not predictive • clarity over certainty
        </div>
      </div>
    </div>
  );
}

function Feature({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
      <div className="text-sm font-semibold text-white/90">{title}</div>
      <div className="mt-2 text-sm text-white/70">{children}</div>
    </div>
  );
}