import { handleStartProject } from "../../lib/leads/handler";
import { nodemailerLeadDelivery } from "../../lib/leads/mail";
import { isAllowed } from "../../lib/leads/rateLimit";

// Start a Project submission endpoint. Logic lives in handleStartProject (tested in tests/leads.test.ts).
export async function POST(request: Request) {
  return handleStartProject(request, { delivery: nodemailerLeadDelivery, allow: isAllowed });
}
