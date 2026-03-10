import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    subtitle: "For casual users exploring Shynvo.",
    features: [
      "Basic AI access",
      "Access to environments",
      "Robot guidance",
      "Community-level usage",
    ],
    cta: "Current plan",
    href: "/sign-up",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$20 / month",
    subtitle: "For serious learners, builders, and creators.",
    features: [
      "Higher AI limits",
      "Full Shynvo Robot support",
      "Frontier Lab access",
      "Advanced environment usage",
      "Priority experience",
    ],
    cta: "Upgrade to Pro",
    href: "/sign-up",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$79 / month",
    subtitle: "For teams, companies, and organizational systems.",
    features: [
      "Unlimited AI usage",
      "Enterprise Suite access",
      "Team collaboration tools",
      "Analytics and coordination",
      "Priority support",
    ],
    cta: "Contact sales",
    href: "/contact",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_15%_10%,rgba(56,189,248,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_560px_at_82%_18%,rgba(16,185,129,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_100%,rgba(168,85,247,0.08),transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
          Pricing
        </div>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Choose your Shynvo plan
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
          Start free, explore the Shynvo environments, and upgrade when you need
          more AI power, deeper tools, and full platform access.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={[
                "rounded-3xl border p-6 backdrop-blur-sm",
                plan.highlighted
                  ? "border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_0_1px_rgba(56,189,248,0.15)]"
                  : "border-white/10 bg-white/5",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-white">{plan.name}</h2>
                  <p className="mt-2 text-3xl font-bold text-white">{plan.price}</p>
                </div>

                {plan.highlighted ? (
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100">
                    Most popular
                  </span>
                ) : null}
              </div>

              <p className="mt-4 text-sm leading-6 text-white/65">{plan.subtitle}</p>

              <ul className="mt-6 space-y-3 text-sm text-white/80">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
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
      </div>
    </section>
  );
}
