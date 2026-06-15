# kv-web-starter

**Un boilerplate Next.js 16. 9 identites de projet.**

Reservations, SaaS, portfolio, e-commerce, immobilier — chaque preset reconfigure le theme, la navigation et la logique produit. Clone, personnalise, livre en jours.

**[Voir la galerie de demos →](/demo)**

---

## Stack

| Categorie | Technologie |
|---|---|
| Framework | Next.js 16 App Router, React 19, TypeScript strict |
| Style | Tailwind v4, CSS variables, 7 themes via `data-theme` |
| Auth | Auth.js v5 — JWT sessions, GitHub OAuth, credentials, Prisma adapter |
| Base de donnees | PostgreSQL + Prisma 7, adapter `pg` |
| Paiements | Stripe — checkout, abonnements, webhooks, portail client |
| Emails | Resend + React Email — templates TSX transactionnels |
| Rate limit | Upstash Redis — sliding window sur les routes API |
| Monitoring | Sentry — erreurs client et serveur |
| i18n | next-intl — EN/FR, 8 namespaces, Server + Client components |
| Tests | Vitest (50 tests unitaires) + Playwright e2e |
| Composants | Storybook 8 — 6 stories avec theme switcher |

---

## 9 presets de projet

| Preset | Theme | Ce que ca montre |
|---|---|---|
| `portfolio` | corporate-classic | Vitrine developpeur, etudes de cas |
| `saas` | premium-saas | Plateforme avec abonnements et analytics |
| `booking` | local-business | Agenda en ligne, paiement a la reservation |
| `api` | dark-tech-api | Acces payant par cles API, rate limit |
| `real-estate` | real-estate | Annonces, scores quartier, rendements |
| `local-business` | local-business | Vitrine + services + avis clients |
| `auto-blog` | luxury-auto | Magazine + catalogue vehicules |
| `ecommerce` | ecommerce-clean | Boutique avec panier |
| `dashboard` | premium-saas | Interface admin, metriques temps reel |

Chaque preset est defini dans `apps/web/src/config/project-presets.ts` et applique via `NEXT_PUBLIC_PROJECT_TYPE`.

---

## Demarrage rapide

```bash
git clone https://github.com/kurtisv/kv-web-starter my-project
cd my-project
pnpm install
cp apps/web/.env.example apps/web/.env
docker compose up -d        # PostgreSQL local
pnpm db:generate
pnpm db:push
pnpm dev                    # http://localhost:3000
```

**Acces demo local**

```
Email:    admin@example.com
Password: password123
```

Desactiver avant toute mise en production : `AUTH_ENABLE_DEMO_LOGIN=false`.

---

## Variables d'environnement

```bash
# Toujours requises
DATABASE_URL=postgresql://...
AUTH_SECRET=<openssl rand -base64 32>
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Auth OAuth (optionnel)
AUTH_GITHUB_ID=...
AUTH_GITHUB_SECRET=...

# Stripe (optionnel si FEATURE_BILLING=true)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PRICE_PRO=price_...
NEXT_PUBLIC_STRIPE_PRICE_BUSINESS=price_...

# Emails (optionnel)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=no-reply@exemple.com

# Rate limiting (optionnel)
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

---

## Scripts

```bash
pnpm dev              # Dev server (port 3000)
pnpm build            # Prisma generate + next build
pnpm check            # lint + typecheck + tests
pnpm test             # Vitest (unitaire)
pnpm test:e2e         # Playwright (e2e, necessite DB)
pnpm storybook        # Storybook (port 6006)
pnpm db:push          # Push schema vers DB (dev)
pnpm db:migrate       # Migration avec snapshot
pnpm create:new       # Copier en nouveau projet
```

---

## Structure

```
apps/web/src/
  app/                  Pages Next.js (thin — logique dans modules/ et lib/)
  components/
    ui/                 Primitives (Button 12v, Card, Badge, EmptyState...)
    sections/           Blocs page (HeroSection, PricingSection, FeatureGrid...)
    dashboard-ui/       Dashboard (DashboardShell, MetricCard, ActivityFeed...)
    layout/             Helpers (SectionHeader, PageContainer)
    marketing/          Shell, Navbar, Footer
  design-system/
    tokens.ts           Source de verite : THEMES, THEME_META, SPACING...
  config/
    project-presets.ts  9 presets (type, theme, nav, cta, modules)
    site.ts             Nom, nav, footer, CTA
  modules/
    billing/            Stripe checkout, webhooks, entitlements
    booking/            Disponibilites, slots, reservations
    api-portal/         Cles API, rate limit, usage
  lib/
    auth.ts / auth.config.ts   Auth.js v5
    db.ts               Singleton Prisma
    env.ts              Schema Zod des variables d'environnement
prisma/schema.prisma    Schema PostgreSQL (User, Booking, ApiKey, Subscription)
.claude/
  skills/               Procedures reutilisables pour agents IA
  agents/               Configs agents specialises
```

---

## Checklist avant deploy

- [ ] `AUTH_SECRET` defini et `AUTH_ENABLE_DEMO_LOGIN=false`
- [ ] `DATABASE_URL` pointe vers la DB de production
- [ ] Migration executee : `pnpm db:migrate`
- [ ] `DASHBOARD_BOOTSTRAP_EMAILS` contient l'email admin
- [ ] Webhook Stripe enregistre avec `STRIPE_WEBHOOK_SECRET`
- [ ] `NEXT_PUBLIC_APP_URL` pointe vers le domaine de production
- [ ] `pnpm build` passe sans erreur en local
