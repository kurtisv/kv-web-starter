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

## Remaining Audit Notes

- Demo-data fallbacks still exist in dashboard API keys, API usage, customers, availability, bookings, services, and staff pages.
