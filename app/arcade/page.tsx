export default function ArcadePage() {
  const arenas = [
    {
      title: "Interview Arena",
      desc: "Practice interviews with AI feedback and scoring.",
    },
    {
      title: "Coding Challenges",
      desc: "Solve coding tasks under timed and gamified conditions.",
    },
    {
      title: "Negotiation Mode",
      desc: "Train persuasive thinking and decision pressure handling.",
    },
    {
      title: "Skill Rankings",
      desc: "Track points, badges, and progression across drills.",
    },
  ];

  return (
    <div className="min-h-screen py-10 text-white">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          Arcade Sim
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Competitive Skill Arena
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
          Arcade Sim turns training into a game. Users can practice interviews, coding,
          communication, and decision-making while earning points, badges, and rankings.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
          >
            Start Playing
          </button>
          <a
            href="/signup"
            className="rounded-xl px-5 py-3 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/5"
          >
            Join Shynvo
          </a>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {arenas.map((arena) => (
          <div
            key={arena.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:bg-white/[0.07]"
          >
            <div className="text-lg font-semibold">{arena.title}</div>
            <p className="mt-3 text-sm leading-6 text-white/65">{arena.desc}</p>

            <div className="mt-5">
              <button
                type="button"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10"
              >
                Open Arena
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <div className="text-sm font-semibold text-white">Reward System</div>
        <ul className="mt-4 space-y-2 text-sm text-white/70">
          <li>• Points</li>
          <li>• Badges</li>
          <li>• Rankings</li>
          <li>• Performance progression</li>
        </ul>
      </section>
    </div>
  );
}
