import {
  DEMO_BOOKING_ANALYTICS,
  DEMO_BOOKING_ACTIVITY,
  DEMO_APPOINTMENTS_TODAY,
  DEMO_WAITLIST,
  DEMO_CLIENTS,
  DEMO_STAFF,
} from "@/lib/demo-data/booking-demo-data";
import { BookingDemoShell } from "@/components/booking/booking-demo-shell";
import { BookingKpiGrid, TrendingUp, CalendarCheck, AlertTriangle, Users, Clock, BarChart2 } from "@/components/booking/booking-kpi-grid";
import { TodaysAppointmentsList } from "@/components/booking/todays-appointments-list";
import { StaffUtilizationCard } from "@/components/booking/staff-utilization-card";
import { NoShowRiskCard } from "@/components/booking/no-show-risk-card";
import { WaitlistCard } from "@/components/booking/waitlist-card";
import { BookingActivityFeed } from "@/components/booking/booking-activity-feed";
import { BookingFunnelCard } from "@/components/booking/booking-funnel-card";

const KPI_ITEMS = [
  {
    label: "Revenu aujourd hui",
    value: `${DEMO_BOOKING_ANALYTICS.today.revenueEuros} EUR`,
    detail: "7 rendez-vous facturable",
    trend: "+12% vs hier",
    trendUp: true,
    icon: <TrendingUp className="h-4 w-4" />,
    highlight: true,
  },
  {
    label: "RDV aujourd hui",
    value: `${DEMO_BOOKING_ANALYTICS.today.appointmentsTotal}`,
    detail: `${DEMO_BOOKING_ANALYTICS.today.appointmentsCompleted} termine, ${DEMO_BOOKING_ANALYTICS.today.appointmentsUpcoming} a venir`,
    icon: <CalendarCheck className="h-4 w-4" />,
  },
  {
    label: "Occupation",
    value: `${DEMO_BOOKING_ANALYTICS.today.occupancyPercent}%`,
    detail: "Taux d utilisation des salles",
    trend: "+5% vs hier",
    trendUp: true,
    icon: <BarChart2 className="h-4 w-4" />,
  },
  {
    label: "Absences non signalees",
    value: `${DEMO_BOOKING_ANALYTICS.today.appointmentsNoShow}`,
    detail: "Carlos V. — Pilates 18h30",
    trend: "Politique no-show a appliquer",
    trendUp: false,
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  {
    label: "Clients ce mois",
    value: `${DEMO_BOOKING_ANALYTICS.month.newClients} nouveaux`,
    detail: `${DEMO_BOOKING_ANALYTICS.week.repeatClientRate}% clients recurrents`,
    trend: "+3 vs mois precedent",
    trendUp: true,
    icon: <Users className="h-4 w-4" />,
  },
  {
    label: "Liste d attente",
    value: `${DEMO_WAITLIST.length}`,
    detail: "Pilates Reformer et Massage",
    icon: <Clock className="h-4 w-4" />,
  },
];

const STAFF_UTIL = DEMO_STAFF.map((s) => {
  const appts = DEMO_APPOINTMENTS_TODAY.filter((a) => a.staffId === s.id);
  const hoursBooked = appts.reduce((sum, a) => {
    const [sh = 0, sm = 0] = a.startTime.split(":").map(Number);
    const [eh = 0, em = 0] = a.endTime.split(":").map(Number);
    return sum + (eh + em / 60) - (sh + sm / 60);
  }, 0);
  const hoursAvailable = 8;
  return {
    staffId: s.id,
    staffName: s.name,
    role: s.role,
    appointmentsToday: appts.length,
    hoursBooked: Math.round(hoursBooked * 10) / 10,
    hoursAvailable,
    utilizationPercent: Math.round((hoursBooked / hoursAvailable) * 100),
  };
});

export default function BookingDashboardPage() {
  return (
    <BookingDemoShell>
      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Seren Studio &mdash; Demo fictive
            </p>
            <h1 className="mt-1 text-2xl font-bold">Tableau de bord</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">Mercredi 1 juillet 2026</p>
          </div>
          <span className="rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            Donnees fictives
          </span>
        </div>

        {/* KPIs */}
        <BookingKpiGrid items={KPI_ITEMS} className="mb-8" />

        {/* Main grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Today's appointments */}
          <div className="lg:col-span-2 rounded-xl border bg-card p-5 shadow-sm">
            <p className="mb-4 text-sm font-medium">Rendez-vous d aujourd hui</p>
            <TodaysAppointmentsList appointments={DEMO_APPOINTMENTS_TODAY} />
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <NoShowRiskCard clients={DEMO_CLIENTS} threshold={2} />
            <WaitlistCard entries={DEMO_WAITLIST} />
          </div>
        </div>

        {/* Second row */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Activity feed */}
          <div className="lg:col-span-2 rounded-xl border bg-card p-5 shadow-sm">
            <p className="mb-4 text-sm font-medium">Activite recente</p>
            <BookingActivityFeed items={DEMO_BOOKING_ACTIVITY} />
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <StaffUtilizationCard staff={STAFF_UTIL} />
          </div>
        </div>

        {/* Funnel */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <BookingFunnelCard steps={DEMO_BOOKING_ANALYTICS.month.conversionFunnel} />

          {/* Booking sources */}
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <p className="mb-4 text-sm font-medium">Sources de reservation &mdash; ce mois</p>
            <div className="space-y-3">
              {DEMO_BOOKING_ANALYTICS.month.bookingSources.map((src) => (
                <div key={src.source}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-muted-foreground">{src.source}</p>
                    <p className="text-xs font-medium">{src.percent}%</p>
                  </div>
                  <div
                    role="progressbar"
                    aria-valuenow={src.percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${src.source}: ${src.percent}%`}
                    className="relative h-2 w-full rounded-full bg-muted"
                  >
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-primary/60 transition-all"
                      style={{ width: `${src.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </BookingDemoShell>
  );
}
