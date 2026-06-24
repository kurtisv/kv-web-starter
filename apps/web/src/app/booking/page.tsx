import type { Metadata } from "next";
import { CalendarDays, Clock3 } from "lucide-react";

import { createBookingRequest } from "@/app/actions/booking";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MarketingPageShell } from "@/components/marketing/page-shell";
import { prisma } from "@/lib/db";
import { generateBookingSlots } from "@/modules/booking";

export const metadata: Metadata = {
  title: "Reserver un creneau",
  description: "Choisissez un service, une date et un creneau disponible. Confirmation par email immediate.",
};

// ------------------------------------------------------------------ demo data

const demoServices = [
  {
    id: "demo-discovery",
    name: "Discovery call",
    durationMin: 30,
    priceCents: null,
    description: "Qualifier le besoin, le budget et la prochaine etape.",
  },
  {
    id: "demo-sprint",
    name: "Implementation sprint",
    durationMin: 60,
    priceCents: 25000,
    description: "Planifier une livraison avec livrables et criteres de test.",
  },
];

const fallbackStaff = [{ id: undefined as string | undefined, name: "Toute disponibilite" }];
const fallbackDate = new Date().toISOString().slice(0, 10);

// ------------------------------------------------------------------ types

type BookingSearchParams = {
  serviceId?: string;
  staffId?: string;
  date?: string;
};

// ------------------------------------------------------------------ data fetching

async function getBookingData(bookingDate: string) {
  try {
    const [services, staff, rules, exceptions, bookings] = await Promise.all([
      prisma.service.findMany({ where: { isActive: true }, orderBy: { name: "asc" }, take: 20 }),
      prisma.staff.findMany({ where: { isActive: true }, orderBy: { name: "asc" }, take: 20 }),
      prisma.availabilityRule.findMany({ orderBy: [{ weekday: "asc" }, { startTime: "asc" }] }),
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
      exceptions: exceptions.map((e) => ({
        date: e.date.toISOString().slice(0, 10),
        startTime: e.startTime,
        endTime: e.endTime,
        isClosed: e.isClosed,
      })),
      bookings,
      usingFallback: services.length === 0 || staff.length === 0 || rules.length === 0,
    };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[booking] DB unavailable, using demo data:", (err as Error).message);
    }
    return {
      services: demoServices,
      staff: fallbackStaff,
      rules: [],
      exceptions: [],
      bookings: [],
      usingFallback: true,
    };
  }
}

function formatPrice(priceCents: number | null) {
  if (!priceCents) return "Gratuit";
  return `${(priceCents / 100).toFixed(0)} $`;
}

function normalizeDate(date?: string) {
  return date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : fallbackDate;
}

