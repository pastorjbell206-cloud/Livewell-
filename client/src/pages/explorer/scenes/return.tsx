/**
 * The Return and the Waiting (Ezra, Nehemiah, Haggai to Malachi), in the
 * engraved hand. Jerusalem being rebuilt. In front, the new wall going up
 * in courses, still unfinished on the right; two builders: one carries a
 * basket of stones on his shoulder with one hand and holds a spear in the
 * other (“The laborers who carried materials worked with one hand and held
 * a weapon with the other”, Nehemiah 4:17), and one lays a stone with his
 * sword strapped at his side (4:18). On the hill behind, a small, plain
 * temple, smaller than Solomon's (Ezra 3:12; Haggai 2:3), with smoke going
 * up from its altar (Ezra 6:17). On the left, a house by the wall, and in
 * its window one lamp still burning. One mustard mark: the lamp's flame,
 * home again and still waiting.
 */
import type { Drawing } from "@/components/art/PlateSvg";
import { Shape } from "../art";

/** The courses of the new wall: long joints and staggered short ones. */
const COURSES = (() => {
  const d: string[] = [];
  // The wall's top steps down to the right, where it is unfinished.
  const parts: [number, number, number][] = [
    [0, 470, 318],
    [470, 590, 346],
    [590, 800, 378],
  ];
  for (let y = 340; y < 480; y += 24) {
    const row = (y - 340) / 24;
    for (const [a, b, top] of parts) {
      if (y <= top) continue;
      d.push(`M${a},${y}H${b}`);
      for (let x = row % 2 ? 26 : 0; x < 800; x += 52)
        if (x > a && x < b && y - 24 >= top) d.push(`M${x},${y - 24}V${y}`);
    }
  }
  return d.join("");
})();

/** A builder standing, seen from the front, no face. Body tone, arms drawn by the caller. */
function builder(x: number, y: number, tone: "b" | "c" | "g") {
  return (
    <>
      <path
        className="pl-l"
        d={`M${x - 9},${y + 98}v28M${x + 9},${y + 98}v28M${x - 15},${y + 126}h10M${x + 5},${y + 126}h10`}
      />
      <Shape
        d={`M${x - 16},${y + 18}H${x + 16}L${x + 26},${y + 100}H${x - 26}Z`}
        tone={tone}
        off={3}
      />
      <path className="pl-l" d={`M${x - 20},${y + 52}H${x + 20}`} />
      <path
        className="pl-o"
        d={`M${x - 14},${y}a14,14 0 1,0 28,0a14,14 0 1,0 -28,0Z`}
      />
      <path
        className="pl-l"
        d={`M${x - 14},${y}a14,14 0 1,0 28,0a14,14 0 1,0 -28,0Z`}
      />
    </>
  );
}

