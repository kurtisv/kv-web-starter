import type { EmailAdapter, EmailMessage, EmailResult } from "./types";

/**
 * Console email adapter — for local/demo mode.
 * Logs email details to stdout instead of sending.
 * Active by default when RESEND_API_KEY is not set.
 */
export class ConsoleEmailAdapter implements EmailAdapter {
  async send(message: EmailMessage): Promise<EmailResult> {
    console.log(
      "[ConsoleEmail] Would send email:",
      JSON.stringify({ to: message.to, subject: message.subject }, null, 2),
    );
    return { skipped: true };
  }
}
