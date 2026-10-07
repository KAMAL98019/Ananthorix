import { cx } from "./cx";

// Small uppercase label above a heading. Use the mono variant only for data labels.
export default function Eyebrow({
  children,
  mono = false,
  className,
}: {
  children: React.ReactNode;
  mono?: boolean;
  className?: string;
}) {
  return (
    <p className={cx(mono ? "font-mono text-[12px] tracking-wide text-purple" : "type-eyebrow", className)}>
      {children}
    </p>
  );
}
