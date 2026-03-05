import Link from "next/link";
import { notFound } from "next/navigation";
import { DEPARTMENTS, getFaculty, isDepartmentKey } from "@/_lib/university/data";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function DepartmentPage({ params }: { params: { faculty: string; department: string } }) {
  const faculty = getFaculty(params.faculty);
  if (!faculty) return notFound();

  const deptKeyRaw = params.department;
  if (!isDepartmentKey(deptKeyRaw)) return notFound();

  const deptInfo = DEPARTMENTS[deptKeyRaw];

  // Ensure this department belongs to the faculty
  if (!faculty.departments.includes(deptKeyRaw)) return notFound();

  return (
    <section className="py-10 sm:py-14">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <Link href="/university" className="text-white/70 hover:text-white">
          University Hub
        </Link>
        <span className="text-white/35">/</span>
        <Link href={`/university/${faculty.slug}`} className="text-white/70 hover:text-white">
          {faculty.name}
        </Link>
        <span className="text-white/35">/</span>
        <span className="text-white">{deptInfo.title}</span>
      </div>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{deptInfo.title}</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">{deptInfo.subtitle}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {deptInfo.tags.map((t) => (
          <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60">What you can do here</div>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {deptInfo.highlights.map((x) => (
              <li key={x} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-white/55" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60">Professional flow</div>
          <div className="mt-4 grid gap-3">
            <Card title="Teacher access" desc="Office hours, feedback loops, grading policies, course guidance." />
            <Card title="Tutor help" desc="Targeted support for gaps, exam practice, assignments." />
            <Card title="Library resources" desc="Faculty reading lists, notes, citations, structured materials." />
          </div>

          <div className="mt-4 text-xs text-white/55">
            Next: attach real content (courses, tutors, schedules) per faculty + department.
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Link
          href={`/university/${faculty.slug}`}
          className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5"
        >
          Back to {faculty.name}
        </Link>
      </div>
    </section>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className={cx("rounded-2xl border border-white/10 bg-white/5 p-4")}>
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-xs leading-5 text-white/70">{desc}</div>
    </div>
  );
}
