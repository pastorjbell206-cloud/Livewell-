/**
 * "The resurrection": what Christians confess happened on the third day and
 * what it means, from the family catechism (Q31, Q52), the "resurrection"
 * card and the Study Bible's study of the resurrection. It teaches what the
 * resurrection is; the case for it is the film "Did Jesus really come back to
 * life?", which this one sends the reader to and does not repeat.
 *
 * One garden: a far hill with an empty cross (no body, nothing graphic) and a
 * tomb cut in the rock. Two pictures are drawn on a page laid over the garden:
 * the breakfast by the lake, and the field at harvest.
 *
 *   0  Buried              evening; the tomb shut with its great stone
 *   1  The third day       first light; the stone rolled aside, light inside, the women
 *   2  Sent to tell        two people face each other in the garden
 *   3  In his body         (a page) a fire by the lake, fish and bread, friends round it
 *   4  Never to die again  full day; the great stone lies split in two
 *   5  The firstfruits     (a page) one gold sheaf before a ripening field
 *   6  Because he lives    the garden, wheat in front, a path out to the city
 *
 * The one mustard mark: the light inside the tomb (from 1), and the first
 * sheaf in its own picture (5). No face is drawn; the risen Jesus is a plain
 * figure, never a halo.
 */
import type { ReactNode } from "react";
import { Shape } from "../../art";
import { Draw, Fade, type FilmDrawing } from "../motion";
import { Standing } from "./figures";

/** A part that moves to where this frame puts it (the poster may differ from frame 0). */
function At({ to, children }: { to: [number, number]; children: ReactNode }) {
  return (
    <g
      className="mv-travel"
      style={{ transform: `translate(${to[0]}px, ${to[1]}px)` }}
    >
      {children}
    </g>
  );
}

const DOOR = "M598,420V368a32,32 0 0 1 64,0V420Z";
/** The great stone, whole; and in two halves along one crack, lying split (4 on). */
const STONE = "M-46,0a46,46 0 1,1 92,0Z";
const LEFT_HALF = "M2,0H-46A46,46 0 0 1 -4,-45.8L4,-30L-6,-16Z";
const RIGHT_HALF = "M2,0H46A46,46 0 0 0 -4,-45.8L4,-30L-6,-16Z";

/** A stalk of wheat, its foot at (x, y), its ear at the top. */
const stalk = (x: number, y: number, hgt: number, lean = 0) =>
  `M${x},${y}C${x + lean * 0.3},${y - hgt * 0.5} ${x + lean * 0.7},${y - hgt * 0.8} ${x + lean},${y - hgt}`;
