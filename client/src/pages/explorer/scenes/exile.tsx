/**
 * The Prophets and Exile (1 Kings 12 to 2 Kings 25), in the engraved hand.
 * By a river in Babylon: “There on the willows we hung our harps”
 * (Psalm 137:1-2). On the near bank, under a willow, two exiles sit with
 * their heads bowed, and two harps hang from its branches. Far off on the
 * horizon, the broken walls of Jerusalem (2 Kings 25:10). In front, a tree
 * cut down to a stump, and from it one green shoot: “a shoot will spring up
 * from the stump of Jesse” (Isaiah 11:1). One mustard mark: the shoot.
 */
import type { Drawing } from "@/components/art/PlateSvg";
import { Shape } from "../art";

/** The willow's hanging twigs: long fine strokes falling from its boughs. */
const TWIGS = (() => {
  const d: string[] = [];
  const boughs: [number, number, number][] = [
    [40, 150, 220],
    [70, 120, 250],
    [110, 110, 260],
    [150, 104, 250],
    [190, 112, 240],
    [230, 124, 250],
    [270, 140, 236],
    [310, 160, 220],
    [350, 184, 190],
  ];
  for (const [x, y, len] of boughs)
    for (let i = 0; i < 4; i++) {
      const xx = x + i * 9;
      const yy = y + (i % 2) * 6;
      d.push(`M${xx},${yy}c-4,${len * 0.4} 2,${len * 0.7} -2,${len - i * 14}`);
    }
  return d.join("");
})();

/** A harp (a lyre) hung by a cord from a branch at (x, y): two curved arms, a crossbar, strings, a sound box. */
function harp(x: number, y: number, tilt: number) {
  return (
    <g transform={`rotate(${tilt} ${x} ${y})`}>
      <path className="pl-f" d={`M${x - 30},${y + 14}C${x - 26},${y} ${x - 8},${y - 8} ${x},${y}`} />
      <path
        className="pl-paper"
        d={`M${x - 30},${y + 27}L${x + 30},${y + 20}C${x + 38},${y + 52} ${x + 34},${y + 84} ${x + 22},${y + 104}H${x - 22}C${x - 34},${y + 84} ${x - 38},${y + 56} ${x - 30},${y + 27}Z`}
      />
      <path
        className="pl-l"
        d={`M${x - 34},${y + 30}L${x + 34},${y + 20}M${x - 22},${y + 104}C${x - 34},${y + 84} ${x - 40},${y + 56} ${x - 30},${y + 14}M${x + 22},${y + 104}C${x + 34},${y + 84} ${x + 42},${y + 50} ${x + 30},${y + 4}`}
        style={{ strokeWidth: 5 }}
      />
      <Shape
        d={`M${x - 26},${y + 102}H${x + 26}L${x + 20},${y + 128}H${x - 20}Z`}
        tone="c"
        off={2}
      />
      <path className="pl-l" d={`M${x - 16},${y + 110}H${x + 16}`} />
      <path
        className="pl-f"
        d={`M${x - 12},${y + 110}L${x - 14},${y + 27}M${x - 4},${y + 110}L${x - 5},${y + 26}M${x + 4},${y + 110}L${x + 4},${y + 25}M${x + 12},${y + 110}L${x + 13},${y + 24}`}
      />
    </g>
  );
}

/**
 * One of the exiles, sitting on the ground in profile, knees drawn up and
 * head bowed onto them. `dir` 1 faces right, -1 faces left.
 */
function sitter(x: number, y: number, tone: "b" | "c", h: string, dir: 1 | -1) {
  const X = (dx: number) => x + dx * dir;
  const body = `M${X(-26)},${y + 64}C${X(-32)},${y + 34} ${X(-18)},${y + 8} ${X(4)},${y + 6}L${X(34)},${y + 26}C${X(44)},${y + 34} ${X(44)},${y + 52} ${X(42)},${y + 64}Z`;
  return (
    <g>
      <Shape d={body} tone={tone} off={3} />
      <path
        fill={h}
        d={`M${X(-26)},${y + 64}C${X(-30)},${y + 44} ${X(-26)},${y + 28} ${X(-16)},${y + 18}L${X(-4)},${y + 64}Z`}
      />
      <path className="pl-l" d={`M${X(8)},${y + 22}C${X(18)},${y + 32} ${X(28)},${y + 36} ${X(38)},${y + 34}`} />
      <path className="pl-o" d={`M${X(10)},${y + 6}a14,14 0 1,0 ${28 * dir},0a14,14 0 1,0 ${-28 * dir},0Z`} />
      <path className="pl-l" d={`M${X(10)},${y + 6}a14,14 0 1,0 ${28 * dir},0a14,14 0 1,0 ${-28 * dir},0Z`} />
    </g>
  );
}

