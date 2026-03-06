import Link from "next/link";
export default function Page() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/os/missions" className="text-sm text-white/70 hover:text-white">← Back to Missions</Link>
      <h1 className="mt-4 text-3xl font-semibold">Create Mission</h1>
      <p className="mt-3 text-white/70">Turn a goal into a structured mission.</p>
      <textarea
        className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
        rows={6}
        placeholder="Example: Pass my machine learning exam in 3 weeks"
      />
    </section>
  );
}
