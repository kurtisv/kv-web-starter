import { test, expect } from "@playwright/test";

const ROUTE = "/showcase/component-ui-polish";

test.describe("/showcase/component-ui-polish", () => {
  test("returns 200", async ({ page }) => {
    const response = await page.goto(ROUTE);
    expect(response?.status()).toBe(200);
  });

  test("page title / h1 is visible", async ({ page }) => {
    await page.goto(ROUTE);
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    const text = await h1.textContent();
    expect(text?.length).toBeGreaterThan(5);
  });

  test("button section is visible", async ({ page }) => {
    await page.goto(ROUTE);
    const section = page.getByTestId("button-polish-section");
    await expect(section).toBeVisible();
    const buttons = section.locator("button");
    await expect(buttons.first()).toBeVisible();
  });

  test("card section is visible", async ({ page }) => {
    await page.goto(ROUTE);
    const section = page.getByTestId("card-polish-section");
    await expect(section).toBeVisible();
  });

  test("domain cards section is visible", async ({ page }) => {
    await page.goto(ROUTE);
    const section = page.getByTestId("domain-card-section");
    await expect(section).toBeVisible();
  });

  test("workflow states section is visible", async ({ page }) => {
    await page.goto(ROUTE);
    const section = page.getByTestId("workflow-states-section");
    await expect(section).toBeVisible();
  });

  test("marketing sections polish is visible", async ({ page }) => {
    await page.goto(ROUTE);
    const section = page.getByTestId("marketing-section-polish");
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

  test("at least one button can receive focus", async ({ page }) => {
    await page.goto(ROUTE);
    const btn = page.locator("button").first();
    await btn.focus();
    await expect(btn).toBeFocused();
  });
});
