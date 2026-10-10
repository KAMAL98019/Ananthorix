import type { CSSProperties, ReactNode } from "react";
import { cx } from "../../ui/cx";
import DecoText, { childrenText } from "../../ui/DecoText";

// CSS-3D hero scenes for the solution pages. One distinct scene per service, no WebGL and no extra JS.
// Sizes use container units (cqw), so every scene scales with its stage. Motion classes live in globals.css
// and are gated on prefers-reduced-motion: without motion, every scene renders in its final, static pose.
// Decorative only: the same capabilities are listed in the page content.

export type SceneKind =
  | "neural"
  | "pipeline"
  | "bars"
  | "funnel"
  | "stack"
  | "cube"
  | "browser"
  | "phone"
  | "tenants"
  | "desktop"
  | "layers"
  | "launch";

export const SCENE_FOR: Record<string, SceneKind> = {
  "ai-solutions": "neural",
  "ai-automation": "pipeline",
  "business-analytics": "bars",
  "crm-development": "funnel",
  "erp-software-development": "stack",
  "custom-software-development": "cube",
  "web-application-development": "browser",
  "mobile-app-development": "phone",
  "saas-development": "tenants",
  "desktop-application-development": "desktop",
  "ui-ux-design": "layers",
  "mvp-development": "launch",
};

const u = (n: number) => `${n}cqw`;
const P3 = "[transform-style:preserve-3d]";

// Block faces for the dark stage.
const TONES = {
  violet: { top: "linear-gradient(135deg,#7B63F0,#5B3FD1)", front: "#3B2F7A", side: "#2A2160" },
  indigo: { top: "linear-gradient(135deg,#4A5FC1,#2B3C8F)", front: "#1E2B6B", side: "#152052" },
  gold: { top: "linear-gradient(135deg,#F1D778,#D4AF37)", front: "#A8892A", side: "#866C1F" },
  glass: { top: "rgba(255,255,255,0.14)", front: "rgba(255,255,255,0.08)", side: "rgba(255,255,255,0.05)" },
} as const;
type Tone = keyof typeof TONES;

// A box standing on the isometric floor. x/y/w/d/h are in cqw.
function Block({
  x,
  y,
  w,
  d,
  h,
  tone = "violet",
  className,
  style,
  children,
}: {
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  tone?: Tone;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const t = TONES[tone];
  return (
    <div className={cx("absolute", P3, className)} style={{ left: u(x), top: u(y), width: u(w), height: u(d), ...style }}>
      <div className="absolute left-0 top-full origin-top" style={{ width: u(w), height: u(h), transform: "rotateX(90deg)", background: t.front }} />
      <div className="absolute left-full top-0 origin-left" style={{ width: u(h), height: u(d), transform: "rotateY(-90deg)", background: t.side }} />
      <div className="absolute inset-0" style={{ transform: `translateZ(${u(h)})`, background: t.top }}>
        {children}
      </div>
    </div>
  );
}

// A label on the isometric floor that always faces the viewer.
function Billboard({ x, y, z, children, gold }: { x: number; y: number; z: number; children: ReactNode; gold?: boolean }) {
  return (
    <span
      className={cx(
        "absolute whitespace-nowrap rounded-chip border px-[1.6cqw] py-[0.7cqw] text-[max(10px,2.3cqw)] font-semibold",
        gold ? "border-gold/50 bg-gold/20 text-[#FBE9A8]" : "border-white/15 bg-white/10 text-starlight",
      )}
      style={{ left: u(x), top: u(y), transform: `translateZ(${u(z)}) rotateZ(-45deg) rotateX(-58deg) translate(-50%, -100%)` }}
    >
      <DecoText text={childrenText(children)} />
    </span>
  );
}

// Isometric floor with a soft grid. Children are placed on it in cqw.
function IsoFloor({ children, size = 62 }: { children: ReactNode; size?: number }) {
  const offset = (100 - size) / 2;
  return (
    <div
      className={cx("absolute", P3)}
      style={{ left: u(offset), top: u(offset + 4), width: u(size), height: u(size), transform: "rotateX(58deg) rotateZ(45deg)" }}
    >
      <div
        className="absolute inset-0 rounded-[2cqw] border border-white/10"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(91,63,209,0.35), transparent 70%), linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px) 0 0 / 10% 10%, linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px) 0 0 / 10% 10%",
        }}
      />
      {children}
    </div>
  );
}

