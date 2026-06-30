"use client";

import { Search, X } from "lucide-react";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useVariable } from "@/lib/component-variables/react";
import type { ComponentVariable } from "@/lib/component-variables";
import type { SelectOption, SliderRangeValue, SortValue, DateRangeValue } from "@/lib/component-variables/factories";

interface VariableRendererProps {
  variable: ComponentVariable;
  className?: string;
}

// ── SliderRange renderer (min/max inputs + visual track) ──────────────────────
function SliderRangeRenderer({
  variable,
  value,
  onChange,
  error,
  isDisabled,
  className,
}: {
  variable: ComponentVariable;
  value: SliderRangeValue;
  onChange: (v: SliderRangeValue) => void;
  error: string | null;
  isDisabled: boolean;
  className?: string;
}) {
  const meta = variable.metadata as {
    min: number;
    max: number;
    step?: number;
    format?: (v: number) => string;
  };

  const absMin = meta.min ?? 0;
  const absMax = meta.max ?? 100;
  const step = meta.step ?? 1;
  const fmt = meta.format ?? String;

  const minPct = ((value.min - absMin) / (absMax - absMin)) * 100;
  const maxPct = ((value.max - absMin) / (absMax - absMin)) * 100;

  return (
    <div className={cn("flex flex-col gap-2 min-w-52", className)}>
      <span className="text-xs text-muted-foreground">{variable.label}</span>

      {/* Visual range track */}
      <div className="relative h-1.5 w-full rounded-full bg-border">
        <div
          className="absolute h-full rounded-full bg-foreground"
          style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
        />
        {/* Min thumb */}
        <input
          type="range"
          min={absMin}
          max={absMax}
          step={step}
          value={value.min}
          disabled={isDisabled}
          aria-label={`${variable.label} minimum`}
          onChange={(e) => {
            const next = Number(e.target.value);
            if (next <= value.max) onChange({ min: next, max: value.max });
          }}
          className="pointer-events-none absolute inset-0 h-full w-full appearance-none opacity-0"
        />
        {/* Max thumb */}
        <input
          type="range"
          min={absMin}
          max={absMax}
          step={step}
          value={value.max}
          disabled={isDisabled}
          aria-label={`${variable.label} maximum`}
          onChange={(e) => {
            const next = Number(e.target.value);
            if (next >= value.min) onChange({ min: value.min, max: next });
          }}
          className="pointer-events-none absolute inset-0 h-full w-full appearance-none opacity-0"
        />
      </div>

      {/* Min / Max inputs */}
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={value.min}
          min={absMin}
          max={value.max}
          step={step}
          disabled={isDisabled}
          aria-label={`${variable.label} min`}
          onChange={(e) => {
            const next = Number(e.target.value);
            if (next <= value.max && next >= absMin) onChange({ min: next, max: value.max });
          }}
          className="h-8 w-24 text-xs"
        />
        <span className="text-xs text-muted-foreground">–</span>
        <Input
          type="number"
          value={value.max}
          min={value.min}
          max={absMax}
          step={step}
          disabled={isDisabled}
          aria-label={`${variable.label} max`}
          onChange={(e) => {
            const next = Number(e.target.value);
            if (next >= value.min && next <= absMax) onChange({ min: value.min, max: next });
          }}
          className="h-8 w-24 text-xs"
        />
        {(value.min !== absMin || value.max !== absMax) && (
          <span className="text-[10px] text-muted-foreground whitespace-nowrap">
            {fmt(value.min)} – {fmt(value.max)}
          </span>
        )}
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

// ── Sort renderer (field select + direction toggle) ───────────────────────────
function SortRenderer({
  variable,
  value,
  onChange,
  error,
  isDisabled,
  className,
}: {
  variable: ComponentVariable;
  value: SortValue;
  onChange: (v: SortValue) => void;
  error: string | null;
  isDisabled: boolean;
  className?: string;
}) {
  const meta = variable.metadata as { fields?: SelectOption[] };
  const fields = meta.fields ?? [];

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="min-w-36">
        <Select
          value={value.field}
          onValueChange={(f) => onChange({ ...value, field: f })}
          options={fields}
          placeholder={variable.label}
          disabled={isDisabled}
        />
      </div>
      <button
        type="button"
        onClick={() => onChange({ ...value, direction: value.direction === "asc" ? "desc" : "asc" })}
        disabled={isDisabled}
        aria-label={value.direction === "asc" ? "Croissant" : "Decroissant"}
        className="flex h-9 w-9 items-center justify-center border border-border bg-background text-xs text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
      >
        {value.direction === "asc" ? "↑" : "↓"}
      </button>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

// ── DateRange renderer (two date inputs) ─────────────────────────────────────
function DateRangeRenderer({
  variable,
  value,
  onChange,
  error,
  isDisabled,
  className,
}: {
  variable: ComponentVariable;
  value: DateRangeValue;
  onChange: (v: DateRangeValue) => void;
  error: string | null;
  isDisabled: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1 min-w-48", className)}>
      <span className="text-xs text-muted-foreground">{variable.label}</span>
      <div className="flex items-center gap-1">
        <Input
          type="date"
          value={value.from}
          max={value.to || undefined}
          disabled={isDisabled}
          aria-label={`${variable.label} du`}
          onChange={(e) => onChange({ ...value, from: e.target.value })}
          className="h-8 text-xs"
        />
        <span className="text-xs text-muted-foreground">–</span>
        <Input
          type="date"
          value={value.to}
          min={value.from || undefined}
          disabled={isDisabled}
          aria-label={`${variable.label} au`}
          onChange={(e) => onChange({ ...value, to: e.target.value })}
          className="h-8 text-xs"
        />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

// ── Main renderer — dispatches by type ────────────────────────────────────────
export function VariableRenderer({ variable, className }: VariableRendererProps) {
  const { value, onChange, error, isVisible, isDisabled } = useVariable(variable.id);

  if (!isVisible) return null;

  // Custom render fn overrides everything
  if (variable.render) {
    return (
      <div className={cn(className)}>
        {variable.render({ value, onChange, error, disabled: isDisabled })}
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </div>
    );
  }

  const meta = variable.metadata as Record<string, unknown> | undefined;
  const options = meta?.options as SelectOption[] | undefined;

  // SliderRange: value is { min, max }
  if (
    value !== null &&
    typeof value === "object" &&
    "min" in (value as object) &&
    "max" in (value as object)
  ) {
    return (
      <SliderRangeRenderer
        variable={variable}
        value={value as SliderRangeValue}
        onChange={onChange as (v: SliderRangeValue) => void}
        error={error}
        isDisabled={isDisabled}
        className={className}
      />
    );
  }

  // Sort: value is { field, direction }
  if (
    value !== null &&
    typeof value === "object" &&
    "field" in (value as object) &&
    "direction" in (value as object)
  ) {
    return (
      <SortRenderer
        variable={variable}
        value={value as SortValue}
        onChange={onChange as (v: SortValue) => void}
        error={error}
        isDisabled={isDisabled}
        className={className}
      />
    );
  }

  // DateRange: value is { from, to }
  if (
    value !== null &&
    typeof value === "object" &&
    "from" in (value as object) &&
    "to" in (value as object)
  ) {
    return (
      <DateRangeRenderer
        variable={variable}
        value={value as DateRangeValue}
        onChange={onChange as (v: DateRangeValue) => void}
        error={error}
        isDisabled={isDisabled}
        className={className}
      />
    );
  }

  // Select (single string value with options list)
  if (options && typeof value === "string") {
    const isActive = value && value !== (variable.defaultValue as string);
    return (
      <div className={cn("min-w-36", className)}>
        <Select
          value={value}
          onValueChange={(v) => onChange(v)}
          options={options}
          placeholder={variable.label}
          disabled={isDisabled}
          className={cn(isActive && "border-foreground")}
        />
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </div>
    );
  }

  // Boolean (checkbox)
  if (typeof variable.defaultValue === "boolean") {
    return (
      <label className={cn("flex cursor-pointer items-center gap-2 text-sm", className)}>
        <input
          type="checkbox"
          checked={value as boolean}
          onChange={(e) => onChange(e.target.checked)}
          disabled={isDisabled}
          className="h-4 w-4"
        />
        {variable.label}
        {error && <span className="text-xs text-destructive">{error}</span>}
      </label>
    );
  }

  // Number
  if (typeof variable.defaultValue === "number") {
    return (
      <div className={cn(className)}>
        <Input
          type="number"
          value={value as number}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={isDisabled}
          min={meta?.min as number | undefined}
          max={meta?.max as number | undefined}
          step={meta?.step as number | undefined}
          placeholder={variable.label}
          className="h-9"
        />
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </div>
    );
  }

  // Text — search-styled when variable.id is "search"
  if (variable.id === "search") {
    const strValue = value as string;
    return (
      <div className={cn("relative flex-1 min-w-48 max-w-xs", className)}>
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={strValue}
          onChange={(e) => onChange(e.target.value)}
          disabled={isDisabled}
          placeholder={(meta?.placeholder as string | undefined) ?? variable.label}
          maxLength={meta?.maxLength as number | undefined}
          className={cn(
            "h-9 w-full border border-border bg-background pl-8 pr-8 text-sm outline-none",
            "transition-colors focus:border-foreground placeholder:text-muted-foreground",
          )}
        />
        {strValue && (
          <button
            type="button"
            onClick={() => onChange("")}
            disabled={isDisabled}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </div>
    );
  }

  // Text (default)
  return (
    <div className={cn(className)}>
      <Input
        type="text"
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        disabled={isDisabled}
        placeholder={(meta?.placeholder as string | undefined) ?? variable.label}
        maxLength={meta?.maxLength as number | undefined}
        className="h-9"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
