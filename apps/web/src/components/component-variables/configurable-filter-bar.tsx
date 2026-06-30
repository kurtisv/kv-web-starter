"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentVariable } from "@/lib/component-variables";
import { VariableProvider, useAllVariables } from "@/lib/component-variables/react";
import { VariableRenderer } from "./variable-renderer";

// ── Internal search bar that syncs with URL ───────────────────────────────────
function SearchInput({
  placeholder = "Rechercher...",
  className,
}: {
  placeholder?: string;
  className?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const pushSearch = useCallback(
    (q: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (q.trim()) {
        params.set("search", q.trim());
      } else {
        params.delete("search");
      }
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  // Debounce URL push
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const current = searchParams.get("search") ?? "";
      if (search.trim() !== current) pushSearch(search);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [search, pushSearch, searchParams]);

  return (
    <div className={cn("relative flex-1 min-w-48 max-w-xs", className)}>
      <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "h-9 w-full border border-border bg-background pl-8 pr-3 text-sm outline-none",
          "transition-colors focus:border-foreground placeholder:text-muted-foreground",
        )}
      />
      {search && (
        <button
          type="button"
          onClick={() => { setSearch(""); pushSearch(""); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

// ── Inner component (uses context, needs Suspense above it) ───────────────────
function FilterBarInner({
  variables,
  searchPlaceholder,
  onValuesChange,
  clearLabel = "Effacer",
}: {
  variables: ComponentVariable[];
  searchPlaceholder?: string;
  onValuesChange?: (values: Record<string, unknown>) => void;
  clearLabel?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { resolved, reset, values } = useAllVariables();

  // Notify parent when values change
  const prevValuesRef = useRef<string>("");
  useEffect(() => {
    const serialized = JSON.stringify(values);
    if (serialized !== prevValuesRef.current) {
      prevValuesRef.current = serialized;
      onValuesChange?.(values);
    }
  }, [values, onValuesChange]);

  const activeCount =
    (searchParams.get("search") ? 1 : 0) +
    resolved.filter((r) => {
      const def = r.variable.defaultValue;
      return r.value !== def && r.value !== "" && r.value !== null;
    }).length;

  const clearAll = () => {
    reset();
    const params = new URLSearchParams();
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <SearchInput placeholder={searchPlaceholder} />

      {variables.map((v) => (
        <VariableRenderer key={v.id} variable={v} />
      ))}

      {activeCount > 0 && (
        <button
          type="button"
          onClick={clearAll}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-3 w-3" />
          {clearLabel} ({activeCount})
        </button>
      )}
    </div>
  );
}

// ── Public component ──────────────────────────────────────────────────────────
export interface ConfigurableFilterBarProps {
  variables: ComponentVariable[];
  searchPlaceholder?: string;
  clearLabel?: string;
  className?: string;
  onValuesChange?: (values: Record<string, unknown>) => void;
}

/**
 * Drop-in replacement for FilterBar that accepts ComponentVariable[] instead of
 * FilterGroup[]. Wraps the inner bar in VariableProvider + Suspense.
 *
 * URL sync for select filters is handled by each variable's urlKeys.
 * The search field always syncs to the "search" URL param.
 */
export function ConfigurableFilterBar({
  variables,
  searchPlaceholder,
  clearLabel,
  className,
  onValuesChange,
}: ConfigurableFilterBarProps) {
  return (
    <div className={cn("", className)}>
      <VariableProvider variables={variables}>
        <Suspense>
          <FilterBarInner
            variables={variables}
            searchPlaceholder={searchPlaceholder}
            clearLabel={clearLabel}
            onValuesChange={onValuesChange}
          />
        </Suspense>
      </VariableProvider>
    </div>
  );
}
