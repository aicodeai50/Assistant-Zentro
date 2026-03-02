import Link from "next/link";

type Zone =
  | "Laboratory"
  | "Arena"
  | "Observatory"
  | "Robotics"
  | "Arcade"
  | "Stadium"
  | "Notes";

type Status = "Boarding" | "Open" | "Alpha" | "Planned";

type Destination = {
  title: string;
  slug: string;
  zone: Zone;
  purpose: string;
  status: Status;
  version?: string;
  actionLabel: string;
  accent: { a: string; b: string; c: string };
};

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
          radial-gradient(900px circle at 18% 24%, ${a}, transparent 55%),
          radial-gradient(850px circle at 82% 18%, ${b}, transparent 55%),
          radial-gradient(900px circle at 50% 95%, ${c}, transparent 60%)
        `,
      }}
    />
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
      {text}
    </span>
  );
}

function StatusPill({ status }: { status: Status }) {
  const map: Record<Status, string> = {
    Boarding: "border-white/15 bg-white/10 text-white/85",
    Open: "border-white/20 bg-white/15 text-white",
    Alpha: "border-white/15 bg-black/40 text-white/80",
    Planned: "border-white/15 bg-black/30 text-white/70",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${map[status]}`}>
      {status}
    </span>
  );
}

function Row({
  d,
  isTop,
}: {
  d: Destination;
  isTop?: boolean;
}) {
  return (
    <Link href={d.slug} className={`${CARD} ${isTop ? "md:col-span-2" : ""}`}>
      <Glow a={d.accent.a} b={d.accent.b} c={d.accent.c} />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xl font-semibold text-white">{d.title}</div>
            <div className="mt-1 text-sm text-white/70">{d.purpose}</div>
          </div>

          <div className="flex items-center gap-2">
            {d.version ? <Badge text={d.version} /> : null}
            <StatusPill status={d.status} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge text={`Zone: ${d.zone}`} />
          </div>

          <div className="text-sm text-white/85 group-hover:text-white">
            {d.actionLabel} →
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ExperimentsHubPage() {
  // IMPORTANT:
  // These slugs MUST exist as actual routes.
  // - thought-forge ✅ (you already have it)
  // - debate-matrix ✅ (you said it exists)
  // - chrono-vault ✅ (you said it exists)
  // - beta-notes ✅ (if you created it)
  //
  // If any of these pages do not exist, create their /page.tsx later
  // OR temporarily point them to /experiments (so no 404).

  const destinations: Destination[] = [
    {
      title: "Thought Forge",
      slug: "/experiments/thought-forge",
      zone: "Laboratory",
      purpose:
        "Explore ideas visually. Seed a thought, expand nodes, and reveal meaning as a living graph.",
      status: "Open",
      version: "v0.2 · Beta",
      actionLabel: "Enter",
      accent: {
        a: "rgba(163,230,53,0.30)",
        b: "rgba(34,211,238,0.18)",
        c: "rgba(16,185,129,0.12)",
      },
    },
    {
      title: "Debate Matrix",
      slug: "/experiments/debate-matrix",
      zone: "Arena",
      purpose:
        "Stress-test beliefs through structured multi-agent debate. Map arguments, counterclaims, and blind spots.",
      status: "Alpha",
      version: "v0.1 · Alpha",
      actionLabel: "Enter",
      accent: {
        a: "rgba(180,120,255,0.26)",
        b: "rgba(244,114,182,0.18)",
        c: "rgba(34,211,238,0.12)",
      },
    },
    {
      title: "Chrono Vault",
      slug: "/experiments/chrono-vault",
      zone: "Observatory",
      purpose:
        "Simulate future selves and branching timelines. Not prediction — clarity through consequence mapping.",
      status: "Alpha",
      version: "v0.1 · Alpha",
      actionLabel: "Enter",
      accent: {
        a: "rgba(34,211,238,0.18)",
        b: "rgba(168,85,247,0.18)",
        c: "rgba(255,180,120,0.10)",
      },
    },
    {
      title: "Beta Notes",
      slug: "/experiments/beta-notes",
      zone: "Notes",
      purpose:
        "Changelog + roadmap. See what shipped, what’s next, and what we’re building toward.",
      status: "Open",
      version: "v0.2",
      actionLabel: "Open",
      accent: {
        a: "rgba(99,102,241,0.18)",
        b: "rgba(244,114,182,0.14)",
        c: "rgba(34,211,238,0.10)",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Terminal-style universe background */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1100px circle at 18% 18%, rgba(34,211,238,0.14), transparent 55%),
              radial-gradient(1000px circle at 82% 20%, rgba(168,85,247,0.14), transparent 55%),
              radial-gradient(1000px circle at 50% 95%, rgba(163,230,53,0.08), transparent 60%),
              linear-gradient(180deg, rgba(2,6,23,0.72), rgba(0,0,0,0.95))
            `,
            filter: "saturate(1.15) contrast(1.05)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-12">
        {/* Header */}
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

        {/* Departures Board */}
        <div className="mt-10 rounded-3xl border border-white/15 bg-black/35 p-5 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-white/90">
                Departures
              </div>
              <div className="mt-1 text-xs text-white/60">
                Enter a universe • explore • return anytime
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge text="Mode: Explore" />
              <Badge text="Layer: Experiments" />
              <Badge text="Status: Beta" />
            </div>
          </div>

          <div className="mt-4 h-[1px] w-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)]" />

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {/* Make Thought Forge feel “featured” */}
            <Row d={destinations[0]} isTop />
            <Row d={destinations[1]} />
            <Row d={destinations[2]} />
            <Row d={destinations[3]} />
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-white/45">
          Experiments are separate from OS • Each destination evolves independently
        </div>
      </div>
    </div>
  );
}
