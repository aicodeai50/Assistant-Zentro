"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CognitiveSnapshot = {
  focusState: string;
  recovery: string;
  friction: string;
  summary: string;
  recommendation: string;
  intensity: string;
  note: string;
};

const STORAGE_KEY = "shynvo_os_cognitive_snapshot";

function getRecoveryMeaning(value: string) {
  switch (value) {
    case "Strong":
      return "Strong means restoration is supportive of meaningful work. Recovery is not the main limiting factor right now.";
    case "Moderate":
      return "Moderate means recovery is usable but not full. Work should remain structured so strain does not build too quickly.";
    case "Low":
      return "Low means recovery is reduced. Energy reserves appear strained, so heavy work may worsen instability or depletion.";
    default:
      return "No recovery explanation is available yet.";
  }
}

export default function Page() {
  const [snapshot, setSnapshot] = useState<CognitiveSnapshot | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSnapshot(JSON.parse(raw) as CognitiveSnapshot);
    } catch {
      // ignore storage issues
    }
  }, []);

  return (
    <section className="py-10 sm:py-14">
      <Link href="/os/cognitive" className="text-sm text-white/70 hover:text-white">
        ← Back to Cognitive
      </Link>

      <h1 className="mt-4 text-3xl font-semibold">Recovery Level</h1>
      <p className="mt-3 max-w-3xl text-white/70">
        Recovery Level reflects how restored or depleted the user currently appears before work intensity is increased.
      </p>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm text-white/60">Current Recovery Level</div>
        <div className="mt-3 text-4xl font-semibold text-white">
          {snapshot?.recovery || "No reading yet"}
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/75">
          {snapshot
            ? getRecoveryMeaning(snapshot.recovery)
            : "Run a mental check in Cognitive to generate a real recovery reading."}
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/75">
          {snapshot
            ? `From the latest mental check, your recovery level is ${snapshot.recovery}. ${snapshot.recommendation}`
            : "No detailed recovery interpretation is available yet."}
        </div>
      </div>
    </section>
  );
}
