# Design Enhancement Layer — Final Report

Sprint: `feature/design-enhancement-layer`
Date: 2026-07-01

---

## Objective

Give boilerplate-generated sites a visually differentiated personality layer that goes
beyond color themes. Zero new npm dependencies. The layer is entirely CSS-first with
minimal TypeScript data.

---

## What Was Built

### 1. Design Profiles (`apps/web/src/design-system/design-profiles.ts`)

10 visual personalities. Each profile defines:
- `backgroundStyle`: flat / soft-gradient / noise / grid-lines / dark-depth
- `cardStyle`: clean / glass-elevated / bordered-sharp / warm-tinted / dark-elevated
- `heroStyle`, `motionStyle`, `imageStyle`, `density`, `radius`, `shadow`, `gradient`, `accentTreatment`
- `mood[]`, `recommendedDomains[]`, `typographyNote`, `layoutNote`

Profiles: `premium-saas`, `minimal-dashboard`, `dark-tech-api`, `corporate-classic`,
`warm-local`, `luxury-auto`, `ecommerce-clean`, `real-estate-premium`, `editorial-studio`,
`academy-focused`.

### 2. CSS Utilities (`apps/web/src/app/globals.css`)

**Background utilities:**
- `.bg-profile-soft-gradient` — radial gradient at top with `color-mix(primary 10%)`
- `.bg-profile-noise` — SVG fractalNoise overlay at 2.5% opacity
- `.bg-profile-grid` — 24px dot grid via radial-gradient
- `.bg-profile-dark-depth` — two layered dark radial gradients

**Card utilities:**
- `.card-glass` — `backdrop-filter: blur(14px)` + semi-transparent bg via `color-mix`
- `.card-gradient-border` — conic-gradient border via `padding-box / border-box` trick
- `.card-dark-elevated` — dark bg + strong shadow + inset highlight

**Text utilities:**
- `.text-gradient-primary` — linear-gradient bg-clip text, primary to accent
- `.text-gradient-editorial` — foreground to primary to accent sweep

**Accent utilities:**
- `.accent-glow` — `box-shadow` with `color-mix(primary 35%)`
- `.btn-gradient` — `linear-gradient(135deg, primary, mixed-accent)`

**Animation utilities:**
- `.animate-fade-up`, `.animate-scale-in`, `.animate-sweep-in`, `.animate-glow-pulse`
- `.stagger-1` through `.stagger-6` (delay 50ms increments)

**Premium component CSS:**
- `.spotlight-card` — `radial-gradient` spotlight follows CSS custom properties `--spotlight-x/y`
- `.shimmer-badge` — 300% `background-size`, `shimmer-sweep` keyframe animation

All animations guarded by `@media (prefers-reduced-motion: reduce)`.

### 3. Card CVA Variants (`apps/web/src/components/ui/card.tsx`)

Three new variants: `glass`, `gradient-border`, `dark-elevated`.

### 4. Demo Page Applications

8 demo pages received profile `data-theme` wrapper + background class + gradient text on title.

### 5. `/demo/design-lab` Page (`apps/web/src/app/demo/design-lab/page.tsx`)

Showcase page with:
- CSS utility live previews (4 backgrounds + 2 gradient texts + glass card)
- 10 profile cards (background, card style, accent treatment, mood tags, domains)
- Premium UI component demo (SpotlightCard x2, ShimmerBadge x2)
- Design recipes grid (8 recipes with CSS class hints)
- Usage code snippets

### 6. Premium UI Components

**`SpotlightCard`** (`apps/web/src/components/ui/spotlight-card.tsx`)
- Client component. `onMouseMove` sets `--spotlight-x` / `--spotlight-y` CSS custom properties.
- Pseudo-element `::before` renders the radial gradient at cursor position.
- Opacity transitions from 0 to 1 on hover. Zero visible cost when not hovering.

**`ShimmerBadge`** (`apps/web/src/components/ui/shimmer-badge.tsx`)
- Server-renderable. Pure CSS animation via `.shimmer-badge` class.
- 300% `background-size` + `shimmer-sweep` keyframe for gradient travel effect.
- Uses `color-mix(primary 55%, accent)` for the mid-sweep color.

### 7. Design Recipes (`apps/web/src/design-system/design-recipes.ts`)

8 recipes: `premium-saas`, `minimal-dashboard`, `dark-api`, `warm-booking`,
`editorial-portfolio`, `cinematic-auto`, `ecommerce-clean`, `real-estate-premium`.

