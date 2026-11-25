/**
 * "Who Jesus is": the family catechism (Q25 to Q27), the "Jesus, God and man"
 * card and the Honest Answer "Was Jesus just a good teacher?", in seven pictures.
 *
 *   0  The Word        a light in the middle of the dark, the dark not covering it
 *   1  Became flesh    a stable at night, a manger, one star (the mustard mark)
 *   2  Fully man       a man resting by a stone well in the heat, a jar beside him
 *   3  Fully God       the same man by the lake: a boat on calm water under a
 *                      clearing sky; on the shore a man walks off carrying his mat
 *   4  One person      the man alone on the road: one figure, the same throughout
 *   5  Why both        the man between people and the light; one gold line through him
 *   6  Who do you say? on a hillside he sits with his friends; one leans to answer
 *
 * Doctrine care: Jesus is one figure, drawn the same way in every picture,
 * never split or doubled, never with a halo, never with a face. The things
 * only God does are shown around him, not on him.
 */
import type { Hatch } from "@/components/art/PlateSvg";
import { Shape } from "../../art";
import { Draw, Fade, type FilmDrawing } from "../motion";
import { Seated, Standing } from "./figures";

/** The lake country: hills, the lake on the right, a road along the shore. */
const Land = ({ h }: { h: Hatch }) => (
  <>
    <Shape
      d="M0,500V300C120,250 240,246 340,272C420,240 520,236 600,256C680,236 760,240 800,252V500Z"
      tone="g"
      off={3}
    />
    <path
      fill={h.h1}
      d="M600,256C680,236 760,240 800,252V300C740,296 660,300 600,306Z"
    />
    <path className="pl-l" d="M0,316C200,304 420,300 800,300" />
    <Shape
      d="M800,318C700,314 590,320 530,338C490,352 486,384 520,402C580,428 700,430 800,424Z"
      tone="b"
      off={2}
    />
    <path
      fill={h.hh}
      d="M540,356C600,346 700,344 800,346V424C700,430 580,428 520,402C500,390 510,366 540,356Z"
    />
    <path
      className="pl-o"
      d="M0,456C140,446 300,436 430,420C470,414 500,410 520,410L524,428C500,430 470,434 430,440C300,456 140,466 0,480Z"
    />
    <path
      className="pl-l"
      d="M0,456C140,446 300,436 430,420C470,414 500,410 520,410M0,480C140,466 300,456 430,440C470,434 500,430 524,428"
    />
  </>
);

