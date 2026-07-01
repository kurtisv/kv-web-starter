import { test, expect } from "@playwright/test";

const DEMOS = [
  "/demo/saas",
  "/demo/booking",
  "/demo/ecommerce",
  "/demo/real-estate",
  "/demo/api",
  "/demo/dashboard",
  "/demo/portfolio",
  "/demo/local-business",
  "/demo/auto-blog",
  "/demo/design-lab",
];

test.describe("demo navigation", () => {
  test("/demo index loads", async ({ page }) => {
    await page.goto("/demo");
    await expect(page).toHaveTitle(/KV Web Starter/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("/demo index has no [object Object]", async ({ page }) => {
    await page.goto("/demo");
    const body = await page.locator("body").textContent();
    expect(body).not.toContain("[object Object]");
  });

  for (const route of DEMOS) {
    test(`${route} loads`, async ({ page }) => {
      await page.goto(route);
      // Any successful status (not a 404/500 page)
      await expect(page.locator("body")).toBeVisible();
      const body = await page.locator("body").textContent();
      expect(body).not.toContain("[object Object]");
    });

    test(`${route} has demo nav bar`, async ({ page }) => {
      await page.goto(route);
      // The sticky nav should contain a link back to /demo
      const demoLink = page.getByRole("link", { name: /Demos/i }).first();
      await expect(demoLink).toBeVisible();
    });

    test(`${route} has demo footer`, async ({ page }) => {
      await page.goto(route);
      // The footer has a "Galerie des demos" link
      const footer = page.locator("footer");
      await expect(footer).toBeVisible();
      await expect(footer.getByRole("link", { name: /Galerie des demos/i })).toBeVisible();
    });

    test(`${route} has home link in nav`, async ({ page }) => {
      await page.goto(route);
      const nav = page.locator("nav[aria-label='Navigation demos']");
      await expect(nav).toBeVisible();
      await expect(nav.getByRole("link", { name: /Accueil/i })).toBeVisible();
    });
  }

  test("demo nav Demo badge visible", async ({ page }) => {
    await page.goto("/demo/saas");
    await expect(page.getByText("Demo").first()).toBeVisible();
  });

  test("mobile 390px — /demo no overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/demo");
    const overflowPx = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflowPx).toBe(0);
  });

  test("mobile 390px — /demo/saas no overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/demo/saas");
    const overflowPx = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflowPx).toBe(0);
  });

  test("mobile 390px — /demo/booking no overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/demo/booking");
    const overflowPx = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflowPx).toBe(0);
  });

  test("a button can receive focus on /demo/saas", async ({ page }) => {
    await page.goto("/demo/saas");
    await page.keyboard.press("Tab");
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(["A", "BUTTON"]).toContain(focused);
  });
});
