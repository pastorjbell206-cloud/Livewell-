/**
 * "Exile and coming home": the Study Bible's study of exile, and the Exile and
 * Return stops, in seven pictures. One road runs through every picture: out of
 * a gate, away and back, until it ends at a gate that is never shut.
 *
 *   0  Sent out of the garden   the garden wall, its gate closed and a flame across it; two walk away
 *   1  Out of Egypt             low brick buildings under a hot sun; a long line walks out to the hills
 *   2  By the rivers of Babylon willows by a river, harps hung in them, two people sitting; a broken wall far off
 *   3  The long road back       people with bundles and a cart climb to a small temple and a half-built wall
 *   4  The way home opened      a house with a lit window; the father runs down the road to his son
 *   5  Foreigners on the way    a small town, a garden tended, a house going up; the road runs on
 *   6  Home at last             the city on its hill, its gates open and full of light; roads from every side
 *
 * The one mustard mark is the light of home: the lit window in picture 4 and
 * the open gate in picture 6. No modern place, state or border is drawn, and
 * no face.
 */
import { Shape } from "../../art";
import { Draw, Fade, type FilmDrawing } from "../motion";
import { Seated, Standing } from "./figures";

/** A willow: trunk at (x, y on the ground), drooping strands. */
const Willow = ({ x, y }: { x: number; y: number }) => (
  <g>
    <Shape
      d={`M${x - 10},${y}C${x - 6},${y - 50} ${x - 8},${y - 100} ${x - 20},${y - 140}H${x + 10}C${x + 4},${y - 100} ${x + 6},${y - 50} ${x + 12},${y}Z`}
      tone="c"
      off={2}
    />
    <Shape
      d={`M${x - 80},${y - 80}C${x - 90},${y - 150} ${x - 30},${y - 190} ${x + 10},${y - 180}C${x + 60},${y - 190} ${x + 100},${y - 140} ${x + 80},${y - 80}C${x + 40},${y - 110} ${x - 40},${y - 110} ${x - 80},${y - 80}Z`}
      tone="g"
      off={2}
    />
    <path
      className="pl-f"
      d={`M${x - 60},${y - 110}C${x - 64},${y - 80} ${x - 66},${y - 60} ${x - 70},${y - 40}M${x - 30},${y - 120}C${x - 32},${y - 90} ${x - 34},${y - 70} ${x - 36},${y - 54}M${x + 30},${y - 120}C${x + 32},${y - 90} ${x + 36},${y - 70} ${x + 40},${y - 50}M${x + 60},${y - 108}C${x + 64},${y - 80} ${x + 68},${y - 64} ${x + 72},${y - 44}`}
    />
  </g>
);

/** A small harp hanging from a branch at (x, y). */
const Harp = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <path className="pl-f" d="M0,0V10" />
    <Shape d="M-10,10H10L6,40C2,44 -6,44 -10,40Z" tone="c" off={1} />
    <path className="pl-o" d="M-6,16H6L4,34H-6Z" />
    <path className="pl-f" d="M-3,16V36M0,16V36M3,16V34" />
  </g>
);

/** A house, its door's foot at (x, y). */
const House = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Shape d="M-50,0V-60H50V0Z" tone="c" off={2} />
    <Shape d="M-60,-58L0,-96L60,-58Z" tone="b" off={2} />
    <path className="pl-paper" d="M-12,0V-30H12V0Z" />
    <path className="pl-l" d="M-12,0V-30H12V0Z" />
  </g>
);

