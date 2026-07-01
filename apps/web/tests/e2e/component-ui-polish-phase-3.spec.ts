import { test, expect } from "@playwright/test";

const ROUTE = "/showcase/component-ui-polish-phase-3";

test.describe("/showcase/component-ui-polish-phase-3", () => {
  test("returns 200", async ({ page }) => {
    const response = await page.goto(ROUTE);
    expect(response?.status()).toBe(200);
  });

  test("page h1 is visible", async ({ page }) => {
    await page.goto(ROUTE);
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    const text = await h1.textContent();
    expect(text?.length).toBeGreaterThan(5);
  });

  test("dialog section is visible", async ({ page }) => {
    await page.goto(ROUTE);
    const section = page.getByTestId("dialog-phase3-section");
    await expect(section).toBeVisible();
  });

  test("sheet section is visible", async ({ page }) => {
    await page.goto(ROUTE);
    const section = page.getByTestId("sheet-phase3-section");
    await expect(section).toBeVisible();
  });

  test("booking form section is visible", async ({ page }) => {
    await page.goto(ROUTE);
    const section = page.getByTestId("booking-form-phase3-section");
    await expect(section).toBeVisible();
  });

  test("pricing section is visible", async ({ page }) => {
    await page.goto(ROUTE);
    const section = page.getByTestId("pricing-phase3-section");
    await expect(section).toBeVisible();
  });

  test("logo cloud section is visible", async ({ page }) => {
    await page.goto(ROUTE);
    const section = page.getByTestId("logo-cloud-phase3-section");
    await expect(section).toBeVisible();
  });

  test("a11y section is visible", async ({ page }) => {
    await page.goto(ROUTE);
    const section = page.getByTestId("a11y-phase3-section");
    await expect(section).toBeVisible();
  });

  test("no [object Object] on page", async ({ page }) => {
    await page.goto(ROUTE);
    const body = await page.locator("body").textContent();
    expect(body).not.toContain("[object Object]");
  });

  test("mobile 390px no horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(ROUTE);
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(scrollWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });
});
