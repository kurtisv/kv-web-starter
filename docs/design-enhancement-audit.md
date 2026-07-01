# Design Enhancement Audit

Date: 2026-07-01
Branch: feature/design-enhancement-layer
Sprint: Design Enhancement Layer

---

## 1. Composants UI existants

### Primitives UI (`apps/web/src/components/ui/`)

| Composant | Variantes actuelles | Force | Faiblesse |
|---|---|---|---|
| `Card` | default, elevated, flat, outline, muted, premium | CVA propre | Pas de glass, pas de gradient border |
| `Button` | default + via CVA | Fonctionnel | Aucune variante "glow" ou "gradient" |
| `Badge` | - | Simple | Monotone, pas de dot variant |
| `AnimatedHero` | 1 seul style | Word-by-word Framer spring | Pas de variant dark/split/editorial |
| `HeroSection` | centered, split, dark, minimal | Bonne structure | Variantes peu exploitees dans les demos |
| `FeatureGrid` | cards, list, icon-left | Scroll animation via Framer | Icones generiques, cards plates |
| `StatsSection` | - | Compteur anime | Layout identique partout |
| `TestimonialSection` | - | Fonctionnel | Aucune personnalite visuelle |
| `PricingSection` | - | Complet | Layout copie/colle entre presets |
| `Skeleton` | - | Standard | - |
| `AnimatedSection` | - | Scroll reveal | - |
| `RevealSection` | - | Scroll reveal | - |

### Animations disponibles

- `framer-motion@12.40` : spring, inView, variants CONTAINER/ITEM
- `animate-marquee` : CSS keyframe deja presente
- `animate-fade-in` : CSS keyframe deja presente
- `animate-slide-in-right` : CSS keyframe deja presente
- `@/components/animations/motion` : EASE, DURATION, CONTAINER, ITEM exports

---

## 2. Dependances front-end deja presentes

| Package | Version | Usage actuel |
|---|---|---|
| `framer-motion` | 12.40 | AnimatedHero, FeatureGrid, AnimatedSection |
| `lucide-react` | 1.14 | Icons generiques partout |
| `class-variance-authority` | 0.7 | Card, Button variants |
| `tailwind-merge` | 3.6 | cn() utilitaire |
| `tailwindcss` | 4 | Styles globaux |
| `@react-three/fiber` + `drei` | 9/10 | 3D components |
| `clsx` | 2.1 | Classes conditionnelles |

Tout ce sprint peut etre realise **sans aucune nouvelle dependance**.

---

## 3. Composants visuellement faibles

### Critique

1. **FeatureGrid** — icones dans des boites `bg-muted` identiques (carre 40x40) dans tous les presets. Aucune variation de couleur, forme, ou style selon le theme.
2. **StatsSection** — fond `bg-muted` plat, meme layout pour SaaS premium et business local.
3. **TestimonialSection** — cartes blanches basiques, avatar generique, aucune personnalite.
4. **Footer** — identique visuellement entre tous les presets, pas de lien avec le theme.
5. **Navbar** — structure identique, zero differentiation par domaine.
6. **HeroSection variant "centered"** — utilise `bg-background` sans gradient, tres fade.

### Modere

7. **PricingSection** — highlight "popular" fonctionnel mais sans premium visual treatment.
8. **LogoCloud** — marquee de blobs gris, aucun contexte de marque.
9. **CTASection** — fond muted, aucun gradient ni texture.

---

## 4. Presets trop similaires

### Collision saas + dashboard

Les deux utilisent `premium-saas` (violet) et ont des modules tres proches :
- `saas` : billing, dashboard, api
- `dashboard` : billing, api, dashboard

Visuellement indiscernables cote heros et sections marketing.

### Collision booking + local-business

Les deux utilisent `local-business` (warm green/cream) avec les memes modules :
- `booking` : booking, billing
- `local-business` : booking, billing

Aucune differenciation visuelle ni de personnalite.

### Collision real-estate + corporate-classic

Fond blanc similaire, typographie identique, seul l'accent sky-blue differ de bleu.

---

## 5. Opportunites d'amelioration sans dependance

