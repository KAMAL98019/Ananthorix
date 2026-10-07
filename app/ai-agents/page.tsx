import type { Metadata } from "next";
import AgentsHub from "../components/site/agents/AgentsHub";
import { pageMetadata } from "../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AI Agent Development for Business",
  description:
    "AI agents for sales, CRM and business operations: the Sales AI Agent, CRM AI Agent and Business AI Agent. Your team stays in control of business-impacting actions.",
  path: "/ai-agents",
});

export default function AiAgentsPage() {
  return <AgentsHub />;
}
