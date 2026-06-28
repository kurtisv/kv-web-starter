# Demo Upgrade Plan

Status of each demo page and planned improvements.

## Summary

| Demo | Status | E2E Tests | Notes |
|------|--------|-----------|-------|
| Booking | Good | Yes | Cancel + reschedule dialogs added |
| SaaS | Good | Yes | Plan comparison table, quota card, subscription card |
| API Portal | Good | Yes | Code tabs, API key display, rate limit meter |
| E-commerce | Good | Yes | Product grid, cart drawer, promo code, order timeline |
| Dashboard | Good | Yes | Metrics, users table, audit log, entity drawer |
| Real Estate | Good | Yes | Property cards, mortgage calculator, agent profiles |
| Local Business | Good | Yes | Business hours, service cards, contact form |
| Portfolio | Good | Yes | Project showcase, skills grid, timeline, contact form |
| Auto Blog | Good | Yes | Car grid, comparison table, spec sheet, filters |

---

## Booking (`/demo/booking`)

**Theme:** default (neutral wellness/professional)

**Components used:**
- HeroSection, FeatureGrid, CTASection
- ServicePicker, StaffPicker, BookingDateSelector, TimeSlotGrid
- BookingForm, BookingSummaryCard, BookingConfirmationDialog
- CancelBookingDialog, RescheduleBookingDialog
- BookingDetailsCard, BookingStatusTimeline, ClientBookingHistory

**Planned improvements:**
- BookingReminderPreview component
- Real Stripe mock for paid bookings
- Email confirmation preview (console adapter)

---

## SaaS (`/demo/saas`)

**Theme:** premium-saas (purple/lavender)

**Components used:**
- HeroSection (centered), MetricCard, MetricGrid
- SubscriptionStatusCard, UsageQuotaCard, PlanComparisonTable
- FeatureGrid, PricingSection, StatsSection, CTASection

**Planned improvements:**
- InvoiceList component
- UpgradeModal with mock Stripe flow
- CancelSubscriptionDialog

---

## API Portal (`/demo/api`)

**Theme:** dark-tech-api (dark + cyan)

**Components used:**
- HeroSection, EndpointList, CodeTabsBlock
- ApiKeyDisplay, NewApiKeyReveal, ScopePill
- ApiUsageChart, RateLimitMeter, RequestLogViewer
- WebhookTester

**Planned improvements:**
- SdkExampleTabs (cURL / JS / Python / PHP)
- DeveloperOnboardingSteps component
- Webhook event list

---

## E-commerce (`/demo/ecommerce`)

**Theme:** ecommerce-clean (white + deep orange)

**Components used:**
- HeroSection, ProductGrid, ProductCard
- CartDrawer, PromoCodeInput, CheckoutSummary
- OrderStatusTimeline, CustomerOrderTable

**Planned improvements:**
- VariantSelector (size, color)
- ProductGallery with zoom
- 3D product viewer (Phase 12)

---

## Dashboard (`/demo/dashboard`)

**Theme:** premium-saas (purple/lavender)

**Components used:**
- DashboardShell, MetricGrid, MetricCard
- DashboardDemoUsersCard, ActivityFeed, AuditLogTimeline
- ConfirmDialog, EntityDrawer, EmptyDashboardState
- NotificationBell, StatusBadge

**Planned improvements:**
- DataTable with sorting, filtering, pagination
- BulkActionBar
- DateRangeFilter

---

## Real Estate (`/demo/real-estate`)

**Theme:** real-estate (sky blue + light)

**Components used:**
- HeroSection, PropertyCard, AgentProfileCard
- MortgageCalculator, StatsSection, TestimonialSection
- FeatureGrid, CTASection

**Planned improvements:**
- PropertyFilters with price/bedroom/city
- PropertyGallery with full-screen lightbox
- LeadForm with email confirmation (console adapter)

---

## Local Business (`/demo/local-business`)

**Theme:** local-business (warm amber/yellow)

**Components used:**
- HeroSection, BusinessHours, FeatureGrid
- TestimonialSection, StatsSection, CTASection

**Planned improvements:**
- LocalReviews component (Google-style)
- MapPreview (static image fallback)
- MobileCallButton (click-to-call)
- GalleryGrid

---

## Portfolio (`/demo/portfolio`)

**Theme:** default (neutral, creative)

**Components used:**
- HeroSection, SkillsGrid, Timeline
- TestimonialSection, CTASection

**Planned improvements:**
- ProjectShowcase with lightbox
- AnimatedCounter section
- TechStackCloud visual
- CaseStudyCard component

---

## Auto Blog (`/demo/auto-blog`)

**Theme:** luxury-auto (dark + deep red)

**Components used:**
- HeroSection, FeatureGrid, StatsSection
- ArticleGrid, ArticleCard, CTASection

**Planned improvements:**
- CarComparisonTable
- CarSpecSheet drawer
- CarFilters (brand, category, price, performance)
- Car3DPreview component (Phase 12)
