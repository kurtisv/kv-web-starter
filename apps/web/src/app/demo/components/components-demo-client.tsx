"use client";

import * as React from "react";
import { PlusCircle } from "lucide-react";

import {
  AdminFormDrawer,
  AuditLogTimeline,
  DateRangeFilter,
  EmptyDashboardState,
  ExportButton,
  type DateRangeValue,
} from "@/components/dashboard-ui";
import {
  ApiUsageChart,
  RateLimitMeter,
  RequestLogViewer,
  WebhookTester,
} from "@/components/api-portal";
import {
  CheckoutSummary,
  CustomerOrderTable,
  OrderStatusTimeline,
  PromoCodeInput,
  VariantSelector,
} from "@/components/ecommerce";
import { PhoneMockup3D, WebsiteShowcase3D } from "@/components/3d";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const exportRows = [
  { id: "ord_1001", customer: "Alice Dupont", total: 12900 },
  { id: "ord_1002", customer: "Marc Tremblay", total: 8900 },
];

const requestLogs = [
  { id: "req_1", method: "GET" as const, path: "/api/v1/demo", status: 200, durationMs: 42, createdAt: "il y a 2 min" },
  { id: "req_2", method: "POST" as const, path: "/api/bookings", status: 201, durationMs: 88, createdAt: "il y a 9 min" },
  { id: "req_3", method: "GET" as const, path: "/api/private", status: 403, durationMs: 19, createdAt: "il y a 14 min" },
];

const orderSteps = [
  { id: "paid", label: "Payee", description: "Paiement confirme par Stripe." },
  { id: "packed", label: "Preparee", description: "Commande en preparation." },
  { id: "shipped", label: "Expediee", description: "Numero de suivi cree." },
  { id: "delivered", label: "Livree", description: "Reception confirmee." },
];

export function ComponentsDemoClient() {
  const [range, setRange] = React.useState<DateRangeValue>({ from: "2026-06-01", to: "2026-06-30" });
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [variant, setVariant] = React.useState("black");

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard/Admin</CardTitle>
            <CardDescription>Filtres, exports, empty states et drawer CRUD.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <DateRangeFilter value={range} onChange={setRange} />
            <div className="flex flex-wrap items-center gap-3">
              <ExportButton data={exportRows} filename="orders-demo" />
              <Button type="button" variant="secondary" onClick={() => setDrawerOpen(true)}>
                <PlusCircle className="h-4 w-4" />
                Ouvrir drawer
              </Button>
            </div>
            <AuditLogTimeline
              items={[
                { id: "1", action: "Service modifie", actor: "Admin", createdAt: "Aujourd'hui 09:12", variant: "success" },
                { id: "2", action: "Quota API approche", actor: "Systeme", createdAt: "Hier 16:40", variant: "warning" },
              ]}
            />
            <EmptyDashboardState
              title="Aucun client trouve"
              description="Ajuste les filtres ou cree un premier client pour commencer."
              actionLabel="Creer un client"
              onAction={() => setDrawerOpen(true)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API portal</CardTitle>
            <CardDescription>Usage, quotas, journaux et test webhook.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <ApiUsageChart
              data={[
                { label: "Lun", calls: 120 },
                { label: "Mar", calls: 240 },
                { label: "Mer", calls: 180 },
                { label: "Jeu", calls: 310 },
                { label: "Ven", calls: 270 },
              ]}
            />
            <RateLimitMeter used={7400} limit={10000} />
            <RequestLogViewer entries={requestLogs} />
            <WebhookTester defaultUrl="https://example.com/webhook" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>E-commerce</CardTitle>
          <CardDescription>Variantes, promo, checkout, suivi et historique client.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-2">
          <div className="grid gap-6">
            <VariantSelector
              label="Couleur"
              value={variant}
              onChange={setVariant}
              options={[
                { value: "black", label: "Noir", swatch: "#111827" },
                { value: "tan", label: "Cognac", swatch: "#b45309" },
                { value: "navy", label: "Marine", swatch: "#1e3a8a" },
              ]}
            />
            <PromoCodeInput onApply={(code) => code.toUpperCase() === "WELCOME10"} />
            <CheckoutSummary subtotalCents={12900} shippingCents={1200} taxCents={2100} discountCents={1000} />
          </div>
          <div className="grid gap-6">
            <OrderStatusTimeline steps={orderSteps} currentStep="packed" />
            <CustomerOrderTable
              orders={[
                { id: "1", number: "#1001", date: "2026-06-22", status: "paid", totalCents: 12900 },
                { id: "2", number: "#1002", date: "2026-06-12", status: "shipped", totalCents: 8900 },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-6" aria-labelledby="components-3d-heading">
        <div>
          <h2 id="components-3d-heading" className="text-3xl font-semibold tracking-normal">
            3D
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Scenes 3D interactives avec GLB reel ou fallback procedural automatique. Degradation mobile integree.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Telephone</p>
            <PhoneMockup3D />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Laptop</p>
            <WebsiteShowcase3D />
          </div>
        </div>
      </section>

      <AdminFormDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        title="Nouveau client"
        description="Exemple de formulaire CRUD standardise."
        formId="demo-admin-form"
      >
        <form id="demo-admin-form" className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
          <Field label="Nom" htmlFor="customer-name" required>
            <Input id="customer-name" placeholder="Alice Dupont" />
          </Field>
          <Field label="Email" htmlFor="customer-email" required>
            <Input id="customer-email" type="email" placeholder="alice@example.com" />
          </Field>
        </form>
      </AdminFormDrawer>
    </section>
  );
}
