import OSShell from "@/components/os/OSShell";
import { BackRow } from "@/components/os/OSCard";

export default function Page() {
  return (
    <OSShell title="Lock-in" subtitle="9 minutes to retain + plan next.">
      <BackRow href="/os/focus" />
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
        Summarize what you learned in 5 bullet points, then create 1 follow-up question.
      </div>
    </OSShell>
  );
}