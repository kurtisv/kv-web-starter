import { CalendarOff, Clock3, PlusCircle } from "lucide-react";

import {
  createAvailabilityException,
  createAvailabilityRule,
  deleteAvailabilityException,
  deleteAvailabilityRule,
  updateAvailabilityException,
  updateAvailabilityRule,
} from "@/app/actions/booking";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormCheckbox, FormSelect } from "@/components/ui/form-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/db";

const weekdays = [
  { value: 0, label: "Dimanche" },
  { value: 1, label: "Lundi" },
  { value: 2, label: "Mardi" },
  { value: 3, label: "Mercredi" },
  { value: 4, label: "Jeudi" },
  { value: 5, label: "Vendredi" },
  { value: 6, label: "Samedi" },
];

const weekdayOptions = weekdays.map((day) => ({
  value: String(day.value),
  label: day.label,
}));

const DEMO_STAFF_AVAIL = [
  { id: "demo-staff-marie", name: "Marie Tremblay" },
  { id: "demo-staff-alex", name: "Alex Gagnon" },
];

const DEMO_RULES = [
  { id: "demo-rule-mon", staffId: "demo-staff-marie", weekday: 1, startTime: "09:00", endTime: "17:00", timezone: "America/Toronto", createdAt: new Date("2025-01-15") },
  { id: "demo-rule-wed", staffId: "demo-staff-marie", weekday: 3, startTime: "09:00", endTime: "17:00", timezone: "America/Toronto", createdAt: new Date("2025-01-15") },
  { id: "demo-rule-fri", staffId: "demo-staff-alex", weekday: 5, startTime: "10:00", endTime: "16:00", timezone: "America/Toronto", createdAt: new Date("2025-02-01") },
];

const DEMO_EXCEPTIONS = [
  { id: "demo-exc-noel", staffId: "demo-staff-marie", date: new Date("2025-12-25"), startTime: null as string | null, endTime: null as string | null, isClosed: true, createdAt: new Date("2025-01-15") },
];

async function getAvailabilityData() {
  try {
    const [staff, rules, exceptions] = await Promise.all([
      prisma.staff.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
        select: { id: true, name: true },
      }),
      prisma.availabilityRule.findMany({
        orderBy: [{ weekday: "asc" }, { startTime: "asc" }],
        take: 50,
      }),
      prisma.availabilityException.findMany({
        orderBy: { date: "desc" },
        take: 50,
      }),
    ]);

    if (staff.length > 0 || rules.length > 0 || exceptions.length > 0) {
      return { staff, rules, exceptions };
    }
    return { staff: DEMO_STAFF_AVAIL, rules: DEMO_RULES, exceptions: DEMO_EXCEPTIONS };
  } catch {
    return { staff: DEMO_STAFF_AVAIL, rules: DEMO_RULES, exceptions: DEMO_EXCEPTIONS };
  }
}

