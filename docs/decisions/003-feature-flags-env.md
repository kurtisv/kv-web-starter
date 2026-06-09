# ADR 003 — Feature flags via variables d'environnement

**Date** : 2026-06  
**Statut** : Accepte

## Contexte

Le boilerplate inclut plusieurs modules optionnels (booking, api-portal, billing, cms). Il faut un mecanisme pour les activer ou desactiver selon le projet.

## Decision

Les feature flags sont des variables d'environnement validees par Zod dans `lib/env.ts`.

```ts
FEATURE_BOOKING: z.coerce.boolean().default(true),
FEATURE_API_PORTAL: z.coerce.boolean().default(true),
FEATURE_CMS: z.coerce.boolean().default(false),
FEATURE_BILLING: z.coerce.boolean().default(true),
```

## Raisons

1. **Simplicite** : Pas de table DB supplementaire, pas de UI d'administration, pas de SDK tiers.

2. **Type-safety** : Zod valide les valeurs au demarrage de l'application. Une valeur incorrecte plante au boot plutot qu'en production.

3. **Adapte au clonage** : Quand on clone le boilerplate pour un nouveau projet, on copie `.env.example` et on change les flags. Aucune migration DB n'est necessaire.

4. **Compatible avec les feature flags de deploiement** : Les plateformes comme Vercel, Railway, et Fly.io permettent de gerer les variables d'env par environment (preview, staging, production). On peut activer un module uniquement en production sans toucher le code.

## Compromis acceptes

- **Pas de flags dynamiques** : Un changement de flag necessite un redeploi. Pour des flags qui changent souvent, utiliser un service ddie (LaunchDarkly, GrowthBook).

- **Pas de flags par utilisateur** : Ces flags s'appliquent a toute l'application. Pour des flags par tenant ou par utilisateur, utiliser la table `Subscription.plan` et `hasPlanEntitlement()`.

## Alternatives ecartees

- **Table DB `FeatureFlag`** : Overhead de migration, necessite UI d'admin, requete DB au runtime.
- **Fichier JSON** : Difficile a securiser, pas de validation de type, necessite un rechargement.
- **SDK tier (LaunchDarkly)** : Overkill pour un boilerplate, ajoute une dependance payante.
