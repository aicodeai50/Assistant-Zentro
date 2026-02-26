cat > app/os/focus/lock-in/page.tsx <<'EOF'
import OSShell from "@/components/os/OSShell";
import { BackRow } from "@/components/os/OSCard";

export default function LockInPage() {
  return (
    <OSShell title="Lock-in" subtitle="9 minutes • summarize + one follow-up">
      <BackRow href="/os/focus" />

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
        <h2 className="text-xl font-bold text-white">Lock-in protocol</h2>
        <p className="mt-2">
          Convert your session into memory: summarize, then generate one follow-up question.
        </p>

        <ol className="mt-4 list-decimal space-y-2 pl-5">
          <li>Write a 3-bullet summary of what you just did.</li>
          <li>Write 1 mistake / confusion (if any).</li>
          <li>Create 1 follow-up question for tomorrow.</li>
        </ol>

        <div className="mt-6 text-sm text-white/50">
          Output &gt; perfection. Keep it short.
        </div>
      </div>
    </OSShell>
  );
}
EOF