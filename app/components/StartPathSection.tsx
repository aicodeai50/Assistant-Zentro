import Link from "next/link";

const paths = [
  {
    title: "I want to learn",
    desc: "Start with structured academic study, guided subjects, and clear learning paths.",
    href: "/university",
    tag: "Learner",
  },
  {
    title: "I want to build",
    desc: "Go into coding, systems, engineering workflows, and practical build environments.",
    href: "/frontier",
    tag: "Builder",
  },
  {
    title: "I want AI guidance",
    desc: "Use Shynvo Robot to understand the platform, choose a direction, and start faster.",
    href: "/robot",
    tag: "Guide",
  },
];

export default function StartPathSection() {
  return (
    <section className="mt-10 sm:mt-12">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
        Start here
      </div>

      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Choose your path into Shynvo
      </h2>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/72 sm:text-base">
        Pick the route that matches your goal so you can begin with clarity instead of guessing where to go first.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {paths.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group rounded-[1.75rem] border border-white/10 bg-white/5 p-5 transition hover:bg-white/[0.07]"
          >
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/60">
              {item.tag}
            </div>

            <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/72">{item.desc}</p>

            <div className="mt-5 text-sm font-semibold text-white/88 group-hover:text-white">
              Open this path →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
