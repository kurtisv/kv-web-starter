# Component UI Polish — Audit Report

**Repo:** kv-web-starter / apps/web
**Sprint:** UI Polish & UX Harmonization
**Branch:** feature/component-ui-polish
**Audited:** 2026-07-01
**Components scanned:** ~110 of ~130 discovered

---

## 1. Component Inventory by Category

### `/components/ui/` — Core UI Primitives

| File | Renders | Visual Grade |
|---|---|---|
| `button.tsx` | Multi-variant button (12 variants, 6 sizes) | 9/10 |
| `card.tsx` | Content card with 9 variants, radius prop, composable sub-parts | 7/10 |
| `badge.tsx` | Inline status/label badge with 8 variants | 7/10 |
| `input.tsx` | Text input (flat/sharp design, no focus ring) | 5/10 |
| `alert.tsx` | Dismissible alert with 5 variants + icons | 7/10 |
| `accordion.tsx` | Native `<details>/<summary>` toggle — no animation | 5/10 |
| `tabs.tsx` | TabsList / TabsTrigger / TabsContent — missing all ARIA | 3/10 |
| `select.tsx` | Custom dropdown with full ARIA combobox | 8/10 |
| `checkbox.tsx` | Custom checkbox + indeterminate + CheckboxField | 8/10 |
| `dialog.tsx` | Framer Motion animated portal modal | 9/10 |
| `avatar.tsx` | Image/initials avatar + AvatarGroup — hardcoded palette | 5/10 |
| `avatar-upload.tsx` | Avatar with hover camera overlay | 8/10 |
| `skeleton.tsx` | Skeleton + SkeletonCard/Table/Metric | 7/10 |
| `empty-state.tsx` | Centered icon + title + description + action | 7/10 |
| `loading-state.tsx` | Spinner with text + Skeleton re-export (duplicate export) | 6/10 |
| `data-table.tsx` | Full table: search, sort, pagination, empty | 8/10 |
| `stepper.tsx` | Horizontal + vertical step indicator | 8/10 |
| `file-dropzone.tsx` | Drag-and-drop zone with full validation | 9/10 |
| `file-upload-queue.tsx` | Queue with pending/uploading/done/error states | 8/10 |
| `media-grid.tsx` | Animated grid with lightbox and empty state | 8/10 |
| `copy-button.tsx` | Copy + success feedback | 8/10 |
| `cookie-banner.tsx` | Fixed consent banner — no entry animation | 6/10 |
| `notification-bell.tsx` | Bell + dropdown panel with unread count | 9/10 |
| `back-to-top.tsx` | Fixed floating button with appear/hide animation | 8/10 |
| `countdown.tsx` | Live countdown timer with expired state | 8/10 |
| `theme-switcher.tsx` | Theme picker dropdown | 8/10 |
| `theme-preview-card.tsx` | Color swatch + active indicator | 8/10 |
| `shimmer-badge.tsx` | Shimmer badge (relies on external CSS class) | 6/10 |
| `spotlight-card.tsx` | Mouse-tracking spotlight card | 8/10 |
| `marquee.tsx` | Infinite scroll — no pause-on-hover, no aria-hidden | 5/10 |
| `multi-select.tsx` | Multi-select with search, tags, keyboard | 8/10 |

### `/components/sections/` — Marketing Sections

| File | Renders | Visual Grade |
|---|---|---|
| `hero-section.tsx` | 4-variant hero (centered, split, dark, minimal) | 7/10 |
| `animated-hero.tsx` | Word-by-word spring animation hero | 9/10 |
| `feature-grid.tsx` | 3-variant feature grid with InView motion | 7/10 |
| `stats-section.tsx` | 3-variant stats — dynamic className build bug | 5/10 |
| `pricing-section.tsx` | 3-col plan cards with featured highlight | 7/10 |
| `testimonial-section.tsx` | Grid + centered testimonial variants | 7/10 |
| `faq-section.tsx` | Static `<dl>` with zero interaction | 4/10 |
| `cta-section.tsx` | 4-variant CTA block — cramped mobile padding | 5/10 |
| `logo-cloud.tsx` | Logo row with hover opacity | 6/10 |
| `contact-section.tsx` | Contact info + form slot | 7/10 |
| `project-showcase.tsx` | Animated card grid with tags | 7/10 |

