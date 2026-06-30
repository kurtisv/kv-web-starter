# Component Customization Matrix

> Lot 0 — kv-web-starter
> Date: 2026-06-30
> Matrice complete des composants audites pour le systeme de variables configurables.

## Legende

| Colonne | Description |
|---------|-------------|
| className | Le composant accepte une prop `className` |
| Loading | Etat de chargement integre |
| Empty | Etat vide integre |
| Error | Etat d'erreur integre |
| CustomRender | Accepte un render custom via prop |
| URLSync | Synchronise son etat avec les URL params |
| Classe | A / B / C / D (voir readiness.md) |
| Lot | Lot cible dans le plan de migration |

---

## Matrice

| Composant | Fichier | className | Loading | Empty | Error | CustomRender | URLSync | Classe | Lot |
|-----------|---------|:---------:|:-------:|:-----:|:-----:|:------------:|:-------:|--------|-----|
| FilterBar | dashboard-ui/filter-bar.tsx | oui | non | non | non | non | **oui** | A | 4+5 |
| PropertySearchBar | real-estate/property-search-bar.tsx | **non** | non | non | non | non | non | A | 7 |
| AutoBlogCarGrid | app/demo/auto-blog/auto-blog-client.tsx | non | non | oui* | non | non | **oui** | B | 7 |
| ProductCard | ecommerce/product-card.tsx | oui | non | non | non | non | non | B | 8+ |
| PlanComparisonTable | saas/plan-comparison-table.tsx | oui | non | non | non | non | non | B | 8+ |
| BookingForm | booking/booking-form.tsx | **non** | oui* | non | non | non | non | C | — |
| PropertyCard | real-estate/property-card.tsx | oui | non | non | non | non | non | C | — |
| DataTableShell | dashboard-ui/data-table-shell.tsx | oui | **oui** | **oui** | non | **oui** | non | C | — |
| MetricCard | dashboard-ui/metric-card.tsx | oui | non | non | non | non | non | C | — |
| ServicePicker | booking/service-picker.tsx | oui | non | non | non | non | non | C | — |
| StaffPicker | booking/staff-picker.tsx | oui | non | non | non | non | non | C | — |
| CarSpecComparison | auto-blog/car-spec-comparison.tsx | non | non | non | non | non | non | C | — |
| ArticleCard | auto-blog/article-card.tsx | non | non | non | non | non | non | C | — |

*oui* = partiel ou implicite

---

## Detail des donnees hardcodees par composant

### FilterBar

```
- "Rechercher..." (searchPlaceholder default)
- "Effacer" (label du bouton reset)
- debounce: 300ms (non configurable)
```

**Variables candidates:**
- `searchPlaceholder` → reste une prop simple
- `clearLabel` → variable texte ou prop optionnelle
- `debounceMs` → configurable via variable interne

---

### PropertySearchBar

```
const typeOptions = [
  { value: "all",          label: "Tous les biens" },
  { value: "appartement",  label: "Appartement" },
  { value: "maison",       label: "Maison" },
  { value: "studio",       label: "Studio" },
  { value: "loft",         label: "Loft" },
]
const priceOptions = [
  { value: "all",       label: "Sans limite" },
  { value: "200000",    label: "Jusqu'a 200 000 €" },
  { value: "400000",    label: "Jusqu'a 400 000 €" },
  { value: "600000",    label: "Jusqu'a 600 000 €" },
  { value: "1000000",   label: "Jusqu'a 1 000 000 €" },
]
const roomOptions = [
  { value: "all", label: "Toutes les pieces" },
  { value: "1",   label: "1 piece" },
  ...
]
- placeholder: "Ville, quartier, code postal..."
- button: "Rechercher"
- AUCUNE prop className
```

**Variables candidates:**
- `typeOptions`  → `createSelectVariable({ id: "propertyType", options: [...] })`
- `priceOptions` → `createSelectVariable({ id: "maxPrice", options: [...] })`
- `roomOptions`  → `createSelectVariable({ id: "rooms", options: [...] })`
- `query`        → `createTextVariable({ id: "search", placeholder: "..." })`

---

### AutoBlogCarGrid

