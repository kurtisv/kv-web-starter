import { PlusCircle } from "lucide-react";

import { createService, deactivateService, updateService } from "@/app/actions/booking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardPageHeader } from "@/components/dashboard-ui/dashboard-shell";
import { StatusBadge } from "@/components/dashboard-ui/status-badge";
import { ServiceActionsCell } from "./service-actions-cell";
import { prisma } from "@/lib/db";

const DEMO_SERVICES = [
  { id: "demo-svc-discovery", name: "Discovery call",        slug: "discovery-call",        description: "Qualifier le besoin, le budget et la prochaine etape.",                  durationMin: 30, priceCents: null as number | null, isActive: true,  createdAt: new Date("2025-01-10") },
  { id: "demo-svc-sprint",    name: "Implementation sprint", slug: "implementation-sprint", description: "Planifier une livraison avec livrables et criteres de test.",            durationMin: 60, priceCents: 25000 as number | null, isActive: true,  createdAt: new Date("2025-01-12") },
  { id: "demo-svc-suivi",     name: "Suivi mensuel",         slug: "suivi-mensuel",         description: "Point mensuel sur les KPIs et priorites.",                              durationMin: 45, priceCents: 9900 as number | null,  isActive: false, createdAt: new Date("2025-01-20") },
];

async function getServices() {
  try {
    return await prisma.service.findMany({ orderBy: { createdAt: "desc" }, take: 25 });
  } catch {
    return [];
  }
}

function formatPrice(priceCents: number | null) {
  if (!priceCents) return "Gratuit";
  return `${(priceCents / 100).toFixed(0)} $`;
}

export default async function DashboardServicesPage() {
  const dbServices = await getServices();
  const services = dbServices.length > 0 ? dbServices : DEMO_SERVICES;

  return (
    <main className="grid gap-6 px-6 py-10">
      <DashboardPageHeader
        title="Services"
        description="Configure les offres reservables avec duree, prix et description."
      />

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        {/* Create form */}
        <Card>
          <CardHeader>
            <CardTitle>Creer un service</CardTitle>
            <CardDescription>Le slug est genere depuis le nom si laisse vide.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createService} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nom</Label>
                <Input id="name" name="name" placeholder="Discovery call" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" name="slug" placeholder="discovery-call" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Bref descriptif client" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="durationMin">Duree (minutes)</Label>
                  <Input id="durationMin" name="durationMin" type="number" min={5} defaultValue={30} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priceCents">Prix (centimes)</Label>
                  <Input id="priceCents" name="priceCents" type="number" min={0} placeholder="12500" />
                </div>
              </div>
              <Button type="submit">
                <PlusCircle className="h-4 w-4" />
                Ajouter un service
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Services table */}
        <Card>
          <CardHeader>
            <CardTitle>Services</CardTitle>
            <CardDescription>{services.length} service(s) configure(s).</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Duree</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-muted-foreground">
                      Aucun service. Lance Postgres puis ajoute le premier service.
                    </TableCell>
                  </TableRow>
                ) : (
                  services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{service.name}</p>
                          {service.description && (
                            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                              {service.description}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="tabular-nums">{service.durationMin} min</TableCell>
                      <TableCell>{formatPrice(service.priceCents)}</TableCell>
                      <TableCell>
                        <StatusBadge
                          status={service.isActive ? "active" : "inactive"}
                          label={service.isActive ? "Actif" : "Inactif"}
                          dot
                        />
                      </TableCell>
                      <TableCell>
                        <ServiceActionsCell
                          service={{
                            id: service.id,
                            name: service.name,
                            slug: service.slug,
                            description: service.description ?? "",
                            durationMin: service.durationMin,
                            priceCents: service.priceCents,
                            isActive: service.isActive,
                          }}
                          updateAction={updateService}
                          deactivateAction={deactivateService}
                        />
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
