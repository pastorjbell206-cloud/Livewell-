/**
 * "The kingdom of God": the Study Bible's study of the kingdom, the Jesus stop
 * and the film "The king", in seven pictures. On the right, the mustard seed
 * of Mark 4:30-32 grows slowly through every picture into a tree with birds
 * in its branches; on the left, each picture shows the kingdom as the Gospels
 * tell it.
 *
 *   0  God rules over all       a wide field under a light from beyond the edge; one gold seed
 *   1  The kingdom has come near by a lake, a man speaks to people on the shore; the seed has sprouted
 *   2  Signs of the kingdom     a man carries his mat home, people share bread; the plant has leaves
 *   3  Like a mustard seed      a sower scatters seed; the plant is a young tree, birds come
 *   4  Upside down              children run to a man who kneels to welcome them; the tree taller
 *   5  Not of this world        a crowd at a mountain's foot, one man walks on alone up the path
 *   6  Already, and not yet     the tree full grown, birds nesting, people in its shade; a city far off
 *
 * No flag, crown, party or nation is drawn. The one mustard mark is the seed,
 * and at the end the open gate of the city far off. No face is drawn.
 */
import { Shape } from "../../art";
import { Fade, Travel, type FilmDrawing } from "../motion";
import { Seated, Standing } from "./figures";

/** The full-grown tree, its foot at (0, 0). */
function Tree() {
  return (
    <g>
      <Shape
        d="M-14,0C-10,-60 -12,-110 -20,-150H18C10,-110 10,-60 16,0Z"
        tone="c"
        off={2}
      />
      <path
        className="pl-l"
        d="M-6,-120C-40,-140 -70,-150 -100,-170M4,-130C40,-150 70,-160 100,-176M-2,-150C-10,-180 -20,-200 -30,-226M6,-150C20,-180 30,-200 44,-224"
        style={{ strokeWidth: 4 }}
      />
      <Shape
        d="M-150,-170C-170,-230 -110,-280 -50,-270C-20,-320 60,-320 90,-276C150,-290 190,-230 160,-180C180,-140 120,-120 80,-140C40,-120 -40,-120 -80,-140C-120,-124 -170,-140 -150,-170Z"
        tone="g"
        off={3}
      />
      <path
        className="pl-f"
        d="M-120,-200c10,-6 20,-6 30,0M-60,-240c10,-6 20,-6 30,0M20,-250c10,-6 20,-6 30,0M80,-210c10,-6 20,-6 30,0M-20,-180c10,-6 20,-6 30,0M110,-170c8,-4 16,-4 24,0"
      />
    </g>
  );
}

/** A small bird, flying (wings up) or perched, its middle at (x, y). */
const Bird = ({
  x,
  y,
  perched = false,
}: {
  x: number;
  y: number;
  perched?: boolean;
}) =>
  perched ? (
    <g transform={`translate(${x} ${y})`}>
      <path
        className="pl-k"
        d="M-10,0C-10,-8 4,-10 8,-4L14,-6L10,0C6,6 -8,6 -10,0Z"
      />
      <path
        className="pl-l"
        d="M-10,0C-10,-8 4,-10 8,-4L14,-6L10,0C6,6 -8,6 -10,0Z"
      />
    </g>
  ) : (
    <path
      className="pl-l"
      transform={`translate(${x} ${y})`}
      d="M-14,-4C-8,-10 -4,-8 0,0C4,-8 8,-10 14,-4"
    />
  );

const SEED = "M-16,0C-16,-11 16,-11 16,0C16,11 -16,11 -16,0Z";

