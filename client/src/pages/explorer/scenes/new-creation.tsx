/**
 * The New Creation (Revelation 21 and 22), in the engraved hand. The garden
 * has become a city. It keeps the Creation scene's frame, so a child sees
 * the road come home larger: the same horizon, the same trees and river,
 * and people again; but no sea on the left (“the sea was no more”, 21:1),
 * no sun and no moon in the sky (“the city has no need of sun or moon”,
 * 21:23), and no temple among the roofs (21:22). The city wall with its
 * gate standing open (21:25); the river “as clear as crystal” running from
 * the middle of the city down toward us, with a tree of life on each bank
 * (22:1-2); people from far away walking in along the roads with their
 * gifts (21:24-26). One mustard mark: the light at the centre of the city, shining out
 * of its open gate and every window, with its rays across the sky.
 */
import type { Drawing } from "@/components/art/PlateSvg";
import { Shape } from "../art";

type Tone = "b" | "g" | "c";

/** A traveller walking toward the gate, side view, no face; `gift` is a box carried in front. */
function walker(x: number, y: number, tone: Tone, dir: 1 | -1, gift: boolean) {
  const X = (dx: number) => x + dx * dir;
  return (
    <g key={`${x},${y}`}>
      <path
        className="pl-l"
        d={`M${X(-4)},${y + 50}l${-8 * dir},18M${X(6)},${y + 50}l${8 * dir},18`}
      />
      <Shape
        d={`M${X(-10)},${y + 12}H${X(10)}L${X(16)},${y + 52}H${X(-16)}Z`}
        tone={tone}
        off={2}
      />
      <path
        className="pl-o"
        d={`M${x - 9},${y}a9,9 0 1,0 18,0a9,9 0 1,0 -18,0Z`}
      />
      <path
        className="pl-l"
        d={`M${x - 9},${y}a9,9 0 1,0 18,0a9,9 0 1,0 -18,0Z`}
      />
      {gift ? (
        <>
          <path className="pl-l" d={`M${X(6)},${y + 20}l${12 * dir},10`} />
          <Shape
            d={`M${X(14)},${y + 22}h${14 * dir}v14h${-14 * dir}Z`}
            tone="c"
            off={1}
          />
        </>
      ) : (
        <path className="pl-l" d={`M${X(6)},${y + 20}l${10 * dir},16`} />
      )}
    </g>
  );
}

/** A tree of life: a broad crown with fruit, its trunk by the river. */
function tree(x: number, y: number, s: number, hatch: string) {
  const r = 52 * s;
  const fruit: string[] = [];
  for (const [dx, dy] of [
    [-30, -10],
    [-12, -30],
    [14, -22],
    [32, -4],
    [-20, 14],
    [6, 6],
    [26, 22],
    [-36, 26],
  ])
    fruit.push(
      `M${x + dx * s - 4},${y + dy * s}a4,4 0 1,0 8,0a4,4 0 1,0 -8,0Z`
    );
  return (
    <>
      <Shape
        d={`M${x - 7 * s},${y + 90 * s}V${y + 20 * s}h${14 * s}V${y + 90 * s}Z`}
        tone="c"
        off={2}
      />
      <Shape
        d={`M${x - r},${y}a${r},${r * 0.86} 0 1,0 ${2 * r},0a${r},${r * 0.86} 0 1,0 ${-2 * r},0Z`}
        tone="g"
        off={3}
      />
      <path
        fill={hatch}
        d={`M${x},${y - r * 0.86}a${r},${r * 0.86} 0 0 1 0,${r * 1.72}Z`}
      />
      <path className="pl-c" d={fruit.join("")} />
      <path className="pl-f" d={fruit.join("")} />
    </>
  );
}

/** The light's rays across the sky, from the middle of the city. */
const RAYS = (() => {
  const d: string[] = [];
  for (let i = 0; i < 13; i++) {
    const a = Math.PI + (i / 12) * Math.PI;
    const c = Math.cos(a);
    const s = Math.sin(a);
    d.push(
      `M${(400 + 120 * c).toFixed(1)},${(300 + 120 * s).toFixed(1)}L${(400 + 520 * c).toFixed(1)},${(300 + 520 * s).toFixed(1)}`
    );
  }
  return d.join("");
})();

const scene: Drawing = {
  w: 800,
  h: 600,
  label:
    "A city that is also a garden: a river running from its open gate with a tree of life on each bank, people walking in from far away carrying gifts, and light shining from the middle of the city, with no sun or moon in the sky.",
  draw: h => (
    <>
      {/* The sky, lit from the city: no sun, no moon. */}
      <path fill={h.hs} d="M0,0H800V330H0Z" />
      <path className="pl-paper" d="M400,300L0,80V0H800V80Z" />
      <path className="pl-f" d={RAYS} />

      {/* The land all round, where the sea was. */}
      <Shape
        d="M0,330V286C80,270 160,268 220,280L220,330ZM580,280C640,266 720,268 800,282V330H580Z"
        tone="g"
        off={3}
      />
      <path className="pl-o" d="M0,330H800V600H0Z" />
      <path className="pl-l" d="M0,330H800" />

      {/* Roofs of the city behind its wall, and no temple among them. */}
      <Shape
        d="M236,264v-30h34v30ZM274,264v-44h30v44ZM308,264v-24h28v24ZM466,264v-26h28v26ZM498,264v-40h30v40ZM532,264v-30h34v30Z"
        tone="c"
        off={2}
      />
      {/* Every window lit from within. */}
      <path
        className="pl-m"
        d="M246,244h12v12h-12ZM283,230h10v14h-10ZM316,246h10v10h-10ZM474,246h10v10h-10ZM507,234h10v14h-10ZM543,244h12v12h-12Z"
      />
      <path
        className="pl-l"
        d="M246,244h12v12h-12ZM283,230h10v14h-10ZM316,246h10v10h-10ZM474,246h10v10h-10ZM507,234h10v14h-10ZM543,244h12v12h-12Z"
        style={{ strokeWidth: 1.5 }}
      />

      {/* The wall, with towers and the gate standing open. */}
      <path className="pl-o" d="M200,264H600V330H200Z" />
      <path fill={h.hh} d="M200,264H600V330H200Z" />
      <path className="pl-l" d="M200,264H600V330H200Z" />
      <Shape d="M184,330V236h32v94ZM584,330V236h32v94Z" tone="b" off={2} />
      <path className="pl-l" d="M180,236h40M580,236h40" />
      <Shape d="M352,330V232h96v98Z" tone="b" off={3} />
      <path className="pl-l" d="M346,232h108M350,224h100v8" />
      {/* The gateway open, and its two doors swung back. */}
      <path className="pl-m" d="M372,330v-60a28,28 0 0 1 56,0v60Z" />
      <path className="pl-l" d="M372,330v-60a28,28 0 0 1 56,0v60Z" />
      <Shape d="M372,330V272l-14,-8v74Z" tone="c" off={1} />
      <Shape d="M428,330V272l14,-8v74Z" tone="c" off={1} />

      {/* The river, as clear as crystal, from the gate down toward us. */}
      <Shape
        d="M384,330H416C430,420 470,520 520,600H280C330,520 370,420 384,330Z"
        tone="b"
        off={3}
      />
      <path
        className="pl-paper"
        d="M398,350l6,30l-6,-6ZM384,460l8,40l-8,-8ZM426,520l10,40l-10,-8Z"
      />
      <path
        className="pl-f"
        d="M392,370c6,-3 10,3 16,0M376,420c10,-4 18,4 28,0s18,4 28,0M356,480c12,-4 24,4 36,0s24,4 36,0s24,4 34,0M326,550c14,-5 28,5 42,0s28,5 42,0s28,5 42,0s28,5 32,0"
      />

      {/* The roads in from far away. */}
      <path
        className="pl-f"
        d="M0,402C120,388 260,360 362,334M0,418C130,404 270,376 366,342M800,402C680,388 540,360 438,334M800,418C670,404 530,376 434,342"
      />

      {/* A tree of life on each bank. */}
      {tree(270, 430, 1, h.h2)}
      {tree(536, 430, 1, h.h2)}

      {/* People from far away walking in, carrying gifts. */}
      {walker(104, 344, "b", 1, true)}
      {walker(160, 336, "c", 1, false)}
      {walker(686, 344, "g", -1, true)}
      {walker(636, 336, "b", -1, true)}

      {/* The garden at our feet. */}
      <path
        className="pl-f"
        d="M40,470l4,-10l4,10M120,520l4,-10l4,10M60,580l4,-10l4,10M200,560l4,-10l4,10M640,560l4,-10l4,10M720,500l4,-10l4,10M760,580l4,-10l4,10M600,520l4,-10l4,10"
      />
      <Shape d="M14,600a36,30 0 0 1 72,0Z" tone="g" off={2} />
      <Shape d="M716,600a40,34 0 0 1 80,0Z" tone="g" off={2} />
    </>
  ),
};

export default scene;