| Opportunite | Effort | Impact |
|---|---|---|
| Design profiles TypeScript (cette couche) | Moyen | Tres haut |
| Glass card via `backdrop-filter: blur` (CSS pur) | Faible | Haut |
| Gradient text via `bg-clip-text` (CSS pur) | Faible | Haut |
| Nouvelles animations CSS dans globals.css | Faible | Moyen |
| Nouvelles variantes Card CVA (glass, gradient-border) | Faible | Haut |
| FeatureGrid : icon ring color par theme (via CSS var) | Faible | Moyen |
| HeroSection : noise overlay texture (pseudo-element CSS) | Faible | Haut |
| Density tokens par profile (py-12 vs py-24) | Moyen | Haut |
| Motion style par profile (subtle/expressive/none) | Moyen | Haut |
| Shadow tokens enrichis dans globals.css | Faible | Moyen |

---

## 6. Dependances potentiellement utiles

Ces dependances ne sont PAS installees mais pourraient valoir dans un sprint futur :

| Package | Cas d'usage | Decision |
|---|---|---|
| `@tabler/icons-react` | Icones alternatives a Lucide, meme API | A evaluer |
| `react-spring` | Alternative a Framer pour animations declaratives | Non prioritaire (Framer deja present) |
| `@vercel/og` | OG image generation | Hors scope |

---

## 7. Dependances a eviter

| Package | Raison |
|---|---|
| `@radix-ui/themes` | Conflit direct avec le design system existant |
| `@mui/*` | Trop lourd, opinions trop fortes |
| `@chakra-ui/*` | Conflit ThemeProvider + CSS vars |
| `shadcn/ui` | On a deja des composants custom sur la meme base |
| `animate.css` | Inutile — Framer Motion et CSS keyframes suffisent |
| `styled-components` / `emotion` | Incompatible avec l'approche Tailwind v4 |

---

## 8. Strategie recommandee

### Principe directeur

Ne pas changer les composants existants. Ajouter une **couche de profils visuels** qui exprime la personnalite de chaque domaine, et que les demos et presets peuvent consommer.

### Architecture

```
apps/web/src/design-system/
  tokens.ts              -- existant (ThemeId, THEME_META, SPACING, TYPOGRAPHY)
  design-profiles.ts     -- NOUVEAU : DesignProfile[], une par preset domain
```

### Contenu d'un profil

Chaque profil definit les proprietes visuelles au-dela des couleurs :
- `backgroundStyle` : flat | soft-gradient | noise | grid-lines | dark-depth
- `cardStyle` : clean | glass-elevated | bordered-sharp | warm-tinted | dark-elevated
- `heroStyle` : centered | editorial-split | dark-cinematic | warm-editorial | full-bleed
- `motionStyle` : subtle | expressive | editorial | cinematic | none
- `density` : comfortable | compact | spacious | editorial
- `radius` : none | sm | md | lg | xl
- `shadow` : none | subtle | elevated | dramatic
- `gradient` : none | soft | strong | editorial
- `accentTreatment` : fill | outline | ghost | gradient | glow
- `imageStyle` : rounded | sharp | film-grain | none

### Mapping preset → profil

| Preset | Theme actuel | Profil recommande |
|---|---|---|
| portfolio | corporate-classic | creative-portfolio |
| saas | premium-saas | premium-saas |
| booking | local-business | warm-local |
| api | dark-tech-api | dark-technical |
| real-estate | real-estate | real-estate-luxe |
| local-business | local-business | warm-local (variante plus chaleur) |
| auto-blog | luxury-auto | auto-performance |
| ecommerce | ecommerce-clean | commerce-clean |
| dashboard | premium-saas | minimal-dashboard |

### Etapes du sprint

1. **Audit** (ce fichier) — done
2. **Lot 1 : Design profiles** — `design-profiles.ts` avec 10 profils
3. **Lot 2 : CSS utilities** — glass, gradient-text, noise, nouvelles animations dans globals.css
4. **Lot 3 : Card variants** — glass-card, gradient-border, glow-ring via CVA
5. **Lot 4 : Demo improvements** — appliquer les profils dans les pages demo existantes
6. **Lot 5 : Design lab page** — `/demo/design-lab` pour visualiser tous les profils

### Risques

- P0 : Aucun (pas de refonte, pas de breaking change)
- P1 : CSS `backdrop-filter` non supporte sur certains anciens browsers (fallback: `bg-card`)
- P2 : Profils visuels non enforces — les demos peuvent ignorer le profil recommande
- P3 : Trop de profils similaires entre warming-local (booking vs local-business)
