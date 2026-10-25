// Lead pipeline tests. Run: npm test
// No real email is sent: delivery and the mail transport are fakes.
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { handleStartProject, DELIVERY_FAILED, MAX_BYTES } from "../app/lib/leads/handler";
import { createRateLimiter } from "../app/lib/leads/rateLimit";
import { createMailDelivery, LeadDeliveryError, notificationSenderName, type MailSender } from "../app/lib/leads/mail";
import { buildLeadRecord, type LeadSubmissionService } from "../app/lib/leads/service";
import { validateLead } from "../app/lib/leads/validate";
import { internalNotification, leadConfirmation } from "../app/lib/leads/emailTemplates";
import { externalReferrer, utmFrom } from "../app/lib/attribution";
import type { LeadRecord } from "../app/lib/leads/schema";

// Clearly marked test brief. Never a real person.
const validBrief = {
  needs: ["crm"],
  description: "TEST SUBMISSION - automated test, not a real lead.",
  situation: "new-build",
  timeline: "asap",
  budget: "prefer-to-discuss",
  companySize: "1-10",
  name: "Test Person",
  email: "test@example.com",
  phone: "",
  company: "Test Company",
  contactMethod: "email",
  language: "english",
  consent: true,
  website: "",
  sourcePage: "/start-a-project",
  landingPage: "/services/crm-development?utm_source=google",
  referrer: "https://www.google.com/",
  utm: { source: "google", medium: "cpc", campaign: "crm-india", evil: "ignored" },
  contextService: "crm-development",
  contextAgent: "",
};

function recordingDelivery(fail = false) {
  const received: LeadRecord[] = [];
  const delivery: LeadSubmissionService = {
    async submit(record) {
      if (fail) throw new Error("SMTP down: 535 auth failed for user secret@example.com");
      received.push(record);
    },
  };
  return { delivery, received };
}

function request(body: unknown, init: { headers?: Record<string, string>; raw?: string; ip?: string } = {}) {
  return new Request("https://www.anantorix.com/api/start-a-project", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://www.anantorix.com",
      host: "www.anantorix.com",
      "x-forwarded-for": init.ip ?? "203.0.113.10",
      ...init.headers,
    },
    body: init.raw ?? JSON.stringify(body),
  });
}

const deps = (delivery: LeadSubmissionService) => ({ delivery, allow: createRateLimiter() });

