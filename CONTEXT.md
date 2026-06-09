# KV Web Starter — Contexte rapide pour IA

Ce fichier est destine a etre lu en premier par une IA qui arrive froid sur ce projet.
Objectif : comprendre la totalite du projet en moins de 2 minutes.

## Ce que c'est

Boilerplate Next.js 16 App Router pour creer des sites professionnels avec :
- Sites vitrines (pages marketing, SEO, formulaire contact Resend)
- Reservations (services, staff, creneaux, paiement Stripe)
- Billing SaaS (plans, webhooks, Customer Portal)
- Portail API (cles hashees, scopes, rate limiting Upstash, docs Scalar)

## Architecture en 4 lignes

```
Browser → proxy.ts (Auth JWT + CSP headers + rate limit Upstash)
       → App Router (Server Components par defaut, "use client" seulement si besoin)
       → Server Actions / API Routes (/api/v1/*)
       → Prisma 7 + PostgreSQL
```

## Ou est quoi

| Ce que tu cherches | Ou chercher |
|---|---|
| Toute la config env | `apps/web/src/lib/env.ts` (Zod schema) |
| Auth config edge-safe | `apps/web/src/lib/auth.config.ts` |
| Auth config complete (Prisma) | `apps/web/src/lib/auth.ts` |
| Schema DB complet | `apps/web/prisma/schema.prisma` |
| Feature flags | `env.ts` → `FEATURE_BOOKING`, `FEATURE_BILLING`, `FEATURE_API_PORTAL`, `FEATURE_CMS` |
| Server Actions | `apps/web/src/app/actions/` |
| API routes v1 | `apps/web/src/app/api/v1/` |
| Composants UI | `apps/web/src/components/ui/` (custom, pas Radix) |
| Composants marketing | `apps/web/src/components/marketing/` |
| Composants dashboard | `apps/web/src/components/dashboard/` |
| Messages i18n FR | `apps/web/src/i18n/messages/fr.ts` |
| Messages i18n EN | `apps/web/src/i18n/messages/en.ts` |
| Scripts utilitaires | `scripts/*.ps1` et `scripts/*.js` |

## Regles critiques

1. **Ne jamais utiliser `git diff`** — utiliser `Show-Diff.ps1 -Repo 'kv-web-starter'`
2. **proxy.ts remplace middleware.ts** — Next.js 16 renomme middleware en proxy
3. **Prisma n'est pas edge-compatible** — auth.config.ts ne doit jamais importer Prisma
4. **Les composants UI sont custom** — pas de Radix Dialog/Sheet. Sheet = simple div avec CSS transition
5. **Server Actions retournent un objet** — les forms client lisent le resultat et appellent toast()
6. **Pas de "use client" sans raison** — Server Components par defaut, client seulement pour useState/useEffect/events

## Comment ajouter une page dashboard

```tsx
// 1. Creer apps/web/src/app/dashboard/ma-page/page.tsx
import { requireDashboardAccess } from "@/lib/auth-utils";

export default async function MaPage() {
  const { organizationId } = await requireDashboardAccess();
  // query prisma ici
  return <div>...</div>;
}

// 2. Creer apps/web/src/app/dashboard/ma-page/loading.tsx
export default function Loading() {
  return <div className="animate-pulse">...</div>;
}

// 3. Ajouter le lien dans components/dashboard/sidebar.tsx
```

## Comment ajouter un feature flag

```ts
// 1. Dans env.ts, ajouter :
FEATURE_MON_MODULE: z.string().optional().transform(v => v === "true"),

// 2. Utiliser dans une page :
import { env } from "@/lib/env";
if (!env.FEATURE_MON_MODULE) notFound();

// 3. Dans .env.local :
FEATURE_MON_MODULE=true
```

## Comment creer un endpoint API v1

```ts
// apps/web/src/app/api/v1/mon-endpoint/route.ts
import { NextResponse } from "next/server";
import { requireApiKey } from "@/lib/api-auth";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const auth = await requireApiKey(req, ["mon-scope:read"]);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const data = await prisma.maTable.findMany({ ... });
  return NextResponse.json({ data });
}
```

## Packages cles

- `next-auth@5.0.0-beta.31` — auth JWT, PrismaAdapter
- `@prisma/client@7` avec `@prisma/adapter-pg` — ORM avec driver pg natif
- `next-intl` — i18n server + client
- `sonner` — toasts
- `react-hook-form` + `@hookform/resolvers` + `zod` — formulaires
- `stripe` — billing
- `@upstash/ratelimit` + `@upstash/redis` — rate limiting edge

## Scripts disponibles

```bash
pnpm dev           # demarrer le serveur
pnpm build         # build production
pnpm check         # lint + typecheck
pnpm db:migrate    # appliquer les migrations Prisma
pnpm db:seed       # seeder les donnees demo
pnpm db:studio     # ouvrir Prisma Studio
pnpm test          # tests unitaires Vitest
pnpm test:e2e      # tests Playwright
```

## Ce qui manque / decisions connues

- Booking page : les services demo ont un id "replace-with-service-id" — a remplacer par un vrai seed
- Sanity CMS : branche desactivee par defaut (FEATURE_CMS=false) — schema dans modules/cms/
- Pas de realtime — pour les notifications en temps reel, ajouter Supabase Realtime ou Pusher
- Dashboard stats : queries DB reelles dans dashboard/page.tsx mais necessite une DB seedee
