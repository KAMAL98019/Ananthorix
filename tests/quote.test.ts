// Quote enquiry tests. Run: npm test
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { handleQuoteEnquiry } from "../app/lib/leads/quoteHandler";
import { createRateLimiter } from "../app/lib/leads/rateLimit";
import type { LeadSubmissionService } from "../app/lib/leads/service";
import type { QuoteRecord } from "../app/lib/leads/schema";

const validQuote = {
  name: "Arun Kumar",
  company: "Apex Retail Solutions",
  email: "arun@apexretail.in",
  phone: "+91 9876543210",
  service: "crm-development",
  budget: "75k-150k",
  timeline: "1-3-months",
  requirements: "We need a custom CRM to manage our retail vendor accounts and order pipeline.",
  website: "",
  sourcePage: "/pricing",
  landingPage: "/pricing",
  referrer: "https://www.google.com/",
  utm: { source: "google", medium: "cpc", campaign: "pricing-india" },
};

function recordingDelivery(fail = false) {
  const received: QuoteRecord[] = [];
  const delivery: LeadSubmissionService<QuoteRecord> = {
    async submit(record: QuoteRecord) {
      if (fail) throw new Error("SMTP down: 535 auth failed");
      received.push(record);
    },
  };
  return { delivery, received };
}

function request(body: unknown, init: { headers?: Record<string, string>; raw?: string; ip?: string } = {}) {
  return new Request("https://www.anantorix.com/api/quote-enquiry", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://www.anantorix.com",
      host: "www.anantorix.com",
      "x-forwarded-for": init.ip ?? "203.0.113.15",
      ...init.headers,
    },
    body: init.raw ?? JSON.stringify(body),
  });
}

const deps = (delivery: LeadSubmissionService<QuoteRecord>) => ({ delivery, allow: createRateLimiter() });

describe("POST /api/quote-enquiry handler", () => {
  test("valid quote enquiry returns 200 with id and delivers record", async () => {
    const { delivery, received } = recordingDelivery();
    const res = await handleQuoteEnquiry(request(validQuote), deps(delivery));
    assert.equal(res.status, 200);
    const json = (await res.json()) as { ok: boolean; id: string };
    assert.equal(json.ok, true);
    assert.match(json.id, /^[0-9a-f-]{36}$/);
    assert.equal(received.length, 1);
    const r = received[0] as QuoteRecord;
    assert.equal(r.name, "Arun Kumar");
    assert.equal(r.company, "Apex Retail Solutions");
    assert.equal(r.service, "crm-development");
    assert.equal(r.budget, "75k-150k");
  });

  test("honeypot submission returns 200 but drops delivery", async () => {
    const { delivery, received } = recordingDelivery();
    const res = await handleQuoteEnquiry(request({ ...validQuote, website: "http://spambot.xyz" }), deps(delivery));
    assert.equal(res.status, 200);
    assert.equal(received.length, 0);
  });

  test("invalid email or missing phone returns 400", async () => {
    const { delivery, received } = recordingDelivery();
    const res = await handleQuoteEnquiry(request({ ...validQuote, email: "invalid-email" }), deps(delivery));
    assert.equal(res.status, 400);
    const json = (await res.json()) as { ok: boolean; errors: Record<string, string> };
    assert.ok(json.errors.email);
    assert.equal(received.length, 0);
  });

  test("invalid service or budget option returns 400", async () => {
    const { delivery } = recordingDelivery();
    const res = await handleQuoteEnquiry(request({ ...validQuote, service: "unapproved-service" }), deps(delivery));
    assert.equal(res.status, 400);
    const json = (await res.json()) as { ok: boolean; errors: Record<string, string> };
    assert.ok(json.errors.service);
  });

  test("delivery error returns 502 without leaking credentials", async () => {
    const { delivery } = recordingDelivery(true);
    const res = await handleQuoteEnquiry(request(validQuote), deps(delivery));
    assert.equal(res.status, 502);
    const json = (await res.json()) as { ok: boolean; error: string };
    assert.ok(json.error.includes("could not send"));
    assert.ok(!json.error.includes("SMTP"));
  });
});
