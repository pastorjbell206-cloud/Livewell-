/**
 * The Kingdom (1 Samuel to 1 Kings 11), in the engraved hand. Behind:
 * Jerusalem on its hill, David's city (2 Samuel 5:7), walled, and at the
 * top the temple going up (1 Kings 6): the house of cut stone with its two
 * bronze pillars before the porch (1 Kings 7:21), one side still unfinished,
 * a ladder against it, cut stones and cedar beams waiting at its foot
 * (1 Kings 5:6; 6:7). In front, on a grassy slope with sheep: the shepherd's
 * staff (1 Samuel 16:11) standing in the ground with a crown hung on its
 * crook, and a harp leaning on a rock (1 Samuel 16:23): the shepherd who
 * became king. One mustard mark: the crown.
 */
import type { Drawing } from "@/components/art/PlateSvg";
import { Shape } from "../art";

/** A sheep grazing: a woolly body, its dark head down to the grass. */
function sheep(x: number, y: number, hatch: string) {
  const body = `M${x - 34},${y}c-6,-14 6,-24 16,-20c4,-10 22,-10 26,0c8,-8 24,-4 24,8c10,2 12,16 4,22c2,10 -10,16 -20,12c-8,6 -22,6 -28,0c-10,4 -24,-2 -22,-12c-8,-2 -8,-8 0,-10Z`;
  return (
    <g key={`${x},${y}`}>
      <path
        className="pl-l"
        d={`M${x - 20},${y + 18}v18M${x - 6},${y + 20}v16M${x + 12},${y + 20}v16M${x + 24},${y + 16}v18`}
      />
      <Shape d={body} off={2} />
      <path fill={hatch} d={`M${x - 30},${y + 8}c10,8 40,12 62,2c2,8 -8,14 -18,12c-8,6 -22,6 -28,0c-10,4 -20,-2 -16,-14Z`} />
      <path
        className="pl-k"
        d={`M${x - 34},${y - 2}c-10,0 -16,8 -18,22c4,4 10,2 12,-4c2,-8 6,-14 8,-16Z`}
      />
    </g>
  );
}

/** The wall round the city: a line of crenels along the hill. */
const CRENELS = (() => {
  const d: string[] = [];
  for (let x = 372; x < 780; x += 18) d.push(`M${x},236v-8h9v8`);
  return d.join("");
})();

