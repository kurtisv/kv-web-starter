"use client";
import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  value,
  onValueChange,
  options,
  placeholder = "Choisir...",
  disabled,
  className,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(-1);
  const ref = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listboxId = React.useId();

  const selected = options.find((o) => o.value === value);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setFocused(options.findIndex((o) => o.value === value));
        return;
      }
      const opt = options[focused];
      if (opt && !opt.disabled) {
        onValueChange?.(opt.value);
        setOpen(false);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      setFocused((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocused((i) => Math.max(i - 1, 0));
    } else if (e.key === "Escape") {
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        disabled={disabled}
        onClick={() => {
          setOpen((o) => !o);
          setFocused(options.findIndex((o) => o.value === value));
        }}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex h-10 w-full items-center justify-between border border-border bg-background px-3 text-sm outline-none",
          "transition-colors focus:border-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",
          !selected && "text-muted-foreground"
        )}
      >
        <span className="truncate">{selected?.label ?? placeholder}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-150",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute z-50 mt-1 w-full border border-border bg-background shadow-md"
        >
          <div className="max-h-60 overflow-y-auto py-1">
            {options.map((opt, i) => (
              <div
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                onClick={() => {
                  if (opt.disabled) return;
                  onValueChange?.(opt.value);
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                onMouseEnter={() => setFocused(i)}
                className={cn(
                  "flex cursor-pointer items-center gap-2 px-3 py-2 text-sm",
                  i === focused && "bg-muted",
                  opt.disabled && "cursor-not-allowed opacity-40"
                )}
              >
                <Check
                  className={cn(
                    "h-4 w-4 shrink-0",
                    opt.value === value ? "opacity-100" : "opacity-0"
                  )}
                />
                {opt.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
