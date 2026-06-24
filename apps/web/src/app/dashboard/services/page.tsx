import { PlusCircle } from "lucide-react";

import { createService, deactivateService, updateService } from "@/app/actions/booking";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/db";

const DEMO_SERVICES = [
  { id: "demo-svc-discovery", name: "Discovery call", slug: "discovery-call", description: "Qualifier le besoin, le budget et la prochaine etape.", durationMin: 30, priceCents: null as number | null, isActive: true, createdAt: new Date("2025-01-10") },
  { id: "demo-svc-sprint", name: "Implementation sprint", slug: "implementation-sprint", description: "Planifier une livraison avec livrables et criteres de test.", durationMin: 60, priceCents: 25000 as number | null, isActive: true, createdAt: new Date("2025-01-12") },
  { id: "demo-svc-suivi", name: "Suivi mensuel", slug: "suivi-mensuel", description: "Point mensuel sur les KPIs et priorites.", durationMin: 45, priceCents: 9900 as number | null, isActive: true, createdAt: new Date("2025-01-20") },
];

async function getServices() {
  try {
    return await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
      take: 25,
    });
  } catch {
    return [];
  }
}

export default async function DashboardServicesPage() {
  const dbServices = await getServices();
  const services = dbServices.length > 0 ? dbServices : DEMO_SERVICES;

  return (
    <main className="grid gap-6 px-6 py-10">
      <div>
        <h1 className="text-3xl font-semibold">Services</h1>
        <p className="mt-3 text-muted-foreground">
          Configure les offres reservables avec duree, prix et description.
        </p>
      </div>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
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
                <PlusCircle className="size-4" />
                Ajouter un service
              </Button>
            </form>
          </CardContent>
        </Card>

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
                  <TableHead>Slug</TableHead>
                  <TableHead>Duree</TableHead>
                  <TableHead>Prix</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <form id={`service-${service.id}`} action={updateService} className="grid gap-2">
                        <input type="hidden" name="serviceId" value={service.id} />
                        <Input name="name" defaultValue={service.name} required />
                        <Textarea name="description" defaultValue={service.description ?? ""} />
                      </form>
                    </TableCell>
                    <TableCell>
                      <Input form={`service-${service.id}`} name="slug" defaultValue={service.slug} required />
                    </TableCell>
                    <TableCell>
                      <Input
                        form={`service-${service.id}`}
                        name="durationMin"
                        type="number"
                        min={5}
                        defaultValue={service.durationMin}
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <div className="grid gap-2">
                        <Input
                          form={`service-${service.id}`}
                          name="priceCents"
                          type="number"
                          min={0}
                          defaultValue={service.priceCents ?? ""}
                        />
                        <div className="flex gap-2">
                          <Button form={`service-${service.id}`} type="submit" size="sm" variant="secondary">
                            Sauvegarder
                          </Button>
                          <form action={deactivateService}>
                            <input type="hidden" name="serviceId" value={service.id} />
                            <Button type="submit" size="sm" variant="ghost">
                              Desactiver
                            </Button>
                          </form>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {services.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-muted-foreground">
                      Aucun service pour l instant. Lance Postgres puis ajoute le premier service.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
