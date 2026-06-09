# QA Checklist — kv-web-starter

Checklist a valider avant chaque livraison client ou deployment production.

---

## Securite

- [ ] `AUTH_SECRET` est defini et a au moins 32 caracteres
- [ ] `AUTH_ENABLE_DEMO_LOGIN=false` en production
- [ ] `AUTH_DEMO_PASSWORD` n'est pas "password123" si demo login actif
- [ ] `pnpm audit` ne remonte aucune vulnerabilite critique ou haute
- [ ] Les headers de securite sont presentes (verifier `/api/health` avec `curl -I`)
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Content-Security-Policy` present
- [ ] Aucune variable `NEXT_PUBLIC_` ne contient une cle secrete
- [ ] Webhook Stripe verifie la signature (`STRIPE_WEBHOOK_SECRET` configure)
- [ ] Toutes les routes `/dashboard/*` redirigent sans session (tester en mode prive)
- [ ] Les cles API sont hashees dans la DB (verifier `ApiKey.hashedKey` != cle en clair)

---

## Mobile et Accessibilite

- [ ] Toutes les pages principales fonctionnent sur 375px (iPhone SE)
- [ ] Le menu mobile dashboard s'ouvre et se ferme correctement
- [ ] Les formulaires sont utilisables au clavier (Tab, Enter, Escape)
- [ ] Les images ont des attributs `alt`
- [ ] Les boutons et liens ont des labels accessibles (`aria-label` si icon-only)
- [ ] Le focus est visible sur tous les elements interactifs
- [ ] Les messages d'erreur de formulaire sont lies aux champs (`aria-describedby` ou association label)
- [ ] Contraste des couleurs suffisant (WCAG AA minimum)

---

## Performance

- [ ] `pnpm build` passe sans erreur et sans warning
- [ ] Les pages marketing sont servies en moins de 200ms TTFB (mesurer avec Lighthouse)
- [ ] Les images utilisent `next/image` avec des dimensions explicites
- [ ] Les fonts sont chargees avec `next/font/google`
- [ ] Aucun import de librairie entiere (`import _ from 'lodash'` interdit — utiliser imports specifiques)

---

## SEO

- [ ] Chaque page a un `title` unique (via `export const metadata`)
- [ ] Chaque page a une `description` de moins de 160 caracteres
- [ ] `metadataBase` est configure dans le root layout
- [ ] `robots.ts` ne bloque pas les pages importantes
- [ ] `sitemap.ts` inclut les pages publiques principales

---

## Auth et Acces

- [ ] Login GitHub fonctionne (si configure)
- [ ] Login demo fonctionne (si active)
- [ ] `requireDashboardAccess()` redirige un utilisateur non-admin
- [ ] Le bootstrap automatique (premier user) cree un OWNER
- [ ] `DASHBOARD_BOOTSTRAP_EMAILS` est configure en production

---

## Billing (si `FEATURE_BILLING=true`)

- [ ] Checkout Stripe cree une session valide
- [ ] Le portal client Stripe s'ouvre correctement
- [ ] Le webhook Stripe traite `checkout.session.completed`
- [ ] Le webhook Stripe traite `customer.subscription.updated`
- [ ] `hasPlanEntitlement()` retourne false pour un user sans abonnement actif
- [ ] Les prix Stripe (`STRIPE_PRICE_PRO`, `STRIPE_PRICE_BUSINESS`) pointent vers les bons produits

---

## API Portal (si `FEATURE_API_PORTAL=true`)

- [ ] Une requete sans cle retourne 401
- [ ] Une requete avec une cle revoquee retourne 401
- [ ] Une requete avec un plan insuffisant retourne 402
- [ ] Le rate limit retourne 429 apres depassement
- [ ] L'usage est enregistre dans `ApiUsage` apres une requete reussie
- [ ] `lastUsedAt` est mis a jour sur la cle utilisee

---

## Booking (si `FEATURE_BOOKING=true`)

- [ ] Les creneaux disponibles se calculent correctement selon les regles
- [ ] Les exceptions de disponibilite bloquent les creneaux concernes
- [ ] Une reservation est creee en statut `PENDING`
- [ ] L'email de confirmation est envoye (si Resend configure)

---

## Emails (si Resend configure)

- [ ] `RESEND_API_KEY` et `RESEND_FROM_EMAIL` sont configures
- [ ] Les templates React Email se rendent correctement en preview
- [ ] Les emails ne sont pas marques spam (verifier SPF/DKIM/DMARC du domaine)

---

## Tests

- [ ] `pnpm test` passe (0 echec)
- [ ] `pnpm test:e2e` passe (necessite DB et app en cours)
- [ ] Couverture des modules critiques : billing, api-portal, booking, auth

---

## CI/CD

- [ ] Le workflow CI passe sur la branch `main`
- [ ] Le workflow security ne remonte aucune vulnerabilite critique
- [ ] Les migrations de production sont appliquees avant le deploiement
- [ ] Les variables d'environnement de production sont configurees sur la plateforme
