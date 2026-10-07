import Card from "../../ui/Card";

// Why Anantorix differentiator. Outcome-first wording. No metrics.
export default function DifferentiatorCard({ title, body }: { title: string; body: string }) {
  return (
    <Card kind="service" as="div">
      <h3 className="type-h4 text-fg-primary">{title}</h3>
      <p className="type-small mt-3">{body}</p>
    </Card>
  );
}
