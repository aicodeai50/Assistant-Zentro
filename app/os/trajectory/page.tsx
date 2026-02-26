import OSShell from "@/components/os/OSShell";
import { BackRow, BoxLink, OSCard } from "@/components/os/OSCard";

export default function TrajectoryPage() {
  return (
    <OSShell
      title="Trajectory"
      subtitle="Trajectory turns goals into missions. Instead of random learning, you follow a map."
    >
      <BackRow />

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <OSCard title="Arc" value="Builder → Founder" hint="Role evolution" />
        <OSCard title="Horizon" value="90 days" hint="Timeframe" />
        <OSCard title="Confidence" value="Upward" hint="Signal direction" />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Mission map</h2>
        <p className="mt-2 text-white/70">
          A fictional roadmap showing how Shynvo guides users.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <BoxLink
            href="/os/trajectory/foundation"
            title="Weeks 1–2: Foundation"
            desc="Stabilize routine + baseline skill map."
            tag="Phase"
          />
          <BoxLink
            href="/os/trajectory/specialization"
            title="Weeks 5–8: Specialization"
            desc="Pick a track + build portfolio signals."
            tag="Phase"
          />
          <BoxLink
            href="/os/trajectory/acceleration"
            title="Weeks 3–4: Acceleration"
            desc="Increase difficulty + interview simulation."
            tag="Phase"
          />
          <BoxLink
            href="/os/trajectory/outcome"
            title="Weeks 9–12: Outcome"
            desc="Mock interviews + measurable readiness score."
            tag="Phase"
          />
        </div>
      </section>
    </OSShell>
  );
}