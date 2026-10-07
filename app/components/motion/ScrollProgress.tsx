"use client";

import { useEffect, useRef } from "react";
import { useMotion } from "./MotionProvider";

// Thin reading-progress bar. Desktop only, transform scaleX, one rAF per frame.
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion, desktop } = useMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || !desktop) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${progress.toFixed(4)})`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion, desktop]);

  if (reducedMotion || !desktop) return null;

  return <div ref={ref} aria-hidden="true" className="scroll-progress" />;
}
