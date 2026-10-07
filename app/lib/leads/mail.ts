import nodemailer from "nodemailer";
import { COMPANY_CONTACT } from "../../content/contact";
import { internalNotification, leadConfirmation } from "./emailTemplates";
import type { LeadSubmissionService } from "./service";

// Lead delivery through the project's existing Nodemailer setup (Gmail SMTP).
// Credentials come only from EMAIL_USER and EMAIL_PASS on the server. They are never logged or sent to the browser.
// Email content lives in emailTemplates.ts (all user-supplied text is escaped there; subjects use fixed labels).

export class LeadDeliveryError extends Error {}

let transporter: nodemailer.Transporter | null = null;

function sender(): { user: string; transport: nodemailer.Transporter } {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) throw new LeadDeliveryError("mail-not-configured");
  if (!transporter) {
    transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  }
  return { user, transport: transporter };
}

// Only error codes are kept for logs. SMTP responses can echo account details, so they are not logged.
function safeCode(error: unknown): string {
  const code = (error as { code?: unknown })?.code;
  return typeof code === "string" ? code : "unknown";
}

// Temporary failures (network blips, Gmail throttling with a 4xx reply) are worth one retry. Auth and permanent
// rejections are not.
function isTransient(error: unknown): boolean {
  const { code, responseCode } = (error ?? {}) as { code?: string; responseCode?: number };
  if (typeof responseCode === "number") return responseCode >= 400 && responseCode < 500;
  return ["ETIMEDOUT", "ECONNECTION", "ESOCKET", "ECONNRESET", "EDNS"].includes(code ?? "");
}

async function sendWithRetry(transport: nodemailer.Transporter, mail: nodemailer.SendMailOptions) {
  try {
    await transport.sendMail(mail);
  } catch (error) {
    if (!isTransient(error)) throw error;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await transport.sendMail(mail);
  }
}

// Sends the internal notification first (required), then the lead's confirmation (best effort).
// Resolves only when the notification has been accepted by the mail server.
export const nodemailerLeadDelivery: LeadSubmissionService = {
  async submit(record) {
    const { user, transport } = sender();

    const notification = internalNotification(record);
    try {
      await sendWithRetry(transport, {
        from: `"Anantorix website" <${user}>`,
        to: COMPANY_CONTACT.email,
        replyTo: record.email,
        ...notification,
      });
    } catch (error) {
      console.error("[lead] internal notification failed", { code: safeCode(error), reference: record.id });
      throw new LeadDeliveryError("notification-failed");
    }

    const confirmation = leadConfirmation(record);
    try {
      await sendWithRetry(transport, {
        from: `"Anantorix Technologies" <${user}>`,
        to: record.email,
        replyTo: COMPANY_CONTACT.email,
        ...confirmation,
      });
    } catch (error) {
      console.error("[lead] confirmation email failed", { code: safeCode(error), reference: record.id });
    }
  },
};
