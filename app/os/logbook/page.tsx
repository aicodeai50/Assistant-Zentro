import OSShell from "@/components/os/OSShell";
import OSLogbookPanel from "@/components/os/logbook/OSLogbookPanel";

export default function OSLogbookPage() {
  return (
    <OSShell
      title="Logbook"
      subtitle="Local event timeline (assistant, robot, system, user). Backend later."
      chips={["Logbook", "Local"]}
      zone="home"
    >
      <OSLogbookPanel />
    </OSShell>
  );
}