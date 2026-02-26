import OSShell from "@/components/os/OSShell";
import { BackRow } from "@/components/os/OSCard";

export default function Page() {
  return (
    <OSShell title="Outcome" subtitle="Weeks 9–12">
      <BackRow href="/os/trajectory" />
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
        Mock interviews + measurable readiness score. Prepare for real applications.
      </div>
    </OSShell>
  );
}