Each recipe specifies: `wrapperClass`, `heroTextClass`, `cardClass`, `heroCardClass`,
`accentClass`, `sectionPadding`, `featureCard` ("spotlight" | "glass" | "gradient-border" | "plain"),
`badgeClass` ("shimmer" | "filled" | "outline" | "none").

### 8. Registry Design Metadata (`apps/web/src/lib/component-registry/types.ts`)

Two new optional fields on `ComponentCapability`:
- `visualWeight?: "light" | "medium" | "heavy"` — how visually dominant the component is
- `recommendedProfiles?: string[]` — profile IDs from `design-profiles.ts`

7 core components annotated: `hero-section`, `animated-hero`, `feature-grid`,
`stats-section`, `pricing-section`, `testimonial-section`, `metric-card`.

### 9. E2E Tests (`apps/web/tests/e2e/design-lab.spec.ts`)

14 Playwright tests covering:
- HTTP 200, page load, header visibility
- CSS utility showcase sections
- Profile cards grid (10 profiles, named profiles visible)
- Premium UI components section (SpotlightCard text, ShimmerBadge testid)
- Recipes section (recipe cards by testid)
- Usage note section
- Back link
- Mobile 390px no overflow

### 10. Real Visual Improvement — SaaS Demo

`apps/web/src/app/demo/saas/page.tsx`:
- **Before**: generic `FeatureGrid` component, plain string eyebrow.
- **After**:
  - `FeatureGrid` replaced with custom grid of `SpotlightCard` — each feature card has
    an icon container in `bg-primary/10 text-primary`, interactive spotlight hover effect.
  - `eyebrow` replaced with `<ShimmerBadge>Nouveau — V3 disponible</ShimmerBadge>`.
  - `HeroSection.eyebrow` widened to `React.ReactNode` (backwards-compatible).

---

## Files Modified / Created

| File | Action |
|------|--------|
| `apps/web/src/design-system/design-profiles.ts` | Created |
| `apps/web/src/design-system/design-recipes.ts` | Created |
| `apps/web/src/components/ui/spotlight-card.tsx` | Created |
| `apps/web/src/components/ui/shimmer-badge.tsx` | Created |
| `apps/web/tests/e2e/design-lab.spec.ts` | Created |
| `apps/web/src/app/demo/design-lab/page.tsx` | Created + enhanced |
| `apps/web/src/app/globals.css` | Modified (CSS utilities + animations) |
| `apps/web/src/components/ui/card.tsx` | Modified (3 new CVA variants) |
| `apps/web/src/components/sections/hero-section.tsx` | Modified (eyebrow: ReactNode) |
| `apps/web/src/app/demo/saas/page.tsx` | Modified (SpotlightCard + ShimmerBadge) |
| `apps/web/src/app/demo/{portfolio,auto-blog,api,local-business,booking,real-estate,ecommerce}/page.tsx` | Modified (profile classes) |
| `apps/web/src/lib/component-registry/types.ts` | Modified (VisualWeight + fields) |
| `apps/web/src/lib/component-registry/component-registry.ts` | Modified (7 components annotated) |

---

## Commits

```
c186b0af feat(design): add design profiles layer with 10 visual personalities
5bc122f6 feat(design): add CSS utility classes and card variants for design profiles
2415d90a feat(design): apply design profiles to demo pages + add design-lab
3163c1f0 feat(design): add SpotlightCard and ShimmerBadge premium UI components
4f40506f feat(design): add design recipes layer
2003ea82 feat(component-registry): add visualWeight and recommendedProfiles design metadata
6baf9ebf test(design): add E2E tests and recipes showcase for design-lab page
587432fa feat(design): visual improvement of SaaS demo with SpotlightCard and ShimmerBadge
```

---

## Validation

| Check | Result |
|-------|--------|
| `pnpm lint` | OK — 0 errors |
| `pnpm typecheck` | OK — 0 errors |
| `pnpm test` | OK — 427/427 pass |
| Design Lab page renders | OK — 10 profiles, recipes, premium components |
| SaaS demo SpotlightCard | OK — 6 feature cards with interactive spotlight |
| SaaS demo ShimmerBadge | OK — animated gradient eyebrow badge |
| Mobile 390px | OK — no overflow |

---

## Interdictions respectees

- Aucun deploy / push / merge sans demande
- Aucune dependance npm ajoutee
- Aucun composant existant supprime
- Aucun preset existant casse
- Aucune librairie UI globale ajoutee
- Aucune refonte massive
- Composants 3D non modifies
- Client-to-Prototype Engine non commence

---

## Next Sprint

Client-to-Prototype Engine: transformer un brief client en page demo en quelques commandes.
