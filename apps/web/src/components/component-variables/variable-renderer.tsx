"use client";

import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useVariable } from "@/lib/component-variables/react";
import type { ComponentVariable } from "@/lib/component-variables";
import type { SelectOption } from "@/lib/component-variables/factories";

interface VariableRendererProps {
  variable: ComponentVariable;
  className?: string;
}

/**
 * Generic renderer: picks the right UI primitive based on variable metadata.
 * Supports: select, text, number, boolean, viewMode, sliderRange.
 * Falls back to text input for unknown types.
 * If the variable defines its own `render` fn, delegates to it.
 */
export function VariableRenderer({ variable, className }: VariableRendererProps) {
  const { value, onChange, error, isVisible, isDisabled } = useVariable(variable.id);

  if (!isVisible) return null;

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

  // Select
  if (options && typeof value === "string") {
    return (
      <div className={cn("min-w-36", className)}>
        <Select
          value={value as string}
          onValueChange={(v) => onChange(v)}
          options={options}
          placeholder={variable.label}
          disabled={isDisabled}
          className={cn(value && value !== (variable.defaultValue as string) && "border-foreground")}
        />
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </div>
    );
  }

  // Boolean (toggle / checkbox)
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
