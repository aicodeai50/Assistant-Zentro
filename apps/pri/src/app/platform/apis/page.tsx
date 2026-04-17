import PlatformLayout from "@/components/platform/PlatformLayout";
import ApisDashboard from "@/components/platform/ApisDashboard";

export default function PlatformApisPage() {
  return (
    <PlatformLayout
      title="APIs"
      subtitle="Registry of saved programmable robot endpoints."
    >
      <ApisDashboard />
    </PlatformLayout>
  );
}
