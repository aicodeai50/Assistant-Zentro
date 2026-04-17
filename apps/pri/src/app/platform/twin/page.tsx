import PlatformLayout from "@/components/platform/PlatformLayout";
import TwinSimulation from "@/components/platform/TwinSimulation";

export default function TwinPage() {
  return (
    <PlatformLayout
      title="Digital Twin"
      subtitle="Simulate your robot environment before deploying to the real world."
    >
      <TwinSimulation />
    </PlatformLayout>
  );
}
