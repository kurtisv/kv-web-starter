"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ComponentVariable } from "../types";
import { serializeAll, deserializeAll } from "../variable-serialization";

/**
 * Sync a set of URL-keyed variables with the URL search params.
 *
 * Returns `{ readFromUrl, writeToUrl }`:
 * - `readFromUrl()` reads current URL params and returns a partial context
 * - `writeToUrl(values)` pushes the serialized values to the URL (replace, no history entry)
 *
 * This hook does NOT manage React state — it's a pure URL bridge.
 * Pair it with VariableProvider and call readFromUrl() in the initial state.
 */
export function useUrlSync(variables: ComponentVariable[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const varsRef = useRef(variables);
  useLayoutEffect(() => { varsRef.current = variables; });

  const readFromUrl = useCallback((): Record<string, unknown> => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return deserializeAll(varsRef.current, params);
  }, [searchParams]);

  const writeToUrl = useCallback(
    (values: Record<string, unknown>) => {
      const serialized = serializeAll(varsRef.current, values);

      // Merge with existing params that are NOT managed by these variables
      const managedKeys = new Set<string>();
      for (const v of varsRef.current) {
        if (!v.urlKeys) continue;
        if (typeof v.urlKeys === "string") {
          managedKeys.add(v.urlKeys);
        } else {
          Object.values(v.urlKeys).forEach((k) => managedKeys.add(k));
        }
      }

      const next = new URLSearchParams();
      searchParams.forEach((value, key) => {
        if (!managedKeys.has(key)) next.set(key, value);
      });
      for (const [k, v] of Object.entries(serialized)) {
        if (v !== "") next.set(k, v);
      }

      const qs = next.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  return { readFromUrl, writeToUrl };
}

/**
 * Convenience hook: returns initial URL-based values for a variable list.
 * Safe to call once at mount; does NOT update reactively after that.
 */
export function useUrlInitialValues(
  variables: ComponentVariable[],
): Record<string, unknown> {
  const searchParams = useSearchParams();
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return deserializeAll(variables, params);
}

/**
 * Automatically write values to the URL whenever they change.
 * Call this inside the component that owns the VariableProvider,
 * passing `values` from `useAllVariables()`.
 *
 * @deprecated Prefer ConfigurableFilterBar which uses defaultSerialized to
 * skip writing default values — keeping URLs clean. This hook writes all
 * non-empty values regardless of whether they equal the variable default.
 */
export function useAutoUrlSync(
  variables: ComponentVariable[],
  values: Record<string, unknown>,
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const varsRef = useRef(variables);
  useLayoutEffect(() => { varsRef.current = variables; });

  // Track previous values to avoid spurious pushes
  const prevRef = useRef<string>("");

  useEffect(() => {
    const serialized = serializeAll(varsRef.current, values);

    const managedKeys = new Set<string>();
    for (const v of varsRef.current) {
      if (!v.urlKeys) continue;
      if (typeof v.urlKeys === "string") {
        managedKeys.add(v.urlKeys);
      } else {
        Object.values(v.urlKeys).forEach((k) => managedKeys.add(k));
      }
    }

    const next = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (!managedKeys.has(key)) next.set(key, value);
    });
    for (const [k, v] of Object.entries(serialized)) {
      if (v !== "") next.set(k, v);
    }

    const qs = next.toString();
    const newUrl = `${pathname}${qs ? `?${qs}` : ""}`;

    if (newUrl !== prevRef.current) {
      prevRef.current = newUrl;
      router.replace(newUrl, { scroll: false });
    }
  });
}
