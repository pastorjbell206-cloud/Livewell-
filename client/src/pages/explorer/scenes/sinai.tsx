/**
 * Sinai and the Tent (Exodus 19 to 40), in the engraved hand. Behind: Mount
 * Sinai under a thick cloud (Exodus 19:16-18; 24:16), the people's tents
 * at its foot. In front, the tabernacle drawn from above as a plan that
 * teaches, north at the top and the gate on the east (Exodus 27:13-16):
 * the courtyard's linen curtains on their posts; the altar of burnt offering
 * with a horn at each corner (27:1-2); the bronze basin between the altar
 * and the tent (30:18); the tent itself, the Holy Place with the table on
 * the north side, the lampstand on the south (26:35) and the altar of incense
 * before the veil (30:6); the veil (26:31-33); and the ark of the Testimony
 * with the mercy seat and two cherubim in the Most Holy Place (25:17-22).
 * The walk places its eight marks on these parts (stops/sinai.json). One
 * mustard mark: the seven lamps of the lampstand (25:37).
 */
import type { Drawing } from "@/components/art/PlateSvg";
import { Shape } from "../art";

const POSTS = (() => {
  const d: string[] = [];
  for (let x = 40; x <= 750; x += 40) d.push(`M${x - 4},236h8v8h-8Z`, `M${x - 4},572h8v8h-8Z`);
  for (let y = 276; y <= 540; y += 40) d.push(`M36,${y - 4}h8v8h-8Z`, `M746,${y - 4}h8v8h-8Z`);
  return d.join("");
})();

