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

// ---------------------------------------------------------------------------
// Index + HTTP smoke
// ---------------------------------------------------------------------------

test("demo index page lists all 10 project types", async ({ page }) => {
  await page.goto("/demo");
  await expect(page.getByRole("heading", { name: /10 styles/i })).toBeVisible();
  for (const { slug } of DEMO_PAGES) {
    await expect(page.locator(`a[href="/demo/${slug}"]`)).toBeVisible();
  }
  await expect(page.locator(`a[href="/demo/components"]`)).toBeVisible();
});

test("all demo pages return 200", async ({ request }) => {
  const paths = ["/demo", ...DEMO_PAGES.map((d) => `/demo/${d.slug}`), "/demo/components"];
  for (const path of paths) {
    const res = await request.get(path);
    expect(res.status(), `${path} should return 200`).toBe(200);
  }
});

// ---------------------------------------------------------------------------
// Per-page: theme attribute + main heading
// ---------------------------------------------------------------------------

for (const { slug, theme, heading } of DEMO_PAGES) {
  test(`/demo/${slug} — theme="${theme}" and heading visible`, async ({ page }) => {
    await page.goto(`/demo/${slug}`);
    await expect(page).not.toHaveURL(/error|404/);
    const themeWrapper = page.locator(`[data-theme="${theme}"]`).first();
    await expect(themeWrapper).toBeVisible();
    await expect(page.getByRole("heading", { name: heading }).first()).toBeVisible();
  });
}

// ---------------------------------------------------------------------------
// /demo/booking
// ---------------------------------------------------------------------------

test("/demo/booking — ServicePicker and StaffPicker visible", async ({ page }) => {
  await page.goto("/demo/booking");
  await expect(page.getByText("Massage relaxant").first()).toBeVisible();
  await expect(page.getByText("Massage therapeutique").first()).toBeVisible();
  await expect(page.getByText("StaffPicker").first()).toBeVisible();
  await expect(page.getByText("Sophie Bertin").first()).toBeVisible();
  await expect(page.getByText("Lucie Morel").first()).toBeVisible();
  await expect(page.getByText("Pierre Duval").first()).toBeVisible();
});

test("/demo/booking — BookingSummaryCard visible", async ({ page }) => {
  await page.goto("/demo/booking");
  await expect(page.getByText("BookingSummaryCard").first()).toBeVisible();
});

test("/demo/booking — CancelBookingDialog opens and closes", async ({ page }) => {
  await page.goto("/demo/booking");
  const cancelBtn = page.getByRole("button", { name: /annuler le rdv/i });
  await cancelBtn.scrollIntoViewIfNeeded();
  await expect(cancelBtn).toBeVisible();
  await cancelBtn.click();
  await expect(page.getByRole("alertdialog").or(page.getByRole("dialog"))).toBeVisible();
  await expect(page.getByText(/annuler.*r.servation|annulation/i).first()).toBeVisible();
  const closeBtn = page.getByRole("button", { name: /fermer|annuler|non/i }).first();
  await closeBtn.click();
  await expect(page.getByRole("alertdialog").or(page.getByRole("dialog"))).not.toBeVisible();
});

test("/demo/booking — RescheduleBookingDialog opens", async ({ page }) => {
  await page.goto("/demo/booking");
  const btn = page.getByRole("button", { name: /replanifier/i });
  await btn.scrollIntoViewIfNeeded();
  await expect(btn).toBeVisible();
  await btn.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByText(/replanifier|nouvelle date/i).first()).toBeVisible();
});

test("/demo/booking — service price cards visible", async ({ page }) => {
  await page.goto("/demo/booking");
  await expect(page.getByText("Nos services").first()).toBeVisible();
  await expect(page.getByText(/75\s*€|75€/i).first()).toBeVisible();
  await expect(page.getByText(/110\s*€|110€/i).first()).toBeVisible();
});

// ---------------------------------------------------------------------------
// /demo/saas
// ---------------------------------------------------------------------------

