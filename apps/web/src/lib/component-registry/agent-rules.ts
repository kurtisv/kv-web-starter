export interface AgentComponentRule {
  id: string;
  severity: "required" | "recommended";
  rule: string;
}

export const AGENT_COMPONENT_RULES: AgentComponentRule[] = [
  {
    id: "read-registry-first",
    severity: "required",
    rule: "Read the Component Capability Registry before choosing a component.",
  },
  {
    id: "prefer-recommended",
    severity: "required",
    rule: "Prefer components marked recommended by the registry action layer.",
  },
  {
    id: "acceptable-second",
    severity: "required",
    rule: "Use acceptable components only when no recommended component fits.",
  },
  {
    id: "avoid-demo-only-client",
    severity: "required",
    rule: "Do not use demo-only components in client pages without explicit justification and adaptation.",
  },
  {
    id: "avoid-experimental-default",
    severity: "required",
    rule: "Do not use experimental components as defaults.",
  },
  {
    id: "document-gap-before-custom",
    severity: "required",
    rule: "Create a custom component only after documenting the registry gap.",
  },
  {
    id: "describe-recommend-generate",
    severity: "required",
    rule: "Describe first, recommend second, generate last.",
  },
  {
    id: "no-generator-without-blueprint",
    severity: "required",
    rule: "Do not start a generator without a blueprint.",
  },
  {
    id: "no-client-to-prototype-from-selection",
    severity: "required",
    rule: "Do not start the Client-to-Prototype Engine from component-selection work.",
  },
];
