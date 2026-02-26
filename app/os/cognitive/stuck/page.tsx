import OSShell from "@/components/os/OSShell";
import { BackRow } from "@/components/os/OSCard";

export default function Page() {
  return (
    <OSShell title="Stuck Mode" subtitle="Bridge topics keep you moving.">
      <BackRow href="/os/cognitive" />
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
        Rule: suggest a “bridge topic” — smaller step toward the same outcome.
      </div>
    </OSShell>
  );
}