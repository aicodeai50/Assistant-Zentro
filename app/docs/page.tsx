import Link from "next/link";
import { Suspense } from "react";
import { SITE_NAME } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageShell } from "@/components/ui/PageShell";
import DocsLegacyBanner from "./DocsLegacyBanner";

export const metadata = {
  title: "Documentation",
  description: `Setup guides and operator documentation for ${SITE_NAME}.`,
};

const CORE_GUIDES = [
  {
    title: "Getting started",
    description: "Create an account, open the assistant, and save your first memory.",
    href: "/sign-up",
    tag: "Start",
  },
  {
    title: "Assistant Command Center",
    description: "Manage memory, tasks, daily briefings, and optional cloud sync.",
    href: "/assistant",
    tag: "Assistant",
  },
  {
    title: "Runbook search",
    description: "Find procedures and operational knowledge during incidents.",
    href: "/search",
    tag: "Ops",
  },
  {
    title: "Pricing & billing",
    description: "Compare plans and upgrade through PayPal subscriptions.",
    href: "/pricing",
    tag: "Billing",
  },
  {
    title: "Settings",
    description: "Update profile, billing, and assistant preferences.",
    href: "/settings",
    tag: "Account",
  },
  {
    title: "PayPal setup (operators)",
    description: "Configure subscription plans, webhooks, and Railway env vars.",
    href: "/docs/paypal-setup",
    tag: "Admin",
  },
  {
    title: "Contact support",
    description: "Reach the team for enterprise, billing, or technical questions.",
    href: "/contact",
    tag: "Support",
  },
];

const LEGACY_GUIDES = [
  { title: "Shynvo OS", href: "/os", tag: "Legacy" },
  { title: "University", href: "/university", tag: "Legacy" },
  { title: "Academy", href: "/academy", tag: "Legacy" },
  { title: "Arcade", href: "/arcade", tag: "Legacy" },
  { title: "Enterprise demo", href: "/enterprise", tag: "Legacy" },
];

export default function DocsPage() {
  return (
    <PageShell
      eyebrow="Documentation"
      title="Zentro Assistant guides"
      description="Operator documentation for the core product. Legacy Shynvo environments remain available but are not actively maintained."
      actions={
        <ButtonLink href="/" variant="secondary" size="sm">
          Back to home
        </ButtonLink>
      }
    >
      <Suspense fallback={null}>
        <DocsLegacyBanner />
      </Suspense>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {CORE_GUIDES.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition hover:border-cyan-300/20 hover:bg-white/[0.05]"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-200/70">
              {guide.tag}
            </div>
            <h2 className="mt-2 text-lg font-semibold text-white">{guide.title}</h2>
            <p className="mt-2 text-sm leading-6 text-white/55">{guide.description}</p>
            <div className="mt-5 text-sm font-semibold text-cyan-200 group-hover:text-cyan-100">
              Open guide →
            </div>
          </Link>
        ))}
      </section>

      <Card className="mt-4">
        <CardHeader
          eyebrow="Legacy"
          title="Archived Shynvo environments"
          description="These routes are kept for backward compatibility. They are not part of the primary Zentro Assistant product roadmap."
        />

        <div className="flex flex-wrap gap-2">
          {LEGACY_GUIDES.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-xs font-medium text-amber-100 transition hover:bg-amber-400/15"
            >
              {guide.title}
            </Link>
          ))}
        </div>
      </Card>
    </PageShell>
  );
}
