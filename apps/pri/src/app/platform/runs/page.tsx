import PlatformLayout from "@/components/platform/PlatformLayout";
import RunsDashboard from "@/components/platform/RunsDashboard";

export default function PlatformRunsPage() {
  return (
    <PlatformLayout
      title="Runs"
      subtitle="Execution history, runtime events, and failures."
    >
      <RunsDashboard />
    </PlatformLayout>
  );
}
