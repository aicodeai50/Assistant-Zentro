import Link from "next/link";
import { SITE_NAME, SUPPORT_EMAIL, CONTACT_EMAIL } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageShell } from "@/components/ui/PageShell";

export const metadata = {
  title: "Contact",
  description: `Contact ${SITE_NAME} for support, billing, and enterprise inquiries.`,
};

const channels = [
  {
    title: "General inquiries",
    email: CONTACT_EMAIL,
    description: "Product questions, partnerships, and general feedback.",
  },
  {
    title: "Technical support",
    email: SUPPORT_EMAIL,
    description: "Account issues, assistant problems, and checkout help.",
  },
  {
    title: "Billing & refunds",
    email: SUPPORT_EMAIL,
    description: "PayPal subscriptions, plan changes, and refund requests.",
    href: "/refund",
  },
  {
    title: "Enterprise sales",
    email: CONTACT_EMAIL,
    description: "SSO, compliance review, custom rollout, and team licensing.",
    href: "/pricing",
  },
];

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Support"
      title="Contact Zentro"
      description={`Reach the ${SITE_NAME} team for support, billing, or enterprise questions.`}
      actions={
        <>
          <ButtonLink href="/docs" variant="secondary" size="sm">
            Documentation
          </ButtonLink>
          <ButtonLink href="/assistant" size="sm">
            Open Assistant
          </ButtonLink>
        </>
      }
    >
      <section className="grid gap-4 md:grid-cols-2">
        {channels.map((channel) => (
          <Card key={channel.title}>
            <CardHeader
              eyebrow="Channel"
              title={channel.title}
              description={channel.description}
            />
            <a
              href={`mailto:${channel.email}`}
              className="text-lg font-semibold text-cyan-200 hover:text-cyan-100"
            >
              {channel.email}
            </a>
            {channel.href ? (
              <Link
                href={channel.href}
                className="mt-4 inline-flex text-sm font-semibold text-white/60 hover:text-white"
              >
                Related page →
              </Link>
            ) : null}
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader
          eyebrow="Response time"
          title="We typically respond within 24 hours"
          description="Include your account email and a short description of the issue for faster resolution."
        />
      </Card>
    </PageShell>
  );
}
