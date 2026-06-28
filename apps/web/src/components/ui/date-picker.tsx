"use client";
import * as React from "react";
import {
  startOfMonth, endOfMonth,
  startOfWeek, endOfWeek,
  eachDayOfInterval,
  isSameDay, isSameMonth,
  addMonths, subMonths,
  getMonth, getYear, getDate,
} from "date-fns";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const MONTHS_FR = [
  "Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre",
];
const DAYS_FR = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  format?: (date: Date) => string;
  className?: string;
  id?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Choisir une date",
  disabled,
  minDate,
  maxDate,
  format: formatFn,
  className,
  id,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [viewDate, setViewDate] = React.useState(value ?? new Date());
  const ref = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!value) return;
    const timer = window.setTimeout(() => setViewDate(value), 0);
    return () => window.clearTimeout(timer);
  }, [value]);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); triggerRef.current?.focus(); }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [open]);

  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  const displayValue = value
    ? formatFn
      ? formatFn(value)
      : `${String(getDate(value)).padStart(2, "0")}/${String(getMonth(value) + 1).padStart(2, "0")}/${getYear(value)}`
    : null;

  const isDisabledDay = (day: Date) =>
    (minDate != null && day < minDate) || (maxDate != null && day > maxDate);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-10 w-full items-center gap-2 border border-border bg-background px-3 text-sm outline-none",
          "transition-colors focus:border-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",
          !value && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="truncate">{displayValue ?? placeholder}</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Calendrier"
          className="absolute z-50 mt-1 border border-border bg-background p-3 shadow-md w-64"
        >
          {/* Month navigation */}
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              aria-label="Mois precedent"
              onClick={() => setViewDate((d) => subMonths(d, 1))}
              className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium">
              {MONTHS_FR[getMonth(viewDate)]} {getYear(viewDate)}
            </span>
            <button
              type="button"
              aria-label="Mois suivant"
              onClick={() => setViewDate((d) => addMonths(d, 1))}
              className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Day headers */}
          <div className="mb-1 grid grid-cols-7">
            {DAYS_FR.map((d) => (
              <div key={d} className="py-1 text-center text-xs text-muted-foreground">
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-px">
            {days.map((day) => {
              const isSelected = value ? isSameDay(day, value) : false;
              const isThisMonth = isSameMonth(day, viewDate);
              const isToday = isSameDay(day, new Date());
              const dayDisabled = isDisabledDay(day);

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  disabled={dayDisabled}
                  onClick={() => {
                    onChange?.(day);
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  className={cn(
                    "h-8 w-full text-xs transition-colors outline-none",
                    isThisMonth ? "text-foreground" : "text-muted-foreground opacity-40",
                    isSelected && "bg-primary text-primary-foreground",
                    !isSelected && isToday && "border border-primary font-medium",
                    !isSelected && !dayDisabled && isThisMonth && "hover:bg-muted",
                    dayDisabled && "cursor-not-allowed opacity-30"
                  )}
                >
                  {getDate(day)}
                </button>
              );
            })}
          </div>

          {/* Today shortcut */}
          <button
            type="button"
            onClick={() => {
              const today = new Date();
              setViewDate(today);
              if (!isDisabledDay(today)) {
                onChange?.(today);
                setOpen(false);
                triggerRef.current?.focus();
              }
            }}
            className="mt-2 w-full py-1 text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Aujourd&apos;hui
          </button>
        </div>
      )}
    </div>
  );
}
