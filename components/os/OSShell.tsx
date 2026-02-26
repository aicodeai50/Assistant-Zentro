import Link from "next/link";

export default function OsShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight">Shynvo</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60">
              OS (2050)
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/os"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              OS Home
            </Link>
            <Link
              href="/demo"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-neutral-200"
            >
              View demo
            </Link>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            Shynvo OS Signal
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-3 max-w-3xl text-white/70">{subtitle}</p>
          ) : null}
        </div>

        {children}

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          This is a fictional UI layer (2050 mode) — the core product works without it.
        </div>
      </main>
    </div>
  );
}