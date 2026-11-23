/**
 * The stage set: a cast and a setting for pictures that tell a story, in the
 * art kit's one engraved hand (README.md). Ink outline, one tone block printed
 * off register, hatching for shade; every colour a token (.pl-* in index.css).
 *
 * The cast. People of the ancient Near East, drawn with dignity and without
 * faces, as the kit asks: a long robe, an outer cloak, a head cloth with its
 * band or a veil, a staff or a shepherd's crook, bare hands. Skin is the
 * kit's clay tone for every figure alike. A figure is placed by where its
 * feet stand, and is about 100 units tall at size 1; the line keeps its
 * weight at any size. One cast, so the same person can be drawn the same way
 * in every frame of a film (keep a figure's robe, cloak and head the same).
 *
 * The setting. Sky (sun, moon, stars, cloud, rays), land (hills, a mountain,
 * water), what grows (palm, olive, cypress, grass, wheat), what is built (a
 * tent, a flat-roofed house, a city wall and gate, a well, an altar of
 * stones, a jar, a lamp, a scroll, a boat, a table), and animals (sheep, a
 * dove, a donkey).
 *
 * Mustard is never used here: a picture's one mustard mark is the drawing's
 * own choice (pass `gold` to the few parts that can carry it).
 */
import {
  createContext,
  useContext,
  type CSSProperties,
  type ReactNode,
} from "react";

export type Tone = "b" | "g" | "c";
/** A tone, or "p" for plain paper. */
export type Cloth = Tone | "p";

const OFF = 1.8;

/** How much the group a part stands in is already enlarged (see Scaled). */
const ScaleContext = createContext(1);

const weights = (k: number, face = 1) =>
  ({
    "--pl-sw": 2.25 / k,
    "--pl-sf": 1.1 / k,
    "--pl-ox": `${(OFF * face) / k}px`,
    "--pl-oy": `${(OFF * 0.75) / k}px`,
  }) as CSSProperties;

/**
 * A part placed on the stage: local coordinates with (0, 0) at its foot,
 * drawn at size `s`, turned to face right (1) or left (-1). The line keeps
 * its weight, and the tone keeps its side, whatever the size or the turn.
 */
export function Place({
  x,
  y,
  s = 1,
  face = 1,
  children,
}: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
  children: ReactNode;
}) {
  const outer = useContext(ScaleContext);
  return (
    <g
      className="pl-set"
      transform={`translate(${x} ${y}) scale(${s * face} ${s})`}
      style={weights(s * outer, face)}
    >
      {children}
    </g>
  );
}

/**
 * A whole group of the picture drawn larger or smaller (a panel of a
 * two-part frame): everything inside, parts and plain lines alike, keeps the
 * line's weight.
 */
export function Scaled({
  x = 0,
  y = 0,
  k,
  children,
}: {
  x?: number;
  y?: number;
  k: number;
  children: ReactNode;
}) {
  const outer = useContext(ScaleContext);
  return (
    <g
      className="pl-set"
      transform={`translate(${x} ${y}) scale(${k})`}
      style={weights(k * outer)}
    >
      <ScaleContext.Provider value={k * outer}>
        {children}
      </ScaleContext.Provider>
    </g>
  );
}

/** A shape in the hand, inside a Place: paper, its tone off register, an optional hatch, the ink line. */
export function Ink({
  d,
  tone,
  hatch,
}: {
  d: string;
  tone?: Cloth;
  hatch?: string;
}) {
  return (
    <>
      <path className="pl-o" d={d} />
      {tone && tone !== "p" && <path className={`pl-${tone} pl-off`} d={d} />}
      {hatch && <path fill={hatch} d={d} />}
      <path className="pl-l" d={d} />
    </>
  );
}

const disc = (x: number, y: number, r: number) =>
  `M${x - r},${y}a${r},${r} 0 1,0 ${2 * r},0a${r},${r} 0 1,0 ${-2 * r},0Z`;

/** A bare hand. */
const Hand = ({ x, y }: { x: number; y: number }) => (
  <>
    <path className="pl-c" d={disc(x, y, 3.4)} />
    <path className="pl-f" d={disc(x, y, 3.4)} />
  </>
);

// ── The cast ──────────────────────────────────────────────────────────────

export type Pose =
  | "stand"
  | "walk"
  | "hold"
  | "reach"
  | "open"
  | "pray"
  | "kneel"
  | "sit"
  | "bow";
export type Head = "cloth" | "veil" | "bare" | "crown" | "helmet";

