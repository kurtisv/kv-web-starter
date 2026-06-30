"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentVariable } from "@/lib/component-variables";
import {
  VariableProvider,
  useAllVariables,
  useUrlInitialValues,
} from "@/lib/component-variables/react";
import { serializeAll } from "@/lib/component-variables";
import { VariableRenderer } from "./variable-renderer";

// ── Search input — always syncs to ?search= URL param ────────────────────────
function SearchInput({
  placeholder = "Rechercher...",
}: {
  placeholder?: string;
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
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const current = searchParams.get("search") ?? "";
      if (search.trim() !== current) pushSearch(search);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [search, pushSearch, searchParams]);

  return (
    <div className="relative flex-1 min-w-48 max-w-xs">
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

// ── Inner — reads URL on mount, writes on every change ───────────────────────
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
  const { resolved, reset, values, set } = useAllVariables();

  // On mount: initialize from URL (only once)
  const initializedRef = useRef(false);
  const urlValues = useUrlInitialValues(variables);
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    for (const v of variables) {
      if (urlValues[v.id] !== undefined && urlValues[v.id] !== v.defaultValue) {
        set(v.id, urlValues[v.id]);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Write variable values to URL whenever they change, debounced
  const writeRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const prevSerializedRef = useRef<string>("");
  useEffect(() => {
    clearTimeout(writeRef.current);
    writeRef.current = setTimeout(() => {
      const serialized = serializeAll(variables, values);
      const serializedStr = JSON.stringify(serialized);
      if (serializedStr === prevSerializedRef.current) return;
      prevSerializedRef.current = serializedStr;

      // Merge with existing URL params not managed by these variables
      const managedKeys = new Set<string>();
      for (const v of variables) {
        if (!v.urlKeys) continue;
        if (typeof v.urlKeys === "string") managedKeys.add(v.urlKeys);
        else Object.values(v.urlKeys).forEach((k) => managedKeys.add(k));
      }
      const params = new URLSearchParams();
      searchParams.forEach((val, key) => {
        if (!managedKeys.has(key)) params.set(key, val);
      });
      for (const [k, v] of Object.entries(serialized)) {
        if (v !== "") params.set(k, v);
      }
      params.delete("page");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 150);
    return () => clearTimeout(writeRef.current);
  }, [values, variables, searchParams, router, pathname]);

  // Notify parent
  const prevNotifyRef = useRef<string>("");
  useEffect(() => {
    const s = JSON.stringify(values);
    if (s !== prevNotifyRef.current) {
      prevNotifyRef.current = s;
      onValuesChange?.(values);
    }
  }, [values, onValuesChange]);

  // Active count: search param + non-default variable values
  const activeVariableCount = resolved.filter((r) => {
    const def = r.variable.defaultValue;
    const val = r.value;
    if (typeof def === "object" && def !== null) {
      return JSON.stringify(val) !== JSON.stringify(def);
    }
    return val !== def && val !== "" && val !== null;
  }).length;

  const activeCount = (searchParams.get("search") ? 1 : 0) + activeVariableCount;

  const clearAll = () => {
    reset();
    // Clear URL: keep only non-managed, non-search params
    const managedKeys = new Set<string>();
    for (const v of variables) {
      if (!v.urlKeys) continue;
      if (typeof v.urlKeys === "string") managedKeys.add(v.urlKeys);
      else Object.values(v.urlKeys).forEach((k) => managedKeys.add(k));
    }
    managedKeys.add("search");
    managedKeys.add("page");
    const params = new URLSearchParams();
    searchParams.forEach((val, key) => {
      if (!managedKeys.has(key)) params.set(key, val);
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
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

// ── Public API ────────────────────────────────────────────────────────────────
export interface ConfigurableFilterBarProps {
  variables: ComponentVariable[];
  searchPlaceholder?: string;
  clearLabel?: string;
  className?: string;
  onValuesChange?: (values: Record<string, unknown>) => void;
}

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
