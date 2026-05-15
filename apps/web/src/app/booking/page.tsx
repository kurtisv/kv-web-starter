import { CalendarClock, CheckCircle2, Clock3 } from "lucide-react";

import { createBookingRequest } from "@/app/actions/booking";
import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { prisma } from "@/lib/db";
import { generateBookingSlots } from "@/modules/booking";

const demoServices = [
  {
    id: "replace-with-service-id",
    name: "Discovery call",
    durationMin: 30,
    priceCents: null,
    description: "Qualifier le besoin, le budget et la prochaine etape.",
  },
  {
    id: "implementation-sprint",
    name: "Implementation sprint",
    durationMin: 60,
    priceCents: 25000,
    description: "Planifier une livraison courte avec livrables et criteres de test.",
  },
];

const fallbackStaff = [{ id: undefined, name: "Any staff" }];
const bookingDate = "2026-05-18";

async function getBookingData() {
  try {
    const [services, staff, rules, exceptions, bookings] = await Promise.all([
      prisma.service.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
        take: 20,
      }),
      prisma.staff.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
        take: 20,
      }),
      prisma.availabilityRule.findMany({
        orderBy: [{ weekday: "asc" }, { startTime: "asc" }],
      }),
      prisma.availabilityException.findMany(),
      prisma.booking.findMany({
        where: {
          startAt: {
            gte: new Date(`${bookingDate}T00:00:00.000Z`),
            lt: new Date(`${bookingDate}T23:59:59.999Z`),
          },
        },
        select: { startAt: true, endAt: true },
      }),
    ]);

    return {
      services: services.length > 0 ? services : demoServices,
      staff: staff.length > 0 ? staff : fallbackStaff,
      rules,
      exceptions: exceptions.map((exception) => ({
        date: exception.date.toISOString().slice(0, 10),
        startTime: exception.startTime,
        endTime: exception.endTime,
        isClosed: exception.isClosed,
      })),
      bookings,
      usingFallback: services.length === 0 || staff.length === 0 || rules.length === 0,
    };
  } catch {
    return {
      services: demoServices,
      staff: fallbackStaff,
      rules: [],
      exceptions: [],
      bookings: [
        {
          startAt: new Date("2026-05-18T10:00:00.000Z"),
          endAt: new Date("2026-05-18T10:30:00.000Z"),
        },
      ],
      usingFallback: true,
    };
  }
}

function formatPrice(priceCents: number | null) {
  return priceCents ? `$${(priceCents / 100).toFixed(2)}` : "Free";
}

export default async function BookingPage() {
  const data = await getBookingData();
  const selectedService = data.services[0] ?? demoServices[0];
  const selectedStaff = data.staff[0] ?? fallbackStaff[0];
  const rules =
    data.rules.length > 0
      ? data.rules.filter((rule) => !selectedStaff.id || rule.staffId === selectedStaff.id)
      : [
          {
            weekday: 1,
            startTime: "09:00",
            endTime: "12:00",
          },
        ];
  const slots = generateBookingSlots({
    date: bookingDate,
    serviceDurationMin: selectedService.durationMin,
    rules,
    exceptions: data.exceptions,
    bookedIntervals: data.bookings,
  });

  return (
    <MarketingPageShell>
      <main>
        <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Booking MVP
            </p>
            <h1 className="text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
              Reservation claire pour services, staff et disponibilites.
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Cette page pose le flux public: choisir un service, choisir un
              creneau disponible, puis confirmer les informations client.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-4 text-foreground" />
                Disponibilites calculees par regles, exceptions et bookings.
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-4 text-foreground" />
                Pret pour connexion Prisma, paiement Stripe et rappels Resend.
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Services</CardTitle>
                <CardDescription>
                  {data.usingFallback
                    ? "Donnees demo si la DB est vide ou indisponible."
                    : "Services actifs depuis Prisma."}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {data.services.map((service) => (
                  <div key={service.id} className="border p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h2 className="font-medium">{service.name}</h2>
                      <span className="text-sm font-medium">{formatPrice(service.priceCents)}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {service.description}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock3 className="size-4" />
                      {service.durationMin} minutes
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Demande de reservation</CardTitle>
                <CardDescription>Lundi 18 mai 2026, heure demo UTC.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-5">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {slots.map((slot) => (
                    <Button key={slot.startTime} variant="secondary" size="sm">
                      <CalendarClock className="size-4" />
                      {slot.startTime}
                    </Button>
                  ))}
                </div>
                <form action={createBookingRequest} className="grid gap-4 border-t pt-5">
                  <input name="serviceId" type="hidden" value={selectedService.id} />
                  {selectedStaff.id ? <input name="staffId" type="hidden" value={selectedStaff.id} /> : null}
                  <input name="startAt" type="hidden" value={slots[0]?.startAt.toISOString() ?? "2026-05-18T09:00:00.000Z"} />
                  <div className="grid gap-2">
                    <Label htmlFor="customerName">Name</Label>
                    <Input id="customerName" name="customerName" placeholder="Client Example" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="customerEmail">Email</Label>
                    <Input
                      id="customerEmail"
                      name="customerEmail"
                      type="email"
                      placeholder="client@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="customerPhone">Phone</Label>
                    <Input id="customerPhone" name="customerPhone" placeholder="+1 555 555 5555" />
                  </div>
                  <Button type="submit" variant="secondary">
                    Request demo booking
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </MarketingPageShell>
  );
}
