import OSShell from "@/components/os/OSShell";
import { BackRow } from "@/components/os/OSCard";

export default function Page() {
  return (
    <OSShell title="Reflection" subtitle="Turn friction into tomorrow’s drill.">
      <BackRow href="/os/momentum" />
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-white/70">
          Write 1–2 lines:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-white/70">
          <li>What felt slow?</li>
          <li>What should be drilled tomorrow?</li>
          <li>One next step (tiny).</li>
        </ul>
      </div>
    </OSShell>
  );
}