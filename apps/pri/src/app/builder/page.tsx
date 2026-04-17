import { Suspense } from "react";
import BuilderShell from "@/components/builder/BuilderShell";
import PlatformLayout from "@/components/platform/PlatformLayout";

export default function BuilderPage() {
  return (
    <PlatformLayout
      title="Programmable Robotics Builder"
      subtitle="Create reusable robot workflow APIs, test them, and monitor execution results."
    >
      <Suspense
        fallback={
          <div className="rounded-3xl border border-white/10 bg-black/20 p-8 text-white">
            Loading builder...
          </div>
        }
      >
        <BuilderShell />
      </Suspense>
    </PlatformLayout>
  );
}
