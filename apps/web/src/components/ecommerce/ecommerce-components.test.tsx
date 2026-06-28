import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CheckoutSummary } from "./checkout-summary";
import { CustomerOrderTable } from "./customer-order-table";
import { OrderStatusTimeline } from "./order-status-timeline";
import { VariantSelector } from "./variant-selector";

describe("ecommerce components", () => {
  it("renders variant choices", () => {
    render(<VariantSelector label="Couleur" value="black" options={[{ value: "black", label: "Noir" }]} />);
    expect(screen.getByRole("button", { name: "Noir" })).toBeTruthy();
  });

  it("renders checkout total", () => {
    render(<CheckoutSummary subtotalCents={1000} shippingCents={200} taxCents={100} discountCents={50} />);
    expect(screen.getByText("Total")).toBeTruthy();
    expect(screen.getByText(/12,50/)).toBeTruthy();
  });

  it("renders order status steps", () => {
    render(<OrderStatusTimeline currentStep="paid" steps={[{ id: "paid", label: "Payee" }]} />);
    expect(screen.getByText("Payee")).toBeTruthy();
  });

  it("renders customer orders", () => {
    render(<CustomerOrderTable orders={[{ id: "1", number: "#1001", date: "2026-06-22", status: "paid", totalCents: 12900 }]} />);
    expect(screen.getByText("#1001")).toBeTruthy();
  });
});
