import { expect, test } from "@playwright/test";

test.describe("/demo/design-lab", () => {
  test("page loads and shows header", async ({ page }) => {
    await page.goto("/demo/design-lab");
    await expect(page).not.toHaveURL(/error|404/);
    await expect(page.getByRole("heading", { name: /Design Lab/i }).first()).toBeVisible();
  });

  test("returns 200", async ({ request }) => {
    const res = await request.get("/demo/design-lab");
    expect(res.status()).toBe(200);
  });

  test("shows intro gradient headline", async ({ page }) => {
    await page.goto("/demo/design-lab");
    await expect(page.getByText(/personnalite visuelle/i).first()).toBeVisible();
  });

  test("CSS utility showcase visible", async ({ page }) => {
    await page.goto("/demo/design-lab");
    await expect(page.getByText("Utilities CSS disponibles").first()).toBeVisible();
    await expect(page.getByText("soft-gradient").first()).toBeVisible();
    await expect(page.getByText("noise").first()).toBeVisible();
    await expect(page.getByText("grid lines").first()).toBeVisible();
    await expect(page.getByText("dark depth").first()).toBeVisible();
  });

  test("gradient text utilities visible", async ({ page }) => {
    await page.goto("/demo/design-lab");
    await expect(page.getByText("text-gradient-primary").first()).toBeVisible();
    await expect(page.getByText("text-gradient-editorial").first()).toBeVisible();
    await expect(page.getByText("card-glass").first()).toBeVisible();
  });

  test("profile cards section shows 10 profiles", async ({ page }) => {
    await page.goto("/demo/design-lab");
    await expect(page.getByText("10 profils visuels").first()).toBeVisible();
  });

  test("premium-saas profile card visible", async ({ page }) => {
    await page.goto("/demo/design-lab");
    await expect(page.getByText("Premium SaaS").first()).toBeVisible();
  });

  test("minimal-dashboard profile card visible", async ({ page }) => {
    await page.goto("/demo/design-lab");
    await expect(page.getByText("Minimal Dashboard").first()).toBeVisible();
  });

  test("premium UI components section visible", async ({ page }) => {
    await page.goto("/demo/design-lab");
    await expect(page.getByText("Composants UI premium").first()).toBeVisible();
    await expect(page.getByText("SpotlightCard").first()).toBeVisible();
    await expect(page.getByTestId("shimmer-badge-demo")).toBeVisible();
  });

  test("design recipes section visible", async ({ page }) => {
    await page.goto("/demo/design-lab");
    await expect(page.getByText("Design recipes").first()).toBeVisible();
    await expect(page.getByTestId("recipe-premium-saas")).toBeVisible();
    await expect(page.getByTestId("recipe-dark-api")).toBeVisible();
  });

  test("usage note section visible", async ({ page }) => {
    await page.goto("/demo/design-lab");
    await expect(page.getByText("Comment utiliser les profils").first()).toBeVisible();
  });

  test("back link to /demo present", async ({ page }) => {
    await page.goto("/demo/design-lab");
    const link = page.locator('a[href="/demo"]');
    await expect(link.first()).toBeVisible();
  });

  test("renders on mobile 390px without overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/demo/design-lab");
    await expect(page.getByRole("heading", { name: /Design Lab/i }).first()).toBeVisible();
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth, "design-lab should not overflow at 390px").toBeLessThanOrEqual(400);
  });
});
