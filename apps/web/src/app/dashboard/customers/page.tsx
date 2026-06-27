import { Suspense } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardPageHeader } from "@/components/dashboard-ui/dashboard-shell";
import { StatusBadge } from "@/components/dashboard-ui/status-badge";
import { FilterBar } from "@/components/dashboard-ui/filter-bar";

const DEMO_CUSTOMERS = [
  { id: "demo-c1", name: "Marie Tremblay",  email: "marie@tremblay.ca",         plan: "Pro",        bookings: 5,  createdAt: new Date("2025-02-14") },
  { id: "demo-c2", name: "Alex Martin",     email: "alex@martindesign.co",       plan: "Starter",    bookings: 2,  createdAt: new Date("2025-03-01") },
  { id: "demo-c3", name: "Sam Gagnon",      email: "sam@gagnon.io",              plan: "Pro",        bookings: 8,  createdAt: new Date("2025-03-15") },
  { id: "demo-c4", name: "Julie Belanger",  email: "julie.belanger@email.com",   plan: "Enterprise", bookings: 12, createdAt: new Date("2025-04-02") },
  { id: "demo-c5", name: "Luc Fortin",      email: "luc@fortin-tech.com",        plan: "Starter",    bookings: 1,  createdAt: new Date("2025-05-20") },
];

const PLAN_FILTERS = [
  { value: "Starter",    label: "Starter" },
  { value: "Pro",        label: "Pro" },
  { value: "Enterprise", label: "Enterprise" },
];

type SearchParams = {
  search?: string;
  plan?: string;
};

function filterCustomers(customers: typeof DEMO_CUSTOMERS, search: string, plan: string) {
  return customers.filter((c) => {
    const matchSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchPlan = !plan || c.plan === plan;
    return matchSearch && matchPlan;
  });
}

const PLAN_STATUS: Record<string, string> = {
  Enterprise: "active",
  Pro:        "confirmed",
  Starter:    "inactive",
};

export default async function DashboardCustomersPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = (await searchParams) ?? {};
  const search = params.search ?? "";
  const plan = params.plan ?? "";

  const customers = filterCustomers(DEMO_CUSTOMERS, search, plan);

  return (
    <main className="grid gap-6 px-6 py-10">
      <DashboardPageHeader
        title="Clients"
        description="Abonnements, historique de reservations et coordonnees."
      />

      <Card>
        <CardHeader>
          <CardTitle>{customers.length} client{customers.length !== 1 ? "s" : ""}</CardTitle>
          <CardDescription>
            {DEMO_CUSTOMERS.length} au total — donnees demo.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Suspense>
            <FilterBar
              searchPlaceholder="Chercher un nom ou email..."
              filters={[{ key: "plan", label: "Plan", options: PLAN_FILTERS }]}
            />
          </Suspense>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Reservations</TableHead>
                <TableHead>Membre depuis</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Aucun client ne correspond aux filtres.
                  </TableCell>
                </TableRow>
              ) : (
                customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell className="text-muted-foreground">{customer.email}</TableCell>
                    <TableCell>
                      <StatusBadge
                        status={PLAN_STATUS[customer.plan] ?? "inactive"}
                        label={customer.plan}
                      />
                    </TableCell>
                    <TableCell>{customer.bookings}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {customer.createdAt.toLocaleDateString("fr-CA", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
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
