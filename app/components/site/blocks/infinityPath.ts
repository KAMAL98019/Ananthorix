// Smooth infinity path (lemniscate of Bernoulli). One source for every infinity drawn on the site, so the loops
// are always rounded with no pointed ends. ax / ay are the horizontal and vertical reach from the centre.
export function lemniscatePoint(t: number, cx: number, cy: number, ax: number, ay: number) {
  const d = 1 + Math.sin(t) ** 2;
  return { x: cx + (ax * Math.cos(t)) / d, y: cy + (ay * Math.sin(t) * Math.cos(t)) / d };
}

export function lemniscatePath(cx: number, cy: number, ax: number, ay: number, steps = 160) {
  const pts = Array.from({ length: steps }, (_, i) => lemniscatePoint((i / steps) * Math.PI * 2, cx, cy, ax, ay));
  return `M${pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L")} Z`;
}
