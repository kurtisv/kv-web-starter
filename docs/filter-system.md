# Filter System

## Architecture

Deux composants coexistent : le legacy `FilterBar` et le nouveau `ConfigurableFilterBar`.

```
FilterBar (wrapper public)
  |
  +-- variables prop? --> ConfigurableFilterBar (nouveau)
  |                         |-- VariableProvider
  |                         |-- FilterBarInner (useSearchParams)
  |                         |   |-- SearchInput
  |                         |   |-- VariableRenderer x N
  |                         |   |-- Bouton Effacer
  |
  +-- filters prop? ---> LegacyFilterBar (inchange)
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
  searchPlaceholder="Ville, quartier..."
  onValuesChange={(values) => console.log(values)}
/>
```

Le composant :
- wraps chaque variable dans `VariableRenderer`
- lit les valeurs initiales depuis l'URL au mount
- ecrit les changements dans l'URL (debounce 150ms, `router.replace`)
- gere le reset (efface les params geres)
- affiche un bouton "Effacer (N)" quand des filtres actifs existent

## URL sync

Les params URL sont geres automatiquement par les `urlKeys` de chaque variable. Le composant maintient une separation propre :

- Params geres = les `urlKeys` de toutes les variables + `search`
- Params non geres = preserves tels quels lors des mises a jour

Exemple avec `realEstateVariables` :
```
?search=paris&type=appartement&minPrice=200000&maxPrice=600000&rooms=3
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

## Checklist migration

- [ ] Identifier les filtres hardcodes dans le composant
- [ ] Creer des variables avec les factories appropriees
- [ ] Remplacer le composant filtre par `ConfigurableFilterBar`
- [ ] Lire les URL params dans la grille/liste
- [ ] Wrapper la grille dans `<Suspense>`
- [ ] Tester reset et URL sync
- [ ] Verifier desktop/mobile
- [ ] Ajouter tests
