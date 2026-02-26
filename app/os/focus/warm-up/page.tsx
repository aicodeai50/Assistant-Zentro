cat > app/os/focus/warm-up/page.tsx <<'EOF'
import OSShell from "@/components/os/OSShell";
import { BackRow } from "@/components/os/OSCard";

export default function WarmUpPage() {
  return (
    <OSShell title="Warm-up" subtitle="3 minutes • wake recall, get momentum">
      <BackRow href="/os/focus" />

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
        <h2 className="text-xl font-bold text-white">Warm-up protocol</h2>
        <p className="mt-2">
          Do 10 quick prompts. Keep it light—goal is to switch your brain on.
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>5 flashcards (fast recall)</li>
          <li>3 “explain like I’m 12” prompts</li>
          <li>2 mini questions (timed)</li>
        </ul>

        <div className="mt-6 text-sm text-white/50">
          Tip: If you feel resistance, cut the set in half—just start.
        </div>
      </div>
    </OSShell>
  );
}
EOF
