import type { PaymentsAdapter, PaymentsProvider } from "./types";

export type {
  CheckoutSession,
  PaymentsAdapter,
  PaymentsProvider,
  PortalSession,
} from "./types";

/**
 * Returns the payments adapter selected by PAYMENTS_PROVIDER env var.
 * Falls back to "mock" when STRIPE_SECRET_KEY is not set.
 *
 * Supported providers:
 *   mock   — simulates checkout (default, no config required)
 *   stripe — Stripe Checkout + Billing Portal (requires STRIPE_SECRET_KEY)
 *
 * See docs/integrations.md for full setup instructions.
 */
export function getPaymentsAdapter(): PaymentsAdapter {
  const provider = (process.env.PAYMENTS_PROVIDER ?? "mock") as PaymentsProvider;

  if (provider === "stripe" && process.env.STRIPE_SECRET_KEY) {
    const { StripePaymentsAdapter } = require("./stripe-payments");
    return new StripePaymentsAdapter();
  }

  const { MockPaymentsAdapter } = require("./mock-payments");
  return new MockPaymentsAdapter();
}