### `/components/marketing/` — Layout & Navigation

| File | Renders | Visual Grade |
|---|---|---|
| `navbar.tsx` | Sticky header with backdrop-blur, responsive | 8/10 |
| `footer.tsx` | 4-col grid footer | 7/10 |
| `mobile-menu.tsx` | Slide-in panel with expandable demos section | 8/10 |
| `demo-dropdown.tsx` | Hover mega-menu — no keyboard nav | 8/10 |

### `/components/demo/` — Demo UI Helpers

| File | Renders | Visual Grade |
|---|---|---|
| `demo-showcase-card.tsx` | Card with preview frame, capability list — hardcoded colors | 8/10 |
| `demo-preview-frame.tsx` | SVG browser mockup using inline styles | 7/10 |
| `demo-section-header.tsx` | Eyebrow + title + description block | 6/10 |
| `demo-capability-grid.tsx` | Feature grid with icon blobs | 7/10 |
| `demo-stack-badges.tsx` | Row of outline badges | 6/10 |

### `/components/dashboard-ui/` — Admin / App UI

| File | Renders | Visual Grade |
|---|---|---|
| `dashboard-shell.tsx` | Layout: sidebar + main — no mobile sidebar | 6/10 |
| `metric-card.tsx` | KPI card: label, value, trend, icon | 7/10 |
| `activity-feed.tsx` | Timeline with dots — empty state missing | 6/10 |
| `data-table-shell.tsx` | DataTable wrapper with empty-state slot | 7/10 |
| `status-badge.tsx` | 16 status variants — all hardcoded color strings | 7/10 |
| `filter-bar.tsx` | URL-synced search + dropdowns — no label on input | 7/10 |
| `bulk-action-bar.tsx` | Animated portal bottom bar | 8/10 |
| `audit-log-timeline.tsx` | Icon+badge vertical audit log | 7/10 |
| `confirm-dialog.tsx` | Confirm dialog with destructive state + loading | 8/10 |
| `entity-drawer.tsx` | Slide-in side drawer with Framer Motion | 8/10 |
| `empty-dashboard-state.tsx` | Centered state with icon + action | 7/10 |
| `export-button.tsx` | Format picker + download | 7/10 |
| `date-range-filter.tsx` | From/to date inputs + clear | 7/10 |

### `/components/component-variables/` — Variable-Driven Components

| File | Renders | Visual Grade |
|---|---|---|
| `configurable-filter-bar.tsx` | URL-sync filter bar driven by variables | 7/10 |
| `dual-range-slider.tsx` | Two-thumb range slider with full ARIA + keyboard | 9/10 |

### `/components/saas/` — Subscription / Billing

| File | Renders | Visual Grade |
|---|---|---|
| `plan-comparison-table.tsx` | Feature comparison table — no sticky first col mobile | 7/10 |
| `subscription-status-card.tsx` | Plan + status badge + actions | 7/10 |
| `usage-quota-card.tsx` | Color-coded progress bars per quota | 8/10 |
| `upgrade-modal.tsx` | Plan selection dialog with loading | 7/10 |
| `cancel-subscription-dialog.tsx` | Reason radio + confirm/cancel | 7/10 |
| `invoice-list.tsx` | Card with divide-y rows — hardcoded status colors | 7/10 |

### `/components/booking/` — Booking Flow

| File | Renders | Visual Grade |
|---|---|---|
| `service-picker.tsx` | Custom radio group for service selection | 7/10 |
| `time-slot-grid.tsx` | Animated slot grid with empty state | 8/10 |
| `booking-summary-card.tsx` | Read-only summary — flat muted bg, no card elevation | 5/10 |
| `booking-status-timeline.tsx` | Vertical status timeline | 7/10 |
| `booking-form.tsx` | Customer info form + loading submit | 7/10 |
| `booking-reminder-preview.tsx` | Email preview — hardcoded bg-white/zinc-900 | 6/10 |
| `client-booking-history.tsx` | List + empty state — hardcoded status colors | 7/10 |

