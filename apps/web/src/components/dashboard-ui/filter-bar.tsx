"use client";
import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { ComponentVariable } from "@/lib/component-variables";
import { ConfigurableFilterBar } from "@/components/component-variables";

export interface FilterGroup {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

interface FilterBarProps {
  filters?: FilterGroup[];
  searchPlaceholder?: string;
  className?: string;
  /** Pass ComponentVariable[] to use the new variable system instead of FilterGroup[] */
  variables?: ComponentVariable[];
  onValuesChange?: (values: Record<string, unknown>) => void;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function FilterBar({ filters = [], searchPlaceholder = "Rechercher...", className, variables, onValuesChange }: FilterBarProps) {
  if (variables) {
    return (
      <ConfigurableFilterBar
        variables={variables}
        searchPlaceholder={searchPlaceholder}
        className={className}
        onValuesChange={onValuesChange}
      />
    );
  }

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = React.useState(searchParams.get("search") ?? "");
  const debouncedSearch = useDebounce(search, 300);

  const buildParams = React.useCallback(
    (overrides: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, val] of Object.entries(overrides)) {
        if (val == null || val === "") {
          params.delete(key);
        } else {
          params.set(key, val);
        }
      }
      params.delete("page");
      return params.toString();
    },
    [searchParams]
  );

  React.useEffect(() => {
    const q = debouncedSearch.trim();
    const current = searchParams.get("search") ?? "";
    if (q === current) return;
    router.push(`${pathname}?${buildParams({ search: q || null })}`);
  }, [debouncedSearch, buildParams, pathname, router, searchParams]);

  const handleFilter = (key: string, value: string) => {
    const current = searchParams.get(key);
    router.push(
      `${pathname}?${buildParams({ [key]: current === value ? null : value })}`
    );
  };

  const activeCount =
    (search.trim() ? 1 : 0) +
    filters.filter((f) => searchParams.get(f.key)).length;

  const clearAll = () => {
    setSearch("");
    const params = new URLSearchParams();
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {/* Search */}
      <div className="relative flex-1 min-w-48 max-w-xs">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className={cn(
            "h-9 w-full border border-border bg-background pl-8 pr-3 text-sm outline-none",
            "transition-colors focus:border-foreground placeholder:text-muted-foreground"
          )}
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Filter selects */}
      {filters.map((group) => {
        const active = searchParams.get(group.key);
        return (
          <div key={group.key} className="min-w-36">
            <Select
              value={active ?? ""}
              onValueChange={(value) => handleFilter(group.key, value)}
              placeholder={group.label}
              options={[{ value: "", label: group.label }, ...group.options]}
              className={cn(active && "border-foreground")}
            />
          </div>
        );
      })}

      {/* Clear */}
      {activeCount > 0 && (
        <button
          type="button"
          onClick={clearAll}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-3 w-3" />
          Effacer ({activeCount})
        </button>
      )}
    </div>
  );
}
