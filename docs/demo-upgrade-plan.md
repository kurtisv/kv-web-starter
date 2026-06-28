# Demo Upgrade Plan

Status of each demo page and planned improvements.

## Summary

| Demo | Status | E2E Tests | Lots Completed |
|------|--------|-----------|----------------|
| Booking | 10/10 | Yes | Core lots 1-3 |
| SaaS | 10/10 | Yes | Core lots 1-3 |
| API Portal | 10/10 | Yes | Core lots 1-3 |
| E-commerce | 10/10 | Yes | Core lots 1-3 |
| Dashboard | 10/10 | Yes | Core lots 1-3 |
| Real Estate | 10/10 | Yes | Lot 4: PropertySearchBar, NeighborhoodScoreCard |
| Local Business | 10/10 | Yes | Lot 4: ServicePackageCard, LoyaltyStampCard |
| Portfolio | 10/10 | Yes | Lot 5: CaseStudyCard, FilterableProjects, TechStackCloud, ProcessSteps, ContactForm + Lot 6: Portfolio3DVisual |
| Auto Blog | 10/10 | Yes | Lot 4: FeaturedArticleCard, ArticleCard, CarSpecComparison + Lot 6: Car3DPreview |
| Components | 10/10 | Yes | Lot 6: PhoneMockup3D, WebsiteShowcase3D, Car3DPreview expanded |

---

## Booking (`/demo/booking`)

**Theme:** default (neutral wellness/professional)

**Components used:**
- HeroSection, FeatureGrid, CTASection
- ServicePicker, StaffPicker, BookingDateSelector, TimeSlotGrid
- BookingForm, BookingSummaryCard, BookingConfirmationDialog
- CancelBookingDialog, RescheduleBookingDialog
- BookingDetailsCard, BookingStatusTimeline, ClientBookingHistory

---

## SaaS (`/demo/saas`)

**Theme:** premium-saas (purple/lavender)

**Components used:**
- HeroSection (centered), MetricCard, MetricGrid
- SubscriptionStatusCard, UsageQuotaCard, PlanComparisonTable
- FeatureGrid, PricingSection, StatsSection, CTASection

---

## API Portal (`/demo/api`)

**Theme:** dark-tech-api (dark + cyan)

**Components used:**
- HeroSection, EndpointList, CodeTabsBlock
- ApiKeyDisplay, NewApiKeyReveal, ScopePill
- ApiUsageChart, RateLimitMeter, RequestLogViewer
- WebhookTester

---

## E-commerce (`/demo/ecommerce`)

**Theme:** ecommerce-clean (white + deep orange)

**Components used:**
- HeroSection, ProductGrid, ProductCard
- VariantSelector, CartDrawer, PromoCodeInput, CheckoutSummary
- OrderStatusTimeline, CustomerOrderTable
- PriceDisplay, RatingStars

---

## Dashboard (`/demo/dashboard`)

**Theme:** premium-saas (purple/lavender)

**Components used:**
- DashboardShell, MetricGrid, MetricCard
- DashboardDemoUsersCard, ActivityFeed, AuditLogTimeline
- ConfirmDialog, EntityDrawer, EmptyDashboardState
- NotificationBell, StatusBadge

---

## Real Estate (`/demo/real-estate`)

**Theme:** real-estate (sky blue + light)

**Components used:**
- HeroSection, PropertyCard, AgentProfileCard
- MortgageCalculator, StatsSection, TestimonialSection
- FeatureGrid, CTASection
- **[Lot 4]** PropertySearchBar (custom Select, grid layout)
- **[Lot 4]** NeighborhoodScoreCard (score bars per category, avg price/m2)

---

## Local Business (`/demo/local-business`)

**Theme:** local-business (warm amber/yellow)

**Components used:**
- HeroSection, BusinessHours, FeatureGrid
- TestimonialSection, StatsSection, CTASection
- **[Lot 4]** ServicePackageCard (pricing card with featured ring, badge)
- **[Lot 4]** LoyaltyStampCard (visual stamp progress, reward description)

---

## Portfolio (`/demo/portfolio`)

**Theme:** corporate-classic (neutral, creative)

**Components used:**
- HeroSection with AnimatedCounter (RAF count-up), availability badge
- CaseStudyCard (full-width + 2-col, metrics grid, outcome quote)
- FilterableProjects (AnimatePresence popLayout, pill filter buttons)
- TechStackCloud (grouped by category, level dots 1-3, legend)
- Timeline (3 experience entries)
- ProcessSteps (4 steps with connector line)
- TestimonialSection (3 testimonials)
- ContactForm (mock 900ms delay, toast success/error)
- **[Lot 6]** Portfolio3DVisual (icosahedron + wireframe + orbital tori + particles)

---

## Auto Blog (`/demo/auto-blog`)

**Theme:** luxury-auto (dark + deep red)

**Components used:**
- HeroSection, FeatureGrid, StatsSection
- ArticleGrid, ArticleCard, FilterBar, CarSpecSheet, CTASection
- **[Lot 4]** FeaturedArticleCard (16/7 aspect, score badge, CTA)
- **[Lot 4]** ArticleCard grid (3 articles, category badge, read time)
- **[Lot 4]** CarSpecComparison (3-car table, Trophy icon on winner)
- **[Lot 6]** Car3DPreview (box body + cylinder wheels + emissive lights)

---

## Components Playground (`/demo/components`)

**All component categories:**
- Dashboard/Admin, API portal, E-commerce, Booking
- **[Lot 6]** 3D section: Product3DViewer, Portfolio3DVisual (row 1); PhoneMockup3D, WebsiteShowcase3D, Car3DPreview (row 2)
