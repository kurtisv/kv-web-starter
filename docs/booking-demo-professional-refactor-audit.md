# Booking Demo Professional Refactor — Audit

Branch: feature/professional-booking-demo-refactor
Date: 2026-07-01

---

## 1. Ce que la demo actuelle fait bien

- Theme `data-theme="local-business"` applique proprement
- ServicePicker avec radio group accessible, aria-label, selectedId, formId
- StaffPicker avec avatar initials, role, selected state, hidden single-staff
- TimeSlotGrid avec framer-motion, aria-label, empty state
- BookingSummaryCard avec service/staff/date
- BookingStatusTimeline avec etapes confirmed/reminded/in_progress/completed
- ClientBookingHistory avec statuts, lien /my-bookings
- BookingReminderPreview presente
- BookingDemoActions (CancelBookingDialog + RescheduleBookingDialog) fonctionnels
- HeroSection, TestimonialSection, CTASection reutilises
- Donnees hardcodees propres (pas de new Date() dans le rendu)
- /booking complet : ServicePicker, StaffPicker, BookingDateSelector, TimeSlotGrid, BookingForm, BookingSummaryCard, Stepper, Prisma fallback, generateBookingSlots, alerts success/error

---

## 2. Ce que /booking fait deja

- Chargement des services, staff, availabilityRules, exceptions, bookings depuis Prisma
- Fallback demo si DB indisponible (graceful degradation)
- generateBookingSlots genere les creneaux dispo selon les regles
- Formulaire en 4 etapes avec Stepper
- Alerts success/error
- `new Date(selectedDate + 'T12:00:00').toLocaleDateString('fr-CA', ...)` dans CardDescription (potentiel hydration mismatch SSR/client selon le fuseau)

---

## 3. Composants existants a reutiliser

- `ServicePicker` — OK, a enrichir avec category/deposit/inactive
- `StaffPicker` — OK, a enrichir avec next-available et rating fictif
- `TimeSlotGrid` — OK tel quel
- `BookingDateSelector` — OK
- `BookingForm` — OK, a enrichir avec consent/intake
- `BookingSummaryCard` — OK, a enrichir avec deposit/cancellation
- `BookingStatusTimeline` — OK tel quel
- `ClientBookingHistory` — OK tel quel
- `BookingReminderPreview` — OK tel quel
- `CancelBookingDialog` — OK tel quel
- `RescheduleBookingDialog` — OK tel quel
- `BookingDemoActions` — OK, adaptable pour shell
- `ActivityFeed` (dashboard-ui) — reutilisable pour activite
- `AuditLogTimeline` (dashboard-ui) — reutilisable pour historique
- `StatusBadge` (dashboard-ui) — reutilisable partout
- `MetricCard` (dashboard-ui) — reutilisable dans dashboard
- `ConfirmDialog` (dashboard-ui) — reutilisable dans actions
- `HeroSection`, `TestimonialSection`, `CTASection`, `StatsSection`, `FAQSection` (sections)

---

## 4. Gaps pour un booking product complet

### Architectural
- Pas de sous-routes : /demo/booking/dashboard, /calendar, /services, /clients, /payments, /settings
- Pas de shell/nav interne booking (navigation entre sections du produit)
- Pas de donnees mock centralisees (duplication inline dans page.tsx)

### Fonctionnel (P1)
- Pas de dashboard admin avec metriques, appointments today, staff utilization
- Pas de calendrier/resource management
- Pas de gestion services (classes, packages, gift cards)
- Pas de CRM client (profils, notes, intake, historique)
- Pas de page paiements/policies (deposits, no-show, waitlist, invoices)
- Pas de settings (branding, reminders, integrations, roles)
- Pas de waitlist
- Pas de classes/sessions de groupe

### UX/Mobile (P2)
- Landing actuelle montrait les composants mais pas un vrai produit de booking
- Manque : Problem/Solution, Feature Bento, Payments/policies, Analytics, Client portal
- Mobile : futures pages dashboard peuvent deborder si tables pas adaptees

### Accessibilite (P2)
- Progress bars futures doivent avoir role=progressbar + aria-label + aria-valuenow
- Slots dans TimeSlotGrid : aria-labels OK

---

## 5. Routes a ajouter

- `/demo/booking` — refactorisee (LOT 2)
- `/demo/booking/dashboard` — nouvelle (LOT 3)
- `/demo/booking/calendar` — nouvelle (LOT 4)
- `/demo/booking/services` — nouvelle (LOT 5)
- `/demo/booking/clients` — nouvelle (LOT 6)
- `/demo/booking/payments` — nouvelle (LOT 7)
- `/demo/booking/settings` — nouvelle (LOT 8)

---

## 6. Composants a creer

### Shell (partage)
- `booking-demo-shell.tsx`
- `booking-demo-nav.tsx`

### Dashboard (LOT 3)
- `booking-kpi-grid.tsx`
- `todays-appointments-list.tsx`
- `staff-utilization-card.tsx`
- `no-show-risk-card.tsx`
- `waitlist-card.tsx`
- `booking-activity-feed.tsx`
- `booking-funnel-card.tsx`

### Calendar (LOT 4)
- `calendar-day-view.tsx`
- `calendar-week-strip.tsx`
- `resource-availability-panel.tsx`
- `availability-rules-card.tsx`
- `schedule-conflict-alert.tsx`

### Services (LOT 5)
- `service-management-table.tsx`
- `service-detail-card.tsx`
- `class-session-card.tsx`
- `package-card.tsx`
- `gift-card-card.tsx`

### Clients (LOT 6)
- `client-profile-card.tsx`
- `client-directory-table.tsx`
- `intake-form-preview.tsx`
- `client-notes-panel.tsx`
- `client-segment-card.tsx`

### Payments (LOT 7)
- `payment-summary-card.tsx`
- `no-show-policy-card.tsx`
- `waitlist-panel.tsx`
- `booking-invoice-list.tsx`
- `membership-card.tsx`
- `refund-policy-card.tsx`

### Settings (LOT 8)
- `booking-settings-card.tsx`
- `automation-template-card.tsx`
- `integration-status-card.tsx`
- `booking-branding-card.tsx`
- `role-permissions-card.tsx`

---

## 7. Risques identifies

### P0
- Aucun P0 connu dans le code actuel

### P1
- Donnees mock non centralisees : risque de divergence entre pages
- new Date() dans fallbackDate de /booking (server only, OK)
- Liens morts si nav pointe vers routes non encore creees — a gerer par ordre de creation

### P2
- `new Date(selectedDate + 'T12:00:00').toLocaleDateString('fr-CA', ...)` dans /booking CardDescription — SSR safe mais timezone-dependent
- Mobile : futures pages avec tables doivent avoir overflow-x-auto
- Progress bars : a creer avec role=progressbar + aria-label

### P3
- booking-preview.tsx utilise new Date() pour generer les slots — deterministe (date fixe) mais a surveiller
- Couleurs non-token possibles dans nouveaux composants

---

## 8. Plan de refactor

1. Donnees mock centralisees (lib/demo-data/booking-demo-data.ts)
2. Shell/nav booking partage
3. Refactor landing (15 sections) — marque ZenSlot
4. Dashboard admin complet
5. Calendar / resource schedule
6. Services / classes / packages
7. Clients / CRM / intake
8. Payments / policies / waitlist
9. Settings / automations / integrations
10. Polish composants existants
11. Aligner /booking avec le nouveau design
12. Registry + demo index
13. E2E (25+ tests)
14. Documentation finale