export interface PersonProps {
  /** Where the feet stand. */
  x: number;
  y: number;
  /** 1 is about 100 units tall. */
  s?: number;
  /** Which way the figure is turned: 1 right, -1 left. */
  face?: 1 | -1;
  robe?: Cloth;
  cloak?: Tone;
  head?: Head;
  pose?: Pose;
  /** What the forward hand holds. */
  staff?: "staff" | "crook" | "spear";
  /** A bundle carried on the back. */
  bundle?: boolean;
  /** A child: a larger head on a smaller body (give a smaller `s` too). */
  child?: boolean;
  /** The crown is the picture's one mustard mark. */
  gold?: boolean;
}

const BODY: Record<
  "up" | "kneel" | "sit" | "bow",
  { d: string; head: [number, number] }
> = {
  up: {
    d: "M-13,-77C-17,-52 -18,-22 -20,0H20C18,-22 17,-52 13,-77C8,-82 -8,-82 -13,-77Z",
    head: [0, -90],
  },
  kneel: {
    d: "M-12,-50C-15,-34 -15,-16 -13,0H30C31,-8 24,-13 13,-14C14,-28 14,-40 12,-50C7,-55 -7,-55 -12,-50Z",
    head: [2, -63],
  },
  sit: {
    d: "M-12,-52C-15,-36 -17,-18 -17,0H30C32,-12 26,-23 12,-25C13,-34 13,-44 12,-52C7,-57 -7,-57 -12,-52Z",
    head: [0, -65],
  },
  bow: {
    d: "M-22,0C-25,-15 -17,-31 -2,-35C10,-38 20,-35 27,-27L23,-14C26,-9 28,-4 29,0Z",
    head: [32, -31],
  },
};

