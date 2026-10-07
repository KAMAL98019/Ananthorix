import Link from "next/link";

// Visible breadcrumb trail. The last item is the current page and is not a link.
export default function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="type-small text-fg-secondary">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="font-medium text-fg-primary">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="inline-flex min-h-11 items-center underline-offset-4 hover:text-deep-blue hover:underline">
                  {item.name}
                </Link>
              )}
              {!isLast && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
