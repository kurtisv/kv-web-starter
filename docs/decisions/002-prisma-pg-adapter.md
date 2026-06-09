# ADR 002 — Prisma avec PrismaPg adapter

**Date** : 2026-06  
**Statut** : Accepte

## Contexte

Prisma supporte plusieurs modes de connexion PostgreSQL.

## Decision

Nous utilisons `@prisma/adapter-pg` avec le driver `pg` natif Node.js.

```ts
// lib/db.ts
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
```

## Raisons

1. **Performance sur Node.js** : Le driver `pg` utilise les connexions TCP directes. Pas de surcouche HTTP comme avec Neon ou Supabase Serverless.

2. **Transactions natives** : `prisma.$transaction([...])` fonctionne parfaitement avec `pg`.

3. **Compatibilite Docker locale** : Connexion directe au conteneur PostgreSQL sans configuration reseau supplementaire.

4. **Future-proof** : `@prisma/adapter-pg` est le chemin vers le nouveau Prisma Client v7+ avec drivers interchangeables.

## Compromis acceptes

- **Pas de Serverless natif** : Pour deployer sur des environnements purement serverless (Vercel Edge Functions, Cloudflare Workers), il faudrait utiliser `@prisma/adapter-neon` ou `@prisma/adapter-pg` avec pgBouncer. Les Server Components et Route Handlers Next.js sont Node.js, donc `pg` convient.

- **Connection pooling** : En production, utiliser un pooler comme PgBouncer ou la feature connection pooling de Supabase/Neon devant le `DATABASE_URL`.

## Migration vers Supabase ou Neon

Changer uniquement `lib/db.ts` :
```ts
import { PrismaNeon } from "@prisma/adapter-neon";
// ou
import { PrismaSupabase } from "@prisma/adapter-supabase";
```
Le schema Prisma et le reste du code restent identiques.
