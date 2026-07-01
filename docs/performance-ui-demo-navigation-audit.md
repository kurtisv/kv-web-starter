# Performance / UI / Demo Navigation Audit

**Branch:** `fix/performance-ui-demo-navigation`
**Date:** 2026-07-01
**Baseline:** pnpm lint: 0 errors, pnpm typecheck: 0 errors, pnpm test: 474/474

---

## 1. Routes auditees

| Route | Existe | Notes |
|-------|--------|-------|
| `/` | oui | page.tsx serveur — stable |
| `/demo` | oui | page.tsx serveur — stable |
| `/demo/saas` | oui | serveur — stable |
| `/demo/booking` | oui | mixte serveur/client — stable |
| `/demo/ecommerce` | oui | client — stable |
| `/demo/real-estate` | oui | client (useSearchParams) + Suspense |
| `/demo/api` | oui | serveur — stable |
| `/demo/dashboard` | oui | client — stable |
| `/demo/portfolio` | oui | serveur — stable |
| `/demo/local-business` | oui | serveur — stable |
| `/demo/auto-blog` | oui | mixte serveur/client + Suspense |
| `/demo/design-lab` | oui | serveur — stable |
| `/demo/components` | oui | client — stable |
| `/showcase/frontend-experience` | oui | stable |
| `/showcase/component-ui-polish` | oui | stable |
| `/showcase/component-ui-polish-phase-3` | oui | stable |

---

## 2. Pages lentes ou instables

| Page | Probleme | Cause |
|------|----------|-------|
| pages avec `PlayOnceVideo` | requete HEAD par composant | `checkAvailability=true` par defaut — fire un fetch meme si video absente |
| pages avec `HeroSection variant="dark" + videoSrc` | video fetch inutile | `preload="metadata"` charge les premiers octets meme si la video n'existe pas |
| `/demo/real-estate` | re-renders url | `searchParams` dans deps de l'effet URL-write (`ConfigurableFilterBar`) |
| PageTransition | remonte tout l'arbre | `key={pathname}` force un unmount/remount complet a chaque navigation |

PageTransition est acceptable (animation legere), mais c'est a noter.

---

## 3. Problemes de chargement trouves

1. **`PlayOnceVideo.checkAvailability`** — fire une requete HEAD sur le serveur pour chaque composant video. Si la video n'existe pas (les assets Remotion ne sont pas commites), on obtient une 404 en network + fallback UI. L'effet est correct mais bruyant en dev.

2. **`HeroSection dark + videoSrc`** — `preload="metadata"` engage le browser a recuperer les premieres secondes du fichier. Si le fichier n'existe pas, la balise video declenche un `onerror` visible. L'`onError` n'est pas gere dans `HeroSection`.

3. **Imports dynamiques absents** — quelques composants lourds (3D, graphiques) sont importes statiquement dans les pages de showcase. Dans les demos principales c'est acceptable car les demos sont deja des pages client.

---

## 4. Problemes d'hydratation / synchronisation trouves

1. **`ConfigurableFilterBar` — `searchParams` dans les deps de l'effet URL-write** (ligne 89 du fichier):
   ```ts
   }, [values, variables, defaultSerialized, searchParams, router, pathname]);
   ```
   Chaque `router.replace()` met a jour `searchParams`, ce qui retrigger l'effet, qui re-evalue la serialisation, qui refait un `router.replace()`. La garde `prevSerializedRef` bloque la boucle infinie, mais genere un render de trop par mise a jour de filtre. Correctif: remplacer `searchParams` par une ref.

2. **Pas d'hydratation mismatch detectee** — les dates et montants utilises dans les demos sont des strings litterales, pas des valeurs generees cote serveur puis remplacees cote client.

---

## 5. Problemes de navigation dans les demos

**C'est le probleme le plus visible pour un client.**

`apps/web/src/app/demo/layout.tsx` actuel:
```tsx
// Un seul lien: "Galerie des demos"
<Link href="/demo">Galerie des demos</Link>
```

Manquant:
- Lien vers l'Accueil (`/`)
- Lien vers le Design Lab (`/demo/design-lab`)
- Lien vers Components Playground (`/demo/components`)
- Indicateur de la demo courante
- Footer (retour Accueil / Demos / Sources)

---

## 6. Problemes UI visibles

1. **`Button asChild + rightIcon/leftIcon`** — BUG RUNTIME. Quand `asChild=true`, le `Slot` Radix recoit un React Fragment avec 3 enfants (icon + Link + icon). `React.Children.toArray` aplatit le fragment → 3 elements → `Slot` attend exactement 1 enfant → erreur React au runtime ("Each child in a list should have a unique 'key' prop" ou "Slot requires exactly one child"). Detecte dans: `demo/api`, `demo/booking`, `demo/local-business`, `demo/portfolio`, `demo/real-estate`, `showcase/component-ui-polish-phase-3`.

2. **Lien mort `/docs/getting-started`** — sur `/demo` dans la section CTA finale, le bouton "Lire le guide" pointe vers `/docs/getting-started` qui n'existe pas (la route `docs` n'a que `3d-models` et `api`).

3. **Lien mort `/dashboard/settings/integrations`** — meme section, ce lien pointe vers une route interne qui n'est probablement pas dans la demo publique.

---

## 7. Problemes mobile / overflow

Aucun overflow majeur detecte statiquement. Les demos utilisent toutes `max-w-6xl px-6` et `flex-wrap`. Le `ConfigurableFilterBar` utilise `flex-wrap` aussi.

A risque: `demo/auto-blog` avec les fiches voitures en grille (`grid-cols-2`) sans `min-w-0` explicite sur les textes.

---

## 8. Problemes console / network / build

| Type | Detail |
|------|--------|
| 404 network | `/videos/themes/*.mp4` si assets Remotion absents — HeroSection dark + PlayOnceVideo |
| Console warning | `Slot requires exactly one child` — Button asChild + icon |
| Lien mort | `/docs/getting-started` sur /demo |
| Lien mort | `/dashboard/settings/integrations` sur /demo |

---

## 9. Priorites

| Priorite | Item | Fichier(s) |
|----------|------|-----------|
| P0 | Button asChild + leftIcon/rightIcon → erreur runtime Slot | `ui/button.tsx` + 6 pages demo |
| P0 | Demo layout nav incomplete (pas de home, design-lab, components, footer) | `demo/layout.tsx` |
| P1 | ConfigurableFilterBar searchParams dans deps URL-write → renders extra | `configurable-filter-bar.tsx` |
| P1 | Liens morts dans /demo CTA final | `demo/page.tsx` |
| P2 | PlayOnceVideo HEAD fetch → 404 console noise si videos absentes | `play-once-video.tsx` |
| P2 | HeroSection video onerror non gere | `hero-section.tsx` (dark variant) |
| P3 | PageTransition key=pathname → remount complet | acceptable, pas toucher |
| P3 | Auto-blog carGrid min-w-0 manquant sur textes | `auto-blog-client.tsx` |
