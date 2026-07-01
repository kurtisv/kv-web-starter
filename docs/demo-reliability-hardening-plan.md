# Demo Reliability Hardening Plan

Date: 2026-07-01
Branch: fix/demo-reliability-registry-hardening

## Context

The Demo Reliability Kit sprint added `pnpm demo:env`, `pnpm audit:route`, `pnpm validate:demo`,
`pnpm registry:recommend`, deterministic formatting helpers, and a prescriptive registry layer.
This hardening sprint addresses five issues found during the post-commit audit.

---

## Problems Observed

### P1 — validate-demo is Windows-only (Lot 1)

`scripts/validate-demo.mjs` calls `startServer()` which hardcodes `spawn("cmd.exe", ["/c", "pnpm
--filter @kv/web start"], ...)`. On macOS/Linux, `cmd.exe` does not exist, so the server never
starts, and the audit is skipped silently.

Affected line: validate-demo.mjs:65
`return spawn("cmd.exe", ["/c", "pnpm --filter @kv/web start"], {...})`

### P2 — validate-demo continues past build failure (Lot 2)

The build step is run at line 117: `results.push(run("build", "pnpm", ["build"]))`.
After build, the script unconditionally proceeds to start the server and run audit:route
even when build exited with status !== 0. This masks the real failure (build broken)
with secondary failures (server not ready, audit fails).

Affected lines: validate-demo.mjs:117-138 — no guard on build result before server start.

### P3 — audit-route imports Playwright via a fragile path (Lot 3)

`scripts/audit-route.mjs` line 34:
`await import("../apps/web/node_modules/@playwright/test/index.mjs")`

This path is an implementation detail of the pnpm workspace layout. It breaks when:
- Playwright is hoisted to the root node_modules
- The path doesn't exist on a fresh install
- The script is run from a different CWD

### P4 — registry "acceptable" is too broad (Lot 5)

`getComponentRecommendationLevel` in recommendation-policy.ts line 63:
```
if (!component.domains.includes(input.domain)) {
  return "acceptable";
}
```

This means ANY component that isn't in the target domain falls into "acceptable" —
including components designed for completely different domains (e.g., an
ecommerce ProductCard becoming "acceptable" for an academy report).
"acceptable" should mean "can be adapted with effort", not "doesn't fit the domain".

### P5 — No production maturity level (Lot 4)

`ComponentMaturity` = `"stable" | "beta" | "experimental" | "demo-only"`.
There is no way to mark a component as "guaranteed client-ready without reservation".
`stable` means "reliable" but not "formally validated for production".

---

## Risks

- Changing `getComponentRecommendationLevel` logic may affect existing tests. Tests must be updated.
- Adding `"production"` maturity is additive but the existing test at line 67 checks
  `recommended.every(c => c.maturity === "stable")` — must be updated to allow `"production"`.
- The Playwright fallback in audit-route must still produce a valid report when unavailable.
- validate-demo report format must remain readable after adding "Skipped Steps" section.

---

## Corrections Planned

| Lot | File | Fix |
|-----|------|-----|
| 1 | scripts/validate-demo.mjs | Cross-platform server spawn via createCommand() |
| 2 | scripts/validate-demo.mjs | Guard server start on build result |
| 3 | scripts/audit-route.mjs | Robust Playwright loading with fallback chain |
| 4 | types.ts, component-registry.ts, recommendation-policy.ts | Add "production" maturity |
| 5 | recommendation-policy.ts | Tighten acceptable: general=acceptable, out-of-domain=avoid |
| 6 | scripts/component-recommendation-report.ts | Executive summary + actionable sections |
| 7 | scripts/__tests__/ | Unit tests for script utility functions |
| 8 | docs/demo-reliability-hardening-report.md | Final report |

---

## Out of Scope

- No deployment, publish, or push without explicit request.
- No new demo pages or sites.
- No Client-to-Prototype Engine.
- No full registry rewrite (only targeted fixes).
- No external dependencies.
- No secret changes.
- No design changes.

---

## Validation Commands

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm audit:route /demo/saas
pnpm validate:demo /demo/saas
pnpm registry:recommend academy
```

Expected outcome: all pass, recommendation report is tighter, validate-demo works on macOS/Linux.
