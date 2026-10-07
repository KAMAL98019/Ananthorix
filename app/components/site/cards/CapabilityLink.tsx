import Link from "next/link";
import { Sparkles } from "lucide-react";
import { SERVICE_ICONS } from "./serviceIcons";
import Card from "../../ui/Card";

// A capability is a whole-card link. The card is the focus target and the label names the destination.
export default function CapabilityLink({
  label,
  summary,
  href,
}: {
  label: string;
  summary: string;
  href: string;
}) {
  const Icon = SERVICE_ICONS[href.replace("/services/", "")] ?? Sparkles;
  return (
    <Link href={href} className="group block h-full rounded-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
      <Card kind="service" as="div" className="hover-lift flex flex-col group-hover:shadow-floating">
        <span
          aria-hidden="true"
          className="inline-flex size-11 items-center justify-center rounded-button bg-gradient-to-br from-purple/12 to-gold/12 text-purple transition-colors duration-300 group-hover:from-purple group-hover:to-deep-blue group-hover:text-starlight"
        >
          <Icon className="size-5" />
        </span>
        <h3 className="type-h4 mt-5 text-fg-primary group-hover:text-indigo">{label}</h3>
        <p className="type-small mt-2">{summary}</p>
        <span aria-hidden="true" className="mt-auto inline-flex items-center gap-1 pt-4 font-semibold text-purple">
          View <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </Card>
    </Link>
  );
}
