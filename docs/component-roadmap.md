# Component Roadmap - kv-web-starter

## Done

- [x] Form components
- [x] Booking components
- [x] Dashboard/Admin components
- [x] API portal components
- [x] Toasts + notification center
- [x] Upload/media components
- [x] E-commerce components
- [x] Animation system
- [x] Demo pages wired to real components

## Short Term

- [x] Wire toasts into all important actions
- [x] Add Storybook stories for the new components
- [x] Add Vitest tests for critical components
- [x] Add Playwright tests for booking, e-commerce, and API portal flows
- [x] Create `/demo/components`
- [x] Create short documentation for each component
- [x] Verify keyboard accessibility

## Medium Term

- [x] Wire uploads to Supabase, S3, Azure Blob, or another real storage backend
- [x] Add e-commerce Prisma models
- [x] Add a real pricing page
- [x] Add `ApiUsageChart`
- [x] Add `RateLimitMeter`
- [x] Add `RequestLogViewer`
- [x] Add `AuditLogTimeline`
- [x] Add a client "my bookings" page

## Advanced Frontend

- [x] Add `components/3d`
- [x] Install Three.js, React Three Fiber, and Drei
- [x] Add `SceneCanvas`
- [x] Add `FloatingModel`
- [x] Add `ParticleBackground`
- [x] Add `Product3DViewer`
- [x] Add mobile performance mode

## Lot 4 — Demo Enrichment

- [x] `FeaturedArticleCard` (auto-blog: featured article with score badge)
- [x] `ArticleCard` (auto-blog: compact grid article card)
- [x] `CarSpecComparison` (auto-blog: 3-car spec comparison table)
- [x] `PropertySearchBar` (real-estate: search form with custom Select)
- [x] `NeighborhoodScoreCard` (real-estate: score bars per category)
- [x] `ServicePackageCard` (local-business: pricing card with featured ring)
- [x] `LoyaltyStampCard` (local-business: visual stamp progress card)

## Lot 5 — Portfolio 10/10

- [x] `AnimatedCounter` (portfolio-specific RAF count-up with prefix)
- [x] `TechStackCloud` (grouped skill grid with level dots 1-3)
- [x] `CaseStudyCard` (full-width + 2-col with metrics and outcome quote)
- [x] `ProcessSteps` (4-step process with connector line)
- [x] `ContactForm` (mock submit with toast feedback)
- [x] `FilterableProjects` (filterable grid with AnimatePresence)
- [x] Portfolio page rebuilt 10/10 with 3D, case studies, filters, timeline, contact

## Lot 6 — 3D Layer

- [x] `PhoneMockup3D` (RoundedBox + emissive screen + Float)
- [x] `WebsiteShowcase3D` (laptop geometry + lid + screen UI rows)
- [x] `Car3DPreview` (box body + cylinder wheels + emissive lights)
- [x] `Portfolio3DVisual` (icosahedron + wireframe + orbital tori)
- [x] `FallbackVisual` (pure CSS fallback for all 3D types)
- [x] `/demo/auto-blog` wired with `Car3DPreview`
- [x] `/demo/portfolio` wired with `Portfolio3DVisual`
- [x] `/demo/components` expanded with Phone, Laptop, Car viewers

## Remaining Audit Notes

- Demo-data fallbacks still exist in dashboard API keys, API usage, customers, availability, bookings, services, and staff pages.
- 3D components degrade gracefully on mobile via `useMobilePerformance` (DPR reduced, particles disabled, animations paused).
