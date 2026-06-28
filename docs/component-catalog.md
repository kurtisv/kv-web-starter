# Component Catalog - kv-web-starter

## Dashboard/Admin

- `DateRangeFilter`: controlled date range selector for dashboards and reports.
- `ExportButton`: CSV/JSON export action for table-like data.
- `AuditLogTimeline`: chronological audit trail for admin activity.
- `EmptyDashboardState`: standard empty state for CRUD pages.
- `AdminFormDrawer`: standardized drawer shell for create/edit forms.

## Media

- `FileDropzone`, `FileUploadQueue`, and `MediaGrid`: settings media library wired to `POST /api/uploads`.
- Upload backend: local storage adapter writes to `apps/web/public/uploads` and returns public `/uploads/...` URLs.

## API Portal

- `ApiUsageChart`: compact bar chart for recent API call volume.
- `RateLimitMeter`: quota usage meter with warning/destructive states.
- `RequestLogViewer`: request log list with method, path, status, and latency.
- `WebhookTester`: lightweight form to test webhook delivery flows.

## E-commerce

- Prisma models: `Product`, `Inventory`, `Coupon`, `Order`, and `OrderItem`.
- `VariantSelector`: selectable product options with optional color swatches.
- `PromoCodeInput`: promo-code capture and validation state.
- `CheckoutSummary`: order totals with shipping, taxes, and discounts.
- `OrderStatusTimeline`: customer-facing order progress tracker.
- `CustomerOrderTable`: compact order history table.

## 3D

- Dependencies: Three.js, React Three Fiber, and Drei.
- `SceneCanvas`: shared WebGL shell with lighting, controls, and mobile/reduced-motion performance mode.
- `FloatingModel`: reusable animated product primitive.
- `ParticleBackground`: lightweight point-field scene background with lower mobile density.
- `Product3DViewer`: composed product scene for demo and commerce pages.

## Demo

The `/demo/components` page showcases these components together and should be updated when new business components are added.

## Pages

- `/pricing`: modular pricing page wired to Stripe checkout actions for paid plans.
- `/my-bookings`: client booking history page with Prisma-backed data and demo fallback.
