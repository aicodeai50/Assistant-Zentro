import OSShell from "@/components/os/OSShell";
import { BackRow } from "@/components/os/OSCard";

export default function Page() {
  return (
    <OSShell title="Deep Work" subtitle="45 minutes. No distractions. One outcome.">
      <BackRow href="/os/focus" />

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
        <h2 className="text-lg font-semibold text-white">Deep Work Session</h2>
        <p className="mt-2 text-white/70">
          Pick one task and commit. Timer + focus shield coming next.
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>One task only</li>
          <li>Phone away</li>
          <li>Ship something small</li>
        </ul>
      </div>
    </OSShell>
  );
}