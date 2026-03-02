"use client";

import Link from "next/link";

export default function StudyLabPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold">Study Lab</h1>
          <Link href="/university" className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15">Back to Hub →</Link>
        </div>
        <div className="mt-6 rounded-3xl border border-white/15 bg-white/5 p-6">
          <p className="text-white/70">This page is now a valid module. Next we paste the full Study Lab UI.</p>
        </div>
      </div>
    </div>
  );
}
