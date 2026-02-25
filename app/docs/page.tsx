"use client";

import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />
      <main className="mx-auto max-w-4xl px-6 py-14">
        <h1 className="text-3xl font-bold">Docs</h1>
        <p className="mt-3 text-neutral-300">
          Documentation is being prepared. For now, use the Demo and Robot pages to explore the experience.
        </p>
        <ul className="mt-6 list-disc pl-5 text-neutral-400 space-y-2">
          <li><a className="underline" href="/demo">Demo</a></li>
          <li><a className="underline" href="/robot">Robot assistant</a></li>
          <li><a className="underline" href="/pricing">Pricing</a></li>
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}