/** One person of the cast. */
export function Person({
  x,
  y,
  s = 1,
  face = 1,
  robe = "p",
  cloak,
  head = "cloth",
  pose = "stand",
  staff,
  bundle,
  child,
  gold,
}: PersonProps) {
  const kind =
    pose === "kneel" || pose === "sit" || pose === "bow" ? pose : "up";
  const body = BODY[kind];
  const [hx, hy] = body.head;
  const r = child ? 10.5 : 9;
  const up = kind === "up";
  const lean = pose === "walk" ? "rotate(4)" : undefined;
  // The shoulder the arms hang from, by body.
  const sy = up ? -75 : kind === "bow" ? -30 : -49;
  const held = staff ?? (pose === "hold" ? "staff" : undefined);
  return (
    <Place x={x} y={y} s={s} face={face}>
      <g transform={lean}>
        {/* A bundle on the back, behind everything. */}
        {bundle && up && (
          <>
            <Ink
              d="M-27,-66c-2,-12 14,-16 18,-6c3,9 -3,17 -10,16c-5,0 -8,-4 -8,-10Z"
              tone="c"
            />
            <path className="pl-f" d="M-12,-74L6,-70" />
          </>
        )}
        {/* The staff, behind the hand that holds it. */}
        {held === "staff" && (
          <path className="pl-l" d={`M23,${up ? -108 : -74}V0`} />
        )}
        {held === "crook" && (
          <path className="pl-l" d="M23,0V-100C23,-112 37,-112 37,-100" />
        )}
        {held === "spear" && (
          <>
            <path className="pl-l" d="M23,0V-112" />
            <path className="pl-k" d="M23,-126l4,14h-8Z" />
          </>
        )}
        {/* Sandalled feet under a walking robe. */}
        {pose === "walk" && (
          <path className="pl-k" d="M-13,-1h11v4h-11ZM4,-1h13v4h-13Z" />
        )}
        <Ink d={body.d} tone={robe} />
        {/* The outer cloak, over the back shoulder. */}
        {cloak && up && (
          <Ink
            d="M-13,-77C-19,-58 -22,-30 -22,-8L-5,-8C-7,-34 -3,-60 5,-80C0,-82 -8,-81 -13,-77Z"
            tone={cloak}
          />
        )}
        {cloak && !up && kind !== "bow" && (
          <Ink
            d="M-12,-50C-16,-36 -17,-18 -16,-4L-3,-4C-5,-22 -2,-40 4,-54C0,-56 -8,-54 -12,-50Z"
            tone={cloak}
          />
        )}
        {/* The folds of the robe and its sash. */}
        {up && (
          <path
            className="pl-f"
            d="M-14,-47C-5,-43 5,-43 14,-47M5,-44V-30M-6,-38L-9,-3M7,-28L9,-3"
          />
        )}
        {kind === "kneel" && (
          <path className="pl-f" d="M-2,-12H24M0,-30L-2,-14" />
        )}
        {kind === "sit" && (
          <path className="pl-f" d="M-2,-23H12M12,-25C13,-16 13,-8 12,0" />
        )}

        {/* The arms and hands, by pose. */}
        {(pose === "stand" || pose === "walk") && (
          <>
            <path className="pl-f" d="M-13,-73C-18,-62 -19,-50 -17,-43" />
            <Hand x={-17} y={-40} />
            {!held && (
              <>
                <path className="pl-f" d="M13,-73C18,-62 19,-50 17,-43" />
                <Hand x={17} y={-40} />
              </>
            )}
          </>
        )}
        {held && up && (
          <>
            <Ink d="M11,-74L24,-57L19,-51L8,-64Z" tone={robe} />
            <Hand x={23} y={-53} />
          </>
        )}
        {held && !up && (
          <>
            <Ink d="M10,-48L24,-40L21,-34L8,-40Z" tone={robe} />
            <Hand x={23} y={-36} />
          </>
        )}
        {(pose === "reach" || pose === "open") && (
          <>
            <Ink d="M11,-75L34,-67L33,-59L9,-64Z" tone={robe} />
            <Hand x={36} y={-63} />
          </>
        )}
        {pose === "open" && (
          <>
            <Ink d="M-11,-75L-34,-67L-33,-59L-9,-64Z" tone={robe} />
            <Hand x={-36} y={-63} />
          </>
        )}
        {pose === "pray" && (
          <>
            <Ink d="M11,-75L24,-97L30,-93L15,-67Z" tone={robe} />
            <Hand x={28} y={-99} />
            <Ink d="M-11,-75L-24,-97L-30,-93L-15,-67Z" tone={robe} />
            <Hand x={-28} y={-99} />
          </>
        )}
        {(kind === "kneel" || kind === "sit") && !held && (
          <>
            <Ink
              d={`M10,${sy + 1}L25,${sy + 11}L22,${sy + 17}L8,${sy + 9}Z`}
              tone={robe}
            />
            <Hand x={26} y={sy + 15} />
          </>
        )}
        {kind === "bow" && (
          <>
            <Ink d="M22,-22L40,-8L36,-3L18,-12Z" tone={robe} />
            <Hand x={41} y={-4} />
          </>
        )}

        {/* The head: cloth or veil behind, the head, then what covers its top. */}
        {head === "cloth" && (
          <Ink
            d={`M${hx - 11},${hy}C${hx - 12},${hy - 15} ${hx + 12},${hy - 15} ${hx + 11},${hy}L${hx + 13},${hy + 15}C${hx + 6},${hy + 11} ${hx - 6},${hy + 11} ${hx - 13},${hy + 15}Z`}
            tone={cloak ?? "p"}
          />
        )}
        {head === "veil" && (
          <Ink
            d={`M${hx - 11},${hy}C${hx - 12},${hy - 16} ${hx + 12},${hy - 16} ${hx + 11},${hy}C${hx + 13},${hy + 12} ${hx + 16},${hy + 24} ${hx + 17},${hy + 34}C${hx + 8},${hy + 29} ${hx - 8},${hy + 29} ${hx - 17},${hy + 34}C${hx - 16},${hy + 24} ${hx - 13},${hy + 12} ${hx - 11},${hy}Z`}
            tone={cloak ?? "b"}
          />
        )}
        <path className="pl-c" d={disc(hx, hy, r)} />
        <path className="pl-l" d={disc(hx, hy, r)} />
        {(head === "cloth" || head === "veil") && (
          <>
            <path
              className="pl-o"
              d={`M${hx - r - 0.5},${hy - 3}C${hx - r},${hy - r - 5} ${hx + r},${hy - r - 5} ${hx + r + 0.5},${hy - 3}Z`}
            />
            {head === "cloth" && (
              <path
                className="pl-l"
                d={`M${hx - r - 0.5},${hy - 5}H${hx + r + 0.5}`}
              />
            )}
          </>
        )}
        {(head === "bare" || head === "crown") && (
          <path
            className="pl-k"
            d={`M${hx - r},${hy - 2}C${hx - r},${hy - r - 3} ${hx + r},${hy - r - 3} ${hx + r},${hy - 2}C${hx + 5},${hy - 6} ${hx - 5},${hy - 6} ${hx - r},${hy - 2}Z`}
          />
        )}
        {head === "crown" && (
          <>
            <path
              className={gold ? "pl-m" : "pl-paper"}
              d={`M${hx - 9},${hy - 8}V${hy - 19}L${hx - 4.5},${hy - 13}L${hx},${hy - 20}L${hx + 4.5},${hy - 13}L${hx + 9},${hy - 19}V${hy - 8}Z`}
            />
            <path
              className="pl-l"
              d={`M${hx - 9},${hy - 8}V${hy - 19}L${hx - 4.5},${hy - 13}L${hx},${hy - 20}L${hx + 4.5},${hy - 13}L${hx + 9},${hy - 19}V${hy - 8}Z`}
            />
          </>
        )}
        {head === "helmet" && (
          <>
            <Ink
              d={`M${hx - r - 1},${hy - 1}C${hx - r - 1},${hy - r - 6} ${hx + r + 1},${hy - r - 6} ${hx + r + 1},${hy - 1}Z`}
              tone="b"
            />
            <path className="pl-l" d={`M${hx},${hy - r - 5}V${hy - r - 11}`} />
          </>
        )}
      </g>
    </Place>
  );
}

