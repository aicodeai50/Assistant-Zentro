import Link from "next/link";
import PlatformLayout from "@/components/platform/PlatformLayout";

export default function PlatformSettingsPage() {
  return (
    <PlatformLayout
      title="Settings"
      subtitle="Project, workspace, and runtime configuration."
    >
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <section className="rounded-3xl border border-white/10 bg-black/20 p-8 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-white/40">
                Workspace
              </div>
              <h2 className="mt-2 text-2xl font-semibold">Project Settings</h2>
              <p className="mt-2 max-w-2xl text-sm text-white/55">
                Configure workspace behavior, API access, runtime settings, and future platform controls.
              </p>
            </div>

            <Link
              href="/builder"
              className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200"
            >
              Back to Builder
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-sm font-medium">Workspace</div>
              <p className="mt-2 text-sm text-white/55">
                Project name, environment, and visibility controls will live here.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-sm font-medium">Developer Access</div>
              <p className="mt-2 text-sm text-white/55">
                API keys, permissions, and future team access controls will live here.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6">
            <div className="text-lg font-medium">Settings modules coming next</div>
            <p className="mt-2 text-sm text-white/55">
              This page should become the configuration center for the whole Shynvo platform.
            </p>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-black/20 p-6 text-white">
            <div className="text-sm font-medium">Quick Actions</div>
            <div className="mt-4 space-y-3">
              <Link href="/builder" className="block rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm">
                Open builder
              </Link>
              <Link href="/platform/apis" className="block rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm">
                Go to APIs
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/20 p-6 text-white">
            <div className="text-sm font-medium">Next Step</div>
            <p className="mt-3 text-sm text-white/55">
              Add project settings, key management, and runtime controls here.
            </p>
          </div>
        </aside>
      </div>
    </PlatformLayout>
  );
}
