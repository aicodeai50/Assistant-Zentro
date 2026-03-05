"use client";

import Link from "next/link";
import { useMemo } from "react";
import { getUniverse } from "@/components/universe/universe.theme";

export default function UniversePage({ params }: { params: { slug: string } }) {
  const u = useMemo(() => getUniverse(params.slug), [params.slug]);

  if (!u) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
            <div className="text-xl font-semibold">Universe not found</div>
            <div className="mt-2 text-white/60">
              Unknown portal: <span className="font-mono">{params.slug}</span>
            </div>
            <Link
              href="/portal"
              className="mt-5 inline-block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 hover:bg-white/10"
            >
              Back to Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Universe background */}
      <div className="pointer-events-none fixed inset-0 opacity-90">
        <div className="absolute inset-0" style={{ background: u.bg }} />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_30%,rgba(255,255,255,0.03))]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-lg"
              style={{ boxShadow: `0 0 35px ${u.accent}33` }}
            >
              {u.icon}
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-white/60">Universe</div>
              <div className="text-lg font-semibold text-white/95">{u.title}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/portal"
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75 hover:bg-white/10"
            >
              Back to Portal
            </Link>
            <Link
              href="/os"
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75 hover:bg-white/10"
            >
              Enter OS
            </Link>
          </div>
        </div>

        <div
          className="mt-8 rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl"
          style={{ boxShadow: u.glow }}
        >
          <div className="text-2xl font-semibold text-white/95">{u.title}</div>
          <div className="mt-2 text-sm text-white/65">{u.desc}</div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href={u.href}
              className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm text-white/90 hover:bg-white/15"
              style={{ borderColor: `${u.accent}33` }}
            >
              {u.cta} →
            </Link>

            <Link
              href="/assistant"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/80 hover:bg-white/10"
            >
              Open Assistant
            </Link>

            <Link
              href="/portal/docs"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/80 hover:bg-white/10"
            >
              Read Docs
            </Link>
          </div>

          <div className="mt-5 text-xs text-white/50">
            This is a cinematic “universe shell”. Next: each universe gets its own unique module UI.
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-white/40">
          Shynvo — universes are portals into different products.
        </div>
      </div>
    </div>
  );
}