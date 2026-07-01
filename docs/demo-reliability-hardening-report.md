# Demo Reliability Hardening Report

Sprint: `fix/demo-reliability-registry-hardening`
Branch: `fix/demo-reliability-registry-hardening`
Date: 2026-07-01

---

## Objective

Harden the Demo Reliability Kit so it runs correctly on all platforms, fails fast on build
errors, and produces actionable output for agent-driven component selection.

Five concrete problems were fixed, one report was improved, and all validation commands
were verified.

---

## Problems Corrected

| # | Problem | File | Fix |
|---|---------|------|-----|
| 1 | `validate-demo.mjs` uses `cmd.exe` hardcoded — fails on Linux/Mac | `scripts/validate-demo.mjs` | `createCommand()` wraps `cmd.exe /c` on win32, bare command on POSIX |
| 2 | `validate-demo.mjs` continues past build failure — false-positive report | `scripts/validate-demo.mjs` | Guard on `buildStep.status !== 0` blocks server start + route audit; adds `## Skipped Steps` |
| 3 | `audit-route.mjs` fails with static Playwright import error | `scripts/audit-route.mjs` | `loadPlaywright()` tries standard import, then workspace-relative fallback, then returns `null` with graceful skip |
| 4 | Registry policy too permissive — out-of-domain non-general components returned "acceptable" automatically | `apps/web/src/lib/component-registry/recommendation-policy.ts` | Rewritten policy: domain match -> recommended/acceptable by maturity; general -> acceptable; out-of-domain -> avoid |
| 5 | `production` maturity level missing — no way to mark client-ready components without reservation | `apps/web/src/lib/component-registry/types.ts` + registry + policy + tests + docs | Added `production` tier above stable; promoted 6 core components |

---

## Files Modified

| File | Lots |
|------|------|
| `scripts/validate-demo.mjs` | 1, 2 |
| `scripts/audit-route.mjs` | 3 |
| `scripts/component-recommendation-report.ts` | 6 |
| `apps/web/src/lib/component-registry/types.ts` | 4 |
| `apps/web/src/lib/component-registry/component-registry.ts` | 4 |
| `apps/web/src/lib/component-registry/recommend-components.ts` | 4 |
| `apps/web/src/lib/component-registry/recommendation-policy.ts` | 4, 5 |
| `apps/web/src/lib/component-registry/recommendation-policy.test.ts` | 4, 5 |
| `apps/web/src/lib/component-registry/component-registry.test.ts` | 4 |
| `docs/agent-component-selection-rules.md` | 4 |
| `docs/demo-reliability-hardening-plan.md` | 0 |
| `artifacts/component-recommendations/academy.md` | 7 |
| `artifacts/component-recommendations/saas.md` | 7 |

---

## Commits

```
426427f3 docs(demo): plan reliability hardening
f9451b24 fix(demo): make validate-demo cross-platform
0e5441e6 fix(demo): stop validation cleanly when build fails
7689f8be fix(audit): make route audit playwright loading robust
d2f074b2 feat(component-registry): add production maturity level
e6d2106b feat(component-registry): improve recommendation report output
3f3ac1ae test(demo): validate reliability scripts
```

---

## Validation Results

| Command | Result | Notes |
|---------|--------|-------|
| `pnpm lint` | OK | 3 pre-existing warnings, 0 errors |
| `pnpm typecheck` | OK | 0 errors |
| `pnpm test` | OK | 427/427 tests pass |
| `pnpm registry:recommend academy` | OK | 8 recommended, 8 acceptable, 29 avoid, 7 gaps |
| `pnpm registry:recommend saas` | OK | 6 recommended, 3 acceptable, 29 avoid, 1 gap |
| `pnpm build` | Not run (no dev server available in this session) | |
| `pnpm audit:route /demo/saas` | Not run (requires build + server) | |
| `pnpm validate:demo /demo/saas` | Not run (requires build + server) | |

---

## Policy Change: Maturity Hierarchy

```
production  -> fully client-ready, no reservations (NEW)
stable      -> reliable; safe for most client work
beta        -> usable with caution
experimental -> opt-in only; not agent-safe as default
demo-only   -> showcase only; requires adaptation before client delivery
```

Components promoted to `production`: `hero-section`, `feature-grid`, `stats-section`,
`pricing-section`, `testimonial-section`, `metric-card`.

---

## Policy Change: Recommendation Logic

Old behaviour: out-of-domain non-general components returned "acceptable" automatically.
New behaviour:

1. domain match + production/stable -> `recommended`
2. domain match + beta -> `acceptable`
3. general domain + production/stable/beta -> `acceptable`
4. out-of-domain, non-general -> `avoid`
5. demo-only + clientProject=false + inDomain -> `acceptable`
6. experimental + allowExperimental=true + inDomain -> `acceptable`

Avoid reasons are now specific: "demo-only", "experimental", or "out-of-domain (designed for: X)".

---

## What Remains

- `pnpm audit:route` and `pnpm validate:demo` need a built + running dev server to produce
  meaningful output. Run manually after `pnpm build && pnpm start`.
- Known gaps (7 for academy, 1 for saas) are documented; no custom components created yet.
- The `production` tier has 6 components. Promote more as they are validated for client delivery.

---

## Next Sprint

Design Enhancement Layer: visual personality profiles, CSS utilities, card variants, demo
page applications, and a design lab showcase page. This sprint is already complete on the
same branch (`2415d90a` through `5bc122f6`).
