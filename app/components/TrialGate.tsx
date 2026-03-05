"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TRIAL_MS = 7 * 24 * 60 * 60 * 1000;
const KEY = "shynvo_trial_started_at";

/**
 * v1 deploy: keep only routes we actually ship always-accessible
 * (even if trial ended) so users can still read pricing/docs/contact.
 */
const ALLOW_AFTER_EXPIRE_PREFIXES = ["/", "/docs", "/contact"];

function isAllowedPath(pathname: string) {
  // allow homepage and anything under allowed prefixes
  return ALLOW_AFTER_EXPIRE_PREFIXES.some((p) =>
    p === "/" ? pathname === "/" : pathname === p || pathname.startsWith(p + "/")
  );
}

function formatDays(n: number) {
  if (n === 1) return "1 day";
  return `${n} days`;
}

export default function TrialGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [expired, setExpired] = useState(false);
  const [remainingDays, setRemainingDays] = useState<number | null>(null);

  const allowed = useMemo(() => isAllowedPath(pathname ?? "/"), [pathname]);

  useEffect(() => {
    try {
      const now = Date.now();
      const existing = localStorage.getItem(KEY);

      let startedAt = existing ? Number(existing) : NaN;

      // Start trial on first visit
      if (!existing || Number.isNaN(startedAt) || startedAt <= 0) {
        startedAt = now;
        localStorage.setItem(KEY, String(startedAt));
      }

      const age = now - startedAt;
      const isExpired = age >= TRIAL_MS;

      const remaining = Math.max(0, TRIAL_MS - age);
      const daysLeft = Math.ceil(remaining / (24 * 60 * 60 * 1000));

      setExpired(isExpired);
      setRemainingDays(daysLeft);
      setReady(true);
    } catch {
      // If localStorage is blocked, fail open (don’t break the site)
      setReady(true);
      setExpired(false);
      setRemainingDays(null);
    }
  }, [pathname]);

  // Avoid hydration flash
  if (!ready) return <>{children}</>;

  // Trial expired AND user is not on an allowed page => show paywall overlay
  if (expired && !allowed) {
    return (
      <div className="min-h-screen bg-[#05070A] px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="text-xs tracking-[0.22em] text-white/50">TRIAL ENDED</div>
          <h1 className="text-4xl font-semibold">Your 7-day trial has ended</h1>
          <p className="text-white/70">
            To continue using Shynvo, please upgrade your plan.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* v1: pricing is on homepage section */}
            <Link
              href="/#pricing"
              className="inline-flex justify-center rounded-2xl border border-white/10 bg-white/15 px-5 py-3 text-sm font-medium transition hover:bg-white/20"
            >
              View pricing
            </Link>
            <a
              href="mailto:hi@shynvo.app?subject=Shynvo%20Upgrade%20Request"
              className="inline-flex justify-center rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm transition hover:bg-white/15"
            >
              Contact support
            </a>
          </div>

          <div className="text-xs text-white/45">
            Note: this trial gate is currently device-based. After login is fully connected,
            trial status will be fetched from your account.
          </div>
        </div>
      </div>
    );
  }

  // Trial active => show a small banner on app pages (not homepage/docs/contact)
  return (
    <>
      {!allowed && remainingDays !== null ? (
        <div className="border-b border-white/10 bg-black/30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs text-white/60 sm:px-6 lg:px-8">
            <div>
              Trial: <span className="text-white">{formatDays(remainingDays)}</span> left
            </div>
            <Link href="/#pricing" className="text-white/80 underline hover:text-white">
              Upgrade
            </Link>
          </div>
        </div>
      ) : null}
      {children}
    </>
  );
}