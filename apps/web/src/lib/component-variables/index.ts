export type {
  ComponentVariable,
  VariableContext,
  VariableRenderProps,
  ResolvedVariable,
} from "./types";

export { createComponentVariable } from "./create-component-variable";

export {
  validateVariable,
  validateAll,
  isFormValid,
} from "./variable-validation";

export {
  serializeVariable,
  deserializeVariable,
  serializeAll,
  deserializeAll,
} from "./variable-serialization";

export {
  isVariableVisible,
  isVariableDisabled,
} from "./variable-visibility";

export {
  getDependents,
  buildDependencyMap,
  topoSort,
} from "./variable-dependencies";

export {
  createVariableValueStore,
} from "./variable-value-store";
export type { VariableValueStore } from "./variable-value-store";

export type {
  SelectOption,
  TextVariableConfig,
  NumberVariableConfig,
  SelectVariableConfig,
  MultiSelectVariableConfig,
  BooleanVariableConfig,
  ViewModeVariableConfig,
  ViewMode,
  SortValue,
  SortVariableConfig,
  DateRangeValue,
  DateRangeVariableConfig,
  SliderRangeValue,
  SliderRangeVariableConfig,
  RatingVariableConfig,
  DateVariableConfig,
  CurrencyVariableConfig,
  LocationValue,
  LocationVariableConfig,
  RelationVariableConfig,
  MediaVariableConfig,
} from "./factories";

export {
  createTextVariable,
  createNumberVariable,
  createSelectVariable,
  createMultiSelectVariable,
  createBooleanVariable,
  createViewModeVariable,
  createSortVariable,
  createDateRangeVariable,
  createSliderRangeVariable,
  createStatusVariable,
  createRatingVariable,
  createDateVariable,
  createCurrencyVariable,
  createLocationVariable,
  createRelationVariable,
  createMediaVariable,
} from "./factories";

// Domain presets
export {
  realEstateVariables,
  autoVariables,
  ecommerceVariables,
  dashboardVariables,
  apiPortalVariables,
} from "./presets";

// React layer (client-only — import from here in .tsx files)
export {
  VariableProvider,
  useVariableContext,
  useVariable,
  useAllVariables,
  useUrlSync,
  useUrlInitialValues,
  useAutoUrlSync,
} from "./react";
