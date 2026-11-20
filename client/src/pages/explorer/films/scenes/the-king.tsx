/**
 * "The king": the king thread (threads.json) moving, from God's rule through
 * the promise to David and the exile to Jesus and the kingdom, in the words of
 * the Kingdom and Exile stops and the Study Bible's studies of the kingdom and
 * the Messiah. No modern ruler, flag or country is drawn or named.
 *
 * One gold crown, the one mustard mark, travels through the pictures: high in
 * the light over the hills (God's rule, worn by no one); down onto a
 * shepherd's crook; above a throne on the hill; fallen on the ground beside an
 * empty throne; above the city gate as the rider comes; gone at the cross,
 * where only a ring of thorns lies at the foot; and high over the open city.
 *
 *   0  God is King          hills under a wide sky, the crown high in the light
 *   1  A shepherd king      sheep, a staff, the crown on its crook
 *   2  A promise for ever   a throne on the hill, a line of marks running on
 *   3  The empty throne     a broken wall, the throne empty, the crown fallen, a shoot
 *   4  The son of David     a road to the gate, a crowd with branches, a rider on a donkey
 *   5  A king on a cross    an empty cross at dusk, a board at its top, thorns at its foot
 *   6  The kingdom          the city, its gate open and full of light, the crown above
 *
 * No face is drawn, and the crown is never set on anyone's head.
 */
import { Shape } from "../../art";
import { Draw, Fade, type FilmDrawing } from "../motion";
import { Seated, Standing } from "./figures";

const CROWN = "M-30,10V-14L-16,0L0,-22L16,0L30,-14V10Z";

/** Where the crown is in each picture (the poster as frame 0), and its size. */
const CROWN_AT: Record<number, [number, number, number]> = {
  [-1]: [400, 112, 1],
  0: [400, 112, 1],
  1: [596, 186, 0.7],
  2: [330, 150, 0.8],
  3: [500, 412, 0.7],
  4: [610, 150, 0.6],
  5: [610, 150, 0.6],
  6: [520, 96, 1.1],
};

/** A sheep, its middle at (x, y), facing left or right. */
const Sheep = ({
  x,
  y,
  flip = false,
}: {
  x: number;
  y: number;
  flip?: boolean;
}) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
    <path className="pl-l" d="M-14,8v14M10,8v14" />
    <Shape d="M-24,0c0,-16 46,-16 46,0c0,14 -46,14 -46,0Z" tone="c" off={1} />
    <Shape d="M18,-10c8,-4 16,0 16,8c-4,6 -12,6 -16,0Z" tone="c" off={1} />
  </g>
);

