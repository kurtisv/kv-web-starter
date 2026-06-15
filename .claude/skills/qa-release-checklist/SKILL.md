# Skill: QA Release Checklist

Checklist complete avant chaque release de kv-web-starter.

## Procedure

### 1. Qualite du code

```bash
pnpm typecheck     # 0 erreur TypeScript
pnpm lint          # 0 warning ESLint
pnpm test          # Tests Vitest passent
pnpm format --check # Prettier ok
```

### 2. Build

```bash
pnpm build         # Build Next.js sans erreur
```

Si le build echoue:
- Lire l'erreur complete
- Chercher les imports manquants, types incorrects, pages avec erreurs
- Corriger et relancer

### 3. Tests E2E

```bash
pnpm test:e2e      # Playwright (necessite DB locale)
```

### 4. Verification des pages demo

Visiter chaque page et verifier:
- [ ] `/demo/portfolio` — theme corporate-classic, responsive
- [ ] `/demo/saas` — theme premium-saas, dashboard preview visible
- [ ] `/demo/booking` — theme local-business, creneaux affiches
- [ ] `/demo/api` — theme dark-tech-api, code sample lisible
- [ ] `/demo/real-estate` — theme real-estate, cards biens visibles
- [ ] `/demo/local-business` — theme local-business, services + avis
- [ ] `/demo/auto-blog` — theme luxury-auto, fiches voitures
- [ ] `/demo/ecommerce` — theme ecommerce-clean, produits + panier
- [ ] `/demo/dashboard` — theme premium-saas, KPIs + table

### 5. Verification design system

- [ ] Aucune couleur hardcodee dans les composants (hors globals.css)
- [ ] Tous les themes fonctionnent sans cassure visuelle
- [ ] ThemePreviewCard affiche les 7 themes

### 6. Verification stack metier

- [ ] `/login` fonctionne
- [ ] `/dashboard` redirige correctement si non connecte
- [ ] `/pricing` affiche les plans Stripe (si FEATURE_BILLING=true)
- [ ] `/booking` affiche les creneaux
- [ ] `/developers` affiche la reference API

### 7. Checklist finale

- [ ] `pnpm check` passe (lint + typecheck + test)
- [ ] `pnpm build` passe
- [ ] `/demo` index affiche les 9 demos
- [ ] CLAUDE.md a jour
- [ ] docs/ a jour si architecture modifiee
