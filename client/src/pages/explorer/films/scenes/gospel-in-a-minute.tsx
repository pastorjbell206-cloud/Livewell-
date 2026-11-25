/**
 * "The gospel in a minute": a short cut of "How salvation works", drawn with
 * that film's own picture (the land, the gap, the gold line from the light,
 * the cross and the open tomb). Each frame here is one of that film's frames,
 * so the two can never tell the story differently:
 *
 *   0  Made for God          salvation 0
 *   1  We turned away        salvation 1
 *   2  We cannot mend it     salvation 2
 *   3  God came to us        salvation 3
 *   4  He died and rose      salvation 5 (the land joined, the cross, the open tomb)
 *   5  A gift received       salvation 6
 *   6  With God for ever     salvation 8
 */
import type { FilmDrawing } from "../motion";
import salvation from "./how-salvation-works";

const FROM = [0, 1, 2, 3, 5, 6, 8];

const film: FilmDrawing = {
  w: salvation.w,
  h: salvation.h,
  draw: (h, frame) => salvation.draw(h, frame < 0 ? -1 : FROM[frame]),
};

export default film;
