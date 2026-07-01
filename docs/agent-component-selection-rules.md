# Agent Component Selection Rules

These rules are mandatory for agents selecting or creating components in this boilerplate.

## Required Workflow

1. Read the relevant project documentation before coding.
2. Read the Component Capability Registry before choosing a component.
3. Describe the need first.
4. Recommend existing components second.
5. Generate or create new components last.

## Selection Rules

- Prefer `recommended` components from the registry action layer.
- Use `acceptable` components only when no `recommended` component fits.
- Do not use `demo-only` components on a client page without explicit justification and adaptation.
- Do not use `experimental` components as defaults.
- Do not invent a component when an existing registry component fits.
- Create a component only when a gap is documented.
- Document every gap before writing custom component code.
- Keep custom components scoped to the domain that needs them.

## Generation Rules

- Do not start a generator without a blueprint.
- Do not start the Client-to-Prototype Engine from component-selection work.
- Do not create a full site generator as part of a reliability or registry sprint.
- Do not code before reading docs and registry entries relevant to the requested domain.

## Client Project Safety

- Treat `production` components as the safest default — no reservations for client delivery.
- Treat `stable` components as reliable and safe for most client work.
- Treat `beta` components as acceptable with review.
- Treat `demo-only` components as source examples, not production components.
- Treat `experimental` components as opt-in only.
- Preserve documented component limitations in the final implementation notes.

## Gap Documentation

When no component fits, document:

- target domain;
- missing component;
- why existing components do not fit;
- whether an `acceptable` component can be adapted;
- required states;
- required variables;
- maturity target.
