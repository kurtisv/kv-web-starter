import { createComponentVariable } from "./create-component-variable";
import type { ComponentVariable } from "./types";

// ── Shared option shape ───────────────────────────────────────────────────────
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// ── Text ─────────────────────────────────────────────────────────────────────
export interface TextVariableConfig {
  id: string;
  label: string;
  description?: string;
  defaultValue?: string;
  placeholder?: string;
  maxLength?: number;
  group?: string;
  order?: number;
  urlKeys?: string;
  validate?: (value: string) => string | null;
}

export function createTextVariable(
  config: TextVariableConfig,
): ComponentVariable<string> {
  const { placeholder, maxLength, ...rest } = config;
  return createComponentVariable<string>({
    defaultValue: "",
    ...rest,
    metadata: { placeholder, maxLength },
    serialize: (v) => v,
    deserialize: (raw) => (typeof raw === "string" ? raw : ""),
    validate: (v) => {
      if (config.validate) return config.validate(v);
      if (maxLength !== undefined && v.length > maxLength)
        return `Maximum ${maxLength} caracteres.`;
      return null;
    },
  });
}

// ── Number ───────────────────────────────────────────────────────────────────
export interface NumberVariableConfig {
  id: string;
  label: string;
  description?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  group?: string;
  order?: number;
  urlKeys?: string;
  validate?: (value: number) => string | null;
}

export function createNumberVariable(
  config: NumberVariableConfig,
): ComponentVariable<number> {
  const { min, max, step, ...rest } = config;
  return createComponentVariable<number>({
    defaultValue: 0,
    ...rest,
    metadata: { min, max, step },
    serialize: (v) => String(v),
    deserialize: (raw) => Number(raw),
    validate: (v) => {
      if (config.validate) return config.validate(v);
      if (min !== undefined && v < min) return `Minimum: ${min}.`;
      if (max !== undefined && v > max) return `Maximum: ${max}.`;
      return null;
    },
  });
}

// ── Select (single) ───────────────────────────────────────────────────────────
export interface SelectVariableConfig {
  id: string;
  label: string;
  description?: string;
  options: SelectOption[];
  defaultValue?: string;
  group?: string;
  order?: number;
  urlKeys?: string;
  validate?: (value: string, options: SelectOption[]) => string | null;
}

export function createSelectVariable(
  config: SelectVariableConfig,
): ComponentVariable<string> {
  const { options, ...rest } = config;
  return createComponentVariable<string>({
    defaultValue: options[0]?.value ?? "",
    ...rest,
    metadata: { options },
    serialize: (v) => v,
    deserialize: (raw) => (typeof raw === "string" ? raw : config.defaultValue ?? options[0]?.value ?? ""),
    validate: (v) => {
      if (config.validate) return config.validate(v, options);
      return null;
    },
  });
}

// ── Multi-select ──────────────────────────────────────────────────────────────
export interface MultiSelectVariableConfig {
  id: string;
  label: string;
  description?: string;
  options: SelectOption[];
  defaultValue?: string[];
  group?: string;
  order?: number;
  urlKeys?: string;
}

export function createMultiSelectVariable(
  config: MultiSelectVariableConfig,
): ComponentVariable<string[]> {
  const { options, ...rest } = config;
  return createComponentVariable<string[]>({
    defaultValue: [],
    ...rest,
    metadata: { options },
    serialize: (v) => (v.length > 0 ? v.join(",") : ""),
    deserialize: (raw) => {
      if (typeof raw !== "string" || raw === "") return [];
      return raw.split(",").filter(Boolean);
    },
  });
}

// ── Boolean ───────────────────────────────────────────────────────────────────
export interface BooleanVariableConfig {
  id: string;
  label: string;
  description?: string;
  defaultValue?: boolean;
  group?: string;
  order?: number;
  urlKeys?: string;
}

export function createBooleanVariable(
  config: BooleanVariableConfig,
): ComponentVariable<boolean> {
  return createComponentVariable<boolean>({
    defaultValue: false,
    ...config,
    serialize: (v) => (v ? "true" : "false"),
    deserialize: (raw) => raw === "true",
  });
}

// ── View mode ─────────────────────────────────────────────────────────────────
export type ViewMode = "grid" | "list";

export interface ViewModeVariableConfig {
  id?: string;
  label?: string;
  defaultValue?: ViewMode;
  urlKeys?: string;
  group?: string;
  order?: number;
}

export function createViewModeVariable(
  config: ViewModeVariableConfig = {},
): ComponentVariable<ViewMode> {
  return createComponentVariable<ViewMode>({
    id: "viewMode",
    label: "Affichage",
    defaultValue: "grid",
    ...config,
    metadata: { options: [{ value: "grid", label: "Grille" }, { value: "list", label: "Liste" }] },
    serialize: (v) => v,
    deserialize: (raw) => (raw === "list" ? "list" : "grid"),
  });
}

// ── Sort ──────────────────────────────────────────────────────────────────────
export interface SortValue {
  field: string;
  direction: "asc" | "desc";
}

