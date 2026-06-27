import { CalendarDays, CircleDollarSign, UsersRound } from "lucide-react";
import { Suspense } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardPageHeader } from "@/components/dashboard-ui/dashboard-shell";
import { MetricCard, MetricGrid } from "@/components/dashboard-ui/metric-card";
import { StatusBadge } from "@/components/dashboard-ui/status-badge";
import { FilterBar } from "@/components/dashboard-ui/filter-bar";

const DEMO_BOOKINGS = [
  { id: "b1", customer: "Alex Martin",    service: "Discovery call",        start: "18 mai, 09:00", status: "confirme",    payment: "Gratuit" },
  { id: "b2", customer: "Sam Gagnon",     service: "Implementation sprint", start: "18 mai, 11:00", status: "en attente",  payment: "En attente" },
  { id: "b3", customer: "Julie Belanger", service: "Suivi mensuel",         start: "19 mai, 14:00", status: "confirme",    payment: "Paye" },
  { id: "b4", customer: "Luc Fortin",     service: "Discovery call",        start: "20 mai, 10:00", status: "annule",      payment: "Rembourse" },
];

const STATUS_FILTERS = [
  { value: "confirme",   label: "Confirme" },
  { value: "en attente", label: "En attente" },
  { value: "annule",     label: "Annule" },
];

type SearchParams = {
  search?: string;
  status?: string;
};

function filterBookings(bookings: typeof DEMO_BOOKINGS, search: string, status: string) {
  return bookings.filter((b) => {
    const matchSearch =
      !search ||
      b.customer.toLowerCase().includes(search.toLowerCase()) ||
      b.service.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !status || b.status === status;
    return matchSearch && matchStatus;
  });
}

export default async function DashboardBookingsPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = (await searchParams) ?? {};
  const search = params.search ?? "";
  const status = params.status ?? "";

  const bookings = filterBookings(DEMO_BOOKINGS, search, status);

  return (
    <main className="grid gap-6 px-6 py-10">
      <DashboardPageHeader
        title="Reservations"
        description="Vue operationnelle pour suivre les reservations, paiements et capacite."
      />

      <MetricGrid className="md:grid-cols-3 lg:grid-cols-3">
        <MetricCard
          label="Aujourd'hui"
          value={6}
          description="Reservations planifiees"
          icon={<CalendarDays className="h-4 w-4" />}
          trend={{ value: "+2 vs hier", direction: "up" }}
        />
        <MetricCard
          label="Nouveaux clients"
          value={18}
          description="Ce mois-ci"
          icon={<UsersRound className="h-4 w-4" />}
          trend={{ value: "+5 vs mois dernier", direction: "up" }}
        />
        <MetricCard
          label="Paiements confirmes"
          value="2 400 $"
          description="Ce mois-ci"
          icon={<CircleDollarSign className="h-4 w-4" />}
          trend={{ value: "+12 %", direction: "up" }}
        />
      </MetricGrid>

      <Card>
        <CardHeader>
          <CardTitle>Prochaines reservations</CardTitle>
          <CardDescription>{bookings.length} reservation(s)</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Suspense>
            <FilterBar
              searchPlaceholder="Chercher un client ou service..."
              filters={[{ key: "status", label: "Statut", options: STATUS_FILTERS }]}
            />
          </Suspense>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Debut</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Paiement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Aucune reservation ne correspond aux filtres.
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.customer}</TableCell>
                    <TableCell>{booking.service}</TableCell>
                    <TableCell className="text-muted-foreground">{booking.start}</TableCell>
                    <TableCell>
                      <StatusBadge status={booking.status} dot />
                    </TableCell>
                    <TableCell className="text-muted-foreground">{booking.payment}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
