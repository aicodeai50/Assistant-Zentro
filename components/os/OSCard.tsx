import Link from "next/link";

export default function OsCardLink({
  title,
  subtitle,
  href,
  badge,
}: {
  title: string;
  subtitle: string;
  href: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-3xl border border-white/10 bg-black/40 p-6 transition hover:border-white/20 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-semibold text-white">{title}</div>
          <div className="mt-2 text-sm text-white/60">{subtitle}</div>
        </div>

        {badge ? (
          <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/70">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="mt-5 text-sm font-semibold text-white/70 group-hover:text-white">
        Open →
      </div>
    </Link>
  );
}