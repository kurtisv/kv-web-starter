"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface CurrencyInputProps {
  value?: number;
  onChange?: (value: number | undefined) => void;
  currency?: string;
  locale?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  className?: string;
}

export function CurrencyInput({
  value,
  onChange,
  currency = "CAD",
  locale = "fr-CA",
  min,
  max,
  step = 0.01,
  disabled,
  placeholder = "0,00",
  id,
  className,
}: CurrencyInputProps) {
  const [raw, setRaw] = React.useState(value != null ? String(value) : "");

  // Sync external value changes
  React.useEffect(() => {
    if (value != null) setRaw(String(value));
    else setRaw("");
  }, [value]);

  const symbol = React.useMemo(() => {
    try {
      return (
        new Intl.NumberFormat(locale, {
          style: "currency",
          currency,
          maximumFractionDigits: 0,
        })
          .formatToParts(0)
          .find((p) => p.type === "currency")?.value ?? "$"
      );
    } catch {
      return "$";
    }
  }, [locale, currency]);

  const handleBlur = () => {
    const normalized = raw.replace(",", ".");
    const n = parseFloat(normalized);
    if (isNaN(n)) {
      setRaw(value != null ? String(value) : "");
      return;
    }
    const clamped =
      min != null
        ? Math.max(min, max != null ? Math.min(max, n) : n)
        : max != null
        ? Math.min(max, n)
        : n;
    const rounded = Math.round(clamped / step) * step;
    setRaw(String(rounded));
    onChange?.(rounded);
  };

  return (
    <div className={cn("relative", className)}>
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 select-none text-sm text-muted-foreground">
        {symbol}
      </span>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "flex h-10 w-full border border-border bg-background pl-8 pr-3 text-sm outline-none",
          "transition-colors focus:border-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      />
    </div>
  );
}
