export type BillingPlanKey = "free" | "pro" | "team" | "enterprise";

export type BillingPlan = {
  key: BillingPlanKey;
  name: string;
  price: string;
  period: string;
  priceCents: number;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
  paypalPlanIdEnv?: "PAYPAL_PRO_PLAN_ID" | "PAYPAL_TEAM_PLAN_ID";
};

export const BILLING_PLANS: BillingPlan[] = [
  {
    key: "free",
    name: "Starter",
    price: "$0",
    period: "/ month",
    priceCents: 0,
    description: "Evaluate Zentro Assistant with core AI and local memory.",
    features: [
      "7-day trial with AI access",
      "Assistant memory & tasks (local)",
      "Incident copilot chat",
      "Community support",
    ],
    cta: "Create account",
    href: "/sign-up",
  },
  {
    key: "pro",
    name: "Pro",
    price: "$19",
    period: "/ month",
    priceCents: 1900,
    description: "For individual operators who need higher limits and cloud sync.",
    features: [
      "Unlimited assistant memory sync",
      "Higher daily AI limits",
      "Runbook intelligence",
      "Priority assistant responses",
      "Email support",
    ],
    cta: "Upgrade with PayPal",
    href: "/checkout/pro",
    highlighted: true,
    paypalPlanIdEnv: "PAYPAL_PRO_PLAN_ID",
  },
  {
    key: "team",
    name: "Team",
    price: "$49",
    period: "/ month",
    priceCents: 4900,
    description: "For small IT teams sharing workflows and assistant context.",
    features: [
      "Everything in Pro",
      "Shared assistant workspaces",
      "Team audit logs",
      "Higher automation limits",
      "Priority support",
    ],
    cta: "Upgrade with PayPal",
    href: "/checkout/team",
    paypalPlanIdEnv: "PAYPAL_TEAM_PLAN_ID",
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    priceCents: 0,
    description: "For organizations needing SSO, compliance, and dedicated rollout.",
    features: [
      "Custom AI limits",
      "SSO & compliance review",
      "Dedicated success manager",
      "Custom integrations",
      "SLA-backed support",
    ],
    cta: "Contact sales",
    href: "/contact",
  },
];

export function getBillingPlan(key: string): BillingPlan | undefined {
  return BILLING_PLANS.find((plan) => plan.key === key);
}

export function planKeyFromPayPalPlanId(planId: string): BillingPlanKey | null {
  const pro = process.env.PAYPAL_PRO_PLAN_ID;
  const team = process.env.PAYPAL_TEAM_PLAN_ID;
  if (planId && pro && planId === pro) return "pro";
  if (planId && team && planId === team) return "team";
  return null;
}
