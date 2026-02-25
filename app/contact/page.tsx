"use client";

import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />
      <main className="mx-auto max-w-4xl px-6 py-14">
        <h1 className="text-3xl font-bold">Contact</h1>
        <p className="mt-3 text-neutral-300">
          For support or business inquiries:
        </p>
        <p className="mt-4 text-neutral-200">
          Email:{" "}
          <a className="underline" href="mailto:sandraherbert50.sh@gmail.com">
            sandraherbert50.sh@gmail.com
          </a>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}