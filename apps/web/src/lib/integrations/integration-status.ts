export type IntegrationStatus = "active" | "inactive" | "partial";

export interface Integration {
  id: string;
  name: string;
  description: string;
  status: IntegrationStatus;
  /** Which env vars are required and whether each is present */
  envVars: Array<{ name: string; present: boolean; required: boolean }>;
  docsUrl?: string;
}

const CHECK = (name: string) => Boolean(process.env[name]);

/**
 * Returns a list of all supported integrations with their live status.
 * Safe to call server-side only (reads process.env).
 */
export function getIntegrationStatus(): Integration[] {
  return [
    {
      id: "database",
      name: "Database (Prisma)",
      description: "PostgreSQL via Prisma ORM. Enables users, bookings, orders, and all persistent data.",
      status: CHECK("DATABASE_URL") ? "active" : "inactive",
      envVars: [
        { name: "DATABASE_URL", present: CHECK("DATABASE_URL"), required: true },
      ],
    },
    {
      id: "stripe",
      name: "Stripe Payments",
      description: "Subscription billing and one-time payments via Stripe Checkout.",
      status:
        CHECK("STRIPE_SECRET_KEY") && CHECK("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY")
          ? "active"
          : CHECK("STRIPE_SECRET_KEY")
            ? "partial"
            : "inactive",
      envVars: [
        { name: "STRIPE_SECRET_KEY", present: CHECK("STRIPE_SECRET_KEY"), required: true },
        { name: "STRIPE_WEBHOOK_SECRET", present: CHECK("STRIPE_WEBHOOK_SECRET"), required: true },
        { name: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", present: CHECK("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"), required: true },
        { name: "STRIPE_PRICE_PRO", present: CHECK("STRIPE_PRICE_PRO"), required: false },
        { name: "STRIPE_PRICE_BUSINESS", present: CHECK("STRIPE_PRICE_BUSINESS"), required: false },
      ],
      docsUrl: "https://dashboard.stripe.com/apikeys",
    },
    {
      id: "resend",
      name: "Resend Email",
      description: "Transactional emails for bookings, auth, and notifications.",
      status: CHECK("RESEND_API_KEY") ? "active" : "inactive",
      envVars: [
        { name: "RESEND_API_KEY", present: CHECK("RESEND_API_KEY"), required: true },
        { name: "RESEND_FROM_EMAIL", present: CHECK("RESEND_FROM_EMAIL"), required: true },
      ],
      docsUrl: "https://resend.com/api-keys",
    },
    {
      id: "storage-supabase",
      name: "Supabase Storage",
      description: "File uploads stored in Supabase Storage buckets.",
      status:
        process.env.STORAGE_PROVIDER === "supabase" && CHECK("SUPABASE_URL")
          ? "active"
          : "inactive",
      envVars: [
        { name: "STORAGE_PROVIDER", present: process.env.STORAGE_PROVIDER === "supabase", required: true },
        { name: "SUPABASE_URL", present: CHECK("SUPABASE_URL"), required: true },
        { name: "SUPABASE_SERVICE_ROLE_KEY", present: CHECK("SUPABASE_SERVICE_ROLE_KEY"), required: true },
        { name: "SUPABASE_STORAGE_BUCKET", present: CHECK("SUPABASE_STORAGE_BUCKET"), required: false },
      ],
    },
    {
      id: "storage-azure",
      name: "Azure Blob Storage",
      description: "File uploads stored in Azure Blob Storage containers.",
      status:
        process.env.STORAGE_PROVIDER === "azure" && CHECK("AZURE_STORAGE_CONNECTION_STRING")
          ? "active"
          : "inactive",
      envVars: [
        { name: "STORAGE_PROVIDER", present: process.env.STORAGE_PROVIDER === "azure", required: true },
        { name: "AZURE_STORAGE_CONNECTION_STRING", present: CHECK("AZURE_STORAGE_CONNECTION_STRING"), required: true },
        { name: "AZURE_STORAGE_CONTAINER", present: CHECK("AZURE_STORAGE_CONTAINER"), required: false },
      ],
    },
    {
      id: "storage-s3",
      name: "AWS S3",
      description: "File uploads stored in Amazon S3 buckets.",
      status:
        process.env.STORAGE_PROVIDER === "s3" && CHECK("AWS_S3_BUCKET")
          ? "active"
          : "inactive",
      envVars: [
        { name: "STORAGE_PROVIDER", present: process.env.STORAGE_PROVIDER === "s3", required: true },
        { name: "AWS_ACCESS_KEY_ID", present: CHECK("AWS_ACCESS_KEY_ID"), required: true },
        { name: "AWS_SECRET_ACCESS_KEY", present: CHECK("AWS_SECRET_ACCESS_KEY"), required: true },
        { name: "AWS_REGION", present: CHECK("AWS_REGION"), required: true },
        { name: "AWS_S3_BUCKET", present: CHECK("AWS_S3_BUCKET"), required: true },
      ],
    },
    {
      id: "storage-r2",
      name: "Cloudflare R2",
      description: "File uploads stored in Cloudflare R2 (S3-compatible, zero egress fees).",
      status:
        process.env.STORAGE_PROVIDER === "r2" && CHECK("R2_BUCKET")
          ? "active"
          : "inactive",
      envVars: [
        { name: "STORAGE_PROVIDER", present: process.env.STORAGE_PROVIDER === "r2", required: true },
        { name: "R2_ACCOUNT_ID", present: CHECK("R2_ACCOUNT_ID"), required: true },
        { name: "R2_ACCESS_KEY_ID", present: CHECK("R2_ACCESS_KEY_ID"), required: true },
        { name: "R2_SECRET_ACCESS_KEY", present: CHECK("R2_SECRET_ACCESS_KEY"), required: true },
        { name: "R2_BUCKET", present: CHECK("R2_BUCKET"), required: true },
        { name: "R2_PUBLIC_URL", present: CHECK("R2_PUBLIC_URL"), required: true },
      ],
    },
    {
      id: "upstash",
      name: "Upstash Redis",
      description: "Rate limiting and caching for API portal and high-traffic routes.",
      status:
        CHECK("UPSTASH_REDIS_REST_URL") && CHECK("UPSTASH_REDIS_REST_TOKEN")
          ? "active"
          : "inactive",
      envVars: [
        { name: "UPSTASH_REDIS_REST_URL", present: CHECK("UPSTASH_REDIS_REST_URL"), required: true },
        { name: "UPSTASH_REDIS_REST_TOKEN", present: CHECK("UPSTASH_REDIS_REST_TOKEN"), required: true },
      ],
      docsUrl: "https://console.upstash.com",
    },
    {
      id: "sentry",
      name: "Sentry",
      description: "Error tracking and performance monitoring.",
      status:
        CHECK("SENTRY_ORG") && CHECK("SENTRY_PROJECT")
          ? "active"
          : "inactive",
      envVars: [
        { name: "SENTRY_ORG", present: CHECK("SENTRY_ORG"), required: true },
        { name: "SENTRY_PROJECT", present: CHECK("SENTRY_PROJECT"), required: true },
        { name: "SENTRY_AUTH_TOKEN", present: CHECK("SENTRY_AUTH_TOKEN"), required: false },
        { name: "NEXT_PUBLIC_SENTRY_DSN", present: CHECK("NEXT_PUBLIC_SENTRY_DSN"), required: false },
      ],
      docsUrl: "https://sentry.io",
    },
    {
      id: "github-oauth",
      name: "GitHub OAuth",
      description: "Sign in with GitHub for dashboard access.",
      status:
        CHECK("AUTH_GITHUB_ID") && CHECK("AUTH_GITHUB_SECRET")
          ? "active"
          : "inactive",
      envVars: [
        { name: "AUTH_GITHUB_ID", present: CHECK("AUTH_GITHUB_ID"), required: true },
        { name: "AUTH_GITHUB_SECRET", present: CHECK("AUTH_GITHUB_SECRET"), required: true },
      ],
      docsUrl: "https://github.com/settings/applications/new",
    },
  ];
}
