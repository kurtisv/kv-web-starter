import { test, expect } from "@playwright/test";

// ── Routes ─────────────────────────────────────────────────────────────────

const BOOKING_DEMO_ROUTES = [
  { route: "/demo/booking",           label: "Landing"    },
  { route: "/demo/booking/dashboard", label: "Dashboard"  },
  { route: "/demo/booking/calendar",  label: "Calendar"   },
  { route: "/demo/booking/services",  label: "Services"   },
  { route: "/demo/booking/clients",   label: "Clients"    },
  { route: "/demo/booking/payments",  label: "Payments"   },
  { route: "/demo/booking/settings",  label: "Settings"   },
];

// ── 1. All demo routes load ───────────────────────────────────────────────

for (const { route, label } of BOOKING_DEMO_ROUTES) {
  test(`${label}: page loads (${route})`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("body")).toBeVisible();
  });
}

// ── 2. /booking loads ─────────────────────────────────────────────────────

test("/booking: live booking flow loads", async ({ page }) => {
  await page.goto("/booking");
  await expect(page.locator("body")).toBeVisible();
});

// ── 3. /my-bookings loads ─────────────────────────────────────────────────

test("/my-bookings: client portal loads", async ({ page }) => {
  await page.goto("/my-bookings");
  await expect(page.locator("body")).toBeVisible();
});

// ── 4. No [object Object] on any demo route ──────────────────────────────

for (const { route, label } of BOOKING_DEMO_ROUTES) {
  test(`${label}: no [object Object] (${route})`, async ({ page }) => {
    await page.goto(route);
    const body = await page.locator("body").textContent();
    expect(body).not.toContain("[object Object]");
  });
}

// ── 5. Nav is present on all demo sub-routes ─────────────────────────────

for (const { route, label } of BOOKING_DEMO_ROUTES) {
  test(`${label}: BookingDemoNav is present (${route})`, async ({ page }) => {
    await page.goto(route);
    const nav = page.locator("nav[aria-label='Navigation ZenSlot']");
    await expect(nav).toBeVisible();
  });
}

// ── 6. Link back to /demo is present ─────────────────────────────────────

for (const { route, label } of BOOKING_DEMO_ROUTES) {
  test(`${label}: back-to-/demo link exists (${route})`, async ({ page }) => {
    await page.goto(route);
    const backLink = page.getByRole("link", { name: /demos/i }).first();
    await expect(backLink).toBeVisible();
  });
}

// ── 7. Internal nav links resolve ────────────────────────────────────────

test("all booking nav links resolve 2xx", async ({ page }) => {
  await page.goto("/demo/booking/dashboard");
  const navLinks = page.locator("nav[aria-label='Navigation ZenSlot'] a");
  const hrefs = await navLinks.evaluateAll((links: HTMLAnchorElement[]) =>
    links.map((l) => l.getAttribute("href")).filter(Boolean)
  );
  for (const href of hrefs) {
    if (!href || href.startsWith("http")) continue;
    const response = await page.request.get(href);
    expect(response.status(), `${href} returned non-2xx`).toBeLessThan(400);
  }
});

// ── 8. Mobile 390px no overflow ──────────────────────────────────────────

for (const { route, label } of BOOKING_DEMO_ROUTES) {
  test(`${label}: no horizontal overflow at 390px (${route})`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(overflow).toBe(false);
  });
}

// ── 9. Landing specific ───────────────────────────────────────────────────

test("landing: main CTA is visible", async ({ page }) => {
  await page.goto("/demo/booking");
  const cta = page.getByRole("link", { name: /essayer la reservation|essayer la demo|voir le dashboard/i }).first();
  await expect(cta).toBeVisible();
});

test("landing: stats/trust bar is visible", async ({ page }) => {
  await page.goto("/demo/booking");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/850\s*000|reservations gerees|taux de confirmation/i);
});

test("landing: FAQ section exists", async ({ page }) => {
  await page.goto("/demo/booking");
  const faq = page.getByRole("heading", { name: /questions/i });
  await expect(faq).toBeVisible();
});

test("landing: pricing section has demo disclaimer", async ({ page }) => {
  await page.goto("/demo/booking");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/demo|fictive/i);
});

test("landing: integrations section links to settings", async ({ page }) => {
  await page.goto("/demo/booking");
  const intgLink = page.getByRole("link", { name: /toutes les integrations/i });
  await expect(intgLink).toBeVisible();
});

// ── 10. Dashboard specific ────────────────────────────────────────────────

test("dashboard: shows revenue today metric", async ({ page }) => {
  await page.goto("/demo/booking/dashboard");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/revenu|EUR/i);
});

test("dashboard: shows appointments list", async ({ page }) => {
  await page.goto("/demo/booking/dashboard");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/rendez-vous d aujourd hui|Yoga|Pilates/i);
});

test("dashboard: shows activity feed", async ({ page }) => {
  await page.goto("/demo/booking/dashboard");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/activite recente/i);
});

