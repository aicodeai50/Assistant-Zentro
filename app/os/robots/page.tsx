import OsNav from "@/components/os/OsNav";

export default function RobotsPage() {
  const bots = [
    { name: "StudyBot", desc: "Available in the OS execution layer" },
    { name: "CodeBot", desc: "Available in the OS execution layer" },
    { name: "StrategyBot", desc: "Available in the OS execution layer" },
    { name: "ResearchBot", desc: "Available in the OS execution layer" },
  ];

  return (
    <section className="py-10 sm:py-14">
      <OsNav />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo OS
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Robots
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Robots are specialized AI agents inside the OS. They support execution with research,
        planning, coding, writing, and decision support.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {bots.map((bot) => (
          <div key={bot.name} className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
            <div className="text-2xl font-semibold text-white">{bot.name}</div>
            <div className="mt-3 text-sm text-white/70">{bot.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
