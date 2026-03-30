"use client";

import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="relative z-20 mt-16 border-t border-white/10 bg-[#060a13]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_220px_at_15%_0%,rgba(95,116,255,0.08),transparent_60%),radial-gradient(600px_220px_at_85%_0%,rgba(45,183,109,0.05),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-2 shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition duration-300 hover:border-white/20 hover:bg-white/[0.05]">
                <ShynvoLogo />
              </div>

              <span className="text-sm font-semibold tracking-[0.02em] text-white">
                Shynvo
              </span>
            </div>

            <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">
              Structured AI platform for learning, building, and guided digital work.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Badge>AI-guided</Badge>
              <Badge>Modular</Badge>
              <Badge>Structured</Badge>
            </div>
          </div>

          {/* PRODUCT */}
          <Column
            title="Product"
            links={[
              { label: "Docs", href: "/docs" },
              { label: "Pricing", href: "/pricing" },
              { label: "Search", href: "/search" },
            ]}
          />

          {/* PLATFORM */}
          <Column
            title="Platform"
            links={[
              { label: "University Hub", href: "/university" },
              { label: "Frontier Lab", href: "/frontier" },
              { label: "Enterprise", href: "/enterprise" },
              { label: "Robot", href: "/robot" },
            ]}
          />

          {/* COMPANY */}
          <Column
            title="Company"
            links={[
              { label: "Contact", href: "/contact" },
            ]}
          />
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 backdrop-blur-[2px] sm:px-5">
          <div className="flex flex-col gap-3 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <div>© {new Date().getFullYear()} Shynvo. All rights reserved.</div>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/terms" className="transition hover:text-white">
                Terms
              </Link>
              <Link href="/privacy" className="transition hover:text-white">
                Privacy
              </Link>
              <Link href="/refund" className="transition hover:text-white">
                Refund
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Column({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <div className="text-sm font-semibold text-white/90">{title}</div>

      <div className="mt-4 space-y-2.5">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="group inline-flex items-center gap-2 text-sm text-white/62 transition hover:text-white"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/20 transition group-hover:bg-white/70" />
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/65 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white/80">
      {children}
    </span>
  );
}

function ShynvoLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <circle cx="50" cy="50" r="10" fill="white" />
      <ellipse cx="50" cy="50" rx="34" ry="18" stroke="white" strokeWidth="3" opacity="0.9" />
      <ellipse cx="50" cy="50" rx="18" ry="34" stroke="white" strokeWidth="2" opacity="0.6" />
      <circle cx="84" cy="50" r="3" fill="white" />
      <circle cx="16" cy="50" r="3" fill="white" />
      <circle cx="50" cy="16" r="3" fill="white" />
      <circle cx="50" cy="84" r="3" fill="white" />
    </svg>
  );
}