import OSShell from "@/components/os/OSShell";
import TimelineBoard from "@/components/timeline/TimelineBoard";

export default function OSTimelinePage() {
  return (
    <OSShell title="Timeline" subtitle="Scheduling layer (local). Backend later." chips={["Timeline"]} zone="home">
      <TimelineBoard />
    </OSShell>
  );
}