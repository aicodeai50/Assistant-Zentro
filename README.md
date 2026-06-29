# Zentro Assistant (shynvo-web)

**Product:** Zentro Assistant — AI operations assistant for IT teams  
**Canonical URL:** `https://assistant.zentro.run`  
**Deploy:** Railway service `shynvo-web`

> See [`docs/PRODUCT_AUDIT.md`](docs/PRODUCT_AUDIT.md) for the full investigation, consolidation decision, and roadmap.

## Product identity

| Layer | Value |
|-------|-------|
| User-facing brand | **Zentro Assistant** |
| npm package | `shynvo-web` |
| Target audience | IT teams, SREs, platform engineers |
| Billing | **PayPal Subscriptions** |

Legacy Shynvo environment routes (`/os`, `/university`, `/arcade`, etc.) remain for compatibility but are **not** part of the primary product surface.

## Local development

```bash
npm install
npm run dev
```

Full check (lint + build both apps):

```bash
npm run check
```

## Environment variables

### Supabase (auth & profiles)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### PayPal (billing)

```
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
PAYPAL_WEBHOOK_ID=
PAYPAL_PRO_PLAN_ID=
PAYPAL_TEAM_PLAN_ID=
PAYPAL_API_BASE=https://api-m.sandbox.paypal.com
```

Webhook URL: `https://assistant.zentro.run/api/webhooks/paypal`

Run `supabase/billing_subscriptions.sql` in Supabase after deploying.

## Railway deployment

| Setting | Value |
|--------|--------|
| Build | `npm run build` |
| Start | `npm run start` |
| Port | `3000` |

## Monorepo note

`apps/pri` (`shynvo_pri`) is a **separate** SHYNVO PRI operator app — not deployed as part of the Zentro Assistant production service.

## PayPal setup

See [`docs/PAYPAL_SETUP.md`](docs/PAYPAL_SETUP.md) or `/docs/paypal-setup` in the app for the full operator checklist.
