import type { Metadata } from "next";

import { createBookingRequest } from "@/app/actions/booking";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stepper } from "@/components/ui/stepper";
import {
  ServicePicker,
  StaffPicker,
  TimeSlotGrid,
  BookingDateSelector,
  BookingForm,
  BookingSummaryCard,
} from "@/components/booking";
import { MarketingPageShell } from "@/components/marketing/page-shell";
import { prisma } from "@/lib/db";
import { generateBookingSlots } from "@/modules/booking";

export const metadata: Metadata = {
  title: "Reserver un créneau",
  description: "Choisissez un service, une date et un créneau disponible. Confirmation par email immediate.",
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
  success?: string;
  error?: string;
};

const bookingErrorMessages: Record<string, string> = {
  "service-not-found": "Le service selectionne n'existe pas ou est desactive.",
  "slot-conflict": "Ce creneau vient d'etre pris. Choisissez-en un autre.",
  "server-error": "Une erreur technique est survenue. Reessayez dans quelques instants.",
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

function normalizeDate(date?: string) {
  return date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : fallbackDate;
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

  const demoRules = [0, 1, 2, 3, 4, 5, 6].map((d) => ({
    weekday: d,
    startTime: "09:00",
    endTime: "17:00",
  }));

  const rules =
    data.rules.length > 0
      ? data.rules.filter((r) => !selectedStaff.id || r.staffId === selectedStaff.id)
      : demoRules;

  const slots = generateBookingSlots({
    date: selectedDate,
    serviceDurationMin: selectedService.durationMin,
    rules,
    exceptions: data.exceptions,
    bookedIntervals: data.bookings,
  });

  const bookingSteps = [
    { label: "Service" },
    { label: "Date" },
    { label: "Creneau" },
    { label: "Coordonnees" },
  ];
  const currentStep = !params.serviceId ? 0 : !params.date ? 1 : 2;

  return (
    <MarketingPageShell>
      <main>
        {/* Alerts */}
        {params.success === "1" && (
          <div className="mx-auto max-w-6xl px-6 pt-6">
            <Alert variant="success" title="Demande envoyee">
              Votre demande de reservation a ete recue. Confirmation par email sous peu.{" "}
              <a href="/my-bookings" className="underline">
                Voir mes reservations
              </a>
            </Alert>
          </div>
        )}
        {params.error && (
          <div className="mx-auto max-w-6xl px-6 pt-6">
            <Alert variant="error" title="Erreur lors de la reservation">
              {bookingErrorMessages[params.error] ?? bookingErrorMessages["server-error"]}
            </Alert>
          </div>
        )}

        {/* Hero */}
        <section className="border-b theme-hero">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <div className="mb-4 flex items-center gap-3">
              <Badge className="border-background/20 bg-background/10 text-background">
                Prise de rendez-vous
              </Badge>
              <a
                href="/demo/booking"
                className="text-xs opacity-60 hover:opacity-100 transition-opacity underline text-background"
              >
                &larr; Voir la demo ZenSlot
              </a>
            </div>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Reservez votre creneau.
            </h1>
            <p className="mt-3 max-w-xl opacity-70">
              Choisissez un service et une date — les disponibilites s&apos;affichent
              automatiquement. Confirmation par email immediate.
            </p>
            <div className="mt-8 max-w-sm">
              <Stepper steps={bookingSteps} currentStep={currentStep} />
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-6 px-6 py-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">

          {/* Left: service + staff + date */}
          <div className="grid gap-4 lg:sticky lg:top-6">

            {/* 1 — Service */}
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
                <form method="get" id="service-form">
                  <ServicePicker
                    services={data.services}
                    selectedId={selectedService.id}
                    formId="service-form"
                  />
                  {data.staff.length > 1 ? (
                    <div className="mt-4">
                      <p className="mb-2 text-sm font-medium">Avec qui ?</p>
                      <StaffPicker
                        staff={data.staff}
                        selectedId={selectedStaff.id}
                        formId="service-form"
                      />
                    </div>
                  ) : (
                    <StaffPicker
                      staff={data.staff}
                      selectedId={selectedStaff.id}
                      formId="service-form"
                    />
                  )}
                </form>
              </CardContent>
            </Card>

            {/* 2 — Date */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">2. Choisir une date</CardTitle>
              </CardHeader>
              <CardContent>
                <BookingDateSelector
                  serviceId={selectedService.id}
                  staffId={selectedStaff.id}
                  value={selectedDate}
                />
              </CardContent>
            </Card>

            {/* Summary */}
            <BookingSummaryCard
              service={selectedService}
              staff={selectedStaff}
              date={selectedDate}
            />
          </div>

          {/* Right: slots + form */}
          <div className="grid gap-4">

            {/* 3 — Slot */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">3. Choisir un creneau</CardTitle>
                <CardDescription>
                  {new Date(`${selectedDate}T12:00:00`).toLocaleDateString("fr-CA", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}{" "}
                  &mdash; {selectedService.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TimeSlotGrid slots={slots} formId="booking-form" />
              </CardContent>
            </Card>

            {/* 4 — Coordonnees */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">4. Vos coordonnees</CardTitle>
                <CardDescription>
                  Une confirmation vous sera envoyee par email.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BookingForm
                  id="booking-form"
                  action={createBookingRequest}
                  serviceId={selectedService.id}
                  staffId={selectedStaff.id}
                  disabled={slots.length === 0}
                  disabledReason="Aucun creneau disponible"
                />
              </CardContent>
            </Card>

          </div>
        </section>
      </main>
    </MarketingPageShell>
  );
}