// Floating pill in the flat (non-isometric) scenes.
function Pill({ children, className, style, gold }: { children: ReactNode; className?: string; style?: CSSProperties; gold?: boolean }) {
  return (
    <span
      className={cx(
        "absolute whitespace-nowrap rounded-chip border px-[1.8cqw] py-[0.8cqw] text-[max(10px,2.4cqw)] font-semibold shadow-[0_8px_30px_rgba(0,0,0,0.35)]",
        gold ? "border-gold/50 bg-gold/20 text-[#FBE9A8]" : "border-white/15 bg-white/10 text-starlight",
        className,
      )}
      style={style}
    >
      <DecoText text={childrenText(children)} />
    </span>
  );
}

// Window chrome used by the browser, desktop and layer scenes.
function WindowBar() {
  return (
    <div className="flex items-center gap-[0.8cqw] border-b border-white/10 px-[2cqw] py-[1.4cqw]">
      <span className="size-[1.3cqw] rounded-full bg-[#F87171]/80" />
      <span className="size-[1.3cqw] rounded-full bg-gold/80" />
      <span className="size-[1.3cqw] rounded-full bg-[#4ADE80]/70" />
      <span className="ml-[2cqw] h-[1.4cqw] w-[30%] rounded-full bg-white/10" />
    </div>
  );
}

function Lines({ count = 3, className }: { count?: number; className?: string }) {
  return (
    <div className={cx("flex flex-col gap-[1.2cqw]", className)}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="h-[1.3cqw] rounded-full bg-white/15" style={{ width: `${90 - i * 18}%` }} />
      ))}
    </div>
  );
}

export default function ServiceScene({ kind, labels }: { kind: SceneKind; labels: string[] }) {
  const l = (i: number) => labels[i % labels.length] ?? "";
  return (
    <div aria-hidden="true" data-scene={kind} className={cx("relative aspect-square w-full", P3)}>
      {kind === "neural" && <Neural l={l} />}
      {kind === "pipeline" && <Pipeline l={l} />}
      {kind === "bars" && <Bars l={l} />}
      {kind === "funnel" && <Funnel l={l} />}
      {kind === "stack" && <Stack l={l} />}
      {kind === "cube" && <Cube l={l} />}
      {kind === "browser" && <Browser l={l} />}
      {kind === "phone" && <Phone l={l} />}
      {kind === "tenants" && <Tenants l={l} />}
      {kind === "desktop" && <Desktop l={l} />}
      {kind === "layers" && <Layers l={l} />}
      {kind === "launch" && <Launch l={l} />}
    </div>
  );
}

type SceneProps = { l: (i: number) => string };

