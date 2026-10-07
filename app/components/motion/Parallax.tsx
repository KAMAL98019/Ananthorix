"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMotion } from "./MotionProvider";

// Parallax layer. Transform only. Active on desktop with a fine pointer and motion allowed.
// Speed is clamped to 0.1–0.35 and drift to ±80px. One rAF per frame, passive scroll listener.
// Disabled on touch, small screens and reduced motion, so mobile stays light.
export default function Parallax({
  children,
  speed = 0.2,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion, desktop } = useMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || !desktop) return;

    const clampedSpeed = Math.min(0.35, Math.max(0.1, speed));
    let frame = 0;
    // The current offset is subtracted before measuring. Measuring the transformed box fed each offset back into
    // the next one and made the layer oscillate (visible as shaking while scrolling or resizing).
    let current = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const centre = rect.top - current + rect.height / 2;
      const offset = (centre - window.innerHeight / 2) * -clampedSpeed;
      const y = Math.max(-80, Math.min(80, offset));
      current = y;
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    el.style.willChange = "transform";
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      el.style.transform = "";
      el.style.willChange = "";
    };
  }, [reducedMotion, desktop, speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
