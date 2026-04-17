import PlatformLayout from "@/components/platform/PlatformLayout";
import BrainChat from "@/components/platform/BrainChat";

export default function BrainPage() {
  return (
    <PlatformLayout
      title="Brain"
      subtitle="Talk to your robot in plain language. The AI interprets and executes."
    >
      <BrainChat />
    </PlatformLayout>
  );
}
