import Button from "../../ui/Button";
import Container from "../../layout/Container";
import Eyebrow from "../../ui/Eyebrow";
import OrbitPoster from "./OrbitPoster";
import Magnetic from "../../motion/Magnetic";

// Hero variants for homepage and template pages.
// "home": headline, outcomes line, two CTAs, Infinity Orbit slot.
// "page": headline and lead only, for service, agent, project and market pages.
export type HeroVariant = "home" | "page";

export default function PageHero({
  variant = "page",
  eyebrow,
  headline,
  lead,
  outcomes,
  primary,
  secondary,
  children,
}: {
  variant?: HeroVariant;
  eyebrow?: string;
  headline: string;
  lead?: string;
  outcomes?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  children?: React.ReactNode;
}) {
  const isHome = variant === "home";
  return (
    <section
      aria-labelledby="hero-heading"
      className={`relative overflow-hidden bg-canvas ${isHome ? "pt-4" : "pt-12"} pb-20 md:pt-16 md:pb-24 lg:pt-20 lg:pb-32`}
    >
      {/* Soft depth: light, not dark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,rgb(91_63_209/0.08),transparent_70%)]"
      />
      <Container className="relative">
        <div className={isHome ? "grid items-center gap-8 lg:grid-cols-12 lg:gap-6" : "max-w-4xl"}>
          <div className={isHome ? "lg:col-span-7" : undefined}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1 id="hero-heading" className={`${isHome ? "type-display" : "type-h1"} mt-5 text-fg-primary`}>
              {headline}
            </h1>
            {lead && <p className="type-lead mt-6 max-w-2xl">{lead}</p>}
            {outcomes && (
              <p className="mt-6 text-base font-semibold text-indigo md:text-lg" data-testid="hero-outcomes">
                {outcomes}
              </p>
            )}
            {(primary || secondary) && (
              <div className="mt-10 flex flex-wrap items-center gap-3">
                {primary && (
                  <Magnetic>
                    <Button variant="primary" href={primary.href}>
                      {primary.label}
                    </Button>
                  </Magnetic>
                )}
                {secondary && (
                  <Button variant="secondary" href={secondary.href}>
                    {secondary.label}
                  </Button>
                )}
              </div>
            )}
            {children}
          </div>
          {isHome && (
            // On small screens the visual comes first, above the headline. Side padding keeps the outer labels inside.
            <div className="order-first flex justify-center px-2 sm:px-0 lg:order-none lg:col-span-5 lg:justify-end">
              <OrbitPoster />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
