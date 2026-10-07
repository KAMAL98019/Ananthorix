"use client";

import { useEffect, useRef } from "react";
import { useMotion } from "./MotionProvider";

// Pointer-driven 3D tilt. Writes --tilt-x / --tilt-y (degrees) on the element; CSS applies them inside a
// perspective (.scene-stage). Mouse and touch, motion-allowed only. rAF-throttled; transform only. Capped at `max` degrees.
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

  // Mouse: tilt follows the cursor while it is over the stage.
  // Touch: tilt follows the finger while it is down, then eases back. touch-action: pan-y keeps vertical swipes
  // scrolling the page (the browser cancels the pointer when a scroll starts), so only taps and sideways drags tilt.
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    let touching = false;
    const apply = () => {
      frame = 0;
      el.style.setProperty("--tilt-x", `${y.toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${x.toFixed(2)}deg`);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(apply);
    };
    const track = (event: PointerEvent, strength: number) => {
      const rect = el.getBoundingClientRect();
      const px = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const py = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      x = (px - 0.5) * 2 * max * strength;
      y = -(py - 0.5) * 2 * max * strength;
      schedule();
    };
    const reset = () => {
      touching = false;
      x = 0;
      y = 0;
      schedule();
    };
    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch" && event.pointerType !== "pen") return;
      touching = true;
      track(event, 1.4);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "mouse") track(event, 1);
      else if (touching) track(event, 1.4);
    };
    const onLeave = (event: PointerEvent) => {
      if (event.pointerType === "mouse") reset();
    };

    el.style.touchAction = "pan-y";
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerup", reset);
    el.addEventListener("pointercancel", reset);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerup", reset);
      el.removeEventListener("pointercancel", reset);
      if (frame) window.cancelAnimationFrame(frame);
      el.style.removeProperty("--tilt-x");
      el.style.removeProperty("--tilt-y");
      el.style.removeProperty("touch-action");
    };
  }, [reducedMotion, max]);

  return (
    <div ref={ref} className={className}>
      <div className="tilt-3d">{children}</div>
    </div>
  );
}
