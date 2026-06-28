import { expect, test } from "@playwright/test";

const DEMO_PAGES = [
  { slug: "portfolio",      theme: "corporate-classic", heading: /produits qui fonctionnent|collaboration/i },
  { slug: "saas",           theme: "premium-saas",      heading: /workflow|plateforme/i },
  { slug: "booking",        theme: "local-business",    heading: /bien.tre|relaxation|soin|prenez/i },
  { slug: "api",            theme: "dark-tech-api",     heading: /api|developer|portal/i },
  { slug: "real-estate",    theme: "real-estate",       heading: /immobilier|investissez/i },
  { slug: "local-business", theme: "local-business",    heading: /oasis|detente|soins/i },
  { slug: "auto-blog",      theme: "luxury-auto",       heading: /voiture|compromis|fiches/i },
  { slug: "ecommerce",      theme: "ecommerce-clean",   heading: /boutique|artisan|cuir|collection/i },
  { slug: "dashboard",      theme: "premium-saas",      heading: /vue d'ensemble|utilisateurs/i },
] as const;

test("demo index page lists all 10 project types", async ({ page }) => {
  await page.goto("/demo");
  await expect(page.getByRole("heading", { name: /10 styles/i })).toBeVisible();
  for (const { slug } of DEMO_PAGES) {
    await expect(page.locator(`a[href="/demo/${slug}"]`)).toBeVisible();
  }
  await expect(page.locator(`a[href="/demo/components"]`)).toBeVisible();
});

for (const { slug, theme, heading } of DEMO_PAGES) {
  test(`/demo/${slug} — loads with data-theme="${theme}"`, async ({ page }) => {
    await page.goto(`/demo/${slug}`);

    // No error page
    await expect(page).not.toHaveURL(/error|404/);

    // Theme attribute present on the top-level wrapper
    const themeWrapper = page.locator(`[data-theme="${theme}"]`).first();
    await expect(themeWrapper).toBeVisible();

    // Main heading visible
    await expect(page.getByRole("heading", { name: heading }).first()).toBeVisible();
  });
}

test("all demo pages return 200", async ({ request }) => {
  const paths = ["/demo", ...DEMO_PAGES.map((d) => `/demo/${d.slug}`), "/demo/components"];
  for (const path of paths) {
    const res = await request.get(path);
    expect(res.status(), `${path} should return 200`).toBe(200);
  }
});

test("/demo/components loads the component playground", async ({ page }) => {
  await page.goto("/demo/components");
  await expect(page.getByRole("heading", { name: /composants metier/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Dashboard/Admin" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "API portal" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "E-commerce" })).toBeVisible();
});
