# Boilerplate Quality Audit
Branch: fix/boilerplate-quality-9
Date: 2026-06-30

## Etat actuel

### Ce qui fonctionne
- Component Variables System complet (factories, types, serialization, validation, visibility)
- ConfigurableFilterBar avec URL sync, defauts absents de l'URL, reset propre, focus-visible sur le bouton Effacer
- DualRangeSlider : drag souris, touch, clavier, inputs numeriques, ARIA complet (aria-label, aria-valuenow, aria-valuemin, aria-valuemax, focus-visible)
- Presets realEstate/auto/ecommerce/dashboard/apiPortal
- VariableRenderer dispatche par forme de valeur (slider, sort, dateRange, select, boolean, number, text/search)
- Select custom : ARIA combobox/listbox, focus-visible:ring
- 351 tests unitaires passent (32 fichiers)
- Build OK
- E2E : 34 tests chromium + mobile-chrome passent (17 par browser)

### Problemes trouves (baseline Lot 0)

| Fichier | Probleme | Priorite |
|---------|----------|----------|
| `dual-range-slider.tsx:112` | `e.target !== e.currentTarget` bloque les clics sur rail/fill | Lot 1 |
| `dual-range-slider.test.ts` | Tests purement logiques, pas de vrais tests React | Lot 2 |
| `use-url-sync.ts:23,93` | `varsRef.current = variables` pendant le render (lint) | Lot 0 -- corrige |
| `eslint.config.mjs` | `public/draco-gltf/*.js` lint errors (vendor) | Lot 0 -- corrige |
| `eslint.config.mjs` | `src/components/3d/**` setState-in-effect errors (hors scope) | Lot 0 -- corrige |
| `tests/e2e/` | Pas de tests sur pages filtres (showcase, real-estate, auto-blog) | Lot 4 |
| `playwright.config.ts` | Pas de projet mobile | Lot 4 |

### Risques

- `VariableProvider` : `defaultValues` useMemo a un tableau de deps vide intentionnel -- si variables change, les defauts ne se mettent pas a jour. Documenté, stable.
- `useAutoUrlSync` : ne saute pas les valeurs defaut (ecrit tout). Preferer `ConfigurableFilterBar` qui gere la logique propre.
- DualRangeSlider : pas de librairie externe (dependance zero). La track CSS est simple mais les thumbs peuvent etre difficiles a targeter sur mobile.

## Lots prevus

| Lot | Titre | Validation |
|-----|-------|-----------|
| 0 | Audit + lint baseline | lint + typecheck |
| 1 | DualRangeSlider click-track | lint + typecheck + test |
| 2 | Tests React Testing Library slider | lint + typecheck + test |
| 3 | ConfigurableFilterBar + URL sync renforce | lint + typecheck + test |
| 4 | Tests E2E Playwright + mobile | lint + typecheck + test + test:e2e |
| 5 | Polish visuel | lint + typecheck + test + build |
| 6 | Docs | lint + typecheck + test + build |
| 7 | Validation finale | toutes les commandes |

## Commandes de validation disponibles

```bash
pnpm lint         # eslint sur src/
pnpm typecheck    # tsc --noEmit
pnpm test         # vitest (351 tests, 32 fichiers)
pnpm build        # next build
pnpm test:e2e     # playwright chromium + mobile-chrome (34 tests)
```

## Pages critiques

| Page | Statut E2E |
|------|-----------|
| `/` | smoke.spec.ts |
| `/showcase` | variable-system.spec.ts (Lot 4) |
| `/demo/real-estate` | variable-system.spec.ts (Lot 4) |
| `/demo/auto-blog` | variable-system.spec.ts (Lot 4) |
| `/docs` | smoke.spec.ts |
| `/docs/api` | smoke.spec.ts |
| `/booking` | smoke.spec.ts |
| `/pricing` | smoke.spec.ts |
| `/dashboard/api-usage` | smoke.spec.ts |

## Validations par Lot

| Lot | Statut | Notes |
|-----|--------|-------|
| 0 | OK | lint + typecheck, baseline etabli |
| 1 | OK | DualRangeSlider click-track corrige |
| 2 | OK | 35 tests RTL sur DualRangeSlider |
| 3 | OK | stabilization.test.ts + 12 cas URL reset/search/sliderRange |
| 4 | OK | 34 tests E2E Playwright (chromium + Pixel 5), auto-blog migre vers autoVariables |
| 5 | OK | focus-visible Select, Effacer button, DualRangeSlider; ARIA complet |
| 6 | OK | Docs mises a jour |
| 7 | voir rapport final | |
