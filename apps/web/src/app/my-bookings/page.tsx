import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock3 } from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyDashboardState, StatusBadge } from "@/components/dashboard-ui";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Mes reservations",
  description: "Consultez vos reservations recentes et leurs statuts.",
};

const DEMO_BOOKINGS = [
  {
    id: "demo-booking-1",
    service: "Discovery call",
    start: "18 mai 2026, 09:00",
    status: "CONFIRMED",
    paymentStatus: "NOT_REQUIRED",
  },
  {
    id: "demo-booking-2",
    service: "Implementation sprint",
    start: "21 mai 2026, 13:00",
    status: "PENDING",
    paymentStatus: "PENDING",
  },
];

async function getClientBookings() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) return DEMO_BOOKINGS;

  try {
    const bookings = await prisma.booking.findMany({
      where: { customerEmail: email },
      orderBy: { startAt: "desc" },
      take: 20,
      include: { service: { select: { name: true } } },
    });

    if (bookings.length === 0) return DEMO_BOOKINGS;

    return bookings.map((booking) => ({
      id: booking.id,
      service: booking.service.name,
      start: booking.startAt.toLocaleString("fr-CA", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      status: booking.status,
      paymentStatus: booking.paymentStatus,
    }));
  } catch {
    return DEMO_BOOKINGS;
  }
}

export default async function MyBookingsPage() {
  const bookings = await getClientBookings();

  return (
    <MarketingPageShell>
      <main>
        <section className="border-b theme-hero">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <Badge className="mb-5 border-background/20 bg-background/10 text-background">
              Espace client
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
              Mes reservations.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 opacity-70">
              Retrouvez vos prochains rendez-vous et les statuts de paiement associes.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-12">
          {bookings.length === 0 ? (
            <EmptyDashboardState
              title="Aucune reservation"
              description="Choisissez un service et une date pour creer votre premiere reservation."
            />
          ) : (
            <div className="grid gap-4">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <CardTitle className="text-base">{booking.service}</CardTitle>
                        <CardDescription className="mt-1 flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          {booking.start}
                        </CardDescription>
                      </div>
                      <StatusBadge status={booking.status.toLowerCase()} dot />
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-wrap items-center justify-between gap-3">
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock3 className="h-4 w-4" />
                      Paiement: {booking.paymentStatus.toLowerCase()}
                    </p>
                    <Button asChild variant="secondary" size="sm">
                      <Link href="/booking">Nouvelle reservation</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </MarketingPageShell>
  );
}
