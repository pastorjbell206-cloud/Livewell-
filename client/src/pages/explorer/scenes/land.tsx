/**
 * The Land and the Judges (Joshua to Ruth), in the engraved hand. Left: the
 * river Jordan, crossed on dry ground (Joshua 3:17), and on the near side
 * the twelve stones taken from the riverbed, one for each tribe, piled up
 * as a memorial (Joshua 4:3-8, 20): twelve, counted. Behind: the hill
 * country with a village. Right: a field of barley at harvest (Ruth 1:22),
 * the sheaves standing, a harvester ahead and a woman gleaning the grain
 * behind him (Ruth 2:3). One mustard mark: the low sun over the hills.
 */
import type { Drawing } from "@/components/art/PlateSvg";
import { Shape } from "../art";

/** The twelve stones: five, four, two, one. */
const STONES: [number, number, number][] = [
  [262, 520, 22],
  [306, 522, 22],
  [350, 522, 22],
  [394, 520, 22],
  [438, 522, 20],
  [284, 484, 21],
  [328, 486, 21],
  [372, 484, 21],
  [414, 488, 19],
  [308, 450, 20],
  [352, 450, 20],
  [330, 418, 18],
];

/** One field stone: a rounded block with uneven sides, never two alike. */
function stone(x: number, y: number, r: number, i: number) {
  const k = [0.9, 1, 0.85, 1.05, 0.95, 0.8][i % 6];
  const pts = [0, 60, 120, 180, 240, 300].map((a, j) => {
    const rad = ((a + i * 17) * Math.PI) / 180;
    const rr = r * 1.24 * (j % 2 ? k : 1);
    return `${(x + rr * Math.cos(rad)).toFixed(1)},${(y + rr * 0.84 * Math.sin(rad)).toFixed(1)}`;
  });
  return `M${pts.join("L")}Z`;
}

/** Barley in rows: a stalk and its bearded head. */
const STALKS = (() => {
  const d: string[] = [];
  for (let row = 0; row < 4; row++) {
    const y = 380 + row * 52;
    for (let x = 600 + (row % 2) * 14; x < 800; x += 26)
      d.push(
        `M${x},${y + 40}V${y}`,
        `M${x},${y}l-5,-8M${x},${y + 6}l-5,-8M${x},${y + 12}l-5,-8M${x},${y}l5,-8M${x},${y + 6}l5,-8M${x},${y + 12}l5,-8`
      );
  }
  return d.join("");
})();

