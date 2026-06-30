import type { ComponentVariable, VariableContext } from "./types";

export function isVariableVisible<TValue>(
  variable: ComponentVariable<TValue>,
  context: VariableContext,
): boolean {
  if (!variable.isVisible) return true;
  try {
    return variable.isVisible(context as never);
  } catch {
    return true;
  }
}

export function isVariableDisabled<TValue>(
  variable: ComponentVariable<TValue>,
  context: VariableContext,
): boolean {
  if (!variable.isDisabled) return false;
  try {
    return variable.isDisabled(context as never);
  } catch {
    return false;
  }
}
