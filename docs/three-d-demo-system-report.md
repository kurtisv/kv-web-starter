# 3D Demo System - Rapport final (Lot 9)

Date: 2026-07-02
Branche: `feature/three-d-demo-system` (commits locaux uniquement, rien n'est pousse)

## 1. Objectif

Transformer les dependances 3D deja presentes (`three`,
`@react-three/fiber`, `@react-three/drei`) en vraie capacite produit: une
fondation reutilisable pour des sites 3D professionnels, deux demos de
reference, une politique d'assets, l'integration au demo index / component
registry / prototype engine, des tests et une documentation.

## 2. Inspirations analysees

Patterns extraits (aucun site copie):

- **Product showroom** (Sketchfab viewer, model-viewer, pages produit
  premium): produit au centre, orbite bornee, hotspots ancres, variantes
  couleur/matiere, CTA commerce, fallback image.
- **SaaS / tech landing** (experiences type Spline, exemples R3F): objets
  flottants, cards dashboard en profondeur, camera scroll-reactive,
  storytelling par sections.
- **Techniques** (Three.js examples, drei): geometrie procedurale,
  ContactShadows statiques, DPR clampe, Html pour l'UI in-scene,
  frameloop demand.

## 3. Fichiers crees

Composants (`apps/web/src/components/three-d/`):

```
three-d-canvas.tsx            three-d-error-boundary.tsx
three-d-fallback.tsx          three-d-loader.tsx
three-d-stage.tsx             orbit-product-viewer.tsx
scroll-scene-section.tsx      floating-card-scene.tsx
hotspot-marker.tsx            model-placeholder.tsx
performance-badge.tsx         orbiting-shapes.tsx
immersive-landing-scene.tsx   product-showroom-scene.tsx
product-showroom-data.ts      product-configurator-panel.tsx
product-hotspot-list.tsx      product-spec-card.tsx
index.ts                      three-d-safety.test.tsx
```

Lib (`apps/web/src/lib/three-d/`): `asset-policy.ts`,
`model-manifest.ts`, `model-manifest.test.ts`.

Pages (`apps/web/src/app/demo/3d/`): `page.tsx` (galerie),
`product-showroom/page.tsx` + `product-showroom-experience.tsx`,
`immersive-landing/page.tsx` + `immersive-landing-hero.tsx`.

Autres: `public/models/README.md`, `tests/e2e/three-d-demo.spec.ts`,
`docs/three-d-demo-system-audit.md`,
`docs/three-d-performance-accessibility-audit.md`,
`docs/three-d-site-playbook.md`, ce rapport.

## 4. Routes creees

| Route | Contenu |
| --- | --- |
| `/demo/3d` | Galerie: pourquoi la 3D, cartes des 2 demos, notes perf, retour /demo |
| `/demo/3d/product-showroom` | AeroPod Max: viewer orbital, 5 hotspots, configurateur 4 couleurs x 3 materiaux, specs, CTA mock |
| `/demo/3d/immersive-landing` | OrbitStack Studio: hero 3D scroll-reactif, metriques, features, timeline, CTA |

## 5. Composants 3D crees

- **ThreeDCanvas**: point d'entree unique. SSR-safe (placeholder avant
  detection), fallback WebGL custom, `reducedMotionFallback` (la scene
  n'est pas montee), tiers de performance low/balanced/high, prop
  `interactive` (role group vs img), loader overlay, error boundary.
- **ThreeDStage**: rig d'eclairage sans HDRI reseau, ContactShadows
  statiques, adaptatif au tier.
- **OrbitProductViewer**: preset produit (zoom borne, pas de pan, polar
  clampe, auto-rotate coupe en reduced motion).
- **HotspotMarker**: bouton DOM reel in-scene (drei Html), accessible
  clavier/lecteur d'ecran.
- **ScrollSceneSection / useScrollSceneProgress**: progres de scroll dans
  un ref (0 re-render), sans scroll-jacking.
- **FloatingCardScene / OrbitingShapes / ModelPlaceholder /
  ProductShowroomScene**: scenes et modeles 100 % proceduraux (0 Ko).
- **ThreeDFallback / ThreeDLoader / PerformanceBadge**: DOM pur.
- **Panneaux DOM showroom**: configurateur, liste hotspots (source
  accessible de verite), spec card.

Note d'architecture: la couche `three-d/` REUTILISE les primitives de
`components/3d/core` (garde WebGL, contexte qualite) au lieu de les
dupliquer. Les composants nommes `floating-dashboard-panels` et
`scroll-depth-section` dans le brief sont couverts respectivement par
`FloatingCardScene` et `ScrollSceneSection` (noms plus generiques,
memes responsabilites).

## 6. Asset policy

`lib/three-d/asset-policy.ts`: procedural d'abord; GLB licencie (cc0 /
public-domain / interne) sinon rien; budgets 2048 Ko max / 512 Ko cible
mobile / differe au-dela de 1024 Ko; pas de CDN runtime; fallback et alt
obligatoires. Manifest type (`model-manifest.ts`) couvrant 4 entrees
procedurales et les 3 GLB preexistants (licence `unknown` = quarantaine;
`car` 5.3 Mo marque HORS BUDGET). Les nouvelles demos n'utilisent aucun
GLB.

