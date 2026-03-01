import Link from "next/link";

export default function DebateMatrixPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* universe bg */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1100px circle at 18% 18%, rgba(244,114,182,0.22), transparent 55%),
              radial-gradient(1000px circle at 82% 22%, rgba(99,102,241,0.22), transparent 55%),
              radial-gradient(900px circle at 40% 90%, rgba(34,211,238,0.10), transparent 60%),
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
              Debate Matrix
            </h1>
            <p className="mt-3 max-w-2xl text-white/70">
              A multi-agent debate arena designed to break echo chambers. It
              maps arguments <span className="text-white/90">for</span> and{" "}
              <span className="text-white/90">against</span>, exposes bias, and
              forces stronger thinking.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
              <span className="h-2 w-2 rounded-full bg-pink-400/80" />
              Phase: content-ready • UI shell • logic next
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

        {/* content cards */}
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-black/50 p-7 backdrop-blur">
            <div className="text-sm font-semibold text-white/90">
              What it does
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/75">
              <li>Generates multiple stances on a topic (pro / con / neutral).</li>
              <li>Maps claims → counterclaims → evidence chains.</li>
              <li>Turns disagreement into clarity instead of noise.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/50 p-7 backdrop-blur">
            <div className="text-sm font-semibold text-white/90">
              The core loop
            </div>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-white/75">
              <li>Enter a belief, question, or controversial claim.</li>
              <li>Agents debate it from competing viewpoints.</li>
              <li>You get a map + summary + blind spots.</li>
            </ol>
          </div>
        </div>

        <div className="mt-4 rounded-3xl border border-white/10 bg-black/50 p-7 backdrop-blur">
          <div className="text-sm font-semibold text-white/90">
            Planned feature set
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Feature title="Position Generator">
              Auto-generates distinct stances: pro, con, neutral, and edge
              positions to reveal the full landscape.
            </Feature>

            <Feature title="Argument Mapping">
              Visual graph linking claims, evidence, rebuttals, and “missing
              premises”.
            </Feature>

            <Feature title="Bias Exposure Mode">
              Flags emotional language, common fallacies, and confirmation bias
              patterns.
            </Feature>

            <Feature title="Steelman Engine">
              Each side must present the strongest version of the opposing side
              before responding.
            </Feature>

            <Feature title="Consensus Detector">
              Finds overlap zones and builds “shared ground” summaries.
            </Feature>

            <Feature title="Debate Replay Timeline">
              Step through debate evolution and see where the logic shifted.
            </Feature>

            <Feature title="Shareable Snapshots">
              Export a clean debate card: strongest arguments + key uncertainties
              + balanced summary.
            </Feature>

            <Feature title="Moderator Controls">
              You can ask follow-ups, force citations later, or “freeze” a branch
              of the debate.
            </Feature>
          </div>

          <div className="mt-6 text-xs text-white/55">
            Next implementation step: wire a simple prompt → structured JSON →
            render argument nodes.
          </div>
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