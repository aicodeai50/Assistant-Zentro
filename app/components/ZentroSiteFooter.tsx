import Link from "next/link";
import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_SHORT_NAME, SUPPORT_EMAIL } from "@/lib/site";
import ZentroMark from "./ZentroMark";

export default function ZentroSiteFooter() {
  return (
    <footer className="relative z-20 mt-20 border-t border-white/[0.06] bg-[#04060c]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <ZentroMark size={28} />
              <span className="text-sm font-semibold text-white">{SITE_SHORT_NAME}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">{SITE_DESCRIPTION}</p>
            <p className="mt-4 text-xs text-white/40">
              {CONTACT_EMAIL} · {SUPPORT_EMAIL}
            </p>
          </div>

          <FooterCol
            title="Product"
            links={[
              { label: "Platform", href: "/#platform" },
              { label: "Modules", href: "/#modules" },
              { label: "Pricing", href: "/pricing" },
              { label: "Documentation", href: "/docs" },
            ]}
          />
          <FooterCol
            title="Capabilities"
            links={[
              { label: "Incident Copilot", href: "/docs" },
              { label: "Automation Engine", href: "/robot" },
              { label: "Runbook Intelligence", href: "/search" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: "Contact", href: "/contact" },
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {SITE_SHORT_NAME}. All rights reserved.</span>
          <span className="font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.14em] text-white/30">
            Audit-ready · Approval-gated · Built for IT operations
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/80">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-white/55 transition hover:text-cyan-200/90"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