test("/demo/saas — SubscriptionStatusCard variants visible", async ({ page }) => {
  await page.goto("/demo/saas");
  await page.getByText("Composants SaaS inclus").scrollIntoViewIfNeeded();
  await expect(page.getByText("Composants SaaS inclus").first()).toBeVisible();
  await expect(page.getByText(/abonnement actif|actif/i).first()).toBeVisible();
  await expect(page.getByText(/essai|trialing|en cours d.essai/i).first()).toBeVisible();
  await expect(page.getByText(/paiement.chou|past.due/i).first()).toBeVisible();
});

test("/demo/saas — UsageQuotaCard bars visible", async ({ page }) => {
  await page.goto("/demo/saas");
  await expect(page.getByText("UsageQuotaCard").first()).toBeVisible();
  await expect(page.getByText(/requetes api/i).first()).toBeVisible();
  await expect(page.getByText(/stockage/i).first()).toBeVisible();
});

test("/demo/saas — PlanComparisonTable visible", async ({ page }) => {
  await page.goto("/demo/saas");
  await expect(page.getByText("PlanComparisonTable").first()).toBeVisible();
  await expect(page.getByText("Starter").first()).toBeVisible();
  await expect(page.getByText("Enterprise").first()).toBeVisible();
  await expect(page.getByText(/webhooks/i).first()).toBeVisible();
});

test("/demo/saas — PricingSection visible", async ({ page }) => {
  await page.goto("/demo/saas");
  await expect(page.getByText("49€").first()).toBeVisible();
});

// ---------------------------------------------------------------------------
// /demo/api
// ---------------------------------------------------------------------------

test("/demo/api — EndpointList and CodeTabsBlock visible", async ({ page }) => {
  await page.goto("/demo/api");
  await expect(page.getByText(/\/v1\/data/i).first()).toBeVisible();
  await expect(page.getByText("cURL").first()).toBeVisible();
});

test("/demo/api — ApiUsageChart and RateLimitMeter visible", async ({ page }) => {
  await page.goto("/demo/api");
  await expect(page.getByText("ApiUsageChart").first()).toBeVisible();
  await expect(page.getByText("RateLimitMeter").first()).toBeVisible();
  await expect(page.getByText(/Quota mensuel/i).first()).toBeVisible();
});

test("/demo/api — RequestLogViewer entries visible", async ({ page }) => {
  await page.goto("/demo/api");
  await expect(page.getByText("RequestLogViewer").first()).toBeVisible();
  await expect(page.getByText(/\/v1\/process/i).first()).toBeVisible();
  await expect(page.getByText("202").first()).toBeVisible();
});

test("/demo/api — WebhookTester send button visible", async ({ page }) => {
  await page.goto("/demo/api");
  await expect(page.getByText("WebhookTester").first()).toBeVisible();
  const sendBtn = page.getByRole("button", { name: /envoyer|send/i }).first();
  await sendBtn.scrollIntoViewIfNeeded();
  await expect(sendBtn).toBeVisible();
});

test("/demo/api — ScopePill and ApiKeyDisplay visible", async ({ page }) => {
  await page.goto("/demo/api");
  await expect(page.getByText(/data:read/i).first()).toBeVisible();
  await expect(page.getByText("ApiKeyDisplay").first()).toBeVisible();
});

// ---------------------------------------------------------------------------
// /demo/ecommerce
// ---------------------------------------------------------------------------

test("/demo/ecommerce — ProductCard grid visible", async ({ page }) => {
  await page.goto("/demo/ecommerce");
  await expect(page.getByText("Nos produits").first()).toBeVisible();
  await expect(page.getByText("Sac cuir premium").first()).toBeVisible();
  await expect(page.getByText("Montre minimaliste").first()).toBeVisible();
});

