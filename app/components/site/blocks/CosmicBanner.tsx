import { cx } from "../../ui/cx";

// Dark "deep space" banner: nebula glows, a star field and a perspective grid floor on #070D22.
// Text inside must use light colours (starlight, gold). The backdrop is decorative.
export default function CosmicBanner({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        "relative isolate overflow-hidden rounded-[28px] bg-[#070D22] px-6 py-12 text-starlight shadow-[0_40px_120px_rgba(10,31,68,0.35)] md:px-12 md:py-16 lg:px-16 lg:py-20",
        className,
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-[15%] -top-[45%] aspect-square w-[70%] bg-[radial-gradient(closest-side,rgba(91,63,209,0.45),transparent)]" />
        <div className="absolute -bottom-[55%] -right-[15%] aspect-square w-[60%] bg-[radial-gradient(closest-side,rgba(212,175,55,0.16),transparent)]" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 12% 18%, #fff, transparent), radial-gradient(1px 1px at 28% 72%, #fff, transparent), radial-gradient(1.5px 1.5px at 46% 34%, #fff, transparent), radial-gradient(1px 1px at 64% 12%, #fff, transparent), radial-gradient(1px 1px at 78% 58%, #fff, transparent), radial-gradient(1.5px 1.5px at 90% 26%, #fff, transparent), radial-gradient(1px 1px at 8% 88%, #fff, transparent), radial-gradient(1px 1px at 56% 90%, #fff, transparent)",
          }}
        />
        <div
          className="absolute inset-x-[-20%] bottom-[-10%] h-[55%] origin-bottom opacity-40 [mask-image:linear-gradient(to_top,#000,transparent)]"
          style={{
            transform: "perspective(600px) rotateX(62deg)",
            backgroundImage:
              "linear-gradient(rgba(156,139,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(156,139,255,0.35) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>
      {children}
    </div>
  );
}

// Eyebrow chip for dark banners.
export function CosmicEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-chip border border-white/15 bg-white/5 px-3 py-1 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-gold shadow-[0_0_10px_#D4AF37]" />
      {children}
    </p>
  );
}

// Primary (gold) and secondary (glass) link styles for dark banners.
export const cosmicPrimary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-button bg-gradient-to-r from-[#F1D778] to-gold px-6 font-semibold text-deep-blue shadow-[0_10px_30px_rgba(212,175,55,0.35)] transition-transform hover:-translate-y-0.5";
export const cosmicSecondary =
  "inline-flex min-h-11 items-center justify-center rounded-button border border-white/20 bg-white/5 px-6 font-semibold text-starlight transition-colors hover:bg-white/10";
