# Demo Validation

Route: /demo/academy
Base URL: http://127.0.0.1:3000

Unit tests: not found for /demo/academy
E2E tests: not found at apps/web/tests/e2e/academy.spec.ts

## Results

- lint: OK (18714 ms)
- typecheck: OK (10230 ms)
- build: OK (54128 ms)
- audit route: FAIL (3917 ms)

## Commands

### lint

```txt
pnpm lint
```

### typecheck

```txt
pnpm typecheck
```

### build

```txt
pnpm build
```

### audit route

```txt
pnpm audit:route /demo/academy
```

Output:

```txt
> kv-web-starter@0.1.0 audit:route C:\code\kv-web-starter
> node scripts/audit-route.mjs "/demo/academy"

# Route Audit

Route: /demo/academy
URL: http://127.0.0.1:3000/demo/academy
Status: 404
Response time: 72 ms
Console errors: 1
Network errors: 0
Hydration warnings: 0
Object Object: false
Mobile overflow: false
Mobile overflow px: 0
Playwright: available
Verdict: FAIL

## Console Messages

- error: Failed to load resource: the server responded with a status of 404 (Not Found)

## Network Errors

- None

Wrote C:\code\kv-web-starter\artifacts\route-audits\demo-academy.md
[41m[30m ELIFECYCLE [39m[49m [31mCommand failed with exit code 1.[39m
```

Verdict: FAIL

Audited URL: http://127.0.0.1:3000/demo/academy
