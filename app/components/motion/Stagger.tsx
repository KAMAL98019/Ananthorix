import { Children, type ReactNode } from "react";
import Reveal from "./Reveal";

// Reveals children one after another, 70ms apart. Keeps the stagger logic in one place.
export default function Stagger({ children, step = 70, className }: { children: ReactNode; step?: number; className?: string }) {
  return (
    <div className={className}>
      {Children.toArray(children).map((child, index) => (
        <Reveal key={index} delay={index * step}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
