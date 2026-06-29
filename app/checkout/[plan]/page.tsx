"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase/client";
import { getBillingPlan } from "@/lib/billing/plans";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageShell } from "@/components/ui/PageShell";

function CheckoutFallback() {
  return (
    <PageShell eyebrow="Checkout" title="Preparing secure checkout">
      <Card>Checking your account…</Card>
    </PageShell>
  );
}

export default function CheckoutPlanPage() {
  return (
    <Suspense fallback={<CheckoutFallback />}>
      <CheckoutPlanPageClient />
    </Suspense>
  );
}

function CheckoutPlanPageClient() {
  const params = useParams<{ plan: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const planKey = String(params?.plan || "").toLowerCase();
  const plan = getBillingPlan(planKey);
  const cancelled = searchParams.get("cancelled") === "1";

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      if (!plan || plan.key === "free" || plan.key === "enterprise") {
        router.replace("/pricing");
        return;
      }

      const supabase = getSupabaseClient();
      if (!supabase) {
        router.replace(`/sign-in?next=${encodeURIComponent(`/checkout/${planKey}`)}`);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace(`/sign-in?next=${encodeURIComponent(`/checkout/${planKey}`)}`);
        return;
      }

      if (mounted) {
        setEmail(session.user.email || "");
        setLoading(false);
      }
    }

    void checkAuth();

    return () => {
      mounted = false;
    };
  }, [plan, planKey, router]);

  async function startPayPalCheckout() {
    setSubmitting(true);
    setMessage("");

    try {
      const supabase = getSupabaseClient();
      if (!supabase) throw new Error("Authentication is not configured.");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        router.replace(`/sign-in?next=${encodeURIComponent(`/checkout/${planKey}`)}`);
        return;
      }

      const response = await fetch("/api/billing/paypal/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ plan: planKey }),
      });

      const data = (await response.json()) as {
        approvalUrl?: string;
        error?: string;
      };

      if (!response.ok || !data.approvalUrl) {
        throw new Error(data.error || "Unable to start PayPal checkout.");
      }

      window.location.href = data.approvalUrl;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Checkout failed.");
      setSubmitting(false);
    }
  }

  const features = useMemo(() => plan?.features ?? [], [plan]);

  if (loading || !plan) {
    return (
      <PageShell eyebrow="Checkout" title="Preparing secure checkout">
        <Card>Checking your account…</Card>
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow="Secure checkout"
      title={`Upgrade to ${plan.name}`}
      description="Complete your subscription through PayPal. You can cancel anytime from your PayPal account."
      actions={<ButtonLink href="/pricing" variant="secondary" size="sm">All plans</ButtonLink>}
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader
            eyebrow="Plan summary"
            title={`${plan.name} — ${plan.price}${plan.period}`}
            description={plan.description}
          />

          <ul className="space-y-3 text-sm text-white/75">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {cancelled ? (
            <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
              Checkout was cancelled. You can restart when ready.
            </div>
          ) : null}

          {message ? (
            <div className="mt-5 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {message}
            </div>
          ) : null}
        </Card>

        <Card>
          <CardHeader
            eyebrow="Payment"
            title="Pay with PayPal"
            description="Subscriptions are billed monthly through PayPal. Your Zentro plan updates automatically after approval."
          />

          <div className="space-y-4 text-sm text-white/65">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-white/45">Account</div>
              <div className="mt-1 font-medium text-white">{email || "Signed-in user"}</div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="info">PayPal secure checkout</Badge>
              <Badge variant="success">Cancel anytime</Badge>
            </div>
          </div>

          <Button
            type="button"
            onClick={() => void startPayPalCheckout()}
            disabled={submitting}
            className="mt-6 w-full"
            size="lg"
          >
            {submitting ? "Redirecting to PayPal…" : `Subscribe to ${plan.name} with PayPal`}
          </Button>

          <p className="mt-4 text-center text-xs text-white/45">
            By continuing you agree to our{" "}
            <Link href="/terms" className="text-cyan-200 hover:text-cyan-100">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/refund" className="text-cyan-200 hover:text-cyan-100">
              Refund policy
            </Link>
            .
          </p>
        </Card>
      </div>
    </PageShell>
  );
}
