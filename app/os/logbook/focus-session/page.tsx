import Link from "next/link";
export default function Page() {
  return <section className="py-10 sm:py-14"><Link href="/os/logbook" className="text-sm text-white/70 hover:text-white">← Back to Logbook</Link><h1 className="mt-4 text-3xl font-semibold">Focus Session Entry</h1><p className="mt-3 text-white/70">Detailed focus session record.</p></section>;
}
