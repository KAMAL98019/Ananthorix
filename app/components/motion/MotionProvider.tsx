"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";

// One place that reads motion-related media queries. Components use useMotion() instead of
// creating their own listeners. Server render assumes no preference, so content never depends on JS.
type MotionState = { reducedMotion: boolean; finePointer: boolean; desktop: boolean };

const QUERIES = {
  reducedMotion: "(prefers-reduced-motion: reduce)",
  finePointer: "(hover: hover) and (pointer: fine)",
  desktop: "(min-width: 1024px)",
} as const;

const serverState: MotionState = { reducedMotion: false, finePointer: false, desktop: false };

function subscribe(callback: () => void) {
  const lists = Object.values(QUERIES).map((q) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", callback));
  return () => lists.forEach((l) => l.removeEventListener("change", callback));
}

// useSyncExternalStore requires a stable snapshot. Return the same object while values are unchanged,
// otherwise React re-renders forever.
let cached: MotionState = serverState;

function getSnapshot(): MotionState {
  const next = {
    reducedMotion: window.matchMedia(QUERIES.reducedMotion).matches,
    finePointer: window.matchMedia(QUERIES.finePointer).matches,
    desktop: window.matchMedia(QUERIES.desktop).matches,
  };
  if (
    next.reducedMotion !== cached.reducedMotion ||
    next.finePointer !== cached.finePointer ||
    next.desktop !== cached.desktop
  ) {
    cached = next;
  }
  return cached;
}

const MotionContext = createContext<MotionState>(serverState);

// Ambient loops (floats, streaks, spins, marquee) are gated on html.motion-ready in globals.css. The class is
// added once the page has loaded and the browser is idle, so continuous repaints never compete with the first
// render. One-shot entrance animations are not gated.
function armAmbientMotion() {
  const arm = () => {
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback;
    const add = () => document.documentElement.classList.add("motion-ready");
    if (ric) ric(add, { timeout: 2500 });
    else window.setTimeout(add, 1200);
  };
  if (document.readyState === "complete") arm();
  else window.addEventListener("load", arm, { once: true });
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, () => serverState);
  useEffect(() => {
    armAmbientMotion();
  }, []);
  return <MotionContext.Provider value={state}>{children}</MotionContext.Provider>;
}

export function useMotion(): MotionState {
  return useContext(MotionContext);
}
