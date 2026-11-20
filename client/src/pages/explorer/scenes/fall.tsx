/**
 * The Fall (Genesis 3), in the engraved hand. Judgment and mercy in one
 * picture. Behind: the garden's edge, a hedge of trees with one way in, the
 * tree of life beyond it, and the way guarded on the east side by two
 * cherubim and a whirling sword of flame (Genesis 3:24). In front: the man
 * and the woman walking away, a step apart (3:12), dressed in the garments
 * of skin God made for them (3:21); their fig leaves dropped on the path
 * (3:7); thorns and thistles in the ground (3:18); the serpent on its belly
 * in the dust (3:14). The tap activity places its four spots on these parts
 * (stops/fall.json). One mustard mark: the flame of the sword.
 */
import type { Drawing } from "@/components/art/PlateSvg";
import { Shape } from "../art";

/** One tree of the garden's hedge: a round crown on a short trunk. */
const crown = (x: number, y: number, r: number) =>
  `M${x - r},${y}a${r},${r * 0.9} 0 1,0 ${2 * r},0a${r},${r * 0.9} 0 1,0 ${-2 * r},0Z`;

/** A cherub, drawn as a tall robed figure with wings swept up; no face. */
function Cherub({ x, flip }: { x: number; flip?: boolean }) {
  const s = flip ? -1 : 1;
  const wing = `M${x},${226}C${x - 60 * s},${200} ${x - 74 * s},${136} ${x - 40 * s},${108}C${x - 40 * s},${150} ${x - 22 * s},${190} ${x},${214}Z`;
  const wing2 = `M${x},${226}C${x + 44 * s},${196} ${x + 50 * s},${150} ${x + 30 * s},${120}C${x + 26 * s},${160} ${x + 16 * s},${194} ${x},${214}Z`;
  return (
    <>
      <Shape d={wing} tone="b" off={3} />
      <path
        className="pl-f"
        d={`M${x - 8 * s},${210}C${x - 30 * s},${190} ${x - 44 * s},${160} ${x - 42 * s},${126}M${x - 4 * s},${200}C${x - 22 * s},${184} ${x - 30 * s},${160} ${x - 30 * s},${138}`}
      />
      <Shape d={wing2} tone="b" off={3} />
      <path
        className="pl-o"
        d={`M${x - 9},${206}a9,9 0 1,0 18,0a9,9 0 1,0 -18,0Z`}
      />
      <path
        className="pl-l"
        d={`M${x - 9},${206}a9,9 0 1,0 18,0a9,9 0 1,0 -18,0Z`}
      />
      <Shape
        d={`M${x - 12},${216}H${x + 12}L${x + 20},${330}H${x - 20}Z`}
        tone="b"
        off={3}
      />
      <path className="pl-f" d={`M${x},${222}V${330}`} />
    </>
  );
}

