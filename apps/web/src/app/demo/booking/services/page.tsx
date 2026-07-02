import {
  DEMO_SERVICES,
  DEMO_PACKAGES,
  DEMO_MEMBERSHIPS,
  DEMO_GIFT_CARDS,
  DEMO_STAFF,
} from "@/lib/demo-data/booking-demo-data";
import { BookingDemoShell } from "@/components/booking/booking-demo-shell";
import { ServiceManagementTable } from "@/components/booking/service-management-table";
import { ClassSessionCard } from "@/components/booking/class-session-card";
import { PackageCard } from "@/components/booking/package-card";
import { GiftCardCard } from "@/components/booking/gift-card-card";

const GROUP_SERVICES = DEMO_SERVICES.filter((s) => s.isGroup);
const INDIVIDUAL_SERVICES = DEMO_SERVICES.filter((s) => !s.isGroup);

const CLASS_SESSIONS = [
  { id: "cs-1", name: "Yoga Hatha", instructor: "Lea Fontaine", date: "2 juillet 2026", time: "08:00", durationMin: 60, enrolledCount: 9, maxCapacity: 12, priceCents: 2500, status: "open" as const },
  { id: "cs-2", name: "Yoga Vinyasa", instructor: "Lea Fontaine", date: "2 juillet 2026", time: "11:30", durationMin: 75, enrolledCount: 10, maxCapacity: 10, priceCents: 2800, status: "full" as const },
  { id: "cs-3", name: "Meditation guidee", instructor: "Sophie Renard", date: "3 juillet 2026", time: "17:00", durationMin: 45, enrolledCount: 6, maxCapacity: 15, priceCents: 1800, status: "open" as const },
];

const SERVICE_NAME_MAP = Object.fromEntries(DEMO_SERVICES.map((s) => [s.id, s.name]));

export default function BookingServicesPage() {
  return (
    <BookingDemoShell>
      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Seren Studio &mdash; Demo fictive
            </p>
            <h1 className="mt-1 text-2xl font-bold">Services</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {DEMO_SERVICES.length} services &mdash; {GROUP_SERVICES.length} collectifs, {INDIVIDUAL_SERVICES.length} individuels
            </p>
          </div>
          <span className="rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            Donnees fictives
          </span>
        </div>

        {/* Individual services */}
        <section className="mb-10">
          <h2 className="mb-4 text-base font-semibold">Services individuels</h2>
          <ServiceManagementTable services={INDIVIDUAL_SERVICES} />
        </section>

        {/* Staff specialties */}
        <section className="mb-10">
          <h2 className="mb-4 text-base font-semibold">Personnel &amp; specialites</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DEMO_STAFF.map((s) => (
              <div key={s.id} className="rounded-xl border bg-card p-4 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm mb-3">
                  {s.name.split(" ").map((w) => w[0]).join("")}
                </div>
                <p className="font-medium text-sm">{s.name}</p>
                <p className="text-xs text-muted-foreground mb-2">{s.role}</p>
                <div className="flex flex-wrap gap-1">
                  {s.specialties.slice(0, 2).map((sp) => (
                    <span key={sp} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      {sp}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="text-yellow-500">&#9733;</span>
                  <span className="font-medium text-foreground">{s.rating}</span>
                  <span>({s.reviewCount} avis)</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Group classes */}
        <section className="mb-10">
          <h2 className="mb-4 text-base font-semibold">Classes &amp; sessions de groupe</h2>
          <div className="mb-4">
            <ServiceManagementTable services={GROUP_SERVICES} />
          </div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">Prochaines sessions</h3>
          <ClassSessionCard sessions={CLASS_SESSIONS} />
        </section>

        {/* Packages */}
        <section className="mb-10">
          <h2 className="mb-4 text-base font-semibold">Forfaits</h2>
          <PackageCard packages={DEMO_PACKAGES} serviceNames={SERVICE_NAME_MAP} />
        </section>

        {/* Memberships */}
        <section className="mb-10">
          <h2 className="mb-4 text-base font-semibold">Abonnements mensuels</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {DEMO_MEMBERSHIPS.map((mem) => (
              <div key={mem.id} className="rounded-xl border bg-card p-5 shadow-sm">
                <p className="font-semibold">{mem.name}</p>
                <p className="text-2xl font-bold mt-1">
                  {(mem.priceCents / 100).toFixed(0)} EUR
                  <span className="text-sm font-normal text-muted-foreground">/{mem.billingPeriod === "monthly" ? "mois" : mem.billingPeriod}</span>
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {mem.serviceIds.map((sId) => (
                    <span key={sId} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {SERVICE_NAME_MAP[sId] ?? sId}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
