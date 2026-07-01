import * as React from "react";
import { Clock3, User, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";
import type { ServiceOption } from "./service-picker";
import type { StaffOption } from "./staff-picker";

interface BookingSummaryCardProps {
  service: ServiceOption;
  staff?: StaffOption;
  date: string;
  className?: string;
}

function formatPrice(priceCents: number | null) {
  if (!priceCents) return "Gratuit";
  return `${(priceCents / 100).toFixed(0)} $`;
}

function formatDateLabel(dateStr: string) {
  return formatDate(dateStr, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BookingSummaryCard({ service, staff, date, className }: BookingSummaryCardProps) {
  return (
    <div className={cn("border bg-muted/20 p-4 text-sm", className)}>
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Recapitulatif
      </p>

      <div className="grid gap-2.5">
        {/* Service */}
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-foreground/10">
            <Clock3 className="h-3.5 w-3.5" />
          </div>
          <div>
            <p className="font-medium">{service.name}</p>
            <p className="text-xs text-muted-foreground">
              {service.durationMin} min &mdash; {formatPrice(service.priceCents)}
            </p>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-foreground/10">
            <CalendarDays className="h-3.5 w-3.5" />
          </div>
          <p className="capitalize">{formatDateLabel(date)}</p>
        </div>

        {/* Staff (only when multiple and named) */}
        {staff?.id && staff.name !== "Toute disponibilite" && (
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-foreground/10">
              <User className="h-3.5 w-3.5" />
            </div>
            <p>{staff.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}
