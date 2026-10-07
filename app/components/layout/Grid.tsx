import { cx } from "../ui/cx";

// 4 columns (mobile, 16px gap), 8 (tablet, 20px), 12 (desktop, 24px).
export default function Grid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "grid grid-cols-4 gap-4 md:grid-cols-8 md:gap-5 lg:grid-cols-12 lg:gap-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
