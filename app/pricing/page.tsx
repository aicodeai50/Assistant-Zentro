"use client";

import { ShieldCheck, Rocket, CreditCard, Sparkles } from "lucide-react";
import { BILLING_PLANS } from "@/lib/billing/plans";
import { SITE_NAME } from "@/lib/site";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageShell } from "@/components/ui/PageShell";

const billingSteps = [
  {
    title: "Create your workspace",
    desc: "Sign up for Zentro Assistant and start with a trial period.",
    Icon: Sparkles,
  },
  {
    title: "Use the assistant daily",
    desc: "Save memory, track tasks, and run incident copilot workflows.",
    Icon: Rocket,
  },
  {
    title: "Upgrade with PayPal",
    desc: "Move to Pro or Team when you need higher limits and cloud sync.",
    Icon: CreditCard,
  },
];

const trustPoints = [
  "PayPal secure subscription checkout",
  "Transparent monthly pricing",
  "Cancel anytime from your PayPal account",
  "Enterprise sales available on request",
];

export default function PricingPage() {
  return (
    <PageShell
      eyebrow="Pricing"
      title="Professional plans for IT teams"
      description={`${SITE_NAME} starts free, scales with your operations, and bills securely through PayPal.`}
    >
      <section className="grid gap-4 md:grid-cols-3">
        {billingSteps.map((item) => {
          const Icon = item.Icon;
          return (
            <Card key={item.title}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                <Icon className="h-5 w-5 text-cyan-200" strokeWidth={1.8} />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-white">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/60">{item.desc}</p>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {BILLING_PLANS.map((plan) => (
          <Card
            key={plan.key}
            className={plan.highlighted ? "border-cyan-400/25 bg-cyan-400/[0.06]" : ""}
          >
            {plan.highlighted ? (
              <Badge variant="info" className="mb-4">
                Most popular
              </Badge>
            ) : null}

            <h2 className="text-xl font-semibold text-white">{plan.name}</h2>
            <div className="mt-3 flex items-end gap-1">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="pb-1 text-sm text-white/50">{plan.period}</span>
            </div>
            <p className="mt-3 text-sm text-white/55">{plan.description}</p>

            <ul className="mt-6 space-y-2.5 text-sm text-white/75">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <ButtonLink
              href={plan.href}
              variant={plan.highlighted ? "primary" : "secondary"}
              className="mt-8 w-full"
            >
              {plan.cta}
            </ButtonLink>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader
            eyebrow="Guidance"
            title="Which plan fits your team?"
            description="Choose based on how many operators need assistant memory, AI limits, and shared workflows."
          />

          <div className="space-y-4 text-sm leading-7 text-white/70">
            <p>
              <span className="font-semibold text-white">Starter</span> — evaluate the assistant,
              local memory, and incident copilot during trial.
            </p>
            <p>
              <span className="font-semibold text-white">Pro</span> — individual SREs and platform
              engineers who need cloud sync and higher AI limits.
            </p>
            <p>
              <span className="font-semibold text-white">Team</span> — small IT teams sharing
              assistant context and operational workflows.
            </p>
            <p>
              <span className="font-semibold text-white">Enterprise</span> — organizations requiring
              SSO, compliance review, and custom rollout support.
            </p>
          </div>
        </Card>

        <Card>
          <CardHeader
            eyebrow="Trust"
            title="Billing you can audit"
            description="Before checkout"
            action={
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                <ShieldCheck className="h-5 w-5 text-emerald-200" strokeWidth={1.8} />
              </div>
            }
          />

          <ul className="space-y-3 text-sm text-white/70">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/docs" variant="secondary" size="sm">
              Read docs
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="sm">
              Contact sales
            </ButtonLink>
          </div>
        </Card>
      </section>
    </PageShell>
  );
}
