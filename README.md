# Shynvo Web

Primary customer-facing frontend for the Shynvo platform.

## Local development

```bash
npm install
npm run dev
```

## Domain strategy

- Primary canonical domain: `https://shynvo.app`
- Secondary domain: `https://www.shynvo.app` (redirects to primary)

Canonical metadata and host redirects are configured in:

- `app/layout.tsx`
- `next.config.ts`

## Railway deployment

Use this as the production frontend service.

### Service settings

- **Service name:** `shynvo-web`
- **Root directory:** this repository root
- **Build command:** `npm run build`
- **Start command:** `npm run start`
- **Environment:** Production

### Domains

Attach both:

- `shynvo.app`
- `www.shynvo.app`

The app-level redirect ensures all `www` traffic resolves to `shynvo.app`.

## Platform transformation plan

Current architecture keeps services separate while presenting one platform:

- `shynvo-web`: flagship frontend experience
- `sh-backend-api`: AI reasoning backend (Railway service)
- `Robot_backend`: execution/generation backend (Railway service)

Next step is a unified repo named `shynvo-platform` with:

- `apps/web` (this frontend)
- `services/sh-backend-api`
- `services/robot-backend`
# force redeploy Thu, Apr 16, 2026  8:55:02 PM
