/**
 * "Sacrifice and the Lamb": the lamb thread (threads.json) moving, from the
 * garden's covering to the Lamb at the center of the throne, in the words of
 * the Fall, Rescue and Sinai stops, the Study Bible's study of atonement and
 * its notes, and the film "Why did Jesus die?".
 *
 *   0  A covering           two garments hang on a branch; the sewn leaves lie below
 *   1  God will provide     father and son on the mountain; a ram caught in a thicket
 *   2  The Passover lamb    a house at night, its door open on a meal; a lamb by the door
 *   3  The altar and goat   the courtyard and its altar; a goat walks away to the wilderness
 *   4  The Lamb of God      a river; one man points across it to another walking along it
 *   5  Once for all         an empty cross at first light; a cold altar with no fire
 *   6  The Lamb on the throne  the gold lamb standing before the throne; a river; people
 *
 * One lamb's outline returns: in the poster's field, by the Passover door, and,
 * gold (the one mustard mark), standing alive at the throne. No blood is
 * drawn, no animal is shown hurt, and no face is drawn.
 */
import { Shape } from "../../art";
import { Draw, Fade, type FilmDrawing } from "../motion";
import { Seated, Standing } from "./figures";

/** A lamb facing right, its feet on y = 0. */
const BODY =
  "M-30,-30C-36,-44 -20,-54 -6,-50C4,-58 24,-54 26,-40C36,-36 34,-20 24,-18C16,-10 -20,-10 -26,-18C-36,-20 -38,-28 -30,-30Z";
const HEAD =
  "M24,-42C26,-54 44,-56 46,-44C46,-36 38,-32 30,-34C26,-35 24,-38 24,-42Z";

function Lamb({
  gold = false,
  horns = false,
}: {
  gold?: boolean;
  horns?: boolean;
}) {
  return (
    <g>
      <path className="pl-l" d="M-20,-14V0M-8,-12V0M8,-12V0M18,-14V0" />
      <path className={gold ? "pl-m" : "pl-o"} d={BODY} />
      <path className="pl-l" d={BODY} />
      <path className={gold ? "pl-m" : "pl-o"} d={HEAD} />
      <path className="pl-l" d={HEAD} />
      {horns ? (
        <path
          className="pl-l"
          d="M30,-50c-10,-6 -12,6 -4,8M38,-52c4,-10 14,-4 8,4"
          style={{ strokeWidth: 3 }}
        />
      ) : (
        <path className="pl-l" d="M28,-48l-8,-6" />
      )}
    </g>
  );
}

/** A low altar of stone with a horn at each corner, its foot at (x, y). */
const Altar = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Shape d="M-34,0V-44H34V0Z" tone="c" off={2} />
    <path className="pl-l" d="M-34,-44v-8h8v8M26,-44v-8h8v8M-34,-22H34" />
  </g>
);