function formatDateLabel(date: string) {
  return new Date(date + "T12:00:00").toLocaleDateString("fr-CA", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

// ------------------------------------------------------------------ page

export default async function BookingPage({
  searchParams,
}: {
  searchParams?: Promise<BookingSearchParams>;
}) {
  const params = (await searchParams) ?? {};
  const selectedDate = normalizeDate(params.date);
  const data = await getBookingData(selectedDate);
  const selectedService =
    data.services.find((s) => s.id === params.serviceId) ?? data.services[0] ?? demoServices[0];
  const selectedStaff =
    data.staff.find((s) => s.id === params.staffId) ?? data.staff[0] ?? fallbackStaff[0];

  const rules =
    data.rules.length > 0
      ? data.rules.filter((r) => !selectedStaff.id || r.staffId === selectedStaff.id)
      : [{ weekday: 1, startTime: "09:00", endTime: "17:00" }];

  const slots = generateBookingSlots({
    date: selectedDate,
    serviceDurationMin: selectedService.durationMin,
    rules,
    exceptions: data.exceptions,
    bookedIntervals: data.bookings,
  });

  return (
    <MarketingPageShell>
      <main>

        {/* Header */}
        <section className="border-b theme-hero">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <Badge className="mb-4 border-background/20 bg-background/10 text-background">
              Prise de rendez-vous
            </Badge>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Reservez votre creneau.
            </h1>
            <p className="mt-3 max-w-xl opacity-70">
              Choisissez un service et une date — les disponibilites s&apos;affichent
              automatiquement. Confirmation par email immediate.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-6 px-6 py-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">

          {/* Left column: service + date selection */}
          <div className="grid gap-4 lg:sticky lg:top-6">

            {/* Service */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">1. Choisir un service</CardTitle>
                {data.usingFallback && (
                  <CardDescription className="text-xs">
                    Donnees demo — configurez vos services dans le dashboard.
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <form method="get" id="service-form" className="grid gap-3">
                  {data.services.map((service) => (
                    <label
                      key={service.id}
                      className="flex cursor-pointer items-start gap-3 border p-4 transition-colors has-[:checked]:border-foreground has-[:checked]:bg-foreground/5"
                    >
                      <input
                        className="mt-1 accent-foreground"
                        name="serviceId"
                        type="radio"
                        value={service.id}
                        defaultChecked={service.id === selectedService.id}
                        form="service-form"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium">{service.name}</span>
                          <span className="shrink-0 text-sm font-medium">
                            {formatPrice(service.priceCents)}
                          </span>
                        </div>
                        {service.description && (
                          <p className="mt-0.5 text-sm text-muted-foreground">
                            {service.description}
                          </p>
                        )}
                        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock3 className="size-3" />
                          {service.durationMin} min
                        </div>
                      </div>
                    </label>
                  ))}

                  {/* Staff (hidden if only one) */}
                  {data.staff.length > 1 && (
                    <div className="grid gap-2">
                      <Label htmlFor="staffId" className="text-sm font-medium">
                        Avec qui ?
                      </Label>
                      <select
                        id="staffId"
                        name="staffId"
                        className="h-10 border border-border bg-background px-3 text-sm"
                        defaultValue={selectedStaff.id}
                        form="service-form"
                      >
                        {data.staff.map((s) => (
                          <option key={s.id ?? "any"} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {data.staff.length <= 1 && (
                    <input type="hidden" name="staffId" value={selectedStaff.id ?? ""} form="service-form" />
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Date */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">2. Choisir une date</CardTitle>
              </CardHeader>
              <CardContent>
                <form method="get" className="grid gap-3">
                  <input type="hidden" name="serviceId" value={selectedService.id} />
                  {selectedStaff.id && (
                    <input type="hidden" name="staffId" value={selectedStaff.id} />
                  )}
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    defaultValue={selectedDate}
                    min={new Date().toISOString().slice(0, 10)}
                  />
                  <Button type="submit" className="w-full">
                    <CalendarDays className="size-4" />
                    Voir les disponibilites
                  </Button>
                </form>
              </CardContent>
            </Card>

          </div>

          {/* Right column: slots + form */}
          <div className="grid gap-4">

            {/* Slot grid */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">3. Choisir un creneau</CardTitle>
                <CardDescription>
                  {formatDateLabel(selectedDate)} &mdash; {selectedService.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {slots.length === 0 ? (
                  <div className="border bg-muted/30 px-4 py-8 text-center">
                    <CalendarDays className="mx-auto size-8 text-muted-foreground/40" />
                    <p className="mt-3 text-sm font-medium">Aucun creneau disponible</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Essayez une autre date ou un autre service.
                    </p>
                  </div>
                ) : (
                  <div
                    className="grid grid-cols-3 gap-2 sm:grid-cols-4"
                    role="radiogroup"
                    aria-label="Creneaux disponibles"
                  >
                    {slots.map((slot, i) => (
                      <label
                        key={slot.startTime}
                        className="flex h-11 cursor-pointer items-center justify-center border text-sm font-medium transition-colors has-[:checked]:border-foreground has-[:checked]:bg-foreground has-[:checked]:text-background hover:border-foreground/50"
                      >
                        <input
                          className="sr-only"
                          name="startAt"
                          form="booking-form"
                          type="radio"
                          value={slot.startAt.toISOString()}
                          defaultChecked={i === 0}
                          required
                        />
                        {slot.startTime}
                      </label>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Booking form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">4. Vos coordonnees</CardTitle>
                <CardDescription>
                  Une confirmation vous sera envoyee par email.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  id="booking-form"
                  action={createBookingRequest}
                  className="grid gap-4"
                >
                  <input type="hidden" name="serviceId" value={selectedService.id} />
                  {selectedStaff.id && (
                    <input type="hidden" name="staffId" value={selectedStaff.id} />
                  )}

                  <div className="grid gap-1.5">
                    <Label htmlFor="customerName">Nom complet</Label>
                    <Input
                      id="customerName"
                      name="customerName"
                      placeholder="Marie Tremblay"
                      required
                      autoComplete="name"
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="customerEmail">Adresse email</Label>
                    <Input
                      id="customerEmail"
                      name="customerEmail"
                      type="email"
                      placeholder="marie@exemple.com"
                      required
                      autoComplete="email"
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="customerPhone">
                      Telephone{" "}
                      <span className="text-muted-foreground">(optionnel)</span>
                    </Label>
                    <Input
                      id="customerPhone"
                      name="customerPhone"
                      type="tel"
                      placeholder="+1 514 555 0100"
                      autoComplete="tel"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={slots.length === 0}
                  >
                    {slots.length === 0
                      ? "Aucun creneau disponible"
                      : "Confirmer la reservation"}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    En continuant, vous acceptez les{" "}
                    <a href="/terms" className="underline underline-offset-2">
                      conditions d&apos;utilisation
                    </a>
                    .
                  </p>
                </form>
              </CardContent>
            </Card>

          </div>
        </section>

      </main>
    </MarketingPageShell>
  );
}
