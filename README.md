# Zentro Assistant (shynvo-web)

Production frontend for **Zentro Assistant** at `https://assistant.zentro.run`.

## Local development

```bash
npm install
npm run dev
```

Regenerate favicon and PWA icons:

```bash
npm run generate:icons
```

## Domain

- **Canonical:** `https://assistant.zentro.run`

Configured in `lib/site.ts`, `app/layout.tsx`, and `next.config.ts`.

## Railway deployment

| Setting | Value |
|--------|--------|
| Repo | `aicodeai50/shynvo-web` (or your fork) |
| Root directory | *(empty — repo root)* |
| Build command | `npm run build` |
| Start command | `npm run start` |
| Port | `3000` (or Railway `PORT`) |

### Custom domain

In Railway → Networking → add:

- `assistant.zentro.run` → port `3000`

Add the CNAME/TXT records Railway provides at your DNS host for `zentro.run`.

### Environment variables

Set any API keys your app needs (Supabase, OpenAI, backend URLs) in Railway → Variables.

## Icons

Brand mark source: `public/icons/zentro-mark.svg`  
Generated outputs: `public/favicon.png`, `public/icons/icon-*.png`

Icons are regenerated automatically on `npm run build` via `prebuild`.