// ── The sky ───────────────────────────────────────────────────────────────

/** A sun with short rays; `gold` makes it the picture's one mustard mark. */
export function Sun({
  x,
  y,
  r = 22,
  gold,
}: {
  x: number;
  y: number;
  r?: number;
  gold?: boolean;
}) {
  const rays = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    const c = Math.cos(a);
    const sn = Math.sin(a);
    return `M${(x + c * (r + 7)).toFixed(1)},${(y + sn * (r + 7)).toFixed(1)}L${(x + c * (r + (i % 2 ? 15 : 21))).toFixed(1)},${(y + sn * (r + (i % 2 ? 15 : 21))).toFixed(1)}`;
  }).join("");
  return (
    <g>
      <path className="pl-f" d={rays} />
      <path className={gold ? "pl-m" : "pl-paper"} d={disc(x, y, r)} />
      <path className="pl-l" d={disc(x, y, r)} />
    </g>
  );
}

/** A crescent moon. */
export function Moon({ x, y, r = 16 }: { x: number; y: number; r?: number }) {
  const d = `M${x},${y - r}A${r},${r} 0 1,0 ${x + r},${y}A${r * 0.78},${r * 0.78} 0 0,1 ${x},${y - r}Z`;
  return (
    <g>
      <path className="pl-paper" d={d} />
      <path className="pl-l" d={d} />
    </g>
  );
}

/** Stars: small four-point marks at the places given ([x, y, size?]). */
export function Stars({ at }: { at: [number, number, number?][] }) {
  return (
    <path
      className="pl-f"
      d={at
        .map(
          ([x, y, k = 4]) =>
            `M${x - k},${y}H${x + k}M${x},${y - k}V${y + k}M${x - k * 0.5},${y - k * 0.5}L${x + k * 0.5},${y + k * 0.5}M${x - k * 0.5},${y + k * 0.5}L${x + k * 0.5},${y - k * 0.5}`
        )
        .join("")}
    />
  );
}

/** A cloud: three lobes on a flat base, shaded by a few level lines. */
export function Cloud({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <Place x={x} y={y} s={s}>
      <path
        className="pl-o"
        d="M-40,0C-52,0 -52,-16 -38,-16C-38,-30 -14,-34 -8,-22C0,-36 26,-32 26,-16C42,-18 46,0 34,0Z"
      />
      <path className="pl-f" d="M-30,-6H22M-20,-11H10" />
    </Place>
  );
}

/** Rays of light coming down from beyond the picture's edge at (x, y). */
export function Rays({
  x,
  y,
  reach = 120,
  spread = 70,
  n = 7,
}: {
  x: number;
  y: number;
  reach?: number;
  spread?: number;
  n?: number;
}) {
  const d = Array.from({ length: n }, (_, i) => {
    const t = n === 1 ? 0 : i / (n - 1) - 0.5;
    const len = reach * (i % 2 ? 0.72 : 1);
    return `M${(x + t * spread * 0.3).toFixed(1)},${y + 8}L${(x + t * spread * 2).toFixed(1)},${(y + len).toFixed(1)}`;
  }).join("");
  return <path className="pl-f" d={d} />;
}

// ── The land ──────────────────────────────────────────────────────────────

/**
 * A line of hills across a picture `w` wide: `peaks` are [x, height] pairs
 * above the base line `y`; the land is filled down to `floor`.
 */
