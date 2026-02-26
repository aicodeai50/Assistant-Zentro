import Link from "next/link";

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight text-white">
            Shynvo
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60">
            Beta
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link className="text-sm text-white/70 hover:text-white" href="/demo">
            Demo
          </Link>
          <Link className="text-sm text-white/70 hover:text-white" href="/pricing">
            Pricing
          </Link>
          <Link className="text-sm text-white/70 hover:text-white" href="/robot">
            Robot
          </Link>
          <Link className="text-sm text-white/70 hover:text-white" href="/docs">
            Docs
          </Link>
          <Link className="text-sm text-white/70 hover:text-white" href="/contact">
            Contact
          </Link>
          <Link className="text-sm text-white/70 hover:text-white" href="/os">
            OS
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/demo"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            View demo
          </Link>
          <Link
            href="/pricing"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-neutral-200"
          >
            Upgrade
          </Link>
        </div>
      </div>
    </header>
  );
}