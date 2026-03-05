import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold">COUNCIL</h1>
          <div className="flex gap-3">
            <Link href="/os" className="underline text-white/80 hover:text-white">Back to OS</Link>
            <Link href="/assistant" className="underline text-white/80 hover:text-white">SH Assistant</Link>
          </div>
        </div>

        <p className="mt-3 text-white/70">
          This sector is active. Next step: add tools + terminal routes + AI workflows for this room.
        </p>

        <div className="mt-8 rounded-3xl border border-white/15 bg-white/5 p-6">
          <div className="text-xs tracking-widest text-white/60">STATUS</div>
          <div className="mt-2 text-sm text-white/80">
            Online • Ready • Waiting for commands
          </div>
        </div>
      </div>
    </div>
  );
}
