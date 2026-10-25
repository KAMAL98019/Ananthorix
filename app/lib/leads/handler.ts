import { validateLead } from "./validate";
import { buildLeadRecord, type LeadSubmissionService } from "./service";
import { clientKey, type RateLimiter } from "./rateLimit";
import { COMPANY_CONTACT } from "../../content/contact";

// Start a Project submission handler. Framework-free (standard Request/Response), so it can be tested with a
// fake delivery service and rate limiter. Order: origin, content type, size, JSON, rate limit, honeypot,
// validation, delivery. Success is reported only after delivery resolves; any delivery error returns 502 with
// a generic message (no provider details reach the visitor).
export const MAX_BYTES = 16 * 1024;
export const DELIVERY_FAILED = `We could not send your brief just now. Please try again, or email ${COMPANY_CONTACT.email}.`;

export type HandlerDeps = { delivery: LeadSubmissionService; allow: RateLimiter };

function reply(status: number, body: unknown) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function handleStartProject(request: Request, { delivery, allow }: HandlerDeps): Promise<Response> {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return reply(403, { ok: false, error: "Request origin not allowed." });
    } catch {
      return reply(403, { ok: false, error: "Request origin not allowed." });
    }
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return reply(415, { ok: false, error: "Send the brief as JSON." });
  }

  const text = await request.text();
  if (text.length > MAX_BYTES) return reply(413, { ok: false, error: "The brief is too large." });

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return reply(400, { ok: false, error: "The brief could not be read." });
  }

  if (!allow(clientKey(request))) {
    return reply(429, { ok: false, error: "Too many submissions. Please try again in a few minutes." });
  }

  // Honeypot: real users never fill this field. Pretend success so bots learn nothing; nothing is delivered.
  if (body && typeof body === "object" && typeof (body as Record<string, unknown>).website === "string" && (body as Record<string, string>).website.trim()) {
    return reply(200, { ok: true });
  }

  const result = validateLead(body);
  if (!result.ok) return reply(400, { ok: false, errors: result.errors });

  const record = buildLeadRecord(result.data);
  try {
    await delivery.submit(record);
  } catch {
    // Details are logged by the delivery service without credentials or form content.
    return reply(502, { ok: false, error: DELIVERY_FAILED });
  }
  return reply(200, { ok: true, id: record.id });
}
