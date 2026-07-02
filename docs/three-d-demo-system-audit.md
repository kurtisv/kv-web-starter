# 3D Demo System - Audit de readiness (Lot 0)

Date: 2026-07-02
Branche: `feature/three-d-demo-system`
Baseline validee avant travaux: `pnpm lint` OK (0 erreur, 6 warnings preexistants), `pnpm typecheck` OK.

## 1. Dependances 3D deja presentes

| Package | Version | Statut |
| --- | --- | --- |
| `three` | ^0.185.0 | present |
| `@react-three/fiber` | ^9.6.1 | present |
| `@react-three/drei` | ^10.7.7 | present |
| `@types/three` | ^0.185.0 | present |

Aucune dependance supplementaire n'est necessaire pour la mission. Le decodeur Draco est deja vendore dans `apps/web/public/draco-gltf/` (pas de CDN externe).

## 2. Composants 3D existants

Le boilerplate possede deja une couche 3D non triviale sous `apps/web/src/components/3d/`:

- **Core de securite** (`3d/core/`):
  - `safe-scene-canvas.tsx` - wrapper Canvas avec garde WebGL, error boundary, contexte qualite, DPR clampe, reduced-motion sur autoRotate, placeholder anti-hydration-mismatch.
  - `webgl-guard.tsx` - hook `useWebGLSupport()` (null en SSR, puis true/false).
  - `scene-error-boundary.tsx` - boundary React qui swap vers `FallbackVisual`.
  - `scene-quality-provider.tsx` - contexte `{ isMobile, prefersReducedMotion, dpr, quality }`.
- **Viewers / scenes**: `glb-scene-viewer.tsx` (GLB + Draco + boundary de chargement dedie), `smart-3d-object.tsx` (auto-selection GLB vs procedural), `product-3d-viewer.tsx`, `phone-mockup-3d.tsx`, `website-showcase-3d.tsx`, `car-3d-preview.tsx`, `portfolio-3d-visual.tsx`, `floating-model.tsx`, `particle-background.tsx`.
- **Fallbacks procéduraux** (`3d/procedural-fallback/`): `procedural-phone.tsx`, `procedural-laptop.tsx`, `procedural-car.tsx`.
- **Fallback CSS pur**: `fallback-visual.tsx` (types phone / laptop / car / abstract).
- **Tests unitaires**: `3d-safety.test.tsx`.
- **Compat**: `lib/three-compat.ts` (filtre console.warn des deprecations R3F/Three upstream).
- **Brief generatif**: `lib/3d-brief/` (presets camera/lumiere/materiaux pour generation de prompts 3D - ne rend rien).

Conclusion: on ne repart PAS de zero. La mission consiste a construire la couche `three-d/` demandee comme facade composable qui REUTILISE `3d/core/*` (garde WebGL, boundary, qualite) au lieu de dupliquer ces primitives.

## 3. Routes 3D existantes

- Aucune route `/demo/3d/*` n'existe. Le dossier `apps/web/src/app/demo/` ne contient pas de segment `3d`.
- Consommateurs actuels des composants 3D: `/showcase` (`showcase-client.tsx`, dynamic import) et `/demo/components` (`components-demo-client.tsx`).
- Assets modeles: `apps/web/public/models/3d/{phone,laptop,car,watch,fallback}/` avec `default.glb` pour phone (868 Ko), laptop (408 Ko), car (5.3 Mo). Pas de README ni de manifest.

## 4. Manquements actuels

1. Pas de route `/demo/3d`, ni de demos product-showroom / immersive-landing.
2. Pas de couche `components/three-d/` avec l'API `ThreeDCanvas` demandee (fallback custom, reducedMotionFallback, camera configurable, performance low/balanced/high).
3. Pas de politique d'assets (`lib/three-d/asset-policy.ts`) ni de manifest (`model-manifest.ts`) ni de `public/models/README.md` documentant sources/licences.
4. Pas de composants hotspot accessibles, ni de stage produit generique, ni de scene scroll-driven reutilisable.
5. Les composants 3D ne sont PAS references dans le component registry (`lib/component-registry/component-registry.ts`).
6. Le prototype engine (`presets-map.ts`) n'a aucune notion d'experience 3D.
7. Pas de tests E2E dedies aux routes 3D (le spec existant `3d-models.spec.ts` couvre `/demo/components` seulement).
8. `SafeSceneCanvas` a un fond sombre code en dur et OrbitControls sans zoom - insuffisant pour un product viewer premium (zoom limite requis).

## 5. Risques Next.js / SSR / hydration

