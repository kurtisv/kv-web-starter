# Architecture — kv-web-starter

## Vue d'ensemble

kv-web-starter est un monorepo pnpm avec une architecture modulaire. Chaque module encapsule sa logique metier, ses tests, et ses types. Les pages Next.js sont intentionnellement minces — elles deleguent a `lib/` et `modules/`.

## Arborescence annotee

```
kv-web-starter/
  apps/
    web/                           Application Next.js principale
      src/
        app/                       Routing Next.js App Router
          api/
            auth/[...nextauth]/    Handler Auth.js (OAuth callbacks, JWT)
            v1/                    API publique versionnee
              demo/                Endpoint de demonstration (reference)
            webhooks/stripe/       Webhook Stripe (verification signature)
            health/                Health check endpoint
            openapi/               Spec OpenAPI (Scalar UI)
          dashboard/               Pages protegees (OWNER/ADMIN uniquement)
          booking/                 Flux de reservation public
          pricing/                 Page tarifs
          login/                   Page connexion + formulaire client
          actions/                 Server Actions (auth, billing, booking, api-keys)
        components/
          ui/                      Primitives UI legeres (pas de Radix complet)
          marketing/               Composants pages publiques
          dashboard/               Composants dashboard (sidebar, mobile-nav, header)
          providers/               Providers React (toast)
        design-system/
          tokens.ts                Constantes de design (breakpoints, spacing, typography)
        lib/
          auth.config.ts           Config NextAuth edge-safe (pour middleware)
          auth.ts                  Config NextAuth complete (adapter Prisma + providers)
          auth-host.ts             Helper trustHost (multi-env)
          dashboard-auth.ts        Guard OWNER/ADMIN + bootstrap organisation
          dashboard-auth-rules.ts  Fonctions pures pour les regles d'acces
          db.ts                    Singleton Prisma avec PrismaPg adapter
          env.ts                   Schema Zod variables d'environnement
          billing/stripe.ts        Instance Stripe (null si non configure)
          security/api-keys.ts     Hashing et validation API keys
          proxy.ts                 Proxy pour tests locaux
          utils.ts                 cn() et autres helpers
        modules/                   Logique metier par domaine
          api-portal/
            access.ts              Auth des requetes API (demo + database)
            db-access.ts           Queries Prisma pour l'API portal
            management.ts          CRUD cles API (creation, revocation)
            rate-limit.ts          Rate limiting Upstash sliding window
            usage.ts               Tracking usage API
            index.ts               Re-exports publics du module
          billing/
            checkout.ts            Schema plan + helper priceId
            entitlements.ts        hasPlanEntitlement(), planRanks
            webhook.ts             Parsing events Stripe (subscription lifecycle)
            index.ts               Re-exports publics du module
          booking/
            availability.ts        generateBookingSlots() — calcul creneaux
            reservation.ts         Creation et validation reservations
            management.ts          CRUD services, staff, disponibilites
            index.ts               Re-exports publics du module
          cms/
            sanity-schemas.ts      Schemas Sanity (actifs si FEATURE_CMS=true)
            index.ts               Re-exports publics du module
        i18n/
          config.ts                Locales, defaultLocale, helpers
          messages.ts              Aggregateur messages
          messages/en.ts           Traductions anglaises
          messages/fr.ts           Traductions francaises
          request.ts               next-intl getRequestConfig
        emails/                    Templates React Email
          booking-confirmation.tsx
          contact-confirmation.tsx
        middleware.ts              Security headers + auth guard /dashboard/*
  packages/
    types/                         Types partages @kv/types
      src/index.ts                 BillablePlan, CheckoutPlan, RoleType...
  prisma/
    schema.prisma                  Schema PostgreSQL unique
    seed.ts                        Donnees initiales (services, staff demo)
    migrations/                    Historique migrations SQL
  .claude/
    skills/                        Procedures AI reutilisables
    agents/                        Configs agents specialises
  .github/
    workflows/
      ci.yml                       Lint + typecheck + tests + e2e
      security.yml                 Audit dependances
      codeql.yml                   Analyse securite statique
  docs/
    ARCHITECTURE.md                Ce fichier
    QA-CHECKLIST.md                Checklist qualite avant livraison
    decisions/                     ADRs (Architecture Decision Records)
  scripts/
    create-new-project.ps1         Clone le boilerplate pour un nouveau projet
```

## Flux d'authentification

```
Request -> middleware.ts
           |
           +-- JWT valide? Non --> redirect /login
           |
           +-- Oui --> SecurityHeaders injectes --> Response
                       |
                       (Si /dashboard/*)
                       |
                       Page Server Component
                       |
                       requireDashboardAccess()
                       |
                       +-- Membership OWNER/ADMIN? Oui --> { userId, organizationId, role }
                       |
                       +-- Premier user en dev / email bootstrap? --> Upsert OWNER
                       |
                       +-- Non --> redirect /dashboard?error=forbidden
```

## Flux API publique

```
Request GET /api/v1/* 
  -> authenticateApiRequest()
     |
     +-- Demo keys (env.API_DEMO_KEYS)? -> access.source = "demo"
     |
     +-- Bearer token -> prefix lookup -> hash compare -> access.source = "database"
     |
     +-- Invalide -> 401
  -> hasPlanEntitlement() (si endpoint le requiert) -> 402 si insuffisant
  -> limitApiRequest() (Upstash) -> 429 si depasse
  -> Logique metier
  -> ApiUsage.create() (async, non-bloquant)
  -> Response { data: ... }
```

## Decisions techniques

Voir `docs/decisions/` pour les ADRs complets.

| Decision | Choix | Alternatives ecartees |
|---|---|---|
| Session strategy | JWT | Database sessions |
| Prisma adapter | PrismaPg (driver natif pg) | Prisma standard (via connection string) |
| Feature flags | Variables d'environnement | Table DB, fichier JSON |
| Rate limiting | Upstash Redis (edge-compatible) | Redis conventionnel, middleware IP ban |
| Emails | Resend + React Email | Nodemailer, SendGrid |
| UI components | Minimal custom (pas de Radix complet) | shadcn/ui complet, Chakra, MUI |
| i18n | next-intl (EN/FR) | next-i18next, react-i18next |
| Monorepo | pnpm workspaces | Turborepo, Nx |

## Conventions de code

### Server vs Client components
- **Par defaut : Server Component.** Ne pas ajouter `"use client"` sans raison.
- **Client Component si** : hooks React (useState, useEffect, usePathname), events browser, acces `window`/`document`.
- **Server Actions** : dans `app/actions/<domaine>.ts`, importees dans les composants client via `await action(formData)`.

### Nommage
- Fonctions exportees : camelCase pour fonctions pures, PascalCase pour composants
- Fichiers : kebab-case (`api-key-form.tsx`, `rate-limit.ts`)
- Types : PascalCase (`BillablePlan`, `SubscriptionEntitlement`)

### Tests
- Tests unitaires colocaux : `fichier.test.ts` a cote de `fichier.ts`
- Tests E2E dans `apps/web/tests/e2e/`
- Pas de mock de la base de donnees pour les modules DB — tester avec vraie DB

## Extension du boilerplate

Pour un nouveau projet base sur ce boilerplate :
```powershell
pnpm create:new
# Demande: Name (slug du projet), Destination (chemin), AppName (affichage)
```

Le script copie le boilerplate, renomme le package et la DB dans le .env.example.
