import OSShell from "@/components/os/OSShell";
import MissionsBoard from "@/components/missions/MissionsBoard";

export default function OSMissionsPage() {
  return (
    <OSShell title="Missions" subtitle="Mission control (local). Backend later." chips={["Missions"]} zone="missions">
      <MissionsBoard />
    </OSShell>
  );
}