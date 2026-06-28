export interface EmailMessage {
  to: string;
  subject: string;
  /** React element rendered to HTML, or plain HTML string. */
  react?: React.ReactElement;
  html?: string;
  text?: string;
}

export interface EmailResult {
  id?: string;
  skipped?: boolean;
}

export interface EmailAdapter {
  /**
   * Send a transactional email.
   * In demo/console mode this logs to stdout and returns { skipped: true }.
   */
  send(message: EmailMessage): Promise<EmailResult>;
}

export type EmailProvider = "console" | "resend";
