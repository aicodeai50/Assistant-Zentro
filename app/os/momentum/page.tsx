import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const actions = [
  { title: "10-min Drill", desc: "Rapid flashcards + recall loop.", href: "/os/momentum/drill" },
  { title: "Hard Prompt", desc: "One interview-style question with scoring.", href: "/os/momentum/hard-prompt" },
  { title: "Reflection", desc: "Note what felt slow → becomes tomorrow’s drill.", href: "/os/momentum/reflection" },
];

export default function MomentumPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <Link href="/os" className="text-sm text-white/70 underline hover:text-white">
          ← Back to OS
        </Link>

        <h1 className="mt-4 text-4xl font-bold">Skill Momentum</h1>
        <p className="mt-2 text-white/70">
          Momentum is your learning “engine”. It combines streaks, repetition, and challenge into one signal.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Stat label="Streak" value="11 days" sub="Consistency engine" />
          <Stat label="Velocity" value="7.4/wk" sub="Practice frequency" />
          <Stat label="Trend" value="Rising" sub="Current direction" />
        </div>

        <h2 className="mt-10 text-2xl font-bold">Recommended mission (today)</h2>
        <p className="mt-2 text-white/70">
          Do a 10-minute drill + one “hard prompt” to push your curve upward.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {actions.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="rounded-3xl border border-white/10 bg-neutral-950 p-6 hover:bg-white/5"
            >
              <div className="font-semibold">{a.title}</div>
              <div className="mt-2 text-sm text-white/60">{a.desc}</div>
              <div className="mt-4 text-sm font-semibold text-white/70">Open →</div>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-neutral-950 p-6">
      <div className="text-sm text-white/60">{label}</div>
      <div className="mt-2 text-3xl font-bold">{value}</div>
      <div className="mt-2 text-sm text-white/60">{sub}</div>
    </div>
  );
}