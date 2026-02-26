import OSShell from "@/components/os/OSShell";
import { BackRow } from "@/components/os/OSCard";

export default function Page() {
  return (
    <OSShell title="Warm-up" subtitle="3 minutes to wake recall.">
      <BackRow href="/os/focus" />
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
        Do 10 fast flashcards. Don’t overthink. Momentum first.
      </div>
    </OSShell>
  );
}