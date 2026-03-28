import PreviewTypingLoop from "../components/PreviewTypingLoop";

const items = [
  {
    title: "Shynvo Robot",
    desc: "AI guide that helps users navigate the platform, choose a direction, and get started faster.",
    variant: "robot" as const,
    tag: "Guide",
    lines: [
      "Analyzing your direction...",
      "Recommended route: Shynvo Robot",
      "Next step: choose where to begin",
    ],
  },
  {
    title: "University Hub",
    desc: "Structured academic learning space for guided study, faculties, and higher education paths.",
    variant: "university" as const,
    tag: "Learning",
    lines: [
      "Loading academic pathways...",
      "Faculty ready: Computer Science",
      "Next lesson: Algorithms fundamentals",
    ],
  },
  {
    title: "Frontier Lab",
    desc: "Technical environment for coding, systems, engineering workflows, and build-focused practice.",
    variant: "frontier" as const,
    tag: "Build",
    lines: [
      "Booting Frontier systems...",
      "Mode active: AI Builder",
      "Preparing engineering workflow...",
    ],
  },
];

export default function PreviewPage() {
  return (
    <main className="relative overflow-hidden">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-[2px]">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
            Preview
          </div>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            See inside Shynvo
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-white/72">
            Explore how Shynvo looks and feels before you enter. These previews
            show real directions inside the platform and where each experience begins.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-lg font-semibold text-white">{item.title}</div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/60">
                  {item.tag}
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-white/72">{item.desc}</p>

              <div className="mt-4">
                <PreviewTypingLoop variant={item.variant} lines={item.lines} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
