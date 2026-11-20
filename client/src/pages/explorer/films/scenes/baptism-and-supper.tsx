/**
 * "Baptism and the Lord's Supper": what every church shares in the two signs
 * Jesus gave, and where faithful churches differ, in seven pictures. As the
 * plan asks, water and bread are drawn and nothing more: no church building,
 * no robe and no form of the rite is shown as the right one, and where the
 * churches differ the two ways stand side by side, the same size.
 *
 *   0  Water          a river between low banks
 *   1  Bread and cup  a plain table: a loaf broken in two, and a cup
 *   2  What all share the river and the table side by side, one gold line above
 *   3  Who?           a parent holding a baby by a bowl of water | a grown
 *                     person standing in a river
 *   4  How?           water poured from a jug over a bowed head | a person
 *                     going down under the water of a river
 *   5  The Supper     the bread and the cup alone
 *   6  One Lord       the river and the table again, one gold line above
 *
 * The one mustard mark: the gold line (2 and 6). No face is drawn.
 */
import type { Hatch } from "@/components/art/PlateSvg";
import { Shape } from "../../art";
import { Draw, Fade, type FilmDrawing } from "../motion";
import { Seated, Standing, ring } from "./figures";

/** The river between its banks, across the whole picture. */
const River = ({ h }: { h: Hatch }) => (
  <>
    <path
      className="pl-l"
      d="M0,150C140,140 300,146 420,140C560,134 700,142 800,138"
    />
    <Shape
      d="M0,500V250C160,236 320,240 400,246C520,236 680,238 800,246V500Z"
      tone="g"
      off={3}
    />
    <Shape
      d="M0,300C200,290 600,310 800,300V392C600,402 200,384 0,394Z"
      tone="b"
      off={3}
    />
    <path
      fill={h.hh}
      d="M0,340C200,332 600,350 800,342V392C600,402 200,384 0,394Z"
    />
    <path
      className="pl-f"
      d="M60,322c18,-5 36,5 54,0M240,330c18,-5 36,5 54,0M470,326c18,-5 36,5 54,0M650,320c18,-5 36,5 54,0"
    />
    <path
      className="pl-l"
      d="M40,420l4,-12l4,12M70,428l4,-14l4,14M700,424l4,-12l4,12M732,432l4,-14l4,14"
    />
  </>
);

/** A plain table with a loaf broken in two and a cup on it. */
const Table = () => (
  <>
    <Shape d="M220,330H580V352H220Z" tone="c" off={2} />
    <path className="pl-l" d="M244,352V430M556,352V430" />
    <Shape d="M290,330C290,306 306,296 326,298L338,330Z" tone="c" off={1.5} />
    <Shape d="M346,330L354,300C372,298 388,308 388,330Z" tone="c" off={1.5} />
    <path className="pl-f" d="M302,312l8,-4M318,308l8,-4M362,310l8,-4" />
    <Shape
      d="M458,250h60c0,30 -10,46 -30,48v22h18v10h-36v-10h18v-22c-20,-2 -30,-18 -30,-48Z"
      tone="b"
      off={1.5}
    />
    <path className="pl-l" d="M462,262H514" />
  </>
);

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => (
    <>
      {/* The poster: the river, with the table on its bank. */}
      <Fade frame={frame} on={-1} off={0}>
        <River h={h} />
        <g transform="translate(470 200) scale(0.55)">
          <Table />
        </g>
      </Fade>

      {/* 0. Water. */}
      <Fade frame={frame} on={0} off={1}>
        <River h={h} />
      </Fade>
      <Draw
        frame={frame}
        on={0}
        off={1}
        className="pl-f"
        delay={500}
        d="M120,360c22,-6 44,6 66,0M330,368c22,-6 44,6 66,0M560,356c22,-6 44,6 66,0"
      />

      {/* The floor for the table pictures. */}
      <Fade frame={frame} on={1} off={2}>
        <Shape d="M0,500V430H800V500Z" tone="g" off={2} />
        <path fill={h.h3} d="M0,448H800V500H0Z" />
      </Fade>
      <Fade frame={frame} on={5} off={6}>
        <Shape d="M0,500V430H800V500Z" tone="g" off={2} />
        <path fill={h.h3} d="M0,448H800V500H0Z" />
      </Fade>

      {/* 1 and 5. The bread and the cup on a plain table. */}
      <Fade frame={frame} on={1} off={2} from="up">
        <Table />
      </Fade>
      <Fade frame={frame} on={5} off={6} from="up">
        <Table />
      </Fade>

      {/* 2 and 6. Side by side, one gold line above both. */}
      {[2, 6].map(f => (
        <Fade key={f} frame={frame} on={f} off={f === 2 ? 3 : undefined}>
          <path className="pl-l" d="M0,440H800" />
          <path fill={h.h3} d="M0,452H800V500H0Z" />
          <g transform="translate(30 130) scale(0.45)">
            <River h={h} />
          </g>
          <path className="pl-l" d="M30,130H390V355H30Z" />
          <g transform="translate(270 96) scale(0.8)">
            <Table />
          </g>
        </Fade>
      ))}
      <Draw
        frame={frame}
        on={2}
        off={3}
        className="fp-gold"
        delay={800}
        d="M60,110C240,70 560,70 740,110"
      />
      <Draw
        frame={frame}
        on={6}
        className="fp-gold"
        delay={800}
        d="M60,110C240,70 560,70 740,110"
      />

      {/* 3 and 4: two ways side by side, divided down the middle. */}
      <Fade frame={frame} on={3} off={5}>
        <Shape d="M0,500V430H800V500Z" tone="g" off={2} />
        <path fill={h.h3} d="M0,448H800V500H0Z" />
        <path className="pl-f" strokeDasharray="4 6" d="M400,40V430" />
        {/* The right half: a river. */}
        <Shape
          d="M430,432C560,428 680,436 790,432V482C680,486 560,478 430,482Z"
          tone="b"
          off={2}
        />
        <path
          fill={h.hh}
          d="M430,456C560,452 680,460 790,456V482C680,486 560,478 430,482Z"
        />
      </Fade>

      {/* 3. Who? A parent holding a baby by a bowl | a grown person in a river. */}
      <Fade frame={frame} on={3} off={4} from="up">
        <Standing x={170} y={300} tone="b" s={1.6} />
        <Shape
          d="M150,352a26,12 -15 1,0 52,0a26,12 -15 1,0 -52,0Z"
          tone="c"
          off={1}
        />
        <path className="pl-o" d={ring(194, 346, 7)} />
        <path className="pl-l" d={ring(194, 346, 7)} />
        <Shape d="M246,372H330L320,398H256Z" tone="b" off={1.5} />
        <path className="pl-l" d="M278,398V430M298,398V430M268,430H308" />
        <path className="pl-f" d="M258,380c12,-4 24,4 36,0" />
      </Fade>
      <Fade frame={frame} on={3} off={4} from="up" delay={400}>
        <Standing x={610} y={376} tone="g" s={1.6} />
        <Shape
          d="M430,448C560,444 680,452 790,448V482C680,486 560,478 430,482Z"
          tone="b"
          off={1.5}
        />
        <path
          fill={h.hh}
          d="M430,462C560,458 680,466 790,462V482C680,486 560,478 430,482Z"
        />
        <path
          className="pl-f"
          d="M566,454c14,-4 28,4 42,0M622,456c14,-4 28,4 42,0"
        />
      </Fade>

      {/* 4. How? Poured | under the water. */}
      <Fade frame={frame} on={4} off={5} from="up">
        <Seated x={200} y={358} tone="g" body={72} />
        <Shape
          d="M232,286C226,268 240,256 256,258L276,244L282,252L268,266C272,282 262,296 246,298Z"
          tone="c"
          off={1.5}
        />
      </Fade>
      <Draw
        frame={frame}
        on={4}
        off={5}
        className="pl-f"
        delay={700}
        d="M230,292C222,304 214,316 212,330M236,296C232,308 226,318 222,328"
      />
      <Fade frame={frame} on={4} off={5} from="up" delay={300}>
        <Standing x={572} y={382} tone="b" s={1.5} />
        <path className="pl-o" d={ring(646, 448, 11)} />
        <path className="pl-l" d={ring(646, 448, 11)} />
        <path className="pl-l" d="M588,418C606,426 622,434 636,442" />
        <Shape
          d="M430,448C560,444 680,452 790,448V482C680,486 560,478 430,482Z"
          tone="b"
          off={1.5}
        />
        <path
          fill={h.hh}
          d="M430,462C560,458 680,466 790,462V482C680,486 560,478 430,482Z"
        />
        <path
          className="pl-f"
          d="M614,444c8,-6 16,-6 24,0M656,444c8,-6 16,-6 24,0"
        />
      </Fade>
    </>
  ),
};

export default film;
