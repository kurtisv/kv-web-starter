"use client";

import * as React from "react";

// UI primitives
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingState } from "@/components/ui/loading-state";

// Dashboard
import { MetricCard, MetricGrid } from "@/components/dashboard-ui/metric-card";
import { ActivityFeed } from "@/components/dashboard-ui/activity-feed";
import { StatusBadge } from "@/components/dashboard-ui/status-badge";
import { AuditLogTimeline } from "@/components/dashboard-ui/audit-log-timeline";
import { EmptyDashboardState } from "@/components/dashboard-ui/empty-dashboard-state";
import { ExportButton } from "@/components/dashboard-ui/export-button";
import { DateRangeFilter, type DateRangeValue } from "@/components/dashboard-ui/date-range-filter";
import { FilterBar, type FilterGroup } from "@/components/dashboard-ui/filter-bar";

// API Portal
import { HttpMethodBadge } from "@/components/api-portal/http-method-badge";
import { ScopeList } from "@/components/api-portal/scope-pill";
import { ApiUsageChart } from "@/components/api-portal/api-usage-chart";
import { RateLimitMeter } from "@/components/api-portal/rate-limit-meter";
import { EndpointRow } from "@/components/api-portal/endpoint-row";
import { CodeTabsBlock } from "@/components/api-portal/code-tabs-block";
import { ApiStatusCard } from "@/components/api-portal/api-status-card";
import { RequestLogViewer } from "@/components/api-portal/request-log-viewer";

// E-commerce
import { ProductCard, type ProductItem } from "@/components/ecommerce/product-card";
import { PriceDisplay } from "@/components/ecommerce/price-display";
import { RatingStars } from "@/components/ecommerce/rating-stars";
import { QuantityStepper } from "@/components/ecommerce/quantity-stepper";
import { VariantSelector } from "@/components/ecommerce/variant-selector";
import { PromoCodeInput } from "@/components/ecommerce/promo-code-input";
import { CheckoutSummary } from "@/components/ecommerce/checkout-summary";
import { OrderStatusTimeline } from "@/components/ecommerce/order-status-timeline";
import { CheckoutSteps } from "@/components/ecommerce/checkout-steps";

// SaaS
import { SubscriptionStatusCard } from "@/components/saas/subscription-status-card";
import { UsageQuotaCard } from "@/components/saas/usage-quota-card";
import { PlanComparisonTable } from "@/components/saas/plan-comparison-table";
import { InvoiceList } from "@/components/saas/invoice-list";

// Booking
import { ServicePicker } from "@/components/booking/service-picker";
import { BookingStatusTimeline } from "@/components/booking/booking-status-timeline";
import { BookingSummaryCard } from "@/components/booking/booking-summary-card";

// Sections
import { StatsSection } from "@/components/sections/stats-section";

// 3D (lazy — heavy, no SSR)
import dynamic from "next/dynamic";

const PhoneMockup3D = dynamic(
  () => import("@/components/3d").then((m) => ({ default: m.PhoneMockup3D })),
  { ssr: false, loading: () => <div className="aspect-video min-h-[260px] bg-muted/30 animate-pulse" /> }
);
const WebsiteShowcase3D = dynamic(
  () => import("@/components/3d").then((m) => ({ default: m.WebsiteShowcase3D })),
  { ssr: false, loading: () => <div className="aspect-video min-h-[260px] bg-muted/30 animate-pulse" /> }
);

// ── Category data ──────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "primitives", label: "UI Primitives", count: 37 },
  { id: "dashboard",  label: "Dashboard",     count: 14 },
  { id: "api",        label: "API Portal",    count: 13 },
  { id: "ecommerce",  label: "E-commerce",    count: 12 },
  { id: "saas",       label: "SaaS",          count: 5  },
  { id: "booking",    label: "Reservation",   count: 8  },
  { id: "sections",   label: "Sections",      count: 11 },
  { id: "threed",     label: "3D",            count: 10 },
] as const;

