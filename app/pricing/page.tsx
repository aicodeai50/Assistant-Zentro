import Link from "next/link";

type Plan = {
  name: string;
  price: string;
  bullets: string[];
  cta: { label: string; href: string };
  highlight?: boolean;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function PricingPage() {
  const plans: Plan[] = [
    {
      name: "Trial",
      price: "7-day free trial",
      bullets: [
        "Full access for 7 days",
        "University Hub + Shynvo OS + Experiments",
        "Upgrade required after trial",
      ],
      cta: { label: "Create account", href: "/signup" },
    },
    {
      name: "Pro",
      price: "NOK 250 / month",
      bullets: ["Higher limits", "Interview simulator", "Resume + skill prep"],
      cta: { label: "Upgrade to Pro", href: "mailto:hi@shynvo.app?subject=Shynvo%20Pro%20Upgrade" },
      highlight: true,
    },
    {
      name: "Team",
      price: "NOK 600 / month",
      bullets: ["Company admin tools", "Seats (managed per team)", "Skill matrix + upskill plans"],
      cta: { label: "Upgrade to Team", href: "mailto:hi@shynvo.app?subject=Shynvo%20Team%20Upgrade" },
    },
  ];

  return (
    <div className="py-14">
      <h1 className="text-4xl font-semibold">Pricing</h1>
      <p className="mt-3 text-white/70">Start with the trial. Upgrade after the trial ends to keep using Shynvo.</p>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={cx(
              "rounded-3xl border p-6",
              p.highlight ? "border-white/20 bg-white/7" : "border-white/10 bg-white/5"
            )}
          >
            <div className="text-lg font-semibold">{p.name}</div>
            <div className="mt-2 text-2xl font-semibold">{p.price}</div>

            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {p.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-white/50" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <a
              href={p.cta.href}
              className={cx(
                "mt-6 block rounded-xl px-4 py-3 text-center text-sm font-semibold",
                p.highlight ? "bg-white text-[#0B0F14] hover:bg-white/90" : "ring-1 ring-white/15 hover:bg-white/5"
              )}
            >
              {p.cta.label}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link className="text-white/70 hover:text-white underline underline-offset-4" href="/">
          ← Back
        </Link>
      </div>
    </div>
  );
}