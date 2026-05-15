import { CalendarOff, Clock3, PlusCircle } from "lucide-react";

import { createAvailabilityException, createAvailabilityRule } from "@/app/actions/booking";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/db";

const weekdays = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
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

    return { staff, rules, exceptions };
  } catch {
    return { staff: [], rules: [], exceptions: [] };
  }
}

function getStaffName(staff: { id: string; name: string }[], staffId: string) {
  return staff.find((member) => member.id === staffId)?.name ?? staffId;
}

export default async function DashboardAvailabilityPage() {
  const { staff, rules, exceptions } = await getAvailabilityData();

  return (
    <main className="grid gap-6 px-6 py-10">
      <div>
        <h1 className="text-3xl font-semibold">Availability</h1>
        <p className="mt-3 text-muted-foreground">
          Configure les horaires hebdomadaires et les exceptions de fermeture.
        </p>
      </div>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock3 className="size-5" />
              Weekly rule
            </CardTitle>
            <CardDescription>Ajoute une plage recurrente pour un membre du staff.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createAvailabilityRule} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="rule-staff">Staff</Label>
                <select
                  id="rule-staff"
                  name="staffId"
                  className="h-10 border border-border bg-background px-3 text-sm"
                  required
                >
                  <option value="">Select staff</option>
                  {staff.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="weekday">Weekday</Label>
                <select
                  id="weekday"
                  name="weekday"
                  className="h-10 border border-border bg-background px-3 text-sm"
                  defaultValue={1}
                  required
                >
                  {weekdays.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="grid gap-2">
                  <Label htmlFor="startTime">Start</Label>
                  <Input id="startTime" name="startTime" type="time" defaultValue="09:00" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endTime">End</Label>
                  <Input id="endTime" name="endTime" type="time" defaultValue="17:00" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" name="timezone" defaultValue="America/Toronto" required />
                </div>
              </div>
              <Button type="submit">
                <PlusCircle className="size-4" />
                Add rule
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarOff className="size-5" />
              Exception
            </CardTitle>
            <CardDescription>Ajoute un conge complet ou une plage indisponible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createAvailabilityException} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="exception-staff">Staff</Label>
                <select
                  id="exception-staff"
                  name="staffId"
                  className="h-10 border border-border bg-background px-3 text-sm"
                  required
                >
                  <option value="">Select staff</option>
                  {staff.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" type="date" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="exceptionStart">Start</Label>
                  <Input id="exceptionStart" name="startTime" type="time" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="exceptionEnd">End</Label>
                  <Input id="exceptionEnd" name="endTime" type="time" />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input name="isClosed" type="checkbox" />
                Closed all day
              </label>
              <Button type="submit">
                <PlusCircle className="size-4" />
                Add exception
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly rules</CardTitle>
            <CardDescription>{rules.length} configured rule(s).</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff</TableHead>
                  <TableHead>Day</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Timezone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell>{getStaffName(staff, rule.staffId)}</TableCell>
                    <TableCell>{weekdays.find((day) => day.value === rule.weekday)?.label}</TableCell>
                    <TableCell>
                      {rule.startTime} - {rule.endTime}
                    </TableCell>
                    <TableCell>{rule.timezone}</TableCell>
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
            <CardDescription>{exceptions.length} configured exception(s).</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exceptions.map((exception) => (
                  <TableRow key={exception.id}>
                    <TableCell>{getStaffName(staff, exception.staffId)}</TableCell>
                    <TableCell>{exception.date.toISOString().slice(0, 10)}</TableCell>
                    <TableCell>
                      {exception.startTime && exception.endTime
                        ? `${exception.startTime} - ${exception.endTime}`
                        : "-"}
                    </TableCell>
                    <TableCell>{exception.isClosed ? "Closed" : "Blocked"}</TableCell>
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