export function Hills({
  y,
  w = 800,
  floor = 500,
  peaks,
  tone = "g",
  hatch,
}: {
  y: number;
  w?: number;
  floor?: number;
  peaks: [number, number][];
  tone?: Tone;
  hatch?: string;
}) {
  let d = `M0,${y}`;
  let px = 0;
  let py = y;
  for (const [x, hgt] of peaks) {
    const top = y - hgt;
    const mx = (px + x) / 2;
    d += `C${mx},${py} ${mx},${top} ${x},${top}`;
    px = x;
    py = top;
  }
  const mx = (px + w) / 2;
  d += `C${mx},${py} ${mx},${y} ${w},${y}V${floor}H0Z`;
  return (
    <g>
      <path className="pl-o" d={d} />
      <path className={`pl-${tone}`} d={d} transform="translate(3 2.2)" />
      {hatch && <path fill={hatch} d={d} />}
      <path className="pl-l" d={d} />
    </g>
  );
}

/** A mountain with a shaded side. */
export function Mountain({
  x,
  y,
  w = 260,
  h = 200,
  tone = "b",
  hatch,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  tone?: Tone;
  hatch?: string;
}) {
  const d = `M${x - w / 2},${y}L${x - w * 0.1},${y - h * 0.82}L${x},${y - h}L${x + w * 0.14},${y - h * 0.74}L${x + w / 2},${y}Z`;
  const shade = `M${x},${y - h}L${x + w * 0.14},${y - h * 0.74}L${x + w / 2},${y}H${x + w * 0.08}L${x - w * 0.04},${y - h * 0.5}Z`;
  return (
    <g>
      <path className="pl-o" d={d} />
      <path className={`pl-${tone}`} d={d} transform="translate(3 2.2)" />
      {hatch && <path fill={hatch} d={shade} />}
      <path className="pl-l" d={d} />
    </g>
  );
}

/** Water: level lines of small waves from x to x + w, `rows` deep. */
export function Water({
  x,
  y,
  w,
  rows = 3,
  gap = 14,
}: {
  x: number;
  y: number;
  w: number;
  rows?: number;
  gap?: number;
}) {
  let d = "";
  for (let r = 0; r < rows; r++) {
    const yy = y + r * gap;
    for (let xx = x + (r % 2 ? 14 : 0); xx < x + w - 20; xx += 44)
      d += `M${xx},${yy}q7,-6 14,0t14,0`;
  }
  return <path className="pl-f" d={d} />;
}

// ── What grows ────────────────────────────────────────────────────────────

/** A date palm, about 120 tall at size 1. */
export function Palm({
  x,
  y,
  s = 1,
  face = 1,
}: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
}) {
  return (
    <Place x={x} y={y} s={s} face={face}>
      <Ink d="M-5,0C-3,-40 2,-80 6,-104L13,-102C9,-78 6,-40 5,0Z" tone="c" />
      <path className="pl-f" d="M-4,-20h8M-3,-40h8M0,-60h8M3,-80h8" />
      {[
        "M9,-104C-8,-124 -34,-122 -46,-106C-30,-112 -12,-110 9,-104Z",
        "M9,-104C22,-128 50,-128 62,-110C44,-116 26,-112 9,-104Z",
        "M9,-104C-2,-120 -22,-96 -34,-78C-20,-92 -6,-98 9,-104Z",
        "M9,-104C28,-112 44,-92 52,-76C40,-90 26,-98 9,-104Z",
        "M9,-104C6,-124 14,-136 22,-142C18,-128 16,-116 9,-104Z",
      ].map(d => (
        <Ink key={d} d={d} tone="g" />
      ))}
    </Place>
  );
}

/** An olive tree: a twisted trunk and a low round crown, about 90 tall. */
export function Olive({
  x,
  y,
  s = 1,
  hatch,
}: {
  x: number;
  y: number;
  s?: number;
  hatch?: string;
}) {
  return (
    <Place x={x} y={y} s={s}>
      <Ink d="M-9,0C-4,-14 -10,-26 -3,-40L7,-40C4,-26 12,-14 9,0Z" tone="c" />
      <path className="pl-f" d="M-2,-6C2,-16 -3,-26 2,-36" />
      <Ink
        d="M-44,-52C-52,-74 -28,-92 -8,-84C6,-98 38,-92 40,-72C54,-62 46,-40 28,-42C14,-32 -8,-34 -16,-42C-30,-36 -42,-42 -44,-52Z"
        tone="g"
      />
      {hatch && (
        <path
          fill={hatch}
          d="M0,-40C14,-34 30,-40 40,-52C44,-46 38,-40 28,-42C14,-32 -8,-34 -16,-42Z"
        />
      )}
      <path
        className="pl-f"
        d="M-26,-62c6,-6 12,-6 18,0M4,-70c6,-6 12,-6 18,0M-6,-52c6,-5 12,-5 18,0"
      />
    </Place>
  );
}

