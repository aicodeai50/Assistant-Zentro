"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ContinueSection() {
  const [path, setPath] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("shynvo_last_path");
    if (saved) setPath(saved);
  }, []);

  if (!path) return null;

  return (
    <section className="mt-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="text-sm text-white/60">Continue where you left</div>

        <Link href={path} className="mt-2 block text-white font-semibold">
          Resume your last session →
        </Link>
      </div>
    </section>
  );
}
