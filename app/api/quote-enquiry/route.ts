import { handleQuoteEnquiry } from "../../lib/leads/quoteHandler";
import { nodemailerLeadDelivery } from "../../lib/leads/mail";
import { isAllowed } from "../../lib/leads/rateLimit";

// Quote Enquiry submission endpoint with spam protection, rate limiting, and email dispatch.
export async function POST(request: Request) {
  return handleQuoteEnquiry(request, { delivery: nodemailerLeadDelivery, allow: isAllowed });
}

