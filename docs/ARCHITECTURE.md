# Architecture

## Monorepo structure

```
kv-web-starter/
  apps/
    web/                  Next.js 14 app (App Router)
  packages/
    db/                   Prisma schema + client
  docs/                   Documentation
  .env.example            Environment variable template
```

## App structure (apps/web/src/)

```
app/                      Next.js App Router pages
  (marketing)/            Public landing, pricing, about
  dashboard/              Protected admin dashboard
  demo/                   Demo pages (9 presets, no auth required)
  api/                    API route handlers
components/
  ui/                     Base design system (Button, Card, Badge, ...)
  sections/               Page-level sections (Hero, Features, CTA, ...)
  dashboard-ui/           Dashboard-specific components
  animations/             Framer Motion wrappers
  booking/                Booking flow components
  saas/                   SaaS-specific components
  real-estate/            Real estate components
  local-business/         Local business components
  portfolio/              Portfolio components
  3d/                     Three.js / R3F scene components
lib/
  storage/                Storage adapter (local | supabase | azure | s3 | r2)
  email/                  Email adapter (console | resend)
  payments/               Payments adapter (mock | stripe)
  integrations/           Provider config + integration status checker
  auth.ts                 Auth.js (NextAuth v5) configuration
  db.ts                   Prisma client singleton
  env.ts                  Typed env validation (Zod)
  data.ts                 Mock/demo data
```

## Adapter pattern

Every external service is hidden behind an adapter interface.

```
lib/storage/index.ts      -> getStorageAdapter() -> LocalStorageAdapter   (default)
                                                 -> SupabaseStorageAdapter
                                                 -> AzureBlobStorageAdapter
                                                 -> S3StorageAdapter
                                                 -> R2StorageAdapter

lib/email/index.ts        -> getEmailAdapter()   -> ConsoleEmailAdapter   (default)
                                                 -> ResendEmailAdapter

lib/payments/index.ts     -> getPaymentsAdapter()-> MockPaymentsAdapter   (default)
                                                 -> StripePaymentsAdapter
```

The factory picks the right adapter based on STORAGE_PROVIDER, EMAIL_PROVIDER,
and PAYMENTS_PROVIDER env vars. Each adapter can be swapped without touching
any page or component code.

## Demo mode

When external services are not configured, the app runs in demo mode:
- Storage: files saved to public/uploads/
- Email: messages logged to stdout
- Payments: checkout redirects immediately to the success URL
- Database: mock data from lib/data.ts

Demo mode is the default. No env vars are required to run the app locally.
Check live status at /dashboard/settings/integrations.

## Theme system

Nine preset themes in app/globals.css using CSS custom properties on
[data-theme="..."] selectors. Each demo page wraps its content in a
<div data-theme="preset-name">.

Preset names: premium-saas, luxury-auto, local-business, real-estate,
ecommerce-clean, dark-tech-api, corporate-classic.

## Authentication

Auth.js (NextAuth v5) with credentials provider (demo login) and optional
GitHub OAuth. Dashboard routes protected by middleware.ts.

## Database

Prisma ORM with PostgreSQL. Schema in packages/db/prisma/schema.prisma.
The Prisma client is a singleton (lib/db.ts). Works without a database
using mock data from lib/data.ts.
