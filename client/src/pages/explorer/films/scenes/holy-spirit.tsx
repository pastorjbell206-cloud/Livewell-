/**
 * "The Holy Spirit through the Bible": one mark carried through the whole
 * film. The Spirit is never drawn as a person or a face; he is shown the way
 * the Bible's own words picture him, as breath and wind (a drawn line) and as
 * fire. The one mustard mark of every frame is the Spirit's: a small flame
 * that goes from frame to frame, and at the Jordan becomes the dove.
 *
 *   0  The waters: the line hovers over the dark deep.         Genesis 1:2
 *   1  On a few: the line comes down on three people in turn.  Judges 6:34; 1 Samuel 16:13; 2 Peter 1:21
 *   2  The promise: a heart of stone becomes a heart of flesh; the line pours over many.
 *                                                              Ezekiel 36:26-27; Joel 2:28
 *   3  The Jordan: the sky opens and the dove comes down.      Mark 1:10-11
 *   4  Another Advocate: the promise, dotted, waits above the table.  John 14:16-17
 *   5  Pentecost: wind through the house; one flame separates and rests on each.  Acts 2:1-4
 *   6  God's temple: the people themselves stand as its pillars.  Romans 8:9-11; 1 Corinthians 3:16
 *   7  "Come": from the open gate the line runs out toward the reader.  Revelation 22:17
 */
import { Shape } from "../../art";
import { Draw, Fade, Travel, type FilmDrawing } from "../motion";
import { FLAME, Flame, Seated, Standing, ring } from "./figures";

/** Where the Spirit's flame stands, poster first, then each frame. */
const SPARK: [number, number][] = [
  [700, 196],
  [748, 186],
  [400, 268],
  [210, 236],
  [400, 120],
  [690, 92],
  [400, 196],
  [400, 168],
  [400, 452],
];

/** The dove of Mark 1:10, wings open, coming down; drawn round (0, 0). */
const DOVE_BODY =
  "M0,-12C5,-12 7,-5 6,2L2,16L0,24L-2,16L-6,2C-7,-5 -5,-12 0,-12Z";
const DOVE_WINGS =
  "M-5,-3C-20,-16 -38,-15 -50,-6C-37,-3 -22,2 -5,7ZM5,-3C20,-16 38,-15 50,-6C37,-3 22,2 5,7Z";

/** The people Pentecost's flames rest on, in the upper room. */
const ROOM: [number, number, "b" | "g" | "c"][] = [
  [236, 318, "b"],
  [292, 312, "c"],
  [348, 318, "g"],
  [404, 312, "b"],
  [460, 318, "c"],
  [516, 312, "g"],
  [572, 318, "b"],
];

/** The pillars of the temple in frame 6: people standing. */
const PILLARS: [number, "b" | "g" | "c"][] = [
  [212, "g"],
  [274, "c"],
  [336, "b"],
  [400, "g"],
  [464, "c"],
  [526, "b"],
  [588, "g"],
];