- `Canvas` de R3F touche `window`/WebGL: tout composant l'important doit etre un client component, et ne jamais etre importe directement dans un server component. Pattern existant correct: `useWebGLSupport()` retourne `null` au premier rendu et le wrapper rend un placeholder dimensionne -> pas de mismatch. A REUTILISER.
- `prefers-reduced-motion` lu dans `useEffect` seulement (jamais au rendu initial) -> pattern correct a conserver.
- Les pages de demo doivent rester des server components pour le SEO, avec seulement l'ilot canvas en client (dynamic import si necessaire).

## 6. Risques performance

- `car/default.glb` = 5.3 Mo: trop lourd pour une demo mobile. Les nouvelles demos n'utiliseront QUE de la geometrie procedurale (0 Ko de download).
- DPR non clampe = surcout GPU quadratique sur ecrans retina. Le core existant clampe deja ([1,1.25] mobile / [1,2] desktop). A conserver.
- `Environment preset="city"` telecharge un HDRI: a eviter ou desactiver sur mobile (le core le fait deja).
- Ombres: `ContactShadows` leger acceptable; pas de shadow map haute resolution par defaut.
- Boucle `useFrame` permanente: prevoir `frameloop="demand"` quand la scene est statique (reduced motion).

## 7. Risques mobile

- Viewport 390px: panneaux configurateur et specs doivent passer en pile verticale, canvas hauteur reduite, pas d'overflow horizontal.
- GPU mobile faible: geometrie simple (< 50k triangles), antialias off, pas de post-processing.
- Le hook `useMobilePerformance` existant detecte les petits viewports -> reutiliser.

## 8. Risques accessibilite

- Canvas = `role="img"` + `aria-label` descriptif (pattern existant correct).
- Hotspots: doivent etre de VRAIS boutons DOM (overlay HTML), pas des meshes cliquables seuls - sinon inaccessibles clavier/lecteur d'ecran.
- `prefers-reduced-motion`: rotation auto et animations flottantes desactivees; prevoir un fallback statique complet demande par la mission (`reducedMotionFallback`).
- Contenu SEO/texte server-rendered autour du canvas pour que la page ait du sens sans WebGL.
- Focus visible sur tous les CTA et boutons de configuration.

## 9. Besoins pour assets 3D

- Aucun GLB licencie disponible pour les nouvelles demos -> geometrie procedurale Three.js/R3F exclusivement (product box premium, panneaux dashboard, formes orbitales).
- Creer `public/models/README.md` (politique de placement, licence, budget de poids).
- Creer `lib/three-d/asset-policy.ts` (budgets, formats, regles) et `lib/three-d/model-manifest.ts` (manifest typé incluant les GLB existants avec licence `unknown` a clarifier).

## 10. Besoins pour tests

- Nouveau spec `tests/e2e/three-d-demo.spec.ts`: chargement des 3 routes, heading, lien retour, canvas OU fallback visible, pas de `[object Object]`, 390px sans overflow, reduced motion, CTA visible, hotspots ou fallback, liens internes valides, pas d'erreur console critique.
- Les tests doivent passer meme sans WebGL (le fallback DOM doit porter un data-testid stable).
- Unit tests Vitest pour le manifest et la logique de configuration (variantes couleur).

## 11. Plan d'implementation

1. **Lot 1**: `components/three-d/` - facade `ThreeDCanvas` (API demandee) construite sur `3d/core/*`, + error boundary, fallback, loader, stage, orbit-product-viewer, scroll-scene-section, floating-card-scene, hotspot-marker, model-placeholder, performance-badge.
2. **Lot 2**: asset policy + model manifest + README models.
3. **Lot 3**: `/demo/3d/product-showroom` (AeroPod Max) - scene procedurale, configurateur, hotspots, specs, fallbacks.
4. **Lot 4**: `/demo/3d/immersive-landing` (OrbitStack Studio) - hero 3D flottant, cards en profondeur, sections scrollees.
5. **Lot 5**: `/demo/3d` galerie.
6. **Lot 6**: cartes demo index + nav layout + registry + presets prototype engine.
7. **Lot 7**: audit perf/a11y/mobile + durcissement.
8. **Lot 8**: E2E `three-d-demo.spec.ts`.
9. **Lot 9**: rapport final + playbook.

## Classification des constats

| Priorite | Constat |
| --- | --- |
| P0 | Aucun (build, lint, typecheck sains; aucune route cassee) |
| P1 | Pas d'architecture `three-d/` avec API fallback/reducedMotionFallback demandee; pas de demos 3D; composants 3D absents du registry; pas d'asset policy |
| P2 | `car/default.glb` 5.3 Mo (hors budget mobile); `SafeSceneCanvas` fond hardcode + zoom desactive (limite pour product viewer); hotspots accessibles inexistants; GLB existants sans licence documentee |
| P3 | 6 warnings lint preexistants (unused vars dans tests); `Environment city` HDRI reseau sur desktop |
