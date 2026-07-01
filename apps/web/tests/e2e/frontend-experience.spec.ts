import { test, expect } from "@playwright/test";

test.describe("/showcase/frontend-experience", () => {
  test("returns 200", async ({ page }) => {
    const response = await page.goto("/showcase/frontend-experience");
    expect(response?.status()).toBe(200);
  });

  test("page title / h1 is visible", async ({ page }) => {
    await page.goto("/showcase/frontend-experience");
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    const text = await h1.textContent();
    expect(text?.length).toBeGreaterThan(5);
  });

  test("UI Quality Levels section is visible", async ({ page }) => {
    await page.goto("/showcase/frontend-experience");
    const section = page.getByTestId("ui-quality-levels-section");
    await expect(section).toBeVisible();
    await expect(section.locator("h2")).toContainText("UI Quality Levels");
  });

  test("Frontend Patterns section is visible", async ({ page }) => {
    await page.goto("/showcase/frontend-experience");
    const section = page.getByTestId("frontend-patterns-section");
    await expect(section).toBeVisible();
    await expect(section.locator("h2")).toContainText("Frontend Patterns");
  });

  test("Component Anatomy section is visible", async ({ page }) => {
    await page.goto("/showcase/frontend-experience");
    const section = page.getByTestId("component-anatomy-section");
    await expect(section).toBeVisible();
    await expect(section.locator("h2")).toContainText("Component Anatomy");
  });

  test("Workflow States section is visible", async ({ page }) => {
    await page.goto("/showcase/frontend-experience");
    const section = page.getByTestId("workflow-states-section");
    await expect(section).toBeVisible();
    await expect(section.locator("h2")).toContainText("Workflow States");
  });

  test("Agent Decision Flow section is visible", async ({ page }) => {
    await page.goto("/showcase/frontend-experience");
    const section = page.getByTestId("agent-decision-flow-section");
    await expect(section).toBeVisible();
    await expect(section.locator("h2")).toContainText("Agent Decision Flow");
  });

  test('no [object Object] on the page', async ({ page }) => {
    await page.goto("/showcase/frontend-experience");
    const body = await page.locator("body").textContent();
    expect(body).not.toContain("[object Object]");
  });

  test("mobile 390px no horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/showcase/frontend-experience");
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(scrollWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });

  test("at least one button or link can receive focus", async ({ page }) => {
    await page.goto("/showcase/frontend-experience");
    const focusable = page.locator("a[href], button").first();
    await focusable.focus();
    await expect(focusable).toBeFocused();
  });
});
