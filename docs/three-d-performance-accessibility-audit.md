# 3D Demo System - Audit performance / accessibilite / mobile (Lot 7)

Date: 2026-07-02
Branche: `feature/three-d-demo-system`
Pages auditees: `/demo/3d`, `/demo/3d/product-showroom`, `/demo/3d/immersive-landing`

## Verifications effectuees

| # | Verification | Resultat | Preuve |
| --- | --- | --- | --- |
| 1 | Build Next.js OK | OK | `pnpm build` compile, les 3 routes listees dans la sortie |
| 2 | Pas de crash SSR | OK | GET des 3 routes en dev: 200, HTML complet, log serveur sans erreur |
| 3 | Pas de hydration mismatch | OK | Garde `useWebGLSupport() === null` -> placeholder identique serveur/client; aucun warning hydration dans le log dev |
| 4 | Pas de `[object Object]` | OK | grep sur le HTML SSR des 3 routes: 0 occurrence |
| 5 | Mobile 390px sans overflow | OK (verifie E2E au Lot 8) | Layouts en `max-w-6xl px-6` + grilles qui s'empilent; canvas hauteur fixe; `overflow-hidden` sur les wrappers canvas |
| 6 | Reduced motion fonctionne | OK | `reducedMotionFallback` rend un visuel statique SANS monter le canvas; sinon `frameloop="demand"` + animations coupees via `useThreeDQuality()` |
| 7 | Fallback WebGL existe | OK | `fallback` custom sur les 2 demos + defaut `ThreeDFallback`; teste unitairement (jsdom sans WebGL) |
| 8 | Canvas ne bloque pas le contenu | OK | Tout le contenu commercial (h1, specs, CTA, hotspot list) est du DOM server-rendered autour du canvas |
| 9 | CTA accessibles | OK | Vrais `<button>` / `<Link>`; CTA panier avec `aria-live="polite"` |
| 10 | Focus visible | OK | `focus-visible:outline-2 outline-offset-2` sur hotspots, swatches, materiaux, liste DOM |
| 11 | Pas d'animation agressive | OK | Rotation lente (0.18-0.6), bobbing 0.08, parallaxe 0.1-0.12, pas de scroll-jacking, defilement natif preserve |
| 12 | Pas de consommation GPU inutile | OK | DPR plafonne ([1,1.25] mobile / [1,2] max), antialias adaptatif, `preserveDrawingBuffer:false`, `powerPreference:low-power` en tier low, ContactShadows `frames={1}` (statique), pas de HDRI reseau, formes reduites sur mobile |

## Risques identifies et corrections faites

1. **role="img" avec enfants focusables** (P2, corrige): le viewer showroom contient de vrais boutons hotspot (drei `Html`); or les enfants d'un `role="img"` sont presentationnels pour les lecteurs d'ecran. Correction: prop `interactive` sur `ThreeDCanvas` -> `role="group"` quand la scene contient des elements interactifs; le showroom la passe.
2. **setState synchrone dans useEffect** (P2, corrige au Lot 1): les hooks `usePrefersReducedMotion` / `useIsSmallViewport` declenchaient `react-hooks/set-state-in-effect`. Correction: initialisation dans `requestAnimationFrame`, pattern deja utilise par `useMobilePerformance`.
3. **Environment HDRI reseau** (P3, evite par conception): `ThreeDStage` n'utilise pas `<Environment>` de drei (les presets telechargent des HDRI depuis un CDN). Eclairage par lumieres uniquement.
4. **Hotspots dupliques scene + DOM** (accepte): la liste DOM `ProductHotspotList` est la source accessible de verite; les marqueurs in-scene sont un bonus visuel synchronise. Sans WebGL, la liste DOM porte 100 % de l'information.

## Limites restantes

- Les marqueurs hotspot in-scene restent focusables en plus de la liste DOM: deux surfaces tabbables pour la meme info. Acceptable (les deux sont correctement labellisees), mais un `tabIndex={-1}` sur les marqueres in-scene serait defendable. Choix: garde tel quel pour l'interaction pointeur/clavier directe dans la scene.
- `frameloop="demand"` sous reduced motion sans `reducedMotionFallback`: OrbitControls declenche toujours l'invalidation au drag - comportement voulu (interaction manuelle autorisee, animation automatique coupee).
- Le canvas hero immersive est marque `aria-hidden` (decoratif) tout en portant un `aria-label` interne: redondant mais sans effet (aria-hidden prime).

## Classification

| Priorite | Constat | Statut |
| --- | --- | --- |
| P0 | Aucun | - |
| P1 | Aucun | - |
| P2 | role img + enfants interactifs | Corrige (prop `interactive`) |
| P2 | setState sync dans effect | Corrige (Lot 1) |
| P3 | Double surface tabbable hotspots | Accepte, documente |
| P3 | aria-label redondant sous aria-hidden | Accepte, documente |
