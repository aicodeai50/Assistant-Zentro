import OSShell from "@/components/os/OSShell";
import { BackRow } from "@/components/os/OSCard";

export default function Page() {
  return (
    <OSShell title="Recovery Day" subtitle="Protect the streak without burning out.">
      <BackRow href="/os/cognitive" />
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
        Rule: short drills only (10–15 min). No heavy work blocks.
      </div>
    </OSShell>
  );
}