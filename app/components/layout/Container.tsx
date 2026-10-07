import { cx } from "../ui/cx";

// Max width 1280px. Gutters: 16 (mobile), 20 (tablet), 24 (desktop).
export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("mx-auto w-full max-w-page px-4 md:px-5 lg:px-6", className)}>
      {children}
    </div>
  );
}
