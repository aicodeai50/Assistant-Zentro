export default function FrontierPage() {
  const modules = [
    {
      title: "Crisis Simulation",
      desc: "Run high-stakes scenarios and pressure-based decision drills.",
    },
    {
      title: "Leadership Drills",
      desc: "Train decision-making, composure, and command under uncertainty.",
    },
    {
      title: "Protocol Systems",
      desc: "Design and test repeatable response systems for complex situations.",
    },
    {
      title: "Resilience Training",
      desc: "Build readiness for ambiguity, pressure, and operational stress.",
    },
  ];

  return (
    <div className="min-h-screen py-10 text-white">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          Frontier Lab
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          High-Reliability Decision Environment
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
          Frontier Lab is built for leadership, crisis response, resilience, and strategic
          decision training. This environment is designed for pressure-tested intelligence.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
          >
            Enter Frontier Lab
          </button>
          <a
            href="/docs"
            className="rounded-xl px-5 py-3 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/5"
          >
            Read Framework
          </a>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {modules.map((module) => (
          <div
            key={module.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:bg-white/[0.07]"
          >
            <div className="text-lg font-semibold">{module.title}</div>
            <p className="mt-3 text-sm leading-6 text-white/65">{module.desc}</p>

            <div className="mt-5">
              <button
                type="button"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10"
              >
                Open Module
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <div className="text-sm font-semibold text-white">Mission of Frontier Lab</div>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/70">
          This environment helps users think clearly under pressure and build reliable systems
          for uncertain, complex, and high-stakes situations.
        </p>
      </section>
    </div>
  );
}
