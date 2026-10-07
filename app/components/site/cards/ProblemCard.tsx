import Link from "next/link";
import Card from "../../ui/Card";

// Customer problem, Anantorix answer, and the relevant route.
export default function ProblemCard({
  problem,
  answer,
  href,
  linkLabel,
}: {
  problem: string;
  answer: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <Card kind="service" as="article">
      <h3 className="type-h4 text-fg-primary">{problem}</h3>
      <p className="type-small mt-3">{answer}</p>
      <Link
        href={href}
        className="mt-5 inline-flex min-h-11 items-center font-semibold text-deep-blue underline underline-offset-4 hover:text-indigo"
      >
        {linkLabel}
        <span className="sr-only"> (go to page)</span>
      </Link>
    </Card>
  );
}
