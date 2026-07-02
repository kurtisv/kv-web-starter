import { CheckCircle2, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

interface Package {
  id: string;
  name: string;
  priceCents: number;
  sessions: number;
  validDays: number;
  serviceIds: string[];
}

interface PackageCardProps {
  packages: Package[];
  serviceNames?: Record<string, string>;
  className?: string;
}

export function PackageCard({ packages, serviceNames = {}, className }: PackageCardProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
      {packages.map((pkg) => (
        <div key={pkg.id} className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Gift className="h-4 w-4" />
            </div>
            <span className="text-xl font-bold">
              {(pkg.priceCents / 100).toFixed(0)} EUR
            </span>
          </div>
          <p className="mt-3 font-semibold">{pkg.name}</p>
          <p className="text-xs text-muted-foreground">
            {pkg.sessions} seance{pkg.sessions > 1 ? "s" : ""} &mdash; valable {pkg.validDays} jours
          </p>
          <div className="mt-3 space-y-1">
            {pkg.serviceIds.slice(0, 3).map((sId) => (
              <p key={sId} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                {serviceNames[sId] ?? sId}
              </p>
            ))}
            {pkg.serviceIds.length > 3 && (
              <p className="text-xs text-muted-foreground pl-[18px]">
                +{pkg.serviceIds.length - 3} service{pkg.serviceIds.length - 3 > 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
