import Link from "next/link";

export default function ExploreWorldsCard() {
  return (
    <section className="mt-12 sm:mt-16">
      <div className="rounded-[2rem] border border-[#22324a] bg-[#07101c]/90 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md sm:p-5">
        <div className="rounded-[1.6rem] border border-white/10 bg-[#08111d]/95 p-4 sm:p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-white/10" />
              <span className="h-3 w-3 rounded-full bg-white/10" />
              <span className="h-3 w-3 rounded-full bg-white/10" />
            </div>

            <div className="flex-1 px-2">
              <div className="mx-auto max-w-[18rem] rounded-[1rem] border border-[#22324a] bg-[#06101b] px-4 py-2 text-center text-base font-medium text-white/92 sm:max-w-[22rem] sm:text-xl">
                Explore Shynvo Worlds
              </div>
            </div>

            <Link
              href="/worlds"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/35 transition hover:text-white/80"
              aria-label="Open all environments"
            >
              ↗
            </Link>
          </div>

          <div className="rounded-[1.4rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_40%),linear-gradient(180deg,rgba(5,11,19,0.96),rgba(4,9,16,0.92))] p-6 sm:p-8">
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

            <div className="mt-6 flex flex-wrap gap-2">
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

            <div className="mt-7 flex items-center justify-between gap-4">
              <Link
                href="/worlds"
                className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/88 transition hover:bg-white/10 hover:text-white"
              >
                Open all environments →
              </Link>

              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
                Live
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
