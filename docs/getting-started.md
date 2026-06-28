# Getting Started

## Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL (optional — the app runs without a database in demo mode)

## Installation

```bash
git clone https://github.com/your-org/kv-web-starter.git my-project
cd my-project
pnpm install
```

## Environment setup

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in the values you need. The only required value to
run the app locally is none — every external integration is optional. The app
ships with a full demo/local mode that works without any API keys.

## Start the dev server

```bash
pnpm dev
```

Visit `http://localhost:3000`. You should see the landing page.

Visit `/demo` to explore all preset demos without any configuration.

Visit `/dashboard` to access the admin dashboard (uses demo login by default).

## Demo login

The default demo account is enabled in `.env.local`:

```
AUTH_ENABLE_DEMO_LOGIN=true
AUTH_DEMO_EMAIL=admin@example.com
AUTH_DEMO_PASSWORD=password123
```

Disable `AUTH_ENABLE_DEMO_LOGIN` in production.

## Database setup (optional)

Set `DATABASE_URL` in `.env.local`, then run:

```bash
pnpm db:push      # push schema to DB (dev)
pnpm db:migrate   # run migrations (production)
pnpm db:seed      # seed demo data
```

Without a database, the app uses in-memory mock data for all demos.

## Available scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm check` | TypeScript + lint |
| `pnpm test` | Unit tests (Vitest) |
| `pnpm test:e2e` | E2E tests (Playwright) |
| `pnpm db:push` | Push Prisma schema |
| `pnpm db:migrate` | Run migrations |
| `pnpm db:seed` | Seed demo data |
| `pnpm db:studio` | Open Prisma Studio |

## Deployment

The app deploys to any platform that supports Next.js:

- **Vercel** — recommended, zero config
- **Railway / Render** — set env vars in the dashboard
- **Docker** — `pnpm build && pnpm start`

Set `AUTH_SECRET` (required in production), `AUTH_ENABLE_DEMO_LOGIN=false`,
and add your service keys as needed. See `docs/integrations.md`.

## Next steps

- Read `docs/integrations.md` to activate Stripe, Resend, and storage providers
- Read `docs/architecture.md` to understand the codebase structure
- Read `docs/client-handoff.md` if you are handing this project to a client
