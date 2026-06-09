import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DEMO_CUSTOMERS = [
  { id: "demo-c1", name: "Marie Tremblay", email: "marie@tremblay.ca", plan: "Pro", bookings: 5, createdAt: new Date("2025-02-14") },
  { id: "demo-c2", name: "Alex Martin", email: "alex@martindesign.co", plan: "Starter", bookings: 2, createdAt: new Date("2025-03-01") },
  { id: "demo-c3", name: "Sam Gagnon", email: "sam@gagnon.io", plan: "Pro", bookings: 8, createdAt: new Date("2025-03-15") },
  { id: "demo-c4", name: "Julie Belanger", email: "julie.belanger@email.com", plan: "Enterprise", bookings: 12, createdAt: new Date("2025-04-02") },
  { id: "demo-c5", name: "Luc Fortin", email: "luc@fortin-tech.com", plan: "Starter", bookings: 1, createdAt: new Date("2025-05-20") },
];

const PLAN_CLASS: Record<string, string> = {
  Enterprise: "border-foreground bg-foreground text-background",
  Pro: "",
  Starter: "opacity-60",
};

export default function DashboardCustomersPage() {
  const customers = DEMO_CUSTOMERS;

  return (
    <main className="grid gap-6 px-6 py-10">
      <div>
        <h1 className="text-3xl font-semibold">Customers</h1>
        <p className="mt-3 text-muted-foreground">
          Clients, abonnements et historique de reservations.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{customers.length} clients</CardTitle>
        </CardHeader>
        <CardContent>
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
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell className="text-muted-foreground">{customer.email}</TableCell>
                  <TableCell>
                    <Badge className={PLAN_CLASS[customer.plan] ?? ""}>
                      {customer.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>{customer.bookings}</TableCell>
                  <TableCell>
                    {customer.createdAt.toLocaleDateString("fr-CA", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
