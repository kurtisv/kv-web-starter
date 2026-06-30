"use client";

import { Suspense, useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentVariable } from "@/lib/component-variables";
import {
  VariableProvider,
  useAllVariables,
  useUrlInitialValues,
} from "@/lib/component-variables/react";
import { serializeAll } from "@/lib/component-variables";
import { VariableRenderer } from "./variable-renderer";

// ── Inner — reads URL on mount, writes on every change ───────────────────────
function FilterBarInner({
  variables,
  onValuesChange,
  clearLabel = "Effacer",
}: {
  variables: ComponentVariable[];
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

  // Active count: non-default variable values
  const activeCount = resolved.filter((r) => {
    const def = r.variable.defaultValue;
    const val = r.value;
    if (typeof def === "object" && def !== null) {
      return JSON.stringify(val) !== JSON.stringify(def);
    }
    return val !== def && val !== "" && val !== null;
  }).length;

  const clearAll = useCallback(() => {
    reset();
    const managedKeys = new Set<string>();
    for (const v of variables) {
      if (!v.urlKeys) continue;
      if (typeof v.urlKeys === "string") managedKeys.add(v.urlKeys);
      else Object.values(v.urlKeys).forEach((k) => managedKeys.add(k));
    }
    managedKeys.add("page");
    const params = new URLSearchParams();
    searchParams.forEach((val, key) => {
      if (!managedKeys.has(key)) params.set(key, val);
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [reset, variables, searchParams, router, pathname]);

  return (
    <div className="flex flex-wrap items-center gap-2">
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
  clearLabel?: string;
  className?: string;
  onValuesChange?: (values: Record<string, unknown>) => void;
}

export function ConfigurableFilterBar({
  variables,
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
            clearLabel={clearLabel}
            onValuesChange={onValuesChange}
          />
        </Suspense>
      </VariableProvider>
    </div>
  );
}
