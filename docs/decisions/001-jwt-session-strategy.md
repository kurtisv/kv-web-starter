# ADR 001 — Strategie de session JWT

**Date** : 2026-06  
**Statut** : Accepte

## Contexte

Auth.js v5 supporte deux strategies de session : `database` et `jwt`.

## Decision

Nous utilisons `strategy: "jwt"`.

## Raisons

1. **Compatibilite edge** : Le middleware Next.js s'execute sur l'edge runtime. Avec JWT, la verification de session est entierement stateless — pas de requete DB par request, donc compatible edge sans driver special.

2. **Performance** : Chaque requete protegee n'implique pas de round-trip base de donnees pour verifier la session. La session est embarquee dans le cookie (chiffre avec AUTH_SECRET).

3. **Simplicite de deploiement** : Le middleware `middleware.ts` peut verifier l'authentification avec `auth.config.ts` (edge-safe, sans PrismaAdapter) sans dupliquer la logique.

## Compromis acceptes

- **Invalidation de session** : On ne peut pas revoquer un JWT avant son expiration naturelle (Auth.js expire les tokens a chaque reconnexion). Si un utilisateur doit etre force a se deconnecter, il faut changer le `AUTH_SECRET` (invalide tous les tokens).
- **Donnees de session limitees** : On stocke uniquement `{ id, name, email }` dans le JWT — pas les roles, pas les permissions. Les donnees sensibles (role, org) sont lues de la DB a chaque requete protegee via `requireDashboardAccess()`.

## Alternatives ecartees

- **Database sessions** : Plus facile a invalider, mais incompatible avec le middleware edge et plus lent (requete DB par request).
