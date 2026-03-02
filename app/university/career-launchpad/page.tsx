import Link from "next/link";
import ArenaTutor from "@/components/university/ArenaTutor";
import { getFacultyFromSearchParam } from "@/lib/university/faculties";

export default async function CareerLaunchpadPage({
  searchParams,
}: {
  searchParams: Promise<{ faculty?: string }>;
}) {
  const sp = await searchParams;
  const faculty = getFacultyFromSearchParam(sp?.faculty);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs tracking-widest text-white/60">UNIVERSITY HUB</div>
            <h1 className="mt-2 text-3xl font-semibold">Career Launchpad</h1>
            <p className="mt-2 text-white/70">
              Interview practice, roadmaps, CV bullets, and role readiness for your faculty.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/university"
              className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15"
            >
              Back to Hub →
            </Link>
            <Link
              href="/"
              className="rounded-2xl border border-white/15 bg-black/40 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
            >
              Home →
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <ArenaTutor faculty={faculty} arena="career-launchpad" />
        </div>
      </div>
    </div>
  );
}
