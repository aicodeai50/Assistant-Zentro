import Link from "next/link";
import React from "react";

export function OSCard({
  title,
  value,
  hint,
}: {
  title: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="text-sm text-white/60">{title}</div>
      <div className="mt-2 text-3xl font-bold">{value}</div>
      {hint ? <div className="mt-2 text-sm text-white/50">{hint}</div> : null}
    </div>
  );
}

export function BoxLink({
  href,
  title,
  desc,
  tag,
}: {
  href: string;
  title: string;
  desc: string;
  tag?: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-3xl border border-white/10 bg-black/40 p-5 transition hover:border-white/20 hover:bg-white/5"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="font-semibold">{title}</div>
        {tag ? (
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60">
            {tag}
          </span>
        ) : null}
      </div>
      <div className="mt-2 text-sm text-white/60">{desc}</div>
      <div className="mt-4 text-xs text-white/40">Open →</div>
    </Link>
  );
}

export function BackRow({ href = "/os" }: { href?: string }) {
  return (
    <Link href={href} className="text-sm text-white/70 hover:text-white">
      ← Back
    </Link>
  );
}