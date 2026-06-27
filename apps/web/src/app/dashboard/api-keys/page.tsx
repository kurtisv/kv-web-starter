import { KeyRound, ShieldCheck, TimerReset } from "lucide-react";
import { Suspense } from "react";

import { revokeDashboardApiKey } from "@/app/actions/api-keys";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardPageHeader } from "@/components/dashboard-ui/dashboard-shell";
import { MetricCard, MetricGrid } from "@/components/dashboard-ui/metric-card";
import { StatusBadge } from "@/components/dashboard-ui/status-badge";
import { FilterBar } from "@/components/dashboard-ui/filter-bar";
import { ApiKeyDisplay, } from "@/components/api-portal/api-key-display";
import { ScopeList } from "@/components/api-portal/scope-pill";
import { ApiKeyRevokeCell } from "@/components/api-portal/api-key-revoke-cell";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

import { ApiKeyForm } from "./api-key-form";

const DEMO_API_KEYS = [
  { id: "demo-key-prod",   name: "Production", prefix: "kv_prod_a1b2", scopes: ["read", "write"],         lastUsedAt: new Date("2025-06-07") as Date | null, revokedAt: null as Date | null },
  { id: "demo-key-mobile", name: "Mobile App", prefix: "kv_prod_c3d4", scopes: ["read"],                  lastUsedAt: new Date("2025-06-06") as Date | null, revokedAt: null as Date | null },
  { id: "demo-key-test",   name: "Test env",   prefix: "kv_test_e5f6", scopes: ["read", "write", "admin"], lastUsedAt: null as Date | null,                  revokedAt: new Date("2025-05-01") as Date | null },
];

async function getApiKeys() {
  const session = await auth();
  if (!session?.user?.email) return [];
  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        apiKeys: {
          orderBy: { createdAt: "desc" },
          take: 25,
          select: { id: true, name: true, prefix: true, scopes: true, lastUsedAt: true, revokedAt: true },
        },
      },
    });
    return user?.apiKeys ?? [];
  } catch {
    return [];
  }
}

type SearchParams = { search?: string; status?: string };

export default async function DashboardApiKeysPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = (await searchParams) ?? {};
  const search = params.search ?? "";
  const statusFilter = params.status ?? "";

  const dbApiKeys = await getApiKeys();
  const allKeys = dbApiKeys.length > 0 ? dbApiKeys : DEMO_API_KEYS;

  const apiKeys = allKeys.filter((k) => {
    const matchSearch =
      !search ||
      k.name.toLowerCase().includes(search.toLowerCase()) ||
      k.prefix.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      !statusFilter ||
      (statusFilter === "active" && !k.revokedAt) ||
      (statusFilter === "revoked" && !!k.revokedAt);
    return matchSearch && matchStatus;
  });

  const activeKeys = allKeys.filter((k) => !k.revokedAt);
  const scopeCount = new Set(allKeys.flatMap((k) => k.scopes)).size;

  return (
    <main className="grid gap-6 px-6 py-10">
      <DashboardPageHeader
        title="Cles API"
        description="Gestion des cles, scopes et revocations."
      />

      <MetricGrid className="md:grid-cols-3 lg:grid-cols-3">
        <MetricCard
          label="Cles actives"
          value={activeKeys.length}
          description="Non revoquees"
          icon={<KeyRound className="h-4 w-4" />}
        />
        <MetricCard
          label="Scopes distincts"
          value={scopeCount}
          description="Controle par endpoint"
          icon={<ShieldCheck className="h-4 w-4" />}
        />
        <MetricCard
          label="Rate limit"
          value="60/min"
          description="Upstash-ready"
          icon={<TimerReset className="h-4 w-4" />}
        />
      </MetricGrid>

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <ApiKeyForm />

        <Card>
          <CardHeader>
            <CardTitle>Cles</CardTitle>
            <CardDescription>Prefixes et scopes stockes en base.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Suspense>
              <FilterBar
                searchPlaceholder="Chercher par nom ou prefixe..."
                filters={[
                  {
                    key: "status",
                    label: "Statut",
                    options: [
                      { value: "active",  label: "Active" },
                      { value: "revoked", label: "Revoquee" },
                    ],
                  },
                ]}
              />
            </Suspense>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prefixe / Cle</TableHead>
                  <TableHead>Scopes</TableHead>
                  <TableHead>Derniere util.</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      Aucune cle ne correspond aux filtres.
                    </TableCell>
                  </TableRow>
                ) : (
                  apiKeys.map((apiKey) => (
                    <TableRow key={apiKey.id}>
                      <TableCell className="font-medium">{apiKey.name}</TableCell>
                      <TableCell>
                        <ApiKeyDisplay prefix={apiKey.prefix} />
                      </TableCell>
                      <TableCell>
                        <ScopeList scopes={apiKey.scopes} />
                      </TableCell>
                      <TableCell className="text-muted-foreground tabular-nums">
                        {apiKey.lastUsedAt
                          ? apiKey.lastUsedAt.toLocaleDateString("fr-CA", { day: "numeric", month: "short", year: "numeric" })
                          : "Jamais"}
                      </TableCell>
                      <TableCell>
                        <StatusBadge
                          status={apiKey.revokedAt ? "cancelled" : "active"}
                          label={apiKey.revokedAt ? "Revoquee" : "Active"}
                          dot
                        />
                      </TableCell>
                      <TableCell>
                        {!apiKey.revokedAt && (
                          <ApiKeyRevokeCell
                            apiKeyId={apiKey.id}
                            keyName={apiKey.name}
                            action={revokeDashboardApiKey}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
