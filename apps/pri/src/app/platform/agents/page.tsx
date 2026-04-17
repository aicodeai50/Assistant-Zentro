import PlatformLayout from "@/components/platform/PlatformLayout";
import AgentSystem from "@/components/platform/AgentSystem";
export default function AgentsPage() {
  return (
    <PlatformLayout title="Agents" subtitle="Autonomous AI workers, task executors, and mission controllers.">
      <AgentSystem />
    </PlatformLayout>
  );
}
