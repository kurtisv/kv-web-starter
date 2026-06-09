# Skill : Ajouter une page dashboard

## Quand l'utiliser
Chaque fois qu'une nouvelle section doit apparaitre dans le dashboard admin.

## Etapes

### 1. Creer le dossier et la page

```tsx
// apps/web/src/app/dashboard/ma-section/page.tsx
import type { Metadata } from "next";
import { requireDashboardAccess } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";

export const metadata: Metadata = { title: "Ma section" };

export default async function MaSectionPage() {
  const { organizationId } = await requireDashboardAccess();

  const items = await prisma.maTable.findMany({
    where: { organizationId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Ma section</h1>
        <p className="text-muted-foreground">Description courte.</p>
      </div>
      {/* contenu */}
    </div>
  );
}
```

### 2. Creer le loading skeleton

```tsx
// apps/web/src/app/dashboard/ma-section/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 w-48 rounded bg-muted" />
      <div className="h-4 w-64 rounded bg-muted" />
      <div className="h-32 rounded bg-muted" />
    </div>
  );
}
```

### 3. Ajouter dans la sidebar

```tsx
// apps/web/src/components/dashboard/sidebar.tsx
// Dans le tableau navItems, ajouter :
{ href: "/dashboard/ma-section", label: t("nav.maSection"), icon: MonIcon }
```

### 4. Ajouter la traduction

```ts
// fr.ts dans Dashboard.nav : maSection: "Ma section"
// en.ts dans Dashboard.nav : maSection: "My section"
```

## Points d'attention

- `requireDashboardAccess()` gere la redirection si non connecte ET charge l'organisation
- Utiliser `Promise.all([...])` pour les queries DB paralleles
- Toujours filtrer par `organizationId` dans les where clauses
- Les "use client" ne vont que dans des composants enfants interactifs
