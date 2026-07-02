# ZenSlot Booking Demo -- User Flows

This document describes the user flows available in the ZenSlot professional booking demo.
All data is fictional ("Donnees fictives de demonstration").

---

## Entry points

| URL | Description |
|-----|-------------|
| `/demo` | Demo index -- ZenSlot card links here |
| `/demo/booking` | ZenSlot landing page (start here) |
| `/booking` | Live booking flow (real DB / fallback demo data) |
| `/my-bookings` | Client appointment portal |

---

## Flow 1: Discovery (potential customer perspective)

```
/demo/booking (landing)
  |-- Hero: "Essayer la reservation" --> /booking
  |-- Hero: "Voir le dashboard" ------> /demo/booking/dashboard
  |-- Booking preview section: cancel/reschedule dialog demo
  |-- Integrations section: "Voir toutes les integrations" --> /demo/booking/settings
  |-- Pricing section (demo disclaimer visible)
  |-- FAQ
  |-- CTA: "Essayer la demo" ----------> /booking
```

## Flow 2: Admin tour (prospect evaluating the platform)

```
/demo/booking/dashboard
  |-- KPI grid: Revenu aujourd'hui, RDV, No-shows, Taux remplissage
  |-- Rendez-vous d'aujourd'hui (TodaysAppointmentsList)
  |-- Activite recente (BookingActivityFeed)
  |-- Utilisation du personnel (StaffUtilizationCard)
  |-- No-show risk (NoShowRiskCard)
  |-- Liste d'attente (WaitlistCard)
  |-- Funnel de conversion (BookingFunnelCard)

/demo/booking/calendar
  |-- Vue semaine (CalendarWeekStrip)
  |-- Vue journee heure par heure (CalendarDayView, 8h-19h)
  |-- Ressources & salles (ResourceAvailabilityPanel)
  |-- Conflits d'agenda (ScheduleConflictAlert, si present)

/demo/booking/services
  |-- Services individuels (ServiceManagementTable)
  |-- Specialites du personnel
  |-- Classes & sessions de groupe (ClassSessionCard)
  |-- Forfaits (PackageCard)
  |-- Abonnements mensuels
  |-- Cartes cadeaux (GiftCardCard)

/demo/booking/clients
  |-- Segmentation client (ClientSegmentCard)
  |-- Repertoire clients (ClientDirectoryTable)
  |-- Profil en vedette (ClientProfileCard + historique + notes)
  |-- Formulaires d'admission (IntakeFormPreview)
  |-- Notes internes (ClientNotesPanel)

/demo/booking/payments
  |-- Resume revenus (PaymentSummaryCard: aujourd'hui / semaine / mois)
  |-- Factures recentes (BookingInvoiceList: ZS-2026-XXXX)
  |-- Liste d'attente avec notification (WaitlistPanel)
  |-- Politique no-show & annulation (NoShowPolicyCard)
  |-- Abonnements actifs (MembershipCard)
  |-- Cartes cadeaux actives / utilisees (GiftCardCard)

/demo/booking/settings
  |-- Profil de l'etablissement (BookingSettingsCard: Seren Studio)
  |-- Regles de disponibilite (BookingSettingsCard: horaires, buffer, delai)
  |-- Rappels automatiques (AutomationTemplateCard)
  |-- Integrations (IntegrationStatusCard: Google Calendar, Stripe, Twilio, Zoom...)
  |-- Roles & permissions (RolePermissionsCard: Administrateur, Praticien, Receptionniste)
```

## Flow 3: Client booking (live flow, not demo data)

```
/booking
  |-- Step 1: Choisir un service (ServicePicker)
  |-- Step 1b: Choisir un intervenant (StaffPicker)
  |-- Step 2: Choisir une date (BookingDateSelector)
  |-- Step 3: Choisir un creneau (TimeSlotGrid)
  |-- Step 4: Vos coordonnees (BookingForm)
  |-- On success: redirect /booking?success=1
  |-- Success alert has link --> /my-bookings
```

---

## Navigation structure

`BookingDemoNav` (aria-label="Navigation ZenSlot") appears on all 7 demo routes:

```
<-- Demos   [Accueil] [Dashboard] [Calendrier] [Services] [Clients] [Paiements] [Parametres]   Reserver -->
```

- "Demos" back-link goes to `/demo`
- "Reserver" CTA goes to `/booking`
- Active item highlighted with `border-b-2 border-primary text-primary`
- Exact match on landing, prefix match on sub-routes

---

## Disclaimer placement

Every sub-page shows a disclaimer at the bottom:
> "Donnees fictives de demonstration -- Seren Studio est un business fictif cree pour illustrer les capacites de ZenSlot."

The pricing section on the landing shows:
> "Demo fictive -- prix indicatifs uniquement, pas de facturation reelle"

---

## Demo limitations (intentional)

- Toggle fields in Settings show "Mode demo -- sauvegarde desactivee" on save attempt
- No real Stripe keys exposed (only mock transaction amounts in EUR)
- Cancel/reschedule dialogs in `BookingDemoActions` call `onConfirm={() => {}}` (no-op)
- Calendar day view is fixed to "1 juillet 2026" (string literal, no live date)
- All appointment times and client data are fictional
