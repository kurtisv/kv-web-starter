import { Activity, Clock3, Gauge, TriangleAlert } from "lucide-react";
import { Suspense } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardPageHeader } from "@/components/dashboard-ui/dashboard-shell";
import { MetricCard, MetricGrid } from "@/components/dashboard-ui/metric-card";
import { StatusBadge } from "@/components/dashboard-ui/status-badge";
import { FilterBar } from "@/components/dashboard-ui/filter-bar";
import { HttpMethodBadge } from "@/components/api-portal/http-method-badge";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { summarizeApiUsage } from "@/modules/api-portal";

const DEMO_API_USAGE = [
  { id: "demo-u1", endpoint: "/api/v1/bookings",     method: "GET",    statusCode: 200, latencyMs: 48  as number | null, units: 1, createdAt: new Date("2025-06-08T09:12:00"), apiKey: { prefix: "kv_prod_a1b2", name: "Production" } as { prefix: string; name: string } | null },
  { id: "demo-u2", endpoint: "/api/v1/bookings",     method: "POST",   statusCode: 201, latencyMs: 112 as number | null, units: 1, createdAt: new Date("2025-06-08T08:44:00"), apiKey: { prefix: "kv_prod_a1b2", name: "Production" } as { prefix: string; name: string } | null },
  { id: "demo-u3", endpoint: "/api/v1/services",     method: "GET",    statusCode: 200, latencyMs: 31  as number | null, units: 1, createdAt: new Date("2025-06-08T08:30:00"), apiKey: { prefix: "kv_prod_c3d4", name: "Mobile App" }  as { prefix: string; name: string } | null },
  { id: "demo-u4", endpoint: "/api/v1/bookings/abc", method: "DELETE", statusCode: 404, latencyMs: 22  as number | null, units: 0, createdAt: new Date("2025-06-07T17:15:00"), apiKey: { prefix: "kv_prod_a1b2", name: "Production" } as { prefix: string; name: string } | null },
  { id: "demo-u5", endpoint: "/api/v1/availability", method: "GET",    statusCode: 200, latencyMs: 55  as number | null, units: 1, createdAt: new Date("2025-06-07T16:00:00"), apiKey: { prefix: "kv_prod_c3d4", name: "Mobile App" }  as { prefix: string; name: string } | null },
  { id: "demo-u6", endpoint: "/api/v1/customers",    method: "GET",    statusCode: 200, latencyMs: 71  as number | null, units: 2, createdAt: new Date("2025-06-07T14:22:00"), apiKey: { prefix: "kv_prod_a1b2", name: "Production" } as { prefix: string; name: string } | null },
];

async function getApiUsageData() {
  const session = await auth();
  if (!session?.user?.email) return { rows: DEMO_API_USAGE, summary: summarizeApiUsage(DEMO_API_USAGE) };
  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        apiUsage: {
          orderBy: { createdAt: "desc" },
          take: 100,
          select: { id: true, endpoint: true, method: true, statusCode: true, latencyMs: true, units: true, createdAt: true, apiKey: { select: { prefix: true, name: true } } },
        },
      },
    });
    const rows = user?.apiUsage ?? [];
    if (rows.length === 0) return { rows: DEMO_API_USAGE, summary: summarizeApiUsage(DEMO_API_USAGE) };
    return { rows, summary: summarizeApiUsage(rows) };
  } catch {
    return { rows: DEMO_API_USAGE, summary: summarizeApiUsage(DEMO_API_USAGE) };
  }
}

function httpStatusCategory(code: number): string {
  if (code >= 500) return "error";
  if (code >= 400) return "cancelled";
  if (code >= 300) return "pending";
  return "active";
}

type SearchParams = { search?: string; method?: string };

export default async function DashboardApiUsagePage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = (await searchParams) ?? {};
  const search = params.search ?? "";
  const methodFilter = params.method ?? "";

  const { rows: allRows, summary } = await getApiUsageData();

  const rows = allRows.filter((r) => {
    const matchSearch = !search || r.endpoint.toLowerCase().includes(search.toLowerCase());
    const matchMethod = !methodFilter || r.method.toUpperCase() === methodFilter.toUpperCase();
    return matchSearch && matchMethod;
  });

  return (
    <main className="grid gap-6 px-6 py-10">
      <DashboardPageHeader
        title="Utilisation API"
        description="Suivi des appels, statuts, unites et latence par cle."
      />

      <MetricGrid>
        <MetricCard
          label="Requetes"
          value={summary.totalRequests}
          description="Dans la fenetre chargee"
          icon={<Activity className="h-4 w-4" />}
        />
        <MetricCard
          label="Unites facturees"
          value={summary.totalUnits}
          icon={<Gauge className="h-4 w-4" />}
        />
        <MetricCard
          label="Erreurs 4xx/5xx"
          value={summary.errorRequests}
          icon={<TriangleAlert className="h-4 w-4" />}
          trend={
            summary.errorRequests > 0
              ? { value: `${((summary.errorRequests / summary.totalRequests) * 100).toFixed(1)} %`, direction: "down" }
              : undefined
          }
        />
        <MetricCard
          label="Latence moy."
          value={summary.averageLatencyMs === null ? "—" : `${summary.averageLatencyMs} ms`}
          icon={<Clock3 className="h-4 w-4" />}
        />
      </MetricGrid>

      <Card>
        <CardHeader>
          <CardTitle>Appels recents</CardTitle>
          <CardDescription>Les 100 derniers appels API du compte.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Suspense>
            <FilterBar
              searchPlaceholder="Chercher un endpoint..."
              filters={[
                {
                  key: "method",
                  label: "Methode",
                  options: [
                    { value: "GET",    label: "GET" },
                    { value: "POST",   label: "POST" },
                    { value: "PUT",    label: "PUT" },
                    { value: "PATCH",  label: "PATCH" },
                    { value: "DELETE", label: "DELETE" },
                  ],
                },
              ]}
            />
          </Suspense>

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
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    Aucun appel ne correspond aux filtres.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="tabular-nums text-xs text-muted-foreground">
                      {row.createdAt.toLocaleTimeString("fr-CA", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {row.apiKey ? row.apiKey.name : "—"}
                    </TableCell>
                    <TableCell>
                      <HttpMethodBadge method={row.method} />
                    </TableCell>
                    <TableCell>
                      <code className="text-xs">{row.endpoint}</code>
                    </TableCell>
                    <TableCell>
                      <StatusBadge
                        status={httpStatusCategory(row.statusCode)}
                        label={String(row.statusCode)}
                        dot
                      />
                    </TableCell>
                    <TableCell className="tabular-nums text-muted-foreground">
                      {row.latencyMs === null ? "—" : `${row.latencyMs} ms`}
                    </TableCell>
                    <TableCell className="tabular-nums">{row.units}</TableCell>
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
