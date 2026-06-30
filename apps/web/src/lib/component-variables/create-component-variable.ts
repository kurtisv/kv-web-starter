import type { ComponentVariable } from "./types";

/**
 * Identity factory — validates required fields and returns the variable.
 * Using a factory (rather than plain objects) lets TypeScript infer TValue
 * from `defaultValue` without requiring explicit type parameters at call sites.
 */
export function createComponentVariable<
  TValue,
  TContext extends Record<string, unknown> = Record<string, unknown>,
>(
  config: ComponentVariable<TValue, TContext>,
): ComponentVariable<TValue, TContext> {
  if (!config.id || typeof config.id !== "string") {
    throw new Error("[component-variables] Variable must have a non-empty string `id`.");
  }
  if (!config.label || typeof config.label !== "string") {
    throw new Error(
      `[component-variables] Variable "${config.id}" must have a non-empty string \`label\`.`,
    );
  }
  if (config.defaultValue === undefined) {
    throw new Error(
      `[component-variables] Variable "${config.id}" must have a \`defaultValue\` (never undefined).`,
    );
  }
  return config;
}
