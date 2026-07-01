# Component Capability Audit
Branch: feature/component-capability-registry
Date: 2026-06-30

Inventaire des composants existants dans `apps/web/src/components/` et `apps/web/src/app/demo/*`.
Objectif : distinguer les composants reutilisables des composants demo-only, et identifier les risques.

---

## 1. Page sections (`components/sections/`)

| Composant | Chemin | Role | Domaines | Maturite |
|-----------|--------|------|----------|----------|
| `HeroSection` | sections/hero-section.tsx | Hero standard avec eyebrow/title/description/actions | general, saas, portfolio, local-business | stable |
| `AnimatedHero` | sections/animated-hero.tsx | Hero avec animation Framer Motion | general, saas, portfolio | stable |
| `VideoHeroSection` | sections/video-hero-section.tsx | Hero avec video de fond | general, saas | beta |
| `FeatureGrid` | sections/feature-grid.tsx | Grille de features avec icones | general, saas, api | stable |
| `StatsSection` | sections/stats-section.tsx | Compteurs animes (InView) | general, saas, portfolio | stable |
| `TestimonialSection` | sections/testimonial-section.tsx | Grille de temoignages | general, saas, local-business | stable |
| `PricingSection` | sections/pricing-section.tsx | Plans tarifaires avec highlight | saas, general | stable |
| `CTASection` | sections/cta-section.tsx | Section appel a l'action | general | stable |
| `FAQSection` | sections/faq-section.tsx | Accordion FAQ | general, saas, local-business | stable |
| `LogoCloud` | sections/logo-cloud.tsx | Bande de logos clients/partenaires | general, saas | stable |
| `ContactSection` | sections/contact-section.tsx | Section contact avec slot form | general, local-business, booking | stable |
| `ProjectShowcase` | sections/project-showcase.tsx | Grille de projets avec animation | portfolio | stable |

---

## 2. Cards (`components/ecommerce/`, `components/real-estate/`, `components/auto-blog/`)

| Composant | Chemin | Role | Domaines | Maturite |
|-----------|--------|------|----------|----------|
| `ProductCard` | ecommerce/product-card.tsx | Carte produit (grid ou list layout) | ecommerce | stable |
| `PriceDisplay` | ecommerce/price-display.tsx | Affichage prix avec devise + reduction | ecommerce, general | stable |
| `RatingStars` | ecommerce/rating-stars.tsx | Etoiles avec note et nombre d'avis | ecommerce, auto-blog | stable |
| `PropertyCard` | real-estate/property-card.tsx | Carte bien immobilier | real-estate | stable |
| `AgentProfileCard` | real-estate/agent-profile-card.tsx | Carte agent immobilier | real-estate | stable |
| `NeighborhoodScoreCard` | real-estate/neighborhood-score-card.tsx | Score quartier avec indicateurs | real-estate | stable |
| `ArticleCard` | auto-blog/article-card.tsx | Carte article de blog | auto-blog, general | stable |
| `FeaturedArticleCard` | auto-blog/featured-article-card.tsx | Carte article mis en avant | auto-blog | stable |
| `CarSpecComparison` | auto-blog/car-spec-comparison.tsx | Tableau de comparaison vehicules | auto-blog | demo-only |
| `CaseStudyCard` | portfolio/case-study-card.tsx | Carte etude de cas | portfolio | stable |
| `BookingSummaryCard` | booking/booking-summary-card.tsx | Resume de reservation | booking | stable |

---

## 3. Filtres (`components/dashboard-ui/`, `components/component-variables/`)

| Composant | Chemin | Role | Domaines | Maturite |
|-----------|--------|------|----------|----------|
| `ConfigurableFilterBar` | component-variables/configurable-filter-bar.tsx | Filtre URL-sync pilote par variables | real-estate, auto-blog, ecommerce, dashboard | stable |
| `FilterBar` | dashboard-ui/filter-bar.tsx | Adaptateur (legacy FilterGroup OU variables) | dashboard, general | stable |
| `DualRangeSlider` | component-variables/renderers/dual-range-slider.tsx | Slider double (min/max) avec inputs | real-estate, ecommerce, dashboard | stable |
| `DateRangeFilter` | dashboard-ui/date-range-filter.tsx | Filtre plage de dates | dashboard, api | stable |

