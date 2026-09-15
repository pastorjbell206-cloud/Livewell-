/**
 * EssayArt — an image for every essay, drawn in the brand.
 *
 * No essay in the library has a photograph, and hand-making hundreds of
 * covers does not scale. The previous generator drew one-pixel line motifs
 * with no fill and no texture; they were tasteful and did not read as images,
 * and because the motif was keyed to the pillar, the 59% of essays that fall
 * to the default pillar all got the same one.
 *
 * This draws filled, layered shapes in the palette tokens with paper grain,
 * from twelve motif families. The family is chosen by the TRACK the library
 * actually stores for the essay (politics, doubt, marriage…), never by the
 * pillar fallback, and a hash of the slug varies scale, position, count and
 * tilt, so two essays on the same subject rhyme without matching. The same
 * seed always produces the same picture, on a card, on the essay page, and in
 * dark mode (every colour is a token, so the art inverts with the theme).
 *
 * A real cover image, when James adds one, always wins over this.
 */
import React, { useId } from "react";
import { resolveTrack } from "@/lib/taxonomy";

export const W = 1200;
export const H = 675;
const CX = W / 2;
const CY = H / 2;

const ink = "var(--ink)";
const charcoal = "var(--charcoal)";
const mustard = "var(--mustard)";
const mustardDeep = "var(--mustard-deep)";
const warm = "var(--bone-warm)";
const muted = "var(--bone-muted)";
const bone = "var(--bone)";

/** FNV-1a — stable across renders and runtimes. */
export function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministic pseudo-random numbers derived from one hash. */
function rng(h: number) {
  let s = h || 1;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5; s >>>= 0;
    return (s >>> 0) / 4294967296;
  };
}

type Family = (r: () => number) => React.ReactNode;

