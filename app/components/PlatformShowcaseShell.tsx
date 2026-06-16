import type { ReactNode } from "react";

type PlatformShowcaseShellProps = {
  hero: ReactNode;
  cards: ReactNode;
  lower: ReactNode;
};

export default function PlatformShowcaseShell({
  hero,
  cards,
  lower,
}: PlatformShowcaseShellProps) {
  return (
    <section className="mt-16 sm:mt-20 lg:mt-24">
      <div className="relative overflow-hidden rounded-[2.2rem] border border-[#23324a] bg-[#050b16]/95 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_120px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(36,92,255,0.16),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.14),transparent_22%),radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.08),transparent_22%)]" />
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(120,160,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(120,160,255,0.16)_1px,transparent_1px)] [background-size:38px_38px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,10,18,0.20),rgba(6,10,18,0.78))]" />

        <div className="relative z-10 p-4 sm:p-6 lg:p-8">
          <div className="rounded-[1.9rem] border border-[#31415d] bg-[#040912]/78 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#1a2436]" />
                <span className="h-3 w-3 rounded-full bg-[#1a2436]" />
                <span className="h-3 w-3 rounded-full bg-[#1a2436]" />
              </div>
              <div className="flex-1 rounded-[1rem] border border-[#1f2b3f] bg-[#02070f] px-4 py-3 text-center text-lg text-white/88 sm:text-2xl">
                assistant.zentro.run/
              </div>
              <div className="hidden h-11 w-11 items-center justify-center rounded-[1rem] border border-[#1f2b3f] bg-[#02070f] text-white/30 sm:flex">
                ↗
              </div>
            </div>

            <div className="mt-5 rounded-[1.4rem] border border-[#1e2b40] bg-[#030812]/80 p-4 sm:p-6 lg:p-8">
              {hero}

              <div className="mt-10">
                <div className="text-xl font-semibold text-white sm:text-2xl">
                  What Shynvo Is
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {cards}
                </div>
              </div>

              <div className="mt-12">
                {lower}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
