/**
 * "Start where you are" on Home: the choices of /start as one quiet row of
 * chips under Find and tonight's line. Five open their road on /start; two
 * open the one page for a reader no road fits (the Christian with doubts and
 * the pastor or group leader, from the walk of 2026-11-23). Kept here, not
 * imported from lib/startRoad.json, so the entry script stays small;
 * start.test.tsx holds the two to the same words, order and addresses, and
 * scripts/prerender-heads.mjs writes the same row into the static hero from
 * that file.
 */
export const ROAD_CHIPS: { id: string; chip: string; href: string }[] = [
  { id: "skeptical", chip: "I'm skeptical", href: "/start#skeptical" },
  { id: "doubts", chip: "I have doubts", href: "/help/doubt" },
  { id: "new", chip: "I'm new to this", href: "/start#new" },
  { id: "stepped-back", chip: "I've stepped back from faith", href: "/start#stepped-back" },
  { id: "deeper", chip: "I want to go deeper", href: "/start#deeper" },
  { id: "family", chip: "I'm leading a family", href: "/start#family" },
  { id: "leading", chip: "I'm a pastor or group leader", href: "/studyguides" },
];