---

## 4. Formulaires (`components/booking/`, `components/portfolio/`, `components/ui/`)

| Composant | Chemin | Role | Domaines | Maturite |
|-----------|--------|------|----------|----------|
| `BookingForm` | booking/booking-form.tsx | Formulaire complet de reservation | booking | stable |
| `ServicePicker` | booking/service-picker.tsx | Selection service (radiogroup) | booking | stable |
| `StaffPicker` | booking/staff-picker.tsx | Selection employe | booking | stable |
| `TimeSlotGrid` | booking/time-slot-grid.tsx | Grille de creneaux horaires | booking | stable |
| `BookingDateSelector` | booking/booking-date-selector.tsx | Calendrier de date de rendez-vous | booking | stable |
| `ContactForm` (portfolio) | portfolio/contact-form.tsx | Formulaire de contact portfolio | portfolio | demo-only |
| `PromoCodeInput` | ecommerce/promo-code-input.tsx | Saisie code promo | ecommerce | stable |

---

## 5. Tables (`components/ui/`, `components/dashboard-ui/`, `components/ecommerce/`)

| Composant | Chemin | Role | Domaines | Maturite |
|-----------|--------|------|----------|----------|
| `DataTable` | ui/data-table.tsx | Table generique (colonnes typees) | dashboard, api, ecommerce | stable |
| `DataTableShell` | dashboard-ui/data-table-shell.tsx | Wrapper DataTable avec etat vide | dashboard | stable |
| `CustomerOrderTable` | ecommerce/customer-order-table.tsx | Table commandes client | ecommerce | stable |
| `AuditLogTimeline` | dashboard-ui/audit-log-timeline.tsx | Timeline d'audit | dashboard, api | stable |

---

## 6. Metriques / stats (`components/dashboard-ui/`)

| Composant | Chemin | Role | Domaines | Maturite |
|-----------|--------|------|----------|----------|
| `MetricCard` | dashboard-ui/metric-card.tsx | Carte metrique avec trend | dashboard, saas, api | stable |
| `ActivityFeed` | dashboard-ui/activity-feed.tsx | Flux d'activite recente | dashboard | stable |
| `EmptyDashboardState` | dashboard-ui/empty-dashboard-state.tsx | Etat vide dashboard | dashboard | stable |
| `StatusBadge` | dashboard-ui/status-badge.tsx | Badge colorise par statut | dashboard, ecommerce, api | stable |
| `ExportButton` | dashboard-ui/export-button.tsx | Bouton export (CSV etc.) | dashboard | stable |
| `StatsSection` | sections/stats-section.tsx | Bloc stat en section page | general, saas, portfolio | stable |

---

## 7. Navigation / layout (`components/marketing/`, `components/dashboard/`, `components/layout/`)

| Composant | Chemin | Role | Domaines | Maturite |
|-----------|--------|------|----------|----------|
| `Navbar` | marketing/navbar.tsx | Navigation marketing desktop | general | stable |
| `Footer` | marketing/footer.tsx | Pied de page marketing | general | stable |
| `DashboardShell` | dashboard-ui/dashboard-shell.tsx | Coquille sidebar + main | dashboard | stable |
| `PageContainer` | layout/page-container.tsx | Conteneur de page max-w | general | stable |
| `SectionHeader` | layout/section-header.tsx | En-tete de section eyebrow/title | general | stable |

---

## 8. E-commerce (`components/ecommerce/`)

