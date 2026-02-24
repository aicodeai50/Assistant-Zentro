export default function SiteNav() {
  return (
    <header className="border-b border-neutral-900 bg-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2 text-white">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            S
          </span>
          <span className="font-semibold tracking-tight">Shynvo</span>
        </a>

        <nav className="flex items-center gap-3 text-sm">
          <a className="rounded-lg px-3 py-2 text-neutral-300 hover:text-white" href="/demo">
            Demo
          </a>
          <a className="rounded-lg px-3 py-2 text-neutral-300 hover:text-white" href="/robot">
            Robot
          </a>
          <a className="rounded-lg px-3 py-2 text-neutral-300 hover:text-white" href="/pricing">
            Pricing
          </a>
          <a className="rounded-lg px-3 py-2 text-neutral-300 hover:text-white" href="/docs">
            Docs
          </a>
          <a
            className="rounded-xl border border-white/10 bg-white px-4 py-2 font-semibold text-black hover:bg-neutral-200"
            href="/login"
          >
            Log in
          </a>
        </nav>
      </div>
    </header>
  );
}