/** Twelve families. Each is a strong filled composition, not a diagram. */
const FAMILIES: Family[] = [
  // 0 — Horizon: a low ground and a sun that is either rising or setting.
  r => {
    const ground = H * (0.58 + r() * 0.12);
    const sx = W * (0.3 + r() * 0.4);
    const sr = 150 + r() * 70;
    return (
      <>
        <circle cx={sx} cy={ground - 20} r={sr} fill={mustard} />
        <rect x={0} y={ground} width={W} height={H - ground} fill={charcoal} />
        <rect x={0} y={ground - 3} width={W} height={3} fill={ink} opacity={0.35} />
      </>
    );
  },
  // 1 — Covenant: two discs that share a middle.
  r => {
    const off = 120 + r() * 90;
    const rad = 200 + r() * 40;
    return (
      <>
        <circle cx={CX - off} cy={CY} r={rad} fill={ink} opacity={0.92} />
        <circle cx={CX + off} cy={CY + (r() * 40 - 20)} r={rad} fill={mustard} opacity={0.88} />
      </>
    );
  },
  // 2 — Steps: bars that climb, one of them gold.
  r => {
    const n = 5 + Math.floor(r() * 3);
    const gold = Math.floor(r() * n);
    const bw = 88;
    const gap = 26;
    const total = n * bw + (n - 1) * gap;
    const x0 = CX - total / 2;
    return (
      <>
        {Array.from({ length: n }, (_, i) => {
          const hgt = 120 + i * ((H * 0.6) / n);
          return (
            <rect key={i} x={x0 + i * (bw + gap)} y={H - 60 - hgt} width={bw} height={hgt}
              fill={i === gold ? mustard : charcoal} opacity={i === gold ? 1 : 0.9 - i * 0.05} />
          );
        })}
      </>
    );
  },
  // 3 — Column: a standing form with a fracture of light through it.
  r => {
    const cw = 180 + r() * 60;
    const x = CX - cw / 2 + (r() * 160 - 80);
    const yTop = 60 + r() * 60;
    const cut = H * (0.35 + r() * 0.3);
    return (
      <>
        <rect x={x} y={yTop} width={cw} height={H - yTop - 50} fill={charcoal} />
        <polygon points={`${x},${cut - 40} ${x + cw},${cut - 90} ${x + cw},${cut - 50} ${x},${cut}`} fill={mustard} />
      </>
    );
  },
  // 4 — Arch: a window, and the light in it.
  r => {
    const aw = 300 + r() * 80;
    const x = CX - aw / 2 + (r() * 120 - 60);
    const top = 70 + r() * 40;
    const rad = aw / 2;
    const inner = 40;
    const outerPath = `M ${x} ${H - 40} V ${top + rad} A ${rad} ${rad} 0 0 1 ${x + aw} ${top + rad} V ${H - 40} Z`;
    const innerPath = `M ${x + inner} ${H - 40} V ${top + rad} A ${rad - inner} ${rad - inner} 0 0 1 ${x + aw - inner} ${top + rad} V ${H - 40} Z`;
    return (
      <>
        <path d={outerPath} fill={charcoal} />
        <path d={innerPath} fill={warm} />
        <circle cx={x + aw / 2} cy={top + rad + 10} r={rad * 0.42} fill={mustard} />
      </>
    );
  },
  // 5 — Path: a road that bends, and a point of arrival.
  r => {
    const y1 = H - 60 - r() * 80;
    const y2 = 60 + r() * 80;
    const c1x = W * (0.15 + r() * 0.25);
    const c2x = W * (0.6 + r() * 0.25);
    const d = `M -20 ${y1} C ${c1x} ${y1}, ${c2x} ${y2}, ${W + 20} ${y2}`;
    return (
      <>
        <path d={d} fill="none" stroke={charcoal} strokeWidth={34} strokeLinecap="round" />
        <circle cx={W - 120} cy={y2 + 2} r={38} fill={mustard} />
      </>
    );
  },
  // 6 — Target: rings that close on one point.
  r => {
    const n = 4 + Math.floor(r() * 3);
    const step = (Math.min(W, H) * 0.42) / n;
    const cx = CX + (r() * 200 - 100);
    return (
      <>
        {Array.from({ length: n }, (_, i) => (
          <circle key={i} cx={cx} cy={CY} r={(n - i) * step} fill={i % 2 === 0 ? ink : warm} opacity={i % 2 === 0 ? 0.9 : 1} />
        ))}
        <circle cx={cx} cy={CY} r={step * 0.55} fill={mustard} />
      </>
    );
  },
  // 7 — Stones: a scatter of weights, one of them gold.
  r => {
    const n = 6 + Math.floor(r() * 4);
    const gold = Math.floor(r() * n);
    const fills = [ink, charcoal, muted, ink, charcoal];
    return (
      <>
        {Array.from({ length: n }, (_, i) => {
          const rad = 34 + r() * 70;
          const cx = 120 + r() * (W - 240);
          const cy = 90 + r() * (H - 180);
          return <circle key={i} cx={cx} cy={cy} r={rad} fill={i === gold ? mustard : fills[i % fills.length]} opacity={i === gold ? 1 : 0.85} />;
        })}
      </>
    );
  },
  // 8 — Peaks: three ranges, the far one lit.
  r => {
    const base = H - 40;
    const p = (cx: number, w: number, h: number) => `${cx - w / 2},${base} ${cx},${base - h} ${cx + w / 2},${base}`;
    const a = CX + (r() * 200 - 100);
    return (
      <>
        <polygon points={p(a + 200, 640, 380 + r() * 100)} fill={mustard} />
        <polygon points={p(a - 160, 700, 300 + r() * 120)} fill={charcoal} opacity={0.92} />
        <polygon points={p(a + 60, 520, 210 + r() * 90)} fill={ink} />
      </>
    );
  },
  // 9 — Lattice: the grid we live in, and the one square that is different.
  r => {
    const cols = 6;
    const rows = 3;
    const cell = 130;
    const gap = 22;
    const gw = cols * cell + (cols - 1) * gap;
    const gh = rows * cell + (rows - 1) * gap;
    const x0 = CX - gw / 2;
    const y0 = CY - gh / 2;
    const gold = Math.floor(r() * cols * rows);
    const dark = (gold + 1 + Math.floor(r() * (cols * rows - 1))) % (cols * rows);
    return (
      <>
        {Array.from({ length: cols * rows }, (_, i) => {
          const cx = x0 + (i % cols) * (cell + gap);
          const cy = y0 + Math.floor(i / cols) * (cell + gap);
          const fill = i === gold ? mustard : i === dark ? ink : charcoal;
          return <rect key={i} x={cx} y={cy} width={cell} height={cell} rx={6} fill={fill} opacity={i === gold || i === dark ? 1 : 0.14} />;
        })}
      </>
    );
  },
  // 10 — Book: two pages open on a spine, a ribbon marking the place.
  r => {
    const w = 380 + r() * 80;
    const h = 300 + r() * 60;
    const x = CX;
    const y = CY - h / 2 + 20;
    const lean = 24 + r() * 26;
    return (
      <>
        <polygon points={`${x - w},${y + lean} ${x},${y} ${x},${y + h} ${x - w},${y + h + lean}`} fill={charcoal} />
        <polygon points={`${x},${y} ${x + w},${y + lean} ${x + w},${y + h + lean} ${x},${y + h}`} fill={ink} opacity={0.92} />
        <rect x={x + w * 0.55} y={y + lean * 0.55} width={18} height={h * 0.55} fill={mustard} />
      </>
    );
  },
  // 11 — Table: a plank, two legs, and something set on it.
  r => {
    const tw = 620 + r() * 200;
    const ty = H * (0.5 + r() * 0.1);
    const x = CX - tw / 2;
    return (
      <>
        <rect x={x} y={ty} width={tw} height={36} fill={charcoal} />
        <rect x={x + 40} y={ty + 36} width={26} height={H - ty - 76} fill={charcoal} opacity={0.9} />
        <rect x={x + tw - 66} y={ty + 36} width={26} height={H - ty - 76} fill={charcoal} opacity={0.9} />
        <circle cx={x + tw * (0.3 + r() * 0.4)} cy={ty - 52} r={52} fill={mustard} />
      </>
    );
  },
];

