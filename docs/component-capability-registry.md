# Component Capability Registry

## Principe

Le Component Capability Registry est un catalogue structure de composants reutilisables du starter.
Il repond a une question simple : "quel composant dois-je utiliser pour ce cas d'usage ?"

Philosophie : **Decrire d'abord. Recommander ensuite. Generer en dernier.**

Le registre est deterministe, sans IA, sans dependance externe.
Il vit dans `apps/web/src/lib/component-registry/`.

---

## Structure des fichiers

```
apps/web/src/lib/component-registry/
  types.ts                     -- Types TypeScript du registre
  component-registry.ts        -- COMPONENT_REGISTRY: ComponentCapability[]
  recommend-components.ts      -- Moteur de recommandation par score
  validate-component-fit.ts    -- Validation domaine + maturite
  index.ts                     -- Re-exports publics
  component-registry.test.ts   -- Tests registre (forme, couverture)
  recommend-components.test.ts -- Tests moteur de recommandation + validation
```

---

## Utilisation pour les developpeurs

### Trouver un composant par domaine

```typescript
import { recommendComponents } from "@/lib/component-registry";

const suggestions = recommendComponents({ domain: "ecommerce", limit: 5 });
// Retourne les 5 meilleurs composants pour l'e-commerce, tries par score.
```

### Trouver un composant par categorie

```typescript
const filterComponents = recommendComponents({
  domain: "dashboard",
  category: "filter",
  limit: 3,
});
```

### Recherche par mot-cle

```typescript
const results = recommendComponents({ query: "booking reservation" });
// Matche sur le nom, la description, les tags et les cas d'usage.
```

### Combiner les criteres

```typescript
const results = recommendComponents({
  domain: "real-estate",
  category: "filter",
  requireVariables: ["realEstateVariables"],
  minMaturity: "stable",
  limit: 3,
});
```

### Valider qu'un composant est adapte a un domaine

```typescript
import { validateComponentFit } from "@/lib/component-registry";
import { COMPONENT_REGISTRY } from "@/lib/component-registry";

const cap = COMPONENT_REGISTRY.find((c) => c.id === "configurable-filter-bar")!;
const result = validateComponentFit(cap, "real-estate");
// { fits: true, warnings: [...], blockers: [] }
```

### Filtrer les composants aptes a un domaine

```typescript
import { filterFitComponents, COMPONENT_REGISTRY } from "@/lib/component-registry";

const ecomComponents = filterFitComponents(COMPONENT_REGISTRY, "ecommerce");
// Exclut automatiquement demo-only et experimental.
```

---

## Utilisation pour les agents IA

Le registre est concu pour etre consomme par un agent LLM qui aide a generer ou choisir des composants.

### Prompt suggere

```
Tu as acces au Component Capability Registry via les fonctions TypeScript suivantes :
- recommendComponents({ domain, category, query, requireVariables, minMaturity, limit })
- validateComponentFit(component, domain)
- filterFitComponents(components, domain)

Quand l'utilisateur demande "quel composant pour X", appelle d'abord recommendComponents,
puis cite l'id, le nom, l'importPath et un exemple d'usage.
Ne genere pas de nouveau composant si un existant convient.
```

### Exemple de workflow agent

1. Utilisateur : "J'ai besoin d'un composant pour afficher une liste de proprietes immobilieres avec filtre de prix."
2. Agent appelle : `recommendComponents({ domain: "real-estate", category: "filter" })`
3. Agent recoit : `ConfigurableFilterBar` (score 55), `DualRangeSlider` (score 40), `PropertyCard` (score 30)
4. Agent repond : "Utilise `ConfigurableFilterBar` avec le preset `realEstateVariables` et `PropertyCard` pour la grille."

---

## Types principaux

### ComponentCapability

```typescript
interface ComponentCapability {
  id: string;             // kebab-case unique ID
  name: string;           // nom de la fonction exportee
  importPath: string;     // "@/components/..."
  category: ComponentCategory;
  domains: ComponentDomain[];
  description: string;
  useCases: string[];
  compatibleVariables: string[];  // IDs de presets variable
  supportedStates: ComponentState[];
  maturity: ComponentMaturity;    // stable | beta | experimental | demo-only
  limitations: string[];
  tags: string[];
  examples?: ComponentExample[];
}
```

### Niveaux de maturite

| Niveau | Signification | Utilisation recommandee |
|--------|---------------|------------------------|
| `stable` | API fixe, teste, produit-ready | Toujours |
| `beta` | Fonctionne mais API peut changer | Projets internes |
| `experimental` | Preuve de concept | Avec precaution |
| `demo-only` | Donnees fictives hardcodees | Jamais en production |

### Domaines

| ID | Description |
|----|-------------|
| `general` | Applicable a tout type de site |
| `saas` | Applications SaaS, abonnements |
| `ecommerce` | Boutiques en ligne |
| `real-estate` | Immobilier |
| `auto-blog` | Blog automobile |
| `booking` | Reservations et rendez-vous |
| `local-business` | Commerce local, services |
| `dashboard` | Tableaux de bord admin |
| `api` | Portails developpeur et API |
| `portfolio` | Portfolios et agences |

---

## Ajouter un composant au registre

1. Identifier le composant a ajouter et ses props.
2. Ouvrir `component-registry.ts`.
3. Ajouter une entree `ComponentCapability` avec :
   - `id` : kebab-case derive du nom de la fonction
   - `importPath` : chemin `@/` exact
   - `maturity` : soyez conservateur — preferez `beta` plutot que `stable` si non teste
   - `limitations` : lister tout ce que le consommateur doit savoir
4. Lancer `pnpm typecheck && pnpm test` pour valider.

### Regles

- Ne pas ajouter des composants avec donnees hardcodees comme `stable`.
- Ne pas ajouter des composants qui touchent Prisma/Auth/Stripe/Resend sauf si necessaire.
- Chaque composant doit avoir au moins un tag et un use case.

---

## Variables compatibles

Les IDs de `compatibleVariables` correspondent aux presets dans `apps/web/src/lib/component-variables/presets/` :

| ID preset | Fichier |
|-----------|---------|
| `realEstateVariables` | presets/real-estate-variables.ts |
| `autoVariables` | presets/auto-variables.ts |
| `ecommerceVariables` | presets/ecommerce-variables.ts |
| `dashboardVariables` | presets/dashboard-variables.ts |
| `apiPortalVariables` | presets/api-portal-variables.ts |

Ces presets sont utilises par `ConfigurableFilterBar` et `VariableRenderer`.
Attention : les presets contiennent des fonctions `serialize`/`deserialize` et ne peuvent
pas traverser la frontiere serveur/client Next.js. Importer toujours les presets directement
dans un composant client, pas les passer via props depuis un composant serveur.

---

## Commandes de validation

```bash
pnpm typecheck    # 0 erreurs attendues
pnpm test         # component-registry.test.ts + recommend-components.test.ts doivent passer
```