test("dashboard: shows staff utilization", async ({ page }) => {
  await page.goto("/demo/booking/dashboard");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/utilisation du personnel/i);
});

// ── 11. Calendar specific ─────────────────────────────────────────────────

test("calendar: shows agenda/day view", async ({ page }) => {
  await page.goto("/demo/booking/calendar");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/calendrier|Yoga|Pilates|juillet/i);
});

test("calendar: shows resource availability panel", async ({ page }) => {
  await page.goto("/demo/booking/calendar");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/disponibilite des ressources|Salle Lotus|Reformer/i);
});

test("calendar: shows week strip", async ({ page }) => {
  await page.goto("/demo/booking/calendar");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/semaine|Lun|Mar|Mer/i);
});

// ── 12. Services specific ─────────────────────────────────────────────────

test("services: shows service list", async ({ page }) => {
  await page.goto("/demo/booking/services");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/services individuels|Pilates|Massage|Yoga/i);
});

test("services: shows classes and packages", async ({ page }) => {
  await page.goto("/demo/booking/services");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/classes|forfaits|abonnements/i);
});

test("services: shows gift cards", async ({ page }) => {
  await page.goto("/demo/booking/services");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/cartes cadeaux|SEREN-GIFT/i);
});

// ── 13. Clients specific ──────────────────────────────────────────────────

test("clients: shows client directory", async ({ page }) => {
  await page.goto("/demo/booking/clients");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/repertoire|Alice|Bernard|Isabelle/i);
});

test("clients: shows intake forms", async ({ page }) => {
  await page.goto("/demo/booking/clients");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/formulaires d.admission|Questionnaire/i);
});

test("clients: shows segment overview", async ({ page }) => {
  await page.goto("/demo/booking/clients");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/segmentation client|VIP|Regulier|Nouveau/i);
});

// ── 14. Payments specific ─────────────────────────────────────────────────

test("payments: shows no-show policy", async ({ page }) => {
  await page.goto("/demo/booking/payments");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/no-show|annulation|politique/i);
});

test("payments: shows waitlist", async ({ page }) => {
  await page.goto("/demo/booking/payments");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/liste d.attente/i);
});

test("payments: shows invoices", async ({ page }) => {
  await page.goto("/demo/booking/payments");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/factures|ZS-2026/i);
});

test("payments: shows no real Stripe key", async ({ page }) => {
  await page.goto("/demo/booking/payments");
  const body = await page.locator("body").textContent();
  expect(body).not.toMatch(/sk_live_|pk_live_/);
});

// ── 15. Settings specific ─────────────────────────────────────────────────

test("settings: shows business profile", async ({ page }) => {
  await page.goto("/demo/booking/settings");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/profil de l.etablissement|Seren Studio/i);
});

test("settings: shows reminder templates", async ({ page }) => {
  await page.goto("/demo/booking/settings");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/rappels automatiques|confirmation|Rappel/i);
});

test("settings: shows integrations", async ({ page }) => {
  await page.goto("/demo/booking/settings");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/integrations|Google Calendar|Stripe/i);
});

test("settings: shows roles and permissions", async ({ page }) => {
  await page.goto("/demo/booking/settings");
  const body = await page.locator("body").textContent();
  expect(body).toMatch(/roles|permissions|Administrateur/i);
});

// ── 16. Cancel/reschedule demo actions ───────────────────────────────────

test("landing: cancel dialog opens without crash", async ({ page }) => {
  await page.goto("/demo/booking");
  const cancelBtn = page.getByRole("button", { name: /annuler le rdv/i }).first();
  await expect(cancelBtn).toBeVisible();
  await cancelBtn.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
});

// ── 17. Keyboard accessibility ────────────────────────────────────────────

test("dashboard: keyboard focus reaches interactive element", async ({ page }) => {
  await page.goto("/demo/booking/dashboard");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const focused = page.locator(":focus");
  await expect(focused).toBeVisible();
});

// ── 18. Accessibility — progress bars ────────────────────────────────────

test("all progress bars on dashboard have aria-label", async ({ page }) => {
  await page.goto("/demo/booking/dashboard");
  const barsWithoutLabel = page.locator('[role="progressbar"]:not([aria-label])');
  const count = await barsWithoutLabel.count();
  expect(count).toBe(0);
});

// ── 19. /booking has link back to demo ───────────────────────────────────

test("/booking: has link back to /demo/booking", async ({ page }) => {
  await page.goto("/booking");
  const backLink = page.getByRole("link", { name: /demo zenslot/i });
  await expect(backLink).toBeVisible();
});

// ── 20. No fake medical/regulatory claim ─────────────────────────────────

test("settings: no unqualified HIPAA/SOC2 certified claim", async ({ page }) => {
  await page.goto("/demo/booking/settings");
  const body = await page.locator("body").textContent();
  expect(body).not.toMatch(/HIPAA certified|SOC2 certified(?! checklist| readiness| demo)/i);
});
