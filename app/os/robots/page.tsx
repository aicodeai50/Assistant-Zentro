import OSShell from "@/components/os/OSShell";
import RobotsHangar from "@/components/robots/RobotsHangar";

export default function OSRobotsPage() {
  return (
    <OSShell title="Robots" subtitle="Hangar (frontend-only)." chips={["Robots"]} zone="home">
      <RobotsHangar />
    </OSShell>
  );
}