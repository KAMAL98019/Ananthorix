import { capabilities, trust } from "../../../content/home";

// 2. Trust strip. Who we build for and what we build, as a slow marquee. No client logos, metrics or testimonials.
// The first copy is the content; the second is aria-hidden and only fills the loop. Under reduced motion the
// track stays still and wraps (globals.css).
const items = [...trust, ...capabilities.map((c) => c.label)];

function Track({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="marquee-track flex shrink-0 items-center gap-10 pr-10">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10 whitespace-nowrap type-small font-medium text-fg-secondary">
          {item}
          <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
        </li>
      ))}
    </ul>
  );
}

export default function TrustStrip() {
  return (
    <section
      aria-label="Who we build for"
      className="marquee overflow-hidden border-y border-line bg-surface-1 py-5 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
    >
      <div className="flex w-max">
        <Track />
        <Track hidden />
      </div>
    </section>
  );
}