| Composant | Chemin | Role | Domaines | Maturite |
|-----------|--------|------|----------|----------|
| `ProductCard` | ecommerce/product-card.tsx | Carte produit grid/list | ecommerce | stable |
| `CartDrawer` | ecommerce/cart-drawer.tsx | Panier lateral (Sheet) | ecommerce | stable |
| `CartButton` | ecommerce/cart-button.tsx | Icone panier avec badge | ecommerce | stable |
| `QuantityStepper` | ecommerce/quantity-stepper.tsx | Incrementeur +/- quantite | ecommerce | stable |
| `VariantSelector` | ecommerce/variant-selector.tsx | Selection de variante produit | ecommerce | stable |
| `CheckoutSteps` | ecommerce/checkout-steps.tsx | Stepper etapes checkout | ecommerce | stable |
| `CheckoutSummary` | ecommerce/checkout-summary.tsx | Resume de commande checkout | ecommerce | stable |
| `OrderStatusTimeline` | ecommerce/order-status-timeline.tsx | Timeline etapes commande | ecommerce | stable |
| `CustomerOrderTable` | ecommerce/customer-order-table.tsx | Table historique commandes | ecommerce | stable |
| `PromoCodeInput` | ecommerce/promo-code-input.tsx | Champ code promo | ecommerce | stable |

---

## 9. Booking (`components/booking/`)

| Composant | Chemin | Role | Domaines | Maturite |
|-----------|--------|------|----------|----------|
| `BookingForm` | booking/booking-form.tsx | Formulaire reservation complet | booking | stable |
| `ServicePicker` | booking/service-picker.tsx | Choix du service | booking, local-business | stable |
| `StaffPicker` | booking/staff-picker.tsx | Choix de l'employe | booking, local-business | stable |
| `TimeSlotGrid` | booking/time-slot-grid.tsx | Creneaux horaires | booking, local-business | stable |
| `BookingDateSelector` | booking/booking-date-selector.tsx | Calendrier reservation | booking, local-business | stable |
| `BookingSummaryCard` | booking/booking-summary-card.tsx | Resume reservation | booking, local-business | stable |

---

## 10. API portal (`components/api-portal/`)

| Composant | Chemin | Role | Domaines | Maturite |
|-----------|--------|------|----------|----------|
| `EndpointRow` | api-portal/endpoint-row.tsx | Ligne endpoint avec methode et description | api | stable |
| `CodeTabsBlock` | api-portal/code-tabs-block.tsx | Bloc de code multi-langues | api, general | stable |
| `ApiKeyDisplay` | api-portal/api-key-display.tsx | Affichage masque d'une cle API | api | stable |
| `ApiKeyRevokeCell` | api-portal/api-key-revoke-cell.tsx | Cellule revocation cle API | api | stable |
| `HttpMethodBadge` | api-portal/http-method-badge.tsx | Badge GET/POST/PUT/DELETE | api | stable |
| `ScopePill` | api-portal/scope-pill.tsx | Pilule de scope OAuth | api | stable |
| `ApiUsageChart` | api-portal/api-usage-chart.tsx | Graphique usage API | api, dashboard | stable |
| `RateLimitMeter` | api-portal/rate-limit-meter.tsx | Jauge limite de taux | api | stable |
| `RequestLogViewer` | api-portal/request-log-viewer.tsx | Visionneuse logs requetes | api | stable |
| `WebhookTester` | api-portal/webhook-tester.tsx | Interface test webhook | api | experimental |
| `ApiStatusCard` | api-portal/api-status-card.tsx | Carte statut service API | api | stable |
| `DeveloperOnboardingSteps` | api-portal/developer-onboarding-steps.tsx | Etapes onboarding developpeur | api | stable |
| `WebhookEventList` | api-portal/webhook-event-list.tsx | Liste evenements webhook | api | stable |

---

## 11. Dashboard (`components/dashboard/`, `components/dashboard-ui/`)

