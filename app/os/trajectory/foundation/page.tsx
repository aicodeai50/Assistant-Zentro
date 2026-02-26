import OSShell from "@/components/os/OSShell";
import { BackRow } from "@/components/os/OSCard";

export default function Page() {
  return (
    <OSShell title="Foundation" subtitle="Weeks 1–2">
      <BackRow href="/os/trajectory" />
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
        Build the routine. Define goals. Start daily drills.
      </div>
    </OSShell>
  );
}