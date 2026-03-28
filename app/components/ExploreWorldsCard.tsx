import Link from "next/link";

export default function ExploreWorldsCard() {
  return (
    <section className="mt-10 sm:mt-12">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-[2px]">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
          Explore
        </div>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Explore Shynvo Worlds
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/72 sm:text-base">
          Enter the environments and choose the path that fits your goal for learning,
          building, practice, and guided AI support.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            Learn
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            Build
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            Explore
          </span>
        </div>

        <div className="mt-6">
          <Link
            href="/worlds"
            className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/88 transition hover:bg-white/10 hover:text-white"
          >
            Open all environments →
          </Link>
        </div>
      </div>
    </section>
  );
}