### `/components/ecommerce/` — Commerce

| File | Renders | Visual Grade |
|---|---|---|
| `product-card.tsx` | Grid/list card with image + cart | 8/10 |
| `cart-drawer.tsx` | Animated slide-in cart panel | 9/10 |
| `cart-button.tsx` | Icon button with badge count | 8/10 |
| `price-display.tsx` | Price + discount % + strikethrough | 8/10 |
| `rating-stars.tsx` | Half-star rating with count | 8/10 |
| `quantity-stepper.tsx` | +/- with ARIA group | 8/10 |
| `variant-selector.tsx` | aria-pressed option buttons with swatch | 7/10 |
| `checkout-steps.tsx` | Wraps Stepper for checkout flow | 7/10 |
| `order-status-timeline.tsx` | Icon list for order steps — no animation | 6/10 |
| `checkout-summary.tsx` | Flat summary box — no elevation | 6/10 |
| `promo-code-input.tsx` | Code input + valid/invalid feedback | 7/10 |
| `customer-order-table.tsx` | Custom grid layout — not a real table element | 6/10 |

### `/components/real-estate/` — Property

| File | Renders | Visual Grade |
|---|---|---|
| `property-card.tsx` | Image + hover scale + gradient overlay + badges | 8/10 |
| `agent-profile-card.tsx` | Photo/initials + contact buttons | 7/10 |
| `neighborhood-score-card.tsx` | Criteria progress bars + overall score | 8/10 |
| `mortgage-calculator.tsx` | Live-calc sliders + results — unlabelled sliders | 7/10 |
| `property-search-bar.tsx` | Multi-field search — stacked on md | 7/10 |

### `/components/local-business/` — Local Services

| File | Renders | Visual Grade |
|---|---|---|
| `business-hours.tsx` | Today-highlighted schedule grid | 7/10 |
| `loyalty-stamp-card.tsx` | Stamp grid + progress bar + decorative circles | 8/10 |
| `service-package-card.tsx` | Feature list card with featured highlight | 7/10 |

### `/components/portfolio/` — Portfolio / Personal

| File | Renders | Visual Grade |
|---|---|---|
| `case-study-card.tsx` | Featured layout + image hover + metrics | 8/10 |
| `skills-grid.tsx` | Badge list grouped by category — no hover | 6/10 |
| `timeline.tsx` | Vertical timeline with current indicator | 7/10 |
| `filterable-projects.tsx` | Framer Motion layout filter + animated grid | 8/10 |
| `process-steps.tsx` | Numbered steps with connector — no hover/animation | 6/10 |
| `tech-stack-cloud.tsx` | Categorized skill rows with level dots — no hover | 7/10 |
| `contact-form.tsx` | Form with loading state + toast feedback | 7/10 |

---

## 2. Components Already Polished (Score >= 7/10)

- **`button.tsx`** — 12 variants, 6 sizes, full disabled/focus/hover/active, CSS vars throughout
- **`dialog.tsx`** — Framer Motion, portal, Escape key, click-outside, proper ARIA
- **`notification-bell.tsx`** — Unread count, empty state, Escape, keyboard nav, full ARIA
- **`file-dropzone.tsx`** — Drag-over visual, disabled, keyboard activation, ARIA `role="button"`, error list
- **`dual-range-slider.tsx`** — Full ARIA, keyboard (Arrow/Home/End/Shift), touch, disabled, focus rings
- **`data-table.tsx`** — Search, sortable headers with `aria-sort`, pagination, empty state, row hover
- **`select.tsx`** — Full ARIA combobox/listbox, keyboard (Arrow/Enter/Escape), `aria-activedescendant`
- **`cart-drawer.tsx`** — Animated portal, Escape, scroll lock, `aria-modal`, empty state, quantity controls
- **`product-card.tsx`** — `motion.div` image scale, out-of-stock overlay, add feedback, disabled state
- **`property-card.tsx`** — `group-hover:scale-105`, gradient overlay, status badges, hover duration 500ms
- **`animated-hero.tsx`** — Word-by-word spring, `useReducedMotion`, eyebrow/description stagger
- **`navbar.tsx`** / **`mobile-menu.tsx`** — sticky backdrop-blur, responsive, Escape close, animated chevron
- **`entity-drawer.tsx`** / **`bulk-action-bar.tsx`** — Framer Motion portal, animated in/out, Escape, scroll lock
- **`usage-quota-card.tsx`** — Color-coded bars (primary/warning/destructive threshold) with `transition-all`
- **`time-slot-grid.tsx`** — Framer Motion stagger per slot, empty state
- **`case-study-card.tsx`** — `group-hover:scale-105 duration-700`, metrics grid, featured layout variant
- **`filterable-projects.tsx`** — `AnimatePresence mode="popLayout"`, filter pill active state
- **`loyalty-stamp-card.tsx`** — Decorative circles, stamp grid, progress bar
- **`media-grid.tsx`** — Framer Motion layout, lightbox dialog, empty state, hover overlay

