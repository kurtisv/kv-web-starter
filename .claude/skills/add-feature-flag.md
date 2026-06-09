# Skill : Ajouter un feature flag

## Quand l'utiliser
Pour rendre un module activable/desactivable par variable d'environnement.

## Etapes

### 1. Declarer dans env.ts

```ts
// apps/web/src/lib/env.ts
// Dans le schema Zod, ajouter :
FEATURE_MON_MODULE: z
  .string()
  .optional()
  .transform((v) => v === "true")
  .default("false"),
```

### 2. Utiliser dans une page (Server Component)

```tsx
// apps/web/src/app/mon-module/page.tsx
import { notFound } from "next/navigation";
import { env } from "@/lib/env";

export default function MonModulePage() {
  if (!env.FEATURE_MON_MODULE) notFound();
  return <div>...</div>;
}
```

### 3. Utiliser dans un layout (guard global)

```tsx
// apps/web/src/app/mon-module/layout.tsx
import { notFound } from "next/navigation";
import { env } from "@/lib/env";

export default function MonModuleLayout({ children }: { children: React.ReactNode }) {
  if (!env.FEATURE_MON_MODULE) notFound();
  return <>{children}</>;
}
```

### 4. Ajouter dans .env.example

```bash
# Feature flags — true pour activer, absent ou false pour desactiver
FEATURE_MON_MODULE=false
```

### 5. Ajouter dans apps/web/.env.test si necessaire

```bash
FEATURE_MON_MODULE=true
```

## Flags existants

| Flag | Module |
|------|--------|
| `FEATURE_BOOKING` | Reservations (/booking, /dashboard/bookings) |
| `FEATURE_BILLING` | Paiements Stripe (/pricing, /dashboard/billing) |
| `FEATURE_API_PORTAL` | API + cles (/developers, /dashboard/api-keys) |
| `FEATURE_CMS` | Contenu Sanity (integration CMS) |

## Points d'attention

- Le flag est evalue au runtime — un changement de valeur necessite un redemarrage du serveur
- En production Vercel, changer la variable dans le dashboard et redeployer
- Ne pas utiliser les feature flags pour masquer des fonctionnalites de securite
