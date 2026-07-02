import { SaasDemoShell } from "@/components/saas/saas-demo-shell";
import { BillingSummaryCard } from "@/components/saas/billing-summary-card";
import { PaymentMethodCard } from "@/components/saas/payment-method-card";
import { RevenueRecoveryCard } from "@/components/saas/revenue-recovery-card";
import { CustomerPortalCard } from "@/components/saas/customer-portal-card";
import { SubscriptionStatusCard } from "@/components/saas/subscription-status-card";
import { InvoiceList } from "@/components/saas/invoice-list";
import { PlanComparisonTable } from "@/components/saas/plan-comparison-table";
import { SaasDemoActions } from "../saas-demo-actions";
import { Badge } from "@/components/ui/badge";
import { DEMO_INVOICES, DEMO_PRODUCT, DEMO_COMPARISON_FEATURES } from "@/lib/demo-data/saas-demo-data";
import type { Invoice } from "@/components/saas/invoice-list";
import type { PlanFeature } from "@/components/saas/plan-comparison-table";

const invoices: Invoice[] = DEMO_INVOICES.map((inv) => ({
  id:          inv.id,
  number:      inv.number,
  date:        inv.date,
  amountCents: inv.amountCents,
  status:      inv.status as Invoice["status"],
  plan:        inv.plan,
}));

const features: PlanFeature[] = DEMO_COMPARISON_FEATURES.slice(0, 8).map((f) => ({
  label:      f.label,
  starter:    typeof f.starter === "boolean" ? f.starter : (f.starter as string),
  pro:        typeof f.growth === "boolean" ? f.growth : (f.growth as string),
  enterprise: typeof f.enterprise === "boolean" ? f.enterprise : (f.enterprise as string),
}));

export default function DemoBillingPage() {
  return (
    <SaasDemoShell>
      <div className="mx-auto max-w-6xl px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Billing & Abonnement</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Gerez votre plan, vos factures et vos moyens de paiement.
            </p>
          </div>
          <Badge variant="outline" className="text-[10px]">{DEMO_PRODUCT.demoDisclaimer}</Badge>
        </div>

        {/* Top cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SubscriptionStatusCard
            plan={DEMO_PRODUCT.plan}
            status="active"
            renewalDate={DEMO_PRODUCT.renewalDate}
            onUpgrade={() => {}}
            onCancel={() => {}}
          />
          <BillingSummaryCard />
          <PaymentMethodCard />
        </div>

        {/* Failed payment recovery */}
        <div className="mb-6">
          <RevenueRecoveryCard />
        </div>

        {/* Upgrade / cancel actions */}
        <div className="mb-6 rounded-xl border bg-card p-5">
          <h2 className="mb-1 text-sm font-semibold">Gerer votre abonnement</h2>
          <p className="mb-4 text-xs text-muted-foreground">
            Changez de plan ou resiliez. Aucune charge reelle en demo mode.
          </p>
          <SaasDemoActions />
        </div>

        {/* Invoices */}
        <div className="mb-6">
          <h2 className="mb-3 text-sm font-semibold">Historique de facturation</h2>
          <InvoiceList invoices={invoices} />
        </div>

        {/* Plan comparison */}
        <div className="mb-6">
          <h2 className="mb-3 text-sm font-semibold">Comparatif des plans</h2>
          <PlanComparisonTable features={features} onSelect={() => {}} />
        </div>

        {/* Customer portal */}
        <div className="grid gap-4 sm:grid-cols-2">
          <CustomerPortalCard />
        </div>

      </div>
    </SaasDemoShell>
  );
}
