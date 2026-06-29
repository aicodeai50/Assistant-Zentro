# shynvo-web Product Audit & Redesign Decision

**Date:** June 2026  
**Repository:** `aicodeai50/Assistant-Zentro` (package name: `shynvo-web`)  
**Production:** Railway → `assistant.zentro.run` (service: `shynvo-web`)

---

## 1. Executive summary

| Question | Finding |
|----------|---------|
| Is `shynvo-web` a duplicate of SHYNVO? | **No.** It *is* the SHYNVO platform web frontend, now partially rebranded as **Zentro Assistant**. |
| Is it a separate product from SHYNVO? | **Partially.** Same codebase, two identities layered: legacy Shynvo multi-environment platform + new Zentro IT-ops positioning. |
| Is `apps/pri` the same product? | **No.** `shynvo_pri` is a distinct operator app (robot/API builder) merged into this monorepo for staging. |
| What about `aicodeai50/ZENTRO`? | A **diverged fork** with different history — not the canonical deploy target for this service. |

### Decision: **Option B — Redesign as standalone Zentro Assistant**

Do **not** consolidate into the separate `ZENTRO` repo or delete `shynvo-web`. Instead:

1. **Focus** the root app on Zentro Assistant (IT operations assistant).
2. **Keep** `apps/pri` as an optional secondary app (not production target).
3. **Archive** legacy Shynvo environment routes from primary navigation (routes remain for backward compatibility).
4. **Replace** Lemon Squeezy checkout with **PayPal** billing.
5. **Add** professional settings, dashboard, and shared UI components.

---

## 2. Repository structure

```
shynvo-web/                    ← npm package & Railway deploy target
├── app/                       ← Main Next.js 16 app (Zentro Assistant)
├── apps/pri/                  ← SHYNVO PRI (separate product, optional deploy)
├── components/                ← Legacy (excluded from TS compile)
├── lib/                       ← Legacy (excluded)
├── supabase/                  ← Auth, usage, billing SQL
├── railway.toml               ← build: npm run build, start: npm run start
└── docs/                      ← Product & architecture documentation
```

---

## 3. Current features (main app)

### Core product (keep & invest)

| Route | Purpose |
|-------|---------|
| `/` | IT ops landing page |
| `/assistant` | Command center — memory, tasks, briefings, cloud sync |
| `/dashboard` | Signed-in workspace hub |
| `/settings` | Profile, billing, assistant preferences |
| `/account` | Plan, trial, AI usage |
| `/pricing` | Plans & upgrade path |
| `/checkout/[plan]` | PayPal subscription checkout |
| `/sign-in`, `/sign-up`, `/forgot-password`, `/reset-password` | Supabase auth |
| `/search` | Runbook intelligence |
| `/docs` | Platform documentation |
| `/contact`, `/privacy`, `/terms`, `/refund` | Legal & support |

### Legacy Shynvo platform (archived from nav, kept for compatibility)

~80+ routes under `/os`, `/university`, `/academy`, `/arcade`, `/experiments`, `/frontier`, `/enterprise/*`, `/robot`, etc.

These reflect the original **multi-environment learning/gaming platform** vision — not aligned with Zentro Assistant's IT-ops positioning.

---

## 4. Auth, database & billing

| System | Status |
|--------|--------|
| **Auth** | Supabase email/password |
| **Database** | Supabase — `profiles`, `daily_ai_usage`, `guest_ai_usage`, `assistant_state` |
| **Billing (before)** | Lemon Squeezy (`shynvo.lemonsqueezy.com`) — webhook stub, no profile updates |
| **Billing (after)** | PayPal Subscriptions — server API + webhook → updates `profiles.plan` |
| **Backend** | Optional proxy to `SH_BACKEND_URL` / `api.shynvo.com` |

### Required environment variables (PayPal)

```
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
PAYPAL_WEBHOOK_ID=
PAYPAL_PRO_PLAN_ID=
PAYPAL_TEAM_PLAN_ID=
PAYPAL_API_BASE=https://api-m.sandbox.paypal.com   # or api-m.paypal.com for live
```

---

## 5. Branding state

| Layer | Brand |
|-------|-------|
| Production config (`app/lib/site.ts`) | Zentro Assistant @ `assistant.zentro.run` |
| npm package | `shynvo-web` |
| Pricing/legal (legacy copy) | Shynvo |
| `apps/pri` | SHYNVO PRI |

**Target:** User-facing surfaces use **Zentro Assistant**. Repo/package names can remain `shynvo-web` until a future rename migration.

---

## 6. Bloat vs core

| Category | Action |
|----------|--------|
| Zentro landing, assistant, auth, dashboard, settings | **Core — invest** |
| Legacy environment routes | **Archive** — remove from nav, keep routes |
| Root `components/`, `lib/`, `stores/` | **Legacy** — excluded from compile; migrate or delete later |
| `apps/pri` | **Separate product** — not part of Zentro deploy |
| Lemon Squeezy | **Replace** with PayPal |
| Android Capacitor | **Future** — config mismatch (`shynvo.app` vs `assistant.zentro.run`) |

---

## 7. Target audience & use case

**Product:** Zentro Assistant  
**Audience:** IT teams, SREs, platform engineers, MSPs  
**Use case:** Incident triage, safe automations, runbook intelligence, assistant memory/tasks with optional cloud sync

---

## 8. Implementation checklist (this PR)

- [x] Document audit & decision (`docs/PRODUCT_AUDIT.md`)
- [x] Professional UI components (`app/components/ui/*`)
- [x] PayPal billing integration (`app/lib/billing/*`, API routes, webhook)
- [x] Settings page (`/settings`)
- [x] Dashboard & pricing redesign (Zentro branding)
- [x] Navigation cleanup (Settings link, no legacy routes in nav)
- [x] Supabase billing schema (`supabase/billing_subscriptions.sql`)
- [x] README update with product identity

---

## 9. What we did NOT do (intentionally)

- **Did not merge** into `aicodeai50/ZENTRO` — histories diverged; risk of losing work.
- **Did not delete** legacy routes — avoids breaking bookmarks; nav no longer promotes them.
- **Did not remove** `apps/pri` — separate product with its own deploy path.
- **Did not rename** npm package — low priority; deploy config unchanged.

---

## 10. Next steps (post-merge)

1. Configure PayPal sandbox/live plans and webhook URL in Railway.
2. Run `supabase/billing_subscriptions.sql` in Supabase SQL editor.
3. Point custom domain DNS if not already on `assistant.zentro.run`.
4. Gradually delete or redirect legacy `/enterprise`, `/arcade`, etc. routes.
5. Consider renaming repo from `shynvo-web` → `zentro-assistant`.
