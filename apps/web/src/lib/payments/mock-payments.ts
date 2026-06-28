import type {
  CheckoutSession,
  PaymentsAdapter,
  PortalSession,
} from "./types";

/**
 * Mock payments adapter — for local/demo mode.
 * Returns fake sessions that redirect to demo success/cancel pages.
 * Active by default when STRIPE_SECRET_KEY is not set.
 */
export class MockPaymentsAdapter implements PaymentsAdapter {
  async createCheckoutSession(options: {
    priceId: string;
    customerId?: string;
    successUrl: string;
    cancelUrl: string;
    metadata?: Record<string, string>;
  }): Promise<CheckoutSession> {
    console.log("[MockPayments] createCheckoutSession:", options.priceId);
    return {
      id: `mock_cs_${Date.now()}`,
      url: `${options.successUrl}?mock=1&priceId=${encodeURIComponent(options.priceId)}`,
      provider: "mock",
    };
  }

  async createPortalSession(options: {
    customerId: string;
    returnUrl: string;
  }): Promise<PortalSession> {
    console.log("[MockPayments] createPortalSession:", options.customerId);
    return { url: options.returnUrl };
  }
}