/** A cypress: a tall dark flame of a tree, about 110 tall. */
export function Cypress({
  x,
  y,
  s = 1,
  hatch,
}: {
  x: number;
  y: number;
  s?: number;
  hatch?: string;
}) {
  const d = "M0,-110C12,-80 16,-40 10,-8H-10C-16,-40 -12,-80 0,-110Z";
  return (
    <Place x={x} y={y} s={s}>
      <path className="pl-l" d="M0,-8V0" />
      <Ink d={d} tone="g" hatch={hatch} />
    </Place>
  );
}

/** Tufts of grass along the ground at the places given. */
export function Grass({ at }: { at: [number, number][] }) {
  return (
    <path
      className="pl-f"
      d={at
        .map(
          ([x, y]) => `M${x - 5},${y}l-3,-9M${x},${y}v-12M${x + 5},${y}l3,-9`
        )
        .join("")}
    />
  );
}

/** Standing grain: a small stand of wheat, about 46 tall. */
export function Wheat({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <Place x={x} y={y} s={s}>
      {[-14, -5, 4, 13].map((dx, i) => (
        <g key={dx}>
          <path
            className="pl-f"
            d={`M${dx},0C${dx},-16 ${dx + (i % 2 ? 3 : -2)},-28 ${dx + (i % 2 ? 4 : -3)},-34`}
          />
          <Ink
            d={`M${dx + (i % 2 ? 4 : -3)},-46c4,4 4,10 0,14c-4,-4 -4,-10 0,-14Z`}
            tone="c"
          />
        </g>
      ))}
    </Place>
  );
}

// ── What is built ─────────────────────────────────────────────────────────

/** A goat-hair tent with an open door, about 70 tall and 150 wide. */
export function Tent({
  x,
  y,
  s = 1,
  tone = "c",
  hatch,
}: {
  x: number;
  y: number;
  s?: number;
  tone?: Tone;
  hatch?: string;
}) {
  return (
    <Place x={x} y={y} s={s}>
      <path className="pl-f" d="M-66,-22L-88,0M66,-22L88,0" />
      <Ink d="M-74,0L-58,-40L-20,-66L24,-60L62,-40L74,0Z" tone={tone} />
      <path
        className="pl-f"
        d="M-58,-40L62,-40M-20,-66L-26,-40M24,-60L28,-40"
      />
      <path className="pl-paper" d="M-12,0L-4,-38H16L24,0Z" />
      {hatch && <path fill={hatch} d="M-12,0L-4,-38H16L24,0Z" />}
      <path className="pl-l" d="M-12,0L-4,-38H16L24,0" />
      <path className="pl-l" d="M-20,-66V-76M24,-60V-70" />
    </Place>
  );
}

/** A flat-roofed house of the land, with an outside stair, about 80 tall and 120 wide. */
export function House({
  x,
  y,
  s = 1,
  tone = "c",
  hatch,
  lit,
}: {
  x: number;
  y: number;
  s?: number;
  tone?: Tone;
  hatch?: string;
  /** The window is lit: the picture's one mustard mark. */
  lit?: boolean;
}) {
  return (
    <Place x={x} y={y} s={s}>
      <Ink d="M-56,0V-70H56V0Z" tone={tone} />
      <path
        className="pl-l"
        d="M-62,-70H62M-56,-78V-70M56,-78V-70M-56,-78H56"
      />
      <path
        className="pl-f"
        d="M-40,-78V-70M-20,-78V-70M0,-78V-70M20,-78V-70M40,-78V-70"
      />
      <path className="pl-paper" d="M-12,0V-34C-12,-46 12,-46 12,-34V0Z" />
      {hatch && <path fill={hatch} d="M-12,0V-34C-12,-46 12,-46 12,-34V0Z" />}
      <path className="pl-l" d="M-12,0V-34C-12,-46 12,-46 12,-34V0" />
      <path className={lit ? "pl-m" : "pl-paper"} d="M28,-54h16v16h-16Z" />
      <path className="pl-l" d="M28,-54h16v16h-16Z" />
      <Ink d="M56,0V-16H66V-8H76V0Z" tone={tone} />
      <path className="pl-f" d="M56,-24H62M56,-32H60" />
    </Place>
  );
}

