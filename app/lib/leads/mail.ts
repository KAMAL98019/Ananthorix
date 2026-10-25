import nodemailer from "nodemailer";
import { COMPANY_CONTACT } from "../../content/contact";
import { internalNotification, leadConfirmation } from "./emailTemplates";
import type { LeadSubmissionService } from "./service";

// Lead delivery through the project's existing Nodemailer setup (Gmail SMTP).
// Credentials come only from EMAIL_USER and EMAIL_PASS on the server. They are never logged or sent to the browser.
// Email content lives in emailTemplates.ts (all user-supplied text is escaped there; subjects use fixed labels).

export class LeadDeliveryError extends Error {}

// The parts of a Nodemailer transport this module uses, so tests can supply a fake.
export type MailTransport = Pick<nodemailer.Transporter, "sendMail">;
export type MailSender = { user: string; transport: MailTransport };

let transporter: nodemailer.Transporter | null = null;

function gmailSender(): MailSender {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) {
    // Variable names only; values are never logged.
    console.error("[lead] mail not configured", { missing: [!user && "EMAIL_USER", !pass && "EMAIL_PASS"].filter(Boolean) });
    throw new LeadDeliveryError("mail-not-configured");
  }
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
export function isTransient(error: unknown): boolean {
  const { code, responseCode } = (error ?? {}) as { code?: string; responseCode?: number };
  if (typeof responseCode === "number") return responseCode >= 400 && responseCode < 500;
  return ["ETIMEDOUT", "ECONNECTION", "ESOCKET", "ECONNRESET", "EDNS"].includes(code ?? "");
}

async function sendWithRetry(transport: MailTransport, mail: nodemailer.SendMailOptions, retryDelayMs: number) {
  try {
    await transport.sendMail(mail);
  } catch (error) {
    if (!isTransient(error)) throw error;
    await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
    await transport.sendMail(mail);
  }
}

// Inbox display name for a lead, e.g. "Ashek M via Anantorix website", so enquiries stand out from mail you
// sent yourself. Only letters (with their combining marks), numbers, spaces and . ' - are kept (no quotes, brackets or line breaks in a header);
// Nodemailer encodes the result. The address stays the authenticated account, so delivery is unchanged.
export function notificationSenderName(name: string): string {
  // \p{M} keeps combining marks, which Tamil and other Indian scripts need.
  const safe = name.replace(/[^\p{L}\p{M}\p{N} .'-]/gu, "").replace(/\s+/g, " ").trim().slice(0, 60);
  return safe ? `${safe} via Anantorix website` : "Anantorix website";
}

// Sends the internal notification first (required), then the lead's confirmation (best effort).
// Resolves only when the notification has been accepted by the mail server; otherwise throws.
export function createMailDelivery(getSender: () => MailSender = gmailSender, retryDelayMs = 1500): LeadSubmissionService {
  return {
    async submit(record) {
      const { user, transport } = getSender();

      try {
        await sendWithRetry(transport, { from: { name: notificationSenderName(record.name), address: user }, to: COMPANY_CONTACT.email, replyTo: record.email, ...internalNotification(record) }, retryDelayMs);
      } catch (error) {
        console.error("[lead] internal notification failed", { code: safeCode(error), reference: record.id });
        throw new LeadDeliveryError("notification-failed");
      }

      try {
        await sendWithRetry(transport, { from: `"Anantorix Technologies" <${user}>`, to: record.email, replyTo: COMPANY_CONTACT.email, ...leadConfirmation(record) }, retryDelayMs);
      } catch (error) {
        console.error("[lead] confirmation email failed", { code: safeCode(error), reference: record.id });
      }
    },
  };
}

export const nodemailerLeadDelivery = createMailDelivery();
