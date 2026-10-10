import Image from "next/image";
import { cx } from "../../ui/cx";
import Parallax from "../../motion/Parallax";
import Tilt3D from "../../motion/Tilt3D";
import DecoText from "../../ui/DecoText";
import { lemniscatePath, lemniscatePoint } from "./infinityPath";

// Infinity Flow (homepage hero). "Anant" means infinite. The idea follows Ananta, the endless coil resting on
// the cosmic ocean: one unbroken infinity path holds everything, with the Anantorix mark at its crossing.
// The six capabilities sit on the two loops like beads, and streaks of light flow around the path without end.
// On load the path draws itself, the mark rises and the labels appear in turn. Mark and labels sit in front of
// the path in 3D, so a pointer tilt (fine pointers only) gives a gentle parallax. All motion is gated on reduced
// motion (globals.css). Labels are decorative because the same services are listed in the page content.

// Lemniscate of Bernoulli in a 500 x 400 viewBox, stretched vertically so the loops read as an infinity sign.
const W = 500;
const H = 400;
// Horizontal reach is kept inside the box (outer points at about 12% and 88%), so labels centred on the
// outer points never spill past the visual at any width.
const AX = 190;
const AY = 300;
const point = (t: number) => lemniscatePoint(t, W / 2, H / 2, AX, AY);
const PATH = lemniscatePath(W / 2, H / 2, AX, AY);

// Three labels per loop: upper, outer and lower point of each loop.
const LABELS = [
  { label: "AI Solutions", t: -0.55, tone: "bg-purple" },
  { label: "Automation", t: 0, tone: "bg-gold" },
  { label: "CRM", t: 0.55, tone: "bg-deep-blue" },
  { label: "Analytics", t: Math.PI - 0.55, tone: "bg-deep-blue" },
  { label: "SaaS", t: Math.PI, tone: "bg-gold" },
  { label: "Web & Mobile", t: Math.PI + 0.55, tone: "bg-purple" },
].map((l) => {
  const p = point(l.t);
  return { ...l, left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` };
});

const MARK_SRC = "/images/brand/anantorix-mark.png";
// Vertical band over the infinity loop of the mark (about 43% to 74% of its height).
const INFINITY_BAND = "linear-gradient(to bottom, transparent 40%, #000 45%, #000 72%, transparent 77%)";
const P3 = "[transform-style:preserve-3d]";

export default function OrbitPoster({ className }: { className?: string }) {
  return (
    <Parallax speed={0.15} className="w-full max-w-[560px]">
      <div aria-hidden="true" data-orbit-slot="infinity-orbit" className={cx("orbit-float relative aspect-[5/4] w-full", className)}>
        {/* Soft shadow on the surface below. It widens as the visual sinks and fades as it rises. */}
        <span className="orbit-float-shadow absolute left-1/2 top-[94%] h-[7%] w-[60%] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(10,31,68,0.16),transparent)]" />

        <Tilt3D className="scene-stage absolute inset-0" max={8}>
          <div className={cx("relative aspect-[5/4] w-full", P3)}>
            {/* Ambient glow: one soft bloom behind each loop and a brighter one behind the mark. */}
            <div className="absolute left-[4%] top-[18%] aspect-square w-[44%] bg-[radial-gradient(closest-side,rgba(91,63,209,0.14),transparent)]" />
            <div className="absolute right-[4%] top-[18%] aspect-square w-[44%] bg-[radial-gradient(closest-side,rgba(212,175,55,0.14),transparent)]" />
            <div className="scene-pulse absolute left-1/2 top-1/2 aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(91,63,209,0.28),transparent)]" />

            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible" focusable="false">
              <defs>
                <linearGradient id="infinity-stroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#5B3FD1" />
                  <stop offset="0.5" stopColor="#0A1F44" />
                  <stop offset="1" stopColor="#D4AF37" />
                </linearGradient>
              </defs>
              {/* Wide soft underlay, then the crisp path, which draws itself on load. */}
              <path d={PATH} fill="none" stroke="url(#infinity-stroke)" strokeOpacity="0.12" strokeWidth="14" strokeLinejoin="round" />
              <path d={PATH} pathLength={1000} fill="none" stroke="url(#infinity-stroke)" strokeOpacity="0.55" strokeWidth="1.6" strokeDasharray="1000" className="infinity-draw" />
              {/* Light streaks flowing around the path. */}
              <path d={PATH} pathLength={1000} fill="none" stroke="#5B3FD1" strokeOpacity="0.35" strokeWidth="7" strokeLinecap="round" strokeDasharray="70 930" className="infinity-streak" />
              <path d={PATH} pathLength={1000} fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="70 930" className="infinity-streak" />
              <path d={PATH} pathLength={1000} fill="none" stroke="#D4AF37" strokeOpacity="0.4" strokeWidth="7" strokeLinecap="round" strokeDasharray="50 950" className="infinity-streak infinity-streak-late" />
              <path d={PATH} pathLength={1000} fill="none" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="50 950" className="infinity-streak infinity-streak-late" />
            </svg>

            {/* The mark at the crossing, lifted in front of the path. */}
            <div className="absolute left-1/2 top-1/2 h-[24%] aspect-square" style={{ transform: "translate(-50%, -50%) translateZ(60px)" }}>
              <div className="orbit-mark-rise relative size-full">
                <Image src={MARK_SRC} alt="" width={256} height={256} sizes="140px" className="size-full object-contain drop-shadow-[0_12px_24px_rgba(91,63,209,0.35)]" />
                <span
                  className="orbit-sheen absolute inset-0"
                  style={{
                    maskImage: `url(${MARK_SRC}), ${INFINITY_BAND}`,
                    WebkitMaskImage: `url(${MARK_SRC}), ${INFINITY_BAND}`,
                    maskSize: "contain, 100% 100%",
                    WebkitMaskSize: "contain, 100% 100%",
                    maskRepeat: "no-repeat, no-repeat",
                    WebkitMaskRepeat: "no-repeat, no-repeat",
                    maskPosition: "center, center",
                    WebkitMaskPosition: "center, center",
                    maskComposite: "intersect",
                    WebkitMaskComposite: "source-in",
                  }}
                />
              </div>
            </div>

            {/* Labels threaded on the loops, also lifted in front of the path. */}
            {LABELS.map((item, index) => (
              <div key={item.label} className="absolute" style={{ left: item.left, top: item.top, transform: "translateZ(36px)" }}>
                <span
                  style={{ animationDelay: `${1300 + index * 120}ms` }}
                  className="orbit-label-in absolute inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-chip border border-white bg-canvas px-2 py-1 text-[9px] font-semibold text-[#171717] shadow-[0_8px_24px_rgba(10,31,68,0.12)] sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[11px]"
                >
                  <span className={cx("size-1.5 rounded-full", item.tone)} />
                  <DecoText text={item.label} />
                </span>
              </div>
            ))}
          </div>
        </Tilt3D>
      </div>
    </Parallax>
  );
}