/** A city wall with towers and an open gate, about 110 tall; `w` is its width. */
export function CityWall({
  x,
  y,
  w = 300,
  s = 1,
  tone = "c",
  hatch,
  gate = true,
}: {
  x: number;
  y: number;
  w?: number;
  s?: number;
  tone?: Tone;
  hatch?: string;
  gate?: boolean;
}) {
  const h2 = w / 2;
  let top = `M${-h2},0V-64`;
  for (let xx = -h2; xx < h2 - 1; xx += 20) top += `h10v8h10v-8`;
  top += `V0Z`;
  const tower = (tx: number) => `M${tx - 18},0V-96h8v-8h8v8h4v-8h8v8h8V0Z`;
  return (
    <Place x={x} y={y} s={s}>
      <Ink d={top} tone={tone} />
      <path
        className="pl-f"
        d={`M${-h2 + 8},-20H${h2 - 8}M${-h2 + 8},-40H${h2 - 8}M${-h2 + 30},-20V-40M${-h2 + 70},0V-20M${h2 - 40},-20V-40M${h2 - 70},0V-20`}
      />
      <Ink d={tower(-h2 + 18)} tone={tone} />
      <Ink d={tower(h2 - 18)} tone={tone} />
      <path
        className="pl-k"
        d={`M${-h2 + 14},-78h8v12h-8ZM${h2 - 22},-78h8v12h-8Z`}
      />
      {gate && (
        <>
          <path className="pl-paper" d="M-20,0V-36C-20,-56 20,-56 20,-36V0Z" />
          {hatch && (
            <path fill={hatch} d="M-20,0V-36C-20,-56 20,-56 20,-36V0Z" />
          )}
          <path className="pl-l" d="M-20,0V-36C-20,-56 20,-56 20,-36V0" />
        </>
      )}
    </Place>
  );
}

/** A well: a round stone wall with a beam and a rope, about 60 tall. */
export function Well({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <Place x={x} y={y} s={s}>
      <path className="pl-l" d="M-24,-22V-58M24,-22V-58M-30,-58H30M0,-58V-34" />
      <Ink d="M-30,0V-22C-30,-30 30,-30 30,-22V0C30,6 -30,6 -30,0Z" tone="b" />
      <path
        className="pl-f"
        d="M-30,-22C-30,-15 30,-15 30,-22M-18,-10V2M0,-8V4M18,-10V2M-30,-10C-20,-6 20,-6 30,-10"
      />
      <Ink d="M-5,-34h10l-2,10h-6Z" tone="c" />
    </Place>
  );
}

/** An altar of uncut stones, about 44 tall; with `smoke`, a thin line rises from it. */
export function Altar({
  x,
  y,
  s = 1,
  smoke,
}: {
  x: number;
  y: number;
  s?: number;
  smoke?: boolean;
}) {
  return (
    <Place x={x} y={y} s={s}>
      <Ink d="M-40,0L-36,-16H36L40,0Z" tone="b" />
      <Ink d="M-32,-16L-28,-32H28L32,-16Z" tone="b" />
      <Ink d="M-24,-32L-20,-44H20L24,-32Z" tone="b" />
      <path
        className="pl-f"
        d="M-12,0V-16M14,0V-16M0,-16V-32M-16,-16V-32M18,-16V-32M4,-32V-44"
      />
      {smoke && (
        <path
          className="pl-f"
          d="M0,-48C-10,-62 10,-72 0,-88C-8,-102 8,-110 2,-124"
        />
      )}
    </Place>
  );
}

/** A clay storage jar, about 46 tall. */
export function Jar({
  x,
  y,
  s = 1,
  tone = "c",
}: {
  x: number;
  y: number;
  s?: number;
  tone?: Tone;
}) {
  return (
    <Place x={x} y={y} s={s}>
      <Ink
        d="M-8,-46H8V-40C20,-34 20,-10 10,0H-10C-20,-10 -20,-34 -8,-40Z"
        tone={tone}
      />
      <path className="pl-f" d="M-13,-28H13M-8,-40H8" />
    </Place>
  );
}

/** A small oil lamp; `gold` makes its flame the picture's one mustard mark. */
export function Lamp({
  x,
  y,
  s = 1,
  gold,
}: {
  x: number;
  y: number;
  s?: number;
  gold?: boolean;
}) {
  const flame = "M22,-12C26,-18 28,-22 26,-28C22,-24 18,-18 22,-12Z";
  return (
    <Place x={x} y={y} s={s}>
      <Ink
        d="M-18,-10C-18,-2 -8,0 2,0C14,0 24,-4 26,-10L18,-12C10,-14 -8,-16 -18,-10Z"
        tone="c"
      />
      <path className="pl-l" d="M-18,-8C-28,-10 -28,2 -16,-2" />
      <path className={gold ? "pl-m" : "pl-c"} d={flame} />
      <path className="pl-f" d={flame} />
    </Place>
  );
}