// AI Solutions: a glowing core inside three tilted orbits, each carrying a node.
function Neural({ l }: SceneProps) {
  const rings = [
    { size: 78, tilt: "rotateX(72deg) rotateY(-12deg)", cls: "scene-spin", dot: "bg-purple" },
    { size: 64, tilt: "rotateX(64deg) rotateY(48deg)", cls: "scene-spin-rev", dot: "bg-gold" },
    { size: 50, tilt: "rotateX(76deg) rotateY(-60deg)", cls: "scene-spin-slow", dot: "bg-[#8EA2FF]" },
  ];
  return (
    <>
      <div className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle,rgba(123,99,240,0.55),transparent_68%)] scene-pulse" />
      {rings.map((r) => (
        <div key={r.size} className={cx("absolute left-1/2 top-1/2", P3)} style={{ width: u(r.size), height: u(r.size), marginLeft: u(-r.size / 2), marginTop: u(-r.size / 2), transform: r.tilt }}>
          <div className={cx("absolute inset-0 rounded-full border-[0.4cqw] border-white/25", r.cls)}>
            <span className={cx("absolute left-1/2 top-0 size-[3cqw] -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_20px_currentColor]", r.dot)} />
          </div>
        </div>
      ))}
      <div className="absolute left-1/2 top-1/2 size-[20cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff,#9C8BFF_30%,#5B3FD1_60%,#2A1F6E)] shadow-[0_0_60px_rgba(123,99,240,0.8)]" />
      {/* Synapse links */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" focusable="false">
        {[
          [50, 50, 14, 22],
          [50, 50, 86, 30],
          [50, 50, 20, 80],
          [50, 50, 84, 78],
        ].map(([x1, y1, x2, y2]) => (
          <g key={`${x2}-${y2}`}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9C8BFF" strokeOpacity="0.35" strokeWidth="0.4" strokeDasharray="1.5 1.5" className="scene-dash" />
            <circle cx={x2} cy={y2} r="1.4" fill="#D4AF37" />
          </g>
        ))}
      </svg>
      <Pill className="scene-bob left-[2%] top-[13%]">{l(0)}</Pill>
      <Pill className="scene-bob-late right-[2%] top-[21%]" gold>
        {l(1)}
      </Pill>
      <Pill className="scene-bob-late left-[6%] bottom-[13%]">{l(2)}</Pill>
      <Pill className="scene-bob right-[4%] bottom-[15%]">{l(4)}</Pill>
    </>
  );
}

// AI Automation: documents travel a conveyor through three stations.
function Pipeline({ l }: SceneProps) {
  return (
    <IsoFloor>
      <Block x={4} y={27} w={54} d={8} h={1.2} tone="glass" />
      <Block x={6} y={22} w={10} d={18} h={8} tone="indigo" />
      <Block x={26} y={22} w={10} d={18} h={11} tone="violet" />
      <Block x={46} y={22} w={10} d={18} h={8} tone="gold" />
      {[0, 1, 2].map((i) => (
        <div key={i} className={cx("absolute", P3, "scene-travel")} style={{ left: u(4), top: u(28.5), animationDelay: `${i * -2}s` }}>
          <Block x={0} y={0} w={4} d={5} h={2.4} tone="glass" />
        </div>
      ))}
      <Billboard x={11} y={31} z={11}>
        {l(1)}
      </Billboard>
      <Billboard x={31} y={31} z={20}>
        {l(2)}
      </Billboard>
      <Billboard x={51} y={31} z={12} gold>
        {l(4)}
      </Billboard>
    </IsoFloor>
  );
}

// Business Analytics: an isometric bar chart that rises in. Bars run along the plane's (1,-1) axis, which
// reads as a horizontal row on screen, so no bar hides another.
function Bars({ l }: SceneProps) {
  const bars = [9, 15, 12, 21, 28];
  return (
    <IsoFloor>
      {bars.map((h, i) => (
        <div key={i} className={cx("absolute inset-0", P3, "scene-rise")} style={{ animationDelay: `${300 + i * 140}ms` }}>
          <Block x={6 + i * 10} y={46 - i * 10} w={7} d={7} h={h} tone={i === bars.length - 1 ? "gold" : i % 2 ? "indigo" : "violet"} />
        </div>
      ))}
      <Billboard x={49.5} y={9.5} z={30} gold>
        {l(0)} ↑
      </Billboard>
      <Billboard x={9.5} y={49.5} z={11}>
        {l(1)}
      </Billboard>
      <Billboard x={29.5} y={29.5} z={14}>
        {l(2)}
      </Billboard>
    </IsoFloor>
  );
}

