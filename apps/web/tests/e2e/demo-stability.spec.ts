import { test, expect } from "@playwright/test";

const ALL_DEMOS = [
  { route: "/demo",             name: "gallery" },
  { route: "/demo/saas",        name: "saas" },
  { route: "/demo/booking",     name: "booking" },
  { route: "/demo/ecommerce",   name: "ecommerce" },
  { route: "/demo/real-estate", name: "real-estate" },
  { route: "/demo/api",         name: "api" },
  { route: "/demo/dashboard",   name: "dashboard" },
  { route: "/demo/portfolio",   name: "portfolio" },
  { route: "/demo/local-business", name: "local-business" },
  { route: "/demo/auto-blog",   name: "auto-blog" },
  { route: "/demo/design-lab",  name: "design-lab" },
];

for (const { route, name } of ALL_DEMOS) {
  test.describe(`${route}`, () => {
    test("loads without [object Object]", async ({ page }) => {
      await page.goto(route);
      await expect(page.locator("body")).toBeVisible();
      const body = await page.locator("body").textContent();
      expect(body).not.toContain("[object Object]");
    });

    test("has a visible H1", async ({ page }) => {
      await page.goto(route);
      const h1 = page.getByRole("heading", { level: 1 }).first();
      await expect(h1).toBeVisible();
    });

    if (route !== "/demo") {
      test("has visible CTA button", async ({ page }) => {
        await page.goto(route);
        const buttons = page.getByRole("button").or(page.getByRole("link"));
        await expect(buttons.first()).toBeVisible();
      });
    }
  });
}

test.describe("stability — url filters", () => {
  test("/demo/real-estate filter does not overflow", async ({ page }) => {
    await page.goto("/demo/real-estate?type=maison");
    await expect(page.locator("body")).toBeVisible();
    const body = await page.locator("body").textContent();
    expect(body).not.toContain("[object Object]");
  });

  test("/demo/auto-blog filter does not overflow", async ({ page }) => {
    await page.goto("/demo/auto-blog?category=Sport");
    await expect(page.locator("body")).toBeVisible();
  });
});