/** A city wall with towers and an arched gate, the gate's foot at (x, y). */
function City({
  x,
  y,
  s = 1,
  lit = false,
}: {
  x: number;
  y: number;
  s?: number;
  lit?: boolean;
}) {
  const gate = "M-30,0V-50a30,30 0 0 1 60,0V0Z";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Shape
        d="M-150,0V-90h24v-14h18v14h40v-14h18v14h40v-14h18v14h40v-14h18v14h40v-14h18v14h26V0Z"
        tone="c"
        off={2}
      />
      <path className={lit ? "pl-m" : "pl-paper"} d={gate} />
      <path className="pl-l" d={gate} />
    </g>
  );
}

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => (
    <>
      {/* 1. A hot sun over Egypt. */}
      <Fade frame={frame} on={1} off={2}>
        <path
          className="pl-o"
          d="M640,80a30,30 0 1,0 60,0a30,30 0 1,0 -60,0Z"
        />
        <path
          className="pl-f"
          d="M670,30V14M670,146V130M620,80H604M736,80H720M634,44l-10,-10M706,44l10,-10M634,116l-10,10M706,116l10,10"
        />
      </Fade>
      {/* -1 and 6. Light from the open gate of the city. */}
      <Fade frame={frame} on={6}>
        <Draw
          frame={frame}
          on={6}
          delay={900}
          className="pl-f"
          d="M560,150V100M500,166L470,128M620,166L650,128M460,200L416,184M660,200L704,184"
        />
      </Fade>

      {/* The ground, in every picture. */}
      <path className="pl-l" d="M0,420H800" />
      <Shape d="M0,500V420H800V500Z" tone="g" off={2} />
      <path fill={h.h3} d="M0,444H800V500H0Z" />

      {/* Poster: a road from a garden gate across the hills to a city far off. */}
      <Fade frame={frame} on={-1} off={0}>
        <Shape
          d="M0,420C120,360 260,350 400,370C540,390 660,350 800,340V420Z"
          tone="g"
          off={3}
        />
        <Shape
          d="M640,300C630,250 690,226 720,244C750,226 800,250 790,300Z"
          tone="g"
          off={2}
        />
        <Shape d="M640,420V300H790V420Z" tone="c" off={2} />
        <path className="pl-paper" d="M690,420V380a24,24 0 0 1 48,0V420Z" />
        <path className="pl-l" d="M690,420V380a24,24 0 0 1 48,0V420Z" />
        <path
          className="pl-f"
          d="M700,440C560,430 460,400 340,384C260,374 200,362 150,350M716,460C560,446 440,412 300,392C240,382 190,370 140,354"
        />
        <City x={150} y={352} s={0.45} lit />
      </Fade>

      {/* 0. The garden behind its wall, the gate closed and a flame across it. */}
      <Fade frame={frame} on={0} off={1} from="up">
        <Shape d="M480,420V280H780V420Z" tone="c" off={2} />
        <path fill={h.h2} d="M480,280H780V294H480Z" />
        <Shape
          d="M500,284C480,230 540,190 590,210C620,170 690,180 700,220C750,214 780,260 760,284Z"
          tone="g"
          off={2}
        />
        <path className="pl-o" d="M600,420V350a30,30 0 0 1 60,0V420Z" />
        <path fill={h.h2} d="M600,420V350a30,30 0 0 1 60,0V420Z" />
        <path
          className="pl-l"
          d="M600,420V350a30,30 0 0 1 60,0V420ZM630,320V420"
        />
        {[598, 630, 662].map(x => (
          <Shape
            key={x}
            d={`M${x},400C${x - 16},396 ${x - 18},376 ${x - 8},364C${x - 6},374 ${x - 2},378 ${x},376C${x - 2},360 ${x + 4},346 ${x + 10},340C${x + 10},356 ${x + 20},366 ${x + 18},382C${x + 16},394 ${x + 8},400 ${x},400Z`}
            tone="c"
            off={1.5}
          />
        ))}
        <Draw
          frame={frame}
          on={0}
          off={1}
          delay={500}
          className="pl-f"
          d="M600,440C480,436 300,438 0,446M620,470C480,462 300,466 0,476"
        />
        <Standing x={340} y={378} tone="b" s={1} />
        <Standing x={300} y={382} tone="c" s={0.95} />
      </Fade>

      {/* 1. Brick buildings; a long line of people walks out toward the hills. */}
      <Fade frame={frame} on={1} off={2} from="up">
        <Shape d="M0,420C80,370 180,360 280,380V420Z" tone="g" off={3} />
        <Shape d="M520,420V300H640V420Z" tone="c" off={2} />
        <Shape d="M640,420V330H780V420Z" tone="c" off={2} />
        <path
          className="pl-f"
          d="M520,330H640M520,360H640M520,390H640M560,300V330M600,330V360M560,360V390M600,390V420M640,360H780M640,390H780M680,330V360M730,360V390M690,390V420"
        />
        <Draw
          frame={frame}
          on={1}
          off={2}
          delay={300}
          className="pl-f"
          d="M520,440C420,436 300,430 200,424M520,470C400,462 260,452 160,440"
        />
        {[480, 440, 400, 360, 320, 280, 240].map((x, i) => (
          <Fade
            key={x}
            frame={frame}
            on={1}
            off={2}
            from="right"
            delay={500 + i * 160}
          >
            <Standing
              x={x}
              y={370 + (i % 2) * 6}
              tone={(["b", "c", "g"] as const)[i % 3]}
              s={0.85 - (i % 2) * 0.06}
            />
          </Fade>
        ))}
      </Fade>

      {/* 2. By the rivers of Babylon: willows, harps hung, two sitting; a broken wall far off. */}
      <Fade frame={frame} on={2} off={3} from="up">
        <path className="pl-f" d="M0,320C200,312 500,310 800,316" />
        <path
          className="pl-l"
          d="M560,314H600V300H616V314H640V306L652,314H690V298H704V314"
        />
        <Shape d="M0,420V392C200,384 600,380 800,388V420Z" tone="b" off={2} />
        <path
          className="pl-f"
          d="M60,404C200,398 360,398 520,400M300,412C460,408 620,408 760,406"
        />
        <Willow x={260} y={390} />
        <Willow x={520} y={392} />
        <Harp x={214} y={286} />
        <Harp x={318} y={292} />
        <Seated x={360} y={352} tone="b" body={36} />
        <Seated x={400} y={356} tone="c" body={32} />
      </Fade>

      {/* 3. The long road back: people with bundles and a cart climb to the temple. */}
      <Fade frame={frame} on={3} off={4} from="up">
        <Shape
          d="M300,420C380,330 480,280 600,270C700,264 760,300 800,320V420Z"
          tone="g"
          off={3}
        />
        <Shape d="M600,270V220H680V270Z" tone="c" off={2} />
        <path className="pl-l" d="M592,222H688M620,270V240M660,270V240" />
        <Shape d="M680,272V250H720V262H740V272Z" tone="c" off={1.5} />
        <path
          className="pl-f"
          d="M300,420C380,384 480,330 560,296C580,288 600,280 620,272"
        />
        {[
          [120, 362, "b", 1],
          [190, 360, "c", 0.96],
          [330, 348, "g", 0.9],
          [400, 330, "b", 0.84],
        ].map(([x, y, t, s]) => (
          <g key={x as number}>
            <Standing
              x={x as number}
              y={y as number}
              tone={t as "b" | "c" | "g"}
              s={s as number}
            />
            <path
              className="pl-o"
              d={`M${(x as number) + 6},${(y as number) + 14}c10,-6 22,0 18,12c-6,6 -16,4 -18,-2Z`}
            />
            <path
              className="pl-l"
              d={`M${(x as number) + 6},${(y as number) + 14}c10,-6 22,0 18,12c-6,6 -16,4 -18,-2Z`}
            />
          </g>
        ))}
        <Shape d="M232,404V380H300V404Z" tone="c" off={1.5} />
        <path
          className="pl-o"
          d="M240,412a10,10 0 1,0 20,0a10,10 0 1,0 -20,0ZM276,412a10,10 0 1,0 20,0a10,10 0 1,0 -20,0Z"
        />
        <path
          className="pl-l"
          d="M240,412a10,10 0 1,0 20,0a10,10 0 1,0 -20,0ZM276,412a10,10 0 1,0 20,0a10,10 0 1,0 -20,0ZM300,390L320,384"
        />
      </Fade>

      {/* 4. The house with a lit window; the father runs down the road to his son. */}
      <Fade frame={frame} on={4} off={5} from="up">
        <Shape
          d="M420,420C480,330 560,290 680,290C740,290 780,300 800,310V420Z"
          tone="g"
          off={3}
        />
        <House x={660} y={290} />
        <path className="pl-m" d="M680,256H700V274H680Z" />
        <path className="pl-l" d="M680,256H700V274H680ZM690,256V274" />
        <path
          className="pl-f"
          d="M650,300C600,340 500,380 300,420M670,300C620,346 520,390 360,430"
        />
        <Standing x={460} y={346} tone="b" s={1} />
        <path
          className="pl-l"
          d="M450,370L424,356M470,370L492,354"
          style={{ strokeWidth: 3 }}
        />
        <path className="pl-f" d="M490,380h20M494,392h16" />
        <Standing x={250} y={360} tone="c" s={0.96} />
      </Fade>

      {/* 5. A small town: a garden tended, a house going up; the road runs on. */}
      <Fade frame={frame} on={5} off={6} from="up">
        <Shape d="M440,420C520,350 640,330 800,340V420Z" tone="g" off={3} />
        <House x={120} y={420} />
        <path
          className="pl-l"
          d="M230,420V340H330V420M230,340L280,306L330,340M230,380H330M262,340V420M298,340V420"
        />
        <path className="pl-o" d="M360,420V396H460V420Z" />
        <path
          className="pl-l"
          d="M360,420V396H460V420ZM360,404H460M360,412H460"
        />
        <path
          className="pl-l"
          d="M378,396c-2,-10 4,-16 8,-20M402,396c0,-10 6,-14 10,-18M428,396c-2,-10 4,-16 8,-20"
        />
        <Standing x={490} y={370} tone="g" s={0.8} />
        <path
          className="pl-f"
          d="M470,436C560,420 620,380 700,346M490,452C580,432 650,392 730,352"
        />
        <Standing x={600} y={330} tone="b" s={0.7} />
        <Standing x={640} y={316} tone="c" s={0.66} />
      </Fade>

      {/* 6. The city on its hill, its gates open; roads come in from every side. */}
      <Fade frame={frame} on={6} from="up">
        <Shape
          d="M240,420C300,310 420,280 560,280C700,280 760,330 800,360V420Z"
          tone="g"
          off={3}
        />
        <City x={560} y={290} lit />
        <path
          className="pl-f"
          d="M560,290C520,340 400,380 120,420M560,290C600,340 680,380 800,400M560,290C556,340 540,390 520,440"
        />
        <Standing x={180} y={352} tone="c" s={1} />
        <Standing x={300} y={334} tone="b" s={0.9} />
        <Standing x={410} y={316} tone="g" s={0.8} />
        <Standing x={700} y={330} tone="b" s={0.86} />
        <Standing x={540} y={370} tone="c" s={0.9} />
      </Fade>
    </>
  ),
};

export default film;