export default async function DashboardAvailabilityPage() {
  const { staff, rules, exceptions } = await getAvailabilityData();
  const staffOptions = staff.map((member) => ({
    value: member.id,
    label: member.name,
  }));

  return (
    <main className="grid gap-6 px-6 py-10">
      <div>
        <h1 className="text-3xl font-semibold">Disponibilites</h1>
        <p className="mt-3 text-muted-foreground">
          Configure les horaires hebdomadaires et les exceptions de fermeture.
        </p>
      </div>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock3 className="size-5" />
              Regle hebdomadaire
            </CardTitle>
            <CardDescription>Ajoute une plage recurrente pour un membre du staff.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createAvailabilityRule} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="rule-staff">Intervenant</Label>
                <FormSelect
                  id="rule-staff"
                  name="staffId"
                  options={staffOptions}
                  placeholder="Choisir un intervenant"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="weekday">Jour de la semaine</Label>
                <FormSelect
                  id="weekday"
                  name="weekday"
                  defaultValue={1}
                  options={weekdayOptions}
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="grid gap-2">
                  <Label htmlFor="startTime">Debut</Label>
                  <Input id="startTime" name="startTime" type="time" defaultValue="09:00" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endTime">Fin</Label>
                  <Input id="endTime" name="endTime" type="time" defaultValue="17:00" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <Input id="timezone" name="timezone" defaultValue="America/Toronto" required />
                </div>
              </div>
              <Button type="submit">
                <PlusCircle className="size-4" />
                Ajouter une regle
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarOff className="size-5" />
              Exception de fermeture
            </CardTitle>
            <CardDescription>Ajoute un conge complet ou une plage indisponible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createAvailabilityException} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="exception-staff">Intervenant</Label>
                <FormSelect
                  id="exception-staff"
                  name="staffId"
                  options={staffOptions}
                  placeholder="Choisir un intervenant"
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" type="date" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="exceptionStart">Debut</Label>
                  <Input id="exceptionStart" name="startTime" type="time" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="exceptionEnd">Fin</Label>
                  <Input id="exceptionEnd" name="endTime" type="time" />
                </div>
              </div>
              <FormCheckbox id="create-is-closed" label="Ferie toute la journee" name="isClosed" />
              <Button type="submit">
                <PlusCircle className="size-4" />
                Ajouter une exception
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Regles hebdomadaires</CardTitle>
            <CardDescription>{rules.length} regle(s) configuree(s).</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Intervenant</TableHead>
                  <TableHead>Jour</TableHead>
                  <TableHead>Horaire</TableHead>
                  <TableHead>Fuseau</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell>
                      <form id={`rule-${rule.id}`} action={updateAvailabilityRule}>
                        <input type="hidden" name="ruleId" value={rule.id} />
                        <FormSelect
                          name="staffId"
                          defaultValue={rule.staffId}
                          options={staffOptions}
                          required
                        />
                      </form>
                    </TableCell>
                    <TableCell>
                      <FormSelect
                        form={`rule-${rule.id}`}
                        name="weekday"
                        defaultValue={rule.weekday}
                        options={weekdayOptions}
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <Input form={`rule-${rule.id}`} name="startTime" type="time" defaultValue={rule.startTime} required />
                        <Input form={`rule-${rule.id}`} name="endTime" type="time" defaultValue={rule.endTime} required />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="grid gap-2">
                        <Input form={`rule-${rule.id}`} name="timezone" defaultValue={rule.timezone} required />
                        <div className="flex gap-2">
                          <Button form={`rule-${rule.id}`} type="submit" size="sm" variant="secondary">
                            Sauvegarder
                          </Button>
                          <form action={deleteAvailabilityRule}>
                            <input type="hidden" name="ruleId" value={rule.id} />
                            <Button type="submit" size="sm" variant="ghost">
                              Supprimer
                            </Button>
                          </form>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {rules.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-muted-foreground">
                      Aucune regle. Ajoute un staff, puis une disponibilite.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exceptions</CardTitle>
            <CardDescription>{exceptions.length} exception(s) configuree(s).</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Intervenant</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Horaire</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exceptions.map((exception) => (
                  <TableRow key={exception.id}>
                    <TableCell>
                      <form id={`exception-${exception.id}`} action={updateAvailabilityException}>
                        <input type="hidden" name="exceptionId" value={exception.id} />
                        <FormSelect
                          name="staffId"
                          defaultValue={exception.staffId}
                          options={staffOptions}
                          required
                        />
                      </form>
                    </TableCell>
                    <TableCell>
                      <Input
                        form={`exception-${exception.id}`}
                        name="date"
                        type="date"
                        defaultValue={exception.date.toISOString().slice(0, 10)}
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <Input
                          form={`exception-${exception.id}`}
                          name="startTime"
                          type="time"
                          defaultValue={exception.startTime ?? ""}
                        />
                        <Input
                          form={`exception-${exception.id}`}
                          name="endTime"
                          type="time"
                          defaultValue={exception.endTime ?? ""}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="grid gap-2">
                        <FormCheckbox
                          defaultChecked={exception.isClosed}
                          form={`exception-${exception.id}`}
                          id={`exception-${exception.id}-closed`}
                          label="Ferie"
                          name="isClosed"
                        />
                        <div className="flex gap-2">
                          <Button form={`exception-${exception.id}`} type="submit" size="sm" variant="secondary">
                            Sauvegarder
                          </Button>
                          <form action={deleteAvailabilityException}>
                            <input type="hidden" name="exceptionId" value={exception.id} />
                            <Button type="submit" size="sm" variant="ghost">
                              Supprimer
                            </Button>
                          </form>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {exceptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-muted-foreground">
                      Aucune exception configuree.
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
