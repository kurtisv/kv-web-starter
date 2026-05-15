export const billingModule = {
  key: "billing",
  routes: ["/pricing", "/dashboard/billing", "/api/webhooks/stripe"],
};

export {
  buildCheckoutMetadata,
  checkoutPlanSchema,
  getPlanPriceId,
  type CheckoutPlan,
} from "./checkout";