const scene: Drawing = {
  w: 800,
  h: 600,
  label:
    "Builders rebuilding Jerusalem's wall, one carrying stones and holding a spear, one laying a stone with a sword at his side; a small temple on the hill behind; and a lamp burning in the window of a house by the wall.",
  draw: h => (
    <>
      {/* The sky. */}
      <path fill={h.hs} d="M0,0H800V320H0Z" />

      {/* Far hills, and Jerusalem's hill with the small temple on it. */}
      <Shape
        d="M0,320V250C70,232 150,236 230,256C280,240 320,236 360,246V320Z"
        tone="g"
        off={3}
      />
      <Shape
        d="M300,330C340,280 400,226 470,206C520,192 600,190 650,200C710,212 760,236 800,256V400H300Z"
        tone="g"
        off={4}
      />
      <path
        fill={h.h1}
        d="M650,200C710,212 760,236 800,256V400H690C676,320 664,250 650,200Z"
      />

      {/* The temple: plain cut stone, a door, a low court wall, smoke from the altar. */}
      <Shape d="M520,206V142H624V206Z" tone="c" off={3} />
      <path fill={h.h2} d="M596,206V142H624V206Z" />
      <path className="pl-l" d="M512,142H632M516,134H628V142" />
      <path
        className="pl-f"
        d="M520,158H624M520,174H624M520,190H624M546,142V158M572,142V158M534,158V174M560,158V174M586,158V174M546,174V190M610,174V190"
      />
      <path className="pl-k" d="M560,206V178h20v28Z" />
      <path className="pl-o" d="M470,214V204H674V214Z" />
      <path className="pl-l" d="M470,214V204H674V214Z" />
      <Shape d="M494,204v-14h18v14Z" tone="b" off={1.5} />
      <path
        className="pl-f"
        d="M503,188c-6,-10 6,-16 0,-26s6,-16 0,-26M499,186c-4,-8 2,-12 -2,-20"
      />
      {/* Houses on the slope. */}
      <Shape
        d="M404,262v-22h26v22ZM436,258v-18h22v18ZM680,240v-20h26v20ZM712,246v-16h22v16Z"
        tone="c"
        off={2}
      />
      <path className="pl-k" d="M413,256h7v6h-7ZM690,234h6v6h-6Z" />

      {/* The ground in front of the wall. */}
      <path className="pl-o" d="M0,480H800V600H0Z" />
      <path className="pl-l" d="M0,480H800" />
      <path
        className="pl-f"
        d="M40,540c40,-6 90,-6 140,0M420,560c50,-6 120,-6 170,0M640,520c30,-4 70,-4 100,0"
      />

      {/* The new wall: finished on the left, still going up on the right. */}
      <path className="pl-o" d="M0,318H470V346H590V378H800V480H0Z" />
      <path fill={h.hh} d="M0,318H470V346H590V378H800V480H0Z" />
      <path className="pl-f" d={COURSES} />
      <path className="pl-l" d="M0,318H470V346H590V378H800M0,480H800" />
      {/* Loose stones waiting on the ground, and a basket. */}
      <Shape
        d="M660,500v-20h34v20ZM700,500v-16h28v16ZM676,480v-16h30v16Z"
        tone="b"
        off={1.5}
      />
      <Shape d="M620,500l-6,-26h40l-6,26Z" tone="c" off={1.5} />
      <path className="pl-f" d="M616,484h36M618,492h32" />

      {/* The house by the wall, with the lamp burning in its window. */}
      <Shape d="M24,480V196H206V480Z" tone="c" off={4} />
      <path fill={h.h1} d="M170,480V196H206V480Z" />
      <path className="pl-l" d="M14,196H216M20,186H210V196" />
      <path className="pl-k" d="M78,480V420a18,18 0 0 1 36,0V480Z" />
      {/* The window: an arch, open, the lamp on its sill with rays of light. */}
      <path className="pl-o" d="M50,350V260a46,46 0 0 1 92,0V350Z" />
      <path className="pl-l" d="M50,350V260a46,46 0 0 1 92,0V350Z" />
      <path className="pl-o" d="M40,350H152V362H40Z" />
      <path className="pl-l" d="M40,350H152V362H40Z" />
      <path
        className="pl-f"
        d="M96,236V220M68,256l-10,-8M124,256l10,-8M64,282H52M128,282h12M70,306l-10,6M122,306l10,6"
      />
      {/* The clay lamp: a bowl with a spout, and its flame. */}
      <g transform="translate(96 350) scale(1.15) translate(-96 -350)">
        <Shape
          d="M60,350c0,-18 20,-26 40,-24c14,0 24,6 32,2l-6,12c-4,6 -10,10 -26,10Z"
          tone="c"
          off={2}
        />
        <path className="pl-k" d="M88,334a6,3 0 1,0 12,0a6,3 0 1,0 -12,0Z" />
        <path className="pl-l" d="M62,342c-10,-2 -12,-12 -4,-16" />
        <path
          className="pl-m"
          d="M128,326C114,316 112,298 124,276C126,292 140,300 134,318C133,322 131,325 128,326Z"
        />
        <path
          className="pl-l"
          d="M128,326C114,316 112,298 124,276C126,292 140,300 134,318C133,322 131,325 128,326Z"
        />
      </g>

      {/* The builder with the basket on his shoulder and the spear in his other hand. */}
      {builder(300, 362, "b")}
      <path className="pl-l" d="M288,392C278,388 272,380 270,372" />
      <Shape d="M248,376l4,-28h36l4,28Z" tone="c" off={2} />
      <path className="pl-f" d="M251,358h38M250,366h40" />
      <Shape d="M256,348v-12h14v12ZM272,348v-14h14v14Z" tone="b" off={1} />
      <path className="pl-l" d="M313,392C326,404 334,416 338,428" />
      <path className="pl-l" d="M340,500V300" style={{ strokeWidth: 3.5 }} />
      <path className="pl-o" d="M340,272l8,28h-16Z" />
      <path className="pl-l" d="M340,272l8,28h-16Z" />

      {/* The builder laying a stone, his sword at his side. */}
      {builder(540, 362, "g")}
      <path
        className="pl-l"
        d="M552,390C566,384 582,378 600,370M548,402C566,396 584,388 600,380"
      />
      <Shape d="M598,378v-26h44v26Z" tone="b" off={2} />
      <path className="pl-l" d="M516,414H564" />
      <path className="pl-o" d="M528,420l-16,48l7,3l16,-48Z" />
      <path className="pl-c" d="M528,420l-16,48l7,3l16,-48Z" />
      <path className="pl-l" d="M528,420l-16,48l7,3l16,-48Z" />
      <path className="pl-l" d="M522,416l18,6M531,419l3,-9" />
    </>
  ),
};

export default scene;