const scene: Drawing = {
  w: 800,
  h: 600,
  label:
    "The river Jordan, the twelve stones from the riverbed, and a field of barley at harvest.",
  draw: h => (
    <>
      {/* The sky and the low sun. */}
      <path fill={h.hs} d="M0,0H800V300H0Z" />
      <path
        className="pl-l"
        d="M660,72V52M660,188V208M582,130H562M738,130H758M606,76l-14,-14M714,184l14,14M606,184l-14,14M714,76l14,-14"
      />
      <path className="pl-m" d="M616,130a44,44 0 1,0 88,0a44,44 0 1,0 -88,0Z" />
      <path className="pl-l" d="M616,130a44,44 0 1,0 88,0a44,44 0 1,0 -88,0Z" />

      {/* The hill country behind, terraced, with a village. */}
      <Shape
        d="M0,300V218C60,186 130,192 190,222C260,172 360,166 430,214C500,176 600,190 660,232C720,206 770,210 800,224V300Z"
        tone="g"
        off={4}
      />
      <path
        fill={h.h1}
        d="M430,214C500,176 600,190 660,232C720,206 770,210 800,224V300H430Z"
      />
      <path
        className="pl-f"
        d="M220,214c40,-16 90,-20 150,-6M200,232c50,-18 120,-22 200,-4M190,252c60,-16 150,-18 240,0M460,214c40,-12 90,-12 140,6M450,236c60,-14 130,-10 200,12"
      />
      <Shape d="M300,196h22v-16h-22ZM326,196h18v-22h-18ZM348,196h22v-14h-22Z" tone="c" off={2} />
      <path className="pl-k" d="M308,190h6v6h-6ZM332,188h6v8h-6ZM356,190h6v6h-6Z" />

      {/* The ground. */}
      <path className="pl-o" d="M0,300H800V600H0Z" />
      <path className="pl-l" d="M0,300H800" />

      {/* The Jordan, crossed on dry ground. */}
      <Shape
        d="M70,300H190C170,360 200,420 230,470C250,510 240,560 250,600H90C100,550 110,510 100,470C80,420 50,360 70,300Z"
        tone="b"
        off={4}
      />
      <path
        className="pl-f"
        d="M86,330c20,-6 40,6 60,0s30,4 36,0M80,370c20,-6 40,6 60,0s34,4 44,0M92,410c20,-6 40,6 60,0s36,4 46,0M104,450c20,-6 40,6 60,0s40,4 54,0M108,490c20,-6 40,6 60,0s40,4 60,0M104,530c20,-6 40,6 60,0s40,4 66,0M100,570c20,-6 40,6 60,0s44,4 70,0"
      />
      <path fill={h.hs} d="M0,300H70C50,360 80,420 100,470C110,510 100,550 90,600H0Z" />

      {/* The twelve stones from the middle of the river. */}
      {STONES.map(([x, y, r], i) => (
        <Shape
          key={`${x},${y}`}
          d={stone(x, y, r, i)}
          tone="b"
          hatch={i % 3 === 0 ? h.h1 : undefined}
          off={2}
        />
      ))}
      <path fill={h.h2} d="M240,536H460V544H240Z" opacity="0.6" />
      <path className="pl-l" d="M232,544H470" />

      {/* The field of barley at harvest. */}
      <path fill={h.hh} d="M560,330H800V600H520Z" />
      <path className="pl-f" d={STALKS} />
      {/* Sheaves standing. */}
      {[
        [520, 360],
        [700, 330],
        [764, 360],
      ].map(([x, y]) => (
        <g key={x}>
          <Shape
            d={`M${x - 14},${y + 50}L${x - 4},${y + 14}L${x - 16},${y}H${x + 16}L${x + 4},${y + 14}L${x + 14},${y + 50}Z`}
            tone="g"
            off={2}
          />
          <path className="pl-l" d={`M${x - 8},${y + 14}H${x + 8}`} />
          <path
            className="pl-f"
            d={`M${x - 10},${y}l-4,-10M${x},${y}v-12M${x + 10},${y}l4,-10`}
          />
        </g>
      ))}

      {/* A harvester ahead, with a sickle. */}
      <path className="pl-o" d="M628,316a8,8 0 1,0 16,0a8,8 0 1,0 -16,0Z" />
      <path className="pl-l" d="M628,316a8,8 0 1,0 16,0a8,8 0 1,0 -16,0Z" />
      <Shape d="M628,326H644L650,370H622Z" tone="b" off={2} />
      <path className="pl-l" d="M626,330l-14,18M612,348c-10,-4 -14,-12 -12,-20" />

      {/* A woman gleaning behind the harvesters, bent to the ground. */}
      <path className="pl-o" d="M490,440a12,12 0 1,0 24,0a12,12 0 1,0 -24,0Z" />
      <path className="pl-l" d="M490,440a12,12 0 1,0 24,0a12,12 0 1,0 -24,0Z" />
      <Shape
        d="M514,440C540,432 566,444 572,472L580,540H536L540,486C528,470 518,456 514,452Z"
        tone="c"
        off={4}
      />
      <path fill={h.h2} d="M556,450C566,458 570,466 572,472L580,540H556Z" />
      <path className="pl-l" d="M520,454l-18,40M532,460l-12,38" />
      <path className="pl-f" d="M496,500l6,-14M500,502l8,-12M504,504l10,-10" />
    </>
  ),
};

export default scene;