const ear = (x: number, y: number, s = 1) =>
  `M${x},${y}c${-5 * s},${-8 * s} ${-5 * s},${-20 * s} 0,${-30 * s}c${5 * s},${10 * s} ${5 * s},${22 * s} 0,${30 * s}Z`;

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => {
    const open = frame === -1 || frame >= 1;
    const split = frame >= 4;
    const at: [number, number] = open ? [728, 420] : [630, 420];
    const left: [number, number] = split ? [706, 424] : at;
    const right: [number, number] = split ? [752, 424] : at;
    return (
      <>
        {/* 0. Evening: a band of hatching across the top of the sky. */}
        <Fade frame={frame} on={0} off={1}>
          <path className="fp-dark" fill={h.h1} d="M0,0H800V110H0Z" />
        </Fade>
        {/* From the third day: first light, a few strokes low over the tomb. */}
        {(frame === -1 || frame >= 1) && (
          <path className="pl-f" d="M650,150H780M670,170H790M700,190H770" />
        )}

        {/* 6. The city wall far off on the left, where the path goes. */}
        <Fade frame={frame} on={6} from="up">
          <Shape
            d="M20,420V390h18v-12h20v12h36v-10h20v10h36v-12h20v12h26V420Z"
            tone="c"
            off={2}
          />
          <path fill={h.h1} d="M20,410H196V420H20Z" />
        </Fade>

        {/* The far hill and its empty cross. */}
        <Shape
          d="M110,420C160,320 220,262 280,262C340,262 400,320 450,420Z"
          tone="g"
          off={4}
        />
        <path fill={h.h2} d="M280,262C340,262 400,320 450,420H310Z" />
        <path className="pl-k" d="M276,266V178h9v88ZM256,204H305v8H256Z" />

        {/* The tomb cut in the rock, its doorway dark by day and by night. */}
        <Shape d="M500,420V300C540,240 720,226 790,250V420Z" tone="b" off={3} />
        <path fill={h.h1} d="M720,236C760,240 780,244 790,250V420H730Z" />
        <path className="pl-paper" d={DOOR} />
        <path fill={h.hh} d={DOOR} />
        <path fill={h.hh} d={DOOR} />
        <path className="pl-l" d={DOOR} />
        {/* 1 on (and the poster). The light from inside the empty tomb. */}
        <g
          className={`mv-fade mv-from-none${open ? " is-on" : ""}`}
          style={{ transitionDelay: frame === 1 ? "900ms" : undefined }}
        >
          <path className="pl-m" d="M604,420V370a26,26 0 0 1 52,0V420Z" />
          <path
            className="pl-f"
            d="M630,322V298M600,332l-12,-12M660,332l12,-12"
          />
        </g>
        {/* The great stone: across the door, rolled aside, then lying split. */}
        <g className={`mv-fade mv-from-none${split ? "" : " is-on"}`}>
          <At to={left}>
            <Shape d={STONE} tone="g" off={2} />
            <path className="pl-f" d="M-24,-30a30,30 0 0 1 30,-8" />
          </At>
        </g>
        <g className={`mv-fade mv-from-none${split ? " is-on" : ""}`}>
          <At to={left}>
            <Shape d={LEFT_HALF} tone="g" off={2} />
          </At>
          <At to={right}>
            <Shape d={RIGHT_HALF} tone="g" off={2} />
          </At>
        </g>

        {/* The ground. */}
        <Shape d="M0,500V420H800V500Z" tone="g" off={2} />
        <path fill={h.h3} d="M0,440H800V500H0Z" />

        {/* 1. The women come with spices. */}
        <Fade frame={frame} on={1} off={2} from="left">
          <Standing x={430} y={358} tone="c" s={0.9} />
          <Standing x={462} y={362} tone="b" s={0.9} />
          <Standing x={494} y={358} tone="g" s={0.9} />
          <Shape d="M440,418h12l3,-14h-18Z" tone="c" off={1} />
          <Shape d="M504,418h12l3,-14h-18Z" tone="c" off={1} />
        </Fade>
        {/* 2. Mary, and the one she took for the gardener, face to face. */}
        <Fade frame={frame} on={2} off={3} from="up">
          <Standing x={468} y={356} tone="c" />
          <Standing x={526} y={352} tone="b" />
        </Fade>

        {/* 6. The path out to the city, people on it; wheat in front. */}
        <Fade frame={frame} on={6} from="up" delay={300}>
          <path
            className="pl-f"
            d="M60,500C120,474 170,450 160,430C150,424 130,422 110,420"
          />
          <path
            className="pl-f"
            d="M150,500C200,474 230,450 210,432C196,424 170,422 150,420"
          />
          <Standing x={170} y={420} tone="c" s={0.6} />
          <Standing x={136} y={392} tone="b" s={0.5} />
          <Standing x={196} y={436} tone="g" s={0.7} />
        </Fade>
        <Fade frame={frame} on={6} from="up" delay={700}>
          {[240, 268, 296, 324, 352, 380].map((x, n) => (
            <g key={x}>
              <path
                className="pl-l"
                d={stalk(x, 500, 70 + (n % 3) * 8, n % 2 ? 6 : -6)}
              />
              <Shape
                d={ear(x + (n % 2 ? 6 : -6), 430 - (n % 3) * 8, 0.8)}
                tone="c"
                off={1}
              />
            </g>
          ))}
        </Fade>

        {/* 3. A page laid over the garden: breakfast by the lake. */}
        <Fade frame={frame} on={3} off={4}>
          <path className="pl-paper" d="M0,0H800V500H0Z" />
          <path
            className="pl-f"
            d="M660,90l-10,-24M680,86l2,-28M700,90l12,-24M640,98l-22,-12M716,98l22,-14"
          />
          {/* The far shore and the water. */}
          <path
            className="pl-l"
            d="M0,250C120,232 260,240 380,226C520,212 660,232 800,222"
          />
          <Shape d="M0,262C200,256 600,258 800,252V340H0Z" tone="b" off={2} />
          <path fill={h.h2} d="M0,290C200,284 600,286 800,280V340H0Z" />
          <path
            className="pl-f"
            d="M60,276h60M300,272h80M560,270h70M180,306h90M470,300h60"
          />
          <path className="pl-l" d="M0,346C200,340 600,342 800,340" />
          <Shape d="M0,500V346C200,340 600,342 800,340V500Z" tone="g" off={2} />
          <path fill={h.h3} d="M0,420H800V500H0Z" />
          {/* A boat drawn up on the shore, over the water's edge. */}
          <Shape d="M600,338H724C714,364 612,364 600,338Z" tone="c" off={1.5} />
          <path className="pl-l" d="M662,338V300M662,304l28,30H662" />
          {/* The charcoal fire, fish laid on it, bread beside. */}
          <Shape
            d="M352,430C352,414 448,414 448,430C448,446 352,446 352,430Z"
            tone="c"
            off={1.5}
          />
          <path
            fill={h.hh}
            d="M362,430C362,420 438,420 438,430C438,440 362,440 362,430Z"
          />
          <Draw
            frame={frame}
            on={3}
            off={4}
            delay={400}
            className="pl-f"
            d="M380,416c-4,-10 6,-16 2,-26M400,412c-4,-12 8,-18 2,-30M420,416c-4,-10 6,-16 2,-26"
          />
          <Shape
            d="M372,420c10,-8 30,-8 38,0c-8,8 -28,8 -38,0Zm38,0l8,-6v12Z"
            tone="b"
            off={1}
          />
          <Shape
            d="M398,428c10,-8 30,-8 38,0c-8,8 -28,8 -38,0Zm38,0l8,-6v12Z"
            tone="b"
            off={1}
          />
          <Shape d="M462,440c0,-10 28,-10 28,0Z" tone="c" off={1} />
          <Shape d="M478,446c0,-10 28,-10 28,0Z" tone="c" off={1} />
          {/* His friends round the fire, and one more standing among them. */}
          <Standing x={300} y={360} tone="c" />
          <Standing x={336} y={368} tone="g" s={0.9} />
          <Standing x={508} y={362} tone="g" />
          <Standing x={544} y={356} tone="c" />
          <Standing x={470} y={350} tone="b" />
        </Fade>

        {/* 5. A page laid over the garden: the field at harvest. */}
        <Fade frame={frame} on={5} off={6}>
          <path className="pl-paper" d="M0,0H800V500H0Z" />
          <path
            className="pl-f"
            d="M380,70l-8,-26M400,66V38M420,70l8,-26M360,80l-20,-14M440,80l20,-14"
          />
          <path className="pl-l" d="M0,300C200,292 600,296 800,300" />
          <Shape d="M0,500V300C200,292 600,296 800,300V500Z" tone="g" off={2} />
          <path fill={h.h3} d="M0,420H800V500H0Z" />
          {/* The whole field, ripening behind. */}
          {Array.from({ length: 22 }, (_, n) => {
            const x = 20 + n * 36 + (n % 2) * 8;
            if (x > 330 && x < 470) return null;
            const y = 330 + (n % 3) * 14;
            return (
              <g key={n}>
                <Draw
                  frame={frame}
                  on={5}
                  off={6}
                  delay={300 + n * 40}
                  d={stalk(x, y + 60, 90, n % 2 ? 5 : -5)}
                />
                <Fade
                  frame={frame}
                  on={5}
                  off={6}
                  from="grow"
                  delay={900 + n * 40}
                >
                  <Shape
                    d={ear(x + (n % 2 ? 5 : -5), y - 30, 0.8)}
                    tone="c"
                    off={1}
                  />
                </Fade>
              </g>
            );
          })}
          {/* The first sheaf, gathered and tied, standing in front. */}
          <Fade frame={frame} on={5} off={6} from="up" delay={1600}>
            {[-24, -14, -5, 5, 14, 24].map(dx => (
              <path
                key={dx}
                className="pl-l"
                d={`M${400 + dx * 0.4},440C${400 + dx * 0.4},380 ${400 + dx},330 ${400 + dx * 1.4},250`}
              />
            ))}
            <path
              className="pl-l"
              d="M388,372H412"
              style={{ strokeWidth: 4 }}
            />
            {[-24, -14, -5, 5, 14, 24].map(dx => (
              <g key={dx}>
                <path className="pl-o" d={ear(400 + dx * 1.4, 252, 1.2)} />
                <path className="pl-m" d={ear(400 + dx * 1.4, 252, 1.2)} />
                <path className="pl-l" d={ear(400 + dx * 1.4, 252, 1.2)} />
              </g>
            ))}
          </Fade>
        </Fade>
      </>
    );
  },
};

export default film;
