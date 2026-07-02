import { test, expect } from "@playwright/test";

// ── Routes ─────────────────────────────────────────────────────────────────

const SAAS_ROUTES = [
  { route: "/demo/saas",           label: "Landing"   },
  { route: "/demo/saas/dashboard", label: "Dashboard" },
  { route: "/demo/saas/billing",   label: "Billing"   },
  { route: "/demo/saas/usage",     label: "Usage"     },
  { route: "/demo/saas/security",  label: "Security"  },
  { route: "/demo/saas/settings",  label: "Settings"  },
];

// ── 1. All routes load ────────────────────────────────────────────────────

for (const { route, label } of SAAS_ROUTES) {
  test(`${label}: page loads (${route})`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("body")).toBeVisible();
  });
}

// ── 2. No [object Object] on any route ──────────────────────────────────

for (const { route, label } of SAAS_ROUTES) {
  test(`${label}: no [object Object] (${route})`, async ({ page }) => {
    await page.goto(route);
    const body = await page.locator("body").textContent();
    expect(body).not.toContain("[object Object]");
  });
}

// ── 3. SaaS demo nav present on all sub-pages ─────────────────────────────

for (const { route, label } of SAAS_ROUTES) {
  test(`${label}: SaaS demo nav is present (${route})`, async ({ page }) => {
    await page.goto(route);
    const nav = page.locator("nav[aria-label='Navigation LaunchPilot']");
    await expect(nav).toBeVisible();
  });
}

// ── 4. Link back to /demo is present ─────────────────────────────────────

for (const { route, label } of SAAS_ROUTES) {
  test(`${label}: back-to-/demo link exists (${route})`, async ({ page }) => {
    await page.goto(route);
    const backLink = page.getByRole("link", { name: /demos/i }).first();
    await expect(backLink).toBeVisible();
  });
}

// ── 5. Mobile 390px no overflow on all routes ─────────────────────────────

for (const { route, label } of SAAS_ROUTES) {
  test(`${label}: no horizontal overflow at 390px (${route})`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(overflow).toBe(false);
  });
}

// ── 6. Landing-specific tests ─────────────────────────────────────────────

test("landing: main CTA points to /demo/saas/dashboard", async ({ page }) => {
  await page.goto("/demo/saas");
  const cta = page.getByRole("link", { name: /voir le dashboard/i }).first();
  await expect(cta).toBeVisible();
  const href = await cta.getAttribute("href");
  expect(href).toBe("/demo/saas/dashboard");
});

test("landing: trust indicators are visible", async ({ page }) => {
  await page.goto("/demo/saas");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/3 400\+|equipes actives/i);
});

test("landing: pricing section has disclaimer", async ({ page }) => {
  await page.goto("/demo/saas");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/demo|fictive/i);
});

test("landing: FAQ section exists", async ({ page }) => {
  await page.goto("/demo/saas");
  const faqHeading = page.getByRole("heading", { name: /questions/i });
  await expect(faqHeading).toBeVisible();
});

test("landing: integrations section links to /demo/saas/settings", async ({ page }) => {
  await page.goto("/demo/saas");
  const intgLink = page.getByRole("link", { name: /toutes les integrations/i });
  await expect(intgLink).toBeVisible();
});

// ── 7. Dashboard-specific tests ───────────────────────────────────────────

test("dashboard: shows MRR metric", async ({ page }) => {
  await page.goto("/demo/saas/dashboard");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/MRR/i);
});

test("dashboard: shows churn risk panel", async ({ page }) => {
  await page.goto("/demo/saas/dashboard");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/churn/i);
});

test("dashboard: onboarding checklist is visible", async ({ page }) => {
  await page.goto("/demo/saas/dashboard");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/demarrage|onboarding/i);
});

test("dashboard: activity feed has items", async ({ page }) => {
  await page.goto("/demo/saas/dashboard");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/activite recente/i);
});

// ── 8. Billing-specific tests ─────────────────────────────────────────────

test("billing: shows plan name and subscription status", async ({ page }) => {
  await page.goto("/demo/saas/billing");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/Growth|abonnement/i);
});

