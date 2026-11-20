/**
 * Jesus Comes (the four Gospels up to the last week), in the engraved hand:
 * one picture of the Sea of Galilee that gathers things Mark tells there.
 * Jesus sits in a boat a little off the shore and teaches the crowd on the
 * beach (Mark 4:1-2); on the slope above, the farmer of his story sows his
 * seed, birds on the path (4:3-4). On the right, Capernaum (2:1): a house
 * with an opening made in its roof (2:4), and on the path the man who was
 * lowered through it, walking home with his mat on his shoulder (2:11-12);
 * by the water, the tax booth where Levi sat (2:14). Out on the lake, the
 * wind is rising (4:37). The teacher is drawn as the kit draws every
 * figure, with no face. One mustard mark: the sun rising over the far
 * hills, “a light has dawned” over Galilee (Matthew 4:15-16).
 */
import type { Drawing } from "@/components/art/PlateSvg";
import { Shape } from "../art";

type Tone = "b" | "g" | "c";

/** A figure sitting on the beach, seen from behind, listening. */
function listener(x: number, y: number, tone: Tone, s = 1) {
  const r = 9 * s;
  return (
    <g key={`${x},${y}`}>
      <path className="pl-o" d={`M${x - r},${y}a${r},${r} 0 1,0 ${2 * r},0a${r},${r} 0 1,0 ${-2 * r},0Z`} />
      <path className="pl-l" d={`M${x - r},${y}a${r},${r} 0 1,0 ${2 * r},0a${r},${r} 0 1,0 ${-2 * r},0Z`} />
      <Shape
        d={`M${x - 20 * s},${y + 40 * s}C${x - 21 * s},${y + 20 * s} ${x - 12 * s},${y + 8 * s} ${x},${y + 8 * s}C${x + 12 * s},${y + 8 * s} ${x + 21 * s},${y + 20 * s} ${x + 20 * s},${y + 40 * s}Z`}
        tone={tone}
        off={2}
      />
    </g>
  );
}

const SEED = (() => {
  const d: string[] = [];
  const pts = [
    [168, 404],
    [178, 414],
    [186, 400],
    [194, 420],
    [202, 408],
    [176, 428],
    [190, 436],
  ];
  for (const [x, y] of pts) d.push(`M${x},${y}h3v3h-3Z`);
  return d.join("");
})();

