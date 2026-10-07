import CtaBand from "../blocks/CtaBand";
import { finalCta } from "../../../content/home";
import { SEE_AGENTS, START_PROJECT } from "../../../content/routes";

// 16. Final CTA
export default function FinalCta() {
  return (
    <CtaBand
      headingId="final-cta-heading"
      headline={finalCta.headline}
      body={finalCta.body}
      primary={{ label: START_PROJECT.label, href: START_PROJECT.href }}
      secondary={{ label: SEE_AGENTS.label, href: SEE_AGENTS.href }}
    />
  );
}