const scene: Drawing = {
  w: 800,
  h: 600,
  label:
    "Outside the garden, on its east side, the way back in guarded by two cherubim and a whirling sword of flame.",
  draw: h => (
    <>
      {/* The sky over the garden. */}
      <path fill={h.hs} d="M0,0H800V330H0Z" />

      {/* Far hills to the east, outside the garden. */}
      <Shape
        d="M0,330V226C60,186 120,196 180,236C230,200 300,196 350,262V330Z"
        tone="b"
        off={3}
      />
      <path
        fill={h.hs}
        d="M0,330V226C60,186 120,196 180,236C230,200 300,196 350,262V330Z"
      />

      {/* Inside the garden, seen through the way in: the tree of life. */}
      <path className="pl-paper" d="M520,330V230H640V330Z" />
      <Shape d="M572,330V214h16v116Z" tone="c" off={3} />
      <Shape d={crown(580, 164, 70)} tone="g" off={4} />
      <path fill={h.h2} d="M580,101a70,63 0 0 1 0,126Z" />
      {[
        [540, 140],
        [566, 118],
        [612, 128],
        [632, 168],
        [548, 186],
        [600, 200],
        [582, 156],
      ].map(([x, y]) => (
        <Shape
          key={`${x},${y}`}
          d={`M${x - 6},${y}a6,6 0 1,0 12,0a6,6 0 1,0 -12,0Z`}
          tone="c"
          off={1.5}
        />
      ))}

      {/* The garden's edge: a hedge of trees, with the one way in left open. */}
      {[
        [370, 252, 40],
        [430, 236, 46],
        [490, 256, 40],
        [670, 256, 40],
        [730, 234, 48],
        [792, 250, 42],
      ].map(([x, y, r]) => (
        <Shape key={`${x}`} d={crown(x, y, r)} tone="g" off={4} />
      ))}
      <path fill={h.h2} d="M640,200H800V330H640Z" opacity="0.5" />
      <Shape d="M330,330V286H530V330Z" tone="g" off={4} />
      <Shape d="M630,330V286H800V330Z" tone="g" off={4} />
      <path fill={h.h1} d="M630,286H800V330H630Z" />
      <path className="pl-f" d="M340,300H520M340,314H520M640,300H790M640,314H790" />

      {/* The cherubim, and the whirling sword of flame between them. */}
      <Cherub x={500} />
      <Cherub x={660} flip />
      <path
        className="pl-l"
        d="M546,226c-18,24 -18,64 0,88M614,226c18,24 18,64 0,88M552,334c18,8 38,8 56,0"
      />
      <path
        className="pl-m"
        d="M580,196c-22,24 -6,44 -16,66c-8,20 2,40 16,56c14,-16 24,-36 16,-56c-10,-22 6,-42 -16,-66Z"
      />
      <path
        className="pl-l"
        d="M580,196c-22,24 -6,44 -16,66c-8,20 2,40 16,56c14,-16 24,-36 16,-56c-10,-22 6,-42 -16,-66Z"
      />
      <path className="pl-o" d="M576,226H584V306L580,314L576,306Z" />
      <path className="pl-l" d="M564,316H596M580,316V334" />

      {/* The ground outside the garden. */}
      <path className="pl-o" d="M0,330H800V600H0Z" />
      <path fill={h.hh} d="M0,330H800V352H0Z" />
      <path className="pl-l" d="M0,330H800" />
      <path
        className="pl-f"
        d="M30,380h40M110,372h26M210,388h34M60,430h22M380,392h30M690,380h40M740,420h26M620,450h30M40,470h24M220,560h30M560,520h26"
      />
      <Shape d="M96,404c4,-12 26,-14 32,0Z" tone="b" off={2} />
      <Shape d="M640,412c4,-10 22,-12 28,0Z" tone="b" off={2} />
      {/* The path away from the way in, east and down to the front. */}
      <path className="pl-o" d="M556,336H604L470,600H250Z" />
      <path className="pl-f" d="M556,336L250,600M604,336L470,600" />
      <path fill={h.hs} d="M556,336H604L470,600H250Z" />

      {/* The fig leaves they made for themselves, dropped on the path. */}
      <Shape
        d="M372,520c-10,-14 -4,-30 10,-34c-2,-10 10,-18 18,-10c10,-8 24,0 20,12c12,4 12,20 0,24c-10,14 -32,16 -48,8Z"
        tone="g"
        off={3}
      />
      <path className="pl-f" d="M378,516c12,-8 24,-14 38,-18M396,510l-4,-16" />
      <Shape
        d="M410,548c-6,-12 2,-24 14,-24c2,-10 16,-12 20,-2c12,0 16,14 6,22c-6,12 -28,14 -40,4Z"
        tone="g"
        off={3}
      />
      <path className="pl-f" d="M416,544c10,-6 20,-10 30,-12" />

      {/* The man and the woman walking away, a step apart, in the garments God made. */}
      <path className="pl-o" d="M156,388a13,13 0 1,0 26,0a13,13 0 1,0 -26,0Z" />
      <path className="pl-l" d="M156,388a13,13 0 1,0 26,0a13,13 0 1,0 -26,0Z" />
      <Shape d="M154,404H184L196,500H142Z" tone="c" off={4} />
      <path fill={h.h1} d="M154,404H184L196,500H142Z" />
      <path className="pl-l" d="M150,500v30M182,500v30M154,412l-22,52M184,412l10,48" />
      <path className="pl-f" d="M146,470l-4,6M160,480l-2,8M176,470l2,8M188,486l2,6" />

      <path className="pl-o" d="M286,398a12,12 0 1,0 24,0a12,12 0 1,0 -24,0Z" />
      <path className="pl-l" d="M286,398a12,12 0 1,0 24,0a12,12 0 1,0 -24,0Z" />
      <Shape d="M284,413H312L326,512H270Z" tone="c" off={4} />
      <path fill={h.h2} d="M298,413H312L326,512H298Z" />
      <path className="pl-l" d="M280,512v24M314,512v24M286,420l-10,46M312,420l18,40" />
      <path className="pl-f" d="M276,486l-2,8M296,494l0,8M318,488l2,8" />

      {/* Thorns and thistles in the ground. */}
      <Shape
        d="M0,600V500C20,470 50,476 64,496C80,474 116,478 126,506C146,498 170,520 164,548C178,560 176,586 168,600Z"
        tone="g"
        off={3}
      />
      <path
        fill={h.h1}
        d="M0,600V500C20,470 50,476 64,496C80,474 116,478 126,506C146,498 170,520 164,548C178,560 176,586 168,600Z"
      />
      <path
        className="pl-l"
        d="M14,494l-6,-12M34,482l0,-12M58,490l6,-12M84,480l2,-12M108,484l8,-10M128,506l12,-6M150,516l12,-2M162,544l12,4M170,572l12,4"
      />
      <path
        className="pl-l"
        d="M40,600C46,560 58,540 76,520M76,520l-10,-4M64,540l-10,0M54,566l-10,-2M76,600C82,566 96,548 118,536M118,536l-6,-10M100,550l-8,-6M90,572l-10,-4"
      />
      <path
        className="pl-l"
        d="M650,600C654,566 664,546 680,530M680,530l-8,-8M668,548l-10,-2M660,574l-10,0M716,600C716,566 726,540 746,522M746,522l-2,-12M734,538l-10,-6M724,562l-10,-4M770,600C774,574 780,560 792,548M792,548l-2,-10M782,566l-10,-4"
      />
      <Shape d="M670,520a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z" tone="b" off={2} />
      <path className="pl-l" d="M672,508l-6,-8M681,506v-10M690,508l6,-8" />
      <Shape d="M736,512a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z" tone="b" off={2} />
      <path className="pl-l" d="M738,500l-6,-8M747,498v-10M756,500l6,-8" />
      <Shape d="M70,512a10,10 0 1,0 20,0a10,10 0 1,0 -20,0Z" tone="b" off={2} />
      <path className="pl-l" d="M72,501l-6,-7M80,499v-9M88,501l6,-7" />

      {/* The serpent, on its belly in the dust. */}
      <Shape
        d="M518,572c20,-16 40,8 60,-4s34,-20 54,-6l-2,8c-18,-12 -32,-4 -50,6s-42,-10 -60,4Z"
        tone="b"
        off={2}
      />
      <path className="pl-k" d="M628,562l14,-4l-6,10Z" />
    </>
  ),
};

export default scene;
