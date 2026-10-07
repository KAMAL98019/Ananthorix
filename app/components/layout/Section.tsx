import { cx } from "../ui/cx";
import Reveal from "../motion/Reveal";

// Vertical rhythm: 64 (mobile), 96 (tablet), 128 (desktop), 160 (wide desktop).
const tones = {
  canvas: "bg-canvas",
  surface1: "bg-surface-1",
  surface2: "bg-surface-2",
  starlight: "bg-starlight",
} as const;

export default function Section({
  children,
  tone = "canvas",
  className,
  labelledBy,
  id,
}: {
  children: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
  labelledBy?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx(
        tones[tone],
        "py-section-sm md:py-section-md lg:py-section-lg 2xl:py-section-xl",
        className,
      )}
    >
      <Reveal>{children}</Reveal>
    </section>
  );
}
