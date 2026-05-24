"use client";

import { useEffect, useState } from "react";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";
import { backendFetch, getToken } from "@/lib/sh-backend";

type CompanyProfile = {
  id: string;
  name: string;
  seats: number;
  plan?: string;
};

export default function CompanyWorkspacePage() {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [size, setSize] = useState("");
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [memberCount, setMemberCount] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setIndustry(localStorage.getItem("enterprise_company_industry") || "");
    setSize(localStorage.getItem("enterprise_company_size") || "");

    if (!getToken()) {
      setName(localStorage.getItem("enterprise_company_name") || "");
      setError("Sign in to load your live company workspace from the backend.");
      return;
    }

    (async () => {
      try {
        const profile = await backendFetch("/company");
        const companyData = profile?.company as CompanyProfile | undefined;
        if (companyData) {
          setCompany(companyData);
          setName(companyData.name);
          localStorage.setItem("enterprise_company_name", companyData.name);
        }

        try {
          const members = await backendFetch("/company/members");
          setMemberCount(Array.isArray(members?.members) ? members.members.length : null);
        } catch {
          setMemberCount(null);
        }
      } catch (err: unknown) {
        setName(localStorage.getItem("enterprise_company_name") || "");
        setError(err instanceof Error ? err.message : "Could not load company workspace.");
      }
    })();
  }, []);

  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav hubHref="/enterprise" hubTitle="Shynvo Enterprise" label="Company Workspace" />

      <h1 className="mt-4 text-4xl font-semibold sm:text-6xl">{name || "Company Workspace"}</h1>

      <p className="mt-4 max-w-3xl text-white/70">
        This workspace is backed by the live Zentro API. Teams, members, analytics, and
        collaboration data sync from production when you are signed in.
      </p>

      {error ? (
        <div className="mt-6 max-w-3xl rounded-2xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          {error}
        </div>
      ) : null}

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm text-white/60">Industry</div>
          <div className="mt-2 text-xl font-semibold">{industry || "Not set"}</div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm text-white/60">Company Size</div>
          <div className="mt-2 text-xl font-semibold">{size || "Not set"}</div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm text-white/60">Seats</div>
          <div className="mt-2 text-xl font-semibold">{company?.seats ?? "—"}</div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm text-white/60">Members</div>
          <div className="mt-2 text-xl font-semibold">{memberCount ?? "—"}</div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm text-white/60">Plan</div>
          <div className="mt-2 text-xl font-semibold">{company?.plan || "team"}</div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm text-white/60">Environment</div>
          <div className="mt-2 text-xl font-semibold">Shynvo Enterprise</div>
        </div>
      </div>
    </section>
  );
}