test("/demo/ecommerce — VariantSelector renders options", async ({ page }) => {
  await page.goto("/demo/ecommerce");
  await page.getByText("VariantSelector").scrollIntoViewIfNeeded();
  await expect(page.getByText("VariantSelector").first()).toBeVisible();
  await expect(page.getByRole("button", { name: /^Noir$/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /^Marron$/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /^M$/i })).toBeVisible();
});

test("/demo/ecommerce — VariantSelector selection changes state", async ({ page }) => {
  await page.goto("/demo/ecommerce");
  const btn = page.getByRole("button", { name: /^Noir$/i });
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
  await expect(btn).toHaveAttribute("aria-pressed", "true");
});

test("/demo/ecommerce — PromoCodeInput accepts valid code", async ({ page }) => {
  await page.goto("/demo/ecommerce");
  const input = page.getByPlaceholder(/code promo|promo code/i);
  await input.scrollIntoViewIfNeeded();
  await input.fill("ETE30");
  await page.getByRole("button", { name: /appliquer|apply/i }).click();
  await expect(page.getByText(/reduc|promo|appliqu|valid/i).first()).toBeVisible();
});

test("/demo/ecommerce — OrderStatusTimeline steps visible", async ({ page }) => {
  await page.goto("/demo/ecommerce");
  await expect(page.getByText("OrderStatusTimeline").first()).toBeVisible();
  await expect(page.getByText(/commande confirm/i).first()).toBeVisible();
  await expect(page.getByText(/expedi/i).first()).toBeVisible();
});

test("/demo/ecommerce — CustomerOrderTable rows visible", async ({ page }) => {
  await page.goto("/demo/ecommerce");
  await expect(page.getByText("CustomerOrderTable").first()).toBeVisible();
  await expect(page.getByText("#1042").first()).toBeVisible();
  await expect(page.getByText("#1039").first()).toBeVisible();
});

test("/demo/ecommerce — PriceDisplay and RatingStars visible", async ({ page }) => {
  await page.goto("/demo/ecommerce");
  await expect(page.getByText("PriceDisplay").first()).toBeVisible();
  await expect(page.getByText("RatingStars").first()).toBeVisible();
});

// ---------------------------------------------------------------------------
// /demo/dashboard
// ---------------------------------------------------------------------------

test("/demo/dashboard — MetricGrid values visible", async ({ page }) => {
  await page.goto("/demo/dashboard");
  await expect(page.getByText("MRR").first()).toBeVisible();
  await expect(page.getByText("24 890").first()).toBeVisible();
  await expect(page.getByText("Utilisateurs actifs").first()).toBeVisible();
  await expect(page.getByText("1 247").first()).toBeVisible();
});

test("/demo/dashboard — ActivityFeed visible", async ({ page }) => {
  await page.goto("/demo/dashboard");
  await expect(page.getByText(/activite recente/i).first()).toBeVisible();
  await expect(page.getByText(/Nouvel abonnement Pro/i).first()).toBeVisible();
});

test("/demo/dashboard — AuditLogTimeline visible", async ({ page }) => {
  await page.goto("/demo/dashboard");
  await page.getByText("AuditLogTimeline").scrollIntoViewIfNeeded();
  await expect(page.getByText("AuditLogTimeline").first()).toBeVisible();
  await expect(page.getByText(/Utilisateur supprim/i).first()).toBeVisible();
  await expect(page.getByText(/Permission modifi/i).first()).toBeVisible();
});

test("/demo/dashboard — EmptyDashboardState visible", async ({ page }) => {
  await page.goto("/demo/dashboard");
  await page.getByText("EmptyDashboardState").scrollIntoViewIfNeeded();
  await expect(page.getByText(/Aucun utilisateur/i).first()).toBeVisible();
  await expect(page.getByText(/Aucune commande/i).first()).toBeVisible();
});

test("/demo/dashboard — EntityDrawer opens and shows content", async ({ page }) => {
  await page.goto("/demo/dashboard");
  const btn = page.getByRole("button", { name: /voir un utilisateur/i });
  await btn.scrollIntoViewIfNeeded();
  await expect(btn).toBeVisible();
  await btn.click();
  await expect(page.getByText("Alice Dupont").first()).toBeVisible();
  await expect(page.getByText("alice@ex.com").first()).toBeVisible();
});