/** An open scroll with lines of writing, about 60 wide. */
export function Scroll({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <Place x={x} y={y} s={s}>
      <Ink d="M-26,-44H26V0H-26Z" />
      <Ink d="M-34,-48h8v52h-8ZM26,-48h8v52h-8Z" tone="c" />
      <path className="pl-f" d="M-18,-34H18M-18,-26H18M-18,-18H18M-18,-10H8" />
    </Place>
  );
}

/** A fishing boat with a furled sail, about 120 long. */
export function Boat({
  x,
  y,
  s = 1,
  face = 1,
}: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
}) {
  return (
    <Place x={x} y={y} s={s} face={face}>
      <path className="pl-l" d="M0,-8V-70M0,-66L34,-58" />
      <Ink d="M0,-64C8,-52 8,-30 0,-18Z" tone="p" />
      <Ink d="M-58,-14C-40,2 40,2 60,-16L52,-18H-50Z" tone="c" />
      <path className="pl-f" d="M-44,-8H46" />
    </Place>
  );
}

/** A low table set with bowls and bread, about 30 tall and 110 wide. */
export function Table({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <Place x={x} y={y} s={s}>
      <path className="pl-l" d="M-46,-22V0M46,-22V0" />
      <Ink d="M-56,-30H56V-22H-56Z" tone="c" />
      <Ink d="M-38,-30c0,-9 18,-9 18,0Z" tone="b" />
      <Ink d="M-8,-30c0,-11 22,-11 22,0Z" tone="c" />
      <Ink d="M24,-30c0,-8 16,-8 16,0Z" tone="b" />
    </Place>
  );
}

// ── Animals ───────────────────────────────────────────────────────────────

/** A sheep, about 34 tall; `lamb` draws a smaller one with longer legs. */
export function Sheep({
  x,
  y,
  s = 1,
  face = 1,
  lamb,
  graze,
}: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
  lamb?: boolean;
  /** Head down to the grass. */
  graze?: boolean;
}) {
  const k = lamb ? 0.7 : 1;
  const head = graze
    ? "M18,-14C26,-12 30,-4 26,2C22,4 18,0 17,-6Z"
    : "M18,-26C26,-30 32,-24 30,-18C26,-14 20,-16 17,-20Z";
  return (
    <Place x={x} y={y} s={s * k} face={face}>
      <path
        className="pl-l"
        d={`M-12,-8V${lamb ? 4 : 0}M-5,-8V${lamb ? 4 : 0}M8,-8V${lamb ? 4 : 0}M14,-8V${lamb ? 4 : 0}`}
      />
      <Ink
        d="M-20,-14C-26,-22 -18,-32 -10,-28C-6,-36 6,-36 10,-29C18,-33 26,-24 20,-16C24,-8 14,-4 8,-8C2,-3 -8,-3 -12,-8C-20,-5 -24,-9 -20,-14Z"
        tone="p"
      />
      <path
        className="pl-f"
        d="M-10,-20c3,-3 6,-3 9,0M2,-22c3,-3 6,-3 9,0M-4,-13c3,-3 6,-3 9,0"
      />
      <Ink d={head} tone="c" />
    </Place>
  );
}

/** A dove in flight, about 40 across. */
export function Dove({
  x,
  y,
  s = 1,
  face = 1,
}: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
}) {
  return (
    <Place x={x} y={y} s={s} face={face}>
      <Ink
        d="M-20,0C-10,-8 6,-8 18,-2L26,-4L20,2C10,8 -6,8 -14,4L-26,8Z"
        tone="p"
      />
      <Ink d="M-6,-4C-10,-20 2,-28 12,-26C6,-18 6,-10 4,-4Z" tone="p" />
      <path className="pl-f" d="M-2,-10c2,-6 6,-10 10,-12" />
    </Place>
  );
}

/** A donkey, about 56 tall. */
export function Donkey({
  x,
  y,
  s = 1,
  face = 1,
}: {
  x: number;
  y: number;
  s?: number;
  face?: 1 | -1;
}) {
  return (
    <Place x={x} y={y} s={s} face={face}>
      <path
        className="pl-l"
        d="M-24,-26V0M-16,-26V0M14,-26V0M22,-26V0M-30,-34C-36,-28 -36,-20 -34,-14"
      />
      <Ink
        d="M-30,-40C-30,-48 20,-48 26,-40L28,-24C10,-20 -14,-20 -30,-24Z"
        tone="c"
      />
      <Ink
        d="M22,-42L34,-58C40,-60 46,-54 44,-46L36,-36C30,-32 24,-36 22,-42Z"
        tone="c"
      />
      <path className="pl-l" d="M34,-58L32,-70L38,-60M38,-60L40,-70L42,-58" />
    </Place>
  );
}