---

## 3. Components Too Plain / Flat (Score <= 4/10)

### `tabs.tsx` — 3/10 (P0 — Worst Offender)
- `TabsTrigger` has `hover:bg-background` only — no selected/active visual state
- Missing `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls` — non-functional as accessible tabs
- No keyboard Arrow key switching between tabs

### `faq-section.tsx` — 4/10 (P0)
- Plain `<dl>` with `border-b` separators — zero expand/collapse
- Component registry documents "expanded" state that does not exist in implementation
- No hover/focus states — purely static text

---

## 4. Visually Inconsistent Components

### Hardcoded Color Strings (not using CSS variables)

These bypass the design token system and break in non-standard themes:

1. **`avatar.tsx`** — `palette` array hardcodes `bg-blue-500`, `bg-violet-500`, `bg-emerald-500`, `bg-orange-500`, `bg-rose-500`, `bg-cyan-500`, `bg-amber-500`, `bg-pink-500`, `bg-indigo-500`, `bg-teal-500`
2. **`status-badge.tsx`** — All 16 statuses use literal `border-green-200 bg-green-50 text-green-700 dark:...` (and similar)
3. **`alert.tsx`** — `info` variant: `border-blue-200 bg-blue-50 text-blue-800 dark:...` — no `--color-info` token
4. **`demo-showcase-card.tsx`** — `COMPLEXITY_COLORS` hardcodes green/amber/purple strings
5. **`invoice-list.tsx`** — `STATUS_STYLES` hardcodes `border-green-200 bg-green-50 text-green-700` etc.
6. **`client-booking-history.tsx`** — Same pattern, hardcoded blue/green/zinc status strings
7. **`booking-reminder-preview.tsx`** — `bg-white dark:bg-zinc-900` — breaks non-white light themes

### Mixed border-radius (not using CSS variable)

Several domain components hardcode `rounded-xl`, `rounded-2xl`, `rounded-full` instead of using the `--radius` token or `Card`'s `radius` prop.

---

## 5. Spacing Issues

### Critical Build Bug

**`stats-section.tsx`** — dynamic Tailwind class in template literal:
```tsx
className={`grid-cols-2 sm:grid-cols-${Math.min(stats.length, 4)}`}
```
Tailwind JIT cannot detect `sm:grid-cols-3` / `sm:grid-cols-4` here — these classes will be purged in production. The grid collapses to 1 column regardless of stat count.

Fix: use a static safeList lookup (as `FeatureGrid` already does correctly).

### Inconsistent Padding

- **`cta-section.tsx`** "border" variant: `p-10` on all sides — cramped on 320px screens
- **`booking-summary-card.tsx`**: `p-4 text-sm` — no responsive adjustment
- **`contact-section.tsx`**: `border p-6` without responsive padding

---

## 6. Weak Hover / Focus / Active States

### No Hover State

- **`accordion.tsx`** — `AccordionTrigger` has no hover background, only chevron rotation
- **`faq-section.tsx`** — zero interaction
- **`skills-grid.tsx`** — skill tags are purely decorative `Badge` with no hover
- **`process-steps.tsx`** — numbered circles have no hover state
- **`tech-stack-cloud.tsx`** — `border bg-card` rows have no hover
- **`order-status-timeline.tsx`** — fully static
- **`marquee.tsx`** — no pause-on-hover (WCAG violation)

