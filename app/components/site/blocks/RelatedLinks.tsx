import Link from "next/link";
import { cx } from "../../ui/cx";

// Related-link list. Each link is at least 44px tall and has a visible focus ring.
export default function RelatedLinks({
  heading,
  links,
  className,
}: {
  heading: string;
  links: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <nav aria-label={heading} className={cx("", className)}>
      <p className="type-eyebrow">{heading}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex min-h-11 items-center rounded-chip border border-line-strong bg-canvas px-4 text-small font-medium text-deep-blue hover:bg-surface-1"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
