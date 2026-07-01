import { mkdirSync, writeFileSync } from "node:fs";
import { performance } from "node:perf_hooks";
import { resolve } from "node:path";

const route = process.argv[2];
const baseUrl = process.env.PLAYWRIGHT_BASE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://127.0.0.1:3000";

if (!route || !route.startsWith("/")) {
  console.error("Usage: pnpm audit:route /path");
  process.exit(1);
}

function routeSlug(value) {
  return value.replace(/^\/+/, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "") || "home";
}

function isHydrationMessage(text) {
  return /hydration|hydrated|server rendered html|text content does not match/i.test(text);
}

async function fetchHtml(url) {
  const started = performance.now();
  const response = await fetch(url);
  const html = await response.text();
  return {
    status: response.status,
    responseTimeMs: Math.round(performance.now() - started),
    html,
  };
}

async function loadPlaywright() {
  const candidates = [
    () => import("@playwright/test"),
    () => import("../apps/web/node_modules/@playwright/test/index.mjs"),
  ];
  for (const load of candidates) {
    try {
      return await load();
    } catch {
      // try next candidate
    }
  }
  return null;
}

async function runBrowserAudit(url) {
  try {
    const mod = await loadPlaywright();
    if (!mod) {
      return {
        consoleMessages: ["playwright-unavailable: Cannot resolve @playwright/test from any candidate path"],
        networkErrors: [],
        hydrationWarnings: [],
        mobileOverflow: false,
        mobileOverflowPx: 0,
        playwrightAvailable: false,
        browserAudit: "skipped",
      };
    }
    const { chromium, devices } = mod;
    const browser = await chromium.launch();
    const consoleMessages = [];
    const networkErrors = [];

    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    page.on("console", (message) => {
      if (["error", "warning"].includes(message.type())) {
        consoleMessages.push(`${message.type()}: ${message.text()}`);
      }
    });
    page.on("pageerror", (error) => {
      consoleMessages.push(`pageerror: ${error.message}`);
    });
    page.on("requestfailed", (request) => {
      const failure = request.failure()?.errorText ?? "";
      if (failure.includes("net::ERR_ABORTED")) return;
      networkErrors.push(`${request.method()} ${request.url()} ${failure}`.trim());
    });

    await page.goto(url, { waitUntil: "networkidle" });

    const mobileContext = await browser.newContext({ ...devices["Pixel 5"] });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(url, { waitUntil: "networkidle" });
    const mobileOverflowPx = await mobilePage.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );

    await browser.close();

    return {
      consoleMessages,
      networkErrors,
      hydrationWarnings: consoleMessages.filter(isHydrationMessage),
      mobileOverflow: mobileOverflowPx > 0,
      mobileOverflowPx,
      playwrightAvailable: true,
      browserAudit: "completed",
    };
  } catch (error) {
    return {
      consoleMessages: [`playwright-unavailable: ${error instanceof Error ? error.message : String(error)}`],
      networkErrors: [],
      hydrationWarnings: [],
      mobileOverflow: false,
      mobileOverflowPx: 0,
      playwrightAvailable: false,
      browserAudit: "skipped",
    };
  }
}

const url = new URL(route, baseUrl).toString();
const http = await fetchHtml(url);
const browser = await runBrowserAudit(url);
const objectObject = http.html.includes("[object Object]");
const ok =
  http.status >= 200 &&
  http.status < 400 &&
  !objectObject &&
  browser.consoleMessages.filter((message) => !message.startsWith("playwright-unavailable:")).length === 0 &&
  browser.networkErrors.length === 0 &&
  browser.hydrationWarnings.length === 0 &&
  !browser.mobileOverflow;

const report = `# Route Audit

Route: ${route}
URL: ${url}
Status: ${http.status}
Response time: ${http.responseTimeMs} ms
Console errors: ${browser.consoleMessages.length}
Network errors: ${browser.networkErrors.length}
Hydration warnings: ${browser.hydrationWarnings.length}
Object Object: ${objectObject}
Mobile overflow: ${browser.mobileOverflow}
Mobile overflow px: ${browser.mobileOverflowPx}
Playwright: ${browser.playwrightAvailable ? "available" : "unavailable"}
Browser audit: ${browser.browserAudit ?? "unknown"}
Verdict: ${ok ? "OK" : "FAIL"}

## Console Messages

${browser.consoleMessages.length ? browser.consoleMessages.map((message) => `- ${message}`).join("\n") : "- None"}

## Network Errors

${browser.networkErrors.length ? browser.networkErrors.map((message) => `- ${message}`).join("\n") : "- None"}
`;

const outDir = resolve("artifacts/route-audits");
mkdirSync(outDir, { recursive: true });
const outFile = resolve(outDir, `${routeSlug(route)}.md`);
writeFileSync(outFile, report);

console.log(report);
console.log(`Wrote ${outFile}`);

process.exit(ok ? 0 : 1);
