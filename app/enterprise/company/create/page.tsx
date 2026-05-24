"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";
import { backendFetch, getToken } from "@/lib/sh-backend";

export default function CreateCompanyPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [size, setSize] = useState("");
  const [seats, setSeats] = useState("5");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function createCompany() {
    if (!name.trim()) return;

    if (!getToken()) {
      setError("Sign in first so your account can own this company workspace.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const seatsNum = Math.min(Math.max(Number(seats) || 5, 1), 500);

      await backendFetch("/company/teams", {
        method: "POST",
        body: JSON.stringify({ name: name.trim(), seats: seatsNum }),
      });

      if (industry.trim()) {
        localStorage.setItem("enterprise_company_industry", industry.trim());
      }
      if (size.trim()) {
        localStorage.setItem("enterprise_company_size", size.trim());
      }
      localStorage.setItem("enterprise_company_name", name.trim());

      router.push("/enterprise/company/workspace");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Could not create company workspace.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav hubHref="/enterprise" hubTitle="Shynvo Enterprise" label="Create Company" />

      <h1 className="mt-4 text-4xl font-semibold sm:text-6xl">Create Company Workspace</h1>

      <p className="mt-4 max-w-3xl text-white/70">
        Create a company workspace on the live backend to manage teams, members, analytics,
        and internal collaboration.
      </p>

      <div className="mt-10 max-w-xl grid gap-4">
        <input
          placeholder="Company name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
        />

        <input
          placeholder="Industry (optional)"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
        />

        <input
          placeholder="Company size (optional)"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
        />

        <input
          placeholder="Seats"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
        />

        {error ? (
          <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        ) : null}

        <button
          onClick={createCompany}
          disabled={loading}
          className="mt-2 rounded-2xl bg-white px-5 py-3 font-semibold text-black disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Workspace"}
        </button>
      </div>
    </section>
  );
}
