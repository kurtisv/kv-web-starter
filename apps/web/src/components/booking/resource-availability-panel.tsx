import { cn } from "@/lib/utils";

interface Resource {
  id: string;
  name: string;
  type: string;
  capacity: number;
}

interface ResourceSlot {
  resourceId: string;
  time: string;
  available: boolean;
  bookedBy?: string;
}

interface ResourceAvailabilityPanelProps {
  resources: Resource[];
  slots: ResourceSlot[];
  className?: string;
}

const TIMES = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

export function ResourceAvailabilityPanel({ resources, slots, className }: ResourceAvailabilityPanelProps) {
  function getSlot(resourceId: string, time: string) {
    return slots.find((s) => s.resourceId === resourceId && s.time === time);
  }

  return (
    <div className={cn("rounded-xl border bg-card shadow-sm overflow-hidden", className)}>
      <div className="px-5 py-4 border-b">
        <p className="text-sm font-medium">Disponibilite des ressources</p>
        <p className="text-xs text-muted-foreground mt-0.5">Mercredi 1 juillet 2026</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="sticky left-0 bg-muted/30 px-4 py-2 text-left font-medium text-muted-foreground w-32">
                Ressource
              </th>
              {TIMES.map((t) => (
                <th key={t} className="px-3 py-2 text-center font-medium text-muted-foreground tabular-nums">
                  {t}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {resources.map((res) => (
              <tr key={res.id}>
                <td className="sticky left-0 bg-card px-4 py-2">
                  <p className="font-medium">{res.name}</p>
                  <p className="text-muted-foreground capitalize">{res.type} &middot; cap. {res.capacity}</p>
                </td>
                {TIMES.map((time) => {
                  const slot = getSlot(res.id, time);
                  const available = slot ? slot.available : true;
                  return (
                    <td key={time} className="px-3 py-2 text-center">
                      <span
                        className={cn(
                          "inline-flex h-7 w-7 items-center justify-center rounded-md text-xs font-medium",
                          available
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        )}
                        aria-label={`${res.name} a ${time}: ${available ? "disponible" : "occupe"}`}
                        title={slot?.bookedBy}
                      >
                        {available ? "D" : "O"}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-4 px-4 py-3 border-t text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-green-100 dark:bg-green-900/30" />
          Disponible
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-red-100 dark:bg-red-900/30" />
          Occupe
        </span>
      </div>
    </div>
  );
}
