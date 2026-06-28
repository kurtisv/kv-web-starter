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
- [ ] Verify keyboard accessibility

## Medium Term

- [ ] Wire uploads to Supabase, S3, Azure Blob, or another real storage backend
- [x] Add e-commerce Prisma models
- [x] Add a real pricing page
- [x] Add `ApiUsageChart`
- [x] Add `RateLimitMeter`
- [x] Add `RequestLogViewer`
- [x] Add `AuditLogTimeline`
- [x] Add a client "my bookings" page

## Advanced Frontend

- [ ] Add `components/3d`
- [ ] Install Three.js, React Three Fiber, and Drei
- [ ] Add `SceneCanvas`
- [ ] Add `FloatingModel`
- [ ] Add `ParticleBackground`
- [ ] Add `Product3DViewer`
- [ ] Add mobile performance mode

## Current Audit Notes

- Native selects and checkboxes still remain in `apps/web/src/app/dashboard/availability/page.tsx`.
- Those controls live inside server-action forms that post plain `FormData`; replacing them cleanly should be done with a dedicated client form wrapper or hidden inputs.
- Demo-data fallbacks still exist in dashboard API keys, API usage, customers, availability, bookings, services, and staff pages.
- `apps/web/src/app/dashboard/settings/settings-client.tsx` still uses a local `mockUpload` until real storage is wired.
