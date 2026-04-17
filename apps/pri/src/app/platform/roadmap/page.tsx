import PlatformLayout from "@/components/platform/PlatformLayout";

const phases = [
  {
    title: "Phase 1 — Foundation",
    items: [
      "Platform shell and navigation",
      "Builder working as core frontend module",
      "Wallet, APIs, runs, and robots pages",
      "Overview as the command center",
    ],
  },
  {
    title: "Phase 2 — Developer Platform",
    items: [
      "Saved APIs registry",
      "Run history and logs",
      "Better runtime output",
      "Credits and billing surfaces",
    ],
  },
  {
    title: "Phase 3 — AI Brain",
    items: [
      "Goal input → plan output",
      "Workflow generation from natural language",
      "Reasoning and memory surfaces",
      "Agent orchestration layer",
    ],
  },
  {
    title: "Phase 4 — Robot VM + Twin",
    items: [
      "Robot state surfaces",
      "Mission control",
      "Digital twin and simulation",
      "Validation before execution",
    ],
  },
  {
    title: "Phase 5 — Identity + Studio",
    items: [
      "Avatar creation",
      "Digital identity",
      "Content studio",
      "Live and creator tools",
    ],
  },
];

export default function RoadmapPage() {
  return (
    <PlatformLayout
      title="Roadmap"
      subtitle="The blended vision for Shynvo as an AI robotics operating system."
    >
      <div className="space-y-6">
        <section className="rounded-3xl border border-white/10 bg-black/20 p-8 text-white">
          <div className="text-xs uppercase tracking-[0.24em] text-white/40">
            Master Plan
          </div>
          <h2 className="mt-2 text-3xl font-semibold">Shynvo OS</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/55">
            A cross-device AI robotics OS that can generate APIs, create workflows, orchestrate agents,
            manage robot state, simulate execution, build avatars, and support content creation from one platform.
          </p>
        </section>

        <div className="grid gap-6 xl:grid-cols-2">
          {phases.map((phase) => (
            <section
              key={phase.title}
              className="rounded-3xl border border-white/10 bg-black/20 p-6 text-white"
            >
              <h3 className="text-xl font-semibold">{phase.title}</h3>
              <div className="mt-4 space-y-3">
                {phase.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/75"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </PlatformLayout>
  );
}
