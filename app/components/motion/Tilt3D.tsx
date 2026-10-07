"use client";

import { useEffect, useRef } from "react";
import { useMotion } from "./MotionProvider";

// Pointer-driven 3D tilt. Writes --tilt-x / --tilt-y (degrees) on the element; CSS applies them inside a
// perspective (.scene-stage). Fine pointer and motion-allowed only. rAF-throttled; transform only. Capped at `max` degrees.
export default function Tilt3D({
  children,
  className,
  max = 8,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotion();

  // Pause scene animations while offscreen (the stylesheet reads data-playing).
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      el.dataset.playing = entry?.isIntersecting ? "true" : "false";
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      el.style.setProperty("--tilt-x", `${y.toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${x.toFixed(2)}deg`);
    };
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      x = ((event.clientX - rect.left) / rect.width - 0.5) * 2 * max;
      y = -((event.clientY - rect.top) / rect.height - 0.5) * 2 * max;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };
    const onLeave = () => {
      x = 0;
      y = 0;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) window.cancelAnimationFrame(frame);
      el.style.removeProperty("--tilt-x");
      el.style.removeProperty("--tilt-y");
    };
  }, [reducedMotion, max]);

  return (
    <div ref={ref} className={className}>
      <div className="tilt-3d">{children}</div>
    </div>
  );
}
