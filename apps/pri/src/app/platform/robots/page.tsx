import PlatformLayout from "@/components/platform/PlatformLayout";
import RobotFleet from "@/components/platform/RobotFleet";

export default function RobotsPage() {
  return (
    <PlatformLayout
      title="Robot Fleet"
      subtitle="Monitor, control and deploy your robot units in real time."
    >
      <RobotFleet />
    </PlatformLayout>
  );
}
