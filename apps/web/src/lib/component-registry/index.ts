export { COMPONENT_REGISTRY } from "./component-registry";
export { recommendComponents } from "./recommend-components";
export { validateComponentFit, filterFitComponents } from "./validate-component-fit";
export {
  generateComponentRecommendationReport,
  getAvoidedComponentsForDomain,
  getComponentRecommendationLevel,
  getGapsForDomain,
  getRecommendedComponentsForDomain,
} from "./recommendation-policy";
export { AGENT_COMPONENT_RULES } from "./agent-rules";
export type { AgentComponentRule } from "./agent-rules";
export type {
  ComponentDomain,
  ComponentCategory,
  ComponentState,
  ComponentMaturity,
  ComponentRecommendationLevel,
  ComponentExample,
  ComponentCapability,
  ComponentRecommendationInput,
  ComponentRecommendation,
} from "./types";
