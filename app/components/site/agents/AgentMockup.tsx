import { cx } from "../../ui/cx";

// Agent UI panel. The transcript is SCRIPTED and ILLUSTRATIVE. It is not customer data.
export default function AgentMockup({
  title,
  transcript,
  className,
}: {
  title: string;
  transcript: { speaker: string; text: string }[];
  className?: string;
}) {
  return (
    <div className={cx("glass rounded-panel p-5 md:p-6", className)}>
      <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
        <p className="font-semibold text-fg-primary">{title}</p>
        <p className="rounded-tag bg-gold/20 px-2 py-1 font-mono text-[11px] font-semibold text-fg-primary">
          ILLUSTRATIVE SCRIPT
        </p>
      </div>
      <ul className="mt-5 flex flex-col gap-3">
        {transcript.map((line, index) => {
          const fromAgent = line.speaker === "Agent";
          return (
            <li key={index} className={cx("flex", fromAgent ? "justify-start" : "justify-end")}>
              <div
                className={cx(
                  "max-w-[85%] rounded-card px-4 py-3 text-small",
                  fromAgent ? "bg-canvas text-fg-primary shadow-raised" : "bg-deep-blue text-canvas",
                )}
              >
                <p className="font-mono text-[11px] opacity-70">{line.speaker}</p>
                <p className="mt-1">{line.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
