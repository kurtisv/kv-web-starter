"use client";
import * as React from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  group?: string;
}

interface ComboboxProps {
  value?: string;
  onValueChange?: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export function Combobox({
  value,
  onValueChange,
  options,
  placeholder = "Choisir...",
  searchPlaceholder = "Rechercher...",
  emptyMessage = "Aucun resultat",
  disabled,
  id,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const ref = React.useRef<HTMLDivElement>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listboxId = React.useId();

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

  React.useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 10);
    }
  }, [open]);

  const selected = options.find((o) => o.value === value);

  const filtered = options.filter(
    (o) =>
      o.label.toLowerCase().includes(search.toLowerCase()) ||
      o.description?.toLowerCase().includes(search.toLowerCase())
  );

  // Group options if any have a group
  const hasGroups = options.some((o) => o.group);
  const groups: Record<string, ComboboxOption[]> = {};
  if (hasGroups) {
    filtered.forEach((o) => {
      const g = o.group ?? "";
      if (!groups[g]) groups[g] = [];
      groups[g].push(o);
    });
  }

  const chooseOption = React.useCallback((opt: ComboboxOption) => {
    onValueChange?.(opt.value);
    setOpen(false);
    triggerRef.current?.focus();
  }, [onValueChange]);

  const renderOption = (opt: ComboboxOption) => (
    <div
      key={opt.value}
      role="option"
      aria-selected={opt.value === value}
      onClick={() => chooseOption(opt)}
      className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-muted"
    >
      <Check
        className={cn(
          "h-4 w-4 shrink-0",
          opt.value === value ? "opacity-100" : "opacity-0"
        )}
      />
      <div>
        <div>{opt.label}</div>
        {opt.description && (
          <div className="text-xs text-muted-foreground">{opt.description}</div>
        )}
      </div>
    </div>
  );

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => {
          setOpen((o) => {
            if (!o) setSearch("");
            return !o;
          });
        }}
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
          <div className="flex items-center gap-2 border-b px-3 py-2">
            <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && filtered[0]) {
                  event.preventDefault();
                  chooseOption(filtered[0]);
                }
              }}
              placeholder={searchPlaceholder}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="max-h-60 overflow-y-auto p-1">
            {filtered.length === 0 ? (
              <p className="px-3 py-2 text-xs text-muted-foreground">{emptyMessage}</p>
            ) : hasGroups ? (
              Object.entries(groups).map(([group, opts]) => (
                <div key={group}>
                  {group && (
                    <div className="px-3 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {group}
                    </div>
                  )}
                  {opts.map(renderOption)}
                </div>
              ))
            ) : (
              filtered.map(renderOption)
            )}
          </div>
        </div>
      )}
    </div>
  );
}