/** A throne: a plain seat with a high back, its foot at (x, y). */
const Throne = ({ x, y }: { x: number; y: number }) => (
  <g>
    <Shape
      d={`M${x - 30},${y}V${y - 34}H${x - 24}V${y - 86}H${x + 24}V${y - 34}H${x + 30}V${y}Z`}
      tone="c"
      off={2}
    />
    <path
      className="pl-l"
      d={`M${x - 24},${y - 34}H${x + 24}M${x - 30},${y - 14}H${x + 30}`}
    />
  </g>
);

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => {
    const [cx, cy, cs] = CROWN_AT[Math.max(-1, Math.min(6, frame))];
    return (
      <>
        {/* 5. Dusk at the cross: a band of hatching across the sky. */}
        <Fade frame={frame} on={5} off={6}>
          <path className="fp-dark" fill={h.h1} d="M0,0H800V120H0Z" />
        </Fade>
        {/* 0 and 6. Light from beyond the top of the picture. */}
        <Fade frame={frame} on={-1} off={1}>
          <path
            className="pl-f"
            d="M330,0L350,60M400,0V56M470,0L450,60M280,0L320,70M520,0L480,70"
          />
        </Fade>

        {/* The ground, in every picture. */}
        <path className="pl-l" d="M0,420H800" />
        <Shape d="M0,500V420H800V500Z" tone="g" off={2} />
        <path fill={h.h3} d="M0,444H800V500H0Z" />

        {/* 0. Hills and fields under a wide sky. */}
        <Fade frame={frame} on={-1} off={1}>
          <Shape
            d="M0,420C80,330 200,300 300,330C380,350 440,300 540,290C640,280 720,330 800,350V420Z"
            tone="g"
            off={3}
          />
          <path fill={h.h2} d="M540,290C640,280 720,330 800,350V420H600Z" />
          <path
            className="pl-f"
            d="M40,404C200,396 360,400 520,392M120,390C260,382 420,386 600,376M300,410C460,404 620,406 780,398"
          />
        </Fade>

        {/* 1. A hillside of sheep; a shepherd's staff stands in the grass. */}
        <Fade frame={frame} on={1} off={2} from="up">
          <Shape
            d="M0,420C120,340 300,330 440,360C540,380 680,360 800,330V420Z"
            tone="g"
            off={3}
          />
          <Sheep x={150} y={392} />
          <Sheep x={236} y={380} flip />
          <Sheep x={330} y={398} />
          <Sheep x={420} y={388} flip />
          <Sheep x={200} y={408} flip />
          <path
            className="pl-l"
            d="M600,420V210C600,190 620,184 626,198"
            style={{ strokeWidth: 4 }}
          />
        </Fade>

        {/* 2. Jerusalem's hill with a throne; a line of marks runs on from it. */}
        <Fade frame={frame} on={2} off={3} from="up">
          <Shape
            d="M120,420C170,330 230,300 330,300C430,300 490,330 540,420Z"
            tone="g"
            off={3}
          />
          <Throne x={330} y={300} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map(k => (
            <Fade key={k} frame={frame} on={2} off={3} delay={600 + k * 260}>
              <path
                className="pl-k"
                d={`M${410 + k * 52},${236 - k * 6}a5,5 0 1,0 10,0a5,5 0 1,0 -10,0Z`}
              />
            </Fade>
          ))}
          <Draw
            frame={frame}
            on={2}
            off={3}
            delay={400}
            className="pl-f"
            d="M370,240C500,232 650,212 800,190"
          />
        </Fade>

        {/* 3. The empty throne: the wall broken, the crown fallen, one green shoot. */}
        <Fade frame={frame} on={3} off={4} from="up">
          <Shape
            d="M40,420V300h40v-20h30v30h20v-40h40v60h16l14,-30l10,40h30v-50h30V420Z"
            tone="c"
            off={2}
          />
          <Shape
            d="M520,420V316l18,-12l10,24h40v-30h36v20l22,-10v112Z"
            tone="c"
            off={2}
          />
          <Shape d="M300,420c0,-10 30,-10 30,0Z" tone="c" off={1} />
          <Shape d="M440,420c0,-12 34,-12 34,0Z" tone="c" off={1} />
          <Throne x={380} y={420} />
          <Shape d="M680,420V356H730V420Z" tone="c" off={2} />
          <path
            className="pl-f"
            d="M690,360a15,4 0 1,0 30,0a15,4 0 1,0 -30,0M698,360a7,2 0 1,0 14,0"
          />
          <Draw
            frame={frame}
            on={3}
            off={4}
            delay={1400}
            d="M716,356C718,340 720,330 726,318"
          />
          <Fade frame={frame} on={3} off={4} from="grow" delay={2000}>
            <Shape
              d="M724,326c-12,-2 -16,-12 -12,-18c8,2 12,8 12,18Z"
              tone="g"
              off={1}
            />
            <Shape
              d="M726,320c10,-6 18,-4 20,4c-8,4 -14,2 -20,-4Z"
              tone="g"
              off={1}
            />
          </Fade>
        </Fade>

        {/* 4. The road to the city gate; a crowd with branches; a rider on a donkey. */}
        <Fade frame={frame} on={4} off={5} from="up">
          <Shape
            d="M520,420V250h30v-16h20v16h40v-16h20v16h40v-16h20v16h30V420Z"
            tone="c"
            off={2}
          />
          <path className="pl-paper" d="M600,420V340a30,30 0 0 1 60,0V420Z" />
          <path fill={h.h2} d="M600,420V340a30,30 0 0 1 60,0V420Z" />
          <path className="pl-l" d="M600,420V340a30,30 0 0 1 60,0V420Z" />
          <path
            className="pl-f"
            d="M0,470C200,456 420,440 600,424M120,500C300,480 480,450 640,424"
          />
          {[
            [70, 352, "b"],
            [110, 360, "g"],
            [150, 350, "c"],
            [430, 340, "g"],
            [470, 348, "b"],
            [510, 344, "c"],
          ].map(([x, y, tone]) => (
            <g key={x as number}>
              <Standing
                x={x as number}
                y={y as number}
                tone={tone as "b" | "g" | "c"}
                s={0.9}
              />
              <path
                className="pl-f"
                d={`M${(x as number) + 12},${(y as number) + 14}C${(x as number) + 16},${(y as number) - 10} ${(x as number) + 22},${(y as number) - 24} ${(x as number) + 30},${(y as number) - 34}M${(x as number) + 22},${(y as number) - 18}l10,-4M${(x as number) + 26},${(y as number) - 26}l10,-2M${(x as number) + 18},${(y as number) - 10}l10,-6`}
              />
            </g>
          ))}
          {/* The donkey and its rider. */}
          <path
            className="pl-l"
            d="M262,402V420M280,404V420M330,404V420M346,402V420"
          />
          <Shape
            d="M250,404C246,380 270,370 300,372C330,370 352,376 356,394C352,410 300,412 250,404Z"
            tone="c"
            off={1.5}
          />
          <Shape
            d="M352,386C356,370 364,356 376,350C386,350 392,358 388,366C378,370 370,380 364,394Z"
            tone="c"
            off={1.5}
          />
          <path className="pl-l" d="M376,350l-2,-14M382,352l4,-12" />
          <Seated x={300} y={346} tone="b" body={30} />
        </Fade>

        {/* 5. An empty cross on a hill at dusk; a board at its top; thorns at its foot. */}
        <Fade frame={frame} on={5} off={6} from="up">
          <Shape
            d="M200,420C250,320 320,272 400,272C480,272 550,320 600,420Z"
            tone="g"
            off={4}
          />
          <path fill={h.h2} d="M400,272C480,272 550,320 600,420H440Z" />
          <path className="pl-k" d="M395,276V152h10v124ZM360,190H440v9H360Z" />
          <Shape d="M378,142H422V160H378Z" tone="c" off={1} />
          <path className="pl-f" d="M384,148H416M384,154H408" />
          <path
            className="pl-l"
            d="M378,284c4,-12 40,-12 44,0c-4,10 -40,10 -44,0Z"
          />
          <path
            className="pl-f"
            d="M380,280l-6,-4M390,276l-2,-6M402,275l2,-6M414,277l6,-4M420,284l7,0M386,290l-4,5M398,292v6M412,290l4,5"
          />
        </Fade>

        {/* 6. The city on its hill, its gate open and full of light. */}
        <Fade frame={frame} on={6} from="up">
          <Shape
            d="M260,420C300,330 380,300 520,300C660,300 740,330 780,420Z"
            tone="g"
            off={3}
          />
          <Shape
            d="M380,320V230h24v-14h18v14h40v-14h18v14h40v-14h18v14h40v-14h18v14h26V320Z"
            tone="c"
            off={2}
          />
          <path className="pl-m" d="M490,320V268a30,30 0 0 1 60,0V320Z" />
          <path className="pl-l" d="M490,320V268a30,30 0 0 1 60,0V320Z" />
          <Draw
            frame={frame}
            on={6}
            delay={800}
            className="pl-f"
            d="M520,210V180M470,224l-16,-16M570,224l16,-16M440,262l-24,-6M600,262l24,-6"
          />
          <path
            className="pl-f"
            d="M520,320C500,360 420,390 300,420M520,320C540,360 600,390 700,420"
          />
          <Standing x={360} y={378} tone="b" s={0.7} />
          <Standing x={420} y={350} tone="c" s={0.6} />
          <Standing x={640} y={370} tone="g" s={0.7} />
          <Standing x={600} y={346} tone="b" s={0.6} />
        </Fade>

        {/* The crown, travelling; at the cross it is gone. */}
        <g className={`mv-fade mv-from-none${frame === 5 ? "" : " is-on"}`}>
          <g
            className="mv-travel"
            style={{ transform: `translate(${cx}px, ${cy}px) scale(${cs})` }}
          >
            <path className="pl-o" d={CROWN} />
            <path className="pl-m" d={CROWN} />
            <path className="pl-l" d={CROWN} />
          </g>
        </g>
      </>
    );
  },
};

export default film;
