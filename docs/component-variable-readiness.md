# Component Variable Readiness

> Audit Lot 0 — kv-web-starter
> Date: 2026-06-30
> Scope: composants candidats a la migration vers le systeme de variables configurables.

## Classification

| Classe | Signification |
|--------|---------------|
| A | Pret a etre migre en priorite |
| B | Peut etre wrappe progressivement |
| C | Stable, ne pas toucher maintenant |
| D | Trop specifique, revoir plus tard |

---

## Composants audites

### FilterBar `A`

**Fichier:** `src/components/dashboard-ui/filter-bar.tsx`
**Usage principal:** `AutoBlogCarGrid`, page `ShowcaseClient`

**Props actuelles:**
```ts
filters?: FilterGroup[]   // { key, label, options: { value, label }[] }[]
searchPlaceholder?: string
className?: string
```

**Donnees hardcodees:** aucune — tout vient des props.

**URL sync:** oui — `useSearchParams` + `useRouter`, params par `key` de chaque FilterGroup.

**Etats:** aucun etat loading/empty/error propre.

**Variables candidates:**
- chaque `FilterGroup` devient une `SelectVariable`
- `searchPlaceholder` devient une variable texte ou simple prop
- reset automatique pourrait etre une variable booleenne

**Risque de migration:** LOW — API claire, pas de context externe, URL sync deja present.

**Priorite:** 1 — c'est le POC cible du Lot 4.

---

### PropertySearchBar `A`

**Fichier:** `src/components/real-estate/property-search-bar.tsx`
**Usage principal:** `/demo/real-estate` (page.tsx)

**Props actuelles:**
```ts
onSearch?: (params: { query: string; type: string; maxPrice: string; rooms: string }) => void
```

**Donnees hardcodees:** CRITIQUES — trois tableaux d'options constants dans le fichier:
```ts
const typeOptions: SelectOption[]   // 5 types de biens
const priceOptions: SelectOption[]  // 5 tranches de prix
const roomOptions: SelectOption[]   // 5 choix de pieces
```

**URL sync:** non — etat local (`useState` pour query, type, maxPrice, rooms).

**Etats:** aucun loading/empty/error.

**Variables candidates:**
- `typeOptions` → `SelectVariable { id: "propertyType" }`
- `priceOptions` → `SelectVariable { id: "maxPrice" }` ou `SliderRangeVariable`
- `roomOptions` → `SelectVariable { id: "rooms" }`
- `query` → `TextVariable { id: "search" }`

**Risque de migration:** LOW — composant autonome, un seul caller, pas de context.

**Priorite:** 2 — cible Lot 7 (migration reelle apres POC valide).

---

### AutoBlogCarGrid `B`

**Fichier:** `src/app/demo/auto-blog/auto-blog-client.tsx`
**Usage principal:** `/demo/auto-blog`

**Props actuelles:** aucune — composant autonome avec donnees mock internes.

**Donnees hardcodees:** CRITIQUES:
```ts
const ALL_CARS = [...]    // 4 voitures mockes
const FILTERS: FilterGroup[] = [
  { key: "category", label: "Categorie", options: [...] }
]
```

**URL sync:** oui — lit `useSearchParams` (search, category).

**Etats:** empty state textuel si aucun vehicule. Pas de loading.

**Variables candidates:**
- `FILTERS` → liste de `SelectVariable` injectee
- `ALL_CARS` → donnee externe (hors scope variables, reste mock)
- `searchPlaceholder` → variable texte

**Risque de migration:** MEDIUM — composant client avec logique de filtrage interne, mais bien isole.

**Priorite:** 3 — cible Lot 7 apres PropertySearchBar.

---

### ProductCard `B`

**Fichier:** `src/components/ecommerce/product-card.tsx`
**Usage principal:** showcase, pages e-commerce.

**Props actuelles:**
```ts
product: ProductItem   // id, name, priceCents, rating, image, badge, inStock, href...
layout?: "grid" | "list"
onAddToCart?: (product: ProductItem) => void
className?: string
```

**Donnees hardcodees:** libelles CTA ("Ajouter", animation du bouton), label "Rupture".

**URL sync:** non.

**Etats:** etat `added` (bouton). Pas de loading/error.

**Context externe:** `CartContext` (optionnel, fallback sur `onAddToCart`).