// CRM: a pipeline funnel; leads fall through the stages.
function Funnel({ l }: SceneProps) {
  const rings = [70, 54, 40, 26];
  return (
    <>
      {rings.map((size, i) => (
        <div
          key={size}
          className="absolute left-1/2 rounded-full border-[0.5cqw]"
          style={{
            width: u(size),
            height: u(size),
            marginLeft: u(-size / 2),
            top: u(6 + i * 18),
            transform: "rotateX(74deg)",
            borderColor: i === rings.length - 1 ? "rgba(212,175,55,0.9)" : "rgba(156,139,255,0.55)",
            background: i === rings.length - 1 ? "radial-gradient(circle,rgba(212,175,55,0.35),transparent 70%)" : "radial-gradient(circle,rgba(91,63,209,0.25),transparent 70%)",
            boxShadow: "0 0 40px rgba(91,63,209,0.35)",
          }}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="scene-fall absolute top-[10%] size-[2.6cqw] rounded-full bg-starlight shadow-[0_0_14px_rgba(255,255,255,0.8)]"
          style={{ left: `${40 + i * 6}%`, animationDelay: `${i * -0.9}s` }}
        />
      ))}
      <Pill className="left-[2%] top-[8%]">{l(0)}</Pill>
      <Pill className="right-[2%] top-[28%]">{l(1)}</Pill>
      <Pill className="left-[6%] top-[47%]">{l(2)}</Pill>
      <Pill className="right-[8%] top-[66%]" gold>
        {l(3)}
      </Pill>
    </>
  );
}

// ERP: business modules stacked as floating slabs on one platform.
function Stack({ l }: SceneProps) {
  const slabs: { z: number; tone: Tone }[] = [
    { z: 0, tone: "indigo" },
    { z: 9, tone: "violet" },
    { z: 18, tone: "indigo" },
    { z: 27, tone: "gold" },
  ];
  return (
    <IsoFloor>
      {slabs.map((s, i) => (
        <div key={i} className={cx("absolute inset-0", P3)} style={{ transform: `translateZ(${u(s.z)})` }}>
          <div className={cx("absolute inset-0", P3, i % 2 ? "scene-hover-z" : "scene-hover-z-late")}>
            <Block x={14} y={14} w={34} d={34} h={4} tone={s.tone} />
          </div>
        </div>
      ))}
      <Billboard x={58} y={4} z={4}>
        {l(0)}
      </Billboard>
      <Billboard x={58} y={4} z={13}>
        {l(1)}
      </Billboard>
      <Billboard x={58} y={4} z={22}>
        {l(2)}
      </Billboard>
      <Billboard x={58} y={4} z={31} gold>
        {l(3)}
      </Billboard>
    </IsoFloor>
  );
}

// Custom software: a turning code cube with satellites.
function Cube({ l }: SceneProps) {
  const s = 34;
  const half = u(s / 2);
  const faces = [
    { t: `translateZ(${half})`, g: "</>" },
    { t: `rotateY(180deg) translateZ(${half})`, g: "{ }" },
    { t: `rotateY(90deg) translateZ(${half})`, g: "fn()" },
    { t: `rotateY(-90deg) translateZ(${half})`, g: "API" },
    { t: `rotateX(90deg) translateZ(${half})`, g: "DB" },
    { t: `rotateX(-90deg) translateZ(${half})`, g: "UI" },
  ];
  return (
    <>
      <div className="absolute inset-[20%] rounded-full bg-[radial-gradient(circle,rgba(91,63,209,0.45),transparent_70%)] scene-pulse" />
      <div className={cx("absolute left-1/2 top-1/2", P3)} style={{ width: u(s), height: u(s), marginLeft: u(-s / 2), marginTop: u(-s / 2), transform: "rotateX(-22deg)" }}>
        <div className={cx("absolute inset-0", P3, "scene-cube")}>
          {faces.map((f) => (
            <div
              key={f.g}
              className="absolute inset-0 flex items-center justify-center rounded-[2cqw] border border-white/25 font-mono text-[6cqw] font-semibold text-starlight"
              style={{ transform: f.t, background: "linear-gradient(135deg,rgba(123,99,240,0.55),rgba(42,33,110,0.75))" }}
            >
              <DecoText text={f.g} />
            </div>
          ))}
        </div>
      </div>
      <span className="scene-bob absolute left-[16%] top-[18%] size-[7cqw] rotate-12 rounded-[1.4cqw] bg-gold/80 shadow-[0_0_30px_rgba(212,175,55,0.6)]" />
      <span className="scene-bob-late absolute right-[15%] bottom-[20%] size-[5cqw] -rotate-12 rounded-[1cqw] bg-[#8EA2FF]/70" />
      <Pill className="right-[3%] top-[12%]">{l(0)}</Pill>
      <Pill className="left-[3%] bottom-[10%]" gold>
        {l(1)}
      </Pill>
    </>
  );
}

