@AGENTS.md

# kv-web-starter — Guide pour agents IA

Boilerplate professionnel pour SaaS, vitrines, dashboards, API publiques et portfolios.
Stack : Next.js 16 App Router, TypeScript strict, Prisma + PostgreSQL, Auth.js v5 (JWT), Stripe, Resend, Upstash Redis, next-intl (EN/FR), Sentry, Tailwind v4.

---

## Architecture du projet

```
kv-web-starter/
  apps/web/src/
    app/                   — Pages Next.js (thin — logique dans modules/ et lib/)
      api/                 — Routes API (auth, webhooks, v1/*)
      dashboard/           — Pages protegees (OWNER/ADMIN uniquement)
      actions/             — Server Actions (auth.ts, billing.ts, booking.ts, api-keys.ts)
    components/
      ui/                  — Primitives (button 12v/6s, card variants, badge variants, EmptyState, LoadingState, ThemePreviewCard...)
      sections/            — Blocs de page reutilisables (HeroSection, FeatureGrid, PricingSection, TestimonialSection...)
      dashboard-ui/        — Composants dashboard (DashboardShell, MetricCard, ActivityFeed, DataTableShell)
      layout/              — Layout helpers (SectionHeader, PageContainer)
      marketing/           — Composants pages publiques (navbar, footer, page-shell)
      dashboard/           — Composants dashboard nav (sidebar, mobile-nav, header, nav-item)
      providers/           — Providers React (toast-provider)
    design-system/
      tokens.ts            — Source de verite : BREAKPOINTS, SPACING, TYPOGRAPHY, THEMES (7), THEME_META
    lib/
      auth.config.ts       — Config NextAuth edge-compatible (middleware uniquement)
      auth.ts              — Config NextAuth complete (adapter Prisma + providers)
      auth-host.ts         — Logique trustHost
      dashboard-auth.ts    — requireDashboardAccess() — guard OWNER/ADMIN + bootstrap org
      dashboard-auth-rules.ts — isDashboardRole(), canBootstrapDashboard()
      db.ts                — Singleton Prisma avec PrismaPg adapter
      env.ts               — Schema Zod pour toutes les variables d'environnement
      billing/stripe.ts    — Instance Stripe (null si non configure)
      security/api-keys.ts — Hashing et validation des cles API
    modules/               — Logique metier par domaine
      api-portal/          — Authentification API, rate limit, usage tracking
      billing/             — Stripe checkout, webhook, entitlements
      booking/             — Disponibilites, slots, reservations
      cms/                 — Schemas Sanity (actif si FEATURE_CMS=true)
    i18n/                  — next-intl : config, messages EN/FR, request.ts
    emails/                — Templates React Email (booking-confirmation, contact)
    middleware.ts          — Security headers + protection /dashboard/* (edge)
  prisma/
    schema.prisma          — Schema PostgreSQL (User, Booking, ApiKey, Subscription...)
  packages/
    types/                 — Types partages @kv/types (BillablePlan, CheckoutPlan...)
  .claude/
    skills/                — Procedures reutilisables pour taches courantes
    agents/                — Configs d'agents specialises (security, db, api-contract)
  docs/
    ARCHITECTURE.md        — Documentation complete de l'architecture
    QA-CHECKLIST.md        — Checklist QA avant livraison
    decisions/             — ADRs (Architecture Decision Records)
```

---

## Feature Flags

Controles via variables d'environnement dans `lib/env.ts` :

| Flag | Defaut | Active |
|---|---|---|
| `FEATURE_BOOKING` | `true` | Module rendez-vous complet |
| `FEATURE_API_PORTAL` | `true` | Cles API, usage, rate limit |
| `FEATURE_BILLING` | `true` | Stripe checkout + portal |
| `FEATURE_CMS` | `false` | Schemas Sanity + client |

Pour ajouter un flag : voir `.claude/skills/add-feature-flag.md`.

---

## Acces dashboard

Flux d'autorisation :
1. `middleware.ts` : JWT valide ? Sinon -> `/login`
2. `lib/dashboard-auth.ts::requireDashboardAccess()` : role OWNER ou ADMIN ? Sinon -> `/dashboard?error=forbidden`
3. Bootstrap automatique : premier utilisateur en dev OU email dans `DASHBOARD_BOOTSTRAP_EMAILS` -> role OWNER cree

---

## Scripts disponibles

Depuis la racine du monorepo :

```bash
pnpm dev              # Next.js dev server (port 3000)
pnpm build            # Prisma generate + next build
pnpm lint             # ESLint
pnpm typecheck        # tsc --noEmit
pnpm test             # Vitest (tests unitaires)
pnpm test:e2e         # Playwright (e2e, necessite DB)
pnpm check            # lint + typecheck + test
pnpm db:generate      # Genere le client Prisma
pnpm db:validate      # Valide schema.prisma
pnpm db:push          # Push schema vers DB (dev uniquement)
pnpm db:migrate       # Migration dev avec snapshot
pnpm db:seed          # Seed initial
pnpm format           # Prettier sur tout le projet
```

Docker pour la DB locale :
```bash
docker compose up -d  # PostgreSQL sur port 5432
```

Cloner pour un nouveau projet :
```powershell
pnpm create:new  # powershell — demande Name et Destination
```

---

## Conventions

### Fichiers
- Pages : `app/<route>/page.tsx` — Server Component par defaut
- Composants client : `"use client"` uniquement si useState/useEffect/hooks browser
- Actions : `app/actions/<domaine>.ts` avec `"use server"`
- Logique metier : `modules/<domaine>/` avec tests `.test.ts` colocaux