const scene: Drawing = {
  w: 800,
  h: 600,
  label:
    "Two people sitting by a river under a willow with harps hanging in its branches, Jerusalem's broken walls far away, and a green shoot growing from a cut stump.",
  draw: h => (
    <>
      {/* The sky. */}
      <path fill={h.hs} d="M0,0H800V300H0Z" />

      {/* The plain, and far away the broken walls of Jerusalem. */}
      <path className="pl-o" d="M0,300H800V600H0Z" />
      <path className="pl-l" d="M0,300H800" />
      <Shape
        d="M560,300V276h20v-8h10v8h26v-6l8,10l6,-4v30ZM640,300V284l10,-6l6,8h22v-10h12v24ZM706,300V272h14v8h14l6,-12l6,14h16v18Z"
        tone="c"
        off={2}
      />
      <path fill={h.h2} d="M706,300V272h14v8h14l6,-12l6,14h16v18Z" />
      <path className="pl-f" d="M600,300l6,-8l8,8M690,300l4,-6l6,6M640,262c6,-8 -2,-14 4,-22M716,256c-4,-8 4,-14 0,-22" />
      <path className="pl-f" d="M380,330c60,-4 140,-4 200,0M80,322c50,-4 120,-4 170,0" />

      {/* The river of Babylon. */}
      <Shape
        d="M0,360C160,350 320,372 480,362C620,354 720,364 800,358V440C680,448 560,436 420,446C280,456 140,440 0,448Z"
        tone="b"
        off={4}
      />
      <path
        className="pl-f"
        d="M40,388c20,-6 40,6 60,0s40,6 60,0M260,396c20,-6 40,6 60,0s40,6 60,0M500,384c20,-6 40,6 60,0s40,6 60,0M120,420c20,-6 40,6 60,0s40,6 60,0M400,424c20,-6 40,6 60,0M620,416c20,-6 40,6 60,0s40,6 60,0"
      />

      {/* The near bank. */}
      <path className="pl-l" d="M0,448C140,440 280,456 420,446C560,436 680,448 800,440" />
      <path
        className="pl-f"
        d="M60,500l4,-10l4,10M330,490l4,-10l4,10M460,530l4,-10l4,10M760,490l4,-10l4,10M420,580l4,-10l4,10M60,580l4,-10l4,10"
      />

      {/* The willow: its trunk, its boughs, and its hanging twigs. */}
      <Shape
        d="M136,600C142,540 150,470 146,400C144,360 150,320 162,290L180,290C174,330 172,370 176,410C180,480 186,550 196,600Z"
        tone="g"
        off={4}
      />
      <path fill={h.h1} d="M170,300C164,340 166,380 170,420C174,480 180,550 188,600H196C186,550 180,480 176,410C172,370 174,330 180,290Z" />
      <path
        className="pl-l"
        d="M164,296C130,240 90,190 40,150M168,292C160,220 140,160 110,110M172,292C186,220 180,160 150,104M176,292C210,230 220,170 230,124M176,296C230,250 280,200 350,184"
      />
      <path className="pl-f" d={TWIGS} />

      {/* Two harps hung on the branches. */}
      {harp(92, 176, -8)}
      {harp(306, 200, 9)}

      {/* Two exiles sitting by the water, heads bowed. */}
      {sitter(244, 462, "c", h.h1, 1)}
      {sitter(372, 466, "b", h.h1, -1)}

      {/* The stump, cut down, and the one green shoot growing from it. */}
      <Shape
        d="M560,580C574,560 580,530 578,494H700C698,530 704,560 720,580Z"
        tone="c"
        off={4}
      />
      <path fill={h.h1} d="M660,494H700C698,530 704,560 720,580H664C668,550 664,520 660,494Z" />
      <path className="pl-o" d="M578,494a61,14 0 1,0 122,0a61,14 0 1,0 -122,0Z" />
      <path className="pl-l" d="M578,494a61,14 0 1,0 122,0a61,14 0 1,0 -122,0Z" />
      <path className="pl-f" d="M600,494a39,9 0 1,0 78,0a39,9 0 1,0 -78,0ZM620,494a19,5 0 1,0 38,0a19,5 0 1,0 -38,0Z" />
      <path className="pl-f" d="M596,512c-2,20 0,44 -10,62M620,514c0,22 -2,40 -6,62M682,512c2,22 6,44 14,62" />
      <path className="pl-l" d="M560,580C540,584 524,590 510,598M720,580C740,586 756,592 770,598M600,582l-14,16M690,582l12,16" />
      <path className="pl-l" d="M602,488C598,460 604,436 618,414" />
      <path className="pl-m" d="M604,452C584,446 572,432 570,414C590,416 604,430 604,452Z" />
      <path className="pl-l" d="M604,452C584,446 572,432 570,414C590,416 604,430 604,452Z" />
      <path className="pl-m" d="M612,430C626,418 644,414 660,420C650,434 632,440 612,430Z" />
      <path className="pl-l" d="M612,430C626,418 644,414 660,420C650,434 632,440 612,430Z" />
      <path className="pl-m" d="M618,414C612,402 614,390 622,382C630,392 628,404 618,414Z" />
      <path className="pl-l" d="M618,414C612,402 614,390 622,382C630,392 628,404 618,414Z" />
    </>
  ),
};

export default scene;
