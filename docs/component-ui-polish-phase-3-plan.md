# Component UI Polish — Phase 3 Plan

**Branch:** `feature/component-ui-polish-phase-3`
**Date:** 2026-07-01
**Base:** `main` (inclut Phase 1 + Phase 2)

---

## Objectif

Traiter les risques restants de Phase 2 :
- Dialog : focus trap manquant (a11y critique)
- Sheet : wrapper bare sans animation, role, ni focus management
- BookingForm : pas d'error states inline
- PricingSection : plan featured peu visible
- LogoCloud : ARIA absent

---

## Composants a modifier

| Composant | Probleme | Priorite |
|-----------|----------|---------|
| `ui/dialog.tsx` | Pas de focus trap, pas de aria-labelledby/describedby props | P0 |
| `ui/sheet.tsx` | Bare wrapper — pas d'animation, pas de role, pas de focus trap, pas d'Escape | P0 |
| `booking/booking-form.tsx` | Pas de validation inline (error prop sur Input), aria-busy manquant | P1 |
| `sections/pricing-section.tsx` | Plan featured peu distinct visuellement, pas de aria-label | P1 |
| `sections/logo-cloud.tsx` | Pas de ARIA sur la liste de logos | P2 |

---

## Composants non touches

- Tous les composants 3D
- Composants deja ameliores en Phase 2
- `ConfigurableFilterBar` (url sync fragile, stable)
- `accordion.tsx`, `faq-section.tsx` (deja animes)
- `tabs.tsx` (deja ARIA complet)
- `stats-section.tsx` (deja fixe)
- `marquee.tsx`, `avatar.tsx`, `cookie-banner.tsx` (deja ameliores)

---

## Standards Phase 1 appliques

- Regle 1 : Profil client avant composant
- Regle 4 : reduced-motion sur toute animation
- Regle 5 : mobile-first
- Pattern : focus-management (dialog/modal)
- Pattern : error-state-recovery (booking form)

---

## Risques

- Focus trap peut affecter les dialogs existants si mal implemente
- Sheet redesign peut casser des usages existants (layout wrapper) — garder les sous-composants compatibles
- Booking form : validation est cote serveur via Server Actions — ne pas dupliquer la logique, juste le feedback visuel

---

## Ordre d'execution

1. Lot 0 : Plan (ce fichier)
2. Lot 1 : Dialog focus trap + aria props
3. Lot 2 : Sheet redesign (animated + focus + ARIA)
4. Lot 3 : BookingForm error states + aria-busy
5. Lot 4 : PricingSection featured emphasis + aria
6. Lot 5 : LogoCloud ARIA
7. Lot 6 : Showcase Phase 3
8. Lot 7 : Registry update
9. Lot 8 : Tests E2E
10. Lot 9 : Score doc
11. Lot 10 : Rapport final
