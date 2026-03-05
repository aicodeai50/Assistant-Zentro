import Link from "next/link";
import { FACULTIES } from "@/_lib/university/data";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function UniversityIndexPage() {
  return (
    <section className="py-10 sm:py-14">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60">University Hub</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Campus</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
            A professional education environment with faculties, departments, teachers, tutors, and curated resources.
          </p>
        </div>

        <Link
          href="/docs"
          className="hidden rounded-xl px-4 py-2 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5 sm:inline-flex"
        >
          Read documentation
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FACULTIES.map((f) => (
          <Link
            key={f.slug}
            href={`/university/${f.slug}`}
            className={cx(
              "group rounded-3xl border border-white/10 bg-white/5 p-5 transition",
              "hover:bg-white/7 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
            )}
            aria-label={`Open ${f.name}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-semibold text-white">{f.name}</div>
                <div className="mt-1 text-xs text-white/60">{f.degree} • Faculty</div>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
                Enter
              </span>
            </div>

            <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/70">{f.summary}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {f.focusAreas.slice(0, 4).map((x) => (
                <span key={x} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
                  {x}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-semibold text-white/90 group-hover:text-white">Explore faculty</span>
              <span className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80">
                <ArrowRightIcon />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10 7 15 12 10 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