const scene: Drawing = {
  w: 800,
  h: 600,
  label:
    "Jerusalem on its hill with the temple being built at the top, and in front a shepherd's staff with a crown hung on it and a harp leaning on a rock.",
  draw: h => (
    <>
      {/* The sky. */}
      <path fill={h.hs} d="M0,0H800V330H0Z" />

      {/* Far hills. */}
      <Shape
        d="M0,330V262C80,236 170,240 250,262C300,248 330,250 360,258V330Z"
        tone="g"
        off={3}
      />
      <path className="pl-f" d="M40,276c40,-10 90,-12 140,-2M150,296c40,-8 80,-8 120,0" />

      {/* Jerusalem's hill. */}
      <Shape
        d="M300,330C340,300 380,262 420,240C460,214 500,190 540,178H700C730,186 770,208 800,226V330Z"
        tone="g"
        off={4}
      />
      <path fill={h.h1} d="M640,178H700C730,186 770,208 800,226V330H660C650,280 646,220 640,178Z" />

      {/* The city wall, with a tower at each end and a gate. */}
      <path className="pl-o" d="M372,236H780V262H372Z" />
      <path className="pl-l" d="M372,262H780M372,236H780" />
      <path className="pl-l" d={CRENELS} />
      <Shape d="M356,262V218h22v44Z" tone="c" off={2} />
      <Shape d="M770,262V214h22v48Z" tone="c" off={2} />
      <path className="pl-k" d="M512,262v-14a8,8 0 0 1 16,0v14Z" />
      <path className="pl-f" d="M400,249h20M444,249h20M560,249h20M604,249h20M690,249h20M730,249h20" />

      {/* Houses inside the wall. */}
      <Shape d="M420,236v-18h26v18ZM452,236v-24h22v24ZM700,236v-20h24v20ZM728,236v-14h22v14Z" tone="c" off={2} />
      <path className="pl-k" d="M430,230h6v6h-6ZM460,226h6v10h-6ZM708,228h6v8h-6Z" />

      {/* The temple going up: cut stone, the two pillars, one side unfinished. */}
      <g transform="translate(614 186) scale(1.3) translate(-614 -186)">
      <path className="pl-o" d="M528,182H700V190H528Z" />
      <path className="pl-l" d="M528,182H700V190H528Z" />
      <Shape
        d="M556,182V92H612V104H628V118H644V132H660V182Z"
        tone="c"
        off={3}
      />
      <path fill={h.h2} d="M628,182V118H644V132H660V182Z" />
      <path
        className="pl-f"
        d="M556,106H612M556,120H628M556,134H644M556,148H660M556,162H660M572,92V106M594,92V106M566,106V120M590,106V120M616,106V120M578,120V134M604,120V134M628,120V134M566,134V148M592,134V148M620,134V148M646,134V148M580,148V162M610,148V162M640,148V162M568,162V182M600,162V182M632,162V182"
      />
      {/* The porch door and the two pillars before it. */}
      <path className="pl-k" d="M576,182V150h20v32Z" />
      <path className="pl-o" d="M562,182V140h6v42ZM604,182V140h6v42Z" />
      <path className="pl-l" d="M562,182V140h6v42ZM604,182V140h6v42Z" />
      <path className="pl-l" d="M558,140h14M600,140h14" />
      <path className="pl-o" d="M559,140a6,5 0 0 1 12,0ZM601,140a6,5 0 0 1 12,0Z" />
      <path className="pl-l" d="M559,140a6,5 0 0 1 12,0ZM601,140a6,5 0 0 1 12,0Z" />
      {/* A ladder against the unfinished side. */}
      <path className="pl-l" d="M664,182L644,112M680,182L660,112" />
      <path className="pl-f" d="M648,124h15M651,136h15M654,148h15M658,160h15M661,172h15" />
      {/* Cut stones and cedar beams waiting at its foot. */}
      <Shape d="M520,182v-10h16v10ZM508,182v-8h12v8Z" tone="b" off={1.5} />
      <Shape d="M676,182v-7h52v7ZM680,175v-7h52v7Z" tone="c" off={1.5} />
      <path className="pl-f" d="M690,182v-7M704,175v-7M716,182v-7" />
      </g>

      {/* The road up to the city gate. */}
      <path className="pl-o" d="M0,330H800V600H0Z" />
      <path className="pl-l" d="M0,330H300M780,330H800" />
      <path
        className="pl-f"
        d="M520,262C500,300 470,320 430,340C390,360 380,380 400,420C420,470 470,520 560,600M532,262C520,300 500,326 470,346C440,366 430,390 448,424C470,470 530,530 620,600"
      />

      {/* The grassy slope in front. */}
      <path className="pl-l" d="M0,392C90,372 200,370 300,384C380,396 430,420 460,450" />
      <path
        className="pl-f"
        d="M30,410c30,-6 70,-8 110,-4M300,404c40,6 80,20 110,40M40,430l4,-10l4,10M150,412l4,-10l4,10M370,430l4,-10l4,10M200,470l4,-10l4,10M60,580l4,-10l4,10M330,590l4,-10l4,10M560,420l4,-10l4,10M760,420l4,-10l4,10M740,560l4,-10l4,10M600,500l4,-10l4,10"
      />

      {/* Sheep on the slope. */}
      {sheep(320, 474, h.h1)}
      {sheep(690, 470, h.h1)}
      {sheep(430, 544, h.h1)}

      {/* A rock, and the harp leaning on it. */}
      <Shape
        d="M40,560C30,520 50,480 90,470C130,462 170,480 176,520C180,548 170,566 150,572H50Z"
        tone="b"
        off={4}
      />
      <path fill={h.h1} d="M120,466C150,470 172,490 176,520C180,548 170,566 150,572H120Z" />
      <g transform="translate(110 560) scale(1.25) translate(-110 -560) rotate(-14 110 470)">
        <Shape d="M70,560H138L132,512H76Z" tone="c" off={2} />
        <path className="pl-l" d="M80,512C66,480 56,450 66,404M128,512C142,480 156,440 148,394" />
        <path className="pl-l" d="M56,414L160,396" />
        <path className="pl-f" d="M88,526L80,410M100,526L96,407M112,526L112,404M122,526L128,402M132,526L142,400" />
        <path className="pl-l" d="M82,526H128" />
      </g>

      {/* The shepherd's staff, standing in the ground, the crown hung on its crook. */}
      <path className="pl-l" d="M238,580V250c0,-34 48,-34 48,0v14" />
      <path className="pl-f" d="M226,580h24" />
      <g transform="translate(286 300) scale(1.45) translate(-286 -300)">
      <path
        className="pl-m"
        d="M258,334L250,284L270,302L286,272L302,302L322,284L314,334Z"
      />
      <path
        className="pl-l"
        d="M258,334L250,284L270,302L286,272L302,302L322,284L314,334Z"
      />
      <path className="pl-o" d="M256,334H316V350H256Z" />
      <path className="pl-l" d="M256,334H316V350H256Z" />
      <path className="pl-k" d="M282,342a4,4 0 1,0 8,0a4,4 0 1,0 -8,0ZM264,340h6v4h-6ZM302,340h6v4h-6Z" />
      </g>
    </>
  ),
};

export default scene;
