import { validateSeoEnquiry } from "./seoValidate";
import { buildSeoRecord, type LeadSubmissionService } from "./service";
import { clientKey, type RateLimiter } from "./rateLimit";
import { COMPANY_CONTACT } from "../../content/contact";
import type { SeoEnquiryRecord } from "./seoSchema";

export const MAX_BYTES = 16 * 1024;
export const DELIVERY_FAILED = `We could not send your SEO consultation request right now. Please try again, or reach us directly at ${COMPANY_CONTACT.email} or ${COMPANY_CONTACT.phoneDisplay}.`;

export type SeoHandlerDeps = { delivery: LeadSubmissionService<SeoEnquiryRecord>; allow: RateLimiter };

function reply(status: number, body: unknown) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function handleSeoEnquiry(request: Request, { delivery, allow }: SeoHandlerDeps): Promise<Response> {
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
    return reply(415, { ok: false, error: "Send the SEO consultation request as JSON." });
  }

  const text = await request.text();
  if (text.length > MAX_BYTES) return reply(413, { ok: false, error: "The request is too large." });

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return reply(400, { ok: false, error: "The request could not be read." });
  }

  if (!allow(clientKey(request))) {
    return reply(429, { ok: false, error: "Too many enquiries. Please wait a few minutes before trying again." });
  }

  // Honeypot check: If bot filled the hidden website field, return fake 200 without sending anything
  if (
    body &&
    typeof body === "object" &&
    typeof (body as Record<string, unknown>).website === "string" &&
    (body as Record<string, string>).website.trim()
  ) {
    return reply(200, { ok: true, id: "filtered" });
  }

  const result = validateSeoEnquiry(body);
  if (!result.ok) return reply(400, { ok: false, errors: result.errors });

  const record = buildSeoRecord(result.data);
  try {
    await delivery.submit(record);
  } catch {
    return reply(502, { ok: false, error: DELIVERY_FAILED });
  }

  return reply(200, { ok: true, id: record.id });
}

