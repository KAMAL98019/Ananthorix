import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { handleSeoEnquiry } from "../app/lib/leads/seoHandler";
import { createRateLimiter } from "../app/lib/leads/rateLimit";
import type { LeadSubmissionService } from "../app/lib/leads/service";
import type { SeoEnquiryRecord } from "../app/lib/leads/seoSchema";

const validPayload = {
  name: "Senthil Kumar",
  company: "Kongu Textiles",
  email: "senthil@kongutextiles.in",
  phone: "+91 98765 43210",
  websiteUrl: "https://kongutextiles.in",
  industry: "Textiles & Garment Manufacturing",
  targetLocation: "Namakkal, Salem, Erode & Tamil Nadu",
  challenges: "We rank poorly for local textile keywords and want qualified search enquiries.",
  preferredPackage: "seo-growth",
  budget: "8k-15k",
  website: "",
  sourcePage: "/seo-services",
  landingPage: "/seo-services",
  referrer: "https://www.google.com/",
  utm: { source: "google", medium: "organic" },
};

function recordingDelivery(fail = false) {
  const received: SeoEnquiryRecord[] = [];
  const delivery: LeadSubmissionService<SeoEnquiryRecord> = {
    async submit(record: SeoEnquiryRecord) {
      if (fail) throw new Error("SMTP connection failed: 535 auth failed");
      received.push(record);
    },
  };
  return { delivery, received };
}

function request(body: unknown, init: { headers?: Record<string, string>; raw?: string; ip?: string } = {}) {
  return new Request("https://www.anantorix.com/api/seo-enquiry", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://www.anantorix.com",
      host: "www.anantorix.com",
      "x-forwarded-for": init.ip ?? "203.0.113.20",
      ...init.headers,
    },
    body: init.raw ?? JSON.stringify(body),
  });
}

const deps = (delivery: LeadSubmissionService<SeoEnquiryRecord>) => ({ delivery, allow: createRateLimiter() });

describe("SEO Enquiry Handler", () => {
  it("processes valid SEO enquiry and delivers lead", async () => {
    const { delivery, received } = recordingDelivery();
    const req = request(validPayload);
    const response = await handleSeoEnquiry(req, deps(delivery));

    assert.equal(response.status, 200);
    const body = (await response.json()) as { ok: boolean; id: string };
    assert.equal(body.ok, true);
    assert.match(body.id, /^[0-9a-f-]{36}$/);
    assert.equal(received.length, 1);
    assert.equal(received[0].company, "Kongu Textiles");
    assert.equal(received[0].preferredPackage, "seo-growth");
  });

  it("silently drops spam honeypot submissions", async () => {
    const { delivery, received } = recordingDelivery();
    const req = request({
      ...validPayload,
      website: "http://spam-bot-trap.com",
    });

    const response = await handleSeoEnquiry(req, deps(delivery));

    assert.equal(response.status, 200);
    const body = (await response.json()) as { ok: boolean; id: string };
    assert.equal(body.ok, true);
    assert.equal(body.id, "filtered");
    assert.equal(received.length, 0);
  });

  it("returns 400 with errors for invalid inputs", async () => {
    const invalidPayload = {
      name: "S",
      company: "",
      email: "invalid-email-address",
      phone: "123",
      websiteUrl: "x",
      industry: "",
      targetLocation: "",
      challenges: "",
      preferredPackage: "invalid-pkg",
      budget: "invalid-budget",
      website: "",
    };

    const { delivery, received } = recordingDelivery();
    const req = request(invalidPayload);
    const response = await handleSeoEnquiry(req, deps(delivery));

    assert.equal(response.status, 400);
    const body = (await response.json()) as { ok: boolean; errors: Record<string, string> };
    assert.equal(body.ok, false);
    assert.ok(body.errors.name);
    assert.ok(body.errors.email);
    assert.ok(body.errors.phone);
    assert.ok(body.errors.websiteUrl);
    assert.ok(body.errors.challenges);
    assert.equal(received.length, 0);
  });

  it("returns 502 when email delivery throws", async () => {
    const { delivery } = recordingDelivery(true);
    const req = request(validPayload);
    const response = await handleSeoEnquiry(req, deps(delivery));

    assert.equal(response.status, 502);
    const body = (await response.json()) as { ok: boolean; error: string };
    assert.equal(body.ok, false);
    assert.match(body.error, /could not send your SEO consultation request/i);
  });
});