/** Many people, of every age, in frame 2. */
const MANY: [number, number, number, "b" | "g" | "c"][] = [
  [470, 318, 0.9, "c"],
  [512, 334, 0.7, "g"],
  [552, 312, 1, "b"],
  [596, 330, 0.75, "c"],
  [636, 314, 0.95, "g"],
  [680, 336, 0.65, "b"],
  [720, 316, 0.9, "c"],
  [760, 330, 0.75, "g"],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => {
    const k = frame + 1;
    return (
      <>
        <path fill={h.hs} d="M0,0H800V500H0Z" />

        {/* Poster: the breath line alone across a quiet page. */}
        <Fade frame={frame} on={-1} off={0}>
          <path
            className="pl-l"
            d="M60,230C160,180 240,270 350,220S540,170 640,214S700,230 700,214"
          />
          <path
            className="pl-f"
            d="M80,252C180,206 254,286 362,240S548,194 650,236"
          />
        </Fade>

        {/* 0. The waters, and darkness over the deep. */}
        <Fade frame={frame} on={0} off={1}>
          <path fill={h.h1} d="M0,0H800V300H0Z" />
          <Shape
            d="M0,300C120,290 220,312 400,300S680,288 800,300V500H0Z"
            tone="b"
          />
          <path
            fill={h.h2}
            d="M0,300C120,290 220,312 400,300S680,288 800,300V500H0Z"
          />
          <path
            className="pl-f"
            d="M30,340c30,-8 60,8 90,0s60,8 90,0M300,370c30,-8 60,8 90,0s60,8 90,0M560,350c30,-8 60,8 90,0s60,8 90,0M120,430c30,-8 60,8 90,0s60,8 90,0M480,450c30,-8 60,8 90,0s60,8 90,0"
          />
        </Fade>
        <Draw
          frame={frame}
          on={0}
          off={1}
          delay={300}
          d="M40,232C140,182 220,272 330,222S520,172 620,216S720,232 748,206"
        />
        <Draw
          frame={frame}
          on={0}
          off={1}
          delay={700}
          className="pl-f"
          d="M60,256C160,212 236,290 344,244S532,198 630,240"
        />

        {/* 1. On particular people, for particular tasks. */}
        <Fade frame={frame} on={1} off={2}>
          <Shape d="M40,500V420C90,388 230,388 280,420V500Z" tone="g" />
          <Shape d="M280,500V410C330,378 470,378 520,410V500Z" tone="g" />
          <Shape d="M520,500V420C570,388 710,388 760,420V500Z" tone="g" />
          <path fill={h.h1} d="M400,410V500H520V410C480,388 440,384 400,388Z" />
          {/* Gideon, blowing the ram's horn. */}
          <Standing x={160} y={330} tone="b" />
          <Shape
            d="M168,334C182,336 194,328 200,314l13,3C209,334 190,346 168,342Z"
            tone="c"
            off={1.5}
          />
          {/* David, the horn of oil over his head. */}
          <Standing x={400} y={322} tone="c" />
          <Shape d="M404,300L428,266l13,9Z" tone="c" off={1.5} />
          <path
            className="pl-k"
            d="M399,306a2.5,3.5 0 1,0 5,0a2.5,3.5 0 1,0 -5,0Z"
          />
          {/* A prophet, with a scroll. */}
          <Standing x={640} y={330} tone="g" />
          <Shape d="M648,354h26v34h-26Z" tone="c" off={1.5} />
          <path
            className="pl-l"
            d="M648,354a4,4 0 0 1 0,8M674,380a4,4 0 0 0 0,8"
          />
        </Fade>
        <Draw
          frame={frame}
          on={1}
          off={2}
          delay={200}
          d="M30,70C90,40 150,90 130,160S170,250 186,290"
        />
        <Draw
          frame={frame}
          on={1}
          off={2}
          delay={1100}
          d="M270,60C330,30 390,80 370,150S410,240 420,266"
        />
        <Draw
          frame={frame}
          on={1}
          off={2}
          delay={2000}
          d="M770,70C710,40 650,90 670,160S630,250 614,290"
        />

        {/* 2. The promise: a new heart, and the Spirit on all people. */}
        <Fade frame={frame} on={2} off={3}>
          <Shape
            d="M210,330C130,270 110,206 150,176C180,154 205,171 210,191C215,171 240,154 270,176C310,206 290,270 210,330Z"
            tone="b"
          />
          <path
            className="pl-l"
            d="M170,200l20,16l-6,22l18,10M240,186l-10,26l14,18l-8,24M150,240l24,4"
          />
        </Fade>
        <Fade frame={frame} on={2} off={3} delay={1500} from="grow">
          <Shape
            d="M210,330C130,270 110,206 150,176C180,154 205,171 210,191C215,171 240,154 270,176C310,206 290,270 210,330Z"
            tone="c"
          />
          <path
            fill={h.h2}
            d="M210,191C215,171 240,154 270,176C310,206 290,270 210,330Z"
          />
        </Fade>
        <Fade frame={frame} on={2} off={3}>
          <path className="pl-l" d="M430,386H790" />
          {MANY.map(([x, , s, t]) => (
            <Standing key={x} x={x} y={384 - 62 * s} s={s} tone={t} />
          ))}
        </Fade>
        <Draw
          frame={frame}
          on={2}
          off={3}
          delay={900}
          d="M430,180C510,130 590,210 670,160S760,140 790,170"
        />
        <Draw
          frame={frame}
          on={2}
          off={3}
          delay={1600}
          className="pl-f"
          d="M486,196c-10,14 6,22 -4,36M566,204c-10,14 6,22 -4,36M646,190c-10,14 6,22 -4,36M726,184c-10,14 6,22 -4,36"
        />

        {/* 3. The Jordan: the sky breaks open and the Spirit comes down like a dove. */}
        <Fade frame={frame} on={3} off={4}>
          <Shape
            d="M0,348V268C140,250 300,262 400,270C520,258 660,248 800,264V348Z"
            tone="g"
          />
          <Standing x={400} y={262} tone="c" s={1.2} />
          <Shape d="M0,430V330C200,322 600,322 800,330V430Z" tone="b" />
          <path fill={h.h2} d="M0,430V330C200,322 600,322 800,330V430Z" />
          <path
            className="pl-f"
            d="M60,360c20,-6 40,6 60,0M200,392c24,-6 48,6 72,0M520,392c24,-6 48,6 72,0M660,356c20,-6 40,6 60,0M330,350c14,-4 28,4 40,0M430,350c14,-4 28,4 40,0"
          />
          <Shape d="M0,500V424C200,410 600,410 800,424V500Z" tone="g" />
        </Fade>
        <Fade frame={frame} on={3} off={4}>
          <Travel
            frame={k}
            at={[
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [-70, 0],
            ]}
          >
            <path
              fill={h.h3}
              d="M0,0H400L384,22L406,48L378,76L398,104L380,128H0Z"
            />
            <path
              className="pl-l"
              d="M400,0L384,22L406,48L378,76L398,104L380,128H0"
            />
          </Travel>
          <Travel
            frame={k}
            at={[
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [70, 0],
            ]}
          >
            <path
              fill={h.h3}
              d="M800,0H400L384,22L406,48L378,76L398,104L380,128H800Z"
            />
            <path
              className="pl-l"
              d="M400,0L384,22L406,48L378,76L398,104L380,128H800"
            />
          </Travel>
        </Fade>
        <Draw
          frame={frame}
          on={3}
          off={4}
          delay={1300}
          className="pl-f"
          d="M352,132L322,188M448,132L478,188M400,134V150"
        />
        <Fade frame={frame} on={3} off={4}>
          <Travel
            frame={k}
            at={[
              [400, 40],
              [400, 40],
              [400, 40],
              [400, 40],
              [400, 200],
            ]}
          >
            <path className="pl-m" d={DOVE_WINGS} />
            <path className="pl-l" d={DOVE_WINGS} />
            <path className="pl-m" d={DOVE_BODY} />
            <path className="pl-l" d={DOVE_BODY} />
          </Travel>
        </Fade>

        {/* 4. Another Advocate: the table, and the promise still to come. */}
        <Fade frame={frame} on={4} off={5}>
          <Shape
            d="M140,420V200C140,120 250,80 400,80C550,80 660,120 660,200V420Z"
            tone="b"
          />
          <path
            fill={h.h1}
            d="M140,420V200C140,120 250,80 400,80C550,80 660,120 660,200V420Z"
          />
          <path className="pl-l" d="M60,420H740" />
          {[262, 318, 374, 430, 486, 542].map((x, n) => (
            <Seated
              key={x}
              x={x}
              y={290}
              tone={(["g", "c", "b"] as const)[n % 3]}
            />
          ))}
          <Standing x={200} y={258} tone="c" s={1.15} />
          <Shape d="M230,330H590V350H230Z" tone="c" />
          <path className="pl-l" d="M250,350V420M570,350V420" />
          <path className="pl-k" d="M392,326c0,-6 16,-6 16,0Z" />
          <path className="pl-c" d="M400,316c3,-4 4,-8 0,-12c-4,4 -3,8 0,12Z" />
        </Fade>
        <Fade frame={frame} on={4} off={5} delay={900}>
          <path
            className="pl-f"
            strokeDasharray="4 7"
            d="M690,110C660,170 560,180 470,220"
          />
          <path className="pl-f" strokeDasharray="2 5" d={ring(690, 92, 26)} />
        </Fade>

        {/* 5. Pentecost: the wind fills the house; one flame separates and rests on each. */}
        <Fade frame={frame} on={5} off={6}>
          <Shape d="M150,470V196L400,120L650,196V470Z" tone="c" />
          <path fill={h.h2} d="M400,120L650,196V470H560V230H400Z" />
          <path className="pl-o" d="M196,232H604V384H196Z" />
          <path fill={h.h1} d="M196,232H604V384H196Z" />
          <path className="pl-l" d="M196,232H604V384H196Z" />
          <path className="pl-l" d="M120,470H680M196,384V470M604,384V470" />
          {ROOM.map(([x, y, t]) => (
            <Seated key={x} x={x} y={y} tone={t} />
          ))}
        </Fade>
        <Draw
          frame={frame}
          on={5}
          off={6}
          delay={200}
          d="M800,96C720,110 680,160 640,200S540,250 470,250"
        />
        <Draw
          frame={frame}
          on={5}
          off={6}
          delay={600}
          className="pl-f"
          d="M800,124C730,140 690,186 650,220S560,268 500,270"
        />
        {ROOM.map(([x, y], n) => (
          <Fade key={x} frame={frame} on={5} off={6} delay={1300 + n * 120}>
            <Travel
              frame={k}
              at={[
                [400, 196],
                [400, 196],
                [400, 196],
                [400, 196],
                [400, 196],
                [400, 196],
                [x, y - 34],
              ]}
            >
              <path className="pl-c" d={FLAME} transform="scale(.8)" />
              <path
                className="pl-l"
                d={FLAME}
                transform="scale(.8)"
                style={{ strokeWidth: 2.8 }}
              />
            </Travel>
          </Fade>
        ))}

        {/* 6. God's temple: the people are its pillars, and the Spirit lives in them. */}
        <Fade frame={frame} on={6} off={7}>
          <path className="pl-l" d="M130,366H670M150,352H650" />
        </Fade>
        <Draw
          frame={frame}
          on={6}
          off={7}
          delay={900}
          d="M150,206L400,108L650,206Z"
        />
        <Draw frame={frame} on={6} off={7} delay={1300} d="M150,222H650" />
        {PILLARS.map(([x, t], n) => (
          <Fade
            key={x}
            frame={frame}
            on={6}
            off={7}
            from="up"
            delay={200 + n * 110}
          >
            <Standing x={x} y={262} tone={t} s={1.4} />
            <Flame x={x} y={326} s={0.55} />
          </Fade>
        ))}

        {/* 7. "Come": the open gate, the river of life, and the line out to the reader. */}
        <Fade frame={frame} on={7} off={8}>
          <Shape d="M0,250V196H300V160H500V196H800V250Z" tone="b" />
          <path fill={h.h2} d="M500,160V250H800V196H500Z" />
          <path className="pl-o" d="M364,250V196a36,36 0 0 1 72,0V250Z" />
          <path className="pl-l" d="M364,250V196a36,36 0 0 1 72,0V250Z" />
          <Shape d="M0,250H800V500H0Z" tone="g" />
          <Shape d="M378,250H422L590,500H210Z" tone="b" />
          <path
            className="pl-f"
            d="M380,300c14,-4 28,4 40,0M340,370c22,-6 44,6 66,0s44,6 66,0M290,450c30,-6 60,6 90,0s60,6 90,0"
          />
          <Standing x={150} y={330} tone="c" s={0.9} />
          <Standing x={230} y={300} tone="b" s={0.7} />
          <Standing x={620} y={316} tone="g" s={0.8} />
          <Standing x={680} y={360} tone="c" s={1} />
          <path className="pl-l" d="M120,250V230M680,250V226" />
          <path className="pl-o" d={ring(120, 222, 12)} />
          <path className="pl-l" d={ring(120, 222, 12)} />
          <path className="pl-o" d={ring(680, 218, 12)} />
          <path className="pl-l" d={ring(680, 218, 12)} />
        </Fade>
        <Draw
          frame={frame}
          on={7}
          off={8}
          delay={600}
          d="M400,236C380,290 430,340 396,400S404,430 400,432"
        />

        {/* The Spirit's flame: the one mustard mark (the dove takes its place at the Jordan). */}
        <Fade frame={frame} on={-1} off={3}>
          <Travel frame={k} at={SPARK}>
            <path className="pl-m" d={FLAME} />
            <path className="pl-l" d={FLAME} />
          </Travel>
        </Fade>
        <Fade frame={frame} on={4}>
          <Travel frame={k} at={SPARK}>
            <path className="pl-m" d={FLAME} />
            <path className="pl-l" d={FLAME} />
          </Travel>
        </Fade>
      </>
    );
  },
};

export default film;
