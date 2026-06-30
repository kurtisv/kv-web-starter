import type { ComponentVariable, ResolvedVariable, VariableContext } from "./types";
import { validateVariable } from "./variable-validation";
import { isVariableVisible, isVariableDisabled } from "./variable-visibility";

export interface VariableValueStore {
  values: VariableContext;
  get: (id: string) => unknown;
  set: (id: string, value: unknown) => void;
  reset: () => void;
  resolveAll: () => ResolvedVariable[];
}

/**
 * Create a simple in-memory value store for a list of variables.
 * This is the framework-agnostic core; React state is layered on top
 * by VariableProvider (Lot 3).
 */
export function createVariableValueStore(
  variables: ComponentVariable[],
  initial?: Partial<VariableContext>,
): VariableValueStore {
  // Seed with defaultValues, then overlay any provided initial values
  let values: VariableContext = Object.fromEntries(
    variables.map((v) => [v.id, v.defaultValue]),
  );
  if (initial) {
    for (const [k, v] of Object.entries(initial)) {
      if (k in values) values[k] = v;
    }
  }

  return {
    get values() {
      return values;
    },

    get(id) {
      return values[id];
    },

    set(id, value) {
      values = { ...values, [id]: value };
    },

    reset() {
      values = Object.fromEntries(variables.map((v) => [v.id, v.defaultValue]));
    },

    resolveAll() {
      return variables.map((v) => ({
        variable: v,
        value: values[v.id],
        error: validateVariable(v, values[v.id], values),
        isVisible: isVariableVisible(v, values),
        isDisabled: isVariableDisabled(v, values),
      })) as ResolvedVariable[];
    },
  };
}
