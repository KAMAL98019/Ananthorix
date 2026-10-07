import Link from "next/link";
import { ChartColumn, TrendingUp, Workflow, type LucideIcon } from "lucide-react";
import Card from "../../ui/Card";

const ICONS: Record<string, LucideIcon> = { "Sell more": TrendingUp, "Run smarter": Workflow, "Decide faster": ChartColumn };

// Outcome pillar (Sell more / Run smarter / Decide faster) with related links.
export default function OutcomeCard({
  title,
  body,
  links,
}: {
  title: string;
  body: string;
  links: { label: string; href: string }[];
}) {
  const Icon = ICONS[title] ?? TrendingUp;
  return (
    <Card kind="service" as="article" className="hover-lift flex flex-col overflow-hidden">
      <span aria-hidden="true" className="absolute -right-10 -top-10 size-40 rounded-full bg-[radial-gradient(closest-side,rgba(91,63,209,0.12),transparent)]" />
      <span aria-hidden="true" className="relative inline-flex size-12 items-center justify-center rounded-button bg-gradient-to-br from-purple to-deep-blue text-starlight shadow-[0_10px_24px_rgba(91,63,209,0.35)]">
        <Icon className="size-5" />
      </span>
      <h3 className="type-h3 mt-6 text-fg-primary">{title}</h3>
      <p className="type-body mt-3 text-fg-secondary">{body}</p>
      <ul className="mt-auto flex flex-col border-t border-line pt-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="group/link inline-flex min-h-11 items-center gap-1 font-medium text-deep-blue hover:text-indigo">
              {link.label}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
