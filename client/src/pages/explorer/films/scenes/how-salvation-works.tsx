/**
 * "How salvation works": one land, broken in two, and mended from God's side.
 *
 * The picture is a land with God's side on the right, open to a light that
 * comes in from beyond the top of the picture, and our side on the left. The
 * motion carries the gospel and guards it at three points:
 *
 * - The gap is crossed only from God's side. People pile up blocks to reach
 *   across and fall short (frame 2); no plank or bridge is laid for anyone to
 *   walk over by their own effort. At the cross the land itself is joined
 *   again (the left side moves back and the seam is drawn), which is God's act.
 * - The Father is never pictured, and never as angry: the one gold line comes
 *   from the light and carries the Son to our side (frame 3: the Father sends
 *   the Son in love, John 3:16; Romans 5:8). There is no storm, fire or
 *   shadow over the cross.
 * - Faith is not a climb. In frame 6 the person only turns, with open hands,
 *   and the gold line comes all the way down to where they stand.
 *
 * The one mustard mark of each frame: the line from the light (0 to 3, and
 * 6), the seam where the break is mended (4), the light in the open tomb (5),
 * the small flame of the Spirit (7), the light in the city's gate (8).
 *
 *   0  Made for God: one land; a gold line from the light to the people.   Genesis 1:27
 *   1  We turned away: the land cracks; our side slides away and down.     Romans 3:23; Isaiah 59:2
 *   2  We cannot mend it: a pile of blocks leans out and falls short.       Ephesians 2:8-9
 *   3  God comes to us: the line crosses the gap; the Son stands among us.  John 3:16; John 1:14
 *   4  The cross: the land comes back together; the seam is drawn in gold.  1 Corinthians 15:3; 1 Peter 3:18
 *   5  The empty tomb: light in the open doorway.                           Romans 4:25
 *   6  Trusting him: one person turns, hands open; the line rests on them.  Mark 1:15; Ephesians 2:8
 *   7  New life: a lit house, others with them, a flame, a young tree.      Romans 8:15; 2 Corinthians 5:17
 *   8  The life to come: the city gate open, the river, people walking in.  Revelation 21:3-4
 */
import { Shape } from "../../art";
import { Draw, Fade, Travel, type FilmDrawing } from "../motion";
import { Flame, Standing } from "./figures";

/** The crack: the edge both pieces of the land share. */
const CRACK = "L418,330L440,372L422,420L436,500";
const LEFT_LAND = `M0,290H430${CRACK}H0Z`;
const RIGHT_LAND = `M430,290H800V500H436L422,420L440,372L418,330Z`;
const SEAM = `M430,290${CRACK}`;

/** Where our side of the land stands (poster first, then each frame). */
const APART: [number, number] = [-96, 24];
const PIECE: [number, number][] = [
  APART,
  [0, 0],
  APART,
  APART,
  APART,
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];

/** The people on our side (head x, tone). */
const PEOPLE: [number, "b" | "g" | "c"][] = [
  [150, "b"],
  [204, "g"],
  [258, "c"],
];

/** The blocks people pile up to reach across (in our side's own place). */
const BLOCKS: [number, number][] = [
  [330, 262],
  [354, 234],
  [378, 206],
  [402, 178],
];

