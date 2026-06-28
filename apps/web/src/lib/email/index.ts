/* eslint-disable @typescript-eslint/no-require-imports */
import type { EmailAdapter, EmailProvider } from "./types";

export type { EmailAdapter, EmailMessage, EmailResult, EmailProvider } from "./types";

/**
 * Returns the email adapter selected by EMAIL_PROVIDER env var.
 * Falls back to "console" (logs to stdout) when no provider is set or
 * the required API key is missing.
 *
 * Supported providers:
 *   console — logs to stdout (default, no config required)
 *   resend  — Resend transactional email (requires RESEND_API_KEY)
 *
 * See docs/integrations.md for full setup instructions.
 */
export function getEmailAdapter(): EmailAdapter {
  const provider = (process.env.EMAIL_PROVIDER ?? "console") as EmailProvider;

  if (provider === "resend" && process.env.RESEND_API_KEY) {
    const { ResendEmailAdapter } = require("./resend-email");
    return new ResendEmailAdapter();
  }

  const { ConsoleEmailAdapter } = require("./console-email");
  return new ConsoleEmailAdapter();
}

/**
 * Convenience: send a transactional email using the configured adapter.
 */
export async function sendEmail(
  message: import("./types").EmailMessage,
): Promise<import("./types").EmailResult> {
  return getEmailAdapter().send(message);
}
