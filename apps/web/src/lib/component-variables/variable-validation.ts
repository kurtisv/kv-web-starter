import type { ComponentVariable, VariableContext } from "./types";

/**
 * Run a variable's `validate` function if present.
 * Returns the error message string, or `null` when valid.
 */
export function validateVariable<TValue>(
  variable: ComponentVariable<TValue>,
  value: TValue,
  context?: VariableContext,
): string | null {
  if (!variable.validate) return null;
  try {
    return variable.validate(value, context as never);
  } catch {
    return "Erreur de validation interne.";
  }
}

/**
 * Validate every variable in a list against the current context values.
 * Returns a map of `id → error | null`.
 */
export function validateAll(
  variables: ComponentVariable[],
  values: VariableContext,
): Record<string, string | null> {
  const errors: Record<string, string | null> = {};
  for (const v of variables) {
    errors[v.id] = validateVariable(v, values[v.id], values);
  }
  return errors;
}

/**
 * True when all variables in the list pass validation.
 */
export function isFormValid(
  variables: ComponentVariable[],
  values: VariableContext,
): boolean {
  return Object.values(validateAll(variables, values)).every((e) => e === null);
}
