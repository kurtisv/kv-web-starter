import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  APP_NAME: z.string().default("KV Web Starter"),
  DATABASE_URL: z.string().optional(),
  AUTH_SECRET: z.string().optional(),
  AUTH_URL: z.string().url().optional(),
  AUTH_GITHUB_ID: z.string().optional(),
  AUTH_GITHUB_SECRET: z.string().optional(),
  AUTH_TRUST_HOST: z.coerce.boolean().default(true),
  AUTH_ENABLE_DEMO_LOGIN: z.coerce.boolean().default(false),
  AUTH_DEMO_EMAIL: z.string().email().default("admin@example.com"),
  AUTH_DEMO_PASSWORD: z.string().min(8).optional(),
  DASHBOARD_BOOTSTRAP_EMAILS: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_PRICE_PRO: z.string().optional(),
  STRIPE_PRICE_BUSINESS: z.string().optional(),
  STRIPE_PRICE_ENTERPRISE: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().email().optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  API_DEMO_KEYS: z.string().optional(),
  FEATURE_BOOKING: z.coerce.boolean().default(true),
  FEATURE_API_PORTAL: z.coerce.boolean().default(true),
  FEATURE_CMS: z.coerce.boolean().default(false),
  FEATURE_BILLING: z.coerce.boolean().default(true),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
});

export const env = envSchema.parse(process.env);

// Runtime security assertions — fail fast rather than silently misconfigure.
if (env.NODE_ENV === "production") {
  if (!process.env.AUTH_SECRET) {
    throw new Error(
      "[SECURITY] AUTH_SECRET must be set in production. Generate one with: openssl rand -base64 32",
    );
  }
  if (env.AUTH_ENABLE_DEMO_LOGIN) {
    console.warn(
      "[SECURITY] AUTH_ENABLE_DEMO_LOGIN is enabled in production. " +
        "This exposes a demo backdoor. Set AUTH_ENABLE_DEMO_LOGIN=false immediately.",
    );
  }
  if (env.AUTH_DEMO_PASSWORD === "password123") {
    console.warn(
      "[SECURITY] AUTH_DEMO_PASSWORD is set to the default 'password123'. " +
        "Change it or disable AUTH_ENABLE_DEMO_LOGIN.",
    );
  }
} else {
  // Dev-mode defaults so the local loop stays frictionless
  if (!process.env.AUTH_DEMO_PASSWORD) {
    (env as Record<string, unknown>).AUTH_DEMO_PASSWORD = "password123";
  }
}
