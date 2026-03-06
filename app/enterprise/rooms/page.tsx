import Link from "next/link";

export default function EnterpriseRoomsPage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/enterprise" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Enterprise Suite
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Enterprise Suite
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">Rooms</h1>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        Rooms are structured communication spaces for team discussion, meetings, collaboration, and AI-assisted summaries.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link href="/enterprise/rooms/create" className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/7">
          <div className="text-2xl font-semibold text-white">Create Room</div>
          <div className="mt-3 text-sm text-white/70">
            Start a project room, leadership room, planning room, or team room.
          </div>
          <div className="mt-5 text-sm font-semibold text-white/90">Open create flow →</div>
        </Link>

        <Link href="/enterprise/rooms/join" className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/7">
          <div className="text-2xl font-semibold text-white">Join Room</div>
          <div className="mt-3 text-sm text-white/70">
            Enter a company room for communication, collaboration, and decisions.
          </div>
          <div className="mt-5 text-sm font-semibold text-white/90">Open join flow →</div>
        </Link>
      </div>
    </section>
  );
}
