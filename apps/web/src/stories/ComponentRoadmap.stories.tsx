import type { Meta, StoryObj } from "@storybook/react";

import { AuditLogTimeline, DateRangeFilter, EmptyDashboardState } from "@/components/dashboard-ui";
import { ApiUsageChart, RateLimitMeter, RequestLogViewer } from "@/components/api-portal";
import { CheckoutSummary, OrderStatusTimeline, VariantSelector } from "@/components/ecommerce";

function ComponentRoadmapPreview() {
  return (
    <div className="grid max-w-4xl gap-6">
      <section className="grid gap-4 border p-4">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <DateRangeFilter value={{ from: "2026-06-01", to: "2026-06-30" }} />
        <AuditLogTimeline
          items={[
            { id: "1", action: "Client cree", actor: "Admin", createdAt: "Aujourd'hui", variant: "success" },
            { id: "2", action: "Quota approche", actor: "Systeme", createdAt: "Hier", variant: "warning" },
          ]}
        />
        <EmptyDashboardState title="Aucune donnee" description="Les resultats apparaitront ici." />
      </section>

      <section className="grid gap-4 border p-4">
        <h2 className="text-lg font-semibold">API portal</h2>
        <ApiUsageChart data={[{ label: "Lun", calls: 120 }, { label: "Mar", calls: 260 }, { label: "Mer", calls: 180 }]} />
        <RateLimitMeter used={7400} limit={10000} />
        <RequestLogViewer entries={[{ id: "1", method: "GET", path: "/api/v1/demo", status: 200, durationMs: 42, createdAt: "now" }]} />
      </section>

      <section className="grid gap-4 border p-4">
        <h2 className="text-lg font-semibold">E-commerce</h2>
        <VariantSelector
          label="Couleur"
          value="black"
          options={[
            { value: "black", label: "Noir", swatch: "#111827" },
            { value: "tan", label: "Cognac", swatch: "#b45309" },
          ]}
        />
        <CheckoutSummary subtotalCents={12900} shippingCents={1200} taxCents={2100} discountCents={1000} />
        <OrderStatusTimeline
          currentStep="packed"
          steps={[
            { id: "paid", label: "Payee" },
            { id: "packed", label: "Preparee" },
            { id: "shipped", label: "Expediee" },
          ]}
        />
      </section>
    </div>
  );
}

const meta: Meta<typeof ComponentRoadmapPreview> = {
  title: "Roadmap/ComponentRoadmap",
  component: ComponentRoadmapPreview,
};

export default meta;
type Story = StoryObj<typeof ComponentRoadmapPreview>;

export const Overview: Story = {};
