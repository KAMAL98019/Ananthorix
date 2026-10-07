import { FlaskConical, Handshake, LifeBuoy, Target, type LucideIcon } from "lucide-react";
import Card from "../../ui/Card";

const ICONS: Record<string, LucideIcon> = {
  "Fixed-scope project": Target,
  "Dedicated team": Handshake,
  "AI pilot": FlaskConical,
  "Ongoing support": LifeBuoy,
};

// Engagement model card. No pricing is shown; pricing is not published.
export default function EngagementCard({ title, body, bestFor }: { title: string; body: string; bestFor: string }) {
  const Icon = ICONS[title] ?? Target;
  return (
    <Card kind="service" as="article" className="hover-lift flex flex-col">
      <span aria-hidden="true" className="inline-flex size-11 items-center justify-center rounded-button bg-gradient-to-br from-purple/12 to-gold/15 text-purple">
        <Icon className="size-5" />
      </span>
      <h3 className="type-h4 mt-5 text-fg-primary">{title}</h3>
      <p className="type-small mt-2">{body}</p>
      <div className="mt-auto pt-5">
        <div className="rounded-[14px] bg-surface-1 p-4">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-purple">Best for</p>
          <p className="type-small mt-1 text-fg-primary">{bestFor}</p>
        </div>
      </div>
    </Card>
  );
}