| Composant | Chemin | Role | Domaines | Maturite |
|-----------|--------|------|----------|----------|
| `Sidebar` | dashboard/sidebar.tsx | Barre laterale navigation dashboard | dashboard | stable |
| `Header` (dashboard) | dashboard/header.tsx | En-tete dashboard avec actions | dashboard | stable |
| `NavItem` | dashboard/nav-item.tsx | Element de navigation sidebar | dashboard | stable |
| `MobileNav` | dashboard/mobile-nav.tsx | Navigation mobile dashboard | dashboard | stable |
| `DashboardShell` | dashboard-ui/dashboard-shell.tsx | Coquille sidebar + main | dashboard | stable |
| `MetricCard` | dashboard-ui/metric-card.tsx | KPI card avec trend | dashboard, saas, api | stable |
| `DataTableShell` | dashboard-ui/data-table-shell.tsx | Table avec etat vide | dashboard | stable |
| `BulkActionBar` | dashboard-ui/bulk-action-bar.tsx | Barre d'actions sur selection | dashboard | stable |
| `EntityDrawer` | dashboard-ui/entity-drawer.tsx | Tiroir edition entite | dashboard | stable |
| `AdminFormDrawer` | dashboard-ui/admin-form-drawer.tsx | Tiroir formulaire admin | dashboard | stable |
| `ConfirmDialog` | dashboard-ui/confirm-dialog.tsx | Dialog de confirmation | dashboard, general | stable |
| `AuditLogTimeline` | dashboard-ui/audit-log-timeline.tsx | Timeline audit | dashboard, api | stable |

---

## 12. Demo-only (`app/demo/*/`, `components/portfolio/`, `components/auto-blog/`)

Les composants suivants sont construits specifiquement pour les pages demo. Ils ne doivent pas etre utilises directement dans un projet client sans adaptation.

| Composant | Chemin | Raison |
|-----------|--------|--------|
| `AutoBlogCarGrid` | app/demo/auto-blog/auto-blog-client.tsx | Donnees fictives hardcodees (4 voitures) |
| `CarSpecComparison` | auto-blog/car-spec-comparison.tsx | Donnees fictives vehicules |
| `FilterableProjects` | portfolio/filterable-projects.tsx | Donnees fictives projets |
| `ContactForm` (portfolio) | portfolio/contact-form.tsx | Pas de backend configure |
| `SkillsGrid` | portfolio/skills-grid.tsx | Donnees fictives skills |
| `Timeline` (portfolio) | portfolio/timeline.tsx | Donnees fictives experiences |
| `TechStackCloud` | portfolio/tech-stack-cloud.tsx | Donnees fictives stack |
| `ProcessSteps` | portfolio/process-steps.tsx | Donnees fictives processus |
| `MortgageCalculator` | real-estate/mortgage-calculator.tsx | Calcul local, pas connecte |
| `PropertySearchBar` | real-estate/property-search-bar.tsx | Version sans variable system |

---

## 13. Experimental / risques

| Composant | Risque |
|-----------|--------|
| `WebhookTester` | Envoie des requetes HTTP sortantes. Ne pas utiliser en prototype sans backend securise. |
| `VideoHeroSection` | Dependance sur une URL video externe. Lente si la video ne charge pas. |
| `AnimatedHero` | Framer Motion requis. Alourdit le bundle si non tree-shaken. |
| `CartProvider` | Necessite un contexte React global. A ne pas oublier dans `layout.tsx`. |
| `MortgageCalculator` | Formules financieres locales — non validees par un expert. Etiqueter clairement en production. |

---

## Composants reutilisables vs demo-only — resume

- **Reutilisables directement** : HeroSection, FeatureGrid, StatsSection, PricingSection, FAQSection, CTASection, TestimonialSection, LogoCloud, ContactSection, MetricCard, DataTableShell, FilterBar, ConfigurableFilterBar, DualRangeSlider, BookingForm, ServicePicker, StaffPicker, TimeSlotGrid, ProductCard, RatingStars, PriceDisplay, CartDrawer, OrderStatusTimeline, ApiKeyDisplay, EndpointRow, CodeTabsBlock, DashboardShell, ActivityFeed, BulkActionBar
- **Demo-only** : AutoBlogCarGrid (donnees hardcodees), CarSpecComparison, FilterableProjects, ContactForm (portfolio), SkillsGrid, Timeline, TechStackCloud, ProcessSteps, PropertySearchBar (sans variables)
- **A eviter sans validation** : WebhookTester, MortgageCalculator, VideoHeroSection (performance), AnimatedHero (bundle)
