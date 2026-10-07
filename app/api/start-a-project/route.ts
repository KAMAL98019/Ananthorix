import { NextResponse } from "next/server";
import { validateLead } from "../../lib/leads/validate";
import { buildLeadRecord } from "../../lib/leads/service";
import { nodemailerLeadDelivery } from "../../lib/leads/mail";
import { clientKey, isAllowed } from "../../lib/leads/rateLimit";

// Start a Project submission endpoint. Replaces the retired /api/contact.
// Order: origin check, content type, size limit, rate limit, honeypot, validation, delivery.
// Success is reported only after the internal notification has been accepted by the mail server.
const MAX_BYTES = 16 * 1024;
const DELIVERY_FAILED = "We could not send your brief just now. Please try again, or email anantorix@gmail.com.";

function reply(status: number, body: unknown) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
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

  if (!isAllowed(clientKey(request))) {
    return reply(429, { ok: false, error: "Too many submissions. Please try again in a few minutes." });
  }

  // Honeypot: real users never fill this field. Pretend success so bots learn nothing.
  if (body && typeof body === "object" && typeof (body as Record<string, unknown>).website === "string" && (body as Record<string, string>).website.trim()) {
    return reply(200, { ok: true });
  }

  const result = validateLead(body);
  if (!result.ok) return reply(400, { ok: false, errors: result.errors });

  const record = buildLeadRecord(result.data);
  try {
    await nodemailerLeadDelivery.submit(record);
  } catch {
    // Details are logged server-side without credentials. The visitor sees only the generic message.
    return reply(502, { ok: false, error: DELIVERY_FAILED });
  }
  return reply(200, { ok: true, id: record.id });
}
