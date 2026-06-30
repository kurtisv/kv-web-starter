# Boilerplate Quality Audit
Branch: fix/boilerplate-quality-9
Date: 2026-06-30

## Etat actuel

### Ce qui fonctionne
- Component Variables System complet (factories, types, serialization, validation, visibility)
- ConfigurableFilterBar avec URL sync, defauts absents de l'URL, reset propre
- DualRangeSlider : drag souris, touch, clavier, inputs numeriques, ARIA
- Presets realEstate/auto/ecommerce/dashboard/apiPortal
- VariableRenderer dispatche par forme de valeur (slider, sort, dateRange, select, boolean, number, text/search)
- 299 tests unitaires passent
- Build OK (22s)

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
pnpm test         # vitest (299 tests)
pnpm build        # next build
pnpm test:e2e     # playwright (necessite serveur dev)
```

## Pages critiques a tester

| Page | Statut E2E |
|------|-----------|
| `/` | smoke.spec.ts |
| `/showcase` | a ajouter (Lot 4) |
| `/demo/real-estate` | a ajouter (Lot 4) |
| `/demo/auto-blog` | a ajouter (Lot 4) |
| `/docs` | smoke.spec.ts |
| `/docs/api` | smoke.spec.ts |
| `/booking` | smoke.spec.ts |
| `/pricing` | smoke.spec.ts |
| `/dashboard/api-usage` | smoke.spec.ts |

## Validations Lot 0

- pnpm lint : OK (apres fix vendor/3D ignore + useLayoutEffect use-url-sync)
- pnpm typecheck : OK
