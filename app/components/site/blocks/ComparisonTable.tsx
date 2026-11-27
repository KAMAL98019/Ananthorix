// Two-option comparison table. The first option is the highlighted one (usually what Anantorix builds).
export type ComparisonRow = { aspect: string; first: string; second: string };

export default function ComparisonTable({
  caption,
  labels,
  rows,
}: {
  caption: string;
  labels: [string, string];
  rows: ComparisonRow[];
}) {
  return (
    <div className="overflow-x-auto rounded-card border border-line bg-canvas shadow-raised">
      <table className="w-full min-w-[560px] border-collapse text-left type-small">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="p-4 font-semibold text-fg-primary">Aspect</th>
            <th scope="col" className="p-4 font-semibold text-deep-blue">{labels[0]}</th>
            <th scope="col" className="p-4 font-semibold text-fg-secondary">{labels[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.aspect} className="border-b border-line last:border-0">
              <th scope="row" className="p-4 font-semibold text-fg-primary">{row.aspect}</th>
              <td className="p-4 text-fg-primary">{row.first}</td>
              <td className="p-4 text-fg-secondary">{row.second}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
