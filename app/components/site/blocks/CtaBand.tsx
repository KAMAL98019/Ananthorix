import Link from "next/link";
import Container from "../../layout/Container";
import Section from "../../layout/Section";
import CosmicBanner, { cosmicPrimary, cosmicSecondary } from "./CosmicBanner";
import { lemniscatePath } from "./infinityPath";

const PATH = lemniscatePath(250, 100, 210, 220);

// Reusable closing band on a dark cosmic banner, with a faint infinity path behind the text.
// Primary and secondary actions are passed in, so pages choose their own routes.
export default function CtaBand({
  headingId,
  headline,
  body,
  primary,
  secondary,
}: {
  headingId: string;
  headline: string;
  body?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <Section tone="canvas" labelledBy={headingId} className="lg:py-section-md">
      <Container>
        <CosmicBanner className="text-center">
          <svg aria-hidden="true" viewBox="0 0 500 200" className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto w-[90%] max-w-[900px] -translate-y-1/2 opacity-30" focusable="false">
            <path
              d={PATH}
              fill="none"
              stroke="#9C8BFF"
              strokeWidth="1"
              strokeLinejoin="round"
            />
            <path
              d={PATH}
              pathLength={1000}
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="60 940"
              className="infinity-streak"
            />
          </svg>
          <h2 id={headingId} className="type-h2 mx-auto max-w-3xl text-starlight">
            {headline}
          </h2>
          {body && <p className="type-lead mx-auto mt-5 max-w-2xl text-starlight/75!">{body}</p>}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href={primary.href} className={cosmicPrimary}>
              {primary.label} <span aria-hidden="true">→</span>
            </Link>
            {secondary && (
              <Link href={secondary.href} className={cosmicSecondary}>
                {secondary.label}
              </Link>
            )}
          </div>
        </CosmicBanner>
      </Container>
    </Section>
  );
}
