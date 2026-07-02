# Playbook - Sites 3D professionnels avec le boilerplate

Comment ajouter de la 3D a un site client sans sacrifier performance,
mobile ni accessibilite. Les briques vivent dans
`apps/web/src/components/three-d/`; les demos de reference dans
`/demo/3d`.

## 1. Quand utiliser la 3D

- Produit physique dont l'inspection augmente la confiance d'achat
  (electronique, mobilier, luxe, sport).
- Configurateur couleur / matiere / variante: un seul modele remplace des
  dizaines de photos.
- Marque premium qui doit se differencier des la premiere seconde
  (agence, SaaS haut de gamme, portfolio).
- Donnee spatiale reelle (batiment, plan, piece) ou la 2D perd
  l'information.

Test simple: si la 3D disparait, la page perd-elle un argument de vente?
Si non, ne l'ajoutez pas.

## 2. Quand NE PAS utiliser la 3D

- Contenu editorial, blog, documentation: le texte est le produit.
- Pages transactionnelles critiques (checkout, formulaires): zero
  distraction.
- Quand le budget ne permet pas de faire les fallbacks correctement: une
  3D sans fallback est pire que pas de 3D.
- Comme decoration pure sans lien avec l'offre.

## 3. Pattern product showroom

Reference: `/demo/3d/product-showroom` (AeroPod Max).

- `OrbitProductViewer` (zoom borne, pas de pan, polar clampe) autour d'un
  modele procedural ou d'un GLB licencie.
- `HotspotMarker` in-scene + `ProductHotspotList` DOM: la liste DOM est la
  source accessible de verite.
- `ProductConfiguratorPanel`: l'etat (couleur, matiere) vit dans le client
  island de la page et pilote les materiaux de la scene.
- Contenu SEO (h1, specs, benefices, CTA) server-rendered AUTOUR du canvas.
- Passer `interactive` a `ThreeDCanvas`/`OrbitProductViewer` quand la scene
  contient des hotspots (role group, pas img).

## 4. Pattern immersive landing

Reference: `/demo/3d/immersive-landing` (OrbitStack Studio).

- Canvas decoratif en backdrop (`aria-hidden` sur son conteneur), copie
  reelle en DOM au premier plan avec un scrim pour la lisibilite.
- `ScrollSceneSection` + `useScrollSceneProgress()`: la scene lit le
  progres (ref 0..1) dans `useFrame`, jamais dans le rendu React. Pas de
  scroll-jacking: le defilement natif reste intact.
- `FloatingCardScene` + `OrbitingShapes`: profondeur et vie sans un seul
  asset telecharge.
- Un seul canvas par page: le hero. Les sections suivantes restent DOM.

## 5. Exigences assets

Voir `apps/web/src/lib/three-d/asset-policy.ts` et
`public/models/README.md`.

- Procedural d'abord (`ModelPlaceholder`, geometries R3F): 0 Ko, 0 licence.
- GLB seulement si licencie (cc0 / public-domain / interne), declare dans
  `model-manifest.ts` avec poids et source.
- Budget: 2048 Ko max, cible mobile 512 Ko, chargement differe au-dela de
  1024 Ko. Draco local (`public/draco-gltf/`), jamais de CDN runtime.

## 6. Budget performance

- DPR plafonne: [1, 1.25] mobile, [1, 2] max desktop (tier `high`).
- `performance="balanced"` par defaut; les petits viewports retombent
  automatiquement en tier `low` (antialias off, low-power).
- Pas de `<Environment>` drei (HDRI reseau); eclairage par lumieres.
- Ombres: `ContactShadows` statique (`frames={1}`) uniquement, jamais de
  shadow map dynamique par defaut.
- `preserveDrawingBuffer: false`, `frameloop="demand"` sous reduced motion.
- Animations: amplitudes faibles (bob 0.08, parallaxe 0.1), une seule
  boucle par scene.

## 7. Fallback mobile

- `ThreeDCanvas` cape le tier a `low` sous 768px: moins de formes, pas
  d'antialias, DPR reduit.
- Layout: le canvas a une hauteur fixe et les panneaux passent en pile;
  verifier 390px sans overflow (couvert par
  `tests/e2e/three-d-demo.spec.ts`).
- Si la scene n'apporte rien sur mobile, fournir `fallback` custom et ne
  monter le canvas que sur desktop cote page.

## 8. Reduced motion

- Toujours fournir `reducedMotionFallback`: la scene n'est PAS montee, un
  visuel statique la remplace.
- Sans fallback explicite, le canvas monte avec `frameloop="demand"` et
  chaque composant de scene doit verifier
  `useThreeDQuality().prefersReducedMotion` avant d'animer (toutes les
  briques three-d le font).
- L'auto-rotation d'`OrbitProductViewer` se coupe seule.

## 9. Accessibilite

- Canvas informatif: `role="img"` + `aria-label` decrivant la scene.
- Canvas avec elements focusables (hotspots): prop `interactive` ->
  `role="group"`.
- Canvas decoratif: conteneur `aria-hidden`, texte reel en DOM.
- Hotspots: vrais `<button>` (drei `Html`), aria-pressed, focus visible,
  TOUJOURS doubles d'une liste DOM hors canvas.
- Toute information portee par la 3D doit exister en texte sur la page.

## 10. Ajouter une nouvelle demo 3D

1. Creer `apps/web/src/app/demo/3d/<slug>/page.tsx` (server component:
   metadata, h1, contenu SEO) + un client island pour l'interactif.
2. Composer la scene avec les briques `components/three-d/`; nouvelle
   brique = nouveau fichier dans ce dossier + export dans `index.ts`.
3. Fournir `fallback` ET `reducedMotionFallback`.
4. Ajouter la carte dans `/demo/3d/page.tsx` (THREE_D_DEMOS).
5. Declarer tout asset dans `lib/three-d/model-manifest.ts`.
6. Enregistrer les nouveaux composants dans le component registry.
7. Etendre `tests/e2e/three-d-demo.spec.ts` (ajouter la route a ROUTES).
8. Valider: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`,
   puis `pnpm test:e2e`.
