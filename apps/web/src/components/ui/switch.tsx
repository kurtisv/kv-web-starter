"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  size?: "sm" | "md";
  className?: string;
}

export function Switch({
  checked,
  onCheckedChange,
  disabled,
  id,
  size = "md",
  className,
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer items-center rounded-full",
        "border-2 border-transparent outline-none",
        "transition-colors duration-150 ease-in-out",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        size === "sm" ? "h-4 w-7" : "h-5 w-9",
        checked ? "bg-primary" : "bg-input",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block rounded-full bg-background shadow-sm",
          "transform transition-transform duration-150 ease-in-out",
          size === "sm" ? "h-3 w-3" : "h-4 w-4",
          size === "sm"
            ? checked ? "translate-x-3" : "translate-x-0"
            : checked ? "translate-x-4" : "translate-x-0"
        )}
      />
    </button>
  );
}

interface SwitchFieldProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label: string;
  description?: string;
  id?: string;
  className?: string;
}

export function SwitchField({
  checked,
  onCheckedChange,
  disabled,
  label,
  description,
  id,
  className,
}: SwitchFieldProps) {
  const fieldId = id ?? React.useId();
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div>
        <label htmlFor={fieldId} className="text-sm font-medium cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <Switch
        id={fieldId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
    </div>
  );
}
