import { NextRequest, NextResponse } from "next/server";
import { planKeyFromPayPalPlanId } from "@/lib/billing/plans";
import { verifyPayPalWebhookSignature } from "@/lib/billing/paypal";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

type PayPalWebhookEvent = {
  event_type?: string;
  resource?: {
    id?: string;
    plan_id?: string;
    status?: string;
    custom_id?: string;
    subscriber?: { email_address?: string };
  };
};

async function updateUserPlan(userId: string, plan: string, status: string) {
  const admin = getSupabaseAdmin();
  if (!admin) {
    console.error("Supabase admin unavailable for PayPal webhook");
    return;
  }

  const activePlans = ["active", "approved"];
  const nextPlan = activePlans.includes(status.toLowerCase()) ? plan : "trial";

  await admin
    .from("profiles")
    .update({
      plan: nextPlan,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PayPalWebhookEvent;

    const transmissionId = req.headers.get("paypal-transmission-id") || "";
    const transmissionTime = req.headers.get("paypal-transmission-time") || "";
    const certUrl = req.headers.get("paypal-cert-url") || "";
    const authAlgo = req.headers.get("paypal-auth-algo") || "";
    const transmissionSig = req.headers.get("paypal-transmission-sig") || "";

    if (process.env.PAYPAL_WEBHOOK_ID) {
      const verified = await verifyPayPalWebhookSignature({
        transmissionId,
        transmissionTime,
        certUrl,
        authAlgo,
        transmissionSig,
        webhookId: process.env.PAYPAL_WEBHOOK_ID,
        webhookEvent: body,
      });

      if (!verified) {
        return NextResponse.json({ error: "Invalid webhook signature." }, { status: 401 });
      }
    }

    const eventType = body.event_type || "";
    const resource = body.resource;
    const userId = resource?.custom_id;
    const planId = resource?.plan_id;
    const status = resource?.status || "unknown";
    const subscriptionId = resource?.id;

    if (!userId || !planId) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const planKey = planKeyFromPayPalPlanId(planId);
    if (!planKey) {
      console.warn("Unknown PayPal plan ID:", planId);
      return NextResponse.json({ ok: true, skipped: true });
    }

    const admin = getSupabaseAdmin();

    if (
      eventType === "BILLING.SUBSCRIPTION.ACTIVATED" ||
      eventType === "BILLING.SUBSCRIPTION.RE-ACTIVATED" ||
      eventType === "BILLING.SUBSCRIPTION.UPDATED"
    ) {
      await updateUserPlan(userId, planKey, status);

      if (admin && subscriptionId) {
        await admin.from("billing_subscriptions").upsert(
          {
            user_id: userId,
            provider: "paypal",
            provider_subscription_id: subscriptionId,
            plan: planKey,
            status: status.toLowerCase(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "provider_subscription_id" }
        );
      }
    }

    if (
      eventType === "BILLING.SUBSCRIPTION.CANCELLED" ||
      eventType === "BILLING.SUBSCRIPTION.SUSPENDED" ||
      eventType === "BILLING.SUBSCRIPTION.EXPIRED"
    ) {
      await updateUserPlan(userId, "trial", status);

      if (admin && subscriptionId) {
        await admin
          .from("billing_subscriptions")
          .update({
            status: status.toLowerCase(),
            updated_at: new Date().toISOString(),
          })
          .eq("provider_subscription_id", subscriptionId);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PayPal webhook error:", error);
    return NextResponse.json({ error: "Webhook failed." }, { status: 500 });
  }
}
