// Shared domain types — imported as @kv/types across apps and packages.
// Do NOT import from Prisma generated files here — these types are intentionally
// decoupled from the ORM so they can be used in edge runtimes, mobile clients, etc.

// --- Billing ---

export type BillablePlan = "FREE" | "PRO" | "BUSINESS" | "ENTERPRISE";

export type CheckoutPlan = "PRO" | "BUSINESS" | "ENTERPRISE";

export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "paused"
  | "unpaid";

export type SubscriptionEntitlement = {
  plan: BillablePlan;
  status: SubscriptionStatus;
  currentPeriodEnd: Date | null;
};

// --- API Portal ---

export type ApiRateLimitResult =
  | { success: true; limit?: number; remaining?: number; reset?: number }
  | { success: false; limit?: number; remaining?: number; reset?: number };

export type ApiScope = string; // format: "<resource>:<action>" e.g. "demo:read"

export type ApiAccessSource = "demo" | "database";

// --- Booking ---

export type BookingStatusType =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED"
  | "NO_SHOW";

export type PaymentStatusType =
  | "NOT_REQUIRED"
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED";

// --- Users & Orgs ---

export type RoleType = "ADMIN" | "OWNER" | "MEMBER" | "CUSTOMER";

// --- Feature Flags ---

export type FeatureFlags = {
  booking: boolean;
  apiPortal: boolean;
  cms: boolean;
  billing: boolean;
};