test("/demo/dashboard — ConfirmDialog opens", async ({ page }) => {
  await page.goto("/demo/dashboard");
  const btn = page.getByRole("button", { name: /supprimer un compte/i });
  await btn.scrollIntoViewIfNeeded();
  await expect(btn).toBeVisible();
  await btn.click();
  await expect(page.getByRole("alertdialog").or(page.getByRole("dialog"))).toBeVisible();
  await expect(page.getByText(/supprimer ce compte/i).first()).toBeVisible();
});

// ---------------------------------------------------------------------------
// /demo/real-estate
// ---------------------------------------------------------------------------

test("/demo/real-estate — PropertyCard grid visible", async ({ page }) => {
  await page.goto("/demo/real-estate");
  await expect(page.getByText("Biens disponibles").first()).toBeVisible();
  await expect(page.getByText("Paris 11e").first()).toBeVisible();
  await expect(page.getByText(/425 000/i).first()).toBeVisible();
  await expect(page.getByText("Boulogne-Billancourt").first()).toBeVisible();
  await expect(page.getByText(/890 000/i).first()).toBeVisible();
});

test("/demo/real-estate — PropertyCard status badges visible", async ({ page }) => {
  await page.goto("/demo/real-estate");
  await expect(page.getByText("Disponible").first()).toBeVisible();
  await expect(page.getByText("Sous compromis").first()).toBeVisible();
});

test("/demo/real-estate — MortgageCalculator visible with sliders", async ({ page }) => {
  await page.goto("/demo/real-estate");
  await page.getByText("Outils et conseillers").scrollIntoViewIfNeeded();
  await expect(page.getByText(/simulateur|calcul|mensualit/i).first()).toBeVisible();
  await expect(page.getByRole("slider").first()).toBeVisible();
});

test("/demo/real-estate — AgentProfileCard visible", async ({ page }) => {
  await page.goto("/demo/real-estate");
  await expect(page.getByText("Sophie Lefort").first()).toBeVisible();
  await expect(page.getByText("Marc Dubois").first()).toBeVisible();
});

// ---------------------------------------------------------------------------
// /demo/local-business
// ---------------------------------------------------------------------------

test("/demo/local-business — services grid visible", async ({ page }) => {
  await page.goto("/demo/local-business");
  await expect(page.getByText("Nos soins").first()).toBeVisible();
  await expect(page.getByText("Massage suedois").first()).toBeVisible();
  await expect(page.getByText("Massage aux pierres chaudes").first()).toBeVisible();
  await expect(page.getByText(/75€|75 €/i).first()).toBeVisible();
});

test("/demo/local-business — BusinessHours table visible", async ({ page }) => {
  await page.goto("/demo/local-business");
  await page.getByText("Horaires d'ouverture").scrollIntoViewIfNeeded();
  await expect(page.getByText(/horaires/i).first()).toBeVisible();
  await expect(page.getByText("Lundi").first()).toBeVisible();
  await expect(page.getByText("Samedi").first()).toBeVisible();
  await expect(page.getByText(/ferm/i).first()).toBeVisible();
});

test("/demo/local-business — phone CTA link visible", async ({ page }) => {
  await page.goto("/demo/local-business");
  const phoneLink = page.locator('a[href^="tel:"]');
  await phoneLink.scrollIntoViewIfNeeded();
  await expect(phoneLink).toBeVisible();
  await expect(phoneLink).toContainText(/appeler/i);
});

// ---------------------------------------------------------------------------
// /demo/portfolio
// ---------------------------------------------------------------------------

