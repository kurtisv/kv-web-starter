import * as React from "react";
import { Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ServiceOption {
  id: string;
  name: string;
  durationMin: number;
  priceCents: number | null;
  description?: string | null;
}

interface ServicePickerProps {
  services: ServiceOption[];
  selectedId: string;
  formId: string;
  className?: string;
}

function formatPrice(priceCents: number | null) {
  if (!priceCents) return "Gratuit";
  return `${(priceCents / 100).toFixed(0)} $`;
}

export function ServicePicker({ services, selectedId, formId, className }: ServicePickerProps) {
  return (
    <div className={cn("grid gap-3", className)} role="radiogroup" aria-label="Services disponibles">
      {services.map((service) => {
        const selected = service.id === selectedId;
        return (
          <label
            key={service.id}
            className={cn(
              "flex cursor-pointer items-start gap-3 border p-4 transition-colors",
              "hover:border-foreground/40",
              selected ? "border-foreground bg-foreground/5" : "border-border"
            )}
          >
            <input
              className="sr-only"
              type="radio"
              name="serviceId"
              value={service.id}
              defaultChecked={selected}
              form={formId}
            />
            {/* Custom radio dot */}
            <span
              className={cn(
                "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                selected ? "border-foreground" : "border-muted-foreground"
              )}
              aria-hidden
            >
              {selected && <span className="h-2 w-2 rounded-full bg-foreground" />}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium leading-tight">{service.name}</span>
                <span className="shrink-0 text-sm font-medium">{formatPrice(service.priceCents)}</span>
              </div>
              {service.description && (
                <p className="mt-0.5 text-sm text-muted-foreground">{service.description}</p>
              )}
              <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                <Clock3 className="h-3 w-3" />
                {service.durationMin} min
              </div>
            </div>
          </label>
        );
      })}
    </div>
  );
}
