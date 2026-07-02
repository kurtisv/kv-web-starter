import {
  DEMO_APPOINTMENTS_TODAY,
  DEMO_WEEK_SLOTS,
  DEMO_RESOURCES,
  DEMO_BLOCKED_TIMES,
  DEMO_STAFF,
} from "@/lib/demo-data/booking-demo-data";
import { BookingDemoShell } from "@/components/booking/booking-demo-shell";
import { CalendarDayView } from "@/components/booking/calendar-day-view";
import { CalendarWeekStrip } from "@/components/booking/calendar-week-strip";
import { ResourceAvailabilityPanel } from "@/components/booking/resource-availability-panel";
import { ScheduleConflictAlert } from "@/components/booking/schedule-conflict-alert";

const RESOURCE_SLOTS = [
  { resourceId: "room-a",    time: "09:00", available: false, bookedBy: "Yoga Hatha" },
  { resourceId: "room-a",    time: "11:00", available: false, bookedBy: "Yoga Vinyasa" },
  { resourceId: "room-a",    time: "17:00", available: false, bookedBy: "Meditation guidee" },
  { resourceId: "room-b",    time: "10:00", available: false, bookedBy: "Massage relaxant" },
  { resourceId: "room-b",    time: "14:00", available: false, bookedBy: "Coaching personnel" },
  { resourceId: "reformer-1",time: "09:00", available: false, bookedBy: "Pilates (Alice M.)" },
  { resourceId: "reformer-2",time: "18:00", available: false, bookedBy: "Pilates (Carlos V.)" },
];

const CONFLICTS = [
  { id: "c1", staffName: "Lea Fontaine", time: "11:30-12:45", reason: "Chevauchement potentiel avec pause dejeuner staff" },
];

const AVAILABILITY_RULES_SUMMARY = DEMO_STAFF.map((s) => ({
  id: s.id,
  name: s.name,
  role: s.role,
  nextAvailable: s.nextAvailable,
  blockedDates: DEMO_BLOCKED_TIMES.filter((b) => b.staffId === s.id),
}));

export default function BookingCalendarPage() {
  return (
    <BookingDemoShell>
      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Seren Studio &mdash; Demo fictive
            </p>
            <h1 className="mt-1 text-2xl font-bold">Calendrier</h1>
          </div>
          <span className="rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            Donnees fictives
          </span>
        </div>

        {/* Conflict alert */}
        <ScheduleConflictAlert conflicts={CONFLICTS} className="mb-6" />

        {/* Week strip */}
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-muted-foreground">Semaine du 1 au 7 juillet 2026</p>
          <CalendarWeekStrip days={DEMO_WEEK_SLOTS} activeDayIndex={0} />
        </div>

        {/* Day view + resource panel */}
        <div className="grid gap-6 lg:grid-cols-2">
          <CalendarDayView
            appointments={DEMO_APPOINTMENTS_TODAY}
            date="Mercredi 1 juillet 2026"
          />
          <div className="space-y-4">
            <ResourceAvailabilityPanel
              resources={DEMO_RESOURCES}
              slots={RESOURCE_SLOTS}
            />
          </div>
        </div>

        {/* Staff schedules summary */}
        <div className="mt-8">
          <h2 className="mb-4 text-base font-semibold">Planning du personnel</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AVAILABILITY_RULES_SUMMARY.map((member) => (
              <div key={member.id} className="rounded-xl border bg-card p-4 shadow-sm">
                <p className="font-medium text-sm">{member.name}</p>
                <p className="text-xs text-muted-foreground mb-3">{member.role}</p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Prochaine dispo</span>
                    <span className="font-medium">{member.nextAvailable}</span>
                  </div>
                  {member.blockedDates.length > 0 && (
                    <div className="mt-2 rounded-md bg-amber-50 px-2 py-1 text-xs text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                      {member.blockedDates.map((b) => (
                        <p key={b.date}>{b.date} &mdash; {b.reason}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl border bg-muted/30 p-4 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">Legende</p>
          {[
            { color: "bg-blue-100 dark:bg-blue-950/40",  label: "Confirme" },
            { color: "bg-primary/10",                     label: "En cours" },
            { color: "bg-green-100 dark:bg-green-950/40", label: "Termine" },
            { color: "bg-red-100 dark:bg-red-950/40",     label: "Absence" },
          ].map((item) => (
            <span key={item.label} className="inline-flex items-center gap-1.5">
              <span className={`h-3 w-3 rounded-sm ${item.color}`} />
              {item.label}
            </span>
          ))}
        </div>
      </main>
    </BookingDemoShell>
  );
}