// Web apps: an exploded stack of browser layers.
function Browser({ l }: SceneProps) {
  return (
    <div className={cx("absolute inset-[8%]", P3)} style={{ transform: "rotateY(-24deg) rotateX(10deg)" }}>
      <div className="absolute inset-0 rounded-[2.4cqw] border border-white/10 bg-white/[0.04]" style={{ transform: `translateZ(${u(-10)})` }}>
        <WindowBar />
        <div className="grid grid-cols-3 gap-[1.6cqw] p-[2.4cqw]">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className="h-[9cqw] rounded-[1cqw] border border-dashed border-white/15" />
          ))}
        </div>
      </div>
      <div className="absolute inset-[6%] rounded-[2.4cqw] border border-white/20 bg-[#141c48]/90 shadow-[0_30px_80px_rgba(0,0,0,0.45)]" style={{ transform: `translateZ(${u(2)})` }}>
        <WindowBar />
        <div className="flex gap-[2cqw] p-[2.4cqw]">
          <div className="w-1/4 space-y-[1.4cqw]">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={cx("block h-[2.2cqw] rounded-full", i === 0 ? "bg-purple" : "bg-white/12")} />
            ))}
          </div>
          <div className="flex-1">
            <Lines />
            <div className="mt-[2.4cqw] flex h-[16cqw] items-end gap-[1.2cqw]">
              {[40, 65, 50, 80, 70, 95].map((h, i) => (
                <span key={i} className="flex-1 rounded-t-[0.6cqw] bg-gradient-to-t from-purple to-[#8EA2FF]" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="scene-bob absolute bottom-[4%] right-[-4%] w-[42%] rounded-[2cqw] border border-gold/40 bg-[#1b1440]/95 p-[2.2cqw] shadow-[0_20px_60px_rgba(0,0,0,0.5)]" style={{ transform: `translateZ(${u(16)})` }}>
        <p className="text-[max(10px,2.2cqw)] font-semibold text-gold"><DecoText text={l(0)} /></p>
        <Lines count={2} className="mt-[1.4cqw]" />
      </div>
      <Pill className="left-[-2%] top-[-6%]" style={{ transform: `translateZ(${u(12)})` }}>
        {l(1)}
      </Pill>
    </div>
  );
}

// Mobile apps: a tilted phone with cards floating off the screen.
function Phone({ l }: SceneProps) {
  return (
    <div className={cx("absolute inset-0", P3)} style={{ transform: "rotateY(-22deg) rotateX(8deg)" }}>
      <div className="absolute left-[31%] top-[6%] h-[88%] w-[38%] rounded-[6cqw] border-[1.2cqw] border-[#22284d] bg-[#0d1333] shadow-[0_40px_100px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.12)]">
        <span className="mx-auto mt-[1.6cqw] block h-[2cqw] w-[30%] rounded-full bg-black/60" />
        <div className="space-y-[2cqw] p-[2.6cqw]">
          <div className="h-[14cqw] rounded-[2.4cqw] bg-gradient-to-br from-purple to-indigo p-[2cqw]">
            <span className="block h-[1.4cqw] w-1/2 rounded-full bg-white/50" />
            <span className="mt-[1.4cqw] block h-[3.6cqw] w-2/3 rounded-full bg-white/80" />
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-[1.6cqw] rounded-[1.8cqw] bg-white/[0.06] p-[1.6cqw]">
              <span className={cx("size-[4cqw] shrink-0 rounded-[1.2cqw]", i === 1 ? "bg-gold/80" : "bg-white/15")} />
              <Lines count={2} className="flex-1" />
            </div>
          ))}
          <div className="grid grid-cols-4 gap-[1.2cqw] pt-[1cqw]">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={cx("aspect-square rounded-[1.2cqw]", i === 0 ? "bg-purple/70" : "bg-white/10")} />
            ))}
          </div>
        </div>
      </div>
      <div className="scene-bob absolute left-[4%] top-[20%] w-[36%] rounded-[2.4cqw] border border-white/15 bg-white/10 p-[2cqw]" style={{ transform: `translateZ(${u(14)})` }}>
        <p className="text-[max(10px,2.2cqw)] font-semibold text-starlight"><DecoText text={l(0)} /></p>
        <Lines count={2} className="mt-[1.2cqw]" />
      </div>
      <div className="scene-bob-late absolute right-[2%] bottom-[18%] w-[34%] rounded-[2.4cqw] border border-gold/40 bg-gold/15 p-[2cqw]" style={{ transform: `translateZ(${u(18)})` }}>
        <p className="text-[max(10px,2.2cqw)] font-semibold text-[#FBE9A8]"><DecoText text={l(1)} /></p>
        <span className="mt-[1.2cqw] block h-[1.4cqw] w-3/4 rounded-full bg-gold/50" />
      </div>
    </div>
  );
}

