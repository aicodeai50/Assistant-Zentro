import type { ReactNode } from "react";

type PageShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function PageShell({
  eyebrow,
  title,
  description,
  actions,
  children,
}: PageShellProps) {
  return (
    <main className="relative min-h-screen px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_520px_at_15%_0%,rgba(56,189,248,0.10),transparent_55%),radial-gradient(900px_520px_at_85%_10%,rgba(16,185,129,0.08),transparent_55%),linear-gradient(180deg,#050810_0%,#0a1220_100%)]" />

      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {eyebrow ? (
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-200/70">
                {eyebrow}
              </div>
            ) : null}
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
            {description ? (
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
                {description}
              </p>
            ) : null}
          </div>
          {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
        </header>

        {children}
      </div>
    </main>
  );
}
