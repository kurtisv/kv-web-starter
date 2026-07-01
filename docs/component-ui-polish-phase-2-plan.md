# Component UI Polish — Phase 2 Plan

**Branche:** `feature/component-ui-polish-phase-2`
**Baseé sur:** `feature/frontend-experience-system` (Phase 1 incluse)
**Date:** 2026-07-01

---

## Composants a modifier

### P0 — Core UI Primitives (Lot 1)

| Composant | Fichier | Ameliorations |
|-----------|---------|---------------|
| Button | `ui/button.tsx` | Prop `loading` + spinner, `leftIcon`/`rightIcon`, `fullWidth` |
| Badge | `ui/badge.tsx` | Variant `info`, border-radius sur base, outline clean |
| Input | `ui/input.tsx` | Rounded, error state via `data-error`/`aria-invalid`, refactor focus |
| Card | `ui/card.tsx` | Variants `interactive`, `subtle`; focus-visible si clickable |
| EmptyState | `ui/empty-state.tsx` | Variant prop (card, muted, destructive, success) |
| LoadingState | `ui/loading-state.tsx` | Variant prop, reduced-motion support |

### P1 — Marketing Sections (Lot 2)

| Composant | Fichier | Ameliorations |
|-----------|---------|---------------|
| HeroSection | `sections/hero-section.tsx` | Slot `trustBar`, prop `size` (compact/default/large) |
| CTASection | `sections/cta-section.tsx` | Prop `eyebrow`, variant `gradient` |
| FeatureGrid | `sections/feature-grid.tsx` | Prop `cardVariant`, variant `spotlight` via SpotlightCard |

### P1 — Domain Cards (Lot 3)

| Composant | Fichier | Ameliorations |
|-----------|---------|---------------|
| MetricCard | `dashboard-ui/metric-card.tsx` | Trend semantique, loading state |
| ProductCard | `ecommerce/product-card.tsx` | Hover premium, image alt enforced |
| PropertyCard | `real-estate/property-card.tsx` | Prix dominant, badge statut via StatusBadge |

### P2 — Reusable States (Lot 5)

| Composant | Fichier | Action |
|-----------|---------|--------|
| ErrorState | `ui/error-state.tsx` | CREER — parallele a EmptyState |
| SuccessState | `ui/success-state.tsx` | CREER — feedback positif |

### P2 — Showcase (Lot 6)

| Route | Fichier | Action |
|-------|---------|--------|
| `/showcase/component-ui-polish` | `app/showcase/component-ui-polish/page.tsx` | CREER |

---

## Composants a ne pas toucher

- Tous les composants 3D (`r3f/`, `canvas/`)
- `animated-hero.tsx` (framer-motion, stable)
- `stats-section.tsx` (InView, bon etat)
- `pricing-section.tsx` (fonctionnel, hors scope)
- `testimonial-section.tsx` (stable)
- `dashboard-shell.tsx` (recement ameliore)
- `activity-feed.tsx` (recement ameliore)
- `data-table.tsx` (loading prop present)
- `configurable-filter-bar.tsx` (URL sync, fragile)

---

## Standards Phase 1 appliques

- `ui-quality-levels.ts` — qualite cible: "polished" / "premium"
- `frontend-patterns.ts` — patterns: hero-trust-bar, feature-bento-metrics, dashboard-metrics-activity
- `component-experience-standard.md` — 10 standards: visual hierarchy, UX clarity, a11y, responsive, state coverage, feedback, conversion, consistency, performance perception, agent reusability
- `frontend-design-agent-rules.md` — Regle 1: selectionner profil avant composant; Regle 4: reduced-motion; Regle 5: mobile-first

---

## Patterns concernes

- `hero-trust-bar` — HeroSection + LogoCloud + ShimmerBadge
- `feature-bento-metrics` — FeatureGrid + StatsSection
- `dashboard-metrics-activity` — MetricCard + ActivityFeed + DataTableShell
- `product-grid-filter-drawer` — ConfigurableFilterBar + ProductCard
- `booking-flow-confirmation` — ServicePicker + BookingSummaryCard
- `empty-state-recovery` — EmptyState + DataTableShell
- `error-state-recovery` — ErrorState (nouveau) + DataTableShell
- `loading-skeleton-page` — LoadingState + SkeletonCard

---

## Tests a faire

- Lint: 0 erreurs
- Typecheck: clean
- Vitest: 474+ pass
- Build: clean
- E2E: `/showcase/component-ui-polish` charge, sections visibles

---

## Ordre d'execution

1. Lot 1 — Core UI primitives (Button, Badge, Input, Card, EmptyState, LoadingState)
2. Lot 2 — Sections marketing (HeroSection, CTASection, FeatureGrid)
3. Lot 3 — Cards domaine (MetricCard, ProductCard, PropertyCard)
4. Lot 5 — Nouveaux states (ErrorState, SuccessState)
5. Lot 6 — Showcase page
6. Lot 7 — Registry update
7. Lot 8 — E2E tests
8. Lot 9 — Score
9. Lot 10 — Rapport final

---

## Risques

| Risque | Severite | Mitigation |
|--------|----------|-----------|
| Button loading casse les tests existants | Moyen | Prop optionnelle, default false |
| Input error state casse les mocks | Faible | Passe par data-attr, pas de ref |
| FeatureGrid spotlight casse les tests | Faible | Nouveau variant, pas de changement aux existants |
| EmptyState variant casse les usages existants | Faible | Default = comportement actuel |
| PropertyCard StatusBadge import nouveau | Faible | StatusBadge existe deja dans le registry |
