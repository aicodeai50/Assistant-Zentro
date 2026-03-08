"use client";

import { useState } from "react";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

const PEOPLE = [
  { name: "Amina Yusuf", role: "CEO", team: "Leadership" },
  { name: "Daniel Reed", role: "Engineering Lead", team: "Engineering" },
  { name: "Sarah Cole", role: "Product Lead", team: "Product" },
  { name: "Michael Hart", role: "Marketing Lead", team: "Marketing" },
  { name: "Lina Hassan", role: "Operations", team: "Operations" },
  { name: "David Moore", role: "Frontend Engineer", team: "Engineering" },
];

export default function EnterpriseDirectoryPage() {
  const [query, setQuery] = useState("");

  const filtered = PEOPLE.filter((person) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      person.name.toLowerCase().includes(q) ||
      person.role.toLowerCase().includes(q) ||
      person.team.toLowerCase().includes(q)
    );
  });

  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav hubHref="/enterprise" hubTitle="Enterprise Suite" label="Member Directory" />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Enterprise Suite
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Member Directory
      </h1>

      <p className="mt-4 max-w-5xl text-sm leading-6 text-white/70 sm:text-base">
        Directory helps companies view their member structure across teams, roles, and functional areas.
      </p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, role, or team..."
        className="mt-6 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
      />

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((person) => (
          <div key={person.name} className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
            <div className="text-xl font-semibold text-white">{person.name}</div>
            <div className="mt-2 text-sm text-white/70">{person.role}</div>
            <div className="mt-4 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/75 inline-block">
              {person.team}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
