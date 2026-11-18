/**
 * "Start where you are" on Home: the five roads of /start as one quiet row of
 * chips under Find and tonight's line. Kept here, not imported from
 * lib/startRoad.json, so the entry script stays small; home.test.tsx holds the
 * two to the same words, and scripts/prerender-heads.mjs writes the same row
 * into the static hero from that file.
 */
export const ROAD_CHIPS: { id: string; chip: string }[] = [
  { id: "skeptical", chip: "I'm skeptical" },
  { id: "new", chip: "I'm new to this" },
  { id: "stepped-back", chip: "I've stepped back from faith" },
  { id: "deeper", chip: "I want to go deeper" },
  { id: "family", chip: "I'm leading a family" },
];
