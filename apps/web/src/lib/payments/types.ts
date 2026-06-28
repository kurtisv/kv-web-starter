export interface CheckoutSession {
  id: string;
  url: string;
  /** "mock" when running in demo mode */
  provider: "stripe" | "mock";
}

export interface PortalSession {
  url: string;
}

export interface PaymentsAdapter {
  /**
   * Create a hosted checkout session for a given price ID.
   * In mock mode returns a local success redirect.
   */
  createCheckoutSession(options: {
    priceId: string;
    customerId?: string;
    successUrl: string;
    cancelUrl: string;
    metadata?: Record<string, string>;
  }): Promise<CheckoutSession>;

  /**
   * Create a billing portal session for an existing customer.
   * In mock mode returns a local settings redirect.
   */
  createPortalSession(options: {
    customerId: string;
    returnUrl: string;
  }): Promise<PortalSession>;
}

export type PaymentsProvider = "mock" | "stripe";
