import OSShell from "@/components/os/OSShell";
import { BackRow } from "@/components/os/OSCard";

export default function Page() {
  return (
    <OSShell title="Work Block" subtitle="30 minutes. One target.">
      <BackRow href="/os/focus" />
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
        Choose ONE:
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Quiz drill</li>
          <li>Flashcard drill</li>
          <li>Interview simulation</li>
        </ul>
      </div>
    </OSShell>
  );
}