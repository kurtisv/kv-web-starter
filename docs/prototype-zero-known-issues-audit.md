# Prototype Engine — Zero Known Issues Audit

Branch: fix/prototype-zero-known-issues
Date: 2026-07-02

---

## 1. Files Audited

- apps/web/src/app/prototype/page.tsx
- apps/web/src/app/prototype/wizard-client.tsx
- apps/web/src/components/prototype/wizard-shell.tsx
- apps/web/src/components/prototype/step-client-profile.tsx
- apps/web/src/components/prototype/step-visual-identity.tsx
- apps/web/src/components/prototype/step-features.tsx
- apps/web/src/components/prototype/step-preview.tsx
- apps/web/src/components/prototype/prototype-preview.tsx
- apps/web/src/components/prototype/manifest-card.tsx
- apps/web/src/lib/prototype-engine/types.ts
- apps/web/src/lib/prototype-engine/presets-map.ts
- apps/web/src/lib/prototype-engine/recommend-preset.ts
- apps/web/src/lib/prototype-engine/generate-manifest.ts
- apps/web/src/design-system/design-profiles.ts
- apps/web/src/app/demo/page.tsx
- apps/web/src/app/demo/layout.tsx
- apps/web/tests/e2e/prototype.spec.ts

---

## 2. Known Issues (pre-sprint)

- debounce on name/tagline: fixed in #12
- safeProfile / safeColor: fixed in #12
- E2E tests for /prototype: added in #12
- entry links /demo -> /prototype: added in #12

---

## 3. New Issues Found

### URL State

- wizard-client.tsx:55-58 — features split with no cross-industry validation; features from a prior industry remain when navigating back
- wizard-client.tsx:51 — name has no length cap; URL manipulation allows multi-KB strings
- wizard-client.tsx:59 — tagline has no length cap
- validation helpers (safeStep, safeColor, safeProfile, safeIndustry) live inline in wizard-client.tsx — not unit-testable and not reusable
- No safeMode or safeText helpers

### Manifest JSON

- generate-manifest.ts:18 — new Date().toISOString() called on every invocation; wizard-client calls generateManifest on every render, so generatedAt changes on every debounce tick, slider drag, etc.
- manifest changes between copy and download within the same session
- E2E test for generatedAt stability is missing

### Copy / Download

- manifest-card.tsx:19 — navigator.clipboard not checked for existence before call; on non-HTTPS or Firefox without permission, the whole thing throws an uncaught promise rejection
- manifest-card.tsx:19 — no .catch() on writeText; unhandled rejection
- manifest-card.tsx:25-33 — no try/catch; Blob or createObjectURL could throw
- manifest-card.tsx:25-33 — revokeObjectURL called right after a.click() which is technically fine but has no error path
- No copyStatus: "error" state — user gets no feedback on failure
- No downloadStatus at all — no feedback on success or failure
- No aria-live on feedback region

### Accessibility

- wizard-shell.tsx:94 — step completion uses literal "v" instead of <Check /> icon; screen reader reads "v" as the letter v
- manifest-card.tsx — copy/download buttons have no aria-live sibling to announce state change
- step-visual-identity.tsx:85 — aria-label is "Code hexadecimal personnalise" but visible label is "Hex personnalise"
- pre block in manifest-card.tsx has no tabIndex; keyboard users cannot scroll the JSON block

### Mobile / Overflow

- manifest-card.tsx:68 — pre has overflow-y-auto but no overflow-x-auto; long JSON lines can cause horizontal page overflow on 390px
- E2E mobile coverage missing for steps 2 and 3

### Performance / Hydration

- generateManifest() called every render in wizard-client — stable with generatedAt fix, no other concern
- No hydration mismatch detected (Suspense boundary correct)

### Navigation / Links

- /demo/* all 9 slugs verified as existing routes
- /demo/design-lab exists
- /demo/components exists
- /prototype entry link in /demo and footer: verified present
- No dead links detected in step-preview quick links (saas/booking/etc all valid)

### Tests

- Mobile 390px only covered for steps 1 and 4; steps 2 and 3 missing
- generatedAt stability test missing
- features cross-industry rejection test missing
- copy/download E2E partially covered but no error-path test
- download uses page.click() without waitForEvent("download") — unreliable in CI

---

## 4-12. Domain-specific Detail

See Priorities section below for full classification.

---

## 13. Priorities

### P1

| ID | Location | Issue |
|----|----------|-------|
| P1-1 | generate-manifest.ts:18 | generatedAt unstable — new Date() on every render |
| P1-2 | manifest-card.tsx:19 | navigator.clipboard undefined crash |
| P1-3 | manifest-card.tsx:19 | no .catch on writeText — unhandled rejection |
| P1-4 | wizard-client.tsx:56 | features not cross-industry validated |
| P1-5 | manifest-card.tsx:25 | download no try/catch |

### P2

| ID | Location | Issue |
|----|----------|-------|
| P2-1 | manifest-card.tsx:68 | pre missing overflow-x-auto |
| P2-2 | manifest-card.tsx | no aria-live on copy/download feedback |
| P2-3 | wizard-shell.tsx:94 | "v" letter instead of Check icon |
| P2-4 | wizard-client.tsx:51-59 | name/tagline no length limit |
| P2-5 | prototype.spec.ts | mobile steps 2+3 not covered |
| P2-6 | prototype.spec.ts | generatedAt stability test missing |

### P3

| ID | Location | Issue |
|----|----------|-------|
| P3-1 | manifest-card.tsx:68 | pre not keyboard-scrollable (tabIndex missing) |
| P3-2 | step-visual-identity.tsx:85 | aria-label/visible label mismatch |

---

## 14. Plan de Correction

- LOT 1: Centralize URL validation in url-state.ts + unit tests
- LOT 2: Stabilize generatedAt with useRef + generate-manifest.test.ts
- LOT 3: Harden copy/download + aria-live + overflow-x-auto
- LOT 4: Fix wizard UX (Check icon, tabIndex, length limits)
- LOT 5: Complete E2E (mobile steps 2+3, generatedAt, features cross-industry, download)
- LOT 6: Verify all links
- LOT 7: Final report