### Inadequate Hover States

- **`cookie-banner.tsx`** — close button transitions color only; banner has no entry animation
- **`tabs.tsx`** — `hover:bg-background` inside `bg-muted` turns tab white but no selected state visible
- **`cta-section.tsx`** — no hover on block itself; relies on child `Button`

### Missing Active / Pressed State

- **`accordion.tsx`** — no `active:` on trigger
- **`select.tsx`** — options have `hover:bg-muted` but no `:active` feedback
- **`multi-select.tsx`** — no active feedback on option click

---

## 7. Missing States

### Loading State Gaps

| Component | Gap |
|---|---|
| `data-table.tsx` | No `loading` prop — shows empty text immediately |
| `activity-feed.tsx` | No loading skeleton |
| `invoice-list.tsx` | No loading skeleton |
| `customer-order-table.tsx` | No loading skeleton |
| `plan-comparison-table.tsx` | No loading state |
| `metric-card.tsx` | `SkeletonMetric` exists but not linked via `loading` prop |

### Empty State Gaps

| Component | Gap |
|---|---|
| `activity-feed.tsx` | Empty `<ol>` rendered — no message (registry says empty state is supported) |
| `stats-section.tsx` | Renders empty grid |
| `feature-grid.tsx` | Renders empty grid |
| `logo-cloud.tsx` | Renders empty container |

### Error State Gaps

| Component | Gap |
|---|---|
| `booking-form.tsx` | `disabled`/`disabledReason` only — no server error display |
| `metric-card.tsx` | No error/stale indicator |
| `mortgage-calculator.tsx` | No input validation errors |
| `contact-form.tsx` | Toast-only error — no inline field errors |

### Disabled State Gaps

| Component | Gap |
|---|---|
| `tabs.tsx` | No `disabled` prop on `TabsTrigger` |
| `service-picker.tsx` | No disabled individual option support |
| `process-steps.tsx` | Steps always active |

---

## 8. Mobile / Responsive Issues

### Critical

1. **`stats-section.tsx`** — Dynamic `sm:grid-cols-${N}` purged by JIT. Production layout bug.
2. **`dashboard-shell.tsx`** — Sidebar `hidden ... lg:flex` with **no mobile toggle**. Sidebar content completely inaccessible on tablet and mobile.

### Significant

3. **`property-search-bar.tsx`** — On `md` screens, submit button appears alone in half-width cell.
4. **`plan-comparison-table.tsx`** — `overflow-x-auto` wraps table but no sticky first column — users lose feature label context while scrolling horizontally.
5. **`cta-section.tsx`** "border" variant — `p-10` not reduced on mobile; very cramped at 320px.
6. **`logo-cloud.tsx`** — `flex-wrap` with many logos can produce ragged rows on small screens.
7. **`customer-order-table.tsx`** — `grid-cols-[1fr_auto_auto]` cramped on very small screens.

---

## 9. Accessibility Issues

### High Severity

