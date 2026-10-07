import Container from "../../layout/Container";
import Section from "../../layout/Section";
import SectionHeading from "../blocks/SectionHeading";
import AgentShowcase from "../agents/AgentShowcase";
import { agents } from "../../../content/home";
import { getAgent } from "../../../content/agents";

// Each tab also lists the agent's key jobs, taken from the agent product content.
const tabs = agents.map((a) => ({ ...a, jobs: getAgent(a.href.split("/").pop() ?? "")?.jobs.slice(0, 4) ?? [] }));

// 5. AI Agents Showcase. The agents are products, presented by outcome.
export default function AgentsShowcase() {
  return (
    <Section tone="surface1" labelledBy="agents-heading">
      <Container>
        <SectionHeading
          id="agents-heading"
          eyebrow="AI Agents"
          title="Three AI Agents, each built around one job."
          lead="Choose an agent to see the outcome it delivers and a scripted example of how it works."
        />
        <div className="mt-12">
          <AgentShowcase agents={tabs} />
        </div>
      </Container>
    </Section>
  );
}