describe("POST /api/start-a-project handler", () => {
  test("valid brief is delivered and returns 200 with a reference", async () => {
    const { delivery, received } = recordingDelivery();
    const res = await handleStartProject(request(validBrief), deps(delivery));
    assert.equal(res.status, 200);
    const json = (await res.json()) as { ok: boolean; id: string };
    assert.equal(json.ok, true);
    assert.match(json.id, /^[0-9a-f-]{36}$/);
    assert.equal(received.length, 1);
    assert.equal(received[0].id, json.id);
    assert.equal(res.headers.get("cache-control"), "no-store");
  });

  test("attribution is kept and sanitized (unknown UTM keys dropped)", async () => {
    const { delivery, received } = recordingDelivery();
    await handleStartProject(request(validBrief), deps(delivery));
    const r = received[0];
    assert.equal(r.landingPage, "/services/crm-development?utm_source=google");
    assert.equal(r.sourcePage, "/start-a-project");
    assert.equal(r.referrer, "https://www.google.com/");
    assert.deepEqual(r.utm, { source: "google", medium: "cpc", campaign: "crm-india" });
    assert.equal(r.market, "india");
    assert.ok(!Number.isNaN(Date.parse(r.timestamp)));
  });

  test("invalid email returns 400 with a field error and delivers nothing", async () => {
    const { delivery, received } = recordingDelivery();
    const res = await handleStartProject(request({ ...validBrief, email: "not-an-email" }), deps(delivery));
    assert.equal(res.status, 400);
    const json = (await res.json()) as { errors: Record<string, string> };
    assert.ok(json.errors.email);
    assert.equal(received.length, 0);
  });

  test("missing and empty required fields return 400", async () => {
    const { delivery, received } = recordingDelivery();
    const res = await handleStartProject(request({ ...validBrief, name: "", company: "   ", needs: [], consent: false }), deps(delivery));
    assert.equal(res.status, 400);
    const json = (await res.json()) as { errors: Record<string, string> };
    for (const field of ["name", "company", "needs", "consent"]) assert.ok(json.errors[field], `expected error for ${field}`);
    const empty = await handleStartProject(request({}), deps(delivery));
    assert.equal(empty.status, 400);
    assert.equal(received.length, 0);
  });

  test("honeypot returns 200 but delivers nothing", async () => {
    const { delivery, received } = recordingDelivery();
    const res = await handleStartProject(request({ ...validBrief, website: "http://spam.example" }), deps(delivery));
    assert.equal(res.status, 200);
    const json = (await res.json()) as { id?: string };
    assert.equal(json.id, undefined);
    assert.equal(received.length, 0);
  });

  test("the sixth submission from one address within the window is rate limited", async () => {
    const { delivery } = recordingDelivery();
    const shared = deps(delivery);
    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) statuses.push((await handleStartProject(request(validBrief, { ip: "198.51.100.7" }), shared)).status);
    assert.deepEqual(statuses, [200, 200, 200, 200, 200, 429]);
    const other = await handleStartProject(request(validBrief, { ip: "198.51.100.8" }), shared);
    assert.equal(other.status, 200);
  });

  test("cross-origin requests are rejected with 403", async () => {
    const { delivery, received } = recordingDelivery();
    const res = await handleStartProject(request(validBrief, { headers: { origin: "https://evil.example" } }), deps(delivery));
    assert.equal(res.status, 403);
    const bad = await handleStartProject(request(validBrief, { headers: { origin: "not a url" } }), deps(delivery));
    assert.equal(bad.status, 403);
    assert.equal(received.length, 0);
  });

  test("non-JSON content type returns 415", async () => {
    const { delivery } = recordingDelivery();
    const res = await handleStartProject(request(validBrief, { headers: { "content-type": "text/plain" } }), deps(delivery));
    assert.equal(res.status, 415);
  });

  test("malformed JSON returns 400", async () => {
    const { delivery } = recordingDelivery();
    const res = await handleStartProject(request(null, { raw: "{not json" }), deps(delivery));
    assert.equal(res.status, 400);
  });

  test("oversized body returns 413", async () => {
    const { delivery, received } = recordingDelivery();
    const res = await handleStartProject(request(null, { raw: JSON.stringify({ ...validBrief, description: "x".repeat(MAX_BYTES) }) }), deps(delivery));
    assert.equal(res.status, 413);
    assert.equal(received.length, 0);
  });

  test("delivery failure returns 502 with a generic message and no provider details", async () => {
    const { delivery } = recordingDelivery(true);
    const res = await handleStartProject(request(validBrief), deps(delivery));
    assert.equal(res.status, 502);
    const text = await res.text();
    assert.ok(text.includes(DELIVERY_FAILED.slice(0, 30)));
    assert.ok(!/535|SMTP|secret@example\.com|auth/i.test(text), "provider details leaked to the visitor");
    assert.ok(!text.includes('"ok":true'));
  });
});

describe("email delivery (fake transport)", () => {
  const record = () => {
    const v = validateLead(validBrief);
    assert.ok(v.ok);
    return buildLeadRecord(v.data);
  };
  type Sent = { to: string; subject: string; replyTo?: string; from?: unknown };
  const sender = (behaviour: (n: number) => void): { getSender: () => MailSender; sent: Sent[] } => {
    const sent: Sent[] = [];
    let n = 0;
    return {
      sent,
      getSender: () => ({
        user: "sender@example.com",
        transport: {
          sendMail: (async (mail: Sent) => {
            behaviour(++n);
            sent.push({ to: mail.to, subject: mail.subject, replyTo: mail.replyTo, from: mail.from });
            return {};
          }) as never,
        },
      }),
    };
  };

  test("sends the internal notification, then the confirmation", async () => {
    const { getSender, sent } = sender(() => {});
    await createMailDelivery(getSender, 0).submit(record());
    assert.equal(sent.length, 2);
    assert.equal(sent[0].to, "anantorix@gmail.com");
    assert.deepEqual(sent[0].from, { name: "Test Person via Anantorix website", address: "sender@example.com" });
    assert.equal(sent[0].replyTo, "test@example.com");
    assert.match(sent[0].subject, /^New project brief: CRM \([0-9A-F]{8}\)$/);
    assert.equal(sent[1].to, "test@example.com");
  });

  test("retries once on a transient error", async () => {
    const { getSender, sent } = sender((n) => {
      if (n === 1) throw Object.assign(new Error("timeout"), { code: "ETIMEDOUT" });
    });
    await createMailDelivery(getSender, 0).submit(record());
    assert.equal(sent.length, 2);
  });

  test("throws when the notification is rejected, so the visitor is never told it was sent", async () => {
    const { getSender, sent } = sender(() => {
      throw Object.assign(new Error("bad credentials"), { code: "EAUTH", responseCode: 535 });
    });
    await assert.rejects(createMailDelivery(getSender, 0).submit(record()), LeadDeliveryError);
    assert.equal(sent.length, 0);
  });

  test("a failed confirmation does not fail the lead (the notification was delivered)", async () => {
    const { getSender, sent } = sender((n) => {
      if (n >= 2) throw Object.assign(new Error("rejected"), { responseCode: 550 });
    });
    await createMailDelivery(getSender, 0).submit(record());
    assert.equal(sent.length, 1);
  });

  test("missing EMAIL_USER / EMAIL_PASS throws instead of pretending to deliver", async () => {
    const saved = { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS };
    delete process.env.EMAIL_USER;
    delete process.env.EMAIL_PASS;
    try {
      await assert.rejects(createMailDelivery(undefined, 0).submit(record()), LeadDeliveryError);
    } finally {
      if (saved.user !== undefined) process.env.EMAIL_USER = saved.user;
      if (saved.pass !== undefined) process.env.EMAIL_PASS = saved.pass;
    }
  });

  test("email templates escape visitor input", () => {
    const v = validateLead({ ...validBrief, company: "<script>alert(1)</script>", description: "<b>hi</b> please call me" });
    assert.ok(v.ok);
    const r = buildLeadRecord(v.data);
    for (const html of [internalNotification(r).html, leadConfirmation(r).html]) {
      assert.ok(!html.includes("<script>alert(1)</script>"));
      assert.ok(!html.includes("<b>hi</b>"));
    }
    assert.ok(internalNotification(r).html.includes("&lt;script&gt;"));
  });
});

describe("attribution helpers", () => {
  test("reads only known UTM tags", () => {
    assert.deepEqual(utmFrom("?utm_source=google&utm_medium=cpc&utm_x=1&q=2"), { source: "google", medium: "cpc" });
    assert.deepEqual(utmFrom(""), {});
  });
  test("ignores internal and invalid referrers", () => {
    assert.equal(externalReferrer("https://www.anantorix.com/services", "www.anantorix.com"), "");
    assert.equal(externalReferrer("https://www.google.com/", "www.anantorix.com"), "https://www.google.com/");
    assert.equal(externalReferrer("not a url", "www.anantorix.com"), "");
    assert.equal(externalReferrer("", "www.anantorix.com"), "");
  });
});

describe("notification sender name", () => {
  test("shows the lead name and keeps headers safe", () => {
    assert.equal(notificationSenderName("Ashek M"), "Ashek M via Anantorix website");
    assert.equal(notificationSenderName("கமலேஷ் B"), "கமலேஷ் B via Anantorix website");
    // Quotes, brackets, @, colons and line breaks are removed, so nothing can inject a header.
    assert.equal(notificationSenderName("Evil\"<x@y.com>\r\nBcc: a@b.com"), "Evilxy.comBcc ab.com via Anantorix website");
    assert.equal(notificationSenderName("<>\""), "Anantorix website");
  });
});
