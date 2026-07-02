import {
  DEMO_INVOICES,
  DEMO_BOOKING_ANALYTICS,
  DEMO_WAITLIST,
  DEMO_CANCELLATION_POLICY,
  DEMO_MEMBERSHIPS,
  DEMO_GIFT_CARDS,
} from "@/lib/demo-data/booking-demo-data";
import { BookingDemoShell } from "@/components/booking/booking-demo-shell";
import { PaymentSummaryCard } from "@/components/booking/payment-summary-card";
import { NoShowPolicyCard } from "@/components/booking/no-show-policy-card";
import { WaitlistPanel } from "@/components/booking/waitlist-panel";
import { BookingInvoiceList } from "@/components/booking/booking-invoice-list";
import { MembershipCard } from "@/components/booking/membership-card";
import { GiftCardCard } from "@/components/booking/gift-card-card";

const RECENT_NO_SHOWS = [
  { clientName: "Carlos Vidal", noShowCount: 3, lastNoShow: "1 juillet 2026", feeApplied: true, feeCents: 6500 },
];

const DEMO_SERVICE_NAMES: Record<string, string> = {
  "yoga-hatha":      "Yoga Hatha",
  "yoga-vinyasa":    "Yoga Vinyasa",
  "pilates-reformer":"Pilates Reformer",
  "massage-relaxant":"Massage relaxant",
  "meditation-guidee":"Meditation guidee",
};

const ACTIVE_MEMBERS = [
  { clientName: "Alice Martin",   membershipId: "mem-studio-pass",    membershipName: "Studio Pass",    startDate: "1 juin 2026",    nextBillingDate: "1 aout 2026",    status: "active" as const },
  { clientName: "Bernard Torres", membershipId: "mem-unlimited-yoga", membershipName: "Yoga illimite",  startDate: "15 mars 2026",   nextBillingDate: "15 juillet 2026", status: "active" as const },
];

const pending = DEMO_INVOICES.filter((i) => i.status === "pending").reduce((sum, i) => sum + i.amountCents, 0);
const overdue = DEMO_INVOICES.filter((i) => i.status === "overdue").reduce((sum, i) => sum + i.amountCents, 0);

export default function BookingPaymentsPage() {
  return (
    <BookingDemoShell>
      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Seren Studio &mdash; Demo fictive
            </p>
            <h1 className="mt-1 text-2xl font-bold">Paiements</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Factures, politiques, abonnements, cartes cadeaux &mdash; toutes les transactions en un seul endroit
            </p>
          </div>
          <span className="rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            Donnees fictives &mdash; aucun vrai Stripe
          </span>
        </div>

        {/* Payment summary */}
        <PaymentSummaryCard
          todayRevenue={DEMO_BOOKING_ANALYTICS.today.revenueEuros}
          weekRevenue={DEMO_BOOKING_ANALYTICS.week.revenueEuros}
          monthRevenue={DEMO_BOOKING_ANALYTICS.month.revenueEuros}
          pendingRevenue={Math.round(pending / 100)}
          overdueRevenue={Math.round(overdue / 100)}
          className="mb-8"
        />

        {/* Invoices + waitlist */}
        <div className="grid gap-6 lg:grid-cols-3 mb-10">
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-base font-semibold">Factures recentes</h2>
            <BookingInvoiceList invoices={DEMO_INVOICES} />
          </div>
          <div>
            <h2 className="mb-4 text-base font-semibold">Liste d&apos;attente</h2>
            <WaitlistPanel entries={DEMO_WAITLIST} />
          </div>
        </div>

        {/* No-show policy */}
        <section className="mb-10">
          <h2 className="mb-4 text-base font-semibold">Politique no-show</h2>
          <NoShowPolicyCard
            policy={DEMO_CANCELLATION_POLICY}
            recentNoShows={RECENT_NO_SHOWS}
          />
        </section>

        {/* Memberships */}
        <section className="mb-10">
          <h2 className="mb-4 text-base font-semibold">Abonnements actifs</h2>
          <MembershipCard
            memberships={DEMO_MEMBERSHIPS}
            activeMembers={ACTIVE_MEMBERS}
            serviceNames={DEMO_SERVICE_NAMES}
          />
        </section>

        {/* Gift cards */}
        <section>
          <h2 className="mb-4 text-base font-semibold">Cartes cadeaux</h2>
          <GiftCardCard cards={DEMO_GIFT_CARDS} />
        </section>
      </main>
    </BookingDemoShell>
  );
}