/** A plain throne, its foot at (x, y). */
const Throne = ({ x, y }: { x: number; y: number }) => (
  <g>
    <Shape
      d={`M${x - 56},${y}V${y - 50}H${x - 44}V${y - 150}H${x + 44}V${y - 50}H${x + 56}V${y}Z`}
      tone="c"
      off={2}
    />
    <path
      className="pl-l"
      d={`M${x - 44},${y - 50}H${x + 44}M${x - 56},${y - 20}H${x + 56}`}
    />
  </g>
);

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => {
    return (
      <>
        {/* 2. Night over the Passover house. */}
        <Fade frame={frame} on={2} off={3}>
          <path className="fp-dark" fill={h.h1} d="M0,0H800V420H0Z" />
          <path
            className="pl-o"
            d="M110,80a26,26 0 1,0 52,0a26,26 0 1,0 -52,0Z"
          />
        </Fade>
        {/* -1 and 5. First light from beyond the top of the picture. */}
        <Fade frame={frame} on={-1} off={0}>
          <path
            className="pl-f"
            d="M330,0L360,70M400,0V66M470,0L440,70M260,0L320,80M540,0L480,80"
          />
        </Fade>

        {/* The ground, in every picture. */}
        <path className="pl-l" d="M0,420H800" />
        <Shape d="M0,500V420H800V500Z" tone="g" off={2} />
        <path fill={h.h3} d="M0,444H800V500H0Z" />

        {/* Poster: a field at first light, and far off a cold altar. */}
        <Fade frame={frame} on={-1} off={0}>
          <Shape
            d="M0,420C140,380 300,372 460,386C600,398 700,380 800,372V420Z"
            tone="g"
            off={3}
          />
          <path
            className="pl-f"
            d="M40,410C200,402 360,404 520,398M300,414C460,410 620,410 780,404"
          />
          <Altar x={680} y={380} s={0.5} />
        </Fade>

        {/* 0. The garden's edge: garments on a branch, the sewn leaves below. */}
        <Fade frame={frame} on={0} off={1} from="up">
          <Shape
            d="M190,420C196,360 196,300 186,250H222C214,300 214,360 222,420Z"
            tone="c"
            off={2}
          />
          <Shape
            d="M80,270C60,210 120,150 200,160C270,130 360,170 350,240C380,280 330,310 290,296C250,320 160,320 130,300C90,310 66,290 80,270Z"
            tone="g"
            off={3}
          />
          <path
            fill={h.h2}
            d="M200,300C250,320 290,296 290,296C330,310 380,280 350,240C330,270 260,290 200,300Z"
          />
          <path
            className="pl-l"
            d="M214,270C260,262 320,262 400,256"
            style={{ strokeWidth: 4 }}
          />
          <g>
            <Shape
              d="M282,264L270,272L272,280L278,280L272,380H318L312,280L318,280L320,272L308,264C302,270 288,270 282,264Z"
              tone="c"
              off={1.5}
            />
            <Shape
              d="M346,262L334,270L336,278L342,278L338,370H378L374,278L380,278L382,270L370,262C364,268 352,268 346,262Z"
              tone="b"
              off={1.5}
            />
          </g>
          {[
            [300, 410, -20],
            [350, 414, 30],
            [400, 408, -60],
            [440, 414, 10],
          ].map(([x, y, r]) => (
            <path
              key={x}
              className="pl-o"
              transform={`translate(${x} ${y}) rotate(${r})`}
              d="M-18,0C-12,-10 0,-12 4,-8C10,-12 18,-6 18,0C14,4 6,8 0,6C-8,8 -16,4 -18,0Z"
            />
          ))}
          <path
            className="pl-f"
            d="M300,410l-10,0M350,414l12,6M440,414l12,-2"
          />
        </Fade>

        {/* 1. The mountain: father and son, a pile of stones, a ram in the thicket. */}
        <Fade frame={frame} on={1} off={2} from="up">
          <Shape
            d="M40,420C120,340 210,300 300,300H560C640,300 720,340 790,420Z"
            tone="g"
            off={3}
          />
          <path fill={h.h2} d="M560,300C640,300 720,340 790,420H600Z" />
          <Standing x={300} y={230} tone="b" s={1.13} />
          <Standing x={350} y={250} tone="c" s={0.8} />
          <Shape
            d="M400,300V286H426V300ZM430,300V284H454V300ZM412,286V272H442V286Z"
            tone="c"
            off={1}
          />
          <path className="pl-f" d="M404,272L452,266M408,268L448,262" />
          <Shape
            d="M500,300C486,270 500,240 530,244C540,224 580,226 584,250C604,258 600,290 590,300Z"
            tone="g"
            off={2}
          />
          <path
            className="pl-f"
            d="M512,290C520,270 534,262 540,250M556,296C560,276 566,262 574,256"
          />
          <g transform="translate(540 302) scale(1.2)">
            <Lamb horns />
          </g>
          <path
            className="pl-f"
            d="M564,260c6,-6 12,-6 18,0M554,254c4,-8 14,-10 20,-4"
          />
        </Fade>

        {/* 2. A house at night, its door open on a meal. */}
        <Fade frame={frame} on={2} off={3} from="up">
          <Shape d="M420,420V260H720V420Z" tone="c" off={2} />
          <Shape d="M404,264L570,190L736,264Z" tone="b" off={2} />
          <path className="pl-paper" d="M520,420V320a30,30 0 0 1 60,0V420Z" />
          <Seated x={538} y={360} tone="b" body={60} />
          <Seated x={566} y={366} tone="g" body={54} />
          <path className="pl-l" d="M520,420V320a30,30 0 0 1 60,0V420Z" />
          <path className="pl-l" d="M512,420V316a38,38 0 0 1 76,0V420" />
          <path className="pl-paper" d="M628,300H680V340H628Z" />
          <path className="pl-l" d="M628,300H680V340H628ZM654,300V340" />
          <path fill={h.h2} d="M420,260H720V276H420Z" />
        </Fade>

        {/* 3. The courtyard and its altar; a goat goes away into the wilderness. */}
        <Fade frame={frame} on={3} off={4} from="up">
          <Shape d="M180,420V260H320V420Z" tone="b" off={2} />
          <path fill={h.h2} d="M180,260H320V276H180Z" />
          <path className="pl-o" d="M40,420V340H420V420Z" />
          <path fill={h.h3} d="M40,340H420V352H40Z" />
          <path
            className="pl-l"
            d="M40,420V340H420V420M80,340V420M120,340V420M160,340V420M300,340V420M340,340V420M380,340V420"
          />
          <path className="pl-paper" d="M200,342H260V420H200Z" />
          <Altar x={230} y={420} s={0.9} />
          <Draw
            frame={frame}
            on={3}
            off={4}
            delay={600}
            className="pl-f"
            d="M224,370C218,340 232,320 226,290M238,370C244,346 232,330 240,300"
          />
          <Shape
            d="M520,420C560,370 620,360 660,380C700,360 760,370 800,390V420Z"
            tone="c"
            off={2}
          />
          <path className="pl-f" d="M420,440C500,430 600,426 800,428" />
        </Fade>
        <Fade frame={frame} on={3} off={4} from="left" delay={900}>
          <g transform="translate(600 446) scale(1.4)">
            <path className="pl-l" d="M-22,-16V0M-12,-14V0M10,-14V0M20,-16V0" />
            <Shape d="M-30,-22C-30,-38 26,-40 28,-24C28,-12 -30,-10 -30,-22Z" />
            <path className="pl-l" d="M-30,-30l-8,-6" />
            <Shape d="M24,-34L30,-56L48,-50L44,-36C40,-30 30,-28 24,-34Z" />
            <path
              className="pl-l"
              d="M32,-56C28,-70 18,-74 12,-70M40,-54C40,-68 32,-76 26,-74M44,-38l2,12"
              style={{ strokeWidth: 3 }}
            />
          </g>
        </Fade>

        {/* 4. The Jordan: one man points across to another walking along the river. */}
        <Fade frame={frame} on={4} off={5} from="up">
          <Shape
            d="M0,352C200,342 600,338 800,344V312C600,306 200,310 0,320Z"
            tone="b"
            off={2}
          />
          <path
            className="pl-f"
            d="M40,332C200,326 400,324 560,328M240,340C420,334 600,334 760,332"
          />
          <path
            fill={h.h2}
            d="M0,312C200,302 600,298 800,306V270C600,262 200,266 0,276Z"
          />
          <path className="pl-l" d="M0,276C200,266 600,262 800,270" />
          <Standing x={560} y={248} tone="b" s={0.8} />
          <Standing x={170} y={354} tone="c" s={1.05} />
          <path
            className="pl-l"
            d="M182,380L232,358"
            style={{ strokeWidth: 3 }}
          />
          <path
            className="pl-l"
            d="M40,420c4,-20 6,-34 2,-50M60,420c0,-16 4,-30 10,-44M700,420c-2,-18 0,-30 6,-40M730,420c2,-16 6,-24 12,-34"
          />
        </Fade>

        {/* 5. An empty cross at first light; a cold altar with no fire. */}
        <Fade frame={frame} on={5} off={6} from="up">
          <Draw
            frame={frame}
            on={5}
            off={6}
            delay={600}
            className="pl-f"
            d="M400,90V40M330,110L300,70M470,110L500,70M290,160L240,140M510,160L560,140"
          />
          <Shape
            d="M200,420C250,320 320,272 400,272C480,272 550,320 600,420Z"
            tone="g"
            off={4}
          />
          <path fill={h.h2} d="M400,272C480,272 550,320 600,420H440Z" />
          <path className="pl-k" d="M395,276V152h10v124ZM360,190H440v9H360Z" />
          <Altar x={680} y={420} s={0.7} />
        </Fade>

        {/* 6. The throne on the hill; a river runs down from it; people by the water. */}
        <Fade frame={frame} on={6} from="up">
          <Draw
            frame={frame}
            on={6}
            delay={700}
            className="pl-f"
            d="M400,110V70M340,124L316,92M460,124L484,92M300,160L262,146M500,160L538,146"
          />
          <Shape
            d="M120,420C180,310 280,250 400,250C520,250 620,310 680,420Z"
            tone="g"
            off={3}
          />
          <Throne x={400} y={252} />
          <path
            className="pl-b"
            d="M392,256C380,300 330,340 300,380C290,396 290,410 300,420H340C334,408 336,396 344,384C370,346 410,300 408,256Z"
          />
          <path
            className="pl-l"
            d="M392,256C380,300 330,340 300,380C290,396 290,410 300,420M408,256C410,300 370,346 344,384C336,396 334,408 340,420"
          />
          <Standing x={210} y={358} tone="c" s={1} />
          <Standing x={260} y={366} tone="b" s={0.88} />
          <Standing x={420} y={360} tone="g" s={0.95} />
          <Standing x={500} y={350} tone="c" s={1.1} />
          <Standing x={580} y={362} tone="b" s={0.94} />
        </Fade>

        {/* The lamb: in the field, by the door, and gold before the throne. */}
        <Fade frame={frame} on={-1} off={0}>
          <g transform="translate(470 394) scale(1.2)">
            <Lamb />
          </g>
        </Fade>
        <Fade frame={frame} on={2} off={3} from="right" delay={600}>
          <g transform="translate(350 420) scale(1.1)">
            <Lamb />
          </g>
        </Fade>
        <Fade frame={frame} on={6} from="grow" delay={1200}>
          <g transform="translate(400 252) scale(1.1)">
            <Lamb gold />
          </g>
        </Fade>
      </>
    );
  },
};

export default film;
