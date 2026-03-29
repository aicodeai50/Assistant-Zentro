import Link from "next/link";

type PlatformShowcaseShellProps = {
  title: string;
  desc: string;
  href: string;
  badge: string;
  footerLabel?: string;
  children: React.ReactNode;
};

export default function PlatformShowcaseShell({
  title,
  desc,
  href,
  badge,
  footerLabel = "Live",
  children,
}: PlatformShowcaseShellProps) {
  return (
    <div className="rounded-[2rem] border border-[#22324a] bg-[#07101c]/90 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md sm:p-5">
      <div className="rounded-[1.6rem] border border-white/10 bg-[#08111d]/95 p-3 sm:p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-white/10" />
            <span className="h-3 w-3 rounded-full bg-white/10" />
            <span className="h-3 w-3 rounded-full bg-white/10" />
          </div>

          <div className="flex-1 px-2">
            <div className="mx-auto max-w-[18rem] rounded-[1rem] border border-[#22324a] bg-[#06101b] px-4 py-2 text-center text-sm font-medium text-white/92 sm:max-w-[22rem] sm:text-base">
              {title}
            </div>
          </div>

          <Link
            href={href}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/35 transition hover:text-white/80"
            aria-label={`Open ${title}`}
          >
            ↗
          </Link>
        </div>

        <div className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/30">
          {children}
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <div className="text-base font-semibold text-white">{title}</div>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/68">{desc}</p>
          </div>

          <div className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
            {badge}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Link
            href={href}
            className="inline-flex items-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/88 transition hover:bg-white/[0.08] hover:text-white"
          >
            Open preview path
          </Link>

          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
            {footerLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