const scene: Drawing = {
  w: 800,
  h: 600,
  label:
    "The Sea of Galilee: Jesus teaching from a boat to a crowd on the shore, a farmer sowing seed on the slope, a house in Capernaum with an opening in its roof and a man walking home with his mat, a tax booth by the water, and wind rising out on the lake.",
  draw: h => (
    <>
      {/* The sky: the sun rising on the left, the wind's clouds gathering on the right. */}
      <path fill={h.hs} d="M0,0H800V200H0Z" />
      <path
        className="pl-l"
        d="M120,96V70M54,140H28M212,140H186M74,104l-16,-16M166,104l16,-16"
      />
      <path className="pl-m" d="M76,150a44,44 0 0 1 88,0Z" />
      <path className="pl-l" d="M76,150a44,44 0 0 1 88,0" />
      <Shape
        d="M560,128c-14,-2 -20,-20 -6,-30c-4,-22 24,-34 40,-20c10,-22 48,-22 56,2c18,-12 46,0 44,20c22,0 30,24 14,32c4,14 -12,24 -26,18c-10,12 -34,12 -44,0c-14,10 -40,8 -46,-6c-14,6 -32,-4 -32,-16Z"
        tone="b"
        off={4}
      />
      <path fill={h.h2} d="M600,140c10,-14 36,-16 48,-2c12,-10 34,-8 42,4c-10,12 -34,12 -44,0c-14,10 -40,8 -46,-2Z" />
      <path className="pl-f" d="M600,170c20,-6 40,-2 60,-8M640,186c20,-6 50,-4 70,-10" />

      {/* The far shore. */}
      <Shape
        d="M0,206V160C40,146 90,140 140,150C200,132 270,138 330,156C400,140 470,142 540,160C620,150 720,154 800,166V206Z"
        tone="g"
        off={3}
      />
      <path fill={h.h1} d="M540,160C620,150 720,154 800,166V206H540Z" />

      {/* The lake. */}
      <path fill={h.hh} d="M0,206H800V392C640,380 520,372 420,376C300,380 160,390 0,384Z" opacity="0.55" />
      <path className="pl-l" d="M0,206H800" />
      <path
        className="pl-f"
        d="M30,240c20,-6 40,6 60,0s40,6 60,0M240,250c20,-6 40,6 60,0M120,300c20,-6 40,6 60,0s40,6 60,0M470,236c20,-6 40,6 60,0"
      />
      {/* Out on the lake, the wind rising: broken waves. */}
      <path
        className="pl-l"
        d="M600,236l14,-12l10,12l14,-14l10,14l14,-12l10,12l14,-14l12,14M620,270l14,-12l10,12l14,-14l10,14l14,-12l10,12l14,-14l12,14M640,304l14,-12l10,12l14,-14l10,14l14,-12l10,12"
      />
      <path className="pl-f" d="M580,214l40,-10M620,212l50,-12M700,218l50,-14" />

      {/* The boat a little off the shore, and the teacher sitting in it. */}
      <path className="pl-f" d="M352,352c20,-4 40,4 60,0s40,4 60,0" />
      <path className="pl-l" d="M436,330V250" />
      <path className="pl-l" d="M436,256L470,330" />
      <Shape
        d="M330,330H480C476,346 462,358 440,360H366C346,358 334,346 330,330Z"
        tone="c"
        off={3}
      />
      <path className="pl-f" d="M342,342H470" />
      <path className="pl-o" d="M380,276a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z" />
      <path className="pl-l" d="M380,276a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z" />
      <Shape d="M372,330C370,306 378,290 391,290C404,290 412,306 410,330Z" tone="b" off={2} />
      <path className="pl-l" d="M404,300l20,-14" />

      {/* The beach, and the crowd sitting to listen. */}
      <path className="pl-o" d="M0,384C160,390 300,380 420,376C520,372 640,380 800,392V600H0Z" />
      <path className="pl-l" d="M0,384C160,390 300,380 420,376C520,372 640,380 800,392" />
      {listener(268, 398, "c", 0.9)}
      {listener(312, 396, "g", 0.9)}
      {listener(356, 394, "b", 0.9)}
      {listener(450, 394, "c", 0.9)}
      {listener(494, 398, "g", 0.9)}
      {listener(290, 440, "b")}
      {listener(340, 438, "c")}
      {listener(404, 436, "g")}
      {listener(458, 440, "b")}

      {/* The slope above the beach: the farmer of the story, sowing. */}
      <path
        className="pl-f"
        d="M0,460C60,450 120,452 200,470M0,490C60,480 130,484 210,500M0,520C70,510 140,514 220,532M0,550C70,542 150,546 230,562M0,580C70,574 150,578 236,592"
      />
      <path className="pl-o" d="M20,600C60,540 110,500 196,474L214,486C140,510 96,548 70,600Z" />
      <path className="pl-l" d="M20,600C60,540 110,500 196,474M214,486C140,510 96,548 70,600" />
      <path className="pl-f" d="M98,532l8,-8l6,8M118,516l8,-8l6,8" />
      <Shape d="M196,580c4,-12 18,-14 26,-4c6,10 -2,18 -14,18c-8,0 -14,-6 -12,-14Z" tone="b" off={2} />
      <Shape d="M218,548c-4,-14 8,-24 18,-18c6,-10 22,-6 22,6c10,2 10,16 0,18c-10,4 -34,6 -40,-6Z" tone="g" off={2} />
      <path className="pl-f" d="M222,530l-6,-6M236,524l2,-8M250,528l6,-6M262,540l8,-2M214,544l-8,0" />
      <path className="pl-o" d="M128,402a10,10 0 1,0 20,0a10,10 0 1,0 -20,0Z" />
      <path className="pl-l" d="M128,402a10,10 0 1,0 20,0a10,10 0 1,0 -20,0Z" />
      <Shape d="M126,414H150L160,470H118Z" tone="g" off={2} />
      <path className="pl-l" d="M128,470l-10,24M150,470l10,22M148,420l22,-12" />
      <path className="pl-k" d={SEED} />

      {/* Capernaum: a house with an opening made in its roof, its outside stair. */}
      <Shape d="M620,520V452H760V520Z" tone="c" off={3} />
      <path fill={h.h1} d="M720,452H760V520H720Z" />
      <path className="pl-o" d="M612,452L630,436H770L760,452Z" />
      <path className="pl-l" d="M612,452L630,436H770L760,452Z" />
      <path className="pl-k" d="M662,452l8,-12h30l-6,12Z" />
      <path className="pl-o" d="M708,444h14v-6h-14ZM712,438h12v-5h-12Z" />
      <path className="pl-l" d="M708,444h14v-6h-14ZM712,438h12v-5h-12Z" />
      <path className="pl-k" d="M672,520V486a10,10 0 0 1 20,0V520Z" />
      <path className="pl-l" d="M760,520L790,452M772,520L800,456" />
      <path className="pl-f" d="M766,504h12M772,490h12M778,476h12M784,462h10" />

      {/* The man who was lowered through the roof, walking home with his mat. */}
      <path className="pl-o" d="M496,468a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z" />
      <path className="pl-l" d="M496,468a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z" />
      <Shape d="M494,482H520L528,546H488Z" tone="b" off={2} />
      <path className="pl-l" d="M498,546l-10,22M518,546l14,20" />
      <Shape d="M510,494c-6,0 -6,-14 0,-14H568c6,0 6,14 0,14Z" tone="c" off={1.5} />
      <path className="pl-f" d="M526,480v14M542,480v14M556,480v14" />

      {/* The tax booth by the water, where Levi sat. */}
      <g transform="translate(-124 0)">
      <path className="pl-l" d="M690,414V376M760,414V376" />
      <path className="pl-o" d="M682,378L700,366H768L776,378Z" />
      <path className="pl-l" d="M682,378L700,366H768L776,378Z" />
      <path className="pl-f" d="M700,366l-4,12M718,366v12M736,366v12M752,366l4,12" />
      <Shape d="M680,414H770V426H680Z" tone="g" off={2} />
      <path className="pl-k" d="M700,414v-6h12v6ZM716,414v-10h10v10Z" />
      <path className="pl-o" d="M736,396a8,8 0 1,0 16,0a8,8 0 1,0 -16,0Z" />
      <path className="pl-l" d="M736,396a8,8 0 1,0 16,0a8,8 0 1,0 -16,0Z" />
      <path className="pl-l" d="M734,414c0,-8 4,-12 10,-12s10,4 10,12" />
      </g>
    </>
  ),
};

export default scene;
