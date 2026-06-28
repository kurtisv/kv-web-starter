"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  options: RadioOption[];
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "card";
  name?: string;
  className?: string;
}

export function RadioGroup({
  value,
  onValueChange,
  options,
  orientation = "vertical",
  variant = "default",
  name,
  className,
}: RadioGroupProps) {
  const generatedName = React.useId();
  const groupName = name ?? generatedName;

  if (variant === "card") {
    return (
      <div
        role="radiogroup"
        className={cn(
          "grid gap-2",
          orientation === "horizontal" && "grid-flow-col auto-cols-fr",
          className
        )}
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className={cn(
              "flex cursor-pointer items-start gap-3 border p-3 transition-colors",
              value === opt.value
                ? "border-primary bg-accent/40"
                : "border-border hover:bg-muted/50",
              opt.disabled && "cursor-not-allowed opacity-50"
            )}
          >
            <RadioDot selected={opt.value === value} />
            <div>
              <input
                type="radio"
                name={groupName}
                value={opt.value}
                checked={opt.value === value}
                onChange={() => !opt.disabled && onValueChange?.(opt.value)}
                className="sr-only"
              />
              <span className="text-sm font-medium">{opt.label}</span>
              {opt.description && (
                <p className="text-xs text-muted-foreground mt-0.5">{opt.description}</p>
              )}
            </div>
          </label>
        ))}
      </div>
    );
  }

  return (
    <div
      role="radiogroup"
      className={cn(
        "grid gap-2",
        orientation === "horizontal" && "grid-flow-col auto-cols-auto",
        className
      )}
    >
      {options.map((opt) => (
        <label
          key={opt.value}
          className={cn(
            "flex cursor-pointer items-start gap-3",
            opt.disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <RadioDot selected={opt.value === value} className="mt-0.5" />
          <div>
            <input
              type="radio"
              name={groupName}
              value={opt.value}
              checked={opt.value === value}
              onChange={() => !opt.disabled && onValueChange?.(opt.value)}
              className="sr-only"
            />
            <span className="text-sm font-medium">{opt.label}</span>
            {opt.description && (
              <p className="text-xs text-muted-foreground mt-0.5">{opt.description}</p>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}

function RadioDot({ selected, className }: { selected: boolean; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
        selected ? "border-primary" : "border-border",
        className
      )}
    >
      {selected && <span className="h-2 w-2 rounded-full bg-primary" />}
    </span>
  );
}
