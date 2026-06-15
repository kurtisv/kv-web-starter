# Boilerplate Usage

kv-web-starter is a modular Next.js base for building SaaS, portfolios, booking systems,
API portals, and more — without rebuilding the plumbing each time.

## Starting a New Project

1. Clone or copy the boilerplate:
```bash
git clone https://github.com/kurtisv/kv-web-starter my-project
cd my-project
pnpm install
```

2. Set your project type:
```
NEXT_PUBLIC_PROJECT_TYPE=saas
```

3. Update `apps/web/src/config/site.ts` with your name, tagline, and CTA.

4. Set environment variables (see `.env.example`):
   - `DATABASE_URL` — PostgreSQL connection string
   - `AUTH_SECRET` — random 32-char string
   - `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET`
   - `RESEND_API_KEY`

5. Run migrations:
```bash
pnpm db:push
```

6. Start dev:
```bash
pnpm dev
```

## Stack

- **Next.js 16** App Router, TypeScript strict
- **Tailwind v4** with CSS variable design tokens
- **Prisma + PostgreSQL** via `pg` adapter
- **Auth.js v5** JWT sessions with Prisma adapter
- **Stripe** subscriptions + webhooks
- **Resend** transactional emails
- **Upstash** rate limiting
- **Sentry** error monitoring
- **Vitest** unit tests, **Playwright** e2e

## Modules

Enable or disable modules by including/excluding pages and API routes.
Billing: `apps/web/src/app/api/stripe/` + `src/modules/billing/`
Booking: `src/app/booking/` + `src/modules/booking/`
API keys: `src/app/developers/` + `src/modules/api-portal/`
