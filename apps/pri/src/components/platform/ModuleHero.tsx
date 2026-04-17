import Link from "next/link";

type Action = {
  label: string;
  href: string;
};

type Props = {
  kicker: string;
  title: string;
  description: string;
  primaryAction: Action;
  secondaryAction?: Action;
  cards: Array<{
    title: string;
    text: string;
  }>;
  nextStep: string;
};

export default function ModuleHero({
  kicker,
  title,
  description,
  primaryAction,
  secondaryAction,
  cards,
  nextStep,
}: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
      <section className="rounded-3xl border border-white/10 bg-black/20 p-8 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-white/40">
              {kicker}
            </div>
            <h2 className="mt-2 text-2xl font-semibold">{title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={primaryAction.href}
              className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200"
            >
              {primaryAction.label}
            </Link>

            {secondaryAction ? (
              <Link
                href={secondaryAction.href}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/80"
              >
                {secondaryAction.label}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="text-sm font-medium">{card.title}</div>
              <p className="mt-2 text-sm leading-6 text-white/55">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <aside className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-black/20 p-6 text-white">
          <div className="text-sm font-medium">Next Step</div>
          <p className="mt-3 text-sm leading-6 text-white/55">{nextStep}</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/20 p-6 text-white">
          <div className="text-sm font-medium">Return Path</div>
          <div className="mt-4 space-y-3">
            <Link
              href="/"
              className="block rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm"
            >
              Back to Overview
            </Link>
            <Link
              href="/builder"
              className="block rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm"
            >
              Open Builder
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
