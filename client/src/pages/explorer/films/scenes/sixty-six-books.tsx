/**
 * "How the 66 books fit together": a library that sorts itself.
 *
 * Sixty-six books stand jumbled in a row on the floor. Two cases appear, the
 * Old Testament on the left and the New on the right, each with four
 * shelves; then the books go up onto their shelves by kind of writing, in
 * the order of the Protestant Bible as the Study Bible's guide "What Is the
 * Bible?" sets it out: law, history, poetry and wisdom, the prophets; the
 * Gospels, Acts, the letters, Revelation. Last, one gold thread runs across
 * every spine: many books, one story. No book has a date or an author on
 * it; the drawing names nothing contested.
 *
 *   0  One book, many books     the books jumbled on the floor
 *   1  Two parts                two empty cases, Old and New
 *   2  Law and history          5 + 12 books onto the first two shelves
 *   3  Poetry and prophets      5 + 17 books onto the next two
 *   4  The Gospels and Acts     4 + 1 onto the right-hand case
 *   5  Letters and Revelation   21 + 1, and the library is full
 *   6  One story                a gold thread across every spine
 */
import { Shape } from "../../art";
import { Draw, Fade, Travel, type FilmDrawing } from "../motion";

type Tone = "b" | "g" | "c";

/** The shelves: which case, how many books, their tone, and the frame they go up. */
const SHELVES: {
  left: number;
  base: number;
  n: number;
  tone: Tone;
  on: number;
}[] = [
  { left: 52, base: 120, n: 5, tone: "c", on: 2 }, // law
  { left: 52, base: 205, n: 12, tone: "g", on: 2 }, // history
  { left: 52, base: 290, n: 5, tone: "b", on: 3 }, // poetry and wisdom
  { left: 52, base: 375, n: 17, tone: "c", on: 3 }, // prophets
  { left: 432, base: 120, n: 4, tone: "g", on: 4 }, // the Gospels
  { left: 432, base: 205, n: 1, tone: "b", on: 4 }, // Acts
  { left: 432, base: 290, n: 21, tone: "c", on: 5 }, // letters
  { left: 432, base: 375, n: 1, tone: "b", on: 5 }, // Revelation
];

/** A book's width and height, varied a little by its number. */
const size = (i: number) => ({
  w: 11 + ((i * 7) % 5),
  h: 56 + ((i * 11) % 15),
});

interface Book {
  i: number;
  tone: Tone;
  on: number;
  shelf: [number, number];
  floor: [number, number];
  w: number;
  h: number;
}

const BOOKS: Book[] = (() => {
  const out: Book[] = [];
  let i = 0;
  for (const s of SHELVES) {
    let x = s.left;
    for (let k = 0; k < s.n; k++, i++) {
      const { w, h } = size(i);
      out.push({
        i,
        tone: s.tone,
        on: s.on,
        shelf: [x, s.base - h],
        floor: [0, 0],
        w,
        h,
      });
      x += w + 1;
    }
  }
  // On the floor: one jumbled row, a little smaller, in a mixed order.
  const order = out.map((_, k) => (k * 29) % out.length);
  let fx = 30;
  for (const k of order) {
    const b = out[k];
    b.floor = [fx, 486 - b.h * 0.78];
    fx += b.w * 0.78 + 0.6;
  }
  return out;
})();

function Case({ x }: { x: number }) {
  return (
    <>
      <Shape d={`M${x},392V40H${x + 336}V392Z`} tone="c" off={3} />
      <path className="pl-paper" d={`M${x + 10},382V50H${x + 326}V382Z`} />
      <path className="pl-l" d={`M${x + 10},382V50H${x + 326}V382Z`} />
      {[120, 205, 290, 375].map(y => (
        <path key={y} className="pl-l" d={`M${x + 10},${y}H${x + 326}`} />
      ))}
    </>
  );
}

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => (
    <>
      <path className="pl-l" d="M0,488H800" />
      <path fill={h.h3} d="M0,488H800V500H0Z" />
      <Fade frame={frame} on={1} from="up">
        <Case x={40} />
        <Case x={420} />
      </Fade>
      {BOOKS.map(b => {
        const up = (f: number) =>
          f >= b.on
            ? [b.shelf[0], b.shelf[1], 1]
            : [b.floor[0], b.floor[1], 0.78];
        const at = [0, 1, 2, 3, 4, 5, 6].map(up) as [number, number, number][];
        return (
          <Travel key={b.i} frame={frame} at={at} delay={(b.i % 12) * 40}>
            <Shape d={`M0,0H${b.w}V${b.h}H0Z`} tone={b.tone} off={1} />
            <path
              className="pl-f"
              d={`M2,10H${b.w - 2}M2,${b.h - 10}H${b.w - 2}`}
            />
          </Travel>
        );
      })}
      {/* 6. One gold thread across every spine, shelf to shelf, then across the gap from the Old Testament case to the New. */}
      <Draw
        frame={frame}
        on={6}
        className="fp-gold"
        d="M366,90H58V175H366V260H58V345H366L436,90H746V175H436V260H746V345H436"
      />
    </>
  ),
};

export default film;
