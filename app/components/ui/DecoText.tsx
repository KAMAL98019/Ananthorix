import type { ReactNode } from "react";
import { cx } from "./cx";

// Decorative text: drawn by a CSS pseudo-element from a data attribute, so it is visible on screen but is not
// part of the page's text content. Use only for text that repeats real content elsewhere or is pure decoration
// (3D scene labels, carousel loop copies, marquee loop copies). Hidden from assistive tech.
export default function DecoText({ text, className }: { text: string; className?: string }) {
  return <span aria-hidden="true" data-deco={text} className={cx("before:content-[attr(data-deco)]", className)} />;
}

// Flattens simple JSX children ("label", or ["label", " ↑"]) to a string for DecoText.
export function childrenText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(childrenText).join("");
  return "";
}
