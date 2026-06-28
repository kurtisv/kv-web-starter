"use client";
import * as React from "react";
import { ChevronDown, X, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MultiSelectOption {
  value: string;
  label: string;
  group?: string;
}

interface MultiSelectProps {
  values?: string[];
  onValuesChange?: (values: string[]) => void;
  options: MultiSelectOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  maxDisplay?: number;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export function MultiSelect({
  values = [],
  onValuesChange,
  options,
  placeholder = "Choisir...",
  searchPlaceholder = "Rechercher...",
  maxDisplay = 3,
  disabled,
  id,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const ref = React.useRef<HTMLDivElement>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [open]);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 10);
    }
  }, [open]);

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (val: string) => {
    onValuesChange?.(
      values.includes(val) ? values.filter((v) => v !== val) : [...values, val]
    );
  };

  const removeTag = (val: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onValuesChange?.(values.filter((v) => v !== val));
  };

  const selectedLabels = values
    .map((v) => options.find((o) => o.value === v)?.label)
    .filter(Boolean) as string[];

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          setOpen((o) => {
            if (!o) setSearch("");
            return !o;
          });
        }}
        className={cn(
          "flex min-h-10 w-full flex-wrap items-center gap-1 border border-border bg-background px-2 py-1.5 text-sm",
          "outline-none transition-colors focus:border-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",
          values.length === 0 && "text-muted-foreground"
        )}
      >
        {values.length === 0 && <span className="px-1">{placeholder}</span>}
        {selectedLabels.slice(0, maxDisplay).map((label, i) => (
          <span
            key={i}
            className="flex items-center gap-1 border bg-muted px-1.5 py-0.5 text-xs"
          >
            {label}
            <button
              type="button"
              aria-label={`Retirer ${label}`}
              onClick={(e) => removeTag(values[i], e)}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="h-2.5 w-2.5" />
            </button>
          </span>
        ))}
        {selectedLabels.length > maxDisplay && (
          <span className="px-1 text-xs text-muted-foreground">
            +{selectedLabels.length - maxDisplay}
          </span>
        )}
        <ChevronDown
          className={cn(
            "ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-150",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-multiselectable="true"
          className="absolute z-50 mt-1 w-full border border-border bg-background shadow-md"
        >
          {/* Search */}
          <div className="flex items-center gap-2 border-b px-3 py-2">
            <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          {/* Options */}
          <div className="max-h-52 overflow-y-auto p-1">
            {filtered.length === 0 ? (
              <p className="px-3 py-2 text-xs text-muted-foreground">Aucun resultat</p>
            ) : (
              filtered.map((opt) => (
                <div
                  key={opt.value}
                  role="option"
                  aria-selected={values.includes(opt.value)}
                  onClick={() => toggle(opt.value)}
                  className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-muted"
                >
                  <Check
                    className={cn(
                      "h-4 w-4 shrink-0",
                      values.includes(opt.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {opt.label}
                </div>
              ))
            )}
          </div>

          {/* Clear action */}
          {values.length > 0 && (
            <div className="border-t p-1">
              <button
                type="button"
                onClick={() => onValuesChange?.([])}
                className="w-full px-3 py-1.5 text-left text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Effacer la selection
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
