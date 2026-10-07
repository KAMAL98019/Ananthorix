"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Runs CSS animations only while the element is on screen. Sets data-playing on the wrapper,
// which the stylesheet uses to pause animations offscreen. Content is fully present without JS.
export default function PlayWhenVisible({ children, className, label }: { children: ReactNode; className?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    el.dataset.playing = "false";
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.dataset.playing = entry?.isIntersecting ? "true" : "false";
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-playing="true" className={className} role="group" aria-label={label}>
      {children}
    </div>
  );
}
