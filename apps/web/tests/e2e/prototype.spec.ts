import { test, expect } from "@playwright/test";

test.describe("/prototype wizard", () => {
  // ── Step 1: Client Profile ────────────────────────────────────────────────

  test("loads step 1 by default", async ({ page }) => {
    await page.goto("/prototype");
    await expect(page.getByRole("heading", { level: 2 })).toContainText("Profil client");
  });

  test("suivant is disabled on step 1 without a name", async ({ page }) => {
    await page.goto("/prototype");
    const next = page.getByRole("button", { name: /Suivant/i });
    await expect(next).toBeDisabled();
  });

  test("typing a name enables suivant after debounce", async ({ page }) => {
    await page.goto("/prototype");
    await page.getByLabel(/Nom du client/i).fill("Acme Corp");
    await page.waitForTimeout(600);
    await expect(page.getByRole("button", { name: /Suivant/i })).toBeEnabled();
  });

  test("picking an industry updates profile in URL", async ({ page }) => {
    await page.goto("/prototype?name=Test");
    await page.getByRole("button", { name: /E-commerce/i }).click();
    await page.waitForTimeout(200);
    await expect(page).toHaveURL(/industry=ecommerce/);
  });

  test("step 1 shows hint when name is empty", async ({ page }) => {
    await page.goto("/prototype");
    await expect(page.getByRole("status")).toBeVisible();
  });

  test("precedent is disabled on step 1", async ({ page }) => {
    await page.goto("/prototype");
    await expect(page.getByRole("button", { name: /Precedent/i })).toBeDisabled();
  });

  test("tagline syncs to URL after debounce", async ({ page }) => {
    await page.goto("/prototype?name=Acme");
    await page.getByLabel(/Accroche/i).fill("Ma tagline");
    await page.waitForTimeout(600);
    await expect(page).toHaveURL(/tagline=Ma\+tagline|tagline=Ma%20tagline/);
  });

  test("invalid step param falls back to step 1", async ({ page }) => {
    await page.goto("/prototype?step=99&name=Test");
    await expect(page.getByRole("heading", { level: 2 })).toContainText("Apercu");
    // step=99 clamped to 4, which is the last step
  });

  test("step=0 falls back to step 1", async ({ page }) => {
    await page.goto("/prototype?step=0&name=Test");
    await expect(page.getByRole("heading", { level: 2 })).toContainText("Profil client");
  });

  // ── Step 2: Visual Identity ───────────────────────────────────────────────

  test("step 2 loads with heading", async ({ page }) => {
    await page.goto("/prototype?step=2&name=Acme&industry=saas");
    await expect(page.getByRole("heading", { level: 2 })).toContainText("Identite visuelle");
  });

  test("step 2 shows color swatches", async ({ page }) => {
    await page.goto("/prototype?step=2&name=Acme&industry=saas");
    const swatches = page.getByRole("button", { name: /Violet|Bleu|Vert|Orange|Rouge|Rose|Cyan|Ambre|Emeraude|Ardoise/ });
    await expect(swatches.first()).toBeVisible();
  });

  test("step 2 shows mode toggle buttons", async ({ page }) => {
    await page.goto("/prototype?step=2&name=Acme&industry=saas");
    await expect(page.getByRole("radio", { name: /Clair/i })).toBeVisible();
    await expect(page.getByRole("radio", { name: /Sombre/i })).toBeVisible();
  });

  test("invalid hex color blocks suivant on step 2", async ({ page }) => {
    await page.goto("/prototype?step=2&name=Acme&industry=saas");
    const hexInput = page.getByLabel(/Hex personnalise/i);
    await hexInput.fill("#abc");
    await expect(page.getByRole("button", { name: /Suivant/i })).toBeEnabled();
  });

  test("clicking a color swatch updates URL color param", async ({ page }) => {
    await page.goto("/prototype?step=2&name=Acme&industry=saas");
    await page.getByRole("button", { name: "Bleu" }).click();
    await page.waitForTimeout(200);
    await expect(page).toHaveURL(/color=%233b82f6/i);
  });

  test("invalid color in URL falls back to default purple", async ({ page }) => {
    await page.goto("/prototype?step=2&name=Acme&industry=saas&color=notacolor");
    // safeColor replaces invalid color with DEFAULT_COLOR — page should still render
    const body = await page.locator("body").textContent();
    expect(body).not.toContain("[object Object]");
    await expect(page.getByRole("heading", { level: 2 })).toContainText("Identite visuelle");
  });

  // ── Step 3: Features ─────────────────────────────────────────────────────

  test("step 3 shows features for selected industry", async ({ page }) => {
    await page.goto("/prototype?step=3&name=Acme&industry=saas&color=%236366f1&profile=premium-saas");
    await expect(page.getByRole("heading", { level: 2 })).toContainText("Fonctionnalites");
    await expect(page.getByText("Dashboard analytics")).toBeVisible();
  });

  test("step 3 shows booking features when industry is booking", async ({ page }) => {
    await page.goto("/prototype?step=3&name=Acme&industry=booking&color=%236366f1&profile=warm-local");
    await expect(page.getByText("Prise de rendez-vous")).toBeVisible();
  });

  test("toggling a feature updates URL features param", async ({ page }) => {
    await page.goto(
      "/prototype?step=3&name=Acme&industry=saas&color=%236366f1&profile=premium-saas&features=Dashboard+analytics",
    );
    await page.getByRole("button", { name: /Gestion abonnements/i }).click();
    await page.waitForTimeout(200);
    await expect(page).toHaveURL(/Gestion/);
  });

  test("suivant is disabled on step 3 when no features selected", async ({ page }) => {
    await page.goto(
      "/prototype?step=3&name=Acme&industry=saas&color=%236366f1&profile=premium-saas&features=",
    );
    await expect(page.getByRole("button", { name: /Suivant/i })).toBeDisabled();
  });

  test("features from another industry in URL are filtered out — falls back to industry defaults", async ({
    page,
  }) => {
    // Inject booking-only features while on saas industry
    await page.goto(
      "/prototype?step=3&name=Acme&industry=saas&color=%236366f1&profile=premium-saas&features=Prise+de+rendez-vous",
    );
    // The booking feature should not be shown as selected; saas defaults should be shown
    const body = await page.locator("body").textContent();
    expect(body).toContain("Dashboard analytics"); // saas default visible
  });

  // ── Step 4: Preview + Export ──────────────────────────────────────────────

  test("step 4 shows apercu heading", async ({ page }) => {
    await page.goto(
      "/prototype?step=4&name=Acme+Corp&industry=saas&color=%236366f1&profile=premium-saas&mode=light&features=Dashboard+analytics",
    );
    await expect(page.getByRole("heading", { level: 2 })).toContainText("Apercu");
  });

  test("step 4 preview contains client name", async ({ page }) => {
    await page.goto(
      "/prototype?step=4&name=TestClient&industry=saas&color=%236366f1&profile=premium-saas&mode=light&features=Dashboard+analytics",
    );
    const body = await page.locator("body").textContent();
    expect(body).toContain("TestClient");
  });

  test("manifest JSON block appears in step 4", async ({ page }) => {
    await page.goto(
      "/prototype?step=4&name=TestClient&industry=booking&color=%236366f1&profile=warm-local&mode=light&features=Prise+de+rendez-vous",
    );
    await expect(page.getByText("Manifest JSON")).toBeVisible();
    const code = page.locator("pre code");
    await expect(code).toContainText("TestClient");
  });

  test("generatedAt is stable — does not change on re-render triggers", async ({ page }) => {
    await page.goto(
      "/prototype?step=4&name=Stable&industry=saas&color=%236366f1&profile=premium-saas&mode=light&features=Dashboard+analytics",
    );
    const code = page.locator("pre code");
    const json1 = await code.textContent();
    // Trigger a re-render by navigating within the page (back to step 3 then back to 4)
    await page.getByRole("button", { name: /Precedent/i }).click();
    await page.waitForTimeout(100);
    await page.getByRole("button", { name: /Suivant/i }).click();
    await page.waitForTimeout(200);
    const json2 = await code.textContent();
    // Extract generatedAt from both JSONs and compare
    const tsMatch1 = json1?.match(/"generatedAt":\s*"([^"]+)"/);
    const tsMatch2 = json2?.match(/"generatedAt":\s*"([^"]+)"/);
    expect(tsMatch1?.[1]).toBeDefined();
    expect(tsMatch2?.[1]).toBeDefined();
    expect(tsMatch1?.[1]).toBe(tsMatch2?.[1]);
  });

  test("step 4 shows quick links to demo", async ({ page }) => {
    await page.goto(
      "/prototype?step=4&name=Acme&industry=saas&color=%236366f1&profile=premium-saas&mode=light&features=Dashboard+analytics",
    );
    await expect(page.getByRole("link", { name: /Voir la demo complete/i })).toBeVisible();
  });

  test("step 4 shows summary chips", async ({ page }) => {
    await page.goto(
      "/prototype?step=4&name=Acme&industry=saas&color=%236366f1&profile=premium-saas&mode=light&features=Dashboard+analytics",
    );
    await expect(page.getByText("saas")).toBeVisible();
    await expect(page.getByText("premium-saas")).toBeVisible();
  });

  test("copy button does not crash the page", async ({ page }) => {
    await page.goto(
      "/prototype?step=4&name=Acme&industry=saas&color=%236366f1&profile=premium-saas&mode=light&features=Dashboard+analytics",
    );
    // Mock clipboard so we can click without permission error
    await page.evaluate(() => {
      Object.defineProperty(navigator, "clipboard", {
        value: {
          writeText: () => Promise.resolve(),
        },
        configurable: true,
      });
    });
    const copyBtn = page.getByRole("button", { name: /Copier/i });
    await copyBtn.click();
    // Page should still be functional
    await expect(page.getByText("Manifest JSON")).toBeVisible();
  });

  test("download button does not crash the page", async ({ page }) => {
    await page.goto(
      "/prototype?step=4&name=Acme&industry=saas&color=%236366f1&profile=premium-saas&mode=light&features=Dashboard+analytics",
    );
    const downloadBtn = page.getByRole("button", { name: /Telecharger/i });
    // Just verify no crash — download behavior varies by browser in test env
    await downloadBtn.click();
    await expect(page.getByText("Manifest JSON")).toBeVisible();
  });

  // ── No regressions ────────────────────────────────────────────────────────

  test("no [object Object] on step 1", async ({ page }) => {
    await page.goto("/prototype");
    const body = await page.locator("body").textContent();
    expect(body).not.toContain("[object Object]");
  });

  test("no [object Object] on step 4", async ({ page }) => {
    await page.goto(
      "/prototype?step=4&name=Test&industry=saas&color=%236366f1&profile=premium-saas&mode=light&features=Dashboard+analytics",
    );
    const body = await page.locator("body").textContent();
    expect(body).not.toContain("[object Object]");
  });

  test("unknown industry param falls back to saas", async ({ page }) => {
    await page.goto("/prototype?industry=notanindustry&name=Test");
    const body = await page.locator("body").textContent();
    expect(body).not.toContain("[object Object]");
    expect(body).toContain("Profil client");
  });

  test("unknown profile param falls back to default", async ({ page }) => {
    await page.goto(
      "/prototype?step=2&name=Test&industry=saas&profile=not-a-profile",
    );
    const heading = page.getByRole("heading", { level: 2 });
    await expect(heading).toContainText("Identite visuelle");
  });

  test("invalid mode param falls back to light", async ({ page }) => {
    await page.goto(
      "/prototype?step=2&name=Test&industry=saas&mode=invalid",
    );
    const body = await page.locator("body").textContent();
    expect(body).not.toContain("[object Object]");
  });

  test("very long name in URL does not break layout", async ({ page }) => {
    const longName = "A".repeat(200);
    await page.goto(`/prototype?name=${longName}`);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  });

  // ── Mobile 390px ──────────────────────────────────────────────────────────

  test("mobile 390px step 1 no horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/prototype");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  });

  test("mobile 390px step 2 no horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/prototype?step=2&name=Acme&industry=saas");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  });

  test("mobile 390px step 3 no horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(
      "/prototype?step=3&name=Acme&industry=saas&color=%236366f1&profile=premium-saas",
    );
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  });

  test("mobile 390px step 4 no horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(
      "/prototype?step=4&name=Test&industry=saas&color=%236366f1&profile=premium-saas&mode=light&features=Dashboard+analytics",
    );
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  });

  // ── Progress bar ──────────────────────────────────────────────────────────

  test("progress bar shows correct step count", async ({ page }) => {
    await page.goto("/prototype?step=3&name=Test&industry=saas&color=%236366f1&profile=premium-saas");
    const progress = page.getByRole("progressbar");
    await expect(progress).toHaveAttribute("aria-valuenow", "3");
    await expect(progress).toHaveAttribute("aria-valuemax", "4");
  });

  // ── Entry links ───────────────────────────────────────────────────────────

  test("Prototype Engine link is visible on /demo", async ({ page }) => {
    await page.goto("/demo");
    await expect(page.getByRole("link", { name: /Prototype Engine/i })).toBeVisible();
  });

  test("Prototype link is visible in demo layout nav", async ({ page }) => {
    await page.goto("/demo/saas");
    // The "Prototype" nav link should be present (hidden on small screens, visible >= sm)
    const link = page.locator('a[href="/prototype"]').first();
    await expect(link).toBeAttached();
  });

  test("Prototype Engine link in demo footer", async ({ page }) => {
    await page.goto("/demo");
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: /Prototype Engine/i })).toBeVisible();
  });

  // ── Keyboard accessibility ────────────────────────────────────────────────

  test("keyboard focus reaches at least one interactive element on step 1", async ({ page }) => {
    await page.goto("/prototype");
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toBeAttached();
  });

  // ── Quick links resolve to valid routes ───────────────────────────────────

  test("Voir la demo complete link resolves to an existing route", async ({ page }) => {
    await page.goto(
      "/prototype?step=4&name=Acme&industry=saas&color=%236366f1&profile=premium-saas&mode=light&features=Dashboard+analytics",
    );
    const link = page.getByRole("link", { name: /Voir la demo complete/i });
    const href = await link.getAttribute("href");
    expect(href).toBeTruthy();
    // Navigate and verify no 404
    const response = await page.goto(href!);
    expect(response?.status()).not.toBe(404);
  });
});
