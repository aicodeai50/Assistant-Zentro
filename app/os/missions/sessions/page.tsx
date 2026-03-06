import Link from "next/link";
export default function Page() {
  return <section className="py-10 sm:py-14"><Link href="/os/missions" className="text-sm text-white/70 hover:text-white">← Back to Missions</Link><h1 className="mt-4 text-3xl font-semibold">Mission Sessions</h1><p className="mt-3 text-white/70">This page connects missions to focus sessions.</p></section>;
}
