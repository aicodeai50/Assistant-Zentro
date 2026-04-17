"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ActivitySnapshot = {
  lastSavedSlug?: string;
  lastSavedName?: string;
  lastRunSlug?: string;
  lastRunStatus?: string;
  lastRunSummary?: string;
  updatedAt?: string;
};

const ACTIVITY_KEY = "shynvo_overview_activity";

export default function RunsDashboard() {
  const [activity, setActivity] = useState<ActivitySnapshot | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(ACTIVITY_KEY);
      setActivity(raw ? JSON.parse(raw) : null);
    } catch {
      setActivity(null);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  const hasRun = !!activity?.lastRunSlug;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-black/20 p-8 text-white">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-white/40">
              Runtime
            </div>
            <h2 className="mt-2 text-3xl font-semibold">Live Runs</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">
              Inspect recent workflow execution state, last output summary, and the current runtime path through the platform.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/builder"
              className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200"
            >
              Run from Builder
            </Link>

            <Link
              href="/platform/apis"
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/80"
            >
              View APIs
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm text-white/45">Latest Run</div>
            <div className="mt-3 text-lg font-medium">
              {!hasLoaded ? "--" : activity?.lastRunSlug || "No runs yet"}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm text-white/45">Status</div>
            <div className="mt-3 text-lg font-medium">
              {!hasLoaded ? "--" : activity?.lastRunStatus || "Idle"}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm text-white/45">Latest Saved API</div>
            <div className="mt-3 text-lg font-medium">
              {!hasLoaded ? "--" : activity?.lastSavedName || "No saved API yet"}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm text-white/45">Updated</div>
            <div className="mt-3 text-sm font-medium text-white/80">
              {!hasLoaded ? "--" : activity?.updatedAt || "No activity yet"}
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-3xl border border-white/10 bg-black/20 p-8 text-white">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-white/40">
                Execution Feed
              </div>
              <h3 className="mt-2 text-2xl font-semibold">Latest Runtime Output</h3>
            </div>

            <Link
              href="/builder"
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/80"
            >
              Open Builder
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {!hasLoaded ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-white/60">
                Loading runtime feed...
              </div>
            ) : !hasRun ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6">
                <div className="text-lg font-medium">No run history yet</div>
                <p className="mt-2 text-sm text-white/55">
                  Run an API from Builder and the latest execution details will appear here.
                </p>
              </div>
            ) : (
              <>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-sm text-white/45">Workflow slug</div>
                  <div className="mt-2 text-xl font-medium text-white">
                    {activity?.lastRunSlug}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-sm text-white/45">Run status</div>
                  <div className="mt-2 text-xl font-medium text-white">
                    {activity?.lastRunStatus || "Completed"}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-sm text-white/45">Execution summary</div>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    {activity?.lastRunSummary || "Run completed."}
                  </p>
                </div>
              </>
            )}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-black/20 p-6 text-white">
            <div className="text-sm font-medium">Runtime Timeline</div>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70">
                Save API
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70">
                Generate slug
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70">
                Execute workflow
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70">
                Return output
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/20 p-6 text-white">
            <div className="text-sm font-medium">Next Step</div>
            <p className="mt-3 text-sm leading-6 text-white/55">
              The next upgrade is to store multiple run entries so this page becomes a true execution history, not just the latest snapshot.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/20 p-6 text-white">
            <div className="text-sm font-medium">Return Path</div>
            <div className="mt-4 space-y-3">
              <Link
                href="/"
                className="block rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm"
              >
                Back to Overview
              </Link>
              <Link
                href="/builder"
                className="block rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm"
              >
                Open Builder
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