1. **`tabs.tsx`** — Missing `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, `aria-labelledby`, `role="tabpanel"`. Keyboard Arrow key switching absent. Non-functional as accessible tab widget.
2. **`marquee.tsx`** — Auto-scrolling content with no `aria-hidden` (if decorative) and no pause-on-hover. Violates WCAG 2.1 SC 2.2.2 (Pause, Stop, Hide).
3. **`accordion.tsx`** — Native `<details>/<summary>` (browser handles ARIA) but zero height transition — content snaps open with no animation. Jarring and inconsistent.

### Medium Severity

4. **`avatar.tsx`** — Initials fallback `<div aria-label={name}>` — `aria-label` on a non-interactive div is meaningless to screen readers.
5. **`mortgage-calculator.tsx`** — `<span>` label not connected to `<input type="range">` via `htmlFor`/`id`. No `aria-valuenow`/`aria-valuemin`/`aria-valuemax` on sliders.
6. **`demo-dropdown.tsx`** — `aria-haspopup="true"` should be `"menu"` or `"listbox"`. No keyboard nav (Arrow/Escape).
7. **`faq-section.tsx`** — Semantically correct `<dl>` but no interaction violates user expectations for an FAQ.
8. **`stats-section.tsx`** — Animated numbers lack `aria-label` context (screen reader announces "24M" without associated label).
9. **Color-only status** — `invoice-list.tsx`, `customer-order-table.tsx` use badge color alone to convey status (WCAG 1.4.1 violation). `StatusBadge` in dashboard-ui has a `dot` prop that helps.

### Low Severity

10. **`cookie-banner.tsx`** — Missing `aria-live="assertive"` to announce appearance. 800ms delayed appearance may be missed by screen readers.
11. **`filter-bar.tsx`** — Search `<input>` has no `<label>` — only a placeholder. No programmatic label.
12. **`activity-feed.tsx`** — `<ol>` has no `aria-label`. Empty list has no empty-state text announced.

---

## 10. Do-Not-Touch List

These components work correctly and carry high regression risk — **do not modify in this sprint**:

| Component | Reason |
|---|---|
| `dual-range-slider.tsx` | Complex ARIA + keyboard + touch logic. High regression risk. |
| `animated-hero.tsx` | Carefully tuned spring physics and stagger timing. |
| `dialog.tsx` | Portal + Framer Motion + scroll lock — correct. |
| `file-dropzone.tsx` | Counter-based drag tracking is subtle. |
| `file-upload-queue.tsx` | Hook + display separation is correct. |
| `cart-drawer.tsx` | Portal + Framer Motion + CartContext. |
| `entity-drawer.tsx` | Same portal pattern. |
| `bulk-action-bar.tsx` | Portal-rendered, animation-dependent. |
| `notification-bell.tsx` | Complex state (unread, mark-read, dismiss, Escape). |
| `multi-select.tsx` | Full ARIA multiselect with keyboard. |
| `select.tsx` | Custom combobox ARIA. |
| `configurable-filter-bar.tsx` | URL-sync + debounced writes + VariableProvider coupling. |
| `demo-preview-frame.tsx` | Inline-style canvas mockup — no functional impact. |
| `media-grid.tsx` | `AnimatePresence` + Framer Motion layout + lightbox. |
| `filterable-projects.tsx` | `AnimatePresence mode="popLayout"` layout animation. |

---

## 11. Priority Classification

### P0 — Critical / Broken Visual or Functional

- **`tabs.tsx`** — Rebuild with `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, keyboard Arrow switching, selected visual state.
- **`stats-section.tsx`** — Fix dynamic `sm:grid-cols-${N}` with a static safeList object. Production build bug.
- **`faq-section.tsx`** — Replace static `<dl>` with `Accordion` / `AccordionItem` / `AccordionTrigger` / `AccordionContent`. Add interaction.
- **`activity-feed.tsx`** — Add empty state. Registry documents empty state as supported — not implemented.

### P1 — High Impact, Easy Win

- **`accordion.tsx`** — Add CSS height transition on `AccordionContent` (snap-open is jarring and inconsistent).
- **`avatar.tsx`** — Replace hardcoded `palette` with token-based alternatives (`bg-primary/20 text-primary`, `bg-accent/20 text-accent`, etc.).
- **`alert.tsx`** — Replace `info` variant hardcoded colors with CSS variable consistent with other semantic variants.
- **`dashboard-shell.tsx`** — Add mobile sidebar toggle (hamburger in `DashboardHeader` + Sheet/drawer on `< lg`).
- **`marquee.tsx`** — Add `hover:[animation-play-state:paused]` + `aria-hidden="true"` if decorative.
- **`input.tsx`** — Add `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` for keyboard-only focus ring.
- **`cookie-banner.tsx`** — Add slide-up entry animation (`translate-y-4 opacity-0` → `translate-y-0 opacity-100`).
- **`shimmer-badge.tsx`** — Document required CSS in JSDoc; add inline fallback if class is missing.

### P2 — Medium, Improves Quality

