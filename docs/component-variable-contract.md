# Component Variable Contract

> Lot 0 — kv-web-starter
> Date: 2026-06-30
> Definit le contrat TypeScript d'une variable de composant.

## Philosophie

```
Default first. Factory second. Custom last.
```

Une variable de composant est un objet typee qui decrit:
- **ce qu'elle contient** (valeur, type)
- **comment elle se comporte** (validation, serialisation, dependances)
- **comment elle s'affiche** (rendu, libelles, ordre)
- **comment elle se synchronise** (URL params)

---

## Interface principale

```ts
interface ComponentVariable<TValue = unknown, TContext = Record<string, unknown>> {
  // --- Identite ---
  id: string;
  label: string;
  description?: string;

  // --- Valeur ---
  defaultValue: TValue;

  // --- Affichage ---
  group?: string;
  order?: number;
  icon?: React.ReactNode;
  layout?: "inline" | "block" | "compact";
  debugLabel?: string;

  // --- Metadonnees ---
  metadata?: Record<string, unknown>;

  // --- Comportement ---
  validate?: (value: TValue, context?: TContext) => string | null;
  normalize?: (value: TValue) => TValue;

  // --- Serialisation URL ---
  serialize?: (value: TValue) => string | Record<string, string>;
  deserialize?: (raw: string | Record<string, string>) => TValue;
  urlKeys?: string | Record<string, string>;

  // --- Rendu custom ---
  render?: (props: VariableRenderProps<TValue>) => React.ReactNode;

  // --- Visibilite et acces ---
  isVisible?: (context: TContext) => boolean;
  isDisabled?: (context: TContext) => boolean;

  // --- Dependances ---
  dependencies?: string[];
}

interface VariableRenderProps<TValue> {
  value: TValue;
  onChange: (value: TValue) => void;
  error?: string | null;
  disabled?: boolean;
}
```

---

## Regles du contrat

### 1. `id` est unique dans une liste de variables

Deux variables dans le meme contexte (FilterBar, form, etc.) ne peuvent pas avoir le meme `id`. L'`id` est aussi utilise comme cle URL si `urlKeys` n'est pas fourni.

### 2. `defaultValue` est toujours defini

Une variable doit toujours avoir une valeur par defaut valide. Jamais `undefined`.

### 3. `validate` retourne `null` si valide

```ts
validate(value) => null            // ok
validate(value) => "Message erreur" // ko — message affiche
```

### 4. `serialize` / `deserialize` sont symetriques

```ts
deserialize(serialize(value)) === value  // toujours vrai
```

### 5. `render` remplace le renderer par defaut

Si `render` est fourni, le `VariableRenderer` l'utilise au lieu du renderer generique. Utile pour des cas custom avances.

### 6. `isVisible` et `isDisabled` recoivent le contexte complet

Le contexte contient les valeurs courantes de toutes les variables. Cela permet de creer des dependances dynamiques:

```ts
isVisible: (ctx) => ctx.type !== "all"
isDisabled: (ctx) => ctx.maxPrice === "0"
```

### 7. `dependencies` est optionnel

Declare quels `id` de variables influencent celle-ci. Utilise par le renderer pour re-evaluer `isVisible`/`isDisabled` quand les dependances changent.

---

## Types de variables prevus

| Type | Factory | Valeur TValue |
|------|---------|---------------|
| Texte | `createTextVariable` | `string` |
| Nombre | `createNumberVariable` | `number` |
| Nombre (plage) | `createNumberRangeVariable` | `{ min: number; max: number }` |
| Slider (plage) | `createSliderRangeVariable` | `{ min: number; max: number }` |
| Selection | `createSelectVariable` | `string` |
| Selection multiple | `createMultiSelectVariable` | `string[]` |
| Booleen | `createBooleanVariable` | `boolean` |
| Date | `createDateVariable` | `string` (ISO) |
| Plage de dates | `createDateRangeVariable` | `{ from: string; to: string }` |
| Tri | `createSortVariable` | `{ field: string; direction: "asc" \| "desc" }` |
| Mode d'affichage | `createViewModeVariable` | `"grid" \| "list"` |
| Statut | `createStatusVariable` | `string` |
| Devise | `createCurrencyVariable` | `number` |
| Note | `createRatingVariable` | `number` |
| Localisation | `createLocationVariable` | `string` |
| Rendu custom | `createCustomRenderVariable` | `unknown` |

---

## Exemple concret: SliderRangeVariable

```ts
const priceVariable = createSliderRangeVariable({
  id: "price",
  label: "Prix",
  defaultValue: { min: 0, max: 1000000 },
  min: 0,
  max: 2000000,
  step: 10000,
  format: (v) => `${(v / 1000).toFixed(0)} k€`,
  urlKeys: { min: "minPrice", max: "maxPrice" },
  validate: ({ min, max }) =>
    min > max ? "Le minimum doit etre inferieur au maximum" : null,
});
```

---

## Exemple concret: SelectVariable

```ts
const typeVariable = createSelectVariable({
  id: "propertyType",
  label: "Type de bien",
  defaultValue: "all",
  options: [
    { value: "all",         label: "Tous les biens" },
    { value: "appartement", label: "Appartement" },
    { value: "maison",      label: "Maison" },
  ],
  urlKeys: "type",
});
```

---

## Exemple concret: Variable custom de A a Z

```ts
const customRadiusVariable: ComponentVariable<number> = {
  id: "searchRadius",
  label: "Rayon de recherche",
  description: "Distance en km autour de la localisation",
  defaultValue: 25,
  group: "geo",
  order: 10,
  validate: (v) => (v < 1 || v > 500 ? "Entre 1 et 500 km" : null),
  normalize: (v) => Math.round(v),
  serialize: (v) => String(v),
  deserialize: (raw) => Number(raw),
  urlKeys: "radius",
  render: ({ value, onChange, error }) => (
    <div>
      <input
        type="range"
        min={1}
        max={500}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span>{value} km</span>
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  ),
};
```

---

## Ce que le contrat NE permet PAS

- Une variable ne connait pas le composant qui l'affiche.
- Une variable ne fait pas d'appels reseau.
- Une variable ne contient pas de business logic metier.
- Une variable ne stocke pas son propre etat — c'est le `VariableProvider` qui gere l'etat.
