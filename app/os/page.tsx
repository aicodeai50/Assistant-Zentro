import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const tiles = [
  {
    title: "Cognitive Load",
    value: "Balanced",
    subtitle: "Mental bandwidth & fatigue signals",
    href: "/os/cognitive",
    badge: "Live preview",
  },
  {
    title: "Skill Momentum",
    value: "Rising",
    subtitle: "Streaks, velocity, skill acceleration",
    href: "/os/momentum",
    badge: "Live preview",
  },
  {
    title: "Focus Window",
    value: "42 min remaining",
    subtitle: "Deep work window + distraction shield",
    href: "/os/focus",
    badge: "Live preview",
  },
  {
    title: "Trajectory",
    value: "Builder → Founder",
    subtitle: "Your next 90 days mapped as missions",
    href: "/os/trajectory",
    badge: "Live preview",
  },
];

export default function ShynvoOSPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <SiteNav />

      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-180px] left-[-140px] h-[520px] w-[520px] rounded-full bg-white/5 blur-[120px] animate-pulse" />
        <div className="absolute right-[-180px] top-1/3 h-[520px] w-[520px] rounded-full bg-white/5 blur-[120px] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.85))]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-6 py-14">
        {/* Header */}
        <section>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Shynvo OS — 2050 interface
          </div>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Your learning system,
            <span className="text-white/70"> visualized like a cockpit.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-white/70">
            A futuristic layer that converts learning, interviews, and upskilling
            into real-time signals.
          </p>

          <div className="mt-6 flex gap-3">
            <Link
              href="/demo"
              className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-neutral-200"
            >
              Open demo
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
            >
              Upgrade anytime →
            </Link>
          </div>
        </section>

        {/* Tiles */}
        <section className="mt-12 grid gap-4 md:grid-cols-2">
          {tiles.map((t) => (
            <Link
              key={t.title}
              href={t.href}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 p-6 transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="flex justify-between text-sm font-semibold text-white/80">
                {t.title}
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60">
                  {t.badge}
                </span>
              </div>

              <div className="mt-5 text-2xl font-bold">{t.value}</div>
              <div className="mt-2 text-sm text-white/60">{t.subtitle}</div>

              <div className="mt-6 text-sm font-semibold text-white/70 group-hover:text-white">
                Enter →
              </div>
            </Link>
          ))}
        </section>

        <div className="mt-10">
          <Link
            href="/"
            className="text-sm text-white/70 underline hover:text-white"
          >
            ← Back to homepage
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}