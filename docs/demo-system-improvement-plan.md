# Demo System Improvement Plan

Date: 2026-07-01
Sprint: Local Demo Reliability Kit + Component Registry Action Layer

## Source Review

Required Academy stress-test files checked in this repo:

| File | Status |
| --- | --- |
| `docs/academy-demo-stress-test-report.md` | Missing |
| `artifacts/academy-demo/performance-notes.md` | Missing |
| `docs/academy-documentation-review.md` | Missing |
| `docs/academy-component-plan.md` | Missing |
| `docs/component-capability-registry.md` | Read |
| `docs/component-capability-registry-report.md` | Read |

The Academy-specific reports were produced in the local test clone, not in this base repo. This plan therefore uses the known Academy findings plus the current registry documentation as the sprint source of truth.

## Problems Found During SkillForge Academy

- A complete demo required manual coordination across docs, presets, mock data, variables, components, registry entries, tests, and reports.
- The registry described components, but did not yet provide a prescriptive action layer with `recommended`, `acceptable`, `avoid`, and `gap` decisions.
- The LMS/Academy domain had no first-class registry domain or stable domain component set.
- Local production validation required temporary shell environment variables and manual route audit steps.
- Formatting with locale-sensitive APIs can create server/client hydration mismatches.
- Performance and route audits were done with ad hoc scripts rather than a reusable command.

## Agent Irritants

- Agents must read many separate docs before understanding what can be safely reused.
- There is no single command that explains what components to use for a target domain.
- There is no machine-readable rule set for component selection.
- Gaps are not represented as first-class registry output, so agents may create new components too early.
- Demo-only and experimental maturity warnings are documented but not yet enforced by a recommendation policy.

## Test Irritants

- Running the full E2E suite is useful but expensive when iterating on one demo route.
- Targeted demo test discovery is manual.
- Route health checks, console checks, hydration warnings, object-rendering checks, and mobile overflow checks are spread across ad hoc E2E tests or temporary scripts.
- Build validation can fail from missing local env setup rather than code defects.

## Performance Irritants

- There is no standard local route audit artifact.
- Network errors, console warnings, hydration warnings, and mobile overflow are not summarized in one report.
- Existing demo pages may depend on external images, which can create noisy upstream failures in local E2E output.

## Sprint Priorities

1. Add a safe local demo environment template and documentation.
2. Add deterministic formatting helpers for demo-safe numbers, money, dates, and ratings.
3. Add `audit:route` for quick local route reliability checks.
4. Add `validate:demo` for targeted demo validation.
5. Add a prescriptive registry policy layer.
6. Add a component recommendation report command.
7. Add agent-safe component selection rules in docs and code.
8. Add a final reliability kit report with commands and limitations.

## Out Of Scope

- No deploy, publish, or push.
- No external service connection.
- No secret changes.
- No redesign.
- No Client-to-Prototype Engine.
- No full site generator.
- No automatic complete-site generation.
