import OSShell from "@/components/os/OSShell";
import { BackRow } from "@/components/os/OSCard";

export default function Page() {
  return (
    <OSShell title="Hard Prompt" subtitle="One tough question. One honest score.">
      <BackRow href="/os/momentum" />
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm text-white/60">Example prompt</div>
        <div className="mt-3 rounded-2xl border border-white/10 bg-black p-4 text-white/80">
          Explain a concept you’re learning as if teaching a new teammate. Include a real example.
        </div>
        <div className="mt-4 text-sm text-white/60">
          Scoring (demo):
        </div>
        <ul className="mt-2 list-disc pl-5 text-white/70">
          <li>Clarity</li>
          <li>Correctness</li>
          <li>Example quality</li>
        </ul>
      </div>
    </OSShell>
  );
}