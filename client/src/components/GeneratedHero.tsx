/**
 * GeneratedHero — on-brand article art, generated at render time.
 *
 * No two essays had cover images, and hand-drawing 300 graphics doesn't scale.
 * Instead each article gets a deterministic geometric motif drawn from the brand
 * palette: the pillar chooses the motif family (a marriage essay and a justice
 * essay look different), and a hash of the slug varies it so neighbours within a
 * pillar aren't identical. Colors are CSS tokens, so the art flips with dark mode.
 *
 * A post with a real coverImage keeps it — this is the fallback that makes the
 * branded look universal without any per-article asset or database change.
 */

const VB_W = 1200;
const VB_H = 630;
const CX = VB_W / 2;
const CY = VB_H / 2;

/** Tiny deterministic string hash → unsigned 32-bit int. */
function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const ink = "var(--ink)";
const mustard = "var(--mustard)";

/** Six motif families, indexed by pillar. Each takes a hash for variation. */
const MOTIFS: ((h: number) => React.ReactNode)[] = [
  // 0 — Two interlocking rings (covenant / one flesh)
  h => {
    const r = 180;
    const off = 80 + (h % 24);
    return (
      <>
        <defs>
          <clipPath id="gh-lens">
            <circle cx={CX - off} cy={CY} r={r} />
          </clipPath>
        </defs>
        <circle cx={CX + off} cy={CY} r={r} fill={mustard} fillOpacity={0.16} clipPath="url(#gh-lens)" />
        <g fill="none" stroke={ink} strokeWidth={1.6}>
          <circle cx={CX - off} cy={CY} r={r} />
          <circle cx={CX + off} cy={CY} r={r} />
        </g>
      </>
    );
  },
  // 1 — Concentric circles radiating outward
  h => {
    const rings = 6 + (h % 4);
    const gap = 26;
    const mustardRing = 1 + (h % (rings - 1));
    return (
      <g fill="none">
        {Array.from({ length: rings }, (_, i) => (
          <circle
            key={i}
            cx={CX}
            cy={CY}
            r={(i + 1) * gap + 14}
            stroke={i === mustardRing ? mustard : ink}
            strokeWidth={i === mustardRing ? 2 : 1}
            strokeOpacity={i === mustardRing ? 1 : 0.85 - i * 0.07}
          />
        ))}
      </g>
    );
  },
  // 2 — Rising arcs (a horizon)
  h => {
    const count = 5 + (h % 3);
    const step = 34;
    const mustardArc = h % count;
    return (
      <g fill="none">
        {Array.from({ length: count }, (_, i) => {
          const r = 150 + i * step;
          return (
            <path
              key={i}
              d={`M ${CX - r} ${CY + 110} A ${r} ${r} 0 0 1 ${CX + r} ${CY + 110}`}
              stroke={i === mustardArc ? mustard : ink}
              strokeWidth={i === mustardArc ? 2 : 1}
              strokeOpacity={i === mustardArc ? 1 : 0.8 - i * 0.08}
            />
          );
        })}
      </g>
    );
  },
  // 3 — Nested rotated squares
  h => {
    const count = 5 + (h % 3);
    const base = 300;
    const mustardSq = h % count;
    return (
      <g fill="none">
        {Array.from({ length: count }, (_, i) => {
          const s = base - i * 46;
          const rot = i * (10 + (h % 6));
          return (
            <rect
              key={i}
              x={CX - s / 2}
              y={CY - s / 2}
              width={s}
              height={s}
              transform={`rotate(${rot} ${CX} ${CY})`}
              stroke={i === mustardSq ? mustard : ink}
              strokeWidth={i === mustardSq ? 2 : 1}
              strokeOpacity={i === mustardSq ? 1 : 0.85 - i * 0.08}
            />
          );
        })}
      </g>
    );
  },
  // 4 — Radiating lines from a single point
  h => {
    const spokes = 16 + (h % 10);
    const R = 240;
    const mustardSpoke = h % spokes;
    return (
      <g stroke={ink} strokeWidth={1}>
        {Array.from({ length: spokes }, (_, i) => {
          const a = (i / spokes) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={CX}
              y1={CY}
              x2={CX + Math.cos(a) * R}
              y2={CY + Math.sin(a) * R}
              stroke={i === mustardSpoke ? mustard : ink}
              strokeWidth={i === mustardSpoke ? 2 : 1}
              strokeOpacity={i === mustardSpoke ? 1 : 0.55}
            />
          );
        })}
        <circle cx={CX} cy={CY} r={5} fill={mustard} stroke="none" />
      </g>
    );
  },
  // 5 — Dot grid with one weighted node
  h => {
    const cols = 9;
    const rows = 5;
    const gx = 88;
    const gy = 88;
    const startX = CX - ((cols - 1) * gx) / 2;
    const startY = CY - ((rows - 1) * gy) / 2;
    const mustardIdx = h % (cols * rows);
    return (
      <g>
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, c) => {
            const idx = r * cols + c;
            const isM = idx === mustardIdx;
            return (
              <circle
                key={idx}
                cx={startX + c * gx}
                cy={startY + r * gy}
                r={isM ? 8 : 3}
                fill={isM ? mustard : ink}
                fillOpacity={isM ? 1 : 0.4}
              />
            );
          })
        )}
      </g>
    );
  },
];

export function GeneratedHero({
  seed,
  pillarId,
  title,
}: {
  seed: string;
  pillarId?: number;
  title?: string;
}) {
  const h = hash(seed);
  const motifIndex =
    pillarId && pillarId >= 1 && pillarId <= MOTIFS.length
      ? pillarId - 1
      : h % MOTIFS.length;

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      role="img"
      aria-label={title ? `Cover art for ${title}` : "Article cover art"}
      style={{
        width: "100%",
        height: "auto",
        aspectRatio: "16 / 9",
        display: "block",
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border)",
        background: "var(--bone)",
      }}
    >
      <rect width={VB_W} height={VB_H} fill="var(--bone)" />
      <rect width={VB_W} height={VB_H} fill="var(--bone-warm)" opacity={0.45} />
      {/* A slug-derived tilt distinguishes essays that share a pillar's motif. */}
      <g transform={`rotate(${(((h >> 8) % 25) - 12)} ${CX} ${CY})`}>
        {MOTIFS[motifIndex](h)}
      </g>
      {/* The line under the weight — constant across every motif for cohesion */}
      <rect x={CX - 40} y={566} width={80} height={2} fill={mustard} />
    </svg>
  );
}
