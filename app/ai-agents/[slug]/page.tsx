import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AgentPageTemplate from "../../components/site/agents/AgentPageTemplate";
import { agentSlugs, getAgent } from "../../content/agents";
import { pageMetadata } from "../../lib/seo";

// Only the three approved agent routes exist. Any other slug returns 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return agentSlugs.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) return {};
  return pageMetadata({
    title: agent.metaTitle,
    description: agent.metaDescription,
    path: `/ai-agents/${agent.slug}`,
  });
}

export default async function AgentPage({ params }: Props) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) notFound();
  return <AgentPageTemplate agent={agent} />;
}
