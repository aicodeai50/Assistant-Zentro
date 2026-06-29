# PayPal Billing Setup for Zentro Assistant

Follow these steps to enable Pro ($19/mo) and Team ($49/mo) subscriptions in production.

## 1. Create PayPal developer app

1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Create an app under **Sandbox** (for testing) or **Live** (for production)
3. Copy **Client ID** and **Secret**

## 2. Create subscription plans

In PayPal Dashboard → **Subscriptions** → **Plans**:

| Plan | Price | Billing |
|------|-------|---------|
| Zentro Pro | $19.00 | Monthly |
| Zentro Team | $49.00 | Monthly |

Copy each plan's **Plan ID** (starts with `P-`).

## 3. Railway environment variables

Add to the `shynvo-web` service:

```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_client_secret
PAYPAL_PRO_PLAN_ID=P-xxxxx
PAYPAL_TEAM_PLAN_ID=P-xxxxx
PAYPAL_WEBHOOK_ID=your_webhook_id
PAYPAL_API_BASE=https://api-m.sandbox.paypal.com
```

For production, use `https://api-m.paypal.com` instead of sandbox.

## 4. Supabase billing table

Run in Supabase SQL editor:

```
supabase/billing_subscriptions.sql
```

This creates `billing_subscriptions` with RLS so users can read their own record.

## 5. Register PayPal webhook

1. PayPal Dashboard → **Webhooks** → Add webhook
2. URL: `https://assistant.zentro.run/api/webhooks/paypal`
3. Events to subscribe:
   - `BILLING.SUBSCRIPTION.ACTIVATED`
   - `BILLING.SUBSCRIPTION.UPDATED`
   - `BILLING.SUBSCRIPTION.CANCELLED`
   - `BILLING.SUBSCRIPTION.SUSPENDED`
   - `BILLING.SUBSCRIPTION.EXPIRED`
4. Copy the **Webhook ID** → `PAYPAL_WEBHOOK_ID`

## 6. Test checkout flow

1. Sign in at `/sign-in`
2. Go to `/pricing` → **Upgrade to Pro**
3. Complete PayPal sandbox subscription
4. Return to `/settings` → Billing tab
5. Verify `profiles.plan` updates to `pro` after webhook fires

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "PayPal plan is not configured" | Set `PAYPAL_PRO_PLAN_ID` / `PAYPAL_TEAM_PLAN_ID` in Railway |
| Plan not updating after payment | Check webhook URL, `PAYPAL_WEBHOOK_ID`, and `SUPABASE_SERVICE_ROLE_KEY` |
| Checkout redirect fails | Ensure `NEXT_PUBLIC_PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` match same environment (sandbox vs live) |

## API routes

| Route | Purpose |
|-------|---------|
| `POST /api/billing/paypal/create-subscription` | Starts subscription, returns PayPal approval URL |
| `POST /api/webhooks/paypal` | Updates user plan on subscription events |