const scene: Drawing = {
  w: 800,
  h: 600,
  label:
    "Mount Sinai under a cloud, and the tabernacle in the middle of the camp, seen from above.",
  draw: h => (
    <>
      {/* The sky, the mountain and its cloud. */}
      <path fill={h.hs} d="M0,0H800V214H0Z" />
      <Shape
        d="M150,214L300,66L344,104L392,48L470,118L520,96L660,214Z"
        tone="g"
        off={4}
      />
      <path fill={h.h2} d="M392,48L470,118L520,96L660,214H420L404,140Z" />
      <path className="pl-f" d="M300,66L330,214M392,48L380,214M520,96L560,214" />
      <path
        className="pl-o"
        d="M268,70c-10,-24 18,-40 38,-28c8,-26 50,-30 62,-6c14,-20 52,-16 58,8c22,-10 48,6 42,28c22,4 24,30 4,36c-4,14 -26,18 -38,8c-14,14 -44,12 -54,-2c-16,12 -44,8 -52,-8c-20,8 -46,-4 -42,-22c-16,-4 -22,-16 -18,-14Z"
      />
      <path
        className="pl-f"
        d="M300,80c20,8 46,8 66,0M352,96c24,8 52,8 76,-2M318,58c14,6 30,6 44,0"
      />

      {/* The people's tents at the foot of the mountain. */}
      {[40, 92, 144, 640, 692, 744].map(x => (
        <g key={x}>
          <Shape d={`M${x - 22},214L${x},180L${x + 22},214Z`} tone="c" off={2} />
          <path className="pl-k" d={`M${x - 4},214L${x},200L${x + 4},214Z`} />
        </g>
      ))}

      {/* The people gathered at the foot of the mountain. */}
      {[196, 222, 248, 556, 582, 608].map(x => (
        <g key={x}>
          <path className="pl-o" d={`M${x - 5},192a5,5 0 1,0 10,0a5,5 0 1,0 -10,0Z`} />
          <path className="pl-l" d={`M${x - 5},192a5,5 0 1,0 10,0a5,5 0 1,0 -10,0Z`} />
          <Shape d={`M${x - 5},198H${x + 5}L${x + 8},214H${x - 8}Z`} tone="b" off={1.5} />
        </g>
      ))}

      {/* The ground of the camp. */}
      <path className="pl-o" d="M0,214H800V600H0Z" />
      <path fill={h.hs} d="M0,214H800V226H0Z" />
      <path className="pl-l" d="M0,214H800" />

      {/* The courtyard: linen curtains on posts, the gate on the east. */}
      <path className="pl-o" d="M40,240H750V576H40Z" />
      <path fill={h.hh} d="M40,240H750V576H40Z" opacity="0.35" />
      <path className="pl-l" d="M750,350V240H40V576H750V470" />
      <path className="pl-f" d="M742,350V248H48V568H742V470" />
      <path className="pl-k" d={POSTS} />
      {/* The gate of the courtyard, a curtain of coloured yarn. */}
      <Shape d="M744,350H760V470H744Z" tone="b" off={2} />
      <path className="pl-f" d="M744,366H760M744,382H760M744,398H760M744,414H760M744,430H760M744,446H760" />

      {/* The altar of burnt offering, with a horn at each corner. */}
      <Shape d="M590,380H650V440H590Z" tone="c" off={3} />
      <path fill={h.h2} d="M590,380H650V440H590Z" />
      <path className="pl-o" d="M604,394H636V426H604Z" />
      <path className="pl-k" d="M586,376h10v10h-10ZM644,376h10v10h-10ZM586,434h10v10h-10ZM644,434h10v10h-10Z" />

      {/* The bronze basin. */}
      <Shape d="M490,410a20,20 0 1,0 40,0a20,20 0 1,0 -40,0Z" tone="b" off={2} />
      <path className="pl-f" d="M498,404c8,-4 16,4 24,0M498,414c8,-4 16,4 24,0" />

      {/* The tent: the Most Holy Place, the veil, the Holy Place. */}
      <Shape d="M70,316H450V506H70Z" tone="c" off={5} />
      <path className="pl-o" d="M80,326H440V496H80Z" />
      <path className="pl-f" d="M86,332H434V490H86Z" />
      {/* The curtain at the entrance to the tent. */}
      <path className="pl-k" d="M438,356h6v110h-6Z" />
      {/* The veil, worked with cherubim. */}
      <Shape d="M196,326H206V496H196Z" tone="b" off={2} />
      <path className="pl-f" d="M196,350h10M196,380h10M196,410h10M196,440h10M196,470h10" />

      {/* The ark, the mercy seat and the two cherubim. */}
      <Shape d="M104,396H160V432H104Z" tone="c" off={2} />
      <path fill={h.h3} d="M104,396H160V432H104Z" />
      <path className="pl-l" d="M96,404H168M96,424H168" />
      <path
        className="pl-l"
        d="M106,396C104,376 116,366 130,372M158,396C160,376 148,366 134,372M110,388c4,-8 10,-12 16,-12M154,388c-4,-8 -10,-12 -16,-12"
      />

      {/* The altar of incense before the veil, with its smoke. */}
      <Shape d="M260,402H284V426H260Z" tone="c" off={2} />
      <path fill={h.h2} d="M260,402H284V426H260Z" />
      <path className="pl-f" d="M268,398c-6,-8 4,-12 -2,-20M276,398c6,-8 -4,-12 2,-20" />

      {/* The table, with the bread in two rows (north side). */}
      <Shape d="M326,340H394V368H326Z" tone="c" off={2} />
      <path
        className="pl-o"
        d="M332,346h8v7h-8ZM342,346h8v7h-8ZM352,346h8v7h-8ZM362,346h8v7h-8ZM372,346h8v7h-8ZM382,346h8v7h-8ZM332,356h8v7h-8ZM342,356h8v7h-8ZM352,356h8v7h-8ZM362,356h8v7h-8ZM372,356h8v7h-8ZM382,356h8v7h-8Z"
      />

      {/* The lampstand (south side): one shaft, six branches, seven lamps. */}
      <path
        className="pl-l"
        d="M360,486V444M318,444c0,26 84,26 84,0M332,444c0,16 56,16 56,0M346,444c0,8 28,8 28,0M346,486H374"
      />
      <path
        className="pl-m"
        d="M318,436c-5,-6 0,-12 0,-14c0,2 5,8 0,14ZM332,436c-5,-6 0,-12 0,-14c0,2 5,8 0,14ZM346,436c-5,-6 0,-12 0,-14c0,2 5,8 0,14ZM360,436c-5,-6 0,-12 0,-14c0,2 5,8 0,14ZM374,436c-5,-6 0,-12 0,-14c0,2 5,8 0,14ZM388,436c-5,-6 0,-12 0,-14c0,2 5,8 0,14ZM402,436c-5,-6 0,-12 0,-14c0,2 5,8 0,14Z"
      />
      <path
        className="pl-f"
        d="M318,436c-5,-6 0,-12 0,-14c0,2 5,8 0,14ZM332,436c-5,-6 0,-12 0,-14c0,2 5,8 0,14ZM346,436c-5,-6 0,-12 0,-14c0,2 5,8 0,14ZM360,436c-5,-6 0,-12 0,-14c0,2 5,8 0,14ZM374,436c-5,-6 0,-12 0,-14c0,2 5,8 0,14ZM388,436c-5,-6 0,-12 0,-14c0,2 5,8 0,14ZM402,436c-5,-6 0,-12 0,-14c0,2 5,8 0,14Z"
      />
    </>
  ),
};

export default scene;
