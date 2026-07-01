# Demo Reliability Kit Report

Date: 2026-07-01
Branch: `feature/demo-reliability-kit`

## Why This Sprint Exists

The SkillForge Academy local stress test showed that the boilerplate is solid, but agents need a more reliable foundation for creating, validating, and explaining demo routes. This sprint adds that foundation without starting a Client-to-Prototype Engine and without generating complete sites.

## Academy Problems Addressed

- Local demo setup now has a safe env template.
- Demo formatting now has deterministic helpers for numbers, currency, dates, and ratings.
- Route checks now have a reusable `audit:route` command.
- Demo validation now has a targeted `validate:demo` command.
- The registry now has a prescriptive action layer: `recommended`, `acceptable`, `avoid`, and `gap`.
- Component recommendation reports can now be generated without AI or external calls.
- Agent component selection rules now exist in docs and code.

## Scripts Added

| Command | Purpose |
| --- | --- |
| `pnpm demo:env` | Copies the safe local demo env template to `apps/web/.env.local`. |
| `pnpm audit:route /path` | Audits a local route for HTTP status, response time, object rendering, console errors, network errors, hydration warnings, and mobile overflow. |
| `pnpm validate:demo /demo/name` | Runs targeted demo validation: lint, typecheck, detected unit/E2E tests, build, and route audit. |
| `pnpm registry:recommend academy` | Generates a component recommendation report for a domain. |

## Helpers Added

| Helper | Default |
| --- | --- |
| `formatNumber` | `en-CA` |
| `formatCurrency` | `en-CA`, `CAD` |
| `formatDate` | `en-CA`, `UTC` |
| `formatRating` | one decimal, no grouping |

The default locale is `en-CA` because it produces stable ASCII output across Node and browsers. Components that intentionally need another locale can pass it explicitly.

## Registry Reinforced

- Added `ComponentRecommendationLevel`.
- Added `academy` as a supported domain.
- Added `recommendation-policy.ts`.
- Added `generateComponentRecommendationReport`.
- Added `AGENT_COMPONENT_RULES`.
- Added `artifacts/component-recommendations/academy.md`.

## Commands Available

```bash
pnpm demo:env
pnpm audit:route /demo/saas
pnpm validate:demo /demo/saas
pnpm registry:recommend academy
```

## Current Academy Status In This Repo

`/demo/academy` is not a route in the base `kv-web-starter` repo. Therefore:

- `pnpm registry:recommend academy` succeeds.
- `pnpm audit:route /demo/academy` correctly reports `404` and `FAIL`.
- `pnpm validate:demo /demo/academy` correctly reports the missing route and `FAIL`.

This sprint intentionally did not add the Academy demo route, because creating a full demo site was out of scope.

## Remaining Limits

P0: none.

P1:

- `/demo/academy` does not exist in the base repo, so Academy route validation fails until a future Academy demo is added.

P2:

- `validate:demo` depends on route-specific tests being named predictably.
- `audit:route` assumes a local server can run on the configured base URL.
- Component gaps are deterministic but still manually curated.

P3:

- Existing lint warnings remain outside this sprint.
- The local `.env.local` demo template can produce production-build security warnings if demo login is enabled during `next build`.
- Existing jsdom canvas warnings remain in the test output.

## Next Step

Demo Blueprint Manifests.

Blueprint manifests should describe a demo before generation starts: target domain, sections, registry recommendations, accepted gaps, required variables, expected tests, and audit criteria. That is the right next foundation before any Client-to-Prototype Engine.
