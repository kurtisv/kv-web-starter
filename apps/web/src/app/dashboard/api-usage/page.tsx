import { Activity, Clock3, Gauge, TriangleAlert } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { summarizeApiUsage } from "@/modules/api-portal";

const DEMO_API_USAGE = [
  { id: "demo-u1", endpoint: "/api/v1/bookings", method: "GET", statusCode: 200, latencyMs: 48 as number | null, units: 1, createdAt: new Date("2025-06-08T09:12:00"), apiKey: { prefix: "kv_prod_a1b2", name: "Production" } as { prefix: string; name: string } | null },
  { id: "demo-u2", endpoint: "/api/v1/bookings", method: "POST", statusCode: 201, latencyMs: 112 as number | null, units: 1, createdAt: new Date("2025-06-08T08:44:00"), apiKey: { prefix: "kv_prod_a1b2", name: "Production" } as { prefix: string; name: string } | null },
  { id: "demo-u3", endpoint: "/api/v1/services", method: "GET", statusCode: 200, latencyMs: 31 as number | null, units: 1, createdAt: new Date("2025-06-08T08:30:00"), apiKey: { prefix: "kv_prod_c3d4", name: "Mobile App" } as { prefix: string; name: string } | null },
  { id: "demo-u4", endpoint: "/api/v1/bookings/abc", method: "DELETE", statusCode: 404, latencyMs: 22 as number | null, units: 0, createdAt: new Date("2025-06-07T17:15:00"), apiKey: { prefix: "kv_prod_a1b2", name: "Production" } as { prefix: string; name: string } | null },
  { id: "demo-u5", endpoint: "/api/v1/availability", method: "GET", statusCode: 200, latencyMs: 55 as number | null, units: 1, createdAt: new Date("2025-06-07T16:00:00"), apiKey: { prefix: "kv_prod_c3d4", name: "Mobile App" } as { prefix: string; name: string } | null },
  { id: "demo-u6", endpoint: "/api/v1/customers", method: "GET", statusCode: 200, latencyMs: 71 as number | null, units: 2, createdAt: new Date("2025-06-07T14:22:00"), apiKey: { prefix: "kv_prod_a1b2", name: "Production" } as { prefix: string; name: string } | null },
];

async function getApiUsageData() {
  const session = await auth();

  if (!session?.user?.email) {
    return { rows: DEMO_API_USAGE, summary: summarizeApiUsage(DEMO_API_USAGE) };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        apiUsage: {
          orderBy: { createdAt: "desc" },
          take: 100,
          select: {
            id: true,
            endpoint: true,
            method: true,
            statusCode: true,
            latencyMs: true,
            units: true,
            createdAt: true,
            apiKey: {
              select: {
                prefix: true,
                name: true,
              },
            },
          },
        },
      },
    });

    const rows = user?.apiUsage ?? [];
    if (rows.length === 0) {
      return { rows: DEMO_API_USAGE, summary: summarizeApiUsage(DEMO_API_USAGE) };
    }

    return {
      rows,
      summary: summarizeApiUsage(rows),
    };
  } catch {
    return { rows: DEMO_API_USAGE, summary: summarizeApiUsage(DEMO_API_USAGE) };
  }
}

export default async function DashboardApiUsagePage() {
  const { rows, summary } = await getApiUsageData();

  return (
    <main className="grid gap-6 px-6 py-10">
      <div>
        <h1 className="text-3xl font-semibold">Utilisation API</h1>
        <p className="mt-3 text-muted-foreground">
          Suivi des appels API, statuts, unites et latence des cles client.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="size-4" />
              Requetes
            </CardTitle>
            <CardDescription>Derniers appels charges.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{summary.totalRequests}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Gauge className="size-4" />
              Unites
            </CardTitle>
            <CardDescription>Unites facturees.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{summary.totalUnits}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TriangleAlert className="size-4" />
              Erreurs
            </CardTitle>
            <CardDescription>Status 4xx/5xx.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{summary.errorRequests}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock3 className="size-4" />
              Latence
            </CardTitle>
            <CardDescription>Moyenne observee.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            {summary.averageLatencyMs === null ? "-" : `${summary.averageLatencyMs}ms`}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Appels recents</CardTitle>
          <CardDescription>Les 100 derniers appels API du compte.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Heure</TableHead>
                <TableHead>Cle</TableHead>
                <TableHead>Methode</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Latence</TableHead>
                <TableHead>Unites</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.createdAt.toISOString()}</TableCell>
                  <TableCell>{row.apiKey ? `${row.apiKey.name} (${row.apiKey.prefix})` : "-"}</TableCell>
                  <TableCell>{row.method}</TableCell>
                  <TableCell>
                    <code className="text-sm">{row.endpoint}</code>
                  </TableCell>
                  <TableCell>{row.statusCode}</TableCell>
                  <TableCell>{row.latencyMs === null ? "-" : `${row.latencyMs}ms`}</TableCell>
                  <TableCell>{row.units}</TableCell>
                </TableRow>
              ))}
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-muted-foreground">
                    Aucun usage API pour l instant. Les appels DB-authentifies alimentent cette table.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
