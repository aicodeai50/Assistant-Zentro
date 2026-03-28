import Link from "next/link";

const worlds = [
  {
    title: "University Hub",
    desc: "Structured academic learning, guided study, faculties, and higher education paths.",
    href: "/university",
    tag: "Learn",
  },
  {
    title: "Shynvo Academy",
    desc: "School-focused learning, subject rooms, tutors, and classroom-style progress.",
    href: "/academy",
    tag: "Learn",
  },
  {
    title: "Frontier Lab",
    desc: "Coding, systems, engineering workflows, and build-focused practice.",
    href: "/frontier",
    tag: "Build",
  },
  {
    title: "Arcade Sim",
    desc: "Interactive drills, challenge loops, and skill-based practice.",
    href: "/arcade",
    tag: "Practice",
  },
  {
    title: "Shynvo Robot",
    desc: "Guided AI support that helps users navigate the platform and choose a direction.",
    href: "/robot",
    tag: "Guide",
  },
  {
    title: "Experiments",
    desc: "Debate, simulation, concept development, and AI exploration spaces.",
    href: "/experiments",
    tag: "Explore",
  },
  {
    title: "Enterprise",
    desc: "Missions, teams, analytics, and structured work environments.",
    href: "/enterprise",
    tag: "Work",
  },
];

export default function WorldsPage() {
  return (
    <main className="relative overflow-hidden">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-[2px]">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
            Worlds
          </div>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Choose your world
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-white/72">
            Each Shynvo environment is built for a different kind of progress.
            Pick the one that matches what you want to do today.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {worlds.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-[1.75rem] border border-white/10 bg-white/5 p-5 transition hover:bg-white/[0.07]"
            >
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/60">
                {item.tag}
              </div>

              <h2 className="mt-4 text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/72">{item.desc}</p>

              <div className="mt-5 text-sm font-semibold text-white/88 group-hover:text-white">
                Enter world →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
