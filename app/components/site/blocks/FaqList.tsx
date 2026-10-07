// Accessible FAQ using native details/summary. Keyboard, focus and screen-reader behaviour come from the browser.
export default function FaqList({
  items,
  idPrefix,
}: {
  items: { q: string; a: string }[];
  idPrefix: string;
}) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => (
        <details key={item.q} id={`${idPrefix}-${index}`} className="group py-1">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 rounded-tag py-4 text-left text-base font-semibold text-fg-primary">
            {item.q}
            <span aria-hidden="true" className="shrink-0 text-purple transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="type-body pb-5 pr-10 text-fg-secondary">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
