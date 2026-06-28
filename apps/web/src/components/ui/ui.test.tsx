import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Badge, Button, Card, CardContent, Combobox, Input, MultiSelect, Select, Table, TableBody, TableCell, TableRow } from ".";

describe("ui primitives", () => {
  it("renders common primitives", () => {
    render(
      <Card>
        <CardContent>
          <Badge>Pro</Badge>
          <Input aria-label="Email" />
          <Button>Save</Button>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Usage</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>,
    );

    expect(screen.getByText("Pro")).toBeTruthy();
    expect(screen.getByLabelText("Email")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Save" })).toBeTruthy();
    expect(screen.getByText("Usage")).toBeTruthy();
  });
});

describe("keyboard accessibility", () => {
  it("select can choose an option with keyboard", () => {
    const onValueChange = vi.fn();
    render(
      <Select
        value=""
        onValueChange={onValueChange}
        options={[
          { value: "pro", label: "Pro" },
          { value: "business", label: "Business" },
        ]}
      />,
    );

    const trigger = screen.getByRole("combobox");
    fireEvent.keyDown(trigger, { key: "Enter" });
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    fireEvent.keyDown(trigger, { key: "Enter" });

    expect(onValueChange).toHaveBeenCalledWith("pro");
  });

  it("combobox can choose the first filtered option with Enter", () => {
    const onValueChange = vi.fn();
    render(
      <Combobox
        value=""
        onValueChange={onValueChange}
        options={[
          { value: "starter", label: "Starter" },
          { value: "business", label: "Business" },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole("button"));
    const search = screen.getByPlaceholderText("Rechercher...");
    fireEvent.change(search, { target: { value: "bus" } });
    fireEvent.keyDown(search, { key: "Enter" });

    expect(onValueChange).toHaveBeenCalledWith("business");
  });

  it("multi-select toggles the first filtered option with Enter", () => {
    const onValuesChange = vi.fn();
    render(
      <MultiSelect
        values={[]}
        onValuesChange={onValuesChange}
        options={[
          { value: "booking", label: "Booking" },
          { value: "api", label: "API" },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole("button"));
    const search = screen.getByPlaceholderText("Rechercher...");
    fireEvent.change(search, { target: { value: "api" } });
    fireEvent.keyDown(search, { key: "Enter" });

    expect(onValuesChange).toHaveBeenCalledWith(["api"]);
  });
});