// SaaS: many tenants on one shared platform.
function Tenants({ l }: SceneProps) {
  const heights = [6, 10, 7, 12, 16, 9, 8, 11, 6];
  return (
    <IsoFloor>
      <Block x={6} y={6} w={50} d={50} h={3} tone="indigo" />
      <div className={cx("absolute inset-0", P3)} style={{ transform: `translateZ(${u(3)})` }}>
        {heights.map((h, i) => (
          <div key={i} className={cx("absolute inset-0", P3, "scene-rise")} style={{ animationDelay: `${200 + i * 90}ms` }}>
            <Block x={11 + (i % 3) * 14} y={11 + Math.floor(i / 3) * 14} w={10} d={10} h={h} tone={i === 4 ? "gold" : i % 2 ? "violet" : "glass"} />
          </div>
        ))}
      </div>
      <Billboard x={30} y={30} z={24} gold>
        {l(0)}
      </Billboard>
      <Billboard x={50} y={14} z={10}>
        {l(1)}
      </Billboard>
      <Billboard x={14} y={50} z={10}>
        {l(2)}
      </Billboard>
    </IsoFloor>
  );
}

// Desktop apps: a monitor with an app window lifting out of the screen.
function Desktop({ l }: SceneProps) {
  return (
    <div className={cx("absolute inset-0", P3)} style={{ transform: "rotateY(20deg) rotateX(6deg)" }}>
      <div className="absolute left-[8%] top-[12%] h-[56%] w-[84%] rounded-[2.4cqw] border-[1cqw] border-[#22284d] bg-[#0d1333] shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
        <div className="flex h-full">
          <div className="w-[22%] space-y-[1.4cqw] border-r border-white/10 p-[2cqw]">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className={cx("block h-[2cqw] rounded-full", i === 1 ? "bg-purple" : "bg-white/12")} />
            ))}
          </div>
          <div className="flex-1 p-[2.4cqw]">
            <Lines />
            <div className="mt-[2.4cqw] grid grid-cols-3 gap-[1.4cqw]">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-[9cqw] rounded-[1.2cqw] bg-white/[0.07]" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <span className="absolute left-[44%] top-[68%] h-[10%] w-[12%] bg-gradient-to-b from-[#22284d] to-[#151a3a]" />
      <span className="absolute left-[32%] top-[77%] h-[2.4%] w-[36%] rounded-full bg-[#22284d]" />
      <div className="scene-bob absolute left-[46%] top-[22%] w-[44%] rounded-[2cqw] border border-white/20 bg-[#1b2258] shadow-[0_24px_60px_rgba(0,0,0,0.5)]" style={{ transform: `translateZ(${u(16)})` }}>
        <WindowBar />
        <div className="p-[2cqw]">
          <p className="text-[max(10px,2.2cqw)] font-semibold text-starlight"><DecoText text={l(0)} /></p>
          <span className="mt-[1.6cqw] block h-[2.4cqw] w-full overflow-hidden rounded-full bg-white/10">
            <span className="scene-progress block h-full w-3/4 rounded-full bg-gradient-to-r from-purple to-gold" />
          </span>
        </div>
      </div>
      <Pill className="left-[2%] bottom-[6%]" gold style={{ transform: `translateZ(${u(10)})` }}>
        {l(1)}
      </Pill>
    </div>
  );
}

