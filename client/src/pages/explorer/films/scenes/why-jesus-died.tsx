/**
 * "Why did Jesus die?": what happened, then the Bible's own pictures of what
 * the cross did, each one frame, then all of them held together.
 *
 * The cross is drawn as the Cross stop draws it: from afar, empty, on a hill
 * outside the city. No body, no blood, nothing graphic. No frame sets the
 * Father against the Son: the punishment picture shows burdens carried away
 * from people to the cross, and nothing above the cross but sky.
 *
 *   0  What happened: the city wall; three empty crosses on a far hill.  1 Corinthians 15:3
 *   1  The Passover lamb: a lamb by a door at night, a lamp in the window.  1 Corinthians 5:7; John 1:29
 *   2  A ransom: a walled yard, its door open, chains open, people walking out.  Mark 10:45
 *   3  In our place: dark bundles carried from the people to the cross.  Isaiah 53:5; 1 Peter 2:24
 *   4  Victory: the gate of death fallen flat; light through the way.     Colossians 2:15; Hebrews 2:14-15
 *   5  Love shown: light from the cross over a sleeping town.             Romans 5:8
 *   6  Enemies made friends: the dividing wall in pieces; one table.      Romans 5:10; 2 Corinthians 5:19
 *   7  Not the end: the six pictures round the cross; the tomb open at dawn.  1 Corinthians 15:4
 *
 * The one mustard mark: the lamp in the window (1), the light through the
 * fallen gate (4), the light from the cross (5), the lamp on the table (6),
 * the dawn in the open tomb (7).
 */
import type { ReactNode } from "react";
import { Roundel, Shape } from "../../art";
import { Draw, Fade, Travel, type FilmDrawing } from "../motion";
import { Flame, Seated, Standing, ring } from "./figures";

/** The far hill and its cross (or three), as the Cross stop draws them. */
function Hill({ three = false }: { three?: boolean }) {
  return (
    <>
      <Shape
        d="M200,400C260,300 340,250 400,250C460,250 540,300 600,400Z"
        tone="g"
        off={4}
      />
      {three && (
        <>
          <path className="pl-k" d="M336,278V206h8v72ZM320,226H360v7H320Z" />
          <path className="pl-k" d="M456,278V206h8v72ZM440,226H480v7H440Z" />
        </>
      )}
      <path className="pl-k" d="M396,254V160h9v94ZM376,186H425v8H376Z" />
    </>
  );
}

/** One of the six pictures, small, in its own ring. */
function Medal({
  x,
  y,
  children,
}: {
  x: number;
  y: number;
  children: ReactNode;
}) {
  return (
    <g>
      <path className="pl-o" d={ring(x, y, 42)} />
      <path className="pl-f" d={ring(x, y, 36)} />
      <g transform={`translate(${x},${y}) scale(1.2)`}>{children}</g>
    </g>
  );
}
const MEDALS: [number, number][] = [
  [124, 262],
  [186, 136],
  [318, 64],
  [482, 64],
  [614, 136],
  [676, 262],
];
function Pictures({ h }: { h: string }) {
  const [a, b, c, d, e, f] = MEDALS;
  return (
    <>
      <Roundel
        slug="why-jesus-died"
        at={{ x: a[0] - 43, y: a[1] - 43, size: 86 }}
      />
      <Medal x={b[0]} y={b[1]}>
        <path className="pl-o" d="M-12,18V-16H12V18Z" />
        <path fill={h} d="M-12,18V-16H12V18Z" />
        <path className="pl-l" d="M-12,18V-16H12V18Z" />
        <Shape d="M12,-16L22,-10V24L12,18Z" tone="c" off={1} />
        <path className="pl-l" d="M-20,18H24" />
      </Medal>
      <Medal x={c[0]} y={c[1]}>
        <path className="pl-k" d="M2,14V-22h4v36ZM-8,-12H16v4H-8Z" />
        <path className="pl-k" d="M-22,16c-3,-10 3,-16 9,-16s12,6 9,16Z" />
        <path className="pl-l" d="M-26,16H22" />
      </Medal>
      <Medal x={d[0]} y={d[1]}>
        <path className="pl-l" d="M-18,16V-16M18,16V-16M-24,16H24" />
        <Shape d="M-16,16L-26,22H22L14,16Z" tone="c" off={1} />
      </Medal>
      <Medal x={e[0]} y={e[1]}>
        <path className="pl-o" d={ring(0, 0, 8)} />
        <path className="pl-l" d={ring(0, 0, 8)} />
        <path
          className="pl-l"
          d="M0,-14V-22M0,14V22M-14,0H-22M14,0H22M-10,-10l-6,-6M10,10l6,6M10,-10l6,-6M-10,10l-6,6"
        />
      </Medal>
      <Medal x={f[0]} y={f[1]}>
        <Shape d="M-22,6H22V12H-22Z" tone="c" off={1} />
        <path className="pl-l" d="M-18,12V22M18,12V22" />
        <path className="pl-o" d={`${ring(-10, -6, 5)}${ring(10, -6, 5)}`} />
        <path className="pl-l" d={`${ring(-10, -6, 5)}${ring(10, -6, 5)}`} />
      </Medal>
    </>
  );
}

