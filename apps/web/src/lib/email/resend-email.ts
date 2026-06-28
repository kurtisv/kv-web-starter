/**
 * Resend email adapter.
 *
 * Required packages (already included in this project):
 *   pnpm add resend
 *
 * Required env vars:
 *   RESEND_API_KEY=re_...
 *   RESEND_FROM_EMAIL=noreply@yourdomain.com
 *
 * See docs/integrations.md for full setup instructions.
 */
import type { EmailAdapter, EmailMessage, EmailResult } from "./types";

export class ResendEmailAdapter implements EmailAdapter {
  async send(message: EmailMessage): Promise<EmailResult> {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Resend } = require("resend");
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !from) {
      console.warn("[ResendEmail] RESEND_API_KEY or RESEND_FROM_EMAIL not set — skipping.");
      return { skipped: true };
    }

    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to: message.to,
      subject: message.subject,
      ...(message.react ? { react: message.react } : {}),
      ...(message.html ? { html: message.html } : {}),
      ...(message.text ? { text: message.text } : {}),
    });

    return { id: result.data?.id };
  }
}
