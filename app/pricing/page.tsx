"use client";

import Link from "next/link";
import { ShieldCheck, Rocket, Users, Sparkles } from "lucide-react";

const plans = [
  {
    key: "free",
    name: "Free",
    price: "$0",
    period: "/ month",
    bestFor: "Best for exploring the platform",
    href: "/sign-up",
    highlighted: false,
    cta: "Create account",
    features: [
      "Basic AI access",
      "Access to environments",
      "Robot guidance",
      "Community-level usage",
    ],
  },
  {
    key: "pro",
    name: "Pro",
    price: "$25",
    period: "/ month",
    bestFor: "Best for individuals",
    href: "/checkout/pro",
    highlighted: true,
    cta: "Get Pro",
    features: [
      "Higher AI limits",
      "Full Shynvo Robot support",
      "Frontier Lab access",
      "Advanced environment usage",
      "Priority experience",
    ],
  },
  {
    key: "team",
    name: "Team",
    price: "$50",
    period: "/ month",
    bestFor: "Best for teams",
    href: "/checkout/team",
    highlighted: false,
    cta: "Get Team",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Shared environments",
      "Higher AI limits",
      "Priority support",
    ],
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    bestFor: "Best for large organizations",
    href: "/contact",
    highlighted: false,
    cta: "Get started",
    features: [
      "Unlimited AI usage",
      "Full environment access",
      "Custom integrations",
      "Dedicated support",
      "Enterprise security",
    ],
  },
];

const billingSteps = [
  {
    title: "Create your account",
    desc: "Start with secure access to Shynvo and begin using the platform.",
    Icon: Sparkles,
  },
  {
    title: "Start with trial access",
    desc: "New users can begin with a free starting path before choosing a paid plan.",
    Icon: Rocket,
  },
  {
    title: "Upgrade when ready",
    desc: "Choose Pro or Team when you need more AI usage, deeper access, or collaboration.",
    Icon: Users,
  },
];

const trustPoints = [
  "Secure checkout for paid plans",
  "Transparent pricing by plan level",
  "Contact available for enterprise and support questions",
];

export default function PricingPage() {
  return (
    <section className="relative py-12 sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_15%_10%,rgba(56,189,248,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_560px_at_82%_18%,rgba(16,185,129,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_100%,rgba(168,85,247,0.08),transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            Pricing
          </div>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Simple pricing for every stage
          </h1>

          <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
            Start free, upgrade to Pro for deeper individual use, move to Team for collaboration,
            or choose Enterprise for large-scale structured access.
          </p>

          <div className="mt-6 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-left text-sm leading-6 text-white/85">
            <div className="font-semibold text-white">Start path</div>
            <p className="mt-2 text-white/78">
              New users can start by creating an account and exploring Shynvo before moving into paid access.
              Pro and Team plans take you directly into secure checkout when you are ready.
            </p>
          </div>
        </div>

        <section className="mt-10">
          <div className="grid gap-4 md:grid-cols-3">
            {billingSteps.map((item) => {
              const Icon = item.Icon;
              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <Icon className="h-5 w-5 text-white/80" strokeWidth={1.8} />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-white">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/72">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={[
                "relative rounded-3xl border p-6 backdrop-blur-sm transition",
                plan.highlighted
                  ? "border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_0_1px_rgba(56,189,248,0.15)]"
                  : "border-white/10 bg-white/5",
              ].join(" ")}
            >
              {plan.highlighted ? (
                <div className="absolute right-5 top-5 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
                  Most popular
                </div>
              ) : null}

              <div>
                <h2 className="text-xl font-semibold text-white">{plan.name}</h2>

                <div className="mt-4 flex items-end gap-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="pb-1 text-sm text-white/60">{plan.period}</span>
                </div>

                <p className="mt-2 text-xs text-white/50">{plan.bestFor}</p>
              </div>

              <ul className="mt-8 space-y-3 text-sm text-white/80">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-cyan-300" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={[
                  "mt-8 inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition",
                  plan.highlighted
                    ? "bg-white text-[#0B0F14] hover:bg-white/90"
                    : "border border-white/10 bg-white/5 text-white hover:bg-white/10",
                ].join(" ")}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Plan guidance
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Which plan should you choose?
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-7 text-white/74">
              <p>
                <span className="font-semibold text-white">Free</span> is best if you want to enter the platform,
                explore the environments, and understand how Shynvo works.
              </p>
              <p>
                <span className="font-semibold text-white">Pro</span> is best for individual users who want stronger AI usage,
                deeper environment access, and a more advanced experience.
              </p>
              <p>
                <span className="font-semibold text-white">Team</span> is best for multiple people working together with shared access and collaboration.
              </p>
              <p>
                <span className="font-semibold text-white">Enterprise</span> is best for organizations that need custom scale,
                security, and structured rollout support.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <ShieldCheck className="h-5 w-5 text-white/80" strokeWidth={1.8} />
              </div>
              <div>
                <div className="text-lg font-semibold text-white">Trust and clarity</div>
                <div className="text-sm text-white/60">Before checkout</div>
              </div>
            </div>

            <ul className="mt-5 space-y-3 text-sm text-white/78">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-300" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/docs"
                className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Read docs
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