/** A small house, for the sleeping town. */
const house = (x: number, y: number, w: number) =>
  `M${x},${y}V${y - w * 0.7}L${x + w / 2},${y - w * 1.1}L${x + w},${y - w * 0.7}V${y}Z`;

/** The people in frame 3, whose bundles are carried to the cross. */
const BUNDLES: [number, number][] = [
  [120, 334],
  [180, 330],
  [240, 336],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => {
    const k = frame + 1;
    return (
      <>
        <path fill={h.hs} d="M0,0H800V500H0Z" />

        {/* Poster: the cross on its hill, the six pictures round it. */}
        <Fade frame={frame} on={-1} off={0}>
          <Shape d="M0,500V400C200,390 600,390 800,400V500Z" tone="g" />
          <g transform="translate(80,84) scale(.8)">
            <Hill />
          </g>
          <Pictures h={h.h2} />
        </Fade>

        {/* 0. What happened: the city wall, and three empty crosses on a far hill. */}
        <Fade frame={frame} on={0} off={1}>
          <path fill={h.h1} d="M0,0H800V260H0Z" />
          <Shape
            d="M0,420V330h24v-16h18v16h24v-16h18v16h24v-16h18v16h24v-16h18v16h24V420Z"
            tone="c"
            off={3}
          />
          <path className="pl-f" d="M0,356H192M0,384H192" />
          <Shape d="M0,500V410C200,400 600,400 800,410V500Z" tone="g" />
          <g transform="translate(120,40) scale(.82)">
            <Hill three />
          </g>
        </Fade>

        {/* 1. The Passover lamb: a house at night, a lamb by its door, a lamp in the window. */}
        <Fade frame={frame} on={1} off={2}>
          <path fill={h.h1} d="M0,0H800V360H0Z" />
          <path
            className="pl-paper"
            d="M120,60l3,8l8,2l-8,2l-3,8l-3,-8l-8,-2l8,-2ZM660,80l3,8l8,2l-8,2l-3,8l-3,-8l-8,-2l8,-2ZM560,40l2,6l6,1l-6,2l-2,6l-2,-6l-6,-2l6,-1Z"
          />
          <Shape d="M0,500V400C200,392 600,392 800,400V500Z" tone="g" />
          <Shape d="M230,400V230L380,150L530,230V400Z" tone="c" />
          <path fill={h.h2} d="M380,150L530,230V400H420V230Z" />
          <path className="pl-k" d="M290,400V300h60v100Z" />
          <path className="pl-l" d="M284,296h72" />
          <path className="pl-m" d="M420,260h50v44h-50Z" />
          <path className="pl-l" d="M420,260h50v44h-50ZM445,260v44" />
        </Fade>
        <Fade frame={frame} on={1} off={2} from="left" delay={700}>
          <g transform="translate(110,286) scale(1.3)">
            <path className="pl-l" d="M36,64V84M44,66V84M62,66V84M70,64V84" />
            <Shape
              d="M30,52C26,44 34,38 40,40C44,34 52,34 56,38C62,34 70,38 70,44C76,46 76,56 70,58C70,66 60,68 56,64C50,70 40,68 38,64C30,66 26,58 30,52Z"
              tone="b"
            />
            <Shape
              d="M70,40C72,32 82,30 86,36C90,42 86,50 80,50C76,50 72,46 70,40Z"
              tone="b"
              off={1.5}
            />
          </g>
        </Fade>

        {/* 2. A ransom: a walled yard, its door open, people walking out free. */}
        <Fade frame={frame} on={2} off={3}>
          <path
            className="pl-paper"
            d="M520,0H800V420H600C620,300 560,120 520,0Z"
          />
          <Shape d="M0,500V420H800V500Z" tone="g" />
          <Shape d="M40,420V180H400V420Z" tone="c" />
          <path fill={h.h1} d="M40,180H400V420H40Z" />
          <path
            className="pl-f"
            d="M40,220H400M40,260H400M40,300H400M40,340H400M40,380H400"
          />
          <path className="pl-o" d="M330,420V300h60v120Z" />
          <path className="pl-l" d="M330,420V300h60v120Z" />
          <Shape d="M390,300L430,286V432L390,420Z" tone="c" off={1.5} />
          <path
            className="pl-l"
            d="M200,420a8,6 0 1,0 16,0a8,6 0 1,0 -16,0M214,420a8,6 0 1,0 16,0M228,414c6,-4 12,-4 16,0M252,420a8,6 0 1,0 16,0"
          />
          <path className="pl-f" d="M390,440C500,436 640,430 800,420" />
        </Fade>
        {[480, 560, 640].map((x, n) => (
          <Fade
            key={x}
            frame={frame}
            on={2}
            off={3}
            from="left"
            delay={600 + n * 300}
          >
            <Standing
              x={x}
              y={360 - n * 4}
              tone={(["b", "g", "c"] as const)[n]}
              s={0.95 - n * 0.06}
            />
          </Fade>
        ))}

        {/* 3. In our place: bundles carried from the people to the cross on the hill. */}
        <Fade frame={frame} on={3} off={4}>
          <Shape d="M0,500V400C200,392 600,392 800,400V500Z" tone="g" />
          <g transform="translate(260,30) scale(.9)">
            <Hill />
          </g>
          <path
            className="pl-f"
            strokeDasharray="3 6"
            d="M140,310C260,230 420,220 600,250"
          />
          {BUNDLES.map(([x], n) => (
            <Standing
              key={x}
              x={x}
              y={338}
              tone={(["b", "g", "c"] as const)[n]}
            />
          ))}
        </Fade>
        {BUNDLES.map(([x, y], n) => (
          <Fade key={x} frame={frame} on={3} off={4}>
            <Travel
              frame={k}
              delay={1400 + n * 250}
              at={[
                [x, y],
                [x, y],
                [x, y],
                [x, y],
                [620, 250, 0.12],
              ]}
            >
              <path
                className="pl-k"
                d="M-16,8c-4,-16 6,-26 16,-26s20,10 16,26Z"
              />
            </Travel>
          </Fade>
        ))}

        {/* 4. Victory: the gate of death fallen flat; light through the way. */}
        <Fade frame={frame} on={4} off={5}>
          <path fill={h.h1} d="M0,0H800V420H0Z" />
          <path className="pl-paper" d="M300,420V140H500V420Z" />
          <Shape d="M0,500V420H800V500Z" tone="g" />
          <Shape d="M220,420V100H300V420Z" tone="b" />
          <Shape d="M500,420V100H580V420Z" tone="b" />
          <Shape d="M200,100H600V80H200Z" tone="b" />
          <path className="pl-f" d="M400,420C410,450 430,480 440,500" />
        </Fade>
        <Fade frame={frame} on={4} off={5} delay={400} from="down">
          <Shape d="M140,440L300,424L320,456L150,476Z" tone="b" off={2} />
          <path className="pl-l" d="M180,444l4,28M220,440l4,28M260,436l4,28" />
          <Shape d="M500,424L660,440L650,476L480,456Z" tone="b" off={2} />
          <path
            className="pl-l"
            d="M540,436l-4,28M580,440l-4,28M620,444l-4,28"
          />
        </Fade>
        <Fade frame={frame} on={4} off={5} delay={1200}>
          <path
            className="pl-m"
            d="M399,150h2l8,250h-18ZM360,160l2,-1l26,240l-10,2ZM440,160l-2,-1l-26,240l10,2Z"
          />
        </Fade>

        {/* 5. Love shown: light from the cross over a sleeping town. */}
        <Fade frame={frame} on={5} off={6}>
          <path fill={h.h1} d="M0,0H800V500H0Z" />
          <g transform="translate(-40,-40)">
            <Hill />
          </g>
        </Fade>
        <Fade frame={frame} on={5} off={6} delay={700}>
          <path
            className="pl-m"
            d="M358,150L60,330L64,338ZM366,160L200,420L208,424ZM378,170L360,470L368,470ZM390,170L520,470L528,466ZM400,160L700,420L704,412ZM406,150L760,300L762,292Z"
          />
        </Fade>
        <Fade frame={frame} on={5} off={6}>
          <Shape d="M0,500V420C200,412 600,412 800,420V500Z" tone="g" />
          {(
            [
              [20, 470, 60],
              [100, 460, 50],
              [170, 474, 56],
              [470, 468, 58],
              [550, 462, 50],
              [620, 474, 60],
              [700, 466, 54],
            ] as const
          ).map(([x, y, w]) => (
            <Shape key={x} d={house(x, y, w)} tone="c" off={1.5} />
          ))}
        </Fade>

        {/* 6. Enemies made friends: the dividing wall in pieces; one table. */}
        <Fade frame={frame} on={6} off={7}>
          <Shape d="M40,440V120H760V440Z" tone="b" />
          <path fill={h.h1} d="M40,120H760V440H40Z" />
          <path className="pl-paper" d="M640,440V250h80v190Z" />
          <path className="pl-l" d="M640,440V250h80v190Z" />
          <path className="pl-l" d="M10,440H790" />
          <Shape d="M120,440l10,-24h40l6,24Z" tone="c" off={1.5} />
          <Shape d="M520,440l8,-30h44l-4,30Z" tone="c" off={1.5} />
          <Shape d="M574,440l4,-18h30l2,18Z" tone="c" off={1.5} />
          {[230, 290, 350, 410, 470].map((x, n) => (
            <Seated
              key={x}
              x={x}
              y={316 + (n % 2) * 4}
              tone={(["g", "c", "b"] as const)[n % 3]}
            />
          ))}
          <Shape d="M200,350H500V366H200Z" tone="c" />
          <path className="pl-l" d="M220,366V440M480,366V440" />
        </Fade>
        <Fade frame={frame} on={6} off={7} delay={900}>
          <path className="pl-k" d="M342,350c0,-6 16,-6 16,0Z" />
          <Flame x={350} y={334} s={0.7} gold />
        </Fade>

        {/* 7. Not the end of the story: the six pictures round the cross; the tomb open at dawn. */}
        <Fade frame={frame} on={7}>
          <Shape d="M0,500V400C200,390 600,390 800,400V500Z" tone="g" />
          <g transform="translate(80,84) scale(.8)">
            <Hill />
          </g>
          <Pictures h={h.h2} />
        </Fade>
        <Fade frame={frame} on={7} from="right" delay={900}>
          <Shape
            d="M640,420V340C660,300 740,290 790,310V420Z"
            tone="b"
            off={3}
          />
          <path className="pl-m" d="M690,420V368a22,22 0 0 1 44,0V420Z" />
          <path className="pl-l" d="M690,420V368a22,22 0 0 1 44,0V420Z" />
          <Shape d="M640,420a24,24 0 1,1 48,0Z" tone="b" off={1.5} />
        </Fade>
        <Draw
          frame={frame}
          on={7}
          delay={1600}
          className="pl-f"
          d="M712,330V312M690,338l-10,-10M734,338l10,-10"
        />
      </>
    );
  },
};

export default film;
