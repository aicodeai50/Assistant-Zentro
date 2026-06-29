const DEFAULT_API_BASE = "https://api-m.sandbox.paypal.com";

type PayPalTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

type PayPalSubscriptionResponse = {
  id: string;
  status: string;
  links?: Array<{ href: string; rel: string; method: string }>;
};

function getPayPalApiBase() {
  return process.env.PAYPAL_API_BASE || DEFAULT_API_BASE;
}

function getPayPalCredentials() {
  const clientId = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials are not configured.");
  }

  return { clientId, clientSecret };
}

export async function getPayPalAccessToken(): Promise<string> {
  const { clientId, clientSecret } = getPayPalCredentials();
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(`${getPayPalApiBase()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`PayPal token request failed: ${text}`);
  }

  const data = (await response.json()) as PayPalTokenResponse;
  return data.access_token;
}

export async function createPayPalSubscription(input: {
  planId: string;
  userId: string;
  email: string;
  returnUrl: string;
  cancelUrl: string;
}): Promise<PayPalSubscriptionResponse> {
  const token = await getPayPalAccessToken();

  const response = await fetch(`${getPayPalApiBase()}/v1/billing/subscriptions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      plan_id: input.planId,
      custom_id: input.userId,
      subscriber: {
        email_address: input.email,
      },
      application_context: {
        brand_name: "Zentro Assistant",
        user_action: "SUBSCRIBE_NOW",
        payment_method: {
          payer_selected: "PAYPAL",
          payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
        },
        return_url: input.returnUrl,
        cancel_url: input.cancelUrl,
      },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`PayPal subscription creation failed: ${text}`);
  }

  return (await response.json()) as PayPalSubscriptionResponse;
}

export function getPayPalApprovalUrl(subscription: PayPalSubscriptionResponse): string | null {
  const approve = subscription.links?.find((link) => link.rel === "approve");
  return approve?.href ?? null;
}

export async function verifyPayPalWebhookSignature(input: {
  transmissionId: string;
  transmissionTime: string;
  certUrl: string;
  authAlgo: string;
  transmissionSig: string;
  webhookId: string;
  webhookEvent: unknown;
}): Promise<boolean> {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) return false;

  const token = await getPayPalAccessToken();

  const response = await fetch(
    `${getPayPalApiBase()}/v1/notifications/verify-webhook-signature`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transmission_id: input.transmissionId,
        transmission_time: input.transmissionTime,
        cert_url: input.certUrl,
        auth_algo: input.authAlgo,
        transmission_sig: input.transmissionSig,
        webhook_id: webhookId,
        webhook_event: input.webhookEvent,
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) return false;

  const data = (await response.json()) as { verification_status?: string };
  return data.verification_status === "SUCCESS";
}