```
const FILTERS: FilterGroup[] = [
  {
    key: "category",
    label: "Categorie",
    options: [
      { value: "Sport",         label: "Sport" },
      { value: "Berline sport", label: "Berline sport" },
      { value: "Supercar",      label: "Supercar" },
      { value: "Break sport",   label: "Break sport" },
    ],
  },
]
const ALL_CARS = [...] // 4 entrees mock hardcodees
searchPlaceholder: "Rechercher une marque ou un modele..."
```

**Variables candidates:**
- `FILTERS` → liste de `SelectVariable` injectable via `ConfigurableFilterBar`
- `ALL_CARS` → reste donnees mock (hors scope variables)
- `searchPlaceholder` → prop ou variable texte

---

### ProductCard

```
- "Rupture de stock" (label inStock=false)
- "Produit ajoute" (toast message)
- "Ajoute" / "Ajouter" (etats bouton)
- 1200ms (toast duration)
```

**Variables candidates:**
- libelles → variables texte ou i18n
- `layout` → `createSelectVariable({ options: ["grid","list"] })`
- toast duration → variable interne

---

### PlanComparisonTable

```
- Colonnes: "Starter", "Pro", "Enterprise" (hardcodes dans le JSX)
- Badge "Populaire" hardcode sur colonne "Pro"
- Boutons: "Choisir" (starter/pro), "Contacter" (enterprise)
- Header: "Fonctionnalite"
```

**Variables candidates:**
- colonnes → tableau de plans configurable
- badge "Populaire" → prop `popularPlan?`

---

### BookingForm

```
- Labels: "Nom complet", "Adresse email", "Telephone"
- Placeholders: "Marie Tremblay", "marie@exemple.com", "+1 514 555-0100"
- Boutons: "Confirmation en cours...", "Indisponible", "Confirmer la reservation"
- "/terms" (href hardcode)
- AUCUNE prop className
```

Note: composant hors scope pour les lots 0-7. Flagge pour documentation future.

---

## Variables candidates par domaine (presets Lot 6)

### real-estate-variables
```
search          → createTextVariable
propertyType    → createSelectVariable
maxPrice        → createSelectVariable ou createSliderRangeVariable
rooms           → createSelectVariable
availability    → createStatusVariable
viewMode        → createViewModeVariable
```

### auto-variables
```
search          → createTextVariable
make            → createSelectVariable
category        → createSelectVariable
yearRange       → createSliderRangeVariable
priceRange      → createSliderRangeVariable
viewMode        → createViewModeVariable
```

### ecommerce-variables
```
search          → createTextVariable
category        → createSelectVariable
brand           → createSelectVariable
priceRange      → createSliderRangeVariable
rating          → createRatingVariable
inStock         → createBooleanVariable
sort            → createSortVariable
viewMode        → createViewModeVariable
```

### dashboard-variables
```
search          → createTextVariable
status          → createStatusVariable
dateRange       → createDateRangeVariable
sort            → createSortVariable
```

### api-portal-variables
```
search          → createTextVariable
method          → createSelectVariable  { GET, POST, PUT, PATCH, DELETE }
statusCode      → createSelectVariable  { 200, 201, 400, 401, 403, 404, 500 }
dateRange       → createDateRangeVariable
environment     → createSelectVariable  { production, staging, sandbox }
```

---

## Risques identifies

| Risque | Composant(s) | Mitigation |
|--------|-------------|-----------|
| Pas de `className` | PropertySearchBar, BookingForm, ArticleCard | Ajouter `className` dans la migration |
| CartContext optionnel | ProductCard | Conserver le fallback `onAddToCart`, pas de changement |
| URL sync present | FilterBar, AutoBlogCarGrid | Preserver exactement les memes URL params |
| Options hardcodees | PropertySearchBar (6 arrays) | Extraire dans variables injectables |
| Formulaire avec action serveur | BookingForm | Hors scope, ne pas toucher |
| `useSearchParams` sans Suspense | FilterBar | Wrapper Suspense dans les callers |

---

## Critere de readiness par lot

### Lot 1 pret quand:
- types `ComponentVariable` exportes depuis `src/lib/component-variables/`
- tests unitaires passent

### Lot 4 pret quand:
- `ConfigurableFilterBar` visible dans `/showcase`
- `priceRangeSliderVariable` fonctionne avec slider + inputs + URL sync
- ancien `FilterBar` intact

### Lot 7 pret quand:
- `/demo/real-estate` utilise `realEstateVariables`
- `/demo/auto-blog` utilise `autoVariables`
- URL params inchanges
- e2e passe
