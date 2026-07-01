# Local Demo Environment

The local demo environment is a safe, offline-friendly configuration for running demo pages without connecting Stripe, Resend, external storage, or other paid services.

## Create The Local Demo Env

From the repo root:

```bash
pnpm demo:env
```

This copies:

```txt
apps/web/.env.demo.local.example -> apps/web/.env.local
```

## Included Values

The template contains only safe local values:

```txt
NEXT_PUBLIC_APP_URL=http://localhost:3000
APP_NAME=KV Web Starter Local Demo
AUTH_ENABLE_DEMO_LOGIN=true
AUTH_DEMO_EMAIL=admin@example.com
AUTH_DEMO_PASSWORD=password123
PAYMENTS_PROVIDER=mock
EMAIL_PROVIDER=console
STORAGE_PROVIDER=local
FEATURE_BOOKING=true
FEATURE_API_PORTAL=true
FEATURE_BILLING=true
```

## Security Rules

- Do not put real API keys in `.env.demo.local.example`.
- Do not commit `.env.local`.
- Keep payments on `mock`.
- Keep email on `console`.
- Keep storage on `local`.
- Use demo login only for local demos.
- Production runtime still requires a real `AUTH_SECRET`; this template intentionally does not include one.

## Recommended Local Loop

```bash
pnpm demo:env
pnpm dev
```

For production-style local checks, provide a temporary shell-only `AUTH_SECRET` without editing the env template:

```bash
AUTH_SECRET=local-demo-build-secret-local-demo-build-secret pnpm build
```