**Variables candidates:**
- `layout` → `SelectVariable { options: ["grid","list"] }`
- Labels CTA → variables texte
- `onAddToCart` → callback injectable

**Risque de migration:** MEDIUM — depend de CartContext, gestion de toast.

**Priorite:** 4 — apres FilterBar et PropertySearchBar.

---

### PlanComparisonTable `B`

**Fichier:** `src/components/saas/plan-comparison-table.tsx`

**Props actuelles:**
```ts
features: PlanFeature[]   // { label, starter, pro, enterprise }
onSelect?: (plan: "starter" | "pro" | "enterprise") => void
className?: string
```

**Donnees hardcodees:** les trois colonnes "Starter", "Pro", "Enterprise" et leurs labels sont hardcodes dans le JSX. Le badge "Populaire" est hardcode sur "Pro".

**URL sync:** non.

**Etats:** aucun.

**Variables candidates:**
- colonnes de plans (noms, badges) → tableau configurable
- `onSelect` → callback injectable

**Risque de migration:** MEDIUM — structure de tableau a 3 colonnes fixes.

**Priorite:** 5 — apres e-commerce.

---

### PricingSection `C`

**Fichier:** `src/components/sections/pricing-section.tsx`

**Verdict:** STABLE. Entierement pilotee par props (`plans: PricingPlan[]`, `eyebrow`, `title`, `description`). Aucune donnee hardcodee. Ne pas toucher.

---

### MetricCard `C`

**Fichier:** `src/components/dashboard-ui/metric-card.tsx`

**Verdict:** STABLE. Entierement pilotee par props (`label`, `value`, `description`, `trend`, `icon`). Ne pas toucher.

---

### ServicePicker `C`

**Fichier:** `src/components/booking/service-picker.tsx`

**Verdict:** STABLE. Props: `services: ServiceOption[]`, `selectedId`, `formId`. Aucune donnee hardcodee. Ne pas toucher.

---

### StaffPicker `C`

**Fichier:** `src/components/booking/staff-picker.tsx`

**Verdict:** STABLE. Props: `staff: StaffOption[]`, `selectedId`, `formId`. Ne pas toucher.

---

### BookingForm `C`

**Fichier:** `src/components/booking/booking-form.tsx`

**Verdict:** STABLE. Formulaire oriente formulaire Supabase/action serveur. Hors scope lot 0-7.

---

### DataTableShell `C`

**Fichier:** `src/components/dashboard-ui/data-table-shell.tsx`

**Verdict:** STABLE pour l'instant. Composant generique wrapper — colonnes et donnees viennent de l'appelant. Potentiellement classe A dans un lot futur (Lot 8+).

---

### NotificationBell `C`

**Fichier:** `src/components/ui/notification-bell.tsx`

**Verdict:** STABLE. Composant UI simple. Pas de donnees configurables majeures.

---

### CarSpecComparison `C`

**Fichier:** `src/components/auto-blog/car-spec-comparison.tsx`

**Verdict:** STABLE. Entierement pilote par props (`cars`, `specLabels`, `winnerKey`). Ne pas toucher.

---

### PricingSection (marketing section) `C`

**Verdict:** STABLE. Voir ci-dessus.

---

## Resume de classification

| Composant | Classe | Lot cible |
|-----------|--------|-----------|
| FilterBar | A | Lot 4 (POC) + Lot 5 (wrapper) |
| PropertySearchBar | A | Lot 7 |
| AutoBlogCarGrid | B | Lot 7 |
| ProductCard | B | Lot 8+ |
| PlanComparisonTable | B | Lot 8+ |
| PricingSection | C | Ne pas toucher |
| MetricCard | C | Ne pas toucher |
| ServicePicker | C | Ne pas toucher |
| StaffPicker | C | Ne pas toucher |
| BookingForm | C | Ne pas toucher |
| DataTableShell | C | Futur (post-Lot 9) |
| NotificationBell | C | Ne pas toucher |
| CarSpecComparison | C | Ne pas toucher |

---

## POC recommande

Le premier Proof of Concept doit etre:

```
ConfigurableFilterBar
  + core variable system (Lot 1)
  + factories par defaut (Lot 2)
  + VariableRenderer (Lot 3)
  + wrapper retrocompatible FilterBar (Lot 5)
```

Suivi de la migration reelle dans Lot 7:
```
PropertySearchBar  →  realEstateVariables preset
AutoBlogCarGrid    →  autoVariables preset
```
