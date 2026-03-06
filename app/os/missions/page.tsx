import Link from "next/link";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type MissionCard = {
  title: string;
  subtitle: string;
  status: string;
};

const MISSION_CARDS: MissionCard[] = [
  {
    title: "Active Missions",
    subtitle: "View all live missions, their status, and next required action.",
    status: "Online",
  },
  {
    title: "Create Mission",
    subtitle: "Turn a goal into a structured mission with phases and execution blocks.",
    status: "Ready",
  },
  {
    title: "Mission Archive",
    subtitle: "Review completed and paused missions with historical progress.",
    status: "Available",
  },
];

export default function OSMissionsPage() {
  return (
    <section className="py-10 sm:py-14">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/os"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            ← Back to Orbital Nexus
          </Link>

          <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Shynvo OS
          </div>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
            Missions
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
            Missions are the execution engine of Shynvo OS. A user goal becomes a
            mission, then a mission becomes structured phases, sessions, and measurable
            progress over time.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
          Mission Layer: Online
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Mission Logic
          </div>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            From goal to execution
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Goal</div>
              <div className="mt-2 text-sm text-white/65">
                The user states what they want to achieve.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Mission</div>
              <div className="mt-2 text-sm text-white/65">
                The OS structures the goal into a guided path.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Sessions</div>
              <div className="mt-2 text-sm text-white/65">
                Execution happens through scheduled focus blocks.
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="text-sm font-semibold text-white">Example mission</div>
            <div className="mt-3 text-sm leading-6 text-white/70">
              Goal: <span className="text-white">Pass Machine Learning Exam</span>
              <br />
              Mission phases:
              <br />• Learn core concepts
              <br />• Practice applied questions
              <br />• Run mock exam sessions
              <br />• Review weak areas and finalize revision
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Mission Status
          </div>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Current State</div>
              <div className="mt-1 text-sm text-white/65">Structured mission layer ready</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Execution Use</div>
              <div className="mt-1 text-sm text-white/65">
                Supports study, project, and professional mission flows
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">System Role</div>
              <div className="mt-1 text-sm text-white/65">
                Distinct from University Hub: this is execution, not teaching
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
          Mission Areas
        </div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Mission overview
        </h2>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {MISSION_CARDS.map((card) => (
          <div
            key={card.title}
            className={cx(
              "group relative overflow-hidden rounded-3xl border p-5 transition",
              "border-white/10 bg-white/5"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-semibold text-white">{card.title}</div>
                <div className="mt-1 text-sm leading-6 text-white/70">{card.subtitle}</div>
              </div>

              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/75">
                {card.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
