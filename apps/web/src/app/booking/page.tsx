import { CalendarClock, CheckCircle2, Clock3 } from "lucide-react";

import { createBookingRequest } from "@/app/actions/booking";
import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateBookingSlots } from "@/modules/booking";

const services = [
  {
    name: "Discovery call",
    durationMin: 30,
    price: "Free",
    description: "Qualifier le besoin, le budget et la prochaine etape.",
  },
  {
    name: "Implementation sprint",
    durationMin: 60,
    price: "$250",
    description: "Planifier une livraison courte avec livrables et criteres de test.",
  },
];

const demoSlots = generateBookingSlots({
  date: "2026-05-18",
  serviceDurationMin: 30,
  rules: [
    {
      weekday: 1,
      startTime: "09:00",
      endTime: "12:00",
    },
  ],
  bookedIntervals: [
    {
      startAt: new Date("2026-05-18T10:00:00.000Z"),
      endAt: new Date("2026-05-18T10:30:00.000Z"),
    },
  ],
});

export default function BookingPage() {
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
                <CardDescription>Selection visible par le client.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {services.map((service) => (
                  <div key={service.name} className="border p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h2 className="font-medium">{service.name}</h2>
                      <span className="text-sm font-medium">{service.price}</span>
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
                  {demoSlots.map((slot) => (
                    <Button key={slot.startTime} variant="secondary" size="sm">
                      <CalendarClock className="size-4" />
                      {slot.startTime}
                    </Button>
                  ))}
                </div>
                <form action={createBookingRequest} className="grid gap-4 border-t pt-5">
                  <input name="serviceId" type="hidden" value="replace-with-service-id" />
                  <input name="startAt" type="hidden" value="2026-05-18T09:00:00.000Z" />
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
