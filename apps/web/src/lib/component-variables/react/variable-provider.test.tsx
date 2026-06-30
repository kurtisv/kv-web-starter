import { describe, it, expect } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { VariableProvider, useVariable, useAllVariables } from "./variable-provider";
import { createComponentVariable } from "../create-component-variable";
import { createTextVariable, createSelectVariable } from "../factories";

const vars = [
  createTextVariable({ id: "q", label: "Recherche", defaultValue: "initial" }),
  createSelectVariable({
    id: "type",
    label: "Type",
    options: [{ value: "all", label: "Tous" }, { value: "maison", label: "Maison" }],
  }),
];

// Consumer component for testing
function Consumer({ id }: { id: string }) {
  const { value, onChange, error, isVisible, isDisabled } = useVariable<string>(id);
  return (
    <div>
      <span data-testid="value">{String(value)}</span>
      <span data-testid="error">{error ?? ""}</span>
      <span data-testid="visible">{String(isVisible)}</span>
      <span data-testid="disabled">{String(isDisabled)}</span>
      <button onClick={() => onChange("updated")}>update</button>
    </div>
  );
}

function AllConsumer() {
  const { resolved, reset } = useAllVariables();
  return (
    <div>
      <span data-testid="count">{resolved.length}</span>
      <button onClick={reset}>reset</button>
    </div>
  );
}

describe("VariableProvider + useVariable", () => {
  it("provides defaultValue", () => {
    render(
      <VariableProvider variables={vars}>
        <Consumer id="q" />
      </VariableProvider>,
    );
    expect(screen.getByTestId("value").textContent).toBe("initial");
  });

  it("provides initial override", () => {
    render(
      <VariableProvider variables={vars} initial={{ q: "override" }}>
        <Consumer id="q" />
      </VariableProvider>,
    );
    expect(screen.getByTestId("value").textContent).toBe("override");
  });

  it("onChange updates value", () => {
    render(
      <VariableProvider variables={vars}>
        <Consumer id="q" />
      </VariableProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByText("update"));
    });
    expect(screen.getByTestId("value").textContent).toBe("updated");
  });

  it("isVisible and isDisabled default to true/false", () => {
    render(
      <VariableProvider variables={vars}>
        <Consumer id="q" />
      </VariableProvider>,
    );
    expect(screen.getByTestId("visible").textContent).toBe("true");
    expect(screen.getByTestId("disabled").textContent).toBe("false");
  });

  it("throws when used outside provider", () => {
    const originalError = console.error;
    console.error = () => {};
    expect(() => render(<Consumer id="q" />)).toThrow();
    console.error = originalError;
  });

  it("throws when id not found", () => {
    const originalError = console.error;
    console.error = () => {};
    expect(() =>
      render(
        <VariableProvider variables={vars}>
          <Consumer id="nonexistent" />
        </VariableProvider>,
      ),
    ).toThrow();
    console.error = originalError;
  });
});

describe("useAllVariables + reset", () => {
  it("returns all resolved variables", () => {
    render(
      <VariableProvider variables={vars}>
        <AllConsumer />
      </VariableProvider>,
    );
    expect(screen.getByTestId("count").textContent).toBe("2");
  });
});

describe("VariableProvider with conditional visibility", () => {
  const conditionalVars = [
    createSelectVariable({
      id: "type",
      label: "Type",
      options: [{ value: "all", label: "Tous" }, { value: "maison", label: "Maison" }],
    }),
    createComponentVariable({
      id: "rooms",
      label: "Pieces",
      defaultValue: "all",
      isVisible: (ctx) => (ctx as Record<string, unknown>).type !== "all",
    }),
  ];

  function TypeConsumer() {
    const type = useVariable<string>("type");
    const rooms = useVariable<string>("rooms");
    return (
      <div>
        <button onClick={() => type.onChange("maison")}>set-maison</button>
        <button onClick={() => type.onChange("all")}>set-all</button>
        <span data-testid="rooms-visible">{String(rooms.isVisible)}</span>
      </div>
    );
  }

  it("rooms hidden when type=all", () => {
    render(
      <VariableProvider variables={conditionalVars}>
        <TypeConsumer />
      </VariableProvider>,
    );
    expect(screen.getByTestId("rooms-visible").textContent).toBe("false");
  });

  it("rooms visible when type=maison", () => {
    render(
      <VariableProvider variables={conditionalVars}>
        <TypeConsumer />
      </VariableProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByText("set-maison"));
    });
    expect(screen.getByTestId("rooms-visible").textContent).toBe("true");
  });
});
