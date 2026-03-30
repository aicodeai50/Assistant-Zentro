"use client";

import Link from "next/link";

export default function PremiumButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  if (variant === "secondary") {
    return (
      <Link
        href={href}
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
      >
        <span className="relative z-10">{children}</span>
        <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-0 transition group-hover:opacity-100" />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold text-white"
    >
      <span className="absolute inset-0 bg-[linear-gradient(180deg,#5f74ff_0%,#485ce7_100%)]" />
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25),transparent_60%)] opacity-0 transition group-hover:opacity-100" />
      <span className="relative z-10">{children}</span>
    </Link>
  );
}