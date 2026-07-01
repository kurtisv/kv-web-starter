# Design Recipe — Profile Alignment Audit

Date: 2026-07-01
Branch: fix/design-recipe-profile-alignment

---

## Namespaces — two different ID systems

This codebase has two distinct identifier systems that were confused during the sprint:

| System | Defined in | Used for |
|--------|-----------|---------|
| **Theme IDs** | `design-system/tokens.ts` — `THEMES` array | `data-theme="..."` HTML attribute, CSS variable scopes |
| **Profile IDs** | `design-system/design-profiles.ts` — `DESIGN_PROFILES` keys | `DesignRecipe.profileId`, `ComponentCapability.recommendedProfiles` |

Theme IDs: `corporate-classic`, `premium-saas`, `luxury-auto`, `local-business`,
`real-estate`, `ecommerce-clean`, `dark-tech-api`

Profile IDs: `premium-saas`, `minimal-dashboard`, `luxury-editorial`, `warm-local`,
`dark-technical`, `commerce-clean`, `academy-premium`, `auto-performance`,
`real-estate-luxe`, `creative-portfolio`

**The bug:** `design-recipes.ts` and `component-registry.ts` used Theme IDs where
Profile IDs were required.

---

## Real Profile IDs (source of truth: design-profiles.ts)

| ID | Label | recommendedDomains |
|----|-------|-------------------|
| `premium-saas` | Premium SaaS | saas, dashboard |
| `minimal-dashboard` | Minimal Dashboard | dashboard |
| `luxury-editorial` | Luxury Editorial | portfolio, agency, editorial |
| `warm-local` | Warm Local | local-business, booking, restaurant, spa |
| `dark-technical` | Dark Technical | api, developer, devtools |
| `commerce-clean` | Commerce Clean | ecommerce |
| `academy-premium` | Academy Premium | academy, saas, learning |
| `auto-performance` | Auto Performance | auto-blog, automotive, luxury |
| `real-estate-luxe` | Real Estate Luxe | real-estate |
| `creative-portfolio` | Creative Portfolio | portfolio |

---

## Recipe profileId Audit

| Recipe ID | profileId (before) | Exists? | Correct profileId |
|-----------|-------------------|---------|-------------------|
| `premium-saas` | `premium-saas` | YES | — no change |
| `minimal-dashboard` | `minimal-dashboard` | YES | — no change |
| `dark-api` | `dark-tech-api` | **NO** (theme ID) | `dark-technical` |
| `warm-booking` | `warm-local` | YES | — no change |
| `editorial-portfolio` | `corporate-classic` | **NO** (theme ID) | `creative-portfolio` |
| `cinematic-auto` | `luxury-auto` | **NO** (theme ID) | `auto-performance` |
| `ecommerce-clean` | `ecommerce-clean` | **NO** (theme ID) | `commerce-clean` |
| `real-estate-premium` | `real-estate-premium` | **NO** (neither) | `real-estate-luxe` |

**5 recipes broken out of 8.**

---

## Component Registry recommendedProfiles Audit

| Component | Wrong IDs | Corrected to |
|-----------|-----------|-------------|
| `hero-section` | `dark-tech-api`, `corporate-classic` | `dark-technical`, `creative-portfolio` |
| `animated-hero` | `corporate-classic` | `creative-portfolio` |
| `feature-grid` | `dark-tech-api` | `dark-technical` |
| `stats-section` | `dark-tech-api` | `dark-technical` |
| `testimonial-section` | `corporate-classic` | `luxury-editorial` |
| `metric-card` | `dark-tech-api` | `dark-technical` |

**7 entries corrected across 6 components.**

---

## Files NOT touched (correct usage of Theme IDs)

- `design-system/tokens.ts` — defines theme IDs, correct
- `config/project-presets.ts` — uses `theme: "dark-tech-api"` etc., correct (theme namespace)
- `app/demo/*/page.tsx` — uses `data-theme="luxury-auto"` etc., correct (theme namespace)
- `README.md`, `ARCHITECTURE.md`, `CLAUDE.md` — reference theme IDs, correct

---

## Files to Update

1. `apps/web/src/design-system/design-recipes.ts` — 5 profileId corrections
2. `apps/web/src/lib/component-registry/component-registry.ts` — 7 recommendedProfiles corrections
3. `docs/design-enhancement-layer-report.md` — correct profile IDs cited in report
4. `apps/web/src/design-system/design-recipes.test.ts` — new unit tests validating all profileId references

---

## Tests to Add

- All `profileId` values in `DESIGN_RECIPES` must exist as keys in `DESIGN_PROFILES`
- All `recommendedProfiles` values in `COMPONENT_REGISTRY` entries must exist in `DESIGN_PROFILES`
- `getRecipeForPreset()` returns a recipe with a valid profileId for each known preset
