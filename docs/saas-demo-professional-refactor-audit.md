# SaaS Demo Professional Refactor — Audit

Branch: feature/professional-saas-demo-refactor
Date: 2026-07-01

---

## 1. Ce que la demo actuelle fait bien

- Design premium avec `data-theme="premium-saas"` et bg-profile-soft-gradient
- HeroSection avec MetricGrid miniature integrée dans le hero media
- Composants SaaS réutilisables existants: SubscriptionStatusCard (5 états), UsageQuotaCard (progress bars colorées), PlanComparisonTable (sticky header, mobile overflow-x), InvoiceList (statuts, download mock), UpgradeModal (sélection plan, feedback mock), CancelSubscriptionDialog (raison, flow complet)
- SaasDemoActions coordonne les modals
- TestimonialSection, StatsSection, PricingSection réutilisées
- Pas de dépendances externes non nécessaires

---

## 2. Ce qui manque pour être un SaaS demo complet

### Architectural
- Pas de sous-routes: /demo/saas/dashboard, /billing, /usage, /security, /settings
- Pas de shell/nav interne SaaS (navigation entre les sections du produit)
- Pas de données mock centralisées (duplication inline dans page.tsx)

### Fonctionnel (P1)
- Pas de dashboard post-login avec métriques, activité, churn risks
- Pas de billing center dédié (upgrade, invoices, payment method)
- Pas de page usage/metering (quotas par catégorie, overage forecast)
- Pas de page security/compliance (audit logs, SSO, API keys)
- Pas de page settings/workspace (team, integrations, danger zone)
- Pas d'onboarding checklist
- Pas de feature adoption panel
- Pas de customer health panel

### UX/Mobile (P2)
- La landing actuelle est fonctionnelle mais pas encore "professional SaaS demo"
- Manque: Problem/Solution, Feature Bento, Dashboard Preview, Workflow section, FAQ, Integrations section
- Mobile: composants SaaS actuels OK sur 390px mais pages manquantes

### Accessibilité (P2)
- Progress bars UsageQuotaCard: manquent aria-label et role="progressbar"
- Pas de landmark regions sur les nouvelles sections à créer

---

## 3. Composants existants à réutiliser

- `SubscriptionStatusCard` — déjà complet, à enrichir avec variant compact/full
- `UsageQuotaCard` — à améliorer avec aria-label sur progress bars
- `PlanComparisonTable` — OK, scroll horizontal déjà géré
- `InvoiceList` — à enrichir avec status past_due et action "Voir"
- `UpgradeModal` — OK, utilisable tel quel dans billing
- `CancelSubscriptionDialog` — OK
- `MetricCard` / `MetricGrid` (dashboard-ui) — réutilisables dans dashboard
- `ActivityFeed` (dashboard-ui) — réutilisable pour activité
- `AuditLogTimeline` (dashboard-ui) — réutilisable pour security
- `StatusBadge` (dashboard-ui) — réutilisable partout
- `HeroSection`, `StatsSection`, `PricingSection`, `CTASection`, `TestimonialSection`, `FAQSection` (sections)

---

## 4. Nouveaux composants à créer

### Shell (partagé)
- `saas-demo-shell.tsx` — wrapper nav interne SaaS
- `saas-demo-nav.tsx` — nav bar interne (Landing/Dashboard/Billing/Usage/Security/Settings)

### Dashboard (LOT 3)
- `saas-kpi-grid.tsx` — grille KPI (MRR, ARR, Churn, Activation)
- `onboarding-checklist.tsx` — tâches onboarding avec état
- `customer-health-card.tsx` — health scores clients
- `feature-adoption-panel.tsx` — adoption par feature
- `churn-risk-panel.tsx` — clients à risque de churn
- `saas-activity-feed.tsx` — wrapper activité SaaS

### Billing (LOT 4)
- `billing-summary-card.tsx` — résumé facturation en cours
- `payment-method-card.tsx` — moyen de paiement mock
- `revenue-recovery-card.tsx` — relance paiement échoué
- `customer-portal-card.tsx` — portail client mock

### Usage (LOT 5)
- `usage-overview-panel.tsx` — vue d'ensemble quotas
- `metering-events-table.tsx` — événements de metering
- `usage-forecast-card.tsx` — prévision overage
- `quota-alert-card.tsx` — alertes quota

### Security (LOT 6)
- `security-posture-card.tsx` — score sécurité
- `audit-log-table.tsx` — table audit logs
- `api-key-list.tsx` — liste clés API maskées
- `team-members-table.tsx` — membres et rôles
- `compliance-checklist.tsx` — checklist compliance

### Settings (LOT 7)
- `workspace-settings-card.tsx` — profil workspace
- `notification-settings-card.tsx` — préférences notifications
- `integration-card.tsx` — carte intégration individuelle
- `danger-zone-card.tsx` — actions destructives mockées

---

## 5. Routes à ajouter

- `/demo/saas` — refactorée (LOT 2)
- `/demo/saas/dashboard` — nouvelle (LOT 3)
- `/demo/saas/billing` — nouvelle (LOT 4)
- `/demo/saas/usage` — nouvelle (LOT 5)
- `/demo/saas/security` — nouvelle (LOT 6)
- `/demo/saas/settings` — nouvelle (LOT 7)

---

## 6. Risques identifiés

### P0
- Aucun P0 connu dans le code actuel

### P1
- Données mock non centralisées: risque de divergence entre pages
- Hydration mismatch si `new Date()` utilisé dans le rendu (interdit)
- Liens morts entre sous-routes si shell nav pointe vers routes non encore créées

### P2
- Progress bars sans aria-label/role (accessibilité)
- Mobile: nouvelles pages dashboard-like peuvent déborder sur 390px si tables non gérées
- PlanComparisonTable: sticky left sur mobile peut causer des conflits avec overflow-x

### P3
- Couleurs non-token possibles dans nouveaux composants (à surveiller)
- Claims de type "SOC2 certified" à marquer clairement comme démo

---

## 7. Plan de refactor

1. Données mock centralisées (`lib/demo-data/saas-demo-data.ts`)
2. Shell/nav SaaS partagé
3. Refactor landing (13 sections)
4. Dashboard complet
5. Billing center
6. Usage/metering
7. Security/compliance
8. Settings/workspace
9. Polish composants existants (aria, états, variants)
10. Registry + prototype engine
11. E2E (21 tests minimum)
12. Documentation

---

## 8. Validation à chaque lot

- pnpm lint
- pnpm typecheck
- pnpm test
- pnpm build (LOT 1+)
