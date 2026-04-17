# Shynvo PRI

Secondary frontend focused on robot operations and API generation.

## Local development

```bash
npm install
npm run dev
```

## Domain strategy

This app follows the same canonical domain strategy as the main frontend:

- Canonical: `https://shynvo.app`
- `www.shynvo.app` redirects to canonical

Configured in:

- `src/app/layout.tsx`
- `next.config.ts`

## Railway usage

Recommended use for this app:

- Staging environment
- Feature validation before merging to main frontend

If deployed separately, use a subdomain like `pri.shynvo.app` and keep `shynvo.app` reserved for the main customer frontend.

## Platform direction

Target product structure is a unified platform repository:

- `apps/web` (main customer app)
- `apps/pri` (experimental or operator app)
- `services/sh-backend-api`
- `services/robot-backend`
