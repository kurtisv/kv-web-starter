# Client Handoff Guide

This guide explains how to hand off this project to a client or new developer.

## What they receive

- A fully functional Next.js application in demo/local mode
- 9 preset demo pages (booking, SaaS, e-commerce, dashboard, real estate,
  local business, portfolio, API portal, auto blog)
- A component library with 60+ UI components
- Adapter architecture for storage, email, and payments
- Documentation in `docs/`

## Step 1 — Clone and install

```bash
git clone <repo-url> my-project
cd my-project
pnpm install
cp .env.example .env.local
pnpm dev
```

The app starts in demo mode without any configuration.

## Step 2 — Replace demo content

All demo content is in `apps/web/src/app/demo/`. Each demo page uses hard-coded
mock data (realistic but fictional). To replace with real content:

1. Update the data arrays at the top of each demo page file
2. Or connect to a real database (see Step 4)
3. Update brand name, colors, and copy in the relevant demo page

## Step 3 — Configure your theme

Each demo uses a CSS preset theme from `apps/web/src/app/globals.css`.
To customize colors and typography, edit the `[data-theme="..."]` block that
matches your preset, or create a new one.

## Step 4 — Connect services

Start with the services you need:

| Service | Purpose | Guide |
|---------|---------|-------|
| PostgreSQL | Real data persistence | `docs/integrations.md` |
| Stripe | Payments | `docs/integrations.md` |
| Resend | Transactional email | `docs/integrations.md` |
| Supabase / S3 / R2 | File uploads | `docs/integrations.md` |
| GitHub OAuth | Social login | `docs/integrations.md` |

Each service is optional. Add only what you need.

## Step 5 — Set production env vars

For production deployment, set at minimum:

```env
AUTH_SECRET=<openssl rand -base64 32>
AUTH_ENABLE_DEMO_LOGIN=false
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production
```

## Step 6 — Deploy

The app deploys to any Next.js-compatible platform:

- **Vercel** — connect the repo, add env vars in project settings, deploy
- **Railway** — add env vars, Railway auto-detects Next.js
- **Render** — add a Web Service, set build command `pnpm build`, start `pnpm start`
- **Docker** — build the image, set env vars as container environment variables

## How to update demo data with real data

The simplest upgrade path per demo:

**Booking** — replace `DEMO_SERVICES`, `DEMO_STAFF`, `DEMO_BOOKINGS` arrays in
`app/demo/booking/page.tsx` with data fetched from your database.

**E-commerce** — replace `DEMO_PRODUCTS`, `DEMO_CATEGORIES` with real product
data from your database or a headless CMS.

**Dashboard** — replace metric values and activity feed with live queries from
your database using `lib/db.ts` (Prisma).

**Real estate** — replace `DEMO_PROPERTIES`, `DEMO_AGENTS` with real listings.

## What NOT to change

- `lib/storage/`, `lib/email/`, `lib/payments/` — adapter architecture; extend,
  do not rewrite from scratch
- `components/ui/` — design system base; extend with new variants
- `lib/env.ts` — only add new vars; do not remove existing ones

## Handing off to a designer

Point designers to:
- `/demo` — all preset demos in one place
- `docs/design-system.md` — design tokens and component catalog
- `docs/themes.md` — how the CSS theme system works
- `apps/web/src/app/globals.css` — all CSS custom property values
