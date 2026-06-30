# Component Variables System

## Philosophie

```
Default first. Factory second. Custom last.
```

Le systeme de component variables transforme les composants UI statiques en composants pilotes par des variables injectables. Chaque variable porte sa valeur, sa validation, sa serialisation URL, et son rendu.

## Architecture

```
lib/component-variables/
  types.ts                  # ComponentVariable<TValue, TContext>
  create-component-variable.ts
  variable-validation.ts
  variable-serialization.ts
  variable-dependencies.ts
  variable-visibility.ts
  variable-value-store.ts
  factories.ts              # 16 factories predefinies
  index.ts
  presets/
    real-estate-variables.ts
    auto-variables.ts
    ecommerce-variables.ts
    dashboard-variables.ts
    api-portal-variables.ts
    index.ts
  react/
    variable-provider.tsx   # VariableProvider, useVariable, useAllVariables
    use-url-sync.ts         # useUrlInitialValues, useAutoUrlSync
    index.ts

components/component-variables/
  configurable-filter-bar.tsx  # Composant principal
  variable-renderer.tsx        # Dispatcher de renderers
  index.ts
```

## 1. Utiliser une variable par defaut

Chaque factory cree une variable typee avec un comportement sane par defaut.

```typescript
import { createSelectVariable } from "@/lib/component-variables";

const statusVariable = createSelectVariable({
  id: "status",
  label: "Statut",
  urlKeys: "status",
  options: [
    { value: "all",   label: "Tous" },
    { value: "open",  label: "Ouvert" },
    { value: "closed",label: "Ferme" },
  ],
});
```

## 2. Creer une variable avec factory

```typescript
import { createSliderRangeVariable } from "@/lib/component-variables";

const priceRange = createSliderRangeVariable({
  id: "priceRange",
  label: "Budget",
  min: 0,
  max: 1_000_000,
  step: 10_000,
  defaultValue: { min: 0, max: 500_000 },
  urlKeys: { min: "minPrice", max: "maxPrice" },
});
```

## 3. Creer une variable custom de A a Z

```typescript
import { createComponentVariable } from "@/lib/component-variables";

const colorVariable = createComponentVariable<string>({
  id: "color",
  label: "Couleur",
  defaultValue: "#000000",
  urlKeys: "color",
  validate: (v) => /^#[0-9a-f]{6}$/i.test(v) ? null : "Couleur invalide",
  serialize: (v) => v,
  deserialize: (raw) => (typeof raw === "string" && raw.startsWith("#") ? raw : "#000000"),
  render: ({ value, onChange, error }) => (
    <div>
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} />
      {error && <p>{error}</p>}
    </div>
  ),
});
```

## 4. Synchroniser avec l'URL

L'URL sync est automatique quand `urlKeys` est defini. Pour une variable simple, une cle string suffit. Pour une valeur complexe (slider range, sort), passer un objet :

```typescript
// Simple
createTextVariable({ id: "search", urlKeys: "q" });

// Complexe
createSliderRangeVariable({ id: "price", urlKeys: { min: "priceMin", max: "priceMax" } });
```

Dans `ConfigurableFilterBar`, les valeurs sont lues depuis l'URL au mount et ecrites a chaque changement (debounce 150ms).

## 5. Valider une variable

```typescript
const ageVariable = createNumberVariable({
  id: "age",
  label: "Age",
  min: 18,
  max: 120,
  validate: (v) => {
    if (v < 18) return "Vous devez avoir au moins 18 ans.";
    return null;
  },
});
```

La validation s'affiche automatiquement sous le champ si elle retourne une string non-nulle.

## 6. Brancher dans FilterBar

```tsx
import { FilterBar } from "@/components/dashboard-ui/filter-bar";
import { myVariables } from "./my-variables";

// Nouveau mode — variable system
<FilterBar variables={myVariables} onValuesChange={(values) => console.log(values)} />

// Ancien mode — toujours supporte
<FilterBar filters={FILTER_GROUPS} searchPlaceholder="Rechercher..." />
```

## 7. Creer un preset par industrie

```typescript
// presets/my-industry-variables.ts
import { createTextVariable, createSelectVariable, createSliderRangeVariable } from "@/lib/component-variables";

export const myIndustryVariables = [
  createTextVariable({ id: "search", label: "Recherche", urlKeys: "q" }),
  createSelectVariable({ id: "category", label: "Categorie", urlKeys: "cat", options: [...] }),
  createSliderRangeVariable({ id: "price", label: "Prix", min: 0, max: 10000, urlKeys: { min: "pMin", max: "pMax" } }),
];
```

## 8. Migrer un composant existant

Etapes pour migrer un composant filtre existant :

1. Identifier les filtres hardcodes.
2. Creer les variables equivalentes (presets ou customs).
3. Ajouter `ConfigurableFilterBar` au cote de l'ancien composant.
4. Wirer les filtres URL dans la logique de rendu.
5. Supprimer l'ancien composant quand les tests passent.

Voir : `apps/web/src/app/demo/real-estate/page.tsx` — migration de `PropertySearchBar` vers `ConfigurableFilterBar`.

## 9. Ce qu'il ne faut pas faire

```
NON : <UniversalComponent config={massiveJsonConfig} />
OUI : Plusieurs variables composees proprement.

NON : Tout migrer d'un coup.
OUI : Un composant a la fois, tests apres chaque.

NON : Mettre la logique de filtre dans la variable.
OUI : Lire les params URL dans le composant, filtrer les donnees.

NON : Creer un nouveau renderer pour chaque type.
OUI : Utiliser le custom render fn si le renderer par defaut ne convient pas.
```

## Factories disponibles

| Factory | Type de valeur | URL sync |
|---------|---------------|----------|
| `createTextVariable` | `string` | cle simple |
| `createNumberVariable` | `number` | cle simple |
| `createSelectVariable` | `string` | cle simple |
| `createMultiSelectVariable` | `string[]` | cle simple (comma-join) |
| `createBooleanVariable` | `boolean` | cle simple |
| `createSliderRangeVariable` | `{ min, max }` | deux cles |
| `createDateVariable` | `string` (ISO) | cle simple |
| `createDateRangeVariable` | `{ from, to }` | deux cles |
| `createSortVariable` | `{ field, direction }` | deux cles |
| `createViewModeVariable` | `"grid" \| "list"` | cle simple |
| `createStatusVariable` | `string` | cle simple |
| `createRatingVariable` | `number` | cle simple |
| `createCurrencyVariable` | `number` | cle simple |
| `createLocationVariable` | `{ address, lat?, lng? }` | cles objet |
| `createRelationVariable` | `string` | cle simple |
| `createMediaVariable` | `string` | cle simple |
