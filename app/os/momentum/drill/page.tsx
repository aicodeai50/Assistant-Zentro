import OSShell from "@/components/os/OSShell";
import { BackRow } from "@/components/os/OSCard";

export default function Page() {
  return (
    <OSShell title="10-min Drill" subtitle="Rapid recall to build momentum.">
      <BackRow href="/os/momentum" />
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-white/70">
          Drill template:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-white/70">
          <li>Pick 15 flashcards (or generate from a topic).</li>
          <li>Answer fast. Mark misses.</li>
          <li>Repeat misses twice.</li>
        </ul>
      </div>
    </OSShell>
  );
}