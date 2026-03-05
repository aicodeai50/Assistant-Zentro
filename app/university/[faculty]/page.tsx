import Link from "next/link";
import { notFound } from "next/navigation";
import { DEPARTMENTS, getFaculty } from "@/_lib/university/data";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function FacultyPage({ params }: { params: { faculty: string } }) {
  const faculty = getFaculty(params.faculty);
  if (!faculty) return notFound();

  return (
    <section className="py-10 sm:py-14">
      <Link href="/university" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        <span className="rounded-full border border-white/10 bg-white/5 p-1.5">
          <ChevronLeft />
        </span>
        Back to University Hub
      </Link>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{faculty.name}</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">{faculty.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {faculty.focusAreas.map((x) => (
          <span key={x} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
            {x}
          </span>
        ))}
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60">Departments</div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {faculty.departments.map((key) => {
              const d = DEPARTMENTS[key];
              return (
                <Link
                  key={key}
                  href={`/university/${faculty.slug}/${key}`}
                  className={cx(
                    "group rounded-2xl border border-white/10 bg-white/5 p-4 transition",
                    "hover:bg-white/7 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold">{d.title}</div>
                      <div className="mt-1 text-xs text-white/60">{d.subtitle}</div>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80">
                      <ArrowRightIcon />
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {d.tags.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60">Featured books</div>
          <ul className="mt-4 space-y-3">
            {faculty.featuredBooks.map((b) => (
              <li key={b.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold">{b.title}</div>
                <div className="mt-1 text-xs text-white/65">
                  {b.author}
                  {b.year ? ` • ${b.year}` : ""}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 text-xs text-white/55">
            Next step: connect each book to lessons, tutors, and course modules.
          </div>
        </div>
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
function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 18 9 12l6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
