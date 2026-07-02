import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/dashboard-ui/status-badge";
import { DEMO_METERING_EVENTS } from "@/lib/demo-data/saas-demo-data";

export function MeteringEventsTable() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Evenements de metering</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm" aria-label="Evenements de metering recents">
            <thead>
              <tr className="border-b text-left text-xs text-muted-foreground">
                <th className="px-6 py-2.5 font-medium">Horodatage</th>
                <th className="px-4 py-2.5 font-medium">Evenement</th>
                <th className="px-4 py-2.5 font-medium">Quantite</th>
                <th className="px-4 py-2.5 font-medium hidden sm:table-cell">Endpoint</th>
                <th className="px-4 py-2.5 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {DEMO_METERING_EVENTS.map((e) => (
                <tr key={e.id} className="hover:bg-muted/30">
                  <td className="whitespace-nowrap px-6 py-2 font-mono text-xs text-muted-foreground">{e.ts}</td>
                  <td className="px-4 py-2 text-xs font-medium">{e.event}</td>
                  <td className="px-4 py-2 text-xs tabular-nums">{e.qty.toLocaleString("fr-FR")}</td>
                  <td className="px-4 py-2 text-xs text-muted-foreground hidden sm:table-cell font-mono">{e.endpoint}</td>
                  <td className="px-4 py-2">
                    <StatusBadge
                      status={e.status === "success" ? "active" : "error"}
                      label={e.status === "success" ? "OK" : "Erreur"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
