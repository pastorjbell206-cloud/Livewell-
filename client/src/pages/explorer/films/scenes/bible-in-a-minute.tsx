/**
 * "The Bible in a minute": a short cut of "The whole Bible in two minutes",
 * drawn with that film's own road and roundels, so the two always agree.
 * Each frame here is one of that film's frames:
 *
 *   0  Made good              two-minutes 0
 *   1  Broken                 two-minutes 1
 *   2  A promise              two-minutes 2
 *   3  A rescue               two-minutes 3
 *   4  A king                 two-minutes 4
 *   5  Exile, and hope        two-minutes 5
 *   6  Jesus                  two-minutes 6 (the boat, the cross and the open tomb)
 *   7  All things new         two-minutes 8 (the flame of the Spirit is on the road too)
 */
import type { FilmDrawing } from "../motion";
import whole from "./bible-two-minutes";

const FROM = [0, 1, 2, 3, 4, 5, 6, 8];

const film: FilmDrawing = {
  w: whole.w,
  h: whole.h,
  draw: (h, frame) => whole.draw(h, frame < 0 ? -1 : FROM[frame]),
};

export default film;
