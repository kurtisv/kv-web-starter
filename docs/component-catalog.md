# Component Catalog

## Design System (components/ui/)

Base primitives used across all pages and demos.

- `Button`, `Badge`, `Card`, `CardContent`, `CardHeader`
- `Input`, `Label`, `Textarea`, `Select`, `Combobox`, `Checkbox`
- `Dialog`, `Drawer`, `Sheet`, `AlertDialog`
- `Tabs`, `Accordion`, `Collapsible`, `DropdownMenu`
- `Slider`, `Progress`, `Separator`, `Skeleton`
- `Avatar`, `Tooltip`, `Popover`
- `Toast` / `useToast` (Sonner-backed, `toast.success()`, `toast.error()`, etc.)
- `EmptyState`, `LoadingState`, `ThemePreviewCard`
- `DataTable` (sortable, filterable, paginated)

## Sections (components/sections/)

Page-level composition blocks usable in any demo or marketing page.

- `HeroSection` — centered or split layout, badge, CTA buttons
- `FeatureGrid` — icon + title + description grid
- `PricingSection` — plan cards with feature list
- `StatsSection` — metric row with large numbers
- `TestimonialSection` — quote grid with avatar
- `CTASection` — full-width call to action
- `Timeline` — vertical experience/event list

## Dashboard/Admin (components/dashboard-ui/)

- `DashboardShell` — sidebar + topbar layout shell
- `MetricCard`, `MetricGrid` — KPI display with delta indicator
- `ActivityFeed` — timestamped event list with variant coloring
- `AuditLogTimeline` — chronological admin audit trail
- `EmptyDashboardState` — standard empty state for CRUD pages
- `AdminFormDrawer` — standardized drawer shell for create/edit forms
- `EntityDrawer` — detail drawer for any entity (user, order, etc.)
- `ConfirmDialog` — destructive-action confirmation dialog
- `DateRangeFilter` — controlled date range selector
- `ExportButton` — CSV/JSON export action
- `FilterBar` — multi-group filter bar with search
- `StatusBadge` — colored status indicator

## API Portal (components/ + api-portal modules)

- `ApiUsageChart` — compact bar chart for recent API call volume
- `RateLimitMeter` — quota usage meter with warning/destructive states
- `RequestLogViewer` — request log with method, path, status, latency
- `WebhookTester` — lightweight form to test webhook delivery
- `ApiKeyDisplay` — masked key display with copy button
- `NewApiKeyReveal` — one-time key reveal after creation
- `ScopePill` — colored scope tag (data:read, data:write, admin)
- `EndpointList` — REST endpoint listing with method badges
- `CodeTabsBlock` — multi-language code tab (cURL / JS / Python)

## E-commerce (components/ecommerce/)

- `ProductCard` — product tile with image, price, rating
- `VariantSelector` — selectable options with color swatch support
- `PromoCodeInput` — promo code input with validation state
- `CheckoutSummary` — order totals with shipping/taxes/discounts
- `OrderStatusTimeline` — customer-facing order progress tracker
- `CustomerOrderTable` — compact order history table
- `PriceDisplay` — original + discounted price with badge
- `RatingStars` — star rating display

## Booking (components/booking/)

- `ServicePicker` — service selection with price and duration
- `StaffPicker` — staff member grid with avatar and specialties
- `BookingDateSelector`, `TimeSlotGrid` — availability picker
- `BookingForm` — customer info + confirm step
- `BookingSummaryCard` — recap card before confirmation
- `BookingConfirmationDialog` — success dialog with booking details
- `CancelBookingDialog` — cancel flow with reason field
- `RescheduleBookingDialog` — rebooking flow with new date picker
- `BookingDetailsCard`, `BookingStatusTimeline` — post-booking views
- `ClientBookingHistory` — past bookings list for the client view

## SaaS (components/saas/)

- `SubscriptionStatusCard` — plan chip with status (active / trialing / past_due)
- `UsageQuotaCard` — quota bars with warning thresholds
- `PlanComparisonTable` — feature matrix across plans (Starter / Pro / Enterprise)

## Real Estate (components/real-estate/)

- `PropertyCard` — listing tile with price, rooms, status badge
- `AgentProfileCard` — agent avatar, stats, contact CTA
- `MortgageCalculator` — interactive loan simulator with sliders
- `PropertySearchBar` — search form with custom Select (type, price, rooms)
- `NeighborhoodScoreCard` — score bars per category (transport, schools, parks, security) + avg price/m2

## Local Business (components/local-business/)

- `BusinessHours` — weekly schedule table with open/closed states
- `ServicePackageCard` — pricing card with services checklist and featured ring
- `LoyaltyStampCard` — visual stamp grid with progress bar and reward description

## Portfolio (components/portfolio/)

- `AnimatedCounter` — RAF-based count-up with prefix, reduced-motion safe
- `TechStackCloud` — skills grouped by category with level dots (1-3)
- `CaseStudyCard` — full-width or 2-column layout with metrics grid and outcome quote
- `ProcessSteps` — numbered steps with desktop connector line
- `ContactForm` — mock form with toast success/error (swap adapter for real sends)
- `FilterableProjects` — filterable project grid with `AnimatePresence` popLayout

## Auto Blog (components/auto-blog/)

- `FeaturedArticleCard` — full-width article card with score badge, category, CTA
- `ArticleCard` — compact grid card with category overlay, author, read time
- `CarSpecComparison` — 3-car comparison table with Trophy icon on winner cell

## Animations (components/animations/)

- `RevealSection` — scroll-triggered reveal wrapper (Framer Motion `useInView`)
- `AnimatedCounter` — count-up animation with configurable duration
- `PageTransition` — page-level fade transition

## Media (components/ui/)

- `FileDropzone` — drag-and-drop file picker
- `FileUploadQueue` — upload progress list with status badges
- `MediaGrid` — settings media library wired to `POST /api/uploads`

Upload backend: `lib/storage/` adapter writes to `public/uploads/` (local) or cloud (S3/Supabase/Azure/R2).

## 3D (components/3d/)

All components use React Three Fiber and degrade automatically on mobile via `useMobilePerformance`.

- `SceneCanvas` — shared WebGL shell (lighting, camera, DPR control)
- `FloatingModel` — animated product primitive with Float wrapper
- `ParticleBackground` — point-field background (disabled on mobile)
- `Product3DViewer` — composed product scene for commerce pages
- `PhoneMockup3D` — RoundedBox phone + emissive screen + home indicator
- `WebsiteShowcase3D` — laptop geometry with screen UI rows
- `Car3DPreview` — box body + 4 cylinder wheels + emissive headlights/taillights
- `Portfolio3DVisual` — icosahedron + wireframe overlay + 2 orbital tori + particles
- `FallbackVisual` — pure CSS fallback for all 4 scene types (phone, laptop, car, abstract)

## Demo playground

`/demo/components` — live showcase of all business components. Update it when adding new component categories.

## Pages (not components)

- `/pricing` — modular pricing page wired to Stripe checkout actions
- `/booking` — public booking flow (date picker → confirm → email)
- `/my-bookings` — client booking history with Prisma-backed data and demo fallback
- `/developers` — API key management for the API portal module
- `/demo` — all 9 preset demos in one index
