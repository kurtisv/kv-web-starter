import { expect, test } from "@playwright/test";

// Dev server is slower than production — per-test timeouts keep CI green.
const PAGE_TIMEOUT = 120_000;
const RENDER_TIMEOUT = 45_000;

// ── /showcase ─────────────────────────────────────────────────────────────────

test.describe("/showcase — Variable System section", () => {
  test("page loads", async ({ page }) => {
    test.setTimeout(PAGE_TIMEOUT);
    await page.goto("/showcase");
    await expect(page).not.toHaveURL(/error|404/);
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: RENDER_TIMEOUT });
  });

  test("Variable System section heading is present", async ({ page }) => {
    test.setTimeout(PAGE_TIMEOUT);
    await page.goto("/showcase");
    const headings = page.getByRole("heading", { name: /variable system/i });
    await expect(headings.first()).toBeVisible({ timeout: RENDER_TIMEOUT });
    expect(await headings.count()).toBeGreaterThan(0);
  });

  test("no [object Object] text on the page", async ({ page }) => {
    test.setTimeout(PAGE_TIMEOUT);
    await page.goto("/showcase");
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: RENDER_TIMEOUT });
    const body = await page.textContent("body");
    expect(body).not.toContain("[object Object]");
  });

  test("at least one slider thumb is visible", async ({ page }) => {
    test.setTimeout(PAGE_TIMEOUT);
    await page.goto("/showcase");
    await expect(page.getByRole("slider").first()).toBeVisible({ timeout: RENDER_TIMEOUT });
  });
});

// ── /demo/real-estate ─────────────────────────────────────────────────────────

test.describe("/demo/real-estate — filter bar", () => {
  test("page loads without error", async ({ page }) => {
    test.setTimeout(PAGE_TIMEOUT);
    await page.goto("/demo/real-estate");
    await expect(page).not.toHaveURL(/error|404/);
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: RENDER_TIMEOUT });
  });

  test("URL with type=maison shows reset button", async ({ page }) => {
    test.setTimeout(PAGE_TIMEOUT);
    await page.goto("/demo/real-estate?type=maison");
    const clearBtn = page.getByRole("button", { name: /effacer/i });
    await expect(clearBtn).toBeVisible({ timeout: RENDER_TIMEOUT });
  });

  test("reset button clears managed URL params", async ({ page }) => {
    test.setTimeout(PAGE_TIMEOUT);
    await page.goto("/demo/real-estate?type=maison");
    const clearBtn = page.getByRole("button", { name: /effacer/i });
    await expect(clearBtn).toBeVisible({ timeout: RENDER_TIMEOUT });
    await clearBtn.click();
    // url is a URL object in waitForURL predicates, use .href for string methods
    await page.waitForURL((url) => !url.href.includes("type=maison"), { timeout: 15_000 });
    expect(page.url()).not.toContain("type=maison");
  });

  test("URL with minPrice=400000 sets slider input", async ({ page }) => {
    test.setTimeout(PAGE_TIMEOUT);
    await page.goto("/demo/real-estate?minPrice=400000&maxPrice=900000");
    const spinbuttons = page.getByRole("spinbutton");
    await expect(spinbuttons.first()).toBeVisible({ timeout: RENDER_TIMEOUT });
    await expect(spinbuttons.first()).toHaveValue("400000", { timeout: 10_000 });
  });

  test("no [object Object] text in real-estate page", async ({ page }) => {
    test.setTimeout(PAGE_TIMEOUT);
    await page.goto("/demo/real-estate");
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: RENDER_TIMEOUT });
    const body = await page.textContent("body");
    expect(body).not.toContain("[object Object]");
  });

  test("empty state: impossible filter handled gracefully", async ({ page }) => {
    test.setTimeout(PAGE_TIMEOUT);
    await page.goto("/demo/real-estate?type=appartement&rooms=4&minPrice=1500000&maxPrice=2000000");
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: RENDER_TIMEOUT });
    const body = await page.textContent("body");
    expect(body).not.toContain("[object Object]");
    await expect(page).not.toHaveURL(/error|404/);
  });

  test("external URL params preserved after reset", async ({ page }) => {
    test.setTimeout(PAGE_TIMEOUT);
    await page.goto("/demo/real-estate?type=maison&tab=list");
    const clearBtn = page.getByRole("button", { name: /effacer/i });
    if (await clearBtn.isVisible({ timeout: RENDER_TIMEOUT })) {
      await clearBtn.click();
      await page.waitForURL((url) => !url.href.includes("type=maison"), { timeout: 15_000 });
      expect(page.url()).toContain("tab=list");
    }
  });
});

// ── /demo/auto-blog ───────────────────────────────────────────────────────────

test.describe("/demo/auto-blog — filter bar", () => {
  test("page loads without error", async ({ page }) => {
    test.setTimeout(PAGE_TIMEOUT);
    await page.goto("/demo/auto-blog");
    await expect(page).not.toHaveURL(/error|404/);
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: RENDER_TIMEOUT });
  });

  test("URL with make=BMW shows content without object Object", async ({ page }) => {
    test.setTimeout(PAGE_TIMEOUT);
    await page.goto("/demo/auto-blog?make=BMW");
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: RENDER_TIMEOUT });
    const body = await page.textContent("body");
    expect(body).not.toContain("[object Object]");
    await expect(page).not.toHaveURL(/error|404/);
  });

  test("reset button appears when make filter active", async ({ page }) => {
    test.setTimeout(PAGE_TIMEOUT);
    await page.goto("/demo/auto-blog?make=BMW");
    const clearBtn = page.getByRole("button", { name: /effacer/i });
    await expect(clearBtn).toBeVisible({ timeout: RENDER_TIMEOUT });
  });

  test("reset clears make from URL", async ({ page }) => {
    test.setTimeout(PAGE_TIMEOUT);
    await page.goto("/demo/auto-blog?make=BMW");
    const clearBtn = page.getByRole("button", { name: /effacer/i });
    await expect(clearBtn).toBeVisible({ timeout: RENDER_TIMEOUT });
    await clearBtn.click();
    await page.waitForURL((url) => !url.href.includes("make=BMW"), { timeout: 15_000 });
    expect(page.url()).not.toContain("make=BMW");
  });

  test("no [object Object] text in auto-blog page", async ({ page }) => {
    test.setTimeout(PAGE_TIMEOUT);
    await page.goto("/demo/auto-blog");
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: RENDER_TIMEOUT });
    const body = await page.textContent("body");
    expect(body).not.toContain("[object Object]");
  });

  test("empty state: narrow price filter handled gracefully", async ({ page }) => {
    test.setTimeout(PAGE_TIMEOUT);
    await page.goto("/demo/auto-blog?make=Lamborghini&minPrice=50000&maxPrice=60000");
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: RENDER_TIMEOUT });
    const body = await page.textContent("body");
    expect(body).not.toContain("[object Object]");
    await expect(page).not.toHaveURL(/error|404/);
  });
});
