"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ComponentVariable, ResolvedVariable, VariableContext } from "../types";
import { validateVariable } from "../variable-validation";
import { isVariableVisible, isVariableDisabled } from "../variable-visibility";

// ── Context shape ─────────────────────────────────────────────────────────────
interface VariableContextValue {
  values: VariableContext;
  resolved: ResolvedVariable[];
  set: (id: string, value: unknown) => void;
  reset: () => void;
}

const VariableCtx = createContext<VariableContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────
interface VariableProviderProps {
  variables: ComponentVariable[];
  initial?: Partial<VariableContext>;
  children: ReactNode;
}

export function VariableProvider({
  variables,
  initial,
  children,
}: VariableProviderProps) {
  const defaultValues = useMemo(
    () =>
      Object.fromEntries(variables.map((v) => [v.id, v.defaultValue])) as VariableContext,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [values, setValues] = useState<VariableContext>(() => ({
    ...defaultValues,
    ...(initial ?? {}),
  }));

  const set = useCallback((id: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  }, []);

  const reset = useCallback(() => {
    setValues(Object.fromEntries(variables.map((v) => [v.id, v.defaultValue])) as VariableContext);
  }, [variables]);

  const resolved = useMemo<ResolvedVariable[]>(
    () =>
      variables.map((v) => ({
        variable: v,
        value: values[v.id],
        error: validateVariable(v, values[v.id], values),
        isVisible: isVariableVisible(v, values),
        isDisabled: isVariableDisabled(v, values),
      })) as ResolvedVariable[],
    [values, variables],
  );

  const ctx = useMemo<VariableContextValue>(
    () => ({ values, resolved, set, reset }),
    [values, resolved, set, reset],
  );

  return <VariableCtx.Provider value={ctx}>{children}</VariableCtx.Provider>;
}

// ── Hooks ─────────────────────────────────────────────────────────────────────

/** Access the raw context (throws if used outside VariableProvider). */
export function useVariableContext(): VariableContextValue {
  const ctx = useContext(VariableCtx);
  if (!ctx) {
    throw new Error(
      "[component-variables] useVariableContext must be used inside <VariableProvider>.",
    );
  }
  return ctx;
}

/**
 * Access a single variable's current value and setter.
 * Throws if the id is not found in the provider's variable list.
 */
export function useVariable<TValue = unknown>(id: string) {
  const { values, resolved, set } = useVariableContext();

  const resolvedVar = resolved.find((r) => r.variable.id === id);
  if (!resolvedVar) {
    throw new Error(
      `[component-variables] useVariable("${id}") — no variable with this id in the current VariableProvider.`,
    );
  }

  const onChange = useCallback(
    (value: TValue) => set(id, value),
    [id, set],
  );

  return {
    value: values[id] as TValue,
    onChange,
    error: resolvedVar.error,
    isVisible: resolvedVar.isVisible,
    isDisabled: resolvedVar.isDisabled,
  };
}

/** Access all resolved variables, bulk reset, and individual set. */
export function useAllVariables() {
  const { resolved, reset, values, set } = useVariableContext();
  return { resolved, reset, values, set };
}
