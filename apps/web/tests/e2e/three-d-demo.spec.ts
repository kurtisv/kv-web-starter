import { expect, test, type Page } from "@playwright/test";

/**
 * E2E coverage for the 3D demo system routes.
 *
 * WebGL may be unavailable in the test environment (headless, CI, software
 * rendering): every scene assertion therefore accepts EITHER the live canvas
 * ([data-testid="three-d-canvas"]) OR the DOM fallback
 * ([data-testid="three-d-fallback"]). The pages are designed so all
 * information survives the fallback path.
 */

const ROUTES = [
  "/demo/3d",
  "/demo/3d/product-showroom",
  "/demo/3d/immersive-landing",
] as const;

const SCENE_OR_FALLBACK =
  '[data-testid="three-d-canvas"], [data-testid="three-d-fallback"]';

async function collectPageErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    // Benign in headless environments: WebGL fallback warnings, aborted
    // context creation, favicon 404s.
    if (/WebGL|GPU|swiftshader|favicon/i.test(text)) return;
    errors.push(`console: ${text}`);
  });
  return errors;
}

// ── 1-4. Every route loads with a visible heading ─────────────────────────────
for (const route of ROUTES) {
  test(`${route} loads with a visible h1`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("h1").first()).toBeVisible();
  });
}

// ── 5. Back navigation to /demo exists on every route ─────────────────────────
for (const route of ROUTES) {
  test(`${route} links back to /demo`, async ({ page }) => {
    await page.goto(route);
    const backLink = page.locator('a[href="/demo"]').first();
    await expect(backLink).toBeVisible();
  });
}

// ── 6. Canvas or fallback is visible on the two demos ─────────────────────────
for (const route of ROUTES.slice(1)) {
  test(`${route} shows the 3D scene or its fallback`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator(SCENE_OR_FALLBACK).first()).toBeVisible({
      timeout: 15_000,
    });
  });
}

// ── 7. No [object Object] anywhere ─────────────────────────────────────────────
for (const route of ROUTES) {
  test(`${route} renders no [object Object]`, async ({ page }) => {
    await page.goto(route);
    const body = await page.locator("body").innerText();
    expect(body).not.toContain("[object Object]");
  });
}

// ── 8. Mobile 390px: no horizontal overflow ───────────────────────────────────
for (const route of ROUTES) {
  test(`${route} has no horizontal overflow at 390px`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    const overflow = await page.evaluate(() => {
      const el = document.scrollingElement ?? document.documentElement;
      return el.scrollWidth - el.clientWidth;
    });
    expect(overflow, `scrollWidth exceeds viewport by ${overflow}px`).toBeLessThanOrEqual(1);
  });
}

// ── 9. Reduced motion does not break the pages ────────────────────────────────
for (const route of ROUTES) {
  test(`${route} works under prefers-reduced-motion`, async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(route);
    await expect(page.locator("h1").first()).toBeVisible();
    if (route !== "/demo/3d") {
      await expect(page.locator(SCENE_OR_FALLBACK).first()).toBeVisible({
        timeout: 15_000,
      });
    }
    await context.close();
  });
}

// ── 10. Primary CTA visible ────────────────────────────────────────────────────
test("product showroom shows the mock cart CTA", async ({ page }) => {
  await page.goto("/demo/3d/product-showroom");
  await expect(page.getByTestId("showroom-cta")).toBeVisible();
});

test("immersive landing shows its hero CTA", async ({ page }) => {
  await page.goto("/demo/3d/immersive-landing");
  await expect(
    page.getByRole("link", { name: /Explorer les capacites/i })
  ).toBeVisible();
});

// ── 11. Hotspots (DOM list is the accessible source of truth) ─────────────────
test("product showroom exposes the hotspot list", async ({ page }) => {
  await page.goto("/demo/3d/product-showroom");
  const list = page.getByTestId("product-hotspot-list");
  await expect(list).toBeVisible();
  await expect(list.locator("li")).toHaveCount(5);

  // Selecting a hotspot reveals its detail text.
  await list.locator("button").first().click();
  await expect(list.locator('button[aria-expanded="true"]')).toHaveCount(1);
});

// ── 12. Internal links from the gallery are valid ─────────────────────────────
test("gallery internal links respond", async ({ page, request }) => {
  // First-compile of each route on a cold dev server can take >10 s.
  test.setTimeout(120_000);
  await page.goto("/demo/3d");
  const hrefs = await page.$$eval('a[href^="/"]', (links) =>
    Array.from(new Set(links.map((a) => (a as HTMLAnchorElement).getAttribute("href") ?? "")))
  );
  expect(hrefs).toContain("/demo/3d/product-showroom");
  expect(hrefs).toContain("/demo/3d/immersive-landing");
  // Validate the 3D routes and the /demo back link (the mission scope);
  // the rest of the demo index is covered by demo-navigation.spec.ts.
  const toCheck = hrefs.filter((h) => h === "/demo" || h.startsWith("/demo/3d"));
  for (const href of toCheck) {
    const res = await request.get(href, { timeout: 60_000 });
    expect(res.status(), `${href} should respond OK`).toBeLessThan(400);
  }
});

// ── 13. No critical console/page errors on the demos ──────────────────────────
for (const route of ROUTES) {
  test(`${route} produces no critical console errors`, async ({ page }) => {
    const errors = await collectPageErrors(page);
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    expect(errors, errors.join("\n")).toHaveLength(0);
  });
}

// ── Bonus: configurator interaction keeps the page stable ─────────────────────
test("showroom configurator switches colour and material without errors", async ({
  page,
}) => {
  const errors = await collectPageErrors(page);
  await page.goto("/demo/3d/product-showroom");
  await page.getByRole("button", { name: "Couleur Bleu abysse" }).click();
  await page.getByRole("button", { name: /Ceramique/ }).click();
  await expect(page.getByTestId("showroom-cta")).toBeVisible();
  expect(errors, errors.join("\n")).toHaveLength(0);
});
