"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMotion } from "./MotionProvider";

// Magnetic wrapper for important primary CTAs only. Moves up to 5px toward the pointer.
// Pointer devices with a fine pointer on desktop, motion allowed. Off for touch and reduced motion.
export default function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { reducedMotion, finePointer, desktop } = useMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || !finePointer || !desktop) return;

    const max = 5;
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const x = Math.max(-max, Math.min(max, dx * 0.12));
      const y = Math.max(-max, Math.min(max, dy * 0.12));
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.style.transform = "";
    };
  }, [reducedMotion, finePointer, desktop]);

  return (
    <span ref={ref} className={`inline-flex transition-transform duration-300 ease-out ${className ?? ""}`}>
      {children}
    </span>
  );
}
