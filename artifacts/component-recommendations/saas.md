# Component Recommendation Report — saas

## Summary

Recommended: 9
Acceptable: 7
Avoid: 29
Gaps: 1

## Use First

These components are production-ready or stable and designed for the `saas` domain.
Use them without custom work.

- **AnimatedHero** (`animated-hero`) — Hero section with Framer Motion entrance animations on title and description. | `@/components/sections/animated-hero` | maturity: stable
- **FAQSection** (`faq-section`) — Accordion-based FAQ with eyebrow, title, and expandable question/answer items. | `@/components/sections/faq-section` | maturity: stable
- **FeatureGrid** (`feature-grid`) — Responsive grid of feature cards with icon, title, and description. | `@/components/sections/feature-grid` | maturity: production
- **HeroSection** (`hero-section`) — Full-width hero with eyebrow label, headline, description, and CTA buttons. | `@/components/sections/hero-section` | maturity: production
- **LogoCloud** (`logo-cloud`) — Horizontal band of client or partner logos with optional label. | `@/components/sections/logo-cloud` | maturity: stable
- **MetricCard** (`metric-card`) — KPI card displaying a label, numeric value, optional trend indicator, and icon. | `@/components/dashboard-ui/metric-card` | maturity: production
- **PricingSection** (`pricing-section`) — Pricing plans in a horizontal card layout with feature lists and highlighted plan. | `@/components/sections/pricing-section` | maturity: production
- **StatsSection** (`stats-section`) — Animated counter statistics displayed as a grid or banner, triggered on scroll. | `@/components/sections/stats-section` | maturity: production
- **TestimonialSection** (`testimonial-section`) — Grid of customer testimonial quotes with author name and optional avatar. | `@/components/sections/testimonial-section` | maturity: production

## Acceptable With Adaptation

These components can be used for `saas` but may require domain-specific adjustments.
General-purpose components or beta-maturity domain components.

- ArticleCard (`article-card`) — stable — Blog article card with image, category tag, title, excerpt, and read-time.
- CodeTabsBlock (`code-tabs-block`) — stable — Tabbed code block with syntax highlighting across multiple languages (curl, JS, Python, etc.).
- ConfirmDialog (`confirm-dialog`) — stable — Modal confirmation dialog with title, body, confirm/cancel buttons, and optional destructive styling.
- ContactSection (`contact-section`) — stable — Contact section with address/phone/email display and a slot for a form component.
- CTASection (`cta-section`) — stable — Compact call-to-action section with title, description, and action buttons.
- FilterBar (`filter-bar`) — stable — Adapter component that renders either a legacy FilterGroup or a variable-driven bar based on props.
- PriceDisplay (`price-display`) — stable — Formats a price in cents with currency symbol, optional original price, and discount percentage.

## Do Not Use By Default

- ActivityFeed (`activity-feed`) — out-of-domain component (designed for: dashboard)
- AgentProfileCard (`agent-profile-card`) — out-of-domain component (designed for: real-estate)
- ApiKeyDisplay (`api-key-display`) — out-of-domain component (designed for: api)
- ApiUsageChart (`api-usage-chart`) — out-of-domain component (designed for: api, dashboard)
- AuditLogTimeline (`audit-log-timeline`) — out-of-domain component (designed for: dashboard, api)
- BookingForm (`booking-form`) — out-of-domain component (designed for: booking, local-business)
- BookingSummaryCard (`booking-summary-card`) — out-of-domain component (designed for: booking, local-business)
- BulkActionBar (`bulk-action-bar`) — out-of-domain component (designed for: dashboard)
- CartDrawer (`cart-drawer`) — out-of-domain component (designed for: ecommerce)
- CaseStudyCard (`case-study-card`) — out-of-domain component (designed for: portfolio)
- CheckoutSteps (`checkout-steps`) — out-of-domain component (designed for: ecommerce)
- ConfigurableFilterBar (`configurable-filter-bar`) — out-of-domain component (designed for: real-estate, auto-blog, ecommerce, dashboard, academy)
- CustomerOrderTable (`customer-order-table`) — out-of-domain component (designed for: ecommerce)
- DashboardShell (`dashboard-shell`) — out-of-domain component (designed for: dashboard)
- DataTableShell (`data-table-shell`) — out-of-domain component (designed for: dashboard)
- DateRangeFilter (`date-range-filter`) — out-of-domain component (designed for: dashboard, api)
- DualRangeSlider (`dual-range-slider`) — out-of-domain component (designed for: real-estate, ecommerce, dashboard)
- EndpointRow (`endpoint-row`) — out-of-domain component (designed for: api)
- EntityDrawer (`entity-drawer`) — out-of-domain component (designed for: dashboard)
- FeaturedArticleCard (`featured-article-card`) — out-of-domain component (designed for: auto-blog)
- HttpMethodBadge (`http-method-badge`) — out-of-domain component (designed for: api)
- OrderStatusTimeline (`order-status-timeline`) — out-of-domain component (designed for: ecommerce)
- ProductCard (`product-card`) — out-of-domain component (designed for: ecommerce)
- ProjectShowcase (`project-showcase`) — out-of-domain component (designed for: portfolio)
- PropertyCard (`property-card`) — out-of-domain component (designed for: real-estate)
- RatingStars (`rating-stars`) — out-of-domain component (designed for: ecommerce, auto-blog)
- ServicePicker (`service-picker`) — out-of-domain component (designed for: booking, local-business)
- StatusBadge (`status-badge`) — out-of-domain component (designed for: dashboard, ecommerce, api)
- TimeSlotGrid (`time-slot-grid`) — out-of-domain component (designed for: booking, local-business)

## Gaps Before Custom Work

Document these gaps before creating new components. A gap means no recommended component
covers this category for the `saas` domain.

- No recommended card component for saas

## Components With Variables

- MetricCard — variables: apiPortalVariables

## Demo-Only Components

- None

## Warnings

- 1 gap(s) must be reviewed before custom work.

## Agent Decision

Document gaps before creating new components.

Workflow: use recommended first -> acceptable with adaptation -> document gap -> custom component.
Do NOT create a custom component when a recommended component exists.