### Types
- Types partages inter-modules : `packages/types/src/index.ts` (`@kv/types`)
- Types Prisma : importes depuis `@/generated/prisma`
- Types locaux : dans le fichier qui les utilise

### Formulaires
- Client-side validation : `react-hook-form` + `zodResolver`
- Submit : Server Action via `onSubmit` handler ou `form action`
- Feedback : `sonner` toast pour succes/erreur

### i18n
- Tous les textes UI passent par `next-intl`
- Server components : `const t = await getTranslations("Namespace")`
- Client components : `const t = useTranslations("Namespace")`
- Namespace existants : `app`, `nav`, `booking`, `Dashboard`, `Auth`, `Billing`, `Common`, `Errors`

### Base de donnees
- Ne JAMAIS exposer le client Prisma dans les composants client
- Toujours utiliser `requireDashboardAccess()` avant une query dans une page dashboard
- Logique DB complexe : dans `modules/<domaine>/db-access.ts`

---

## Design system — regles absolues

1. Ne JAMAIS hardcoder de couleurs dans les composants (`#ffffff`, `text-green-500`, `bg-red-600`...)
2. Utiliser TOUJOURS les utilitaires Tailwind lies aux variables CSS : `text-primary`, `bg-muted`, `border-border`
3. Nouveaux composants : accepter un prop `variant` ou `className` — pas de style fixe en dur
4. Chaque composant doit etre mobile-first et accessible (role, aria, focus-visible)
5. Ne pas dupliquer de composants : verifier `components/sections/`, `dashboard-ui/`, `ui/` avant d'en creer un
6. Pour changer de theme sur une page : `<div data-theme="luxury-auto">...</div>`
7. Presets de projet dans `config/project-presets.ts` — utiliser `getProjectPreset()` pour adapter nav/cta/theme
8. `globals.css` contient les 7 themes et la couche `@theme inline` — ne pas toucher sans mise a jour de `tokens.ts`

---

## Checklist avant commit

- [ ] `pnpm typecheck` passe (0 erreur)
- [ ] `pnpm lint` passe (0 warning)
- [ ] `pnpm test` passe
- [ ] Aucune donnee hardcodee (remplacer par query DB ou variable d'env)
- [ ] Toutes les chaines UI passent par `next-intl` (pas de texte en dur)
- [ ] Les nouvelles pages dashboard appellent `requireDashboardAccess()`
- [ ] Les nouvelles routes API utilisent `authenticateApiRequest()` ou `auth()`
- [ ] `pnpm build` passe en local

---

## Checklist avant deploy

- [ ] `AUTH_SECRET` defini dans les secrets de deploiement
- [ ] `AUTH_ENABLE_DEMO_LOGIN=false` en production
- [ ] `DATABASE_URL` pointe vers la DB de production
- [ ] Variables Stripe configurees (si FEATURE_BILLING=true)
- [ ] Webhook Stripe enregistre avec `STRIPE_WEBHOOK_SECRET`
- [ ] `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN` configures (si monitoring)
- [ ] `DASHBOARD_BOOTSTRAP_EMAILS` contient l'email admin
- [ ] Migration de production executee : `pnpm db:migrate`

---

## Modules — guide rapide

### Billing (Stripe)
- Checkout : `app/actions/billing.ts::createCheckoutSession()`
- Portal client : `app/actions/billing.ts::createBillingPortalSession()`
- Webhook : `app/api/webhooks/stripe/route.ts`
- Entitlements : `modules/billing/entitlements.ts::hasPlanEntitlement()`
- Plans : FREE, PRO, BUSINESS, ENTERPRISE

### Booking
- Disponibilites : `modules/booking/availability.ts::generateBookingSlots()`
- Reservations : `modules/booking/reservation.ts`
- Management : `modules/booking/management.ts`

### API Portal
- Auth : `modules/api-portal/access.ts::authenticateApiRequest()`
- Rate limit : `modules/api-portal/rate-limit.ts` (Upstash sliding window)
- Usage : `modules/api-portal/usage.ts`
- Demo endpoint : `app/api/v1/demo/route.ts` (reference pour creer des endpoints)

### CMS (Sanity — inactif par defaut)
- Schemas : `modules/cms/sanity-schemas.ts`
- Activer : `FEATURE_CMS=true` + configurer le client Sanity + installer `@sanity/client`

---

## Variables d'environnement — obligatoires vs optionnelles

### Toujours requises en production
```
DATABASE_URL              PostgreSQL connection string
AUTH_SECRET               Clé JWT (openssl rand -base64 32)
NEXT_PUBLIC_APP_URL       URL publique de l'app
```

### Requises par feature
```
AUTH_GITHUB_ID + AUTH_GITHUB_SECRET    OAuth GitHub
STRIPE_SECRET_KEY + STRIPE_WEBHOOK_SECRET + prix   Billing
RESEND_API_KEY + RESEND_FROM_EMAIL     Emails transactionnels
UPSTASH_REDIS_REST_URL + TOKEN         Rate limiting
```

### Optionnelles
```
SENTRY_ORG + SENTRY_PROJECT + SENTRY_AUTH_TOKEN    Monitoring
DASHBOARD_BOOTSTRAP_EMAILS                          Bootstrap admin email
API_DEMO_KEYS                                       Cles demo pour l'API
```
