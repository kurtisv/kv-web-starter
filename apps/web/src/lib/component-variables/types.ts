import type * as React from "react";

// ── Render props passed to a variable's custom render fn ──────────────────────
export interface VariableRenderProps<TValue> {
  value: TValue;
  onChange: (value: TValue) => void;
  error?: string | null;
  disabled?: boolean;
}

// ── The full contract for a component variable ────────────────────────────────
export interface ComponentVariable<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TValue = any,
  TContext extends Record<string, unknown> = Record<string, unknown>,
> {
  // Identity
  id: string;
  label: string;
  description?: string;

  // Value
  defaultValue: TValue;

  // Display
  group?: string;
  order?: number;
  icon?: React.ReactNode;
  layout?: "inline" | "block" | "compact";
  debugLabel?: string;

  // Arbitrary metadata (used by renderers / presets)
  metadata?: Record<string, unknown>;

  // Behaviour
  validate?: (value: TValue, context?: TContext) => string | null;
  normalize?: (value: TValue) => TValue;

  // URL serialisation
  serialize?: (value: TValue) => string | Record<string, string>;
  deserialize?: (raw: string | Record<string, string>) => TValue;
  /** Single string key or map of sub-keys for range types */
  urlKeys?: string | Record<string, string>;

  // Custom renderer (overrides the default VariableRenderer)
  render?: (props: VariableRenderProps<TValue>) => React.ReactNode;

  // Conditional visibility / access
  isVisible?: (context: TContext) => boolean;
  isDisabled?: (context: TContext) => boolean;

  // Declare which other variable ids this one depends on
  dependencies?: string[];
}

// ── Snapshot of all variable values in a given context ───────────────────────
export type VariableContext = Record<string, unknown>;

// ── A variable paired with its current resolved value ────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ResolvedVariable<TValue = any> {
  variable: ComponentVariable<TValue>;
  value: TValue;
  error: string | null;
  isVisible: boolean;
  isDisabled: boolean;
}