test("/demo/portfolio — SkillsGrid categories visible", async ({ page }) => {
  await page.goto("/demo/portfolio");
  await page.getByText("Competences").scrollIntoViewIfNeeded();
  await expect(page.getByText("Competences").first()).toBeVisible();
  await expect(page.getByText("Frontend").first()).toBeVisible();
  await expect(page.getByText("Backend").first()).toBeVisible();
  await expect(page.getByText("Infrastructure").first()).toBeVisible();
  await expect(page.getByText("TypeScript").first()).toBeVisible();
});

test("/demo/portfolio — Timeline experience items visible", async ({ page }) => {
  await page.goto("/demo/portfolio");
  await page.getByText("Parcours").scrollIntoViewIfNeeded();
  await expect(page.getByText("Parcours").first()).toBeVisible();
  await expect(page.getByText(/2024/i).first()).toBeVisible();
  await expect(page.getByText(/TechCo/i).first()).toBeVisible();
});

test("/demo/portfolio — ProjectShowcase visible", async ({ page }) => {
  await page.goto("/demo/portfolio");
  await expect(page.getByText("E-commerce Platform").first()).toBeVisible();
  await expect(page.getByText("SaaS Dashboard").first()).toBeVisible();
});

// ---------------------------------------------------------------------------
// /demo/auto-blog
// ---------------------------------------------------------------------------

test("/demo/auto-blog — car grid and FilterBar visible", async ({ page }) => {
  await page.goto("/demo/auto-blog");
  await expect(page.getByText("Fiches voitures").first()).toBeVisible();
  await expect(page.getByText(/Porsche|Ferrari|BMW|Aston|McLaren/i).first()).toBeVisible();
});

test("/demo/auto-blog — stats visible", async ({ page }) => {
  await page.goto("/demo/auto-blog");
  await expect(page.getByText(/420\+/i).first()).toBeVisible();
});

// ---------------------------------------------------------------------------
// Mobile viewport
// ---------------------------------------------------------------------------

const MOBILE_DEMOS = [
  "booking", "saas", "ecommerce", "real-estate", "dashboard", "portfolio", "local-business",
] as const;

for (const slug of MOBILE_DEMOS) {
  test(`/demo/${slug} — renders on mobile 390px without horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/demo/${slug}`);
    await expect(page).not.toHaveURL(/error|404/);
    await expect(page.getByRole("heading").first()).toBeVisible();
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth, `${slug} should not overflow at 390px`).toBeLessThanOrEqual(400);
  });
}

// ---------------------------------------------------------------------------
// /demo/components — component playground
// ---------------------------------------------------------------------------

test("/demo/components loads the component playground", async ({ page }) => {
  await page.goto("/demo/components");
  await expect(page.getByRole("heading", { name: /composants metier/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Dashboard/Admin" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "API portal" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "E-commerce" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "3D", exact: true })).toBeVisible();
});

test("/demo/components renders the 3D canvas on desktop and mobile", async ({ page }) => {
  for (const viewport of [
    { width: 1280, height: 900, name: "desktop" },
    { width: 390, height: 844, name: "mobile" },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/demo/components");

    const viewer = page.getByTestId("product-3d-viewer");
    const canvas = viewer.locator("canvas").first();

    await viewer.scrollIntoViewIfNeeded();
    await expect(viewer).toBeVisible();
    await expect(canvas).toBeVisible();
    await page.waitForTimeout(600);
    await page.waitForFunction(() => {
      const el = document.querySelector('[data-testid="product-3d-viewer"] canvas') as HTMLCanvasElement | null;
      if (!el || el.width === 0 || el.height === 0) return false;
      const w = Math.min(el.width, 80);
      const h = Math.min(el.height, 80);
      const copy = document.createElement("canvas");
      copy.width = w; copy.height = h;
      const ctx = copy.getContext("2d");
      if (!ctx) return false;
      ctx.drawImage(el, 0, 0, w, h);
      return ctx.getImageData(0, 0, w, h).data.some((v) => v > 0);
    });
    await viewer.screenshot({ path: `test-results/3d-${viewport.name}.png` });
  }
});
