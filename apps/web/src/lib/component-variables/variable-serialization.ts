import type { ComponentVariable } from "./types";

/**
 * Serialize a variable's value to a URL-safe representation.
 * Returns null if the variable has no `urlKeys` (not URL-synced).
 */
export function serializeVariable<TValue>(
  variable: ComponentVariable<TValue>,
  value: TValue,
): Record<string, string> | null {
  if (!variable.urlKeys) return null;

  if (variable.serialize) {
    const result = variable.serialize(value);
    if (typeof result === "string") {
      const key =
        typeof variable.urlKeys === "string" ? variable.urlKeys : variable.id;
      return { [key]: result };
    }
    return result;
  }

  // Default: JSON stringify for complex types, toString for primitives
  const key =
    typeof variable.urlKeys === "string" ? variable.urlKeys : variable.id;
  const raw =
    typeof value === "string" || typeof value === "number" || typeof value === "boolean"
      ? String(value)
      : JSON.stringify(value);
  return { [key]: raw };
}

/**
 * Deserialize a URL param record back into a variable's value.
 * Falls back to `defaultValue` if the key is missing or parsing fails.
 */
export function deserializeVariable<TValue>(
  variable: ComponentVariable<TValue>,
  params: Record<string, string>,
): TValue {
  if (!variable.urlKeys) return variable.defaultValue;

  const key =
    typeof variable.urlKeys === "string" ? variable.urlKeys : variable.id;

  if (variable.deserialize) {
    const raw =
      typeof variable.urlKeys === "string"
        ? params[key] ?? ""
        : Object.fromEntries(
            Object.entries(variable.urlKeys).map(([, paramKey]) => [
              paramKey,
              params[paramKey] ?? "",
            ]),
          );
    try {
      return variable.deserialize(raw);
    } catch {
      return variable.defaultValue;
    }
  }

  // Default: parse primitives, JSON.parse for objects/arrays
  const raw = params[key];
  if (raw === undefined || raw === "") return variable.defaultValue;

  const def = variable.defaultValue;
  try {
    if (typeof def === "number") return Number(raw) as TValue;
    if (typeof def === "boolean") return (raw === "true") as TValue;
    if (typeof def === "string") return raw as TValue;
    return JSON.parse(raw) as TValue;
  } catch {
    return variable.defaultValue;
  }
}

/**
 * Serialize all URL-synced variables into a single flat param record.
 */
export function serializeAll(
  variables: ComponentVariable[],
  values: Record<string, unknown>,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const v of variables) {
    const serialized = serializeVariable(v, values[v.id]);
    if (serialized) Object.assign(out, serialized);
  }
  return out;
}

/**
 * Deserialize URL params into a value map for all variables.
 * Variables without `urlKeys` receive their `defaultValue`.
 */
export function deserializeAll(
  variables: ComponentVariable[],
  params: Record<string, string>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const v of variables) {
    out[v.id] = deserializeVariable(v, params);
  }
  return out;
}
