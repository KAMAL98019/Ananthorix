import { cx } from "./cx";

// Base card primitive. Carries no content: callers supply children.
export type CardKind =
  | "service"
  | "agent"
  | "project"
  | "testimonial"
  | "metric"
  | "cta"
  | "market"
  | "insight";

const kindClasses: Record<CardKind, string> = {
  service: "bg-canvas",
  agent: "bg-canvas",
  project: "bg-canvas",
  testimonial: "bg-surface-1",
  metric: "bg-canvas tabular-nums",
  cta: "bg-starlight shadow-spotlight",
  market: "bg-canvas",
  insight: "bg-canvas",
};

export default function Card({
  kind,
  as: Tag = "div",
  className,
  children,
}: {
  kind: CardKind;
  as?: "article" | "div" | "li";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      data-card-kind={kind}
      className={cx(
        "card-glow h-full rounded-card border border-line p-6 shadow-raised md:p-8",
        kindClasses[kind],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