/** The tree's size as it grows (frames 3 to 6). */
const TREE_AT: [number, number, number][] = [
  [620, 420, 0.5],
  [620, 420, 0.5],
  [620, 420, 0.5],
  [620, 420, 0.6],
  [620, 420, 0.8],
  [620, 420, 0.84],
  [620, 420, 1],
];

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => (
    <>
      {/* -1 and 0. Light from beyond the top of the picture. */}
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

      {/* -1 and 0. A wide field, furrowed. */}
      <Fade frame={frame} on={-1} off={1}>
        <Shape
          d="M0,420C160,370 320,360 480,372C620,382 720,366 800,356V420Z"
          tone="g"
          off={3}
        />
        <path
          className="pl-f"
          d="M20,410C200,400 380,402 560,396M100,416C280,410 460,410 640,404M340,404C500,398 660,398 790,392"
        />
      </Fade>

      {/* 1. By the lake: a man speaks to people sitting on the shore. */}
      <Fade frame={frame} on={1} off={2} from="up">
        <Shape
          d="M0,320C120,290 260,290 380,312C460,330 520,380 560,420H0Z"
          tone="g"
          off={2}
        />
        <Shape
          d="M0,360C140,348 380,350 470,362C504,368 488,380 440,382C320,390 140,390 0,392Z"
          tone="b"
          off={2}
        />
        <path className="pl-f" d="M40,368C140,364 260,364 380,366" />
        <Standing x={330} y={340} tone="b" s={1.1} />
        <Seated x={140} y={384} tone="c" body={36} />
        <Seated x={190} y={390} tone="g" body={30} />
        <Seated x={240} y={386} tone="b" body={34} />
      </Fade>

      {/* 2. A man carries his mat home; people share bread at a table. */}
      <Fade frame={frame} on={2} off={3} from="up">
        <Standing x={90} y={354} tone="c" s={1.05} />
        <path className="pl-o" d="M100,370L144,346L150,356L106,380Z" />
        <path className="pl-l" d="M100,370L144,346L150,356L106,380Z" />
        <Seated x={250} y={330} tone="b" body={50} />
        <Seated x={320} y={326} tone="g" body={54} />
        <Seated x={390} y={332} tone="c" body={48} />
        <Shape d="M210,370H430V382H210Z" tone="c" off={1.5} />
        <path className="pl-l" d="M222,382V420M418,382V420" />
        <path
          className="pl-o"
          d="M270,370C270,356 300,356 300,370ZM340,370C340,358 364,358 364,370Z"
        />
        <path
          className="pl-l"
          d="M270,370C270,356 300,356 300,370ZM340,370C340,358 364,358 364,370Z"
        />
      </Fade>

      {/* 3. A sower scatters seed in the field. */}
      <Fade frame={frame} on={3} off={4} from="up">
        <path
          className="pl-f"
          d="M20,416C160,410 300,410 440,406M40,430C180,424 320,424 460,420"
        />
        <Standing x={220} y={340} tone="b" s={1.2} />
        <path
          className="pl-l"
          d="M232,376L270,360"
          style={{ strokeWidth: 3 }}
        />
        <path
          className="pl-o"
          d="M200,384c-14,4 -14,20 0,22c10,0 14,-14 0,-22Z"
        />
        <path
          className="pl-l"
          d="M200,384c-14,4 -14,20 0,22c10,0 14,-14 0,-22Z"
        />
        {[
          [282, 372],
          [296, 386],
          [288, 400],
          [306, 404],
          [312, 380],
        ].map(([x, y]) => (
          <path
            key={`${x}-${y}`}
            className="pl-k"
            d={`M${x - 3},${y}a3,3 0 1,0 6,0a3,3 0 1,0 -6,0Z`}
          />
        ))}
      </Fade>

      {/* 4. Children run to a man who kneels; grown-ups stand back. */}
      <Fade frame={frame} on={4} off={5} from="up">
        <Seated x={300} y={372} tone="b" body={48} />
        <Standing x={240} y={380} tone="c" s={0.65} />
        <Standing x={190} y={386} tone="g" s={0.55} />
        <Standing x={362} y={382} tone="c" s={0.62} />
        <Standing x={70} y={354} tone="b" s={1} />
        <Standing x={420} y={350} tone="g" s={1.05} />
      </Fade>

      {/* 5. A crowd at the mountain's foot; one man walks on alone up the path. */}
      <Fade frame={frame} on={5} off={6} from="up">
        <Shape
          d="M0,420L120,250L200,300L300,170L420,320L460,420Z"
          tone="g"
          off={3}
        />
        <path fill={h.h2} d="M300,170L420,320L460,420H330Z" />
        <path
          className="pl-f"
          d="M100,420C160,380 200,340 240,300C260,270 280,240 300,210"
        />
        <Standing x={250} y={246} tone="b" s={0.6} />
        {[40, 70, 100, 130, 160].map((x, i) => (
          <Standing
            key={x}
            x={x}
            y={370 + (i % 2) * 8}
            tone={(["c", "g", "b"] as const)[i % 3]}
            s={0.75}
          />
        ))}
      </Fade>

      {/* 6. People resting in the tree's shade; far off, a city with its gate open. */}
      <Fade frame={frame} on={6} from="up">
        <Shape
          d="M0,360C60,320 140,316 240,334C330,350 420,380 480,420H0Z"
          tone="g"
          off={2}
        />
        <path
          className="pl-o"
          d="M60,330V300h16v-8h12v8h26v-8h12v8h26v-8h12v8h20V330Z"
        />
        <path
          className="pl-l"
          d="M60,330V300h16v-8h12v8h26v-8h12v8h26v-8h12v8h20V330Z"
        />
        <path className="pl-m" d="M110,330V314a10,10 0 0 1 20,0V330Z" />
        <path className="pl-l" d="M110,330V314a10,10 0 0 1 20,0V330Z" />
        <path
          className="pl-f"
          d="M60,330H190M120,330C200,360 300,390 440,420"
        />
        <Seated x={500} y={384} tone="c" body={36} />
        <Seated x={560} y={390} tone="b" body={30} />
        <Seated x={700} y={386} tone="g" body={34} />
      </Fade>

      {/* The seed: gold on the soil, then split by a shoot. */}
      <Fade frame={frame} on={-1} off={1} from="grow">
        <g transform="translate(620 424)">
          <path className="pl-m" d={SEED} />
          <path className="pl-l" d={SEED} />
        </g>
      </Fade>
      <Fade frame={frame} on={1} off={3} from="grow" delay={400}>
        <g transform="translate(620 420)">
          <path
            className="pl-m"
            d="M-12,6C-12,0 -4,-2 -2,2Z M12,6C12,0 4,-2 2,2Z"
          />
          <path
            className="pl-l"
            d="M-12,6C-12,0 -4,-2 -2,2ZM12,6C12,0 4,-2 2,2Z"
          />
          <path className="pl-l" d="M0,2C0,-20 -2,-40 0,-56" />
          <Shape
            d="M0,-40C-16,-44 -24,-56 -22,-64C-8,-62 -2,-52 0,-40Z"
            tone="g"
            off={1}
          />
          <Shape
            d="M0,-52C14,-60 26,-58 28,-50C18,-44 8,-46 0,-52Z"
            tone="g"
            off={1}
          />
        </g>
      </Fade>
      <Fade frame={frame} on={2} off={3} from="grow" delay={500}>
        <g transform="translate(620 420)">
          <path
            className="pl-l"
            d="M0,-56C2,-80 -2,-100 2,-126"
            style={{ strokeWidth: 3 }}
          />
          <Shape
            d="M0,-90C-20,-96 -30,-110 -26,-120C-10,-116 -2,-104 0,-90Z"
            tone="g"
            off={1}
          />
          <Shape
            d="M2,-108C20,-118 34,-114 36,-104C24,-98 12,-100 2,-108Z"
            tone="g"
            off={1}
          />
          <Shape
            d="M2,-126C-6,-140 -2,-152 4,-156C10,-146 10,-134 2,-126Z"
            tone="g"
            off={1}
          />
        </g>
      </Fade>

      {/* 3 to 6. The tree, growing. */}
      <Fade frame={frame} on={3} from="grow">
        <Travel frame={Math.max(0, frame)} at={TREE_AT}>
          <Tree />
        </Travel>
      </Fade>

      {/* Birds: two come at 3; at 6 they nest in the branches. */}
      <Fade frame={frame} on={3} off={6} from="right" delay={900}>
        <Bird x={740} y={150} />
        <Bird x={770} y={190} />
      </Fade>
      <Fade frame={frame} on={6} delay={1200}>
        <Bird x={560} y={182} perched />
        <Bird x={700} y={170} perched />
        <Bird x={640} y={130} />
      </Fade>
    </>
  ),
};

export default film;
