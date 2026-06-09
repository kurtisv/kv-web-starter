# ADR 004 — Rate limiting via Upstash Redis

**Date** : 2026-06  
**Statut** : Accepte

## Contexte

L'API publique (`/api/v1/*`) doit etre protegee contre les abus et le scraping. Le rate limiting doit fonctionner dans un environnement serverless/edge.

## Decision

Nous utilisons `@upstash/ratelimit` avec Redis Upstash en mode `slidingWindow`.

```ts
// modules/api-portal/rate-limit.ts
const rateLimiter = new Ratelimit({
  redis: new Redis({ url, token }),
  limiter: Ratelimit.slidingWindow(60, "1 m"),
  analytics: true,
});
```

## Raisons

1. **Edge-compatible** : Upstash Redis utilise une API REST over HTTPS. Pas de connexion TCP persistante — fonctionne dans les environnements serverless et edge (Vercel, Cloudflare).

2. **Sliding window** : Plus precis qu'un rate limit a fenetre fixe. Evite les rafales en debut de fenetre.

3. **Analytics integrees** : `analytics: true` enregistre les metriques dans Upstash pour monitoring.

4. **Soft-fail** : Si Upstash n'est pas configure (`UPSTASH_REDIS_REST_URL` absent), le rate limiter retourne `null` et l'API fonctionne sans limite. Utile en dev local.

5. **Par cle API** : L'identifiant de rate limit est la cle API (pour les cles DB) ou l'IP (pour les cles demo). Chaque client a son propre compteur.

## Limites actuelles et ameliorations possibles

- **Limite unique** : 60 req/min pour tous les plans. Une amelioration serait des limites differentes par plan (FREE: 10, PRO: 60, BUSINESS: 300).
- **Par endpoint** : Actuellement la meme limite s'applique a tous les endpoints `/api/v1/*`. On pourrait avoir des limites differentes par ressource.

## Alternatives ecartees

- **Redis conventionnel** : Necessite une connexion TCP persistante, incompatible edge.
- **Rate limiting en middleware** : Possible mais partage la meme limite pour auth et API — moins precis.
- **Rate limiting base sur la DB** : Trop lent (requete SQL par request), pas concu pour ca.
