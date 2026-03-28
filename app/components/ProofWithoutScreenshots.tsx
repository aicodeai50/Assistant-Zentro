const proofItems = [
  {
    title: "Clear starting direction",
    desc: "Users do not have to guess where to begin. Shynvo gives structured entry points for learning, building, and guided AI support.",
  },
  {
    title: "Focused environments",
    desc: "Each area is designed for a real purpose: University for learning, Frontier for building, Robot for guidance, and more.",
  },
  {
    title: "Less confusion, more progress",
    desc: "Instead of scattered tools and random prompts, users move through organized paths with clearer next steps.",
  },
];

export default function ProofWithoutScreenshots() {
  return (
    <section className="mt-10 sm:mt-12">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
        Why it works
      </div>

      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Real value without the chaos
      </h2>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/72 sm:text-base">
        Shynvo is designed to help people learn, build, and move forward with more clarity, structure, and guided direction.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {proofItems.map((item) => (
          <div
            key={item.title}
            className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-[2px]"
          >
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/72">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
        <div className="text-sm font-semibold text-white">What makes Shynvo different</div>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/72">
          Shynvo is not built as one more AI chat page. It is built as a structured platform with guided environments, clearer workflows, and paths that help users keep moving.
        </p>
      </div>
    </section>
  );
}