const Him = ({ x, y }: { x: number; y: number }) => (
  <Standing x={x} y={y} tone="c" s={1.5} />
);

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => (
    <>
      {/* 0. A light in the dark. */}
      <Fade frame={frame} on={0} off={1}>
        {/* The dark and the light keep their sense at night (film.css). */}
        <path className="fp-dark" fill={h.h3} d="M0,0H800V500H0Z" />
        <path
          className="pl-paper fp-light"
          d="M330,250a70,70 0 1,0 140,0a70,70 0 1,0 -140,0Z"
        />
        <path
          className="pl-m"
          d="M378,250a22,22 0 1,0 44,0a22,22 0 1,0 -44,0Z"
        />
        <path
          className="pl-l fp-on-light"
          d="M378,250a22,22 0 1,0 44,0a22,22 0 1,0 -44,0Z"
        />
      </Fade>
      <Draw
        frame={frame}
        on={0}
        off={1}
        className="pl-l fp-on-light"
        delay={500}
        d="M400,200V188M400,312V300M350,250H338M462,250H450M365,215l-9,-9M435,215l9,-9M365,285l-9,9M435,285l9,9"
      />

      {/* 1. A stable at night, the manger, one star. */}
      <Fade frame={frame} on={1} off={2}>
        <path fill={h.h1} d="M0,0H800V500H0Z" />
        <path
          className="pl-paper"
          d="M600,60l10,26l28,4l-28,6l-10,26l-10,-26l-28,-6l28,-4Z"
        />
        <path
          className="pl-m"
          d="M600,68l7,18l20,4l-20,5l-7,18l-7,-18l-20,-5l20,-4Z"
        />
        <path
          className="pl-l"
          d="M600,60l10,26l28,4l-28,6l-10,26l-10,-26l-28,-6l28,-4Z"
        />
        <Shape d="M160,214L400,140L640,214V234H160Z" tone="c" off={4} />
        <path fill={h.h2} d="M400,140L640,214V234H400Z" />
        <path className="pl-o" d="M190,234H610V470H190Z" />
        <path fill={h.h1} d="M190,234H610V470H190Z" />
        <path className="pl-l" d="M190,234V470M610,234V470" />
        <path className="pl-o" d="M0,440H800V500H0Z" />
        <path className="pl-l" d="M0,440H800" />
        <path className="pl-l" d="M300,440L330,370M500,440L470,370" />
        <Shape d="M312,370H488L462,420H338Z" tone="c" off={3} />
        <path
          className="pl-l"
          d="M320,370l12,-18l10,16l12,-20l10,18l14,-22l10,20l14,-18l10,18l14,-22l10,20l12,-16l10,18l12,-20l10,18"
        />
      </Fade>

      {/* 2 to 6, and the poster: the lake country. */}
      <Fade frame={frame} on={-1} off={0}>
        <Land h={h} />
      </Fade>
      <Fade frame={frame} on={2}>
        <Land h={h} />
      </Fade>

      {/* The poster: he walks the road toward a few people. */}
      <Fade frame={frame} on={-1} off={0}>
        <Him x={440} y={318} />
        <Standing x={300} y={332} tone="b" s={1.2} />
        <Standing x={350} y={338} tone="g" s={1.1} />
      </Fade>

      {/* 2. Fully man: resting by a well in the heat, a jar beside him. */}
      <Fade frame={frame} on={2} off={3} from="up">
        <Shape d="M250,372V416C250,428 350,428 350,416V372Z" tone="c" off={2} />
        <path fill={h.h2} d="M316,372V426C330,424 350,422 350,416V372Z" />
        <path
          className="pl-l"
          d="M250,390C270,396 330,396 350,390M250,406C270,412 330,412 350,406M280,374V392M318,374V392M298,394V408M266,394V408M334,394V408"
        />
        <path
          className="pl-o"
          d="M250,372a50,12 0 1,0 100,0a50,12 0 1,0 -100,0Z"
        />
        <path
          className="pl-l"
          d="M250,372a50,12 0 1,0 100,0a50,12 0 1,0 -100,0Z"
        />
        <Seated x={396} y={364} tone="c" body={52} />
        <Shape
          d="M440,404C434,404 432,414 436,420C438,428 454,428 456,420C460,414 458,404 452,404V398H442Z"
          tone="c"
          off={1.5}
        />
        <path
          className="pl-f"
          d="M120,130l-14,-24M150,122l-2,-28M180,128l12,-24M96,150l-26,-8M204,150l26,-8"
        />
      </Fade>

      {/* 3. Fully God: the same man by the lake; the calm water, the boat, the forgiven man. */}
      <Fade frame={frame} on={3} off={4}>
        <Him x={420} y={320} />
      </Fade>
      <Fade frame={frame} on={3} off={4} delay={400}>
        <Shape d="M610,376H750L726,398H634Z" tone="c" off={2} />
        <path className="pl-l" d="M678,376V322M678,328L712,368H678" />
        <path
          className="pl-f"
          d="M570,414c14,-3 28,3 42,0M700,414c14,-3 28,3 42,0"
        />
        <path
          className="pl-l"
          d="M560,150c30,-18 70,-18 96,-4M640,120c24,-10 52,-8 70,4"
        />
      </Fade>
      <Fade frame={frame} on={3} off={4} delay={800} from="right">
        <Standing x={200} y={340} tone="b" s={1.2} />
        <Shape
          d="M180,356h50a7,7 0 0 1 0,14h-50a7,7 0 0 1 0,-14Z"
          tone="g"
          off={1}
        />
      </Fade>

      {/* 4. One person: the man alone on the road. */}
      <Fade frame={frame} on={4} off={5}>
        <Him x={300} y={344} />
      </Fade>

      {/* 5. Why both: between the people and the light, one gold line through him. */}
      <Fade frame={frame} on={5} off={6}>
        <path
          className="pl-f"
          d="M800,30L700,96M780,0L690,80M740,0L670,74M800,80L716,120"
        />
        <Him x={400} y={300} />
        <Standing x={130} y={350} tone="b" s={1.2} />
        <Standing x={190} y={356} tone="g" s={1.1} />
        <Standing x={250} y={352} tone="b" s={1.2} />
      </Fade>
      <Draw
        frame={frame}
        on={5}
        off={6}
        className="fp-gold"
        delay={600}
        d="M720,90C620,180 470,300 404,356M396,366C330,394 260,412 190,424"
      />

      {/* 6. Who do you say? On a hillside with his friends; one leans in to answer. */}
      <Fade frame={frame} on={6} from="up">
        <g transform="translate(300 390) scale(1.35) translate(-300 -390)">
          <Seated x={300} y={340} tone="c" body={44} />
          <Seated x={226} y={358} tone="b" />
          <Seated x={374} y={358} tone="g" />
          <Seated x={186} y={384} tone="g" />
          <Seated x={414} y={384} tone="b" />
          <g transform="rotate(16 262 420)">
            <Seated x={262} y={386} tone="c" />
          </g>
          <Seated x={338} y={392} tone="b" />
        </g>
      </Fade>
    </>
  ),
};

export default film;
