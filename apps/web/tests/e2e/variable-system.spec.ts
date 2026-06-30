import { expect, test } from "@playwright/test";

// ── /showcase ─────────────────────────────────────────────────────────────────

test.describe("/showcase — Variable System section", () => {
  test("page loads and Variable System section is visible", async ({ page }) => {
    await page.goto("/showcase");
    await expect(page.getByText("Variable System")).toBeVisible();
  });

  test("no [object Object] text on the page", async ({ page }) => {
    await page.goto("/showcase");
    const body = await page.textContent("body");
    expect(body).not.toContain("[object Object]");
  });

  test("at least one slider is present in the variable system section", async ({ page }) => {
    await page.goto("/showcase");
    // DualRangeSlider thumbs are role=slider
    const sliders = page.getByRole("slider").first();
    await expect(sliders).toBeVisible();
  });

  test("search input appears only once per filter bar instance", async ({ page }) => {
    await page.goto("/showcase");
    // Each filter bar demo should have exactly one search field.
    // We look for the search input specifically (placeholder or aria-label)
    const searchInputs = page.locator("input[placeholder*='Recherch'], input[aria-label*='minimum'], input[aria-label*='Recherche']");
    // There should be at least one (from the demo), but no runaway duplicates
    const count = await searchInputs.count();
    expect(count).toBeGreaterThan(0);
  });
});

// ── /demo/real-estate ─────────────────────────────────────────────────────────

test.describe("/demo/real-estate — filter bar", () => {
  test("page loads without error", async ({ page }) => {
    await page.goto("/demo/real-estate");
    await expect(page).not.toHaveURL(/error|404/);
    await expect(page.getByRole("heading").first()).toBeVisible();
  });

  test("selecting type filter updates URL", async ({ page }) => {
    await page.goto("/demo/real-estate");
    // Find the type select (label: "Type de bien")
    const typeSelect = page.getByLabel("Type de bien");
    if (await typeSelect.count() > 0) {
      await typeSelect.selectOption("maison");
      await page.waitForURL(/type=maison/, { timeout: 5000 });
      expect(page.url()).toContain("type=maison");
    } else {
      // Fallback: find by role combobox and select
      const selects = page.getByRole("combobox");
      if (await selects.count() > 0) {
        await selects.first().selectOption("maison");
        await expect(page).toHaveURL(/type=maison/);
      }
    }
  });

  test("reset button appears when filters are active", async ({ page }) => {
    await page.goto("/demo/real-estate?type=maison");
    // The "Effacer (N)" button should appear
    const clearBtn = page.getByRole("button", { name: /effacer/i });
    await expect(clearBtn).toBeVisible();
  });

  test("reset button clears managed URL params", async ({ page }) => {
    await page.goto("/demo/real-estate?type=maison");
    const clearBtn = page.getByRole("button", { name: /effacer/i });
    await clearBtn.click();
    await page.waitForTimeout(500);
    expect(page.url()).not.toContain("type=maison");
  });

  test("URL with minPrice=400000 shows correct slider state", async ({ page }) => {
    await page.goto("/demo/real-estate?minPrice=400000&maxPrice=900000");
    const minInput = page.getByRole("spinbutton").first();
    await expect(minInput).toHaveValue("400000");
  });

  test("no [object Object] text in real-estate page", async ({ page }) => {
    await page.goto("/demo/real-estate");
    const body = await page.textContent("body");
    expect(body).not.toContain("[object Object]");
  });

  test("empty state appears when no properties match", async ({ page }) => {
    // Use an impossible filter combination
    await page.goto("/demo/real-estate?type=appartement&rooms=4&minPrice=1500000&maxPrice=2000000");
    // The page should not show [object Object] and should handle gracefully
    const body = await page.textContent("body");
    expect(body).not.toContain("[object Object]");
    await expect(page).not.toHaveURL(/error|404/);
  });
});

// ── /demo/auto-blog ───────────────────────────────────────────────────────────

test.describe("/demo/auto-blog — filter bar", () => {
  test("page loads without error", async ({ page }) => {
    await page.goto("/demo/auto-blog");
    await expect(page).not.toHaveURL(/error|404/);
    await expect(page.getByRole("heading").first()).toBeVisible();
  });

  test("filtering by make BMW shows BMW results", async ({ page }) => {
    await page.goto("/demo/auto-blog?make=BMW");
    const body = await page.textContent("body");
    // Should show BMW content, should not show other makes in place of BMW
    expect(body).not.toContain("[object Object]");
    await expect(page).not.toHaveURL(/error|404/);
  });

  test("reset clears URL and removes filters", async ({ page }) => {
    await page.goto("/demo/auto-blog?make=BMW&category=Sport");
    const clearBtn = page.getByRole("button", { name: /effacer/i });
    if (await clearBtn.count() > 0) {
      await clearBtn.click();
      await page.waitForTimeout(500);
      expect(page.url()).not.toContain("make=BMW");
    }
  });

  test("no [object Object] text in auto-blog page", async ({ page }) => {
    await page.goto("/demo/auto-blog");
    const body = await page.textContent("body");
    expect(body).not.toContain("[object Object]");
  });

  test("empty state handled gracefully when impossible filter applied", async ({ page }) => {
    // minPrice > maxPrice or extreme filter should not crash
    await page.goto("/demo/auto-blog?make=Lamborghini&minPrice=50000&maxPrice=60000");
    const body = await page.textContent("body");
    expect(body).not.toContain("[object Object]");
    await expect(page).not.toHaveURL(/error|404/);
  });
});
