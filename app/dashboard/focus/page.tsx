import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function FocusPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      <main className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Focus Window</h1>
          <Link href="/os" className="text-sm text-white/70 underline hover:text-white">
            ← Back to OS
          </Link>
        </div>

        <p className="mt-4 max-w-2xl text-white/70">
          Visualizes deep-focus sessions, optimal timing, and distraction load.
          Placeholder for future focus intelligence.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card title="Active Focus Window">Building…</Card>
          <Card title="Distraction Level">Building…</Card>
          <Card title="Next Deep Session">Building…</Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black p-6">
      <div className="font-semibold">{title}</div>
      <div className="mt-2 text-sm text-white/60">{children}</div>
    </div>
  );
}