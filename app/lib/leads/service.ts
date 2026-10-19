import { randomUUID } from "node:crypto";
import type { LeadInput, LeadRecord } from "./schema";

// Lead delivery abstraction. The live implementation is email via Nodemailer (mail.ts): the brief goes to the
// company inbox and a confirmation goes to the visitor. submit() must throw if the lead was not delivered, so the
// endpoint never reports success for an undelivered lead. There is no logging-only fallback.
export interface LeadSubmissionService {
  submit(record: LeadRecord): Promise<void>;
}

export function buildLeadRecord(input: LeadInput): LeadRecord {
  return {
    id: randomUUID(),
    formType: "start-a-project",
    timestamp: new Date().toISOString(),
    needs: input.needs,
    description: input.description,
    situation: input.situation,
    timeline: input.timeline,
    budget: input.budget,
    companySize: input.companySize,
    market: input.market,
    name: input.name,
    email: input.email,
    phone: input.phone,
    company: input.company,
    contactMethod: input.contactMethod,
    language: input.language,
    consent: input.consent,
    sourcePage: input.sourcePage,
    landingPage: input.landingPage,
    referrer: input.referrer,
    utm: input.utm,
    contextService: input.contextService,
    contextAgent: input.contextAgent,
  };
}