## 7. Registry updates

8 entrees ajoutees au component registry (maturity `beta`, states,
limitations, notes perf/a11y dans uxNotes, profils recommandes):
`three-d-canvas`, `orbit-product-viewer`, `hotspot-marker`,
`floating-card-scene`, `scroll-scene-section`, `model-placeholder`,
`three-d-fallback`, `performance-badge`.

## 8. Prototype engine updates

`IndustryMeta` gagne un champ optionnel
`threeD?: { demo, reason }` (additif, rien ne le requiert). Renseigne
pour: saas + portfolio -> `immersive-landing`; ecommerce + real-estate ->
`product-showroom`. Demo index: carte "Experiences 3D" + stat 9 -> 10;
layout demo: liens nav et footer vers `/demo/3d`.

## 9. Tests

- **Unit (Vitest)**: `three-d-safety.test.tsx` (fallback sans WebGL,
  fallback custom, reducedMotionFallback, error boundary),
  `model-manifest.test.ts` (budgets, licences, integrite du manifest).
  Suite complete: 536 tests verts.
- **E2E (Playwright)**: `three-d-demo.spec.ts`, 25 scenarios x 2 projets
  (desktop + Pixel 5): chargement, h1, lien retour /demo, canvas OU
  fallback, pas de `[object Object]`, overflow 390px, reduced motion,
  CTA, liste hotspots (interaction), liens internes, erreurs console.
  50/50 verts en local.

## 10. Validations

| Commande | Resultat |
| --- | --- |
| `pnpm lint` | OK (0 erreur; 6 warnings preexistants hors perimetre) |
| `pnpm typecheck` | OK |
| `pnpm test` | OK (536 tests) |
| `pnpm build` | OK (les 3 routes 3D compilees) |
| `pnpm test:e2e` (spec 3D) | OK - 50/50 (25 scenarios x desktop/mobile) |
| `pnpm test:e2e` (suite complete) | 749 passed / 2 skipped en 17.5 min; echecs restants UNIQUEMENT dans prototype.spec.ts et saas-demo.spec.ts sur mobile-chrome, reproduits A L'IDENTIQUE sur main (preexistants, ex: violation strict-mode "Prototype Engine" resolue a 2 liens sur /demo). Aucune regression introduite par la 3D. |

## 11. Risques restants

- Marqueurs hotspot in-scene + liste DOM = double surface tabbable
  (accepte, documente dans l'audit Lot 7).
- GLB preexistants en licence `unknown` (quarantaine via manifest; a
  clarifier ou remplacer).
- `car/default.glb` 5.3 Mo hors budget (non utilise par les nouvelles
  demos).
- 6 warnings lint preexistants (unused vars dans des tests non 3D).

## 12. Classification P0-P3

| Priorite | Constat | Statut |
| --- | --- | --- |
| P0 | Aucun | - |
| P1 | Aucun | - |
| P2 | Aucun ouvert (role img corrige, setState corrige) | Fermes |
| P3 | Double tab hotspots; GLB legacy licence unknown; car.glb hors budget; warnings lint preexistants | Ouverts, documentes, hors perimetre bloquant |

## 13. Score final

| Axe | Score |
| --- | --- |
| Visual quality | 8/10 |
| 3D realism | 7/10 |
| Performance readiness | 9/10 |
| Mobile readiness | 9/10 |
| Accessibility readiness | 9/10 |
| Reusability | 9/10 |
| Production demo readiness | 8.5/10 |

Justification courte: realisme limite volontairement par le choix
procedural (0 Ko, 0 licence) - un GLB licencie remonterait le realisme
sans changer l'architecture. Tout le reste (fallbacks, budgets,
accessibilite, integration registry/engine, tests) est au niveau attendu
d'une fondation produit.
