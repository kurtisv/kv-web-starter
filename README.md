# KV Web Starter

Premium modular Next.js boilerplate for three reusable project types:

- professional marketing sites
- booking and appointment sites
- paid SaaS/API portals

## Stack

- Next.js App Router, React, TypeScript strict
- Tailwind CSS v4 with shadcn-style local components
- PostgreSQL with Prisma
- Auth.js with Prisma Adapter
- Stripe Checkout/Billing-ready structure
- Resend and React Email-ready structure
- API key hashing, API usage models, rate-limit dependencies
- Local UI primitives for forms, cards, tables, dialogs, sheets, tabs, accordion, calendar
- Vitest and CI foundation

## Local setup

```bash
pnpm install
cp .env.example .env
docker compose up -d
pnpm db:generate
pnpm db:migrate
pnpm dev
```

The project uses a pnpm workspace:

```txt
apps/web
packages/*
prisma
emails
tests
```

## First implementation phases

1. Foundation: auth, organization/membership, dashboard shell, theme, DB schema.
2. Marketing site: services, pricing, contact, FAQ, testimonials, SEO.
3. Booking: services, staff, availability, exceptions, booking flow, reminders.
4. API portal: API keys, OpenAPI docs, usage logs, rate limits, Stripe plans.
5. Production: Sentry, E2E tests, webhooks, seeds, deployment checklist.

## Notes

pnpm supply-chain protection is enabled with `minimumReleaseAge: 1440`.
If Prisma or native package generation is blocked locally, run the package
approval workflow intentionally instead of disabling the protection globally.

## Demo access

The starter ships with a local credentials provider for development:

```txt
admin@example.com
password123
```

Override these with `AUTH_DEMO_EMAIL` and `AUTH_DEMO_PASSWORD` before sharing
any deployed preview. Replace the demo provider with email or OAuth before
production.
