import Link from "next/link";
import Container from "../../layout/Container";
import { START_PROJECT } from "../../../content/routes";
import { startProjectHref } from "../../../lib/leads/context";
import Magnetic from "../../motion/Magnetic";
import Tilt3D from "../../motion/Tilt3D";
import CosmicBanner, { CosmicEyebrow, cosmicPrimary, cosmicSecondary } from "../blocks/CosmicBanner";
import ServiceScene, { SCENE_FOR } from "./ServiceScene";
import type { ServiceDef } from "../../../content/services";

// Solution hero: a dark "deep space" banner with a distinct CSS-3D scene per service. Text sits on #070D22,
// so every text colour here is light (starlight, gold) and passes contrast. The scene is decorative.
export default function ServiceHero({ service }: { service: ServiceDef }) {
  const kind = SCENE_FOR[service.slug] ?? "neural";
  return (
    <section aria-labelledby="service-hero-heading" className="bg-canvas pt-4 pb-6 md:pt-6">
      <Container>
        <CosmicBanner>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <CosmicEyebrow>{service.eyebrow}</CosmicEyebrow>
              <h1 id="service-hero-heading" className="type-h1 mt-6 text-starlight">
                {service.h1}
              </h1>
              <p className="type-lead mt-6 max-w-2xl text-starlight/75!">{service.lead}</p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Link href={startProjectHref({ service: service.slug })} className={cosmicPrimary}>
                    {START_PROJECT.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </Magnetic>
                <Link href={`#${service.slug}-build`} className={cosmicSecondary}>
                  What we build
                </Link>
              </div>
              <ul className="mt-10 flex flex-wrap gap-2" aria-label="Capabilities">
                {service.heroChips.map((chip) => (
                  <li key={chip} className="rounded-chip border border-white/10 bg-white/5 px-3 py-1.5 text-small text-starlight/85">
                    {chip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6">
              <Tilt3D className="scene-stage mx-auto w-full max-w-[520px]" max={7}>
                <ServiceScene kind={kind} labels={service.heroChips} />
              </Tilt3D>
            </div>
          </div>
        </CosmicBanner>
      </Container>
    </section>
  );
}
