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
  | "insight"
  | "pricing"
  | "quote";

const kindClasses: Record<CardKind, string> = {
  service: "bg-canvas",
  agent: "bg-canvas",
  project: "bg-canvas",
  testimonial: "bg-surface-1",
  metric: "bg-canvas tabular-nums",
  cta: "bg-starlight shadow-spotlight",
  market: "bg-canvas",
  insight: "bg-canvas",
  pricing: "bg-canvas",
  quote: "bg-canvas",
};

export default function Card({
  kind,
  as: Tag = "div",
  id,
  className,
  children,
}: {
  kind: CardKind;
  as?: "article" | "div" | "li";
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      id={id}
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
