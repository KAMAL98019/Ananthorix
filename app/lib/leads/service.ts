import { randomUUID } from "node:crypto";
import type { LeadInput, LeadRecord } from "./schema";

// Lead delivery abstraction. Concrete delivery (CRM, email, WhatsApp) is NOT connected yet.
// Replace the sink only after Anantorix approves the destination and the consent wording.
export interface LeadSubmissionService {
  submit(record: LeadRecord): Promise<void>;
}

// Development-safe sink. Logs a REDACTED summary only: no name, email, phone or free text.
// It does not deliver the lead anywhere. Submissions are not persisted or forwarded.
export const redactedLogSink: LeadSubmissionService = {
  async submit(record) {
    console.info("[lead] received (redacted, not delivered)", {
      id: record.id,
      formType: record.formType,
      needs: record.needs,
      timeline: record.timeline,
      market: record.market,
      companySize: record.companySize,
      contactMethod: record.contactMethod,
      language: record.language,
      sourcePage: record.sourcePage,
      timestamp: record.timestamp,
    });
  },
};

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
    referrer: input.referrer,
    utm: input.utm,
    contextService: input.contextService,
    contextAgent: input.contextAgent,
  };
}
