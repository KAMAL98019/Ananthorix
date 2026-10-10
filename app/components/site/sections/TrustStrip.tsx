import DecoText from "../../ui/DecoText";
import { trust } from "../../../content/home";

// 2. Trust strip. Who we build for, as a slow marquee. No client logos, metrics or testimonials.
// The trust lines appear once as real text; every loop copy is decorative (DecoText), so the page text does not
// repeat. Service names are not repeated here because the Capabilities section lists them. Under reduced motion
// the track stays still and wraps (globals.css).
const COPIES = 2; // copies per track, so the track is wider than large screens and the loop never shows a gap

function Item({ text, deco }: { text: string; deco?: boolean }) {
  return (
    <li className="flex items-center gap-10 whitespace-nowrap type-small font-medium text-fg-secondary">
      {deco ? <DecoText text={text} /> : text}
      <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
    </li>
  );
}

function Track({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="marquee-track flex shrink-0 items-center gap-10 pr-10">
      {Array.from({ length: COPIES }, (_, copy) =>
        trust.map((item) => <Item key={`${copy}-${item}`} text={item} deco={hidden || copy > 0} />),
      )}
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