export interface SortVariableConfig {
  id?: string;
  label?: string;
  defaultValue?: SortValue;
  fields: SelectOption[];
  urlKeys?: { field: string; direction: string };
  group?: string;
  order?: number;
}

export function createSortVariable(
  config: SortVariableConfig,
): ComponentVariable<SortValue> {
  const defaultV: SortValue = config.defaultValue ?? {
    field: config.fields[0]?.value ?? "id",
    direction: "asc",
  };
  const keys = config.urlKeys ?? { field: `${config.id ?? "sort"}Field`, direction: `${config.id ?? "sort"}Dir` };

  return createComponentVariable<SortValue>({
    id: "sort",
    label: "Tri",
    ...config,
    defaultValue: defaultV,
    metadata: { fields: config.fields },
    urlKeys: keys,
    serialize: ({ field, direction }) => ({ [keys.field]: field, [keys.direction]: direction }),
    deserialize: (raw) => {
      const r = raw as Record<string, string>;
      return {
        field: r[keys.field] ?? defaultV.field,
        direction: r[keys.direction] === "desc" ? "desc" : "asc",
      };
    },
  });
}

// ── Date range ────────────────────────────────────────────────────────────────
export interface DateRangeValue {
  from: string;
  to: string;
}

export interface DateRangeVariableConfig {
  id: string;
  label: string;
  description?: string;
  defaultValue?: DateRangeValue;
  urlKeys?: { from: string; to: string };
  group?: string;
  order?: number;
}

export function createDateRangeVariable(
  config: DateRangeVariableConfig,
): ComponentVariable<DateRangeValue> {
  const defaultV: DateRangeValue = config.defaultValue ?? { from: "", to: "" };
  const keys = config.urlKeys ?? { from: `${config.id}From`, to: `${config.id}To` };

  return createComponentVariable<DateRangeValue>({
    defaultValue: defaultV,
    ...config,
    urlKeys: keys,
    serialize: ({ from, to }) => ({ [keys.from]: from, [keys.to]: to }),
    deserialize: (raw) => {
      const r = raw as Record<string, string>;
      return { from: r[keys.from] ?? "", to: r[keys.to] ?? "" };
    },
  });
}

// ── Slider range (numeric) ───────────────────────────────────────────────────
export interface SliderRangeValue {
  min: number;
  max: number;
}

export interface SliderRangeVariableConfig {
  id: string;
  label: string;
  description?: string;
  min: number;
  max: number;
  step?: number;
  defaultValue?: SliderRangeValue;
  format?: (v: number) => string;
  urlKeys?: { min: string; max: string };
  group?: string;
  order?: number;
}

export function createSliderRangeVariable(
  config: SliderRangeVariableConfig,
): ComponentVariable<SliderRangeValue> {
  const defaultV: SliderRangeValue = config.defaultValue ?? { min: config.min, max: config.max };
  const keys = config.urlKeys ?? { min: `${config.id}Min`, max: `${config.id}Max` };

  return createComponentVariable<SliderRangeValue>({
    defaultValue: defaultV,
    ...config,
    metadata: { min: config.min, max: config.max, step: config.step, format: config.format, keys },
    urlKeys: keys,
    serialize: ({ min, max }) => ({ [keys.min]: String(min), [keys.max]: String(max) }),
    deserialize: (raw) => {
      const r = raw as Record<string, string>;
      const minVal = r[keys.min] !== undefined ? Number(r[keys.min]) : defaultV.min;
      const maxVal = r[keys.max] !== undefined ? Number(r[keys.max]) : defaultV.max;
      return { min: minVal, max: maxVal };
    },
    validate: ({ min, max }) => {
      if (min > max) return "La valeur minimale ne peut pas depasser la valeur maximale.";
      if (min < config.min) return `Minimum: ${config.min}.`;
      if (max > config.max) return `Maximum: ${config.max}.`;
      return null;
    },
  });
}

// ── Status ───────────────────────────────────────────────────────────────────
export function createStatusVariable(
  config: SelectVariableConfig,
): ComponentVariable<string> {
  const v = createSelectVariable(config);
  return { ...v, metadata: { ...(v.metadata ?? {}), kind: "status" } };
}

// ── Rating ───────────────────────────────────────────────────────────────────
export interface RatingVariableConfig {
  id: string;
  label: string;
  description?: string;
  defaultValue?: number;
  max?: number;
  urlKeys?: string;
  group?: string;
  order?: number;
}

export function createRatingVariable(
  config: RatingVariableConfig,
): ComponentVariable<number> {
  const max = config.max ?? 5;
  return createComponentVariable<number>({
    defaultValue: 0,
    ...config,
    metadata: { max },
    serialize: (v) => String(v),
    deserialize: (raw) => Math.min(Math.max(Number(raw), 0), max),
    validate: (v) => {
      if (v < 0 || v > max) return `La note doit etre entre 0 et ${max}.`;
      return null;
    },
  });
}