/** A person with open hands, raised a little: receiving. */
function Receiving({
  x,
  y,
  tone,
}: {
  x: number;
  y: number;
  tone: "b" | "g" | "c";
}) {
  return (
    <g>
      <path
        className="pl-l"
        d={`M${x - 9},${y + 24}L${x - 24},${y + 8}M${x + 9},${y + 24}L${x + 24},${y + 8}`}
      />
      <Standing x={x} y={y} tone={tone} />
    </g>
  );
}

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => {
    const k = frame + 1;
    return (
      <>
        <path fill={h.hs} d="M0,0H800V500H0Z" />

        {/* God's side: the light, from beyond the top of the picture. */}
        <path
          className="pl-paper"
          d="M470,0H800V290H560C600,220 520,110 470,0Z"
        />
        <path
          className="pl-f"
          d="M560,0L610,120M640,0L660,150M720,0L716,170M800,40L760,180"
        />

        {/* The gap under the land: dark, and seen only when our side moves away. */}
        <path fill={h.h3} d="M280,290H460V500H280Z" />
        <path fill={h.hh} d="M280,400C330,384 400,396 460,384V500H280Z" />
        <path fill={h.h2} d="M280,440C330,428 400,436 460,428V500H280Z" />
        <path
          className="pl-f"
          d="M300,330c40,10 80,-6 140,6M300,372c50,8 90,-6 150,4"
        />

        {/* God's side of the land. */}
        <Shape d={RIGHT_LAND} tone="g" />
        <path fill={h.h2} d="M640,290H800V500H640Z" />

        {/* 0: the garden's tree on God's side, near where the land is one. */}
        <Fade frame={frame} on={0} off={1}>
          <Shape d="M478,290V256h10v34Z" tone="c" off={1.5} />
          <Shape d="M452,236a31,26 0 1,0 62,0a31,26 0 1,0 -62,0Z" tone="g" />
          <path fill={h.h2} d="M483,210a31,26 0 0 1 0,52Z" />
        </Fade>

        {/* 8: the city, its gate open on God's side, the river and the road. */}
        <Fade frame={frame} on={8} from="up">
          <Shape d="M548,290V176H584V156H748V176H784V290Z" tone="b" />
          <path fill={h.h2} d="M666,156H748V176H784V290H666Z" />
          <path className="pl-l" d="M548,212H784" />
          <Shape d="M650,290H690L770,500H570Z" tone="b" off={3} />
          <path
            className="pl-f"
            d="M640,340c14,-4 28,4 40,0M612,420c22,-6 44,6 66,0s30,4 44,0"
          />
          <path
            className="pl-f"
            d="M0,320C150,308 300,330 470,300S600,290 640,292"
          />
          <Standing x={150} y={244} tone="c" s={0.8} />
          <Standing x={250} y={240} tone="g" s={0.78} />
          <Standing x={350} y={236} tone="b" s={0.74} />
          <path
            className="pl-f"
            d="M600,180L560,140M720,180L760,140M666,150V112"
          />
        </Fade>
        <Fade frame={frame} on={8}>
          <path className="pl-m" d="M646,290V232a24,24 0 0 1 48,0V290Z" />
          <path className="pl-l" d="M646,290V232a24,24 0 0 1 48,0V290Z" />
        </Fade>

        {/* Our side of the land, with the people on it: apart, then joined. */}
        <Travel frame={k} at={PIECE}>
          <Shape d={LEFT_LAND} tone="g" />
          <Fade frame={frame} on={1} off={4}>
            <path fill={h.h1} d={LEFT_LAND} />
          </Fade>
          <Fade frame={frame} on={-1} off={5}>
            {PEOPLE.map(([x, t]) => (
              <Standing key={x} x={x} y={228} tone={t} />
            ))}
          </Fade>
          {/* 2: the blocks piled up to reach across, falling short. */}
          {BLOCKS.map(([x, y], n) => (
            <Fade
              key={x}
              frame={frame}
              on={2}
              off={3}
              from="down"
              delay={200 + n * 260}
            >
              <Shape d={`M${x},${y}h46v28h-46Z`} tone="c" off={1.5} />
            </Fade>
          ))}
          {/* 3: the Son, come to our side. */}
          <Fade frame={frame} on={3} off={4} from="down" delay={1500}>
            <Standing x={330} y={216} tone="c" s={1.2} />
          </Fade>
        </Travel>

        {/* 2: one block falls into the gap. */}
        <Fade frame={frame} on={2} off={3} from="down" delay={1400}>
          <g transform="rotate(24 380 390)">
            <Shape d="M357,376h46v28h-46Z" tone="c" off={1.5} />
          </g>
        </Fade>

        {/* 4 on: the cross, empty, on a small hill at the edge where the break was. */}
        <Fade frame={frame} on={4} off={8} from="up">
          <Shape
            d="M318,290C336,250 364,236 384,236C404,236 416,256 424,290Z"
            tone="g"
            off={2}
          />
          <path className="pl-k" d="M367,240V160h8v80ZM350,182H392v7H350Z" />
        </Fade>
        <Draw
          frame={frame}
          on={4}
          off={5}
          className="fp-gold"
          delay={900}
          d={SEAM}
        />
        <Fade frame={frame} on={5}>
          <path className="pl-l" d={SEAM} />
        </Fade>

        {/* 5: the tomb in the rock beside the cross, its stone rolled away. */}
        <Fade frame={frame} on={5} off={7} from="up">
          <Shape
            d="M214,290V240C226,212 270,204 300,214C312,220 318,240 318,290Z"
            tone="b"
          />
          <path fill={h.h1} d="M290,212C306,218 318,240 318,290H292Z" />
          <Shape d="M196,290a20,20 0 1,1 40,0Z" tone="b" off={1.5} />
        </Fade>
        <Fade frame={frame} on={5} off={6} delay={700}>
          <path className="pl-m" d="M248,290V258a14,14 0 0 1 28,0V290Z" />
          <path className="pl-l" d="M248,290V258a14,14 0 0 1 28,0V290Z" />
          <path className="pl-f" d="M262,232V218M244,240l-8,-8M280,240l8,-8" />
        </Fade>
        <Fade frame={frame} on={6} off={7}>
          <path className="pl-k" d="M248,290V258a14,14 0 0 1 28,0V290Z" />
        </Fade>

        {/* 6: one person turns toward the light, hands open. */}
        <Fade frame={frame} on={6} off={7} from="grow" delay={200}>
          <Receiving x={150} y={228} tone="b" />
        </Fade>

        {/* 7: new life: a lit house with its door open, others with them, a young tree. */}
        <Fade frame={frame} on={7} off={8} from="up">
          <Shape d="M24,290V206L104,160L184,206V290Z" tone="c" />
          <path fill={h.h2} d="M104,160L184,206V290H140V206Z" />
          <path className="pl-paper" d="M88,290V236h32v54Z" />
          <path className="pl-l" d="M88,290V236h32v54Z" />
          <path className="pl-l" d="M120,236l16,8v52" />
          <Receiving x={196} y={228} tone="b" />
          <Standing x={240} y={232} tone="g" s={0.95} />
          <Standing x={280} y={238} tone="c" s={0.85} />
          <Standing x={60} y={248} tone="g" s={0.68} />
        </Fade>
        <Fade frame={frame} on={7} from="grow" delay={900}>
          <path
            className="pl-l"
            d="M444,290V250M444,268l-12,-10M444,258l12,-10"
          />
          <Shape
            d="M426,238a18,15 0 1,0 36,0a18,15 0 1,0 -36,0Z"
            tone="g"
            off={1.5}
          />
        </Fade>
        <Fade frame={frame} on={7} off={8} delay={1300}>
          <Flame x={196} y={196} s={0.9} gold />
        </Fade>

        {/* The gold line from the light: to the people (0); stopped at the gap (1, 2, poster);
            across to our side, where the Son stands (3); down to the one who turns (6). */}
        <Draw
          frame={frame}
          on={0}
          off={1}
          className="fp-gold"
          delay={600}
          d="M792,24C640,60 420,100 320,150S236,250 232,288"
        />
        <Fade frame={frame} on={-1} off={0}>
          <path
            className="fp-gold"
            d="M792,24C690,52 560,100 470,180S446,232 446,246"
          />
        </Fade>
        <Draw
          frame={frame}
          on={1}
          off={3}
          className="fp-gold"
          delay={900}
          d="M792,24C690,52 560,100 470,180S446,232 446,246"
        />
        <Draw
          frame={frame}
          on={3}
          off={4}
          className="fp-gold"
          delay={300}
          d="M792,24C660,52 480,90 380,150S268,270 266,312"
        />
        <Draw
          frame={frame}
          on={6}
          off={7}
          className="fp-gold"
          delay={800}
          d="M792,24C640,60 420,100 300,150S182,250 180,288"
        />
      </>
    );
  },
};

export default film;
