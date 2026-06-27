"use client";
import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  checked?: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export function Checkbox({
  checked,
  onCheckedChange,
  disabled,
  id,
  className,
}: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      id={id}
      aria-checked={checked === "indeterminate" ? "mixed" : checked}
      disabled={disabled}
      onClick={() => onCheckedChange?.(checked !== true)}
      className={cn(
        "flex h-4 w-4 shrink-0 items-center justify-center border border-border bg-background",
        "outline-none transition-colors focus-visible:border-foreground focus-visible:ring-1 focus-visible:ring-ring",
        (checked === true || checked === "indeterminate") && "border-primary bg-primary",
        disabled && "cursor-not-allowed opacity-50",
        !disabled && "cursor-pointer",
        className
      )}
    >
      {checked === "indeterminate" ? (
        <Minus className="h-3 w-3 text-primary-foreground" strokeWidth={3} />
      ) : checked ? (
        <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />
      ) : null}
    </button>
  );
}

interface CheckboxFieldProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label: string;
  description?: string;
  id?: string;
  className?: string;
}

export function CheckboxField({
  checked,
  onCheckedChange,
  disabled,
  label,
  description,
  id,
  className,
}: CheckboxFieldProps) {
  const fieldId = id ?? React.useId();
  return (
    <label
      htmlFor={fieldId}
      className={cn(
        "flex cursor-pointer items-start gap-3",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <Checkbox
        id={fieldId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className="mt-0.5"
      />
      <div>
        <span className="text-sm font-medium">{label}</span>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
    </label>
  );
}