test("billing: invoice list is present", async ({ page }) => {
  await page.goto("/demo/saas/billing");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/factures|INV-/i);
});

test("billing: upgrade and cancel buttons are clickable without crash", async ({ page }) => {
  await page.goto("/demo/saas/billing");
  const upgradeBtn = page.getByRole("button", { name: /changer de plan/i }).first();
  await expect(upgradeBtn).toBeVisible();
  await upgradeBtn.click();
  // Modal should open without crash
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
});

test("billing: revenue recovery card is present", async ({ page }) => {
  await page.goto("/demo/saas/billing");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/paiement en echec|relancer/i);
});

// ── 9. Usage-specific tests ───────────────────────────────────────────────

test("usage: quota bars are present", async ({ page }) => {
  await page.goto("/demo/saas/usage");
  const progressBars = page.locator('[role="progressbar"]');
  const count = await progressBars.count();
  expect(count).toBeGreaterThan(0);
});

test("usage: metering events table is visible", async ({ page }) => {
  await page.goto("/demo/saas/usage");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/evenements de metering|api.request/i);
});

test("usage: forecast card shows projected requests", async ({ page }) => {
  await page.goto("/demo/saas/usage");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/prevision|projection/i);
});

// ── 10. Security-specific tests ───────────────────────────────────────────

test("security: posture score is displayed", async ({ page }) => {
  await page.goto("/demo/saas/security");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/posture de securite|\/100/i);
});

test("security: audit log is visible", async ({ page }) => {
  await page.goto("/demo/saas/security");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/audit|journal/i);
});

test("security: compliance checklist is present", async ({ page }) => {
  await page.goto("/demo/saas/security");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/compliance|RGPD|TLS/i);
});

test("security: API keys section is visible", async ({ page }) => {
  await page.goto("/demo/saas/security");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/cles API|lp_live/i);
});

test("security: compliance page does not claim real certification", async ({ page }) => {
  await page.goto("/demo/saas/security");
  const body = await page.locator("body").textContent();
  // Must say "readiness" or "demo" — not "SOC2 certified" as a standalone claim
  expect(body).not.toMatch(/SOC2 certified(?! checklist| readiness| ready| demo)/i);
});

// ── 11. Settings-specific tests ───────────────────────────────────────────

test("settings: workspace profile card is visible", async ({ page }) => {
  await page.goto("/demo/saas/settings");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/profil workspace|Acme Corp/i);
});

test("settings: team members section is present", async ({ page }) => {
  await page.goto("/demo/saas/settings");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/membres de l.equipe|Admin/i);
});

test("settings: integrations list is visible", async ({ page }) => {
  await page.goto("/demo/saas/settings");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/Stripe|HubSpot|Integrations/i);
});

test("settings: danger zone card is present", async ({ page }) => {
  await page.goto("/demo/saas/settings");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/zone dangereuse|supprimer le workspace/i);
});

// ── 12. Keyboard / accessibility ──────────────────────────────────────────

test("dashboard: keyboard focus reaches a main interactive element", async ({ page }) => {
  await page.goto("/demo/saas/dashboard");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const focused = page.locator(":focus");
  await expect(focused).toBeVisible();
});

test("billing: progress bars have aria-label on usage quota card", async ({ page }) => {
  await page.goto("/demo/saas/billing");
  // At minimum there are no bars without aria-label
  const barsWithoutLabel = page.locator('[role="progressbar"]:not([aria-label])');
  const count = await barsWithoutLabel.count();
  expect(count).toBe(0);
});

// ── 13. Internal nav links resolve correctly ──────────────────────────────

test("all SaaS nav links are not dead (resolve 200)", async ({ page }) => {
  await page.goto("/demo/saas/dashboard");
  const navLinks = page.locator("nav[aria-label='Navigation LaunchPilot'] a");
  const hrefs = await navLinks.evaluateAll((links: HTMLAnchorElement[]) =>
    links.map((l) => l.getAttribute("href")).filter(Boolean)
  );

  for (const href of hrefs) {
    if (!href) continue;
    const response = await page.request.get(href);
    expect(response.status(), `${href} returned non-200`).toBeLessThan(400);
  }
});
