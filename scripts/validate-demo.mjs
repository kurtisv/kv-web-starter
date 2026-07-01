import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import { resolve } from "node:path";

const route = process.argv[2];
const baseUrl = process.env.PLAYWRIGHT_BASE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://127.0.0.1:3000";

if (!route || !route.startsWith("/")) {
  console.error("Usage: pnpm validate:demo /demo/name");
  process.exit(1);
}

function routeSlug(value) {
  return value.replace(/^\/+/, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "") || "home";
}

function demoName(value) {
  return value.split("/").filter(Boolean).at(-1) ?? "home";
}

function run(label, command, args, options = {}) {
  const started = Date.now();
  const result = spawnSync(command, args, {
    stdio: "pipe",
    shell: process.platform === "win32",
    encoding: "utf8",
    env: {
      ...process.env,
      AUTH_SECRET: process.env.AUTH_SECRET ?? "local-demo-build-secret-local-demo-build-secret",
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? baseUrl,
      PLAYWRIGHT_BASE_URL: baseUrl,
      ...options.env,
    },
  });

  return {
    label,
    command: [command, ...args].join(" "),
    status: result.status ?? 1,
    durationMs: Date.now() - started,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
  };
}

async function isServerReady(url) {
  try {
    const response = await fetch(url, { method: "GET" });
    return response.status > 0;
  } catch {
    return false;
  }
}

async function waitForServer(url) {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    if (await isServerReady(url)) return true;
    await new Promise((resolveWait) => setTimeout(resolveWait, 750));
  }
  return false;
}

function createCommand(command, args) {
  if (process.platform === "win32") {
    return { command: "cmd.exe", args: ["/c", command, ...args], shell: false };
  }
  return { command, args, shell: false };
}

function startServer() {
  const { command, args, shell } = createCommand("pnpm", ["--filter", "@kv/web", "start"]);
  return spawn(command, args, {
    cwd: process.cwd(),
    detached: false,
    windowsHide: true,
    stdio: "ignore",
    shell,
    env: {
      ...process.env,
      AUTH_SECRET: process.env.AUTH_SECRET ?? "local-demo-build-secret-local-demo-build-secret",
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? baseUrl,
      PLAYWRIGHT_BASE_URL: baseUrl,
    },
  });
}

function discoverUnitTests(name) {
  const demoDir = resolve(`apps/web/src/app/demo/${name}`);
  if (!existsSync(demoDir)) return [];

  const found = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = resolve(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      if (entry.isFile() && /\.test\.(ts|tsx)$/.test(entry.name)) found.push(full);
    }
  };
  walk(demoDir);
  return found;
}

const name = demoName(route);
const slug = routeSlug(route);
const reportLines = [`# Demo Validation`, "", `Route: ${route}`, `Base URL: ${baseUrl}`, ""];
const results = [];

results.push(run("lint", "pnpm", ["lint"]));
results.push(run("typecheck", "pnpm", ["typecheck"]));

const unitTests = discoverUnitTests(name);
if (unitTests.length > 0) {
  results.push(run("unit tests", "pnpm", ["--filter", "@kv/web", "test", "--", ...unitTests]));
} else {
  reportLines.push(`Unit tests: not found for ${route}`);
}

const e2ePath = `apps/web/tests/e2e/${name}.spec.ts`;
if (existsSync(e2ePath)) {
  results.push(run("e2e", "pnpm", ["--filter", "@kv/web", "test:e2e", "--", `tests/e2e/${name}.spec.ts`]));
} else {
  reportLines.push(`E2E tests: not found at ${e2ePath}`);
}

results.push(run("build", "pnpm", ["build"]));

let server = null;
const url = new URL(route, baseUrl).toString();
if (!(await isServerReady(baseUrl))) {
  server = startServer();
  const ready = await waitForServer(baseUrl);
  if (!ready) {
    results.push({
      label: "server",
      command: "pnpm --filter @kv/web start",
      status: 1,
      durationMs: 60_000,
      stdout: "",
      stderr: `Timed out waiting for ${baseUrl}`,
    });
  }
}

if (await isServerReady(baseUrl)) {
  results.push(run("audit route", "pnpm", ["audit:route", route]));
}

if (server) {
  server.kill();
}

reportLines.push("", "## Results", "");
for (const result of results) {
  reportLines.push(`- ${result.label}: ${result.status === 0 ? "OK" : "FAIL"} (${result.durationMs} ms)`);
}

reportLines.push("", "## Commands", "");
for (const result of results) {
  reportLines.push(`### ${result.label}`, "", "```txt", result.command, "```", "");
  if (result.status !== 0) {
    reportLines.push("Output:", "", "```txt", (result.stderr || result.stdout).trim().slice(-4000), "```", "");
  }
}

const ok = results.every((result) => result.status === 0);
reportLines.push(`Verdict: ${ok ? "OK" : "FAIL"}`, "");
reportLines.push(`Audited URL: ${url}`, "");

const outDir = resolve("artifacts/demo-validations");
mkdirSync(outDir, { recursive: true });
const outFile = resolve(outDir, `${slug}.md`);
writeFileSync(outFile, reportLines.join("\n"));

console.log(reportLines.join("\n"));
console.log(`Wrote ${outFile}`);

process.exit(ok ? 0 : 1);
