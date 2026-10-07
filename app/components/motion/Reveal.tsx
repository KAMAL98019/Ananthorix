"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useMotion } from "./MotionProvider";

// Scroll reveal. Content is in the HTML from the server. The "armed" class only hides it after
// hydration, when the element is below the fold and motion is allowed. It reveals once.
// Crawlers and no-JS visitors always see the content.
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { reducedMotion } = useMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // The first render happens before the preference is known, so clear any state it may have set.
    el.classList.remove("reveal-armed", "reveal-in");
    if (reducedMotion || !("IntersectionObserver" in window)) return;

    const rect = el.getBoundingClientRect();
    const belowFold = rect.top > window.innerHeight * 0.9;
    if (!belowFold) return;

    el.classList.add("reveal-armed");
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // Also reveal anything already above the viewport (anchor jumps, fast flings), so it is never left hidden.
        if (entry && (entry.isIntersecting || entry.boundingClientRect.top < 0)) {
          el.classList.add("reveal-in");
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      el.classList.remove("reveal-armed", "reveal-in");
    };
  }, [reducedMotion]);

  const style = { "--reveal-delay": `${delay}ms` } as CSSProperties;
  return (
    <Tag ref={ref} style={style} className={className}>
      {children}
    </Tag>
  );
}
