import type { StorageProvider } from "@/lib/storage/types";
import type { EmailProvider } from "@/lib/email/types";
import type { PaymentsProvider } from "@/lib/payments/types";

export interface ProviderConfig {
  storage: StorageProvider;
  email: EmailProvider;
  payments: PaymentsProvider;
  database: "connected" | "demo";
  demoMode: boolean;
}

/**
 * Returns the currently active provider configuration based on env vars.
 * Safe to call server-side only.
 */
export function getProviderConfig(): ProviderConfig {
  const hasDb = Boolean(process.env.DATABASE_URL);
  const hasStripe = Boolean(process.env.STRIPE_SECRET_KEY);
  const hasResend = Boolean(process.env.RESEND_API_KEY);

  const storage = (process.env.STORAGE_PROVIDER ?? "local") as StorageProvider;
  const email: EmailProvider =
    process.env.EMAIL_PROVIDER === "resend" && hasResend ? "resend" : "console";
  const payments: PaymentsProvider =
    process.env.PAYMENTS_PROVIDER === "stripe" && hasStripe ? "stripe" : "mock";

  const demoMode = !hasDb || !hasStripe || !hasResend;

  return {
    storage,
    email,
    payments,
    database: hasDb ? "connected" : "demo",
    demoMode,
  };
}
