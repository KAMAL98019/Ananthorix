import Eyebrow from "../../ui/Eyebrow";
import { cx } from "../../ui/cx";

// Shared heading block: eyebrow, H2 and optional lead. Heading level is set by the caller.
export default function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cx("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className={cx("type-h2 text-fg-primary", eyebrow && "mt-4")}>
        {title}
      </h2>
      {lead && <p className="type-lead mt-5">{lead}</p>}
    </div>
  );
}
