# Integrations Guide

> **This boilerplate is a multi-client template. External services are optional.**
> Every user must provide their own keys. Default mode works locally without
> any external credentials.

All integrations are controlled by adapter classes in `apps/web/src/lib/`.
Set the relevant env vars in `.env.local` to activate a provider.

Check live integration status at `/dashboard/settings/integrations`.

---

## Storage

Controls where uploaded files are saved.

**Default:** `local` — files saved to `public/uploads/`. No config required.

Set `STORAGE_PROVIDER` in `.env.local` to switch providers.

### Local (default)

```env
STORAGE_PROVIDER=local
```

No packages to install. Files stored at `public/uploads/` and served statically.
Not suitable for multi-instance deployments.

### Supabase Storage

```bash
pnpm add @supabase/supabase-js
```

```env
STORAGE_PROVIDER=supabase
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
SUPABASE_STORAGE_BUCKET=uploads   # optional, default: uploads
```

Create the bucket in your Supabase dashboard → Storage → New bucket.
Set the bucket to **Public** for direct URL access.

### Azure Blob Storage

```bash
pnpm add @azure/storage-blob
```

```env
STORAGE_PROVIDER=azure
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=...
AZURE_STORAGE_CONTAINER=uploads   # optional, default: uploads
```

### AWS S3

```bash
pnpm add @aws-sdk/client-s3
```

```env
STORAGE_PROVIDER=s3
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
AWS_S3_BUCKET=my-bucket
AWS_S3_PUBLIC_URL=https://my-bucket.s3.us-east-1.amazonaws.com  # optional CDN
```

### Cloudflare R2

R2 is S3-compatible and has zero egress fees.

```bash
pnpm add @aws-sdk/client-s3
```

```env
STORAGE_PROVIDER=r2
R2_ACCOUNT_ID=<account-id>
R2_ACCESS_KEY_ID=<r2-access-key>
R2_SECRET_ACCESS_KEY=<r2-secret>
R2_BUCKET=my-bucket
R2_PUBLIC_URL=https://pub-xxx.r2.dev
```

---

## Email

Controls how transactional emails are sent (bookings, auth, notifications).

**Default:** `console` — logs to stdout. No config required.

### Console (default)

```env
EMAIL_PROVIDER=console
```

No packages or accounts needed. Emails are logged to the terminal.

### Resend

```env
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

Package already included. Create an account at https://resend.com and verify
your domain. See `apps/web/src/lib/email/resend-email.ts`.

---

## Payments

Controls how subscriptions and one-time payments are handled.

**Default:** `mock` — simulates checkout. No config required.

### Mock (default)

```env
PAYMENTS_PROVIDER=mock
```

Checkout redirects immediately to the success URL. Useful for demos and testing.

### Stripe

```env
PAYMENTS_PROVIDER=stripe
STRIPE_SECRET_KEY=sk_live_...         # or sk_test_... for testing
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_PRICE_PRO=price_...            # your Stripe price ID for Pro plan
STRIPE_PRICE_BUSINESS=price_...
STRIPE_PRICE_ENTERPRISE=price_...
```

Package already included. Steps:
1. Create your products and prices in the Stripe dashboard
2. Set up webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events: `checkout.session.completed`, `customer.subscription.*`
4. Add the webhook secret to `STRIPE_WEBHOOK_SECRET`

---

## Database

**Default:** demo/mock data — no database needed.

### PostgreSQL (recommended)

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

```bash
pnpm db:push     # sync schema (dev)
pnpm db:migrate  # run migrations (production)
pnpm db:seed     # seed demo data
```

---

## Rate limiting — Upstash Redis

Used by the API portal for per-key rate limiting.

```env
UPSTASH_REDIS_REST_URL=https://...upstash.io
UPSTASH_REDIS_REST_TOKEN=...
```

Without Upstash, rate limiting is disabled (all requests pass through).

---

## Authentication — GitHub OAuth

```env
AUTH_GITHUB_ID=...
AUTH_GITHUB_SECRET=...
```

Create an OAuth app at https://github.com/settings/applications/new.
Set the callback URL to `http://localhost:3000/api/auth/callback/github`.

---

## Error tracking — Sentry

```env
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
SENTRY_AUTH_TOKEN=sntrys_...
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
```

---

## CMS — Sanity

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=...
```