// UI/UX: wireframe, colour and component layers lifted apart.
function Layers({ l }: SceneProps) {
  const layers = [
    { z: 0, cls: "scene-hover-z-late", label: l(0) },
    { z: 10, cls: "scene-hover-z", label: l(1) },
    { z: 20, cls: "scene-hover-z-late", label: l(2) },
  ];
  return (
    <div className={cx("absolute", P3)} style={{ left: "10%", top: "24%", width: "56%", height: "56%", transform: "rotateX(56deg) rotateZ(-38deg)" }}>
      {layers.map((layer, i) => (
        <div key={i} className={cx("absolute inset-0", P3)} style={{ transform: `translateZ(${u(layer.z)})` }}>
          <div className={cx("absolute inset-0 rounded-[2.4cqw] border p-[3cqw]", layer.cls, i === 0 && "border-dashed border-white/30 bg-white/[0.03]", i === 1 && "border-white/15 bg-gradient-to-br from-purple/60 to-indigo/60", i === 2 && "border-gold/40 bg-[#141c48]/85")}>
            {i === 0 && (
              <div className="grid h-full grid-cols-3 grid-rows-3 gap-[2cqw]">
                {Array.from({ length: 9 }, (_, k) => (
                  <span key={k} className="rounded-[0.8cqw] border border-dashed border-white/25" />
                ))}
              </div>
            )}
            {i === 2 && (
              <div className="space-y-[2cqw]">
                <span className="block h-[5cqw] w-1/2 rounded-[1cqw] bg-gold/80" />
                <Lines />
                <span className="block h-[6cqw] w-[40%] rounded-chip bg-starlight/90" />
              </div>
            )}
          </div>
        </div>
      ))}
      {layers.map((layer, i) => (
        <span
          key={`label-${i}`}
          className={cx(
            "absolute whitespace-nowrap rounded-chip border px-[1.6cqw] py-[0.7cqw] text-[max(10px,2.3cqw)] font-semibold",
            i === 2 ? "border-gold/50 bg-gold/20 text-[#FBE9A8]" : "border-white/15 bg-white/10 text-starlight",
          )}
          style={{ left: "100%", top: "100%", transform: `translateZ(${u(layer.z + 1)}) rotateZ(38deg) rotateX(-56deg) translate(4%, -50%)` }}
        >
          <DecoText text={layer.label} />
        </span>
      ))}
    </div>
  );
}

// MVP: four steps from idea to launch, with a marker climbing them.
// Steps run along the plane's (1,-1) axis, so they climb left to right on screen.
function Launch({ l }: SceneProps) {
  const steps = [5, 11, 17, 24];
  const at = (i: number) => ({ x: 4 + i * 12, y: 44 - i * 12 });
  const top = at(steps.length - 1);
  return (
    <IsoFloor>
      {steps.map((h, i) => (
        <div key={i} className={cx("absolute inset-0", P3, "scene-rise")} style={{ animationDelay: `${250 + i * 160}ms` }}>
          <Block {...at(i)} w={12} d={12} h={h} tone={i === steps.length - 1 ? "gold" : i % 2 ? "violet" : "indigo"} />
        </div>
      ))}
      <div className={cx("absolute", P3)} style={{ left: u(top.x + 6), top: u(top.y + 6), transform: `translateZ(${u(24)})` }}>
        <span
          className="scene-flag absolute block size-[3.4cqw] rounded-full bg-starlight shadow-[0_0_24px_rgba(255,255,255,0.9)]"
          style={{ transform: "rotateZ(-45deg) rotateX(-58deg) translate(-50%, -110%)" }}
        />
      </div>
      {["Idea", "Prototype", "MVP", "Launch"].map((label, i) => (
        <Billboard key={label} x={at(i).x + 9} y={at(i).y + 15} z={0} gold={i === 3}>
          {label}
        </Billboard>
      ))}
      <Billboard x={top.x + 2} y={top.y - 2} z={34}>
        {l(4)}
      </Billboard>
    </IsoFloor>
  );
}