export const FAMILY_COUNT = FAMILIES.length;

/** Which families suit which track; the hash picks among them. */
const FAMILIES_BY_TRACK: Record<string, number[]> = {
  politics: [0, 3, 8, 9],
  "american-church": [4, 3, 9],
  "after-christendom": [0, 4, 8],
  theology: [6, 10, 4],
  doubt: [5, 3, 7],
  marriage: [1, 11, 7],
  parenting: [7, 11, 2],
  devotionals: [0, 6, 5],
  "prophetic-justice": [2, 9, 8],
  "pastoral-ministry": [4, 11, 1],
};

/** The family index for an essay — exported so tests can pin determinism and spread. */
export function familyFor(seed: string, track?: string | null): number {
  const h = hashSeed(seed);
  const slug = resolveTrack(track)?.slug ?? (track && FAMILIES_BY_TRACK[track] ? track : null);
  const pool = slug ? FAMILIES_BY_TRACK[slug] : undefined;
  if (pool && pool.length) return pool[h % pool.length];
  return h % FAMILY_COUNT;
}

export function EssayArt({
  seed,
  track,
  title,
  decorative = false,
  style,
}: {
  /** Usually the essay slug. The same seed always draws the same picture. */
  seed: string;
  /** The raw `pillar`/track string the library stores (politics, doubt, marriage…). */
  track?: string | null;
  /** Used for the accessible label when the art is the page's image. */
  title?: string;
  /** True on cards, where the title sits beside the art and the SVG is hidden from readers. */
  decorative?: boolean;
  style?: React.CSSProperties;
}) {
  const id = useId();
  const h = hashSeed(seed);
  const fam = familyFor(seed, track);
  // A fresh stream per instance, advanced past the family choice so siblings differ.
  const r = rng(h ^ (fam * 2654435761));
  const tilt = r() * 10 - 5;
  const dx = r() * 60 - 30;
  const dy = r() * 40 - 20;
  const grainId = `${id}-grain`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : title ? `Cover art for ${title}` : "Essay cover art"}
      style={{ width: "100%", height: "auto", aspectRatio: "16 / 9", display: "block", background: warm, ...style }}
    >
      <defs>
        <filter id={grainId} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.16 0" />
        </filter>
      </defs>
      <rect width={W} height={H} fill={warm} />
      <rect width={W} height={H} fill={bone} opacity={0.5} />
      <g transform={`translate(${dx} ${dy}) rotate(${tilt} ${CX} ${CY})`}>{FAMILIES[fam](r)}</g>
      {/* Paper grain over everything, so filled shapes read as printed, not vector. */}
      <rect width={W} height={H} filter={`url(#${grainId})`} opacity={0.55} />
      <rect width={W} height={H} fill={mustardDeep} opacity={0.035} />
    </svg>
  );
}

export default EssayArt;