// ── Layout helpers ─────────────────────────────────────────────────────────────
function SectionHeader({
  id,
  label,
  count,
  description,
}: {
  id: string;
  label: string;
  count: number;
  description: string;
}) {
  return (
    <div id={id} className="flex scroll-mt-24 flex-col gap-1 border-b pb-6">
      <div className="flex items-baseline gap-3">
        <h2 className="text-2xl font-semibold tracking-tight">{label}</h2>
        <span className="rounded-full border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {count}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function ComponentCard({
  name,
  children,
  className = "",
  padded = true,
}: {
  name: string;
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-none border bg-card ${className}`}>
      <div className={`flex flex-1 items-center justify-center ${padded ? "p-5" : ""} min-h-[120px]`}>
        {children}
      </div>
      <div className="border-t bg-muted/40 px-3 py-2">
        <span className="font-mono text-[11px] text-muted-foreground">{name}</span>
      </div>
    </div>
  );
}

// ── Static fixtures ────────────────────────────────────────────────────────────
const DEMO_PRODUCTS: ProductItem[] = [
  { id: "p1", name: "Chaussure Air Max", priceCents: 14900, originalPriceCents: 18900, rating: 4.5, reviewCount: 128, badge: "Solde",   inStock: true },
  { id: "p2", name: "Sac cuir Milano",   priceCents: 29900, rating: 4.8, reviewCount: 64,  inStock: true },
  { id: "p3", name: "Montre Classique",  priceCents: 59900, originalPriceCents: 69900, rating: 4.2, reviewCount: 32, badge: "Nouveau", inStock: true },
];

const ORDER_STEPS = [
  { id: "paid",      label: "Payee",    description: "Paiement Stripe confirme." },
  { id: "packed",    label: "Preparee", description: "En cours d'emballage." },
  { id: "shipped",   label: "Expediee", description: "Numero de suivi cree." },
  { id: "delivered", label: "Livree",   description: "Reception confirmee." },
];

const REQUEST_LOGS = [
  { id: "r1", method: "GET"  as const, path: "/api/v1/users",    status: 200, durationMs: 42, createdAt: "il y a 2 min" },
  { id: "r2", method: "POST" as const, path: "/api/v1/sessions", status: 201, durationMs: 88, createdAt: "il y a 9 min" },
  { id: "r3", method: "GET"  as const, path: "/api/v1/private",  status: 403, durationMs: 19, createdAt: "il y a 14 min" },
];

const PLAN_FEATURES = [
  { label: "Utilisateurs",        starter: "3",      pro: "25",      enterprise: "Illimite" },
  { label: "Stockage",            starter: "5 Go",   pro: "100 Go",  enterprise: "1 To" },
  { label: "API calls / mois",    starter: "10 000", pro: "500 000", enterprise: "Illimite" },
  { label: "Support prioritaire", starter: false,    pro: true,      enterprise: true },
  { label: "SSO SAML",            starter: false,    pro: false,     enterprise: true },
];

const SERVICES = [
  { id: "s1", name: "Consultation initiale", durationMin: 30, priceCents: 0,    description: "Premier RDV gratuit" },
  { id: "s2", name: "Coupe et coiffure",     durationMin: 60, priceCents: 6500, description: "Coupe + brushing" },
];

const FILTER_GROUPS: FilterGroup[] = [
  { key: "status", label: "Statut", options: [{ value: "actif", label: "Actif" }, { value: "inactif", label: "Inactif" }] },
  { key: "plan",   label: "Plan",   options: [{ value: "starter", label: "Starter" }, { value: "pro", label: "Pro" }] },
];

// ── Main component ─────────────────────────────────────────────────────────────
export function ShowcaseClient() {
  const [dateRange, setDateRange] = React.useState<DateRangeValue>({ from: "2026-06-01", to: "2026-06-30" });
  const [qty,       setQty]       = React.useState(1);
  const [colorVar,  setColorVar]  = React.useState("noir");
  const [switchOn,  setSwitchOn]  = React.useState(true);
  const [activeNav, setActiveNav] = React.useState("primitives");
  const [activeTab, setActiveTab] = React.useState("vue");

  // Observe active section for nav highlight
  React.useEffect(() => {
    const ids = CATEGORIES.map((c) => c.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveNav(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="theme-hero border-b">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Badge className="mb-5 border-background/20 bg-background/10 text-background">
            Showcase
          </Badge>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
            130+ composants.{" "}
            <span className="opacity-60">Copiez. Collez. Livrez.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 opacity-70">
            Chaque bloc est production-ready, thematisable et isole. UI primitifs,
            dashboard, API portal, e-commerce, SaaS, reservation et 3D&mdash;tout
            dans un seul starter.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <span
                key={cat.id}
                className="rounded-full border border-background/20 bg-background/10 px-3 py-1 text-xs font-medium text-background"
              >
                {cat.label}
                <span className="ml-1.5 opacity-60">{cat.count}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sticky nav ── */}
      <nav className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex gap-0 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                onClick={() => setActiveNav(cat.id)}
                className={[
                  "flex shrink-0 items-center gap-1.5 border-b-2 px-4 py-3.5 text-sm font-medium transition-colors",
                  activeNav === cat.id
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {cat.label}
                <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                  {cat.count}
                </span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl space-y-16 px-6 py-14">

        {/* ════════════════════════════════════════════════
            UI PRIMITIVES
        ════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <SectionHeader
            id="primitives"
            label="UI Primitives"
            count={37}
            description="Composants atomiques. La base de tout le reste."
          />

          {/* Buttons */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Button</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {(["default","secondary","outline","ghost","destructive","link"] as const).map((v) => (
                <ComponentCard key={v} name={`variant="${v}"`}>
                  <Button variant={v} size="sm">Bouton</Button>
                </ComponentCard>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Badge</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {(["default","soft","outline","success","warning","destructive"] as const).map((v) => (
                <ComponentCard key={v} name={`variant="${v}"`}>
                  <Badge variant={v}>Badge</Badge>
                </ComponentCard>
              ))}
            </div>
          </div>

          {/* Mixed primitives grid */}
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            <ComponentCard name="Input">
              <Input placeholder="Rechercher..." className="w-full max-w-[200px]" />
            </ComponentCard>

            <ComponentCard name="Textarea">
              <Textarea placeholder="Votre message..." className="w-full max-w-[200px] text-xs" rows={3} />
            </ComponentCard>

            <ComponentCard name="Select">
              <Select
                value="fr"
                options={[
                  { value: "fr", label: "Francais" },
                  { value: "en", label: "English" },
                  { value: "es", label: "Espanol" },
                ]}
                className="w-[160px]"
              />
            </ComponentCard>

            <ComponentCard name="Switch">
              <div className="flex flex-col items-center gap-2">
                <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
                <span className="text-xs text-muted-foreground">
                  {switchOn ? "Active" : "Inactif"}
                </span>
              </div>
            </ComponentCard>

            <ComponentCard name="Avatar">
              <div className="flex gap-2">
                {["Alice L.", "Marc B.", "Sara R.", "KV"].map((name) => (
                  <Avatar key={name} name={name} size="sm" />
                ))}
              </div>
            </ComponentCard>

            <ComponentCard name="Checkbox">
              <div className="flex flex-col gap-2">
                {["Newsletter", "Notifications", "Historique"].map((l) => (
                  <div key={l} className="flex items-center gap-2">
                    <Checkbox id={l} defaultChecked={l === "Newsletter"} />
                    <Label htmlFor={l} className="text-xs">{l}</Label>
                  </div>
                ))}
              </div>
            </ComponentCard>

            <ComponentCard name="Tabs">
              <div className="w-[200px]">
                <Tabs>
                  <TabsList>
                    {["vue", "code", "docs"].map((t) => (
                      <TabsTrigger
                        key={t}
                        className={activeTab === t ? "bg-background text-foreground" : ""}
                        onClick={() => setActiveTab(t)}
                      >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <TabsContent>
                    <p className="text-xs text-muted-foreground">Contenu : {activeTab}</p>
                  </TabsContent>
                </Tabs>
              </div>
            </ComponentCard>

            <ComponentCard name="Accordion">
              <Accordion className="w-[200px]">
                <AccordionItem>
                  <AccordionTrigger>FAQ #1</AccordionTrigger>
                  <AccordionContent>
                    <p className="px-5 pb-4 text-xs text-muted-foreground">Reponse developpee ici.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem>
                  <AccordionTrigger>FAQ #2</AccordionTrigger>
                  <AccordionContent>
                    <p className="px-5 pb-4 text-xs text-muted-foreground">Autre reponse detaillee.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ComponentCard>

            <ComponentCard name="Card">
              <Card className="w-[200px]">
                <CardHeader className="p-3">
                  <CardTitle className="text-sm">Titre</CardTitle>
                  <CardDescription className="text-xs">Description courte</CardDescription>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <p className="text-xs text-muted-foreground">Contenu flexible.</p>
                </CardContent>
              </Card>
            </ComponentCard>

            <ComponentCard name="EmptyState">
              <EmptyState
                title="Aucun resultat"
                description="Ajustez les filtres."
                className="py-4"
              />
            </ComponentCard>

            <ComponentCard name="LoadingState">
              <LoadingState text="Chargement..." size="sm" />
            </ComponentCard>

            <ComponentCard name="Button sizes">
              <div className="flex flex-col items-center gap-2">
                {(["lg", "default", "sm"] as const).map((s) => (
                  <Button key={s} size={s} variant="outline" className="text-xs">
                    size=&quot;{s}&quot;
                  </Button>
                ))}
              </div>
            </ComponentCard>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            DASHBOARD
        ════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <SectionHeader
            id="dashboard"
            label="Dashboard"
            count={14}
            description="Metriques, activite, filtres, timelines et drawers pour interfaces admin."
          />

          <MetricGrid>
            <MetricCard
              label="Revenus"
              value="84 320 $"
              description="30 derniers jours"
              trend={{ value: "+12.4% vs mois precedent", direction: "up" }}
            />
            <MetricCard
              label="Utilisateurs"
              value="2 841"
              description="Comptes actifs"
              trend={{ value: "+8.1%", direction: "up" }}
            />
            <MetricCard
              label="Taux de retour"
              value="3.2%"
              description="Commandes remboursees"
              trend={{ value: "-0.5%", direction: "down" }}
            />
            <MetricCard
              label="ARPU"
              value="29.67 $"
              description="Revenu par utilisateur"
              trend={{ value: "Stable", direction: "neutral" }}
            />
          </MetricGrid>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <ComponentCard name="StatusBadge">
              <div className="flex flex-wrap justify-center gap-2">
                {["actif", "en attente", "annule", "confirme", "brouillon", "trialing"].map((s) => (
                  <StatusBadge key={s} status={s} />
                ))}
              </div>
            </ComponentCard>

            <ComponentCard name="ActivityFeed" padded={false}>
              <div className="w-full p-4">
                <ActivityFeed
                  items={[
                    { id: "1", message: "Nouvel abonnement Pro",      timestamp: "il y a 2 min",  variant: "success" },
                    { id: "2", message: "Quota API a 90%",            timestamp: "il y a 18 min", variant: "warning" },
                    { id: "3", message: "Webhook /orders livre",       timestamp: "il y a 1 h",    variant: "default" },
                    { id: "4", message: "Paiement echoue: CLI_4892",  timestamp: "il y a 3 h",    variant: "destructive" },
                  ]}
                />
              </div>
            </ComponentCard>

            <ComponentCard name="AuditLogTimeline" padded={false}>
              <div className="w-full p-4">
                <AuditLogTimeline
                  items={[
                    { id: "a1", action: "Service modifie",      actor: "Admin",   createdAt: "Aujourd'hui 09:12", variant: "success" },
                    { id: "a2", action: "Utilisateur supprime", actor: "Admin",   createdAt: "Hier 16:40",        variant: "warning" },
                    { id: "a3", action: "Export genere",        actor: "Systeme", createdAt: "Hier 08:00",        variant: "info" },
                  ]}
                />
              </div>
            </ComponentCard>

            <ComponentCard name="DateRangeFilter" padded={false}>
              <div className="w-full p-4">
                <DateRangeFilter value={dateRange} onChange={setDateRange} />
              </div>
            </ComponentCard>

            <ComponentCard name="FilterBar" padded={false}>
              <div className="w-full p-4">
                <React.Suspense fallback={<div className="h-12 animate-pulse rounded bg-muted/30" />}>
                  <FilterBar filters={FILTER_GROUPS} />
                </React.Suspense>
              </div>
            </ComponentCard>

            <ComponentCard name="ExportButton">
              <ExportButton
                data={[
                  { id: "u1", nom: "Alice D.", plan: "Pro",     statut: "Actif" },
                  { id: "u2", nom: "Marc T.",  plan: "Starter", statut: "Essai" },
                ]}
                filename="utilisateurs"
              />
            </ComponentCard>

            <ComponentCard name="EmptyDashboardState">
              <EmptyDashboardState
                title="Aucun projet"
                description="Cree ton premier projet pour commencer."
                actionLabel="Nouveau projet"
                onAction={() => {}}
              />
            </ComponentCard>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            API PORTAL
        ════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <SectionHeader
            id="api"
            label="API Portal"
            count={13}
            description="Cles, endpoints, usage, logs et webhooks pour developpeurs."
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <ComponentCard name="HttpMethodBadge">
              <div className="flex flex-col gap-2">
                {["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => (
                  <div key={m} className="flex items-center gap-3">
                    <HttpMethodBadge method={m} />
                    <span className="font-mono text-xs text-muted-foreground">/api/v1/resource</span>
                  </div>
                ))}
              </div>
            </ComponentCard>

            <ComponentCard name="ScopeList">
              <ScopeList scopes={["read:users", "write:orders", "admin:billing"]} />
            </ComponentCard>

            <ComponentCard name="ApiUsageChart" padded={false}>
              <div className="w-full p-4">
                <ApiUsageChart
                  data={[
                    { label: "Lun", calls: 140 },
                    { label: "Mar", calls: 280 },
                    { label: "Mer", calls: 210 },
                    { label: "Jeu", calls: 390 },
                    { label: "Ven", calls: 320 },
                    { label: "Sam", calls: 180 },
                    { label: "Dim", calls: 95  },
                  ]}
                />
              </div>
            </ComponentCard>

            <ComponentCard name="RateLimitMeter" padded={false}>
              <div className="w-full p-4 space-y-3">
                <RateLimitMeter used={7400} limit={10000} />
                <RateLimitMeter used={2200} limit={10000} />
                <RateLimitMeter used={9800} limit={10000} />
              </div>
            </ComponentCard>

            <ComponentCard name="RequestLogViewer" padded={false}>
              <div className="w-full p-4">
                <RequestLogViewer entries={REQUEST_LOGS} />
              </div>
            </ComponentCard>

            <ComponentCard name="ApiStatusCard" padded={false}>
              <div className="w-full p-4">
                <ApiStatusCard
                  overallStatus="operational"
                  services={[
                    { name: "API REST",         status: "operational", uptimePct: 99.98 },
                    { name: "Webhooks",         status: "degraded",    uptimePct: 98.21 },
                    { name: "Auth",             status: "operational", uptimePct: 99.99 },
                  ]}
                />
              </div>
            </ComponentCard>
          </div>

          <div className="space-y-1">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">EndpointRow</p>
            {[
              { method: "GET",    path: "/api/v1/users",        auth: true,  description: "Liste tous les utilisateurs" },
              { method: "POST",   path: "/api/v1/users",        auth: true,  description: "Creer un utilisateur" },
              { method: "GET",    path: "/api/v1/products",     auth: false, description: "Catalogue public" },
              { method: "PATCH",  path: "/api/v1/users/:id",    auth: true,  description: "Mettre a jour un profil" },
              { method: "DELETE", path: "/api/v1/sessions/:id", auth: true,  description: "Revoquer une session" },
            ].map((ep) => (
              <EndpointRow key={ep.method + ep.path} {...ep} />
            ))}
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">CodeTabsBlock</p>
            <CodeTabsBlock
              tabs={[
                {
                  label: "cURL",
                  language: "curl",
                  code: `curl -X GET https://api.exemple.com/v1/users \\\n  -H "Authorization: Bearer sk_live_..." \\\n  -H "Content-Type: application/json"`,
                },
                {
                  label: "JavaScript",
                  language: "javascript",
                  code: `const res = await fetch('https://api.exemple.com/v1/users', {\n  headers: { Authorization: 'Bearer sk_live_...' },\n});\nconst data = await res.json();`,
                },
                {
                  label: "Python",
                  language: "python",
                  code: `import requests\nr = requests.get(\n    "https://api.exemple.com/v1/users",\n    headers={"Authorization": "Bearer sk_live_..."},\n)\ndata = r.json()`,
                },
              ]}
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            E-COMMERCE
        ════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <SectionHeader
            id="ecommerce"
            label="E-commerce"
            count={12}
            description="Produits, panier, variantes, promo, checkout et suivi de commande."
          />

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">ProductCard</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DEMO_PRODUCTS.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={() => {}} />
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <ComponentCard name="PriceDisplay">
              <div className="flex flex-col items-center gap-2">
                <PriceDisplay priceCents={14900} originalPriceCents={18900} size="lg" />
                <PriceDisplay priceCents={29900} size="md" />
                <PriceDisplay priceCents={0} size="sm" />
              </div>
            </ComponentCard>

            <ComponentCard name="RatingStars">
              <div className="flex flex-col items-center gap-2">
                {[5, 4.5, 4, 3.5, 3].map((r) => (
                  <RatingStars key={r} rating={r} reviewCount={Math.round(r * 28)} size="sm" />
                ))}
              </div>
            </ComponentCard>

            <ComponentCard name="QuantityStepper">
              <QuantityStepper value={qty} onChange={setQty} min={1} max={10} />
            </ComponentCard>

            <ComponentCard name="VariantSelector" padded={false}>
              <div className="w-full p-4">
                <VariantSelector
                  label="Couleur"
                  value={colorVar}
                  onChange={setColorVar}
                  options={[
                    { value: "noir",   label: "Noir",   swatch: "#111827" },
                    { value: "cognac", label: "Cognac", swatch: "#b45309" },
                    { value: "marine", label: "Marine", swatch: "#1e3a8a" },
                    { value: "rouge",  label: "Rouge",  swatch: "#dc2626" },
                  ]}
                />
              </div>
            </ComponentCard>

            <ComponentCard name="PromoCodeInput" padded={false}>
              <div className="w-full p-4">
                <PromoCodeInput
                  onApply={(code) => code.toUpperCase() === "WELCOME10"}
                />
              </div>
            </ComponentCard>

            <ComponentCard name="CheckoutSteps" padded={false}>
              <div className="w-full p-4">
                <CheckoutSteps currentStep={2} />
              </div>
            </ComponentCard>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">CheckoutSummary</p>
              <CheckoutSummary subtotalCents={14900} shippingCents={1200} taxCents={2400} discountCents={1490} />
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">OrderStatusTimeline</p>
              <OrderStatusTimeline steps={ORDER_STEPS} currentStep="shipped" />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SAAS
        ════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <SectionHeader
            id="saas"
            label="SaaS & Abonnements"
            count={5}
            description="Statut abo, quotas, plans, factures et modals d'upgrade."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SubscriptionStatusCard
              plan="Pro"
              status="active"
              renewalDate="2026-08-01"
              onUpgrade={() => {}}
              onCancel={() => {}}
            />
            <SubscriptionStatusCard
              plan="Starter"
              status="trialing"
              trialEndsAt="2026-07-14"
              onUpgrade={() => {}}
            />
            <UsageQuotaCard
              items={[
                { label: "API calls", used: 74000, limit: 100000, unit: "req" },
                { label: "Stockage",  used: 3.2,   limit: 5,      unit: "Go"  },
                { label: "Membres",   used: 8,      limit: 10,     unit: "users" },
              ]}
            />
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">PlanComparisonTable</p>
            <PlanComparisonTable features={PLAN_FEATURES} onSelect={() => {}} />
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">InvoiceList</p>
            <InvoiceList
              invoices={[
                { id: "i1", number: "INV-2026-006", date: "2026-06-01", amountCents: 4900, status: "paid",  plan: "Pro" },
                { id: "i2", number: "INV-2026-005", date: "2026-05-01", amountCents: 4900, status: "paid",  plan: "Pro" },
                { id: "i3", number: "INV-2026-004", date: "2026-04-01", amountCents: 1900, status: "open",  plan: "Starter" },
              ]}
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            BOOKING
        ════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <SectionHeader
            id="booking"
            label="Reservation"
            count={8}
            description="Choix de service, creneaux, resume et suivi de rendez-vous."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">ServicePicker</p>
              <ServicePicker services={SERVICES} selectedId="s2" formId="demo-booking-form" />
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">BookingSummaryCard</p>
              <BookingSummaryCard
                service={{ id: "s2", name: "Coupe et coiffure", durationMin: 60, priceCents: 6500, description: "Coupe + brushing" }}
                staff={{ id: "st1", name: "Marie Lambert", role: "Coiffeuse Senior" }}
                date="2026-07-15"
              />
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">BookingStatusTimeline</p>
              <BookingStatusTimeline status="reminded" />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTIONS DE PAGE
        ════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <SectionHeader
            id="sections"
            label="Sections de page"
            count={11}
            description="Hero, feature grid, pricing, testimonials, stats, CTA, FAQ, logo cloud."
          />
          <p className="text-sm text-muted-foreground">
            Chaque section est auto-animee, responsive et thematisable. Exemple StatsSection ci-dessous:
          </p>
        </section>
      </div>

      {/* Stats section — full bleed */}
      <StatsSection
        variant="dark"
        stats={[
          { value: "130+",  label: "Composants",   description: "Production-ready, zero config" },
          { value: "8",     label: "Categories",    description: "UI, Dashboard, API, E-comm..." },
          { value: "100%",  label: "TypeScript",    description: "Types stricts partout" },
          { value: "< 1 j", label: "Time-to-ship",  description: "De zero a production" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "HeroSection",         desc: "Gradient adaptatif, headline, CTA dual, badge" },
            { name: "FeatureGrid",         desc: "Icons, titres, descriptions en grille" },
            { name: "PricingSection",      desc: "Plans tarifaires, toggle mensuel/annuel" },
            { name: "TestimonialSection",  desc: "Carousel, avatars, etoiles, citations" },
            { name: "CtaSection",          desc: "Appel a l'action final avec gradient" },
            { name: "FaqSection",          desc: "Accordion groupes, schema FAQ SEO" },
            { name: "LogoCloud",           desc: "Grille partenaires avec animation" },
            { name: "ProjectShowcase",     desc: "Portfolio avec images et metadata" },
            { name: "ContactSection",      desc: "Formulaire, map embed, reseaux" },
            { name: "VideoHeroSection",    desc: "Video autoplay, overlays, CTA" },
          ].map((s) => (
            <div key={s.name} className="flex items-start gap-3 rounded-none border bg-card p-4">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border bg-muted/60">
                <span className="text-[10px] font-bold text-primary">S</span>
              </div>
              <div>
                <p className="font-mono text-sm font-semibold">{s.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ════════════════════════════════════════════════
            3D
        ════════════════════════════════════════════════ */}
        <section className="mt-16 space-y-8">
          <SectionHeader
            id="threed"
            label="3D"
            count={10}
            description="Scenes R3F avec GLB reel, fallback procedural et degradation mobile automatique."
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                PhoneMockup3D — iPhone 15 Pro GLB
              </p>
              <PhoneMockup3D />
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                WebsiteShowcase3D — MacBook Draco GLB
              </p>
              <WebsiteShowcase3D />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Smart3DObject",      desc: "Cascade GLB -> procedural -> CSS" },
              { name: "GlbSceneViewer",     desc: "Viewer avec auto-fit et Draco" },
              { name: "FloatingModel",      desc: "Animation levitation + rotation idle" },
              { name: "ParticleBackground", desc: "Particules GPU interactives" },
              { name: "Product3DViewer",    desc: "360deg avec annotations" },
              { name: "Car3DPreview",       desc: "ToyCar KhronosGroup GLB" },
              { name: "SafeSceneCanvas",    desc: "Canvas R3F avec fallback WebGL" },
              { name: "Portfolio3DVisual",  desc: "Scene hero interactive" },
            ].map((c) => (
              <div key={c.name} className="flex items-start gap-3 rounded-none border bg-card p-4">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border bg-muted/60">
                  <span className="text-[10px] font-bold text-primary">3D</span>
                </div>
                <div>
                  <p className="font-mono text-xs font-semibold">{c.name}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer CTA ── */}
        <section className="mt-20 border-t pt-14 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Pret a construire?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Tous ces composants sont dans le starter. Clonez, copiez ce dont vous avez besoin, supprimez le reste.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" asChild>
              <a href="https://github.com/kurtisv/kv-web-starter">Voir sur GitHub</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/demo">Explorer les demos</a>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
