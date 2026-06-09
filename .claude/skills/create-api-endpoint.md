# Skill : Creer un endpoint API v1

## Quand l'utiliser
Pour exposer des donnees ou actions via l'API REST publique (cles API + scopes).

## Pattern complet

```ts
// apps/web/src/app/api/v1/mon-resource/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireApiKey } from "@/lib/api-auth";
import { prisma } from "@/lib/db";
import { incrementApiUsage } from "@/modules/api-portal";

const querySchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
});

export async function GET(req: Request) {
  // 1. Verifier la cle API et les scopes
  const auth = await requireApiKey(req, ["resource:read"]);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  // 2. Valider les query params
  const url = new URL(req.url);
  const parsed = querySchema.safeParse(Object.fromEntries(url.searchParams));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid parameters", details: parsed.error.flatten() }, { status: 400 });
  }

  // 3. Query DB
  const { limit, offset } = parsed.data;
  const data = await prisma.maTable.findMany({
    where: { organizationId: auth.organizationId },
    take: limit,
    skip: offset,
    orderBy: { createdAt: "desc" },
  });

  // 4. Tracker l'usage (non-bloquant)
  void incrementApiUsage(auth.apiKeyId, "/api/v1/mon-resource");

  return NextResponse.json({ data, total: data.length });
}
```

## Codes de retour a respecter

| Code | Quand |
|------|-------|
| 200  | Succes |
| 400  | Params invalides (Zod failed) |
| 401  | Cle absente ou invalide |
| 403  | Scope insuffisant |
| 404  | Resource non trouvee |
| 429  | Rate limit atteint (gere par Upstash automatiquement) |
| 500  | Erreur serveur (loggee dans Sentry) |

## Schema OpenAPI

Apres avoir cree le endpoint, ajouter sa definition dans :
`apps/web/src/app/api/openapi.json`

## Points d'attention

- Ne jamais retourner des donnees d'une autre organisation (toujours filtrer par organizationId)
- `incrementApiUsage` est async — utiliser `void` pour ne pas bloquer la reponse
- Les erreurs 500 sont capturees automatiquement par le middleware Sentry
