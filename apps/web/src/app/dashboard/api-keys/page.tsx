import { KeyRound, ShieldCheck, TimerReset } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const apiKeys = [
  {
    name: "Production",
    prefix: "kv_prod_8K2P",
    scopes: "demo:read, usage:read",
    lastUsed: "Today",
  },
  {
    name: "Staging",
    prefix: "kv_stage_Q4LM",
    scopes: "*",
    lastUsed: "Never",
  },
];

export default function DashboardApiKeysPage() {
  return (
    <main className="grid gap-6 px-6 py-10">
      <div>
        <h1 className="text-3xl font-semibold">API Keys</h1>
        <p className="mt-3 text-muted-foreground">
          Gestion des cles, scopes et usage avant branchement Prisma complet.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <KeyRound className="size-4" />
              Active keys
            </CardTitle>
            <CardDescription>Cles non revoquees.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">2</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldCheck className="size-4" />
              Scopes
            </CardTitle>
            <CardDescription>Controle par endpoint.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">3</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TimerReset className="size-4" />
              Rate limit
            </CardTitle>
            <CardDescription>Upstash-ready.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">60/min</CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Keys</CardTitle>
          <CardDescription>La cle complete sera affichee seulement a la creation.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Prefix</TableHead>
                <TableHead>Scopes</TableHead>
                <TableHead>Last used</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.prefix}>
                  <TableCell>{apiKey.name}</TableCell>
                  <TableCell>
                    <code className="text-sm">{apiKey.prefix}</code>
                  </TableCell>
                  <TableCell>
                    <Badge>{apiKey.scopes}</Badge>
                  </TableCell>
                  <TableCell>{apiKey.lastUsed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
