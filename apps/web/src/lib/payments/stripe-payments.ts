/**
 * Stripe payments adapter.
 *
 * Required packages (already included in this project):
 *   pnpm add stripe
 *
 * Required env vars:
 *   STRIPE_SECRET_KEY=sk_live_... (or sk_test_... for testing)
 *   STRIPE_WEBHOOK_SECRET=whsec_...
 *   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
 *
 * See docs/integrations.md for full setup instructions.
 */
import type {
  CheckoutSession,
  PaymentsAdapter,
  PortalSession,
} from "./types";

export class StripePaymentsAdapter implements PaymentsAdapter {
  private getStripe() {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("[StripePayments] STRIPE_SECRET_KEY is not set.");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Stripe = require("stripe");
    return new Stripe(key, { apiVersion: "2026-04-22.dahlia" });
  }

  async createCheckoutSession(options: {
    priceId: string;
    customerId?: string;
    successUrl: string;
    cancelUrl: string;
    metadata?: Record<string, string>;
  }): Promise<CheckoutSession> {
    const stripe = this.getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: options.priceId, quantity: 1 }],
      success_url: options.successUrl,
      cancel_url: options.cancelUrl,
      ...(options.customerId ? { customer: options.customerId } : {}),
      ...(options.metadata ? { metadata: options.metadata } : {}),
    });
    return {
      id: session.id,
      url: session.url ?? options.cancelUrl,
      provider: "stripe",
    };
  }

  async createPortalSession(options: {
    customerId: string;
    returnUrl: string;
  }): Promise<PortalSession> {
    const stripe = this.getStripe();
    const session = await stripe.billingPortal.sessions.create({
      customer: options.customerId,
      return_url: options.returnUrl,
    });
    return { url: session.url };
  }
}