- **`mortgage-calculator.tsx`** — Connect `<input type="range">` to label via `aria-label` + `aria-valuenow`/`min`/`max`.
- **`cta-section.tsx`** — Add `sm:p-6` responsive padding to "border" variant inner box. Add `useInView` entrance animation.
- **`logo-cloud.tsx`** — Add `sm:gap-12` responsive spacing + explicit `transition-opacity duration-200`.
- **`order-status-timeline.tsx`** — Animate connector line fill as steps complete (match `BookingStatusTimeline` pattern).
- **`checkout-summary.tsx`** — Add `shadow-sm` and elevation cues to signal "summary" context.
- **`customer-order-table.tsx`** — Migrate to `<table>/<thead>/<tbody>/<th>/<td>` for correct semantics, or use existing `DataTable`.
- **`booking-summary-card.tsx`** — Upgrade from flat `border bg-muted/20 p-4` to `Card` with `shadow-sm` and `rounded-lg`.
- **`process-steps.tsx`** — Add hover state on step circles + `useInView` entrance animation on connector line.
- **`skills-grid.tsx`** / **`tech-stack-cloud.tsx`** — Add `hover:border-primary hover:text-primary transition-colors` to make skills feel polished.
- **`demo-dropdown.tsx`** — Add Arrow key navigation + Escape close.
- **`filter-bar.tsx`** — Add `aria-label` on search `<input>`.
- **`data-table.tsx`** — Add `loading?: boolean` prop that swaps content with `SkeletonTable`.

### P3 — Low Priority, Nice to Have

- **`accordion.tsx`** — Consider migrating to Radix UI `@radix-ui/react-accordion` for WAI-ARIA compliance.
- **`badge.tsx`** — Add optional `asChild` support for rendering as `<a>` or `<button>`.
- **`shimmer-badge.tsx`** — Inline the CSS animation directly so the component is self-contained.
- **`loading-state.tsx`** — Remove duplicate `Skeleton` export (conflicts with `skeleton.tsx`).
- **`stats-section.tsx`** — Integrate `AnimatedCounter` sub-component (exists separately, not used in `StatsSection`).
- **`plan-comparison-table.tsx`** — Add sticky first column (`position: sticky; left: 0`) for mobile scroll.
- **`invoice-list.tsx`** — Replace `STATUS_STYLES` hardcoded strings with `StatusBadge` from dashboard-ui.
- **`client-booking-history.tsx`** — Same: replace `STATUS_STYLES` with `StatusBadge`.
- **`demo-showcase-card.tsx`** — Replace `COMPLEXITY_COLORS` with `Badge variant="success/warning/soft"`.

---

## Summary

| Metric | Value |
|---|---|
| Total component files audited | ~110 |
| Already polished (>= 7/10) | ~72 |
| Need polish (<= 6/10) | ~25 |
| Broken / below minimum (<= 4/10) | 2 (`tabs`, `faq-section`) |
| Accessibility | **PARTIAL** |
| Mobile | **PARTIAL** |
| Design token consistency | **PARTIAL** |
| Estimated visual score before sprint | **6.7 / 10** |

### Top 5 Fixes (Start Here)

1. `components/ui/tabs.tsx` — Rebuild with ARIA (P0)
2. `components/sections/stats-section.tsx` — Fix dynamic className build bug (P0)
3. `components/sections/faq-section.tsx` — Wire to Accordion (P0)
4. `components/dashboard-ui/activity-feed.tsx` — Add empty state (P0)
5. `components/dashboard-ui/dashboard-shell.tsx` — Add mobile sidebar toggle (P1)

---

Accessibility:
PARTIAL

Mobile:
PARTIAL

Risques restants:
- P0: tabs.tsx (ARIA rebuild), stats-section.tsx (build bug), faq-section.tsx (no interaction), activity-feed.tsx (silent empty)
- P1: accordion animation, avatar palette tokens, alert info variant, dashboard mobile, marquee WCAG, input focus ring, cookie-banner animation
- P2: mortgage-calculator ARIA, cta responsive, order timeline animation, customer-order-table semantics, booking-summary elevation, process-steps hover, skills hover, data-table loading prop
- P3: accordion Radix migration, badge asChild, shimmer-badge inline CSS, stats AnimatedCounter, plan-comparison sticky col, invoice/booking StatusBadge migration

Score visuel avant: 6.7/10
Score visuel après (estimé): 8.5/10

Prochaine étape recommandée: Demo Blueprint Manifests
