"use client";

import * as React from "react";
import { CalendarDays, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface DateRangeValue {
  from?: string;
  to?: string;
}

interface DateRangeFilterProps {
  value?: DateRangeValue;
  onChange?: (value: DateRangeValue) => void;
  label?: string;
  className?: string;
}

export function DateRangeFilter({
  value,
  onChange,
  label = "Periode",
  className,
}: DateRangeFilterProps) {
  const from = value?.from ?? "";
  const to = value?.to ?? "";
  const active = Boolean(from || to);

  return (
    <div className={cn("grid gap-2", className)}>
      <div className="flex items-center gap-2 text-sm font-medium">
        <CalendarDays className="h-4 w-4 text-muted-foreground" />
        {label}
      </div>
      <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
        <Input
          type="date"
          aria-label="Date de debut"
          value={from}
          onChange={(event) => onChange?.({ from: event.target.value, to })}
        />
        <Input
          type="date"
          aria-label="Date de fin"
          value={to}
          onChange={(event) => onChange?.({ from, to: event.target.value })}
        />
        <Button
          type="button"
          variant="secondary"
          size="icon"
          aria-label="Effacer la periode"
          disabled={!active}
          onClick={() => onChange?.({})}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
