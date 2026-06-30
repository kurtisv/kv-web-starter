# Filter System

## Architecture

Deux composants coexistent : le legacy `FilterBar` et le nouveau `ConfigurableFilterBar`.

```
FilterBar (wrapper public)
  |
  +-- variables prop? --> ConfigurableFilterBar (nouveau)
  |                         |-- VariableProvider
  |                         |-- FilterBarInner (useSearchParams)
  |                         |   |-- VariableRenderer x N  (inclut search si variable search presente)
  |                         |   |-- Bouton Effacer
  |
  +-- filters prop? ---> LegacyFilterBar (inchange, avec SearchInput dedie)
```

## FilterBar (backward-compat)

L'API originale reste inchangee :

```tsx
import { FilterBar, type FilterGroup } from "@/components/dashboard-ui/filter-bar";

const FILTERS: FilterGroup[] = [
  {
    key: "category",
    label: "Categorie",
    options: [
      { value: "sport",   label: "Sport" },
      { value: "berline", label: "Berline" },
    ],
  },
];

<FilterBar filters={FILTERS} searchPlaceholder="Rechercher..." />
```

## ConfigurableFilterBar (nouveau)

```tsx
import { ConfigurableFilterBar } from "@/components/component-variables";
import { realEstateVariables } from "@/lib/component-variables/presets";

<ConfigurableFilterBar
  variables={realEstateVariables}
  onValuesChange={(values) => console.log(values)}
/>
```

Le composant :
- rend uniquement les variables recues (pas de SearchInput automatique)
- le champ de recherche = `createTextVariable({ id: "search", urlKeys: "search" })`, rendu avec icone
- lit les valeurs initiales depuis l'URL au mount
- ecrit SEULEMENT les valeurs non-defaut dans l'URL (debounce 150ms, `router.replace`)
- gere le reset (efface les params geres)
- affiche un bouton "Effacer (N)" quand des filtres actifs existent

**URL propre** : `/page?type=maison&minPrice=400000` (pas `?search=&type=all&view=grid`)

## URL sync

Les params URL sont geres automatiquement par les `urlKeys` de chaque variable :

- Params geres = les `urlKeys` de toutes les variables
- Params non geres = preserves tels quels lors des mises a jour
- Valeurs egales au defaut = absentes de l'URL (URL propre)
- `page` est toujours supprime lors d'un changement de filtre

Exemple avec `realEstateVariables` (filtre actif) :
```
?type=appartement&minPrice=200000&maxPrice=600000&rooms=3
```

Etat vide (tout a defaut) :
```
/demo/real-estate
```

## Lire les filtres dans la page

```tsx
"use client";
import { useSearchParams } from "next/navigation";

function MyGrid() {
  const searchParams = useSearchParams();
  const search   = searchParams.get("search") ?? "";
  const type     = searchParams.get("type") ?? "all";
  const minPrice = Number(searchParams.get("minPrice") ?? "0");
  const maxPrice = Number(searchParams.get("maxPrice") ?? "2000000");

  const filtered = ALL_ITEMS.filter((item) => {
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase());
    const matchType   = type === "all" || item.type === type;
    const matchPrice  = item.price >= minPrice && item.price <= maxPrice;
    return matchSearch && matchType && matchPrice;
  });

  return <div>{filtered.map(...)}</div>;
}
```

Toujours placer `MyGrid` dans un `<Suspense>` car `useSearchParams` le requiert dans Next.js App Router.

## VariableRenderer — renderers disponibles

| Type detecte | Renderer |
|-------------|----------|
| `{ min, max }` (SliderRange) | Dual inputs + track visuel |
| `{ field, direction }` (Sort) | Select champ + toggle direction |
| `{ from, to }` (DateRange) | Deux date inputs |
| `string` + `options` dans metadata | Select |
| `boolean` | Checkbox |
| `number` | Input number |
| `string` avec `id === "search"` | Input text + icone Search + clear |
| `string` (defaut) | Input text |
| `variable.render` defini | Custom render fn |

## Ajouter un renderer custom

```typescript
const colorVariable = createComponentVariable<string>({
  id: "color",
  label: "Couleur",
  defaultValue: "#000000",
  render: ({ value, onChange, error }) => (
    <label>
      Couleur
      <input type="color" value={value} onChange={e => onChange(e.target.value)} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </label>
  ),
});
```

## DualRangeSlider 9/10

Le composant `DualRangeSlider` remplace le POC slider temporaire. Il est utilise automatiquement par `VariableRenderer` pour toute valeur `{ min, max }`.

**Pourquoi** : le POC utilisait deux `<input type="range">` avec `pointer-events-none`, ce qui les rendait non-interactifs. Le nouveau composant est entierement draggable souris + tactile + clavier.

**Comment l'utiliser** :

```typescript
createSliderRangeVariable({
  id: "priceRange",
  label: "Budget",
  min: 0,
  max: 2_000_000,
  step: 10_000,
  defaultValue: { min: 0, max: 2_000_000 },
  urlKeys: { min: "minPrice", max: "maxPrice" },
  format: (v) => `${(v / 1000).toFixed(0)}k€`,  // formatage optionnel
});
```

**Regles** :
- `defaultValue.max` doit egaler `max` pour que l'URL reste propre (sinon le defaut est ecrit)
- `step` est respecte au snap sur drag et keyboard
- Shift + fleche = step x10
- Home/End = aller aux bornes
- Inputs numeriques : valeur snappee et clampee
- NaN bloque silencieusement la mise a jour

**Limites** :
- Pas de librairie externe (Radix, etc.) : le track CSS est simple
- Interaction tactile fonctionne mais sans thumb visible pendant le drag (le thumb suit visuellement)
- Pas de tooltips au hover

## Checklist migration

- [ ] Identifier les filtres hardcodes dans le composant
- [ ] Creer des variables avec les factories appropriees
- [ ] Remplacer le composant filtre par `ConfigurableFilterBar`
- [ ] Lire les URL params dans la grille/liste
- [ ] Wrapper la grille dans `<Suspense>`
- [ ] Tester reset et URL sync
- [ ] Verifier desktop/mobile
- [ ] Ajouter